// =============================================================
// LossStack Billing System Tests
// Run with: npx jest __tests__/billing.test.ts
// These are integration-style unit tests that mock Supabase.
// =============================================================

import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// ─── Mock Supabase ────────────────────────────────────────────

const mockRpc = jest.fn().mockResolvedValue({ error: null });
const mockSingle = jest.fn();
const mockMaybeSingle = jest.fn();
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockIn = jest.fn();
const mockOrder = jest.fn();
const mockRange = jest.fn();
const mockUpsert = jest.fn();

// Chain builder
function chainable(result: unknown) {
  const chain: Record<string, jest.Mock> = {};
  const methods = ['select','eq','in','order','range','single','maybeSingle','insert','update','upsert','limit','or'];
  methods.forEach((m) => {
    chain[m] = jest.fn().mockReturnValue(chain);
  });
  chain['single'] = jest.fn().mockResolvedValue(result);
  chain['maybeSingle'] = jest.fn().mockResolvedValue(result);
  return chain;
}

jest.mock('@/lib/supabase', () => ({
  getSupabaseAdmin: () => ({
    rpc: mockRpc,
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      upsert: jest.fn().mockReturnThis(),
      single: mockSingle,
      maybeSingle: mockMaybeSingle,
    }),
  }),
}));

// ─── Helpers ──────────────────────────────────────────────────

function makeWallet(balance: number) {
  return {
    user_id: 'user_test',
    current_balance: balance,
    lifetime_credits_earned: 10,
    lifetime_credits_spent: 5,
    lifetime_overage_reports: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function makeSub(planCode: string, status = 'active') {
  return {
    user_id: 'user_test',
    current_plan_code: planCode,
    subscription_status: status,
    billing_customer_id: 'cus_test',
    billing_subscription_id: 'sub_test',
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
    storage_addon_active: false,
    seats_purchased: 0,
    updated_at: new Date().toISOString(),
    plan_entitlements: {
      plan_code: planCode,
      included_monthly_credits: planCode === 'pro' ? 10 : planCode === 'firm' ? 25 : 0,
      per_report_overage_price_cents: planCode === 'free' ? null : 1499,
      seats_included: planCode === 'firm' ? 5 : planCode === 'pro' ? 3 : 1,
      storage_included: planCode !== 'free' && planCode !== 'core',
      can_use_bulk_workflows: planCode === 'pro' || planCode === 'firm',
      can_use_priority_processing: planCode === 'firm',
      can_use_cross_app_integrations: planCode === 'pro' || planCode === 'firm',
    },
  };
}

function makeLedgerEntry(id: string) {
  return {
    id,
    user_id: 'user_test',
    transaction_type: 'report_debit',
    direction: 'debit',
    amount: 1,
    idempotency_key: `key_${id}`,
    created_at: new Date().toISOString(),
    metadata: {},
  };
}

// ─── Tests ────────────────────────────────────────────────────

describe('walletService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRpc.mockResolvedValue({ error: null });
  });

  it('getWallet: calls ensure_user_billing_rows rpc and returns wallet', async () => {
    mockSingle.mockResolvedValue({ data: makeWallet(5), error: null });
    const { getWallet } = await import('@/lib/billing/walletService');
    const wallet = await getWallet('user_test');
    expect(wallet.current_balance).toBe(5);
    expect(mockRpc).toHaveBeenCalledWith('ensure_user_billing_rows', { p_user_id: 'user_test' });
  });

  it('mutateCreditLedger: returns existing entry on duplicate idempotency_key', async () => {
    const existing = makeLedgerEntry('existing_id');
    mockMaybeSingle.mockResolvedValueOnce({ data: existing, error: null });

    const { mutateCreditLedger } = await import('@/lib/billing/walletService');
    const result = await mutateCreditLedger({
      userId: 'user_test',
      transactionType: 'report_debit',
      direction: 'debit',
      amount: 1,
      idempotencyKey: 'key_existing_id',
    });

    expect(result.id).toBe('existing_id');
    // Should NOT call increment/decrement RPCs since idempotent
    expect(mockRpc).not.toHaveBeenCalledWith('decrement_wallet_balance', expect.anything());
  });

  it('creditUserWallet: credits wallet and writes ledger entry', async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: null, error: null }); // no existing
    mockSingle
      .mockResolvedValueOnce({ data: makeLedgerEntry('new_id'), error: null }) // ledger insert
    mockRpc.mockResolvedValue({ error: null });

    const { creditUserWallet } = await import('@/lib/billing/walletService');
    const entry = await creditUserWallet({
      userId: 'user_test',
      amount: 5,
      transactionType: 'admin_adjustment',
      idempotencyKey: 'admin_key_1',
    });

    expect(entry.direction).toBe('debit'); // mock returns whatever we set
    expect(mockRpc).toHaveBeenCalledWith('increment_wallet_balance', {
      p_user_id: 'user_test',
      p_amount: 5,
    });
  });

  it('debitUserWallet: throws if insufficient balance', async () => {
    mockRpc.mockResolvedValue({ error: null }); // ensure rows
    mockSingle.mockResolvedValue({ data: makeWallet(0), error: null }); // wallet

    const { debitUserWallet } = await import('@/lib/billing/walletService');
    await expect(
      debitUserWallet({
        userId: 'user_test',
        amount: 5,
        transactionType: 'report_debit',
        idempotencyKey: 'debit_key_1',
      })
    ).rejects.toThrow('Insufficient balance');
  });

  it('reverseLedgerTransaction: credits wallet when reversing a debit', async () => {
    const originalEntry = makeLedgerEntry('orig_id');
    mockMaybeSingle
      .mockResolvedValueOnce({ data: null, error: null })   // no existing reversal
      .mockResolvedValueOnce({ data: null, error: null });  // unused
    mockSingle
      .mockResolvedValueOnce({ data: originalEntry, error: null }) // original entry fetch
      .mockResolvedValueOnce({ data: { ...originalEntry, id: 'rev_id', direction: 'credit', transaction_type: 'report_reversal' }, error: null }); // reversal insert

    const { reverseLedgerTransaction } = await import('@/lib/billing/walletService');
    const result = await reverseLedgerTransaction({
      originalLedgerEntryId: 'orig_id',
      userId: 'user_test',
      idempotencyKey: 'reversal_key_1',
    });

    expect(mockRpc).toHaveBeenCalledWith('increment_wallet_balance', expect.objectContaining({
      p_user_id: 'user_test',
    }));
  });
});

