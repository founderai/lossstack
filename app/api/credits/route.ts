import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DATA_PATH = join(process.cwd(), "data", "credits.json");

export interface CreditRequest {
  id: string;
  email: string;
  description: string;
  requestedAt: string;
  status: "pending" | "approved" | "denied" | "flagged";
  creditsGranted: number;
  resolvedAt?: string;
  adminNote?: string;
  // abuse tracking
  requestCount: number; // total lifetime requests from this email
}

export interface CreditGrant {
  id: string;
  email: string;
  credits: number;
  reason: string;
  grantedAt: string;
  grantedBy: string;
}

interface CreditsData {
  requests: CreditRequest[];
  grants: CreditGrant[];
}

function readData(): CreditsData {
  try {
    return JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return { requests: [], grants: [] };
  }
}

function writeData(data: CreditsData) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET — list all requests and grants (admin only, no auth here — protected by admin page password)
export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

// POST — two actions based on `action` field:
//   action: "request" — user submits a courtesy credit request
//   action: "resolve" — admin approves/denies/flags a request
//   action: "grant"   — admin manually grants credits to any email
export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = readData();

  // ── User submits a courtesy credit request ──────────────────────────────
  if (body.action === "request") {
    const { email, description } = body as { email: string; description: string };

    if (!email || !description?.trim()) {
      return NextResponse.json({ error: "Email and description are required." }, { status: 400 });
    }

    // Count how many times this email has already requested
    const previousRequests = data.requests.filter(
      (r) => r.email.toLowerCase() === email.toLowerCase()
    );
    const requestCount = previousRequests.length + 1;

    // Check monthly limit: max 3 requests per month per email
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const thisMonthRequests = previousRequests.filter(
      (r) => r.requestedAt >= monthStart
    );

    if (thisMonthRequests.length >= 3) {
      return NextResponse.json(
        { error: "Monthly request limit reached (3/month). Contact support if you need further assistance." },
        { status: 429 }
      );
    }

    const newRequest: CreditRequest = {
      id: `cr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      email: email.toLowerCase().trim(),
      description: description.trim(),
      requestedAt: now.toISOString(),
      status: "pending",
      creditsGranted: 0,
      requestCount,
    };

    // Auto-flag if this email has more than 5 lifetime requests
    if (requestCount > 5) {
      newRequest.status = "flagged";
      newRequest.adminNote = `Auto-flagged: ${requestCount} lifetime requests from this email.`;
    }

    data.requests.unshift(newRequest);
    writeData(data);

    const monthlyUsed = thisMonthRequests.length + 1;
    return NextResponse.json({
      success: true,
      id: newRequest.id,
      monthlyUsed,
      monthlyLimit: 3,
      autoFlagged: newRequest.status === "flagged",
    });
  }

  // ── Admin resolves a request ────────────────────────────────────────────
  if (body.action === "resolve") {
    const { id, status, creditsGranted, adminNote } = body as {
      id: string;
      status: CreditRequest["status"];
      creditsGranted: number;
      adminNote?: string;
    };

    const idx = data.requests.findIndex((r) => r.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    data.requests[idx] = {
      ...data.requests[idx],
      status,
      creditsGranted: creditsGranted ?? 0,
      resolvedAt: new Date().toISOString(),
      adminNote: adminNote ?? data.requests[idx].adminNote,
    };

    // If approved, also log a grant record
    if (status === "approved" && creditsGranted > 0) {
      data.grants.unshift({
        id: `grant_${Date.now()}`,
        email: data.requests[idx].email,
        credits: creditsGranted,
        reason: `Courtesy credit: ${data.requests[idx].description.slice(0, 80)}`,
        grantedAt: new Date().toISOString(),
        grantedBy: "admin:resolve",
      });
    }

    writeData(data);
    return NextResponse.json({ success: true, request: data.requests[idx] });
  }

  // ── Admin manually grants credits to any email ──────────────────────────
  if (body.action === "grant") {
    const { email, credits, reason } = body as {
      email: string;
      credits: number;
      reason: string;
    };

    if (!email || !credits || credits < 1) {
      return NextResponse.json({ error: "Email and a positive credit amount are required." }, { status: 400 });
    }

    const grant: CreditGrant = {
      id: `grant_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      email: email.toLowerCase().trim(),
      credits,
      reason: reason?.trim() || "Manual admin grant",
      grantedAt: new Date().toISOString(),
      grantedBy: "admin:manual",
    };

    data.grants.unshift(grant);
    writeData(data);
    return NextResponse.json({ success: true, grant });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
