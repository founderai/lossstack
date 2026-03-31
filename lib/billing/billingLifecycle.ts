// =============================================================
// Billing Lifecycle — subscription events, monthly allocations.
// Called from Stripe webhook handlers.
// =============================================================

import { getSupabaseAdmin } from '@/lib/supabase';
import { ensureUserBillingRows, mutateCreditLedger } from './walletService';
import { onSubscriptionActivated } from './referralService';
import type { SubscriptionStatus } from '@/types/billing';

const MONTHLY_CREDITS: Record<string, number> = {
  free: 0,
  core: 0,
  pro: 10,
  firm: 25,
};

// ─── Sync subscription state from Stripe event ───────────────

export async function syncSubscriptionState(params: {
  userId: string;
  planCode: string;
  subscriptionStatus: SubscriptionStatus;
  billingCustomerId: string;
  billingSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  seatsPurchased?: number;
  storageAddonActive?: boolean;
}): Promise<void> {
  const db = getSupabaseAdmin();

  await ensureUserBillingRows(params.userId);

  await db
    .from('subscription_state')
    .upsert(
      {
        user_id: params.userId,
        current_plan_code: params.planCode,
        subscription_status: params.subscriptionStatus,
        billing_customer_id: params.billingCustomerId,
        billing_subscription_id: params.billingSubscriptionId,
        current_period_start: params.currentPeriodStart.toISOString(),
        current_period_end: params.currentPeriodEnd.toISOString(),
        seats_purchased: params.seatsPurchased ?? 0,
        storage_addon_active: params.storageAddonActive ?? false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
}

// ─── Monthly credit allocation ────────────────────────────────
// Called on invoice.paid for subscription renewals.
// Idempotent: keyed on subscription_id + period_start.

export async function allocateMonthlyCredits(params: {
  userId: string;
  planCode: string;
  billingSubscriptionId: string;
  periodStart: Date;
}): Promise<{ credited: number; skipped: boolean }> {
  const creditsToAllocate = MONTHLY_CREDITS[params.planCode] ?? 0;

  // Free and Core get no monthly allocation
  if (creditsToAllocate === 0) return { credited: 0, skipped: true };

  await ensureUserBillingRows(params.userId);

  const periodKey = params.periodStart.toISOString().slice(0, 10); // YYYY-MM-DD
  const idempotencyKey = `monthly_alloc:${params.billingSubscriptionId}:${periodKey}`;

  const db = getSupabaseAdmin();

  // Idempotency check
  const { data: existing } = await db
    .from('credit_ledger')
    .select('id')
    .eq('idempotency_key', idempotencyKey)
    .maybeSingle();

  if (existing) return { credited: 0, skipped: true };

  await mutateCreditLedger({
    userId: params.userId,
    transactionType: 'monthly_allocation',
    direction: 'credit',
    amount: creditsToAllocate,
    idempotencyKey,
    sourceSurface: 'system',
    referenceType: 'subscription',
    referenceId: params.billingSubscriptionId,
    metadata: {
      plan_code: params.planCode,
      period_start: params.periodStart.toISOString(),
    },
  });

  return { credited: creditsToAllocate, skipped: false };
}

// ─── Subscription activated ───────────────────────────────────

export async function handleSubscriptionActivated(params: {
  userId: string;
  planCode: string;
  billingCustomerId: string;
  billingSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  seatsPurchased?: number;
}): Promise<void> {
  await syncSubscriptionState({
    ...params,
    subscriptionStatus: 'active',
  });

  // Trigger referral activation check
  await onSubscriptionActivated(params.userId);
}

// ─── Subscription renewed (invoice.paid) ─────────────────────

export async function handleSubscriptionRenewed(params: {
  userId: string;
  planCode: string;
  billingCustomerId: string;
  billingSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  seatsPurchased?: number;
}): Promise<{ creditsAllocated: number }> {
  await syncSubscriptionState({
    ...params,
    subscriptionStatus: 'active',
  });

  const { credited } = await allocateMonthlyCredits({
    userId: params.userId,
    planCode: params.planCode,
    billingSubscriptionId: params.billingSubscriptionId,
    periodStart: params.currentPeriodStart,
  });

  return { creditsAllocated: credited };
}

// ─── Subscription canceled ────────────────────────────────────

export async function handleSubscriptionCanceled(params: {
  userId: string;
  billingCustomerId: string;
  billingSubscriptionId: string;
}): Promise<void> {
  const db = getSupabaseAdmin();

  await db
    .from('subscription_state')
    .update({
      subscription_status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', params.userId);

  // Mark any active_paid_period referrals as canceled if < 30 days
  const { data: referrals } = await db
    .from('referrals')
    .select('id, subscription_started_at')
    .eq('referred_user_id', params.userId)
    .eq('status', 'active_paid_period')
    .eq('delayed_credit_awarded', false);

  if (referrals?.length) {
    const now = new Date();
    for (const ref of referrals) {
      const start = ref.subscription_started_at ? new Date(ref.subscription_started_at) : null;
      const days = start
        ? Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      await db
        .from('referrals')
        .update({
          status: days >= 30 ? 'completed' : 'canceled',
          updated_at: now.toISOString(),
        })
        .eq('id', ref.id);
    }
  }
}

// ─── Payment failed ───────────────────────────────────────────

export async function handlePaymentFailed(params: {
  userId: string;
  billingSubscriptionId: string;
}): Promise<void> {
  const db = getSupabaseAdmin();

  await db
    .from('subscription_state')
    .update({
      subscription_status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', params.userId);
}

// ─── Plan upgrade/downgrade ───────────────────────────────────

export async function handlePlanChange(params: {
  userId: string;
  newPlanCode: string;
  billingCustomerId: string;
  billingSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  seatsPurchased?: number;
}): Promise<void> {
  await syncSubscriptionState({
    ...params,
    planCode: params.newPlanCode,
    subscriptionStatus: 'active',
  });
}

// ─── Find userId by Stripe customer ID ───────────────────────

export async function getUserIdByStripeCustomer(
  customerId: string
): Promise<string | null> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('subscription_state')
    .select('user_id')
    .eq('billing_customer_id', customerId)
    .maybeSingle();
  return data?.user_id ?? null;
}
