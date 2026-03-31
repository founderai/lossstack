// GET /api/billing/wallet — returns current wallet state for the authenticated user

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getWallet, getWalletHistory } from '@/lib/billing/walletService';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '20');
    const offset = parseInt(req.nextUrl.searchParams.get('offset') ?? '0');
    const includeHistory = req.nextUrl.searchParams.get('history') === 'true';

    const wallet = await getWallet(userId);

    // Fetch subscription state alongside
    const db = getSupabaseAdmin();
    const { data: sub } = await db
      .from('subscription_state')
      .select('current_plan_code, subscription_status, current_period_end, seats_purchased')
      .eq('user_id', userId)
      .maybeSingle();

    const history = includeHistory ? await getWalletHistory(userId, limit, offset) : [];

    return NextResponse.json({
      wallet,
      subscription: sub ?? null,
      history,
    });
  } catch (err) {
    console.error('Wallet fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch wallet' }, { status: 500 });
  }
}
