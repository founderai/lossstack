import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { CheckCircle, AlertTriangle, XCircle, Wrench, ExternalLink } from "lucide-react";
import { appStatuses, incidents, lastUpdated, type StatusLevel } from "@/data/status";

export const metadata = {
  title: "System Status | LossStack",
  description: "Live status for LossStack, Appraisly, ImageLablr, and RestoreCam.",
};

const statusConfig: Record<StatusLevel, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  operational: {
    label: "Operational",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
    icon: <CheckCircle className="w-5 h-5 text-teal-500" />,
  },
  degraded: {
    label: "Degraded Performance",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  },
  down: {
    label: "Service Disruption",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
  maintenance: {
    label: "Under Maintenance",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: <Wrench className="w-5 h-5 text-blue-500" />,
  },
};

function overallStatus(): StatusLevel {
  if (appStatuses.some((a) => a.status === "down")) return "down";
  if (appStatuses.some((a) => a.status === "degraded")) return "degraded";
  if (appStatuses.some((a) => a.status === "maintenance")) return "maintenance";
  return "operational";
}

const overall = overallStatus();
const activeIncidents = incidents.filter((i) => !i.resolved);
const resolvedIncidents = incidents.filter((i) => i.resolved);

export default function StatusPage() {
  const cfg = statusConfig[overall];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-blue-300/70 text-xs font-semibold uppercase tracking-wide mb-2">System Status</div>
          <h1 className="text-3xl font-bold text-white mb-2">LossStack Status</h1>
          <p className="text-blue-200/50 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Overall status banner */}
        <div className={`rounded-xl border ${cfg.border} ${cfg.bg} px-6 py-4 flex items-center gap-4`}>
          {cfg.icon}
          <div>
            <div className={`font-bold text-base ${cfg.color}`}>
              {overall === "operational" ? "All Systems Operational" : cfg.label}
            </div>
            <div className="text-sm text-slate-500">
              {overall === "operational"
                ? "All LossStack apps and services are running normally."
                : "One or more services are affected. See details below."}
            </div>
          </div>
        </div>

        {/* Active incidents */}
        {activeIncidents.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#0f1e3c]">Active Incidents</h2>
            {activeIncidents.map((inc) => (
              <div key={inc.id} className="bg-red-50 border border-red-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="font-bold text-red-800 text-sm">{inc.title}</div>
                  <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full shrink-0">Ongoing</span>
                </div>
                <p className="text-sm text-red-700 leading-relaxed mb-2">{inc.body}</p>
                <div className="text-xs text-red-500">{inc.date} · Affects: {inc.affected.join(", ")}</div>
              </div>
            ))}
          </div>
        )}

        {/* Per-app status */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[#0f1e3c]">Services</h2>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
            {appStatuses.map((app) => {
              const c = statusConfig[app.status];
              return (
                <div key={app.appId} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    {c.icon}
                    <div>
                      <div className="font-semibold text-[#0f1e3c] text-sm">{app.name}</div>
                      {app.note && <div className="text-xs text-slate-400 mt-0.5">{app.note}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.color} border ${c.border}`}>
                      {c.label}
                    </span>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-slate-500 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resolved incidents */}
        {resolvedIncidents.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#0f1e3c]">Resolved Incidents</h2>
            {resolvedIncidents.map((inc) => (
              <div key={inc.id} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="font-bold text-slate-700 text-sm">{inc.title}</div>
                  <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full shrink-0">Resolved</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-2">{inc.body}</p>
                <div className="text-xs text-slate-400">{inc.date} · Affected: {inc.affected.join(", ")}</div>
              </div>
            ))}
          </div>
        )}

        {/* No incidents at all */}
        {incidents.length === 0 && (
          <div className="text-center py-6 text-slate-400 text-sm">
            No incidents reported.
          </div>
        )}

        {/* Contact */}
        <div className="bg-[#0f1e3c] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold text-sm mb-1">Having an issue?</div>
            <div className="text-blue-200/60 text-xs">Contact us directly and we&apos;ll investigate right away.</div>
          </div>
          <a
            href="mailto:founderai@pm.me?subject=LossStack Issue Report"
            className="flex items-center gap-2 bg-white text-[#0f1e3c] font-bold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm shrink-0"
          >
            Report an Issue
          </a>
        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          <Link href="/" className="hover:underline">← Back to LossStack</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
