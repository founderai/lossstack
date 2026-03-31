// GET /api/billing/entitlement?action=appraisly.generate_report&surface=desktop&app=appraisly
// POST /api/billing/entitlement — same but for mobile (body payload)
// Used by satellite apps and mobile to check action access before attempting.

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { canUserPerformAction } from '@/lib/billing/entitlementService';
import type { SourceSurface, SourceApp } from '@/types/billing';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const actionKey = req.nextUrl.searchParams.get('action') ?? '';
  const sourceSurface = (req.nextUrl.searchParams.get('surface') ?? 'desktop') as SourceSurface;
  const sourceApp = (req.nextUrl.searchParams.get('app') ?? 'lossstack') as SourceApp;
  const currentSeatCount = parseInt(req.nextUrl.searchParams.get('seat_count') ?? '0');

  if (!actionKey) return NextResponse.json({ error: 'action param required' }, { status: 400 });

  try {
    const result = await canUserPerformAction(userId, actionKey, sourceSurface, sourceApp, {
      currentSeatCount,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('Entitlement check error:', err);
    return NextResponse.json({ error: 'Entitlement check failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { actionKey, sourceSurface = 'mobile', sourceApp = 'lossstack', context = {} } = body;

    if (!actionKey) return NextResponse.json({ error: 'actionKey required' }, { status: 400 });

    const result = await canUserPerformAction(userId, actionKey, sourceSurface, sourceApp, context);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Entitlement check error:', err);
    return NextResponse.json({ error: 'Entitlement check failed' }, { status: 500 });
  }
}
