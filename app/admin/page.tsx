"use client";

import { useState, useMemo, useEffect } from "react";
import { Lock, Users, TrendingUp, DollarSign, LogOut, AlertCircle, CheckCircle, Clock, XCircle, Sparkles, Plus, Trash2, MapPin } from "lucide-react";
import type { AdminUser, UserStatus } from "@/data/adminUsers";
import { roadmapItems as initialRoadmap, type RoadmapItem } from "@/data/roadmap";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    fetch("/api/roadmap")
      .then((r) => r.json())
      .then(setRoadmap)
      .catch(() => {});
  }, []);

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
              return (
                <div key={item.id} className="flex items-start gap-4 px-6 py-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${appCfg?.color}15` }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: appCfg?.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-[#0f1e3c] text-sm">{item.title}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${appCfg?.color}15`, color: appCfg?.color }}>
                        {appCfg?.label}
                      </span>
                      {item.quarter && <span className="text-xs text-slate-400">{item.quarter}</span>}
                    </div>
                    {item.description && <p className="text-slate-400 text-xs">{item.description}</p>}
                  </div>
                  <button
                    onClick={() => removeRoadmapItem(item.id)}
                    className="shrink-0 text-slate-300 hover:text-red-400 transition-colors mt-0.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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

        <p className="text-xs text-slate-400 text-center pb-4">
          User data is mock — wire to Stripe + Clerk API for live data. Contact: founderai@pm.me
        </p>
      </div>
    </div>
  );
}
