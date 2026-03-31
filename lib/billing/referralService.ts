// =============================================================
// Referral Service — signup bonuses, delayed rewards, code mgmt.
// All flows are idempotent and write to the shared ledger.
// =============================================================

import { getSupabaseAdmin } from '@/lib/supabase';
import { ensureUserBillingRows, mutateCreditLedger } from './walletService';
import type {
  ReferralRow,
  ReferralCodeRow,
  ReferralDashboardData,
  ReferralDashboardEntry,
  ReferralStatus,
} from '@/types/billing';

const REFERRER_DELAYED_CREDITS = 5;
const REFERRED_SIGNUP_CREDITS = 1;
const REFERRED_DELAYED_CREDITS = 2;
const QUALIFICATION_DAYS = 30;

// ─── Generate or fetch referral code ─────────────────────────

export async function getOrCreateReferralCode(userId: string): Promise<ReferralCodeRow> {
  const db = getSupabaseAdmin();

  const { data: existing } = await db
    .from('referral_codes')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) return existing as ReferralCodeRow;

  // Generate a short, readable code
  const code = `LS-${userId.slice(-6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const { data: created, error } = await db
    .from('referral_codes')
    .insert({ user_id: userId, code, active: true })
    .select()
    .single();

  if (error || !created) throw new Error(`Referral code creation failed: ${error?.message}`);
  return created as ReferralCodeRow;
}

// ─── Resolve a referral code to its owner ────────────────────

export async function resolveReferralCode(
  code: string
): Promise<ReferralCodeRow | null> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('referral_codes')
    .select('*')
    .eq('code', code)
    .eq('active', true)
    .maybeSingle();
  return (data as ReferralCodeRow) ?? null;
}

// ─── On signup with referral code ────────────────────────────
// Call this after a new user completes signup if they had a
// referral code in their signup flow.

export async function processReferralSignup(params: {
  referredUserId: string;
  referralCode: string;
}): Promise<{ referral: ReferralRow; creditsAwarded: number }> {
  const db = getSupabaseAdmin();
  const { referredUserId, referralCode } = params;

  // Resolve code
  const codeRow = await resolveReferralCode(referralCode);
  if (!codeRow) throw new Error(`Invalid or inactive referral code: ${referralCode}`);

  const referrerUserId = codeRow.user_id;

  // No self-referrals
  if (referrerUserId === referredUserId) {
    throw new Error('Self-referral not allowed.');
  }

  // Ensure referred user has billing rows
  await ensureUserBillingRows(referredUserId);
  await ensureUserBillingRows(referrerUserId);

  // Idempotency: check if referral already exists for this referred user
  const { data: existingReferral } = await db
    .from('referrals')
    .select('*')
    .eq('referred_user_id', referredUserId)
    .maybeSingle();

  if (existingReferral) {
    return {
      referral: existingReferral as ReferralRow,
      creditsAwarded: existingReferral.immediate_signup_credit_awarded
        ? existingReferral.referred_immediate_credit_amount
        : 0,
    };
  }

  // Create referral row
  const { data: referral, error: refError } = await db
    .from('referrals')
    .insert({
      referrer_user_id: referrerUserId,
      referred_user_id: referredUserId,
      referral_code: referralCode,
      status: 'signed_up',
      signed_up_at: new Date().toISOString(),
      immediate_signup_credit_awarded: false,
      delayed_credit_awarded: false,
      referrer_credit_amount: REFERRER_DELAYED_CREDITS,
      referred_immediate_credit_amount: REFERRED_SIGNUP_CREDITS,
      referred_delayed_credit_amount: REFERRED_DELAYED_CREDITS,
    })
    .select()
    .single();

  if (refError || !referral) throw new Error(`Referral creation failed: ${refError?.message}`);

  // Award 1 immediate signup credit to referred user
  const idempotencyKey = `referral:signup:${referredUserId}:${referralCode}`;
  await mutateCreditLedger({
    userId: referredUserId,
    transactionType: 'referral_signup_bonus',
    direction: 'credit',
    amount: REFERRED_SIGNUP_CREDITS,
    idempotencyKey,
    sourceSurface: 'system',
    referenceType: 'referral',
    referenceId: referral.id,
    metadata: { referral_code: referralCode, referrer_user_id: referrerUserId },
  });

  // Mark signup credit as awarded
  await db
    .from('referrals')
    .update({ immediate_signup_credit_awarded: true })
    .eq('id', referral.id);

  return {
    referral: { ...referral, immediate_signup_credit_awarded: true } as ReferralRow,
    creditsAwarded: REFERRED_SIGNUP_CREDITS,
  };
}

// ─── On subscription activation ──────────────────────────────
// Call this from the Stripe webhook when a new subscription
// becomes active for a user who has a referral.

export async function onSubscriptionActivated(userId: string): Promise<void> {
  const db = getSupabaseAdmin();

  const { data: referral } = await db
    .from('referrals')
    .select('*')
    .eq('referred_user_id', userId)
    .maybeSingle();

  if (!referral) return; // No referral for this user

  const updates: Partial<ReferralRow> = {};

  if (!referral.subscription_started_at) {
    updates.subscription_started_at = new Date().toISOString();
  }

  if (referral.status === 'signed_up') {
    updates.status = 'active_paid_period';
  }

  if (Object.keys(updates).length > 0) {
    await db.from('referrals').update(updates).eq('id', referral.id);
  }
}

// ─── Daily qualification job ──────────────────────────────────
// Run via cron/edge function once per day.
// Finds referrals that have been active_paid_period for 30+ days
// and haven't been rewarded yet, then awards delayed credits.

export async function runDailyReferralQualificationJob(): Promise<{
  processed: number;
  rewarded: number;
  failed: number;
}> {
  const db = getSupabaseAdmin();
  const now = new Date();
  let processed = 0;
  let rewarded = 0;
  let failed = 0;

  // Fetch all referrals that are active_paid_period and not yet rewarded
  const { data: candidates } = await db
    .from('referrals')
    .select('*')
    .eq('status', 'active_paid_period')
    .eq('delayed_credit_awarded', false);

  if (!candidates?.length) return { processed: 0, rewarded: 0, failed: 0 };

  for (const referral of candidates as ReferralRow[]) {
    processed++;

    // Check current subscription status for referred user
    const { data: sub } = await db
      .from('subscription_state')
      .select('subscription_status, current_period_start')
      .eq('user_id', referral.referred_user_id)
      .single();

    const isStillActive = sub?.subscription_status === 'active' ||
                          sub?.subscription_status === 'trialing';

    // If subscription canceled before qualifying
    if (!isStillActive) {
      await db
        .from('referrals')
        .update({ status: 'canceled', updated_at: now.toISOString() })
        .eq('id', referral.id);
      failed++;
      continue;
    }

    // Check 30-day qualification
    if (!referral.subscription_started_at) {
      failed++;
      continue;
    }

    const startDate = new Date(referral.subscription_started_at);
    const daysSinceStart = Math.floor(
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceStart < QUALIFICATION_DAYS) continue; // Not yet qualified

    // Award delayed credits to both parties
    try {
      await ensureUserBillingRows(referral.referrer_user_id);
      await ensureUserBillingRows(referral.referred_user_id);

      // Referrer gets 5 credits
      await mutateCreditLedger({
        userId: referral.referrer_user_id,
        transactionType: 'referral_delayed_bonus',
        direction: 'credit',
        amount: referral.referrer_credit_amount,
        idempotencyKey: `referral:delayed:referrer:${referral.id}`,
        sourceSurface: 'system',
        referenceType: 'referral',
        referenceId: referral.id,
        metadata: {
          referred_user_id: referral.referred_user_id,
          days_qualified: daysSinceStart,
        },
      });

      // Referred user gets 2 more credits
      await mutateCreditLedger({
        userId: referral.referred_user_id,
        transactionType: 'referral_delayed_bonus',
        direction: 'credit',
        amount: referral.referred_delayed_credit_amount,
        idempotencyKey: `referral:delayed:referred:${referral.id}`,
        sourceSurface: 'system',
        referenceType: 'referral',
        referenceId: referral.id,
        metadata: {
          referrer_user_id: referral.referrer_user_id,
          days_qualified: daysSinceStart,
        },
      });

      // Mark referral as completed
      await db
        .from('referrals')
        .update({
          status: 'completed',
          qualified_at: now.toISOString(),
          rewarded_at: now.toISOString(),
          delayed_credit_awarded: true,
          updated_at: now.toISOString(),
        })
        .eq('id', referral.id);

      rewarded++;
    } catch (err) {
      console.error(`Referral reward failed for ${referral.id}:`, err);
      failed++;
    }
  }

  return { processed, rewarded, failed };
}

// ─── Get referral dashboard data ─────────────────────────────

export async function getReferralDashboard(userId: string): Promise<ReferralDashboardData> {
  const db = getSupabaseAdmin();
  const now = new Date();

  const codeRow = await getOrCreateReferralCode(userId);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lossstack.com';

  const { data: referrals } = await db
    .from('referrals')
    .select('*')
    .eq('referrer_user_id', userId)
    .order('created_at', { ascending: false });

  const rows = (referrals ?? []) as ReferralRow[];

  // Sum total referral credits earned from ledger
  const { data: ledgerRows } = await db
    .from('credit_ledger')
    .select('amount')
    .eq('user_id', userId)
    .in('transaction_type', ['referral_signup_bonus', 'referral_delayed_bonus'])
    .eq('direction', 'credit');

  const totalReferralCredits = (ledgerRows ?? []).reduce((sum, r) => sum + r.amount, 0);

  const entries: ReferralDashboardEntry[] = rows.map((r) => {
    let daysRemaining: number | null = null;

    if (r.subscription_started_at && r.status === 'active_paid_period') {
      const startDate = new Date(r.subscription_started_at);
      const elapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      daysRemaining = Math.max(0, 30 - elapsed);
    }

    return {
      id: r.id,
      referred_masked_email: maskUserId(r.referred_user_id),
      status: r.status,
      signed_up_at: r.signed_up_at,
      subscription_started_at: r.subscription_started_at,
      days_remaining_until_completion: daysRemaining,
      rewarded_at: r.rewarded_at,
    };
  });

  const pending = rows.filter((r) =>
    ['signed_up', 'active_paid_period', 'pending_signup'].includes(r.status)
  ).length;
  const completed = rows.filter((r) => r.status === 'completed').length;
  const failedCount = rows.filter((r) =>
    ['failed', 'canceled', 'fraud_hold'].includes(r.status)
  ).length;

  return {
    referral_code: codeRow.code,
    referral_url: `${siteUrl}/sign-up?ref=${codeRow.code}`,
    total_referral_credits_earned: totalReferralCredits,
    pending_count: pending,
    completed_count: completed,
    failed_count: failedCount,
    referrals: entries,
  };
}

// ─── Helper ───────────────────────────────────────────────────

function maskUserId(userId: string): string {
  // Show first 4 chars + ***
  if (userId.length <= 6) return '****';
  return `${userId.slice(0, 4)}****`;
}