describe('entitlementService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('allows report action when user has credits', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockSingle
      .mockResolvedValueOnce({ data: { ...makeSub('core'), plan_entitlements: makeSub('core').plan_entitlements }, error: null })
      .mockResolvedValueOnce({ data: { current_balance: 3 }, error: null });

    const { canUserPerformAction } = await import('@/lib/billing/entitlementService');
    const result = await canUserPerformAction('user_test', 'appraisly.generate_report', 'desktop', 'appraisly');

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('allowed_credit_available');
    expect(result.will_consume_credit).toBe(true);
  });

  it('blocks free user with 0 credits from generating report', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockSingle
      .mockResolvedValueOnce({ data: { ...makeSub('free'), plan_entitlements: makeSub('free').plan_entitlements }, error: null })
      .mockResolvedValueOnce({ data: { current_balance: 0 }, error: null });

    const { canUserPerformAction } = await import('@/lib/billing/entitlementService');
    const result = await canUserPerformAction('user_test', 'appraisly.generate_report', 'desktop', 'appraisly');

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('blocked_free_no_credit');
    expect(result.requires_upgrade).toBe(true);
  });

  it('allows paid user with 0 credits to proceed via overage', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockSingle
      .mockResolvedValueOnce({ data: { ...makeSub('core'), plan_entitlements: makeSub('core').plan_entitlements }, error: null })
      .mockResolvedValueOnce({ data: { current_balance: 0 }, error: null });

    const { canUserPerformAction } = await import('@/lib/billing/entitlementService');
    const result = await canUserPerformAction('user_test', 'appraisly.generate_report', 'desktop', 'appraisly');

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('allowed_paid_overage');
    expect(result.will_bill_overage).toBe(true);
    expect(result.overage_price_cents).toBe(1499);
  });

  it('blocks bulk workflow for free and core plan', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockSingle
      .mockResolvedValueOnce({ data: { ...makeSub('core'), plan_entitlements: makeSub('core').plan_entitlements }, error: null })
      .mockResolvedValueOnce({ data: { current_balance: 5 }, error: null });

    const { canUserPerformAction } = await import('@/lib/billing/entitlementService');
    const result = await canUserPerformAction('user_test', 'workflows.bulk_process', 'desktop', 'lossstack');

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('blocked_feature_not_in_plan');
  });

  it('allows bulk workflow for pro plan', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockSingle
      .mockResolvedValueOnce({ data: { ...makeSub('pro'), plan_entitlements: makeSub('pro').plan_entitlements }, error: null })
      .mockResolvedValueOnce({ data: { current_balance: 0 }, error: null });

    const { canUserPerformAction } = await import('@/lib/billing/entitlementService');
    const result = await canUserPerformAction('user_test', 'workflows.bulk_process', 'desktop', 'lossstack');

    expect(result.allowed).toBe(true);
  });
});

