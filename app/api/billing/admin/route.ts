// POST /api/billing/admin — admin-only wallet operations
// Protected by admin password header.

import { NextRequest, NextResponse } from 'next/server';
import {
  creditUserWallet,
  debitUserWallet,
  reverseLedgerTransaction,
  getWalletHistory,
  getReportUsageHistory,
  getWallet,
} from '@/lib/billing/walletService';
import { getSupabaseAdmin } from '@/lib/supabase';

function isAdminAuthorized(req: NextRequest): boolean {
  const password = req.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  try {
    const db = getSupabaseAdmin();

    const [wallet, ledger, usage, sub, referrals] = await Promise.all([
      getWallet(userId),
      getWalletHistory(userId, 20, 0),
      getReportUsageHistory(userId, 20, 0),
      db.from('subscription_state').select('*').eq('user_id', userId).maybeSingle(),
      db.from('referrals')
        .select('*')
        .or(`referrer_user_id.eq.${userId},referred_user_id.eq.${userId}`)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    return NextResponse.json({
      wallet,
      ledger,
      usage,
      subscription: sub.data ?? null,
      referrals: referrals.data ?? [],
    });
  } catch (err) {
    console.error('Admin wallet inspect error:', err);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, userId, amount, transactionType, idempotencyKey,
            referenceType, referenceId, metadata,
            originalLedgerEntryId } = body;

    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    if (action === 'credit') {
      if (!amount || !idempotencyKey) {
        return NextResponse.json({ error: 'amount and idempotencyKey required' }, { status: 400 });
      }
      const entry = await creditUserWallet({
        userId,
        amount,
        transactionType: transactionType ?? 'admin_adjustment',
        idempotencyKey,
        sourceSurface: 'admin',
        referenceType,
        referenceId,
        metadata,
      });
      return NextResponse.json({ success: true, entry });
    }

    if (action === 'debit') {
      if (!amount || !idempotencyKey) {
        return NextResponse.json({ error: 'amount and idempotencyKey required' }, { status: 400 });
      }
      const entry = await debitUserWallet({
        userId,
        amount,
        transactionType: transactionType ?? 'admin_adjustment',
        idempotencyKey,
        sourceSurface: 'admin',
        referenceType,
        referenceId,
        metadata,
      });
      return NextResponse.json({ success: true, entry });
    }

    if (action === 'reverse') {
      if (!originalLedgerEntryId || !idempotencyKey) {
        return NextResponse.json(
          { error: 'originalLedgerEntryId and idempotencyKey required' },
          { status: 400 }
        );
      }
      const entry = await reverseLedgerTransaction({
        originalLedgerEntryId,
        userId,
        idempotencyKey,
        metadata,
      });
      return NextResponse.json({ success: true, entry });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Admin billing action error:', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
