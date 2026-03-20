import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { PLAN_CONFIG, type PlanId } from "@/lib/planConfig";

// POST /api/org/seats — purchase additional seats via Stripe
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orgId, extraSeats, ownerEmail } = body;

  if (!orgId || extraSeats === undefined || !ownerEmail) {
    return NextResponse.json({ error: "orgId, extraSeats, and ownerEmail required" }, { status: 400 });
  }

  if (typeof extraSeats !== "number" || extraSeats < 0) {
    return NextResponse.json({ error: "extraSeats must be a non-negative number" }, { status: 400 });
  }

  try {
    const db = getSupabaseAdmin();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
    });

    // Verify owner
    const { data: requester } = await db
      .from("organization_users")
      .select("role")
      .eq("org_id", orgId)
      .eq("user_id", ownerEmail.toLowerCase().trim())
      .single();

    if (!requester || requester.role !== "owner") {
      return NextResponse.json({ error: "Only the org owner can modify billing" }, { status: 403 });
    }

    const { data: org } = await db
      .from("organizations")
      .select("*")
      .eq("id", orgId)
      .single();

    if (!org) return NextResponse.json({ error: "Org not found" }, { status: 404 });

    const { data: sub } = await db
      .from("org_subscriptions")
      .select("*")
      .eq("org_id", orgId)
      .single();

    const planConfig = PLAN_CONFIG[org.plan as PlanId];
    const seatPriceId = planConfig?.stripeSeatPriceId;

    // If no Stripe seat price ID is configured yet — just update the DB count
    if (!seatPriceId) {
      await db
        .from("org_subscriptions")
        .upsert({ org_id: orgId, seat_count: extraSeats }, { onConflict: "org_id" });
      return NextResponse.json({ success: true, stripeUpdated: false, note: "Stripe seat price not configured — DB updated only." });
    }

    if (sub?.stripe_subscription_id) {
      // Update existing Stripe subscription quantity
      if (sub.stripe_seat_item_id) {
        await stripe.subscriptions.update(sub.stripe_subscription_id, {
          items: [{ id: sub.stripe_seat_item_id, quantity: Math.max(0, extraSeats) }],
        });
        await db
          .from("org_subscriptions")
          .update({ seat_count: extraSeats })
          .eq("org_id", orgId);
      } else if (extraSeats > 0) {
        const updatedSub = await stripe.subscriptions.update(sub.stripe_subscription_id, {
          items: [{ price: seatPriceId, quantity: extraSeats }],
        });
        const seatItem = updatedSub.items.data.find((item) => item.price.id === seatPriceId);
        await db
          .from("org_subscriptions")
          .update({ stripe_seat_item_id: seatItem?.id ?? null, seat_count: extraSeats })
          .eq("org_id", orgId);
      }
      return NextResponse.json({ success: true, stripeUpdated: true });
    }

    // No Stripe subscription yet — create a Stripe Checkout session for seats
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: seatPriceId, quantity: extraSeats }],
      metadata: { orgId, ownerEmail: ownerEmail.toLowerCase() },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lossstack.com"}/team?seat_success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lossstack.com"}/team`,
    });

    // Optimistically update DB
    await db
      .from("org_subscriptions")
      .upsert({ org_id: orgId, seat_count: extraSeats }, { onConflict: "org_id" });

    return NextResponse.json({ success: true, checkoutUrl: session.url });
  } catch (err) {
    console.error("POST /api/org/seats error:", err);
    return NextResponse.json({ error: "Failed to update seats" }, { status: 500 });
  }
}
