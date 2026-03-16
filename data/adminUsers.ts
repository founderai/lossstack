// ─── MOCK DATA — replace with real Stripe/Clerk API calls when ready ─────────
// This file is the shape reference for the admin dashboard.

export type UserStatus = "active" | "churned" | "trial";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  apps: ("appraisly" | "imagelablr" | "restorecam")[];
  tier: string;
  status: UserStatus;
  joinedAt: string;   // ISO date
  churnedAt?: string; // ISO date — only if status === "churned"
  monthlyRevenue: number;
}

export const mockUsers: AdminUser[] = [
  {
    id: "u-001",
    name: "John Martinez",
    email: "jmartinez@example.com",
    apps: ["appraisly", "imagelablr", "restorecam"],
    tier: "3-App Bundle / Elite",
    status: "active",
    joinedAt: "2026-03-01",
    monthlyRevenue: 935.25,
  },
  {
    id: "u-002",
    name: "Sarah Chen",
    email: "schen@adjusterco.com",
    apps: ["appraisly"],
    tier: "Appraisly Pro",
    status: "active",
    joinedAt: "2026-03-10",
    monthlyRevenue: 199,
  },
  {
    id: "u-003",
    name: "Mike Devlin",
    email: "mdevlin@restorepro.com",
    apps: ["restorecam"],
    tier: "RestoreCam Enterprise",
    status: "trial",
    joinedAt: "2026-03-13",
    monthlyRevenue: 0,
  },
  {
    id: "u-004",
    name: "Lisa Nguyen",
    email: "lnguyen@claims.io",
    apps: ["appraisly", "imagelablr"],
    tier: "2-App Bundle / Solo",
    status: "churned",
    joinedAt: "2026-02-01",
    churnedAt: "2026-03-05",
    monthlyRevenue: 0,
  },
];
