// =============================================================
// Entitlement Service — single source of truth for access checks.
// Called by both desktop/web and mobile (via API).
// =============================================================

import { getSupabaseAdmin } from '@/lib/supabase';
import { ensureUserBillingRows } from './walletService';
import type {
  EntitlementCheckResult,
  EntitlementReason,
  UiCta,
  PlanEntitlement,
  SubscriptionStateRow,
  UserWallet,
} from '@/types/billing';

// Actions that require plan features beyond basic access
const FEATURE_GATED_ACTIONS: Record<string, (e: PlanEntitlement) => boolean> = {
  'workflows.bulk_process':         (e) => e.can_use_bulk_workflows,
  'integrations.cross_app_sync':    (e) => e.can_use_cross_app_integrations,
  'processing.priority':            (e) => e.can_use_priority_processing,
  'team.invite_seat':               () => true, // handled by seat limit check
};

// Actions that consume 1 report credit
const REPORT_ACTIONS = new Set([
  'appraisly.generate_report',
  'imagelablr.export_package',
  'restorecam.job_completion_report',
  'skymeasure.generate_report',
]);

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(['active', 'trialing']);

export interface CanUserPerformActionContext {
  currentSeatCount?: number;
}

export async function canUserPerformAction(
  userId: string,
  actionKey: string,
  sourceSurface: string,
  sourceApp: string,
  context: CanUserPerformActionContext = {}
): Promise<EntitlementCheckResult> {
  const db = getSupabaseAdmin();

  // Ensure rows exist before any query
  await ensureUserBillingRows(userId);

  // Fetch subscription state, plan entitlements, and wallet in parallel
  const [subResult, walletResult] = await Promise.all([
    db
      .from('subscription_state')
      .select('*, plan_entitlements(*)')
      .eq('user_id', userId)
      .single(),
    db
      .from('user_wallets')
      .select('current_balance')
      .eq('user_id', userId)
      .single(),
  ]);

  const sub = subResult.data as (SubscriptionStateRow & { plan_entitlements: PlanEntitlement }) | null;
  const wallet = walletResult.data as Pick<UserWallet, 'current_balance'> | null;

  const planCode = sub?.current_plan_code ?? 'free';
  const entitlement = sub?.plan_entitlements ?? null;
  const balance = wallet?.current_balance ?? 0;
  const isActiveSub = ACTIVE_SUBSCRIPTION_STATUSES.has(sub?.subscription_status ?? 'inactive');

  // ── Feature gate check ─────────────────────────────────────
  const featureGate = FEATURE_GATED_ACTIONS[actionKey];
  if (featureGate && entitlement && !featureGate(entitlement)) {
    return buildResult({
      allowed: false,
      reason: 'blocked_feature_not_in_plan',
      planCode,
      balance,
      entitlement,
      message: 'This feature is not included in your current plan.',
      ui_cta: 'upgrade',
      requiresUpgrade: true,
    });
  }

  // ── Seat limit check ──────────────────────────────────────
  if (actionKey === 'team.invite_seat' && entitlement) {
    const totalSeats = entitlement.seats_included + (sub?.seats_purchased ?? 0);
    const usedSeats = context.currentSeatCount ?? 0;
    if (usedSeats >= totalSeats) {
      return buildResult({
        allowed: false,
        reason: 'blocked_seat_limit',
        planCode,
        balance,
        entitlement,
        message: `You've reached your seat limit (${totalSeats}). Upgrade your plan or purchase additional seats.`,
        ui_cta: 'upgrade',
        requiresUpgrade: true,
      });
    }
    // Seats available
    return buildResult({
      allowed: true,
      reason: 'allowed_credit_available',
      planCode,
      balance,
      entitlement,
      message: 'Seat available.',
      ui_cta: 'none',
    });
  }

  // ── Report consumption check ──────────────────────────────
  if (REPORT_ACTIONS.has(actionKey)) {
    // Free plan with no credits → blocked
    if (planCode === 'free' && balance === 0) {
      return buildResult({
        allowed: false,
        reason: 'blocked_free_no_credit',
        planCode,
        balance,
        entitlement,
        message: 'You have no credits remaining. Upgrade your plan or earn credits via referrals.',
        ui_cta: balance === 0 ? 'referral' : 'upgrade',
        requiresUpgrade: true,
      });
    }

    // Has credits → consume credit
    if (balance > 0) {
      return buildResult({
        allowed: true,
        reason: 'allowed_credit_available',
        planCode,
        balance,
        entitlement,
        willConsumeCredit: true,
        message: 'This report will use 1 credit.',
        ui_cta: 'none',
      });
    }

    // No credits but active paid plan with overage pricing
    if (isActiveSub && planCode !== 'free' && entitlement?.per_report_overage_price_cents) {
      return buildResult({
        allowed: true,
        reason: 'allowed_paid_overage',
        planCode,
        balance,
        entitlement,
        willBillOverage: true,
        overagePriceCents: entitlement.per_report_overage_price_cents,
        message: `You have 0 credits left. This report will be billed at $${(entitlement.per_report_overage_price_cents / 100).toFixed(2)}.`,
        ui_cta: 'confirm_overage',
      });
    }

    // No credits, no overage available
    return buildResult({
      allowed: false,
      reason: 'blocked_free_no_credit',
      planCode,
      balance,
      entitlement,
      message: 'You have no credits remaining and your plan does not support overage billing.',
      ui_cta: 'upgrade',
      requiresUpgrade: true,
    });
  }

  // ── Default: allow (browsing, job creation, uploads within limits) ──
  return buildResult({
    allowed: true,
    reason: 'allowed_credit_available',
    planCode,
    balance,
    entitlement,
    message: 'Action allowed.',
    ui_cta: 'none',
  });
}

// ─── Builder helper ───────────────────────────────────────────

function buildResult(params: {
  allowed: boolean;
  reason: EntitlementReason;
  planCode: string;
  balance: number;
  entitlement: PlanEntitlement | null;
  message: string;
  ui_cta: UiCta;
  willConsumeCredit?: boolean;
  willBillOverage?: boolean;
  overagePriceCents?: number;
  requiresUpgrade?: boolean;
}): EntitlementCheckResult {
  return {
    allowed: params.allowed,
    reason: params.reason,
    current_plan_code: params.planCode,
    current_credit_balance: params.balance,
    included_monthly_credits_remaining: params.entitlement?.included_monthly_credits ?? 0,
    will_consume_credit: params.willConsumeCredit ?? false,
    will_bill_overage: params.willBillOverage ?? false,
    overage_price_cents: params.overagePriceCents ?? null,
    requires_upgrade: params.requiresUpgrade ?? false,
    message: params.message,
    ui_cta: params.ui_cta,
    metadata: {},
  };
}
