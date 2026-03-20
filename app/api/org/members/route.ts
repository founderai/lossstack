import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// GET /api/org/members?orgId=xxx
export async function GET(req: NextRequest) {
  const orgId = req.nextUrl.searchParams.get("orgId");
  if (!orgId) return NextResponse.json({ error: "orgId required" }, { status: 400 });

  try {
    const db = getSupabaseAdmin();
    const { data: members, error } = await db
      .from("organization_users")
      .select("*")
      .eq("org_id", orgId)
      .order("created_at", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ members: members ?? [] });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
}

// DELETE /api/org/members — remove a member
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { orgId, userId, ownerEmail } = body;

  if (!orgId || !userId || !ownerEmail) {
    return NextResponse.json({ error: "orgId, userId, and ownerEmail required" }, { status: 400 });
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

    // Cannot remove org owner
    const { data: target } = await db
      .from("organization_users")
      .select("role")
      .eq("org_id", orgId)
      .eq("user_id", userId)
      .single();

    if (target?.role === "owner") {
      return NextResponse.json({ error: "Cannot remove the organization owner" }, { status: 400 });
    }

    await db
      .from("organization_users")
      .delete()
      .eq("org_id", orgId)
      .eq("user_id", userId);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
}