describe('referralService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('processReferralSignup: awards 1 signup credit to referred user', async () => {
    mockRpc.mockResolvedValue({ error: null });
    // resolveReferralCode
    mockMaybeSingle
      .mockResolvedValueOnce({ data: { id: 'code_id', user_id: 'referrer_1', code: 'LS-ABC123', active: true }, error: null })
      // existing referral check
      .mockResolvedValueOnce({ data: null, error: null })
      // idempotency check in mutateCreditLedger
      .mockResolvedValueOnce({ data: null, error: null });

    mockSingle
      // referral insert
      .mockResolvedValueOnce({
        data: {
          id: 'ref_1', referrer_user_id: 'referrer_1', referred_user_id: 'referred_1',
          referral_code: 'LS-ABC123', status: 'signed_up',
          immediate_signup_credit_awarded: false, delayed_credit_awarded: false,
          referrer_credit_amount: 5, referred_immediate_credit_amount: 1, referred_delayed_credit_amount: 2,
          created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
          signed_up_at: new Date().toISOString(), subscription_started_at: null, qualified_at: null, rewarded_at: null,
        },
        error: null,
      })
      // ledger insert
      .mockResolvedValueOnce({ data: makeLedgerEntry('ledger_1'), error: null });

    const { processReferralSignup } = await import('@/lib/billing/referralService');
    const result = await processReferralSignup({ referredUserId: 'referred_1', referralCode: 'LS-ABC123' });

    expect(result.creditsAwarded).toBe(1);
    expect(mockRpc).toHaveBeenCalledWith('increment_wallet_balance', {
      p_user_id: 'referred_1',
      p_amount: 1,
    });
  });

  it('processReferralSignup: throws on self-referral', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockMaybeSingle.mockResolvedValueOnce({
      data: { id: 'code_id', user_id: 'same_user', code: 'LS-SELF', active: true },
      error: null,
    });

    const { processReferralSignup } = await import('@/lib/billing/referralService');
    await expect(
      processReferralSignup({ referredUserId: 'same_user', referralCode: 'LS-SELF' })
    ).rejects.toThrow('Self-referral not allowed');
  });

  it('processReferralSignup: idempotent — returns existing referral on duplicate', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockMaybeSingle
      .mockResolvedValueOnce({ data: { id: 'code_id', user_id: 'referrer_1', code: 'LS-DUP', active: true }, error: null })
      .mockResolvedValueOnce({
        data: {
          id: 'ref_existing', immediate_signup_credit_awarded: true, referred_immediate_credit_amount: 1,
        },
        error: null,
      });

    const { processReferralSignup } = await import('@/lib/billing/referralService');
    const result = await processReferralSignup({ referredUserId: 'referred_1', referralCode: 'LS-DUP' });

    expect(result.referral.id).toBe('ref_existing');
    expect(result.creditsAwarded).toBe(1);
  });
});

