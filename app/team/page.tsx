"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users, Plus, Trash2, Crown, Shield, User,
  AlertTriangle, CheckCircle, Loader2, ArrowRight,
  Building2, CreditCard, ChevronDown, X
} from "lucide-react";
import Footer from "@/components/sections/Footer";
import { PLAN_CONFIG, type PlanId, getSeatPriceDollars } from "@/lib/planConfig";
import type { OrgWithDetails, OrgUser } from "@/types/org";
import { cn } from "@/lib/utils";

const ROLE_ICONS: Record<string, React.ReactNode> = {
  owner: <Crown className="w-3.5 h-3.5 text-amber-500" />,
  admin: <Shield className="w-3.5 h-3.5 text-blue-500" />,
  member: <User className="w-3.5 h-3.5 text-slate-400" />,
};
const ROLE_LABELS: Record<string, string> = { owner: "Owner", admin: "Admin", member: "Member" };

const PLAN_COLORS: Record<string, string> = {
  core: "#3B82F6", pro: "#0D9488", firm: "#F59E0B"
};

function initials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Add Seat Modal ─────────────────────────────────────────────────────────────
function AddSeatModal({
  org,
  ownerEmail,
  onClose,
  onSuccess,
}: {
  org: OrgWithDetails;
  ownerEmail: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const plan = org.plan as PlanId;
  const pricePerSeat = getSeatPriceDollars(plan);
  const totalCost = (pricePerSeat * count).toFixed(2);

  const handlePurchase = async () => {
    setLoading(true);
    setError("");
    const currentExtra = org.subscription?.seat_count ?? 0;
    const res = await fetch("/api/org/seats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgId: org.id, extraSeats: currentExtra + count, ownerEmail }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Failed to update seats"); return; }
    if (data.checkoutUrl) { window.location.href = data.checkoutUrl; return; }
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-[#0f1e3c]">Add More Seats</h3>
            <p className="text-slate-400 text-xs">Billed monthly · Cancel anytime</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-5 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Current plan</span>
            <span className="font-semibold text-[#0f1e3c] capitalize">{org.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Included seats</span>
            <span className="font-semibold text-[#0f1e3c]">{org.included_seats}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Seats in use</span>
            <span className="font-semibold text-[#0f1e3c]">{org.usedSeats} / {org.totalSeats}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
            <span className="text-slate-500">Price per extra seat</span>
            <span className="font-bold" style={{ color: PLAN_COLORS[org.plan] }}>${pricePerSeat}/mo</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-600 mb-2">Seats to add</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 font-bold text-lg"
            >−</button>
            <span className="text-2xl font-bold text-[#0f1e3c] w-8 text-center">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 font-bold text-lg"
            >+</button>
            <span className="ml-auto text-sm text-slate-500">
              = <span className="font-bold text-[#0f1e3c]">${totalCost}/mo</span>
            </span>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#0f1e3c] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#1a2f5a] transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CreditCard className="w-4 h-4" /> Confirm &amp; Pay ${totalCost}/mo</>}
        </button>
      </div>
    </div>
  );
}

// ── Invite Modal ───────────────────────────────────────────────────────────────
function InviteModal({
  org,
  ownerEmail,
  onClose,
  onSuccess,
}: {
  org: OrgWithDetails;
  ownerEmail: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seatBlocked, setSeatBlocked] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) { setError("Enter an email address"); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/org/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgId: org.id, inviteeEmail: email.trim(), role, ownerEmail }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.status === 402) { setSeatBlocked(true); setError(data.error); return; }
    if (!res.ok) { setError(data.error ?? "Failed to add member"); return; }
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Plus className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-bold text-[#0f1e3c]">Add Team Member</h3>
            <p className="text-slate-400 text-xs">{org.usedSeats} / {org.totalSeats} seats used</p>
          </div>
        </div>

        {seatBlocked ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-amber-800 text-sm font-semibold mb-1">Seat limit reached</p>
                <p className="text-amber-700 text-xs">You&apos;ve used all {org.totalSeats} seats. Purchase additional seats to add more team members.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                placeholder="teammate@company.com"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] placeholder:text-slate-300 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] focus:outline-none focus:border-blue-400"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </>
        )}

        {error && !seatBlocked && <p className="text-red-500 text-xs mb-3">{error}</p>}

        {seatBlocked ? (
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-amber-400 transition-colors"
          >
            <CreditCard className="w-4 h-4" /> Buy More Seats
          </button>
        ) : (
          <button
            onClick={handleInvite}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-teal-500 transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Add Member</>}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [step, setStep] = useState<"identify" | "create" | "dashboard">("identify");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [orgNameInput, setOrgNameInput] = useState("");
  const [planInput, setPlanInput] = useState<PlanId>("core");
  const [org, setOrg] = useState<OrgWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [showAddSeat, setShowAddSeat] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  // Check for stored email on mount
  useEffect(() => {
    const stored = localStorage.getItem("lossstack_owner_email");
    if (stored) {
      setOwnerEmail(stored);
      fetchOrg(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrg = useCallback(async (email: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/org?ownerEmail=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.org) {
        setOrg(data.org);
        setStep("dashboard");
      } else {
        setStep("create");
      }
    } catch {
      setError("Could not connect. Check your connection and try again.");
      setStep("create");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleIdentify = () => {
    const email = emailInput.trim().toLowerCase();
    if (!email || !email.includes("@")) { setError("Enter a valid email address"); return; }
    localStorage.setItem("lossstack_owner_email", email);
    setOwnerEmail(email);
    fetchOrg(email);
  };

  const handleCreateOrg = async () => {
    if (!orgNameInput.trim()) { setError("Enter an organization name"); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerEmail, orgName: orgNameInput.trim(), plan: planInput }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Failed to create organization"); return; }
    fetchOrg(ownerEmail);
  };

  const handleRemoveMember = async (member: OrgUser) => {
    if (!org) return;
    setRemoving(member.user_id);
    const res = await fetch("/api/org/members", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgId: org.id, userId: member.user_id, ownerEmail }),
    });
    setRemoving(null);
    if (res.ok) fetchOrg(ownerEmail);
  };

  const handleSignOut = () => {
    localStorage.removeItem("lossstack_owner_email");
    setOwnerEmail("");
    setOrg(null);
    setStep("identify");
    setEmailInput("");
  };

  const seatPercent = org ? Math.min(100, Math.round((org.usedSeats / org.totalSeats) * 100)) : 0;
  const seatOverLimit = org ? org.usedSeats > org.totalSeats : false;

  // ── Identify Step ────────────────────────────────────────────────────────────
  if (step === "identify" || (step === "create" && !ownerEmail)) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#0f1e3c] flex items-center justify-center mb-5">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0f1e3c] mb-1">Team Management</h1>
          <p className="text-slate-400 text-sm mb-6">Enter your email to access or create your organization.</p>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your email address</label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => { setEmailInput(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleIdentify()}
            placeholder="you@company.com"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] placeholder:text-slate-300 focus:outline-none focus:border-blue-400 mb-4"
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button
            onClick={handleIdentify}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#0f1e3c] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#1a2f5a] transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Create Org Step ───────────────────────────────────────────────────────────
  if (step === "create") {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
            <Plus className="w-6 h-6 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#0f1e3c] mb-1">Create Your Organization</h1>
          <p className="text-slate-400 text-sm mb-6">
            No organization found for <span className="font-medium text-[#0f1e3c]">{ownerEmail}</span>.
            Set one up to manage your team.
          </p>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Organization name</label>
            <input
              type="text"
              value={orgNameInput}
              onChange={(e) => { setOrgNameInput(e.target.value); setError(""); }}
              placeholder="Acme Adjusters"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] placeholder:text-slate-300 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(PLAN_CONFIG) as PlanId[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlanInput(p)}
                  className={cn(
                    "py-2.5 rounded-lg border-2 text-xs font-bold capitalize transition-all",
                    planInput === p
                      ? "border-[#0f1e3c] bg-[#0f1e3c] text-white"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  )}
                >
                  {p}
                  <div className="text-[10px] font-normal mt-0.5 opacity-70">
                    {PLAN_CONFIG[p].includedSeats} seat{PLAN_CONFIG[p].includedSeats > 1 ? "s" : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

          <button
            onClick={handleCreateOrg}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-teal-500 transition-colors disabled:opacity-60 mb-3"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Building2 className="w-4 h-4" /> Create Organization</>}
          </button>
          <button onClick={handleSignOut} className="w-full text-slate-400 text-xs hover:text-slate-600 transition-colors">
            Use a different email
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  if (!org) return null;

  const planColor = PLAN_COLORS[org.plan] ?? "#3B82F6";

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Modals */}
      {showInvite && (
        <InviteModal
          org={org}
          ownerEmail={ownerEmail}
          onClose={() => setShowInvite(false)}
          onSuccess={() => fetchOrg(ownerEmail)}
        />
      )}
      {showAddSeat && (
        <AddSeatModal
          org={org}
          ownerEmail={ownerEmail}
          onClose={() => setShowAddSeat(false)}
          onSuccess={() => fetchOrg(ownerEmail)}
        />
      )}

      {/* Page header */}
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-4">
                  <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Team Management</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-1">{org.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full capitalize"
                    style={{ backgroundColor: `${planColor}25`, color: planColor }}
                  >
                    {org.plan} Plan
                  </span>
                  <span className="text-blue-300/60 text-xs">{ownerEmail}</span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-blue-300/60 hover:text-white text-xs transition-colors mt-1"
              >
                Sign out
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

        {/* Seat usage card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h2 className="font-bold text-[#0f1e3c] text-base">Seat Usage</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                {org.included_seats} included · +${getSeatPriceDollars(org.plan as PlanId)}/extra seat/mo
              </p>
            </div>
            <button
              onClick={() => setShowAddSeat(true)}
              className="flex items-center gap-1.5 bg-[#0f1e3c] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#1a2f5a] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Seats
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${seatPercent}%`,
                  backgroundColor: seatOverLimit ? "#EF4444" : planColor,
                }}
              />
            </div>
            <span className={cn("text-sm font-bold tabular-nums", seatOverLimit ? "text-red-500" : "text-[#0f1e3c]")}>
              {org.usedSeats} / {org.totalSeats}
            </span>
          </div>

          {seatOverLimit && (
            <div className="flex items-center gap-2 mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-red-700 text-xs font-medium">
                You&apos;ve exceeded your seat limit. New invites are blocked until you add more seats.
              </p>
            </div>
          )}

          {/* Stat chips */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Total Seats", value: org.totalSeats, color: "#0f1e3c" },
              { label: "In Use", value: org.usedSeats, color: planColor },
              { label: "Available", value: Math.max(0, org.totalSeats - org.usedSeats), color: "#0D9488" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold" style={{ color }}>{value}</div>
                <div className="text-slate-400 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Members table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <h2 className="font-bold text-[#0f1e3c] text-base">Members</h2>
              <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full">
                {org.members.length}
              </span>
            </div>
            <button
              onClick={() => seatOverLimit ? setShowAddSeat(true) : setShowInvite(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: `${planColor}15`, color: planColor }}
            >
              <Plus className="w-3.5 h-3.5" /> Add Member
            </button>
          </div>

          {org.members.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <Users className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">No members yet. Add your team.</p>
            </div>
          ) : (
            <ul>
              {org.members.map((member, i) => (
                <li
                  key={member.id}
                  className={cn(
                    "flex items-center gap-4 px-6 py-3.5",
                    i !== org.members.length - 1 && "border-b border-slate-50"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: planColor }}
                  >
                    {initials(member.user_id)}
                  </div>

                  {/* Email */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#0f1e3c] text-sm truncate">{member.user_id}</div>
                    <div className="text-slate-400 text-xs">Joined {formatDate(member.created_at)}</div>
                  </div>

                  {/* Role */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1 text-xs font-semibold text-slate-600 shrink-0">
                    {ROLE_ICONS[member.role]}
                    {ROLE_LABELS[member.role]}
                  </div>

                  {/* Remove */}
                  {member.role !== "owner" && (
                    <button
                      onClick={() => handleRemoveMember(member)}
                      disabled={removing === member.user_id}
                      className="text-slate-300 hover:text-red-400 transition-colors shrink-0 disabled:opacity-40"
                      title="Remove member"
                    >
                      {removing === member.user_id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />
                      }
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Plan info card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#0f1e3c] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <div className="text-white font-bold text-base mb-1">Multi-app access for your team</div>
            <p className="text-blue-200/60 text-sm max-w-md">
              All team members get access to Appraisly, ImageLablr, and RestoreCam under this organization.
            </p>
          </div>
          <a
            href="/pricing"
            className="shrink-0 flex items-center gap-2 bg-white text-[#0f1e3c] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors"
          >
            View Plans <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
