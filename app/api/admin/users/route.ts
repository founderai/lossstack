import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-02-25.clover" });

// Map Stripe price IDs → app name
const PRICE_TO_APP: Record<string, "appraisly" | "imagelablr" | "restorecam"> = {
  price_1T7M1wGhSLQ9s5VgMZDVvVtN: "appraisly",
  price_1T7M1gGhSLQ9s5VgjjXXXdmf: "appraisly",
  price_1T7M1OGhSLQ9s5Vgcv6DVhjg: "appraisly",
  price_1TAMs9GhSLQ9s5VgFCTCSDFW: "imagelablr",
  price_1TAMsaGhSLQ9s5Vg5Zo7OuEm: "imagelablr",
  price_1TAMt3GhSLQ9s5Vg8tJYRUNz: "imagelablr",
  price_1TAMFrGhSLQ9s5VgCTCaFvnm: "restorecam",
  price_1TAMGfGhSLQ9s5Vggw4E8td7: "restorecam",
  price_1TAMHDGhSLQ9s5VgDBnoLeoO: "restorecam",
};

function stripeStatusToAdmin(status: Stripe.Subscription.Status): "active" | "churned" | "trial" {
  if (status === "active") return "active";
  if (status === "trialing") return "trial";
  return "churned";
}

export async function GET() {
  try {
    // Fetch all subscriptions (active, trialing, canceled, past_due)
    const subscriptions = await stripe.subscriptions.list({
      limit: 100,
      expand: ["data.customer", "data.items.data.price"],
      status: "all",
    });

    // Group by customer so multi-app subscribers merge into one row
    const customerMap: Record<string, {
      id: string;
      name: string;
      email: string;
      apps: Set<"appraisly" | "imagelablr" | "restorecam">;
      tier: string;
      status: "active" | "churned" | "trial";
      joinedAt: string;
      churnedAt?: string;
      monthlyRevenue: number;
    }> = {};

    for (const sub of subscriptions.data) {
      const customer = sub.customer as Stripe.Customer;
      if (!customer || (customer as unknown as { deleted?: boolean }).deleted) continue;

      const custId = customer.id;
      const email = customer.email ?? "—";
      const name = customer.name ?? email;

      if (!customerMap[custId]) {
        customerMap[custId] = {
          id: custId,
          name,
          email,
          apps: new Set(),
          tier: "",
          status: stripeStatusToAdmin(sub.status),
          joinedAt: new Date(sub.start_date * 1000).toISOString().split("T")[0],
          churnedAt: sub.canceled_at
            ? new Date(sub.canceled_at * 1000).toISOString().split("T")[0]
            : undefined,
          monthlyRevenue: 0,
        };
      }

      const entry = customerMap[custId];

      // If any sub is active/trialing, mark the customer as such
      const subStatus = stripeStatusToAdmin(sub.status);
      if (subStatus === "active" || (subStatus === "trial" && entry.status === "churned")) {
        entry.status = subStatus;
        entry.churnedAt = undefined;
      }

      for (const item of sub.items.data) {
        const priceId = item.price.id;
        const app = PRICE_TO_APP[priceId];
        if (app) entry.apps.add(app);

        // Add to MRR only for active subs
        if (sub.status === "active" || sub.status === "trialing") {
          const unitAmount = item.price.unit_amount ?? 0;
          const interval = item.price.recurring?.interval;
          const monthly = interval === "year" ? unitAmount / 12 : unitAmount;
          entry.monthlyRevenue += monthly / 100;
        }

        // Build tier label from price nickname or product
        if (!entry.tier && item.price.nickname) {
          entry.tier = item.price.nickname;
        }
      }
    }

    const users = Object.values(customerMap).map((u) => ({
      ...u,
      apps: Array.from(u.apps),
      monthlyRevenue: Math.round(u.monthlyRevenue * 100) / 100,
    }));

    // Sort: active first, then trial, then churned
    const order = { active: 0, trial: 1, churned: 2 };
    users.sort((a, b) => order[a.status] - order[b.status]);

    return NextResponse.json(users);
  } catch (err) {
    console.error("Admin users API error:", err);
    return NextResponse.json({ error: "Failed to load subscribers." }, { status: 500 });
  }
}
