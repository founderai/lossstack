import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// POST /api/org/invite — add a user to an organization
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orgId, inviteeEmail, role = "member", ownerEmail } = body;

  if (!orgId || !inviteeEmail || !ownerEmail) {
    return NextResponse.json(
      { error: "orgId, inviteeEmail, and ownerEmail required" },
      { status: 400 }
    );
  }

  try {
    const db = getSupabaseAdmin();

    // Verify requester is owner or admin
    const { data: requester } = await db
      .from("organization_users")
      .select("role")
      .eq("org_id", orgId)
      .eq("user_id", ownerEmail.toLowerCase().trim())
      .single();

    if (!requester || (requester.role !== "owner" && requester.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get org details
    const { data: org } = await db
      .from("organizations")
      .select("included_seats")
      .eq("id", orgId)
      .single();

    if (!org) return NextResponse.json({ error: "Org not found" }, { status: 404 });

    // Get current member count
    const { count: currentCount } = await db
      .from("organization_users")
      .select("*", { count: "exact", head: true })
      .eq("org_id", orgId);

    // Get extra purchased seats
    const { data: sub } = await db
      .from("org_subscriptions")
      .select("seat_count")
      .eq("org_id", orgId)
      .single();

    const extraSeats = sub?.seat_count ?? 0;
    const totalSeats = org.included_seats + extraSeats;
    const usedSeats = currentCount ?? 0;

    if (usedSeats >= totalSeats) {
      return NextResponse.json(
        {
          error: "Seat limit reached. Purchase additional seats to add more team members.",
          code: "SEAT_LIMIT_REACHED",
          totalSeats,
          usedSeats,
        },
        { status: 402 }
      );
    }

    // Add member
    const { error: insertError } = await db.from("organization_users").insert({
      org_id: orgId,
      user_id: inviteeEmail.toLowerCase().trim(),
      role,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "User is already a member of this organization" }, { status: 409 });
      }
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `${inviteeEmail} added to organization` });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
}
