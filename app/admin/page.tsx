"use client";

import { useState, useMemo, useEffect } from "react";
import { Lock, Users, TrendingUp, DollarSign, LogOut, AlertCircle, CheckCircle, Clock, XCircle, Sparkles, Plus, Trash2, MapPin, Gift, ShieldAlert, ThumbsUp, ThumbsDown, Flag, CreditCard } from "lucide-react";
import type { AdminUser, UserStatus } from "@/data/adminUsers";
import { roadmapItems as initialRoadmap, type RoadmapItem } from "@/data/roadmap";
import { cn } from "@/lib/utils";
import type { CreditRequest, CreditGrant } from "@/app/api/credits/route";

const ADMIN_PASSWORD = "I$aacFou0der2026!";

const APP_OPTIONS: { value: RoadmapItem["app"]; label: string; color: string }[] = [
  { value: "appraisly",  label: "Appraisly",  color: "#3B82F6" },
  { value: "imagelablr", label: "ImageLablr", color: "#0D9488" },
  { value: "restorecam", label: "RestoreCam", color: "#F59E0B" },
  { value: "lossstack",  label: "All Apps",   color: "#6366F1" },
];

function durationLabel(joinedAt: string, churnedAt?: string): string {
  const start = new Date(joinedAt);
  const end = churnedAt ? new Date(churnedAt) : new Date();
  const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  return `${months}mo ${days % 30}d`;
}

const statusConfig: Record<UserStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  active: { label: "Active", color: "text-teal-700", bg: "bg-teal-50", icon: <CheckCircle className="w-3.5 h-3.5" /> },
  churned: { label: "Churned", color: "text-red-600", bg: "bg-red-50", icon: <XCircle className="w-3.5 h-3.5" /> },
  trial: { label: "Trial", color: "text-amber-700", bg: "bg-amber-50", icon: <Clock className="w-3.5 h-3.5" /> },
};

