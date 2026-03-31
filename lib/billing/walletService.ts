// =============================================================
// Wallet Service — all balance mutations go through here.
// Never mutate user_wallets directly outside this file.
// =============================================================

import { getSupabaseAdmin } from '@/lib/supabase';
import type {
  UserWallet,
  CreditLedgerRow,
  WalletAdminInput,
  TransactionType,
  Direction,
  SourceSurface,
  SourceApp,
} from '@/types/billing';

// ─── Ensure wallet + subscription_state rows exist ────────────

export async function ensureUserBillingRows(userId: string): Promise<void> {
  const db = getSupabaseAdmin();
  await db.rpc('ensure_user_billing_rows', { p_user_id: userId });
}

// ─── Get wallet (creates if missing) ─────────────────────────

export async function getWallet(userId: string): Promise<UserWallet> {
  const db = getSupabaseAdmin();
  await ensureUserBillingRows(userId);

  const { data, error } = await db
    .from('user_wallets')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) throw new Error(`Wallet fetch failed for ${userId}: ${error?.message}`);
  return data as UserWallet;
}

// ─── Core credit mutation ─────────────────────────────────────
// All credit/debit operations go through this function.
// Idempotent: if idempotency_key already exists, returns existing ledger row.

export async function mutateCreditLedger(params: {
  userId: string;
  transactionType: TransactionType;
  direction: Direction;
  amount: number;
  idempotencyKey: string;
  sourceSurface?: SourceSurface;
  sourceApp?: SourceApp;
  actionKey?: string;
  referenceType?: string;
  referenceId?: string;
  metadata?: Record<string, unknown>;
}): Promise<CreditLedgerRow> {
  const db = getSupabaseAdmin();

  // Idempotency check — return existing if already processed
  const { data: existing } = await db
    .from('credit_ledger')
    .select('*')
    .eq('idempotency_key', params.idempotencyKey)
    .maybeSingle();

  if (existing) return existing as CreditLedgerRow;

  // Insert ledger entry
  const { data: ledger, error: ledgerError } = await db
    .from('credit_ledger')
    .insert({
      user_id: params.userId,
      transaction_type: params.transactionType,
      direction: params.direction,
      amount: params.amount,
      source_surface: params.sourceSurface ?? null,
      source_app: params.sourceApp ?? null,
      action_key: params.actionKey ?? null,
      reference_type: params.referenceType ?? null,
      reference_id: params.referenceId ?? null,
      idempotency_key: params.idempotencyKey,
      metadata: params.metadata ?? {},
    })
    .select()
    .single();

  if (ledgerError || !ledger) {
    throw new Error(`Ledger insert failed: ${ledgerError?.message}`);
  }

  // Update wallet balance atomically
  if (params.direction === 'credit') {
    const { error: walletError } = await db.rpc('increment_wallet_balance', {
      p_user_id: params.userId,
      p_amount: params.amount,
    });
    if (walletError) throw new Error(`Wallet credit failed: ${walletError.message}`);
  } else {
    const { error: walletError } = await db.rpc('decrement_wallet_balance', {
      p_user_id: params.userId,
      p_amount: params.amount,
    });
    if (walletError) throw new Error(`Wallet debit failed: ${walletError.message}`);
  }

  return ledger as CreditLedgerRow;
}

// ─── Admin helpers ────────────────────────────────────────────

export async function creditUserWallet(input: WalletAdminInput): Promise<CreditLedgerRow> {
  await ensureUserBillingRows(input.userId);
  return mutateCreditLedger({
    userId: input.userId,
    transactionType: input.transactionType,
    direction: 'credit',
    amount: input.amount,
    idempotencyKey: input.idempotencyKey,
    sourceSurface: input.sourceSurface ?? 'admin',
    sourceApp: input.sourceApp,
    referenceType: input.referenceType,
    referenceId: input.referenceId,
    metadata: input.metadata,
  });
}

export async function debitUserWallet(input: WalletAdminInput): Promise<CreditLedgerRow> {
  await ensureUserBillingRows(input.userId);
  const wallet = await getWallet(input.userId);
  if (wallet.current_balance < input.amount) {
    throw new Error(`Insufficient balance: has ${wallet.current_balance}, needs ${input.amount}`);
  }
  return mutateCreditLedger({
    userId: input.userId,
    transactionType: input.transactionType,
    direction: 'debit',
    amount: input.amount,
    idempotencyKey: input.idempotencyKey,
    sourceSurface: input.sourceSurface ?? 'admin',
    sourceApp: input.sourceApp,
    referenceType: input.referenceType,
    referenceId: input.referenceId,
    metadata: input.metadata,
  });
}

// ─── Reversal ─────────────────────────────────────────────────

export async function reverseLedgerTransaction(params: {
  originalLedgerEntryId: string;
  userId: string;
  idempotencyKey: string;
  metadata?: Record<string, unknown>;
}): Promise<CreditLedgerRow> {
  const db = getSupabaseAdmin();

  // Idempotency check
  const { data: existing } = await db
    .from('credit_ledger')
    .select('*')
    .eq('idempotency_key', params.idempotencyKey)
    .maybeSingle();
  if (existing) return existing as CreditLedgerRow;

  // Fetch original entry
  const { data: original, error: origError } = await db
    .from('credit_ledger')
    .select('*')
    .eq('id', params.originalLedgerEntryId)
    .eq('user_id', params.userId)
    .single();

  if (origError || !original) {
    throw new Error(`Original ledger entry not found: ${params.originalLedgerEntryId}`);
  }

  // Reversal direction is opposite of original
  const reversalDirection: Direction = original.direction === 'debit' ? 'credit' : 'debit';

  return mutateCreditLedger({
    userId: params.userId,
    transactionType: 'report_reversal',
    direction: reversalDirection,
    amount: original.amount,
    idempotencyKey: params.idempotencyKey,
    sourceSurface: 'system',
    referenceType: 'credit_ledger',
    referenceId: params.originalLedgerEntryId,
    metadata: {
      ...(params.metadata ?? {}),
      reversed_entry_id: params.originalLedgerEntryId,
      original_transaction_type: original.transaction_type,
    },
  });
}

// ─── History ──────────────────────────────────────────────────

export async function getWalletHistory(
  userId: string,
  limit = 50,
  offset = 0
): Promise<CreditLedgerRow[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('credit_ledger')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(`Ledger history fetch failed: ${error.message}`);
  return (data ?? []) as CreditLedgerRow[];
}

export async function getReportUsageHistory(
  userId: string,
  limit = 50,
  offset = 0
) {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from('report_usage_events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(`Report usage history fetch failed: ${error.message}`);
  return data ?? [];
}
