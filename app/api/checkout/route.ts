import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripePriceIds, stripeCouponIds } from "@/data/pricing";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

  try {
    const { selections } = await req.json();
    // selections: Array<{ appId: string; tierName: string }>

    if (!selections || selections.length < 2) {
      return NextResponse.json(
        { error: "Select at least 2 apps to get a bundle." },
        { status: 400 }
      );
    }

    // Map each selection to a Stripe Price ID
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const { appId, tierName } of selections) {
      const priceId = stripePriceIds[appId]?.[tierName];
      if (!priceId) {
        return NextResponse.json(
          { error: `No price found for ${appId} ${tierName}` },
          { status: 400 }
        );
      }
      lineItems.push({ price: priceId, quantity: 1 });
    }

    // Apply bundle coupon based on number of apps
    const couponId =
      selections.length >= 3
        ? stripeCouponIds.threeApp
        : stripeCouponIds.twoApp;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      discounts: [{ coupon: couponId }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lossstack.com"}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lossstack.com"}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
