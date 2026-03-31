// =============================================================
// LossStack Billing System — Shared Types
// Used by both service layer and API routes.
// =============================================================

export type TransactionType =
  | 'monthly_allocation'
  | 'referral_signup_bonus'
  | 'referral_delayed_bonus'
  | 'report_debit'
  | 'report_reversal'
  | 'admin_adjustment'
  | 'promo_credit'
  | 'expiration'
  | 'migration_adjustment';

export type Direction = 'credit' | 'debit';

export type SourceSurface = 'desktop' | 'mobile' | 'api' | 'admin' | 'system';

export type SourceApp = 'lossstack' | 'appraisly' | 'imagelablr' | 'restorecam' | 'skymeasure';

export type ReferralStatus =
  | 'pending_signup'
  | 'signed_up'
  | 'active_paid_period'
  | 'completed'
  | 'failed'
  | 'canceled'
  | 'fraud_hold';

export type BillingOutcome =
  | 'consumed_credit'
  | 'billed_overage'
  | 'blocked_free_no_credit'
  | 'blocked_plan';

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'inactive';

// ─── Entitlement check reason ─────────────────────────────────

export type EntitlementReason =
  | 'allowed_credit_available'
  | 'allowed_paid_overage'
  | 'blocked_free_no_credit'
  | 'blocked_feature_not_in_plan'
  | 'blocked_seat_limit'
  | 'blocked_storage_limit'
  | 'blocked_subscription_required';

export type UiCta =
  | 'none'
  | 'upgrade'
  | 'referral'
  | 'confirm_overage'
  | 'contact_support';

// ─── DB row shapes ────────────────────────────────────────────

export interface UserWallet {
  user_id: string;
  current_balance: number;
  lifetime_credits_earned: number;
  lifetime_credits_spent: number;
  lifetime_overage_reports: number;
  created_at: string;
  updated_at: string;
}

export interface CreditLedgerRow {
  id: string;
  user_id: string;
  transaction_type: TransactionType;
  direction: Direction;
  amount: number;
  source_surface: SourceSurface | null;
  source_app: SourceApp | null;
  action_key: string | null;
  reference_type: string | null;
  reference_id: string | null;
  idempotency_key: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface ReferralRow {
  id: string;
  referrer_user_id: string;
  referred_user_id: string;
  referral_code: string;
  status: ReferralStatus;
  signed_up_at: string | null;
  subscription_started_at: string | null;
  qualified_at: string | null;
  rewarded_at: string | null;
  immediate_signup_credit_awarded: boolean;
  delayed_credit_awarded: boolean;
  referrer_credit_amount: number;
  referred_immediate_credit_amount: number;
  referred_delayed_credit_amount: number;
  created_at: string;
  updated_at: string;
}

export interface ReferralCodeRow {
  id: string;
  user_id: string;
  code: string;
  active: boolean;
  created_at: string;
}

export interface PlanEntitlement {
  plan_code: string;
  included_monthly_credits: number;
  per_report_overage_price_cents: number | null;
  seats_included: number;
  storage_included: boolean;
  can_use_bulk_workflows: boolean;
  can_use_priority_processing: boolean;
  can_use_cross_app_integrations: boolean;
}

export interface SubscriptionStateRow {
  user_id: string;
  current_plan_code: string;
  subscription_status: SubscriptionStatus;
  billing_customer_id: string | null;
  billing_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  storage_addon_active: boolean;
  seats_purchased: number;
  updated_at: string;
}

export interface ReportUsageEvent {
  id: string;
  user_id: string;
  source_surface: SourceSurface;
  source_app: SourceApp;
  action_key: string;
  report_type: string;
  billing_outcome: BillingOutcome;
  credit_ledger_id: string | null;
  overage_price_cents: number | null;
  idempotency_key: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ─── Service response shapes ──────────────────────────────────

export interface EntitlementCheckResult {
  allowed: boolean;
  reason: EntitlementReason;
  current_plan_code: string;
  current_credit_balance: number;
  included_monthly_credits_remaining: number;
  will_consume_credit: boolean;
  will_bill_overage: boolean;
  overage_price_cents: number | null;
  requires_upgrade: boolean;
  message: string;
  ui_cta: UiCta;
  metadata: Record<string, unknown>;
}

export interface ConsumeReportResult {
  success: boolean;
  billing_outcome: BillingOutcome;
  credit_ledger_id: string | null;
  report_usage_event_id: string;
  credits_remaining: number;
  overage_price_cents: number | null;
  message: string;
}

export interface ConsumeReportInput {
  userId: string;
  actionKey: string;
  sourceSurface: SourceSurface;
  sourceApp: SourceApp;
  reportType: string;
  idempotencyKey: string;
  metadata?: Record<string, unknown>;
}

export interface WalletAdminInput {
  userId: string;
  amount: number;
  transactionType: TransactionType;
  idempotencyKey: string;
  sourceSurface?: SourceSurface;
  sourceApp?: SourceApp;
  referenceType?: string;
  referenceId?: string;
  metadata?: Record<string, unknown>;
}

// ─── Referral dashboard data ──────────────────────────────────

export interface ReferralDashboardEntry {
  id: string;
  referred_masked_email: string;
  status: ReferralStatus;
  signed_up_at: string | null;
  subscription_started_at: string | null;
  days_remaining_until_completion: number | null;
  rewarded_at: string | null;
}

export interface ReferralDashboardData {
  referral_code: string;
  referral_url: string;
  total_referral_credits_earned: number;
  pending_count: number;
  completed_count: number;
  failed_count: number;
  referrals: ReferralDashboardEntry[];
}
