import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { PLAN_CONFIG, type PlanId } from "@/lib/planConfig";

// GET /api/org?ownerEmail=xxx
export async function GET(req: NextRequest) {
  const ownerEmail = req.nextUrl.searchParams.get("ownerEmail");
  if (!ownerEmail) {
    return NextResponse.json({ error: "ownerEmail required" }, { status: 400 });
  }

  try {
    const db = getSupabaseAdmin();

    const { data: org, error } = await db
      .from("organizations")
      .select("*")
      .eq("owner_id", ownerEmail.toLowerCase().trim())
      .single();

    if (error || !org) return NextResponse.json({ org: null });

    const { data: members } = await db
      .from("organization_users")
      .select("*")
      .eq("org_id", org.id)
      .order("created_at", { ascending: true });

    const { data: subscription } = await db
      .from("org_subscriptions")
      .select("*")
      .eq("org_id", org.id)
      .single();

    const usedSeats = members?.length ?? 1;
    const extraSeats = subscription?.seat_count ?? 0;
    const totalSeats = org.included_seats + extraSeats;

    return NextResponse.json({
      org: {
        ...org,
        members: members ?? [],
        subscription: subscription ?? null,
        totalSeats,
        usedSeats,
      },
    });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
}

// POST /api/org — create organization
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { ownerEmail, orgName, plan = "core" } = body;

  if (!ownerEmail || !orgName) {
    return NextResponse.json({ error: "ownerEmail and orgName required" }, { status: 400 });
  }

  try {
    const db = getSupabaseAdmin();
    const planConfig = PLAN_CONFIG[plan as PlanId];

    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const { data: existing } = await db
      .from("organizations")
      .select("id")
      .eq("owner_id", ownerEmail.toLowerCase().trim())
      .single();

    if (existing) {
      return NextResponse.json({ error: "Organization already exists for this email" }, { status: 409 });
    }

    const { data: org, error: orgError } = await db
      .from("organizations")
      .insert({
        name: orgName.trim(),
        owner_id: ownerEmail.toLowerCase().trim(),
        plan,
        included_seats: planConfig.includedSeats,
        seat_price: planConfig.seatPrice,
      })
      .select()
      .single();

    if (orgError || !org) {
      return NextResponse.json({ error: orgError?.message ?? "Failed to create org" }, { status: 500 });
    }

    await db.from("organization_users").insert({
      org_id: org.id,
      user_id: ownerEmail.toLowerCase().trim(),
      role: "owner",
    });

    return NextResponse.json({ org }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
}

// PATCH /api/org — update org name or plan
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { orgId, ownerEmail, name, plan } = body;

  if (!orgId || !ownerEmail) {
    return NextResponse.json({ error: "orgId and ownerEmail required" }, { status: 400 });
  }

  try {
    const db = getSupabaseAdmin();

    const { data: org } = await db
      .from("organizations")
      .select("owner_id")
      .eq("id", orgId)
      .single();

    if (!org || org.owner_id !== ownerEmail.toLowerCase().trim()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updates: Record<string, unknown> = {};
    if (name) updates.name = name.trim();
    if (plan && PLAN_CONFIG[plan as PlanId]) {
      const planConfig = PLAN_CONFIG[plan as PlanId];
      updates.plan = plan;
      updates.included_seats = planConfig.includedSeats;
      updates.seat_price = planConfig.seatPrice;
    }

    const { data: updated } = await db
      .from("organizations")
      .update(updates)
      .eq("id", orgId)
      .select()
      .single();

    return NextResponse.json({ org: updated });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
}
