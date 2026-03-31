// GET  /api/billing/referrals — get referral dashboard data
// POST /api/billing/referrals — process a referral signup (called on new user signup)

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  getReferralDashboard,
  processReferralSignup,
  getOrCreateReferralCode,
} from '@/lib/billing/referralService';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const dashboard = await getReferralDashboard(userId);
    return NextResponse.json(dashboard);
  } catch (err) {
    console.error('Referral dashboard error:', err);
    return NextResponse.json({ error: 'Failed to fetch referral data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { action, referralCode } = body;

    if (action === 'get_or_create_code') {
      const code = await getOrCreateReferralCode(userId);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lossstack.com';
      return NextResponse.json({
        code: code.code,
        url: `${siteUrl}/sign-up?ref=${code.code}`,
      });
    }

    if (action === 'process_signup') {
      if (!referralCode) {
        return NextResponse.json({ error: 'referralCode required' }, { status: 400 });
      }
      const result = await processReferralSignup({
        referredUserId: userId,
        referralCode,
      });
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    if (msg.includes('Self-referral')) {
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    console.error('Referral POST error:', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