const appColors: Record<string, string> = {
  appraisly: "#3B82F6",
  imagelablr: "#0D9488",
  restorecam: "#F59E0B",
};
const appLabels: Record<string, string> = {
  appraisly: "Appraisly",
  imagelablr: "ImageLablr",
  restorecam: "RestoreCam",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [filter, setFilter] = useState<UserStatus | "all">("all");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(initialRoadmap);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newApp, setNewApp] = useState<RoadmapItem["app"]>("lossstack");
  const [newQuarter, setNewQuarter] = useState("");
  const [addError, setAddError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editApp, setEditApp] = useState<RoadmapItem["app"]>("lossstack");
  const [editQuarter, setEditQuarter] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  // Credits state
  const [creditRequests, setCreditRequests] = useState<CreditRequest[]>([]);
  const [creditGrants, setCreditGrants] = useState<CreditGrant[]>([]);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [creditFilter, setCreditFilter] = useState<CreditRequest["status"] | "all">("all");
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolveNote, setResolveNote] = useState("");
  // Manual grant state
  const [grantEmail, setGrantEmail] = useState("");
  const [grantCredits, setGrantCredits] = useState(2);
  const [grantReason, setGrantReason] = useState("");
  const [grantSaving, setGrantSaving] = useState(false);
  const [grantMsg, setGrantMsg] = useState("");
  const [grantError, setGrantError] = useState("");

  useEffect(() => {
    fetch("/api/roadmap")
      .then((r) => r.json())
      .then(setRoadmap)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!authed) return;
    setCreditsLoading(true);
    fetch("/api/credits")
      .then((r) => r.json())
      .then((data) => {
        if (data.requests) setCreditRequests(data.requests);
        if (data.grants) setCreditGrants(data.grants);
      })
      .catch(() => {})
      .finally(() => setCreditsLoading(false));
  }, [authed]);

  useEffect(() => {
    if (!authed) return;
    setUsersLoading(true);
    setUsersError("");
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        else setUsersError(data.error ?? "Failed to load users.");
      })
      .catch(() => setUsersError("Network error loading users."))
      .finally(() => setUsersLoading(false));
  }, [authed]);

  const addRoadmapItem = async () => {
    if (!newTitle.trim()) { setAddError("Title is required."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDesc, app: newApp, quarter: newQuarter }),
      });
      const item = await res.json();
      if (res.ok) {
        setRoadmap((prev) => [...prev, item]);
        setNewTitle("");
        setNewDesc("");
        setNewApp("lossstack");
        setNewQuarter("");
        setAddError("");
      } else {
        setAddError(item.error ?? "Failed to save.");
      }
    } catch {
      setAddError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: RoadmapItem) => {
    setEditingId(item.id);
    setEditApp(item.app);
    setEditQuarter(item.quarter ?? "");
  };

  const saveEdit = async (id: string) => {
    setEditSaving(true);
    try {
      const res = await fetch("/api/roadmap", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, app: editApp, quarter: editQuarter }),
      });
      const updated = await res.json();
      if (res.ok) {
        setRoadmap((prev) => prev.map((i) => i.id === id ? updated : i));
        setEditingId(null);
      }
    } catch {}
    finally { setEditSaving(false); }
  };

  const removeRoadmapItem = async (id: string) => {
    setRoadmap((prev) => prev.filter((i) => i.id !== id));
    await fetch("/api/roadmap", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const resolveRequest = async (id: string, status: CreditRequest["status"], credits: number) => {
    setResolvingId(id);
    try {
      const res = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resolve", id, status, creditsGranted: credits, adminNote: resolveNote }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreditRequests((prev) => prev.map((r) => r.id === id ? data.request : r));
        setResolveNote("");
      }
    } catch {}
    finally { setResolvingId(null); }
  };

  const handleManualGrant = async () => {
    if (!grantEmail.trim() || grantCredits < 1) { setGrantError("Email and credit amount required."); return; }
    setGrantSaving(true);
    setGrantError("");
    setGrantMsg("");
    try {
      const res = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "grant", email: grantEmail, credits: grantCredits, reason: grantReason }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreditGrants((prev) => [data.grant, ...prev]);
        setGrantMsg(`✓ Granted ${grantCredits} credit${grantCredits !== 1 ? "s" : ""} to ${grantEmail}`);
        setGrantEmail(""); setGrantCredits(2); setGrantReason("");
      } else {
        setGrantError(data.error ?? "Failed to grant.");
      }
    } catch { setGrantError("Network error."); }
    finally { setGrantSaving(false); }
  };

  const filteredRequests = creditFilter === "all"
    ? creditRequests
    : creditRequests.filter((r) => r.status === creditFilter);

  const filtered = useMemo(() =>
    filter === "all" ? users : users.filter((u) => u.status === filter),
    [filter, users]
  );

  const activeUsers = users.filter((u) => u.status === "active");
  const churnedUsers = users.filter((u) => u.status === "churned");
  const trialUsers = users.filter((u) => u.status === "trial");
  const mrr = activeUsers.reduce((sum, u) => sum + u.monthlyRevenue, 0);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0f1e3c] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0f1e3c] mx-auto mb-6">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#0f1e3c] text-center mb-1">Admin Access</h1>
          <p className="text-slate-400 text-sm text-center mb-6">LossStack internal dashboard</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className={cn(
              "w-full border rounded-xl px-4 py-3 text-sm outline-none mb-3 transition-colors",
              pwError ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-[#0f1e3c]"
            )}
          />
          {pwError && (
            <div className="flex items-center gap-1.5 text-red-500 text-xs mb-3">
              <AlertCircle className="w-3.5 h-3.5" /> Incorrect password
            </div>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-[#0f1e3c] hover:bg-[#1a3060] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-[#0f1e3c] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-teal-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">LS</span>
          </div>
          <div>
            <div className="text-white font-bold text-base leading-none">LossStack Admin</div>
            <div className="text-blue-300/60 text-xs mt-0.5">Internal Dashboard</div>
          </div>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-1.5 text-blue-300/70 hover:text-white text-xs transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Subscribers", value: activeUsers.length, icon: <CheckCircle className="w-5 h-5 text-teal-500" />, color: "text-teal-600" },
            { label: "Churned", value: churnedUsers.length, icon: <XCircle className="w-5 h-5 text-red-400" />, color: "text-red-500" },
            { label: "Trials", value: trialUsers.length, icon: <Clock className="w-5 h-5 text-amber-500" />, color: "text-amber-600" },
            { label: "MRR", value: `$${mrr.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: <DollarSign className="w-5 h-5 text-blue-500" />, color: "text-blue-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-400 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* App breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <h2 className="font-bold text-[#0f1e3c] text-base">Active Subscribers by App</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {(["appraisly", "imagelablr", "restorecam"] as const).map((appId) => {
              const count = activeUsers.filter((u) => u.apps.includes(appId)).length;
              return (
                <div key={appId} className="rounded-xl border border-slate-100 p-4 text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: appColors[appId] }}>{count}</div>
                  <div className="text-xs text-slate-400">{appLabels[appId]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Users loading/error */}
        {usersLoading && (
          <div className="text-center py-6 text-slate-400 text-sm">Loading subscribers from Stripe…</div>
        )}
        {usersError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-red-600 text-sm">{usersError}</div>
        )}

        {/* Users table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <h2 className="font-bold text-[#0f1e3c] text-base">All Users</h2>
            </div>
            <div className="flex items-center gap-2">
              {(["all", "active", "trial", "churned"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-colors",
                    filter === f
                      ? "bg-[#0f1e3c] text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Name", "Email", "Apps", "Tier", "Status", "Joined", "Duration", "MRR"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((user: AdminUser) => {
                  const s = statusConfig[user.status];
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-[#0f1e3c] whitespace-nowrap">{user.name}</td>
                      <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{user.email}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1.5 flex-wrap">
                          {user.apps.map((a) => (
                            <span
                              key={a}
                              className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${appColors[a]}18`, color: appColors[a] }}
                            >
                              {appLabels[a]}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{user.tier}</td>
                      <td className="px-5 py-4">
                        <span className={cn("flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit", s.bg, s.color)}>
                          {s.icon} {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">
                        {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                        {durationLabel(user.joinedAt, user.churnedAt)}
                        {user.churnedAt && (
                          <div className="text-red-400 text-xs mt-0.5">
                            Churned {new Date(user.churnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#0f1e3c] whitespace-nowrap">
                        {user.monthlyRevenue > 0 ? `$${user.monthlyRevenue.toLocaleString()}` : <span className="text-slate-300">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">No users in this category.</div>
            )}
          </div>
        </div>

        {/* Roadmap Editor */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-slate-400" />
            <h2 className="font-bold text-[#0f1e3c] text-base">Roadmap Editor</h2>
            <span className="ml-auto text-xs text-slate-400">Changes are session-only — edit <code className="bg-slate-100 px-1 rounded">data/roadmap.ts</code> to persist</span>
          </div>

          {/* Current items */}
          <div className="divide-y divide-slate-50">
            {roadmap.length === 0 && (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">No roadmap items. Add one below.</div>
            )}
            {roadmap.map((item) => {
              const appCfg = APP_OPTIONS.find((a) => a.value === item.app);
              const isEditing = editingId === item.id;
              return (
                <div key={item.id} className={cn("flex items-start gap-4 px-6 py-4", isEditing ? "bg-slate-50" : "")}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${appCfg?.color}15` }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: appCfg?.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-[#0f1e3c] text-sm">{item.title}</span>
                      {!isEditing && (
                        <>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${appCfg?.color}15`, color: appCfg?.color }}>
                            {appCfg?.label}
                          </span>
                          {item.quarter && <span className="text-xs text-slate-400">{item.quarter}</span>}
                        </>
                      )}
                    </div>
                    {item.description && !isEditing && <p className="text-slate-400 text-xs">{item.description}</p>}
                    {isEditing && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <select
                          value={editApp}
                          onChange={(e) => setEditApp(e.target.value as RoadmapItem["app"])}
                          className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#0f1e3c] bg-white"
                        >
                          {APP_OPTIONS.map((a) => (
                            <option key={a.value} value={a.value}>{a.label}</option>
                          ))}
                        </select>
                        <select
                          value={editQuarter}
                          onChange={(e) => setEditQuarter(e.target.value)}
                          className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#0f1e3c] bg-white"
                        >
                          <option value="">No quarter</option>
                          <option value="Q1 2026">Q1 2026</option>
                          <option value="Q2 2026">Q2 2026</option>
                          <option value="Q3 2026">Q3 2026</option>
                          <option value="Q4 2026">Q4 2026</option>
                          <option value="Q1 2027">Q1 2027</option>
                          <option value="Q2 2027">Q2 2027</option>
                          <option value="Q3 2027">Q3 2027</option>
                          <option value="Q4 2027">Q4 2027</option>
                        </select>
                        <button
                          onClick={() => saveEdit(item.id)}
                          disabled={editSaving}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0f1e3c] text-white hover:bg-[#1a3060] disabled:opacity-50 transition-colors"
                        >
                          {editSaving ? "Saving…" : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    {!isEditing && (
                      <button
                        onClick={() => startEdit(item)}
                        className="text-slate-300 hover:text-blue-400 transition-colors p-1"
                        title="Edit quarter / app"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16.414H8v-2a2 2 0 01.586-1.414z" /></svg>
                      </button>
                    )}
                    <button
                      onClick={() => removeRoadmapItem(item.id)}
                      className="text-slate-300 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add new item */}
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-5 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Add Item</div>
            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Feature title"
                value={newTitle}
                onChange={(e) => { setNewTitle(e.target.value); setAddError(""); }}
                className="flex-1 min-w-48 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0f1e3c] bg-white"
              />
              <select
                value={newApp}
                onChange={(e) => setNewApp(e.target.value as RoadmapItem["app"])}
                className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0f1e3c] bg-white"
              >
                {APP_OPTIONS.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
              <select
                value={newQuarter}
                onChange={(e) => setNewQuarter(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0f1e3c] bg-white"
              >
                <option value="">No quarter</option>
                <option value="Q1 2026">Q1 2026</option>
                <option value="Q2 2026">Q2 2026</option>
                <option value="Q3 2026">Q3 2026</option>
                <option value="Q4 2026">Q4 2026</option>
                <option value="Q1 2027">Q1 2027</option>
                <option value="Q2 2027">Q2 2027</option>
              </select>
            </div>
            <textarea
              placeholder="Description (optional)"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              rows={2}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0f1e3c] bg-white resize-none"
            />
            {addError && <p className="text-red-500 text-xs">{addError}</p>}
            <button
              onClick={addRoadmapItem}
              disabled={saving}
              className="flex items-center gap-2 bg-[#0f1e3c] hover:bg-[#1a3060] disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> {saving ? "Saving…" : "Add to Roadmap"}
            </button>
          </div>
        </div>

        {/* ── Credit Requests ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              <h2 className="font-bold text-[#0f1e3c] text-base">Courtesy Credit Requests</h2>
              {creditRequests.filter((r) => r.status === "pending").length > 0 && (
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {creditRequests.filter((r) => r.status === "pending").length} pending
                </span>
              )}
              {creditRequests.filter((r) => r.status === "flagged").length > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {creditRequests.filter((r) => r.status === "flagged").length} flagged
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {(["all", "pending", "flagged", "approved", "denied"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setCreditFilter(f)}
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-lg capitalize transition-colors",
                    creditFilter === f ? "bg-[#0f1e3c] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {creditsLoading && (
            <div className="text-center py-6 text-slate-400 text-sm">Loading requests…</div>
          )}

          <div className="divide-y divide-slate-50">
            {!creditsLoading && filteredRequests.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">No requests in this category.</div>
            )}
            {filteredRequests.map((req) => {
              const statusStyles: Record<CreditRequest["status"], { bg: string; text: string; label: string }> = {
                pending:  { bg: "bg-amber-50",  text: "text-amber-700",  label: "Pending" },
                approved: { bg: "bg-teal-50",   text: "text-teal-700",   label: "Approved" },
                denied:   { bg: "bg-slate-100", text: "text-slate-500",  label: "Denied" },
                flagged:  { bg: "bg-red-50",    text: "text-red-600",    label: "⚑ Flagged" },
              };
              const s = statusStyles[req.status];
              const isAbuse = req.requestCount > 5;
              return (
                <div key={req.id} className={cn("px-6 py-4", req.status === "flagged" ? "bg-red-50/40" : "")}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-[#0f1e3c] text-sm">{req.email}</span>
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", s.bg, s.text)}>{s.label}</span>
                        {isAbuse && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                            ⚠ {req.requestCount} lifetime requests
                          </span>
                        )}
                        {req.creditsGranted > 0 && (
                          <span className="text-xs font-semibold text-teal-600">+{req.creditsGranted} credits issued</span>
                        )}
                      </div>
                      <p className="text-slate-500 text-xs mb-1 leading-relaxed">{req.description}</p>
                      <div className="text-slate-400 text-xs">
                        {new Date(req.requestedAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                        {req.adminNote && <span className="ml-2 italic text-slate-400">· {req.adminNote}</span>}
                      </div>
                    </div>

                    {req.status === "pending" || req.status === "flagged" ? (
                      <div className="flex flex-col gap-2 shrink-0">
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => resolveRequest(req.id, "approved", 2)}
                            disabled={resolvingId === req.id}
                            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors disabled:opacity-50"
                          >
                            <ThumbsUp className="w-3 h-3" /> Approve (+2)
                          </button>
                          <button
                            onClick={() => resolveRequest(req.id, "denied", 0)}
                            disabled={resolvingId === req.id}
                            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-50"
                          >
                            <ThumbsDown className="w-3 h-3" /> Deny
                          </button>
                          <button
                            onClick={() => resolveRequest(req.id, "flagged", 0)}
                            disabled={resolvingId === req.id}
                            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            <Flag className="w-3 h-3" /> Flag
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Manual Credit Grant ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
            <Gift className="w-4 h-4 text-slate-400" />
            <h2 className="font-bold text-[#0f1e3c] text-base">Manual Credit Grant</h2>
          </div>

          <div className="px-6 py-5 space-y-4">
            <p className="text-slate-400 text-xs leading-relaxed">
              Manually issue credits to any account email. This is logged and visible in the grant history below.
            </p>
            <div className="flex gap-3 flex-wrap">
              <input
                type="email"
                placeholder="Account email"
                value={grantEmail}
                onChange={(e) => { setGrantEmail(e.target.value); setGrantError(""); setGrantMsg(""); }}
                className="flex-1 min-w-52 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0f1e3c]"
              />
              <input
                type="number"
                min={1}
                max={100}
                value={grantCredits}
                onChange={(e) => setGrantCredits(Number(e.target.value))}
                className="w-24 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0f1e3c] text-center"
              />
              <input
                type="text"
                placeholder="Reason (optional)"
                value={grantReason}
                onChange={(e) => setGrantReason(e.target.value)}
                className="flex-1 min-w-52 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0f1e3c]"
              />
            </div>
            {grantError && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{grantError}</p>}
            {grantMsg  && <p className="text-teal-600 text-xs font-semibold">{grantMsg}</p>}
            <button
              onClick={handleManualGrant}
              disabled={grantSaving}
              className="flex items-center gap-2 bg-[#0f1e3c] hover:bg-[#1a3060] disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <CreditCard className="w-4 h-4" />{grantSaving ? "Granting…" : "Grant Credits"}
            </button>
          </div>

          {/* Grant history */}
          {creditGrants.length > 0 && (
            <div className="border-t border-slate-100">
              <div className="px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wide">Grant History</div>
              <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                {creditGrants.map((g) => (
                  <div key={g.id} className="px-6 py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-semibold text-[#0f1e3c] text-sm">{g.email}</div>
                      <div className="text-slate-400 text-xs">{g.reason}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-teal-600 text-sm">+{g.credits} credits</div>
                      <div className="text-slate-400 text-xs">
                        {new Date(g.grantedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 text-center pb-4">
          User data is mock — wire to Stripe + Clerk API for live data. Contact: founderai@pm.me
        </p>
      </div>
    </div>
  );
}
