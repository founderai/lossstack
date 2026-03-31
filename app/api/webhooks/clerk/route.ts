// =============================================================
// Clerk Webhook Handler — user.created event
//
// Triggered by Clerk when a new user account is created.
// Provisions billing rows and processes any pending referral.
//
// Required env vars:
//   CLERK_WEBHOOK_SECRET  — from Clerk Dashboard > Webhooks > Signing Secret
//
// Setup in Clerk Dashboard:
//   Endpoint URL: https://lossstack.com/api/webhooks/clerk
//   Events to subscribe: user.created
// =============================================================

import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { ensureUserBillingRows } from '@/lib/billing/walletService';
import { processReferralSignup } from '@/lib/billing/referralService';
import { getSupabaseAdmin } from '@/lib/supabase';

interface ClerkUserCreatedEvent {
  type: 'user.created';
  data: {
    id: string;
    email_addresses: { email_address: string; id: string }[];
    primary_email_address_id: string;
    first_name: string | null;
    last_name: string | null;
    unsafe_metadata: Record<string, unknown>;
    public_metadata: Record<string, unknown>;
  };
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  // Verify Svix signature
  const svixId = req.headers.get('svix-id');
  const svixTimestamp = req.headers.get('svix-timestamp');
  const svixSignature = req.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const body = await req.text();

  let event: ClerkUserCreatedEvent;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkUserCreatedEvent;
  } catch (err) {
    console.error('Clerk webhook verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'user.created') {
    // Only handle user.created — silently accept other events
    return NextResponse.json({ received: true });
  }

  const userId = event.data.id;

  try {
    // ── 1. Provision billing rows ──────────────────────────────
    // Creates user_wallets + subscription_state rows if missing.
    // Idempotent — safe to call on every user.created event.
    await ensureUserBillingRows(userId);

    // ── 2. Process referral if code was stored in public_metadata ──
    // When the signup page captures a ref= URL param, it stores it
    // in sessionStorage client-side. As a fallback, satellite apps
    // should also write { ref_code: "LS-..." } to public_metadata
    // on the Clerk user object during their own signup flows.
    const refCode =
      (event.data.public_metadata?.ref_code as string | undefined) ??
      (event.data.unsafe_metadata?.ref_code as string | undefined);

    if (refCode) {
      try {
        await processReferralSignup({
          referredUserId: userId,
          referralCode: refCode,
        });
        console.log(`Referral processed for new user ${userId} via code ${refCode}`);
      } catch (refErr) {
        // Non-fatal — log but do not fail the webhook
        console.error(`Referral processing failed for ${userId}:`, refErr);
      }
    }

    // ── 3. Store primary email for lookup convenience ─────────
    const primaryEmail = event.data.email_addresses.find(
      (e) => e.id === event.data.primary_email_address_id
    )?.email_address;

    if (primaryEmail) {
      const db = getSupabaseAdmin();
      // Update subscription_state with email for admin lookups
      // This is non-critical — just a convenience field if you add one
      // Currently subscription_state has no email column, so we skip the upsert
      // and just log it. Add an `email` column to subscription_state if needed.
      console.log(`New user provisioned: ${userId} <${primaryEmail}>`);
    }

    return NextResponse.json({ received: true, userId });
  } catch (err) {
    console.error(`Clerk webhook error for user ${userId}:`, err);
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }
}