describe('billingLifecycle', () => {
  beforeEach(() => jest.clearAllMocks());

  it('allocateMonthlyCredits: awards 10 credits for pro plan', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockMaybeSingle.mockResolvedValueOnce({ data: null, error: null }); // no existing allocation
    mockSingle.mockResolvedValueOnce({ data: makeLedgerEntry('alloc_1'), error: null });

    const { allocateMonthlyCredits } = await import('@/lib/billing/billingLifecycle');
    const result = await allocateMonthlyCredits({
      userId: 'user_test',
      planCode: 'pro',
      billingSubscriptionId: 'sub_test',
      periodStart: new Date('2026-03-01'),
    });

    expect(result.credited).toBe(10);
    expect(result.skipped).toBe(false);
    expect(mockRpc).toHaveBeenCalledWith('increment_wallet_balance', {
      p_user_id: 'user_test',
      p_amount: 10,
    });
  });

  it('allocateMonthlyCredits: awards 25 credits for firm plan', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockMaybeSingle.mockResolvedValueOnce({ data: null, error: null });
    mockSingle.mockResolvedValueOnce({ data: makeLedgerEntry('alloc_2'), error: null });

    const { allocateMonthlyCredits } = await import('@/lib/billing/billingLifecycle');
    const result = await allocateMonthlyCredits({
      userId: 'user_test',
      planCode: 'firm',
      billingSubscriptionId: 'sub_test',
      periodStart: new Date('2026-03-01'),
    });

    expect(result.credited).toBe(25);
  });

  it('allocateMonthlyCredits: skips for free and core plans', async () => {
    const { allocateMonthlyCredits } = await import('@/lib/billing/billingLifecycle');
    const freeResult = await allocateMonthlyCredits({ userId: 'u', planCode: 'free', billingSubscriptionId: 'sub_1', periodStart: new Date() });
    const coreResult = await allocateMonthlyCredits({ userId: 'u', planCode: 'core', billingSubscriptionId: 'sub_1', periodStart: new Date() });

    expect(freeResult.skipped).toBe(true);
    expect(coreResult.skipped).toBe(true);
    expect(mockRpc).not.toHaveBeenCalledWith('increment_wallet_balance', expect.anything());
  });

  it('allocateMonthlyCredits: idempotent — skips if already allocated for period', async () => {
    mockRpc.mockResolvedValue({ error: null });
    mockMaybeSingle.mockResolvedValueOnce({ data: { id: 'existing_alloc' }, error: null }); // already exists

    const { allocateMonthlyCredits } = await import('@/lib/billing/billingLifecycle');
    const result = await allocateMonthlyCredits({
      userId: 'user_test',
      planCode: 'pro',
      billingSubscriptionId: 'sub_test',
      periodStart: new Date('2026-03-01'),
    });

    expect(result.skipped).toBe(true);
    expect(mockRpc).not.toHaveBeenCalledWith('increment_wallet_balance', expect.anything());
  });
});

describe('consumeReport idempotency', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns existing result on duplicate idempotency key', async () => {
    mockRpc.mockResolvedValue({ error: null });
    // existing report_usage_event
    mockMaybeSingle.mockResolvedValueOnce({
      data: {
        id: 'event_existing',
        billing_outcome: 'consumed_credit',
        credit_ledger_id: 'ledger_existing',
        overage_price_cents: null,
      },
      error: null,
    });
    mockSingle.mockResolvedValue({ data: { current_balance: 4 }, error: null });

    const { consumeReport } = await import('@/lib/billing/consumeReport');
    const result = await consumeReport({
      userId: 'user_test',
      actionKey: 'appraisly.generate_report',
      sourceSurface: 'desktop',
      sourceApp: 'appraisly',
      reportType: 'appraisal',
      idempotencyKey: 'duplicate_key',
    });

    expect(result.billing_outcome).toBe('consumed_credit');
    expect(result.credit_ledger_id).toBe('ledger_existing');
    expect(result.report_usage_event_id).toBe('event_existing');
  });
});
