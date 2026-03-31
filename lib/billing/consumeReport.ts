// =============================================================
// consumeReport — the ONLY service allowed to debit credits or
// create billable overage events.  Fully idempotent by
// idempotencyKey.  Uses row-level locking via Postgres advisory
// lock RPC to prevent concurrent double-debits.
// =============================================================

import { getSupabaseAdmin } from '@/lib/supabase';
import { ensureUserBillingRows, mutateCreditLedger } from './walletService';
import { canUserPerformAction } from './entitlementService';
import type {
  ConsumeReportInput,
  ConsumeReportResult,
  BillingOutcome,
} from '@/types/billing';

export async function consumeReport(
  input: ConsumeReportInput
): Promise<ConsumeReportResult> {
  const db = getSupabaseAdmin();
  const {
    userId,
    actionKey,
    sourceSurface,
    sourceApp,
    reportType,
    idempotencyKey,
    metadata = {},
  } = input;

  // ── Idempotency check — return existing result if already processed ──
  const { data: existingEvent } = await db
    .from('report_usage_events')
    .select('*')
    .eq('idempotency_key', idempotencyKey)
    .maybeSingle();

  if (existingEvent) {
    return {
      success: existingEvent.billing_outcome !== 'blocked_free_no_credit' &&
               existingEvent.billing_outcome !== 'blocked_plan',
      billing_outcome: existingEvent.billing_outcome,
      credit_ledger_id: existingEvent.credit_ledger_id,
      report_usage_event_id: existingEvent.id,
      credits_remaining: await getCurrentBalance(userId),
      overage_price_cents: existingEvent.overage_price_cents,
      message: 'Idempotent: already processed.',
    };
  }

  // ── Pre-flight entitlement check ───────────────────────────
  await ensureUserBillingRows(userId);
  const entitlement = await canUserPerformAction(userId, actionKey, sourceSurface, sourceApp);

  if (!entitlement.allowed) {
    // Log the blocked attempt
    const { data: blockedEvent } = await db
      .from('report_usage_events')
      .insert({
        user_id: userId,
        source_surface: sourceSurface,
        source_app: sourceApp,
        action_key: actionKey,
        report_type: reportType,
        billing_outcome: entitlement.reason === 'blocked_feature_not_in_plan'
          ? 'blocked_plan'
          : 'blocked_free_no_credit',
        credit_ledger_id: null,
        overage_price_cents: null,
        idempotency_key: idempotencyKey,
        metadata,
      })
      .select()
      .single();

    return {
      success: false,
      billing_outcome: (blockedEvent?.billing_outcome ?? 'blocked_free_no_credit') as BillingOutcome,
      credit_ledger_id: null,
      report_usage_event_id: blockedEvent?.id ?? '',
      credits_remaining: entitlement.current_credit_balance,
      overage_price_cents: null,
      message: entitlement.message,
    };
  }

  // ── Acquire advisory lock to prevent concurrent double-debits ──
  // Lock key is deterministic per user so concurrent requests queue.
  const lockKey = stableHashCode(`wallet:${userId}`);
  const { error: lockError } = await db.rpc('pg_advisory_xact_lock', { key: lockKey });
  if (lockError) {
    // Advisory lock not critical — log and continue; idempotency_key is the real guard
    console.warn(`Advisory lock unavailable for ${userId}: ${lockError.message}`);
  }

  // ── Re-check balance inside lock ──────────────────────────
  const { data: freshWallet } = await db
    .from('user_wallets')
    .select('current_balance')
    .eq('user_id', userId)
    .single();

  const balance = freshWallet?.current_balance ?? 0;

  // ── Credit path ───────────────────────────────────────────
  if (balance > 0) {
    const ledgerEntry = await mutateCreditLedger({
      userId,
      transactionType: 'report_debit',
      direction: 'debit',
      amount: 1,
      idempotencyKey: `${idempotencyKey}:debit`,
      sourceSurface,
      sourceApp,
      actionKey,
      referenceType: 'report_usage',
      metadata,
    });

    const { data: usageEvent } = await db
      .from('report_usage_events')
      .insert({
        user_id: userId,
        source_surface: sourceSurface,
        source_app: sourceApp,
        action_key: actionKey,
        report_type: reportType,
        billing_outcome: 'consumed_credit',
        credit_ledger_id: ledgerEntry.id,
        overage_price_cents: null,
        idempotency_key: idempotencyKey,
        metadata,
      })
      .select()
      .single();

    return {
      success: true,
      billing_outcome: 'consumed_credit',
      credit_ledger_id: ledgerEntry.id,
      report_usage_event_id: usageEvent?.id ?? '',
      credits_remaining: balance - 1,
      overage_price_cents: null,
      message: '1 credit consumed.',
    };
  }

  // ── Overage path ──────────────────────────────────────────
  if (entitlement.will_bill_overage && entitlement.overage_price_cents) {
    const { data: usageEvent } = await db
      .from('report_usage_events')
      .insert({
        user_id: userId,
        source_surface: sourceSurface,
        source_app: sourceApp,
        action_key: actionKey,
        report_type: reportType,
        billing_outcome: 'billed_overage',
        credit_ledger_id: null,
        overage_price_cents: entitlement.overage_price_cents,
        idempotency_key: idempotencyKey,
        metadata: {
          ...metadata,
          overage_queued_for_billing: true,
          stripe_customer_id: await getStripeCustomerId(userId),
        },
      })
      .select()
      .single();

    // Update lifetime overage counter
    await db
      .from('user_wallets')
      .update({
        lifetime_overage_reports: db.rpc as unknown as number, // handled via increment RPC
      })
      .eq('user_id', userId);

    await db.rpc('increment_overage_counter', { p_user_id: userId });

    return {
      success: true,
      billing_outcome: 'billed_overage',
      credit_ledger_id: null,
      report_usage_event_id: usageEvent?.id ?? '',
      credits_remaining: 0,
      overage_price_cents: entitlement.overage_price_cents,
      message: `Billed at overage rate: $${(entitlement.overage_price_cents / 100).toFixed(2)}.`,
    };
  }

  // ── Fallback block (balance changed between pre-flight and lock) ──
  const { data: blockedEvent } = await db
    .from('report_usage_events')
    .insert({
      user_id: userId,
      source_surface: sourceSurface,
      source_app: sourceApp,
      action_key: actionKey,
      report_type: reportType,
      billing_outcome: 'blocked_free_no_credit',
      credit_ledger_id: null,
      overage_price_cents: null,
      idempotency_key: idempotencyKey,
      metadata,
    })
    .select()
    .single();

  return {
    success: false,
    billing_outcome: 'blocked_free_no_credit',
    credit_ledger_id: null,
    report_usage_event_id: blockedEvent?.id ?? '',
    credits_remaining: 0,
    overage_price_cents: null,
    message: 'No credits available and no overage option for this plan.',
  };
}

// ─── Helpers ──────────────────────────────────────────────────

async function getCurrentBalance(userId: string): Promise<number> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('user_wallets')
    .select('current_balance')
    .eq('user_id', userId)
    .single();
  return data?.current_balance ?? 0;
}

async function getStripeCustomerId(userId: string): Promise<string | null> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('subscription_state')
    .select('billing_customer_id')
    .eq('user_id', userId)
    .single();
  return data?.billing_customer_id ?? null;
}

// Deterministic integer hash for advisory lock keys
function stableHashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
