// POST /api/billing/consume — consume a report credit or create overage event.
// Called by satellite apps and mobile before/after report generation.

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { consumeReport } from '@/lib/billing/consumeReport';
import type { SourceSurface, SourceApp } from '@/types/billing';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      actionKey,
      sourceSurface = 'desktop',
      sourceApp = 'lossstack',
      reportType,
      idempotencyKey,
      metadata = {},
    } = body as {
      actionKey: string;
      sourceSurface?: SourceSurface;
      sourceApp?: SourceApp;
      reportType: string;
      idempotencyKey: string;
      metadata?: Record<string, unknown>;
    };

    if (!actionKey || !reportType || !idempotencyKey) {
      return NextResponse.json(
        { error: 'actionKey, reportType, and idempotencyKey are required' },
        { status: 400 }
      );
    }

    const result = await consumeReport({
      userId,
      actionKey,
      sourceSurface,
      sourceApp,
      reportType,
      idempotencyKey,
      metadata,
    });

    return NextResponse.json(result, {
      status: result.success ? 200 : 402,
    });
  } catch (err) {
    console.error('consumeReport error:', err);
    return NextResponse.json({ error: 'Report consumption failed' }, { status: 500 });
  }
}
