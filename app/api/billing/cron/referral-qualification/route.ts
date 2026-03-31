// GET /api/billing/cron/referral-qualification
// Daily cron job — run via Vercel Cron or external scheduler.
// Protected by CRON_SECRET env var.

import { NextRequest, NextResponse } from 'next/server';
import { runDailyReferralQualificationJob } from '@/lib/billing/referralService';

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') ?? req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runDailyReferralQualificationJob();
    console.log('Referral qualification job complete:', result);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('Referral qualification job failed:', err);
    return NextResponse.json({ error: 'Job failed' }, { status: 500 });
  }
}
