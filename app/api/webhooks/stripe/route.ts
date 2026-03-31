// =============================================================
// Stripe Webhook Handler
// Handles billing lifecycle events and syncs subscription state.
// =============================================================

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  handleSubscriptionActivated,
  handleSubscriptionRenewed,
  handleSubscriptionCanceled,
  handlePaymentFailed,
  handlePlanChange,
  getUserIdByStripeCustomer,
} from '@/lib/billing/billingLifecycle';
import { STRIPE_PLAN_MAP } from '@/lib/billing/stripePlanMap';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {

      // ── New subscription created and active ─────────────────
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription;
        if (sub.status !== 'active' && sub.status !== 'trialing') break;

        const userId = await resolveUserId(sub.customer as string, sub.metadata);
        if (!userId) break;

        const planCode = resolvePlanCode(sub);

        await handleSubscriptionActivated({
          userId,
          planCode,
          billingCustomerId: sub.customer as string,
          billingSubscriptionId: sub.id,
          currentPeriodStart: new Date((sub as any).current_period_start * 1000),
          currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
          seatsPurchased: resolveSeatCount(sub),
        });
        break;
      }

      // ── Invoice paid = renewal or first payment ─────────────
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as any).subscription as string | null;
        if (!subscriptionId) break;

        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = await resolveUserId(sub.customer as string, sub.metadata);
        if (!userId) break;

        const planCode = resolvePlanCode(sub);

        await handleSubscriptionRenewed({
          userId,
          planCode,
          billingCustomerId: sub.customer as string,
          billingSubscriptionId: sub.id,
          currentPeriodStart: new Date((sub as any).current_period_start * 1000),
          currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
          seatsPurchased: resolveSeatCount(sub),
        });
        break;
      }

      // ── Subscription updated (plan change, seat change) ─────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await resolveUserId(sub.customer as string, sub.metadata);
        if (!userId) break;

        const planCode = resolvePlanCode(sub);

        await handlePlanChange({
          userId,
          newPlanCode: planCode,
          billingCustomerId: sub.customer as string,
          billingSubscriptionId: sub.id,
          currentPeriodStart: new Date((sub as any).current_period_start * 1000),
          currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
          seatsPurchased: resolveSeatCount(sub),
        });
        break;
      }

      // ── Subscription canceled ───────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await resolveUserId(sub.customer as string, sub.metadata);
        if (!userId) break;

        await handleSubscriptionCanceled({
          userId,
          billingCustomerId: sub.customer as string,
          billingSubscriptionId: sub.id,
        });
        break;
      }

      // ── Payment failed ──────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as any).subscription as string | null;
        if (!subscriptionId) break;

        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = await resolveUserId(sub.customer as string, sub.metadata);
        if (!userId) break;

        await handlePaymentFailed({
          userId,
          billingSubscriptionId: sub.id,
        });
        break;
      }

      default:
        // Unhandled event types — ignore silently
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`Webhook handler error for ${event.type}:`, err);
    return NextResponse.json({ error: 'Internal handler error' }, { status: 500 });
  }
}

// ─── Helpers ──────────────────────────────────────────────────

async function resolveUserId(
  customerId: string,
  metadata: Stripe.Metadata
): Promise<string | null> {
  // Prefer clerk_user_id stored in subscription metadata
  if (metadata?.clerk_user_id) return metadata.clerk_user_id;

  // Fallback: look up by customer ID in our DB
  return getUserIdByStripeCustomer(customerId);
}

function resolvePlanCode(sub: Stripe.Subscription): string {
  const priceId = sub.items.data[0]?.price?.id ?? '';
  return STRIPE_PLAN_MAP[priceId] ?? 'core';
}

function resolveSeatCount(sub: Stripe.Subscription): number {
  // Seat quantity is the quantity on the first line item
  return sub.items.data[0]?.quantity ?? 1;
}
