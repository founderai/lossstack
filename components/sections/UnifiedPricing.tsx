"use client";

import { Check, X, Zap, Star, ArrowRight, HardDrive, Phone } from "lucide-react";
import Link from "next/link";
import { unifiedPlans, type UnifiedPlan } from "@/data/pricing";
import { cn } from "@/lib/utils";

const PLAN_COLORS: Record<UnifiedPlan["id"], { accent: string; bg: string; border: string }> = {
  free:  { accent: "#94A3B8", bg: "#F8FAFC", border: "#E2E8F0" },
  core:  { accent: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
  pro:   { accent: "#0D9488", bg: "#F0FDFA", border: "#99F6E4" },
  firm:  { accent: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
};

export default function UnifiedPricing() {
  return (
    <div className="space-y-10">

      {/* Plan cards — Free / Core / Pro / Firm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {unifiedPlans.map((plan) => {
          const colors = PLAN_COLORS[plan.id];
          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border-2 bg-white flex flex-col transition-all duration-200",
                plan.popular
                  ? "border-[#0D9488] shadow-lg shadow-teal-100 scale-[1.02]"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-[#0D9488] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    <Star className="w-3 h-3 fill-white" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className={cn("px-6 pb-5 rounded-t-2xl", plan.popular ? "pt-9" : "pt-7")}
                style={{ backgroundColor: plan.popular ? "#F0FDFA" : colors.bg }}
              >
                <div
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold mb-3"
                  style={{ backgroundColor: `${colors.accent}18`, color: colors.accent }}
                >
                  {plan.name}
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  {plan.monthlyPrice === null ? (
                    <span className="text-4xl font-bold text-[#0f1e3c]">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-[#0f1e3c]">${plan.monthlyPrice}</span>
                      <span className="text-slate-400 text-sm">/mo</span>
                    </>
                  )}
                </div>

                {/* Report price line */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3 h-3 shrink-0" style={{ color: colors.accent }} />
                  <span className="text-xs text-slate-500">
                    <span className="font-semibold text-[#0f1e3c]">${plan.reportPrice}</span>
                    {plan.id === "free" ? " / report (one-time credits)" : "/report"}
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed">{plan.description}</p>
              </div>

              {/* Storage pill */}
              <div className="px-6 py-3 border-t border-slate-100 flex flex-wrap gap-2">
                {plan.storageIncluded ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700">
                    <HardDrive className="w-3 h-3" />
                    Storage included
                  </span>
                ) : plan.id === "core" ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                    <HardDrive className="w-3 h-3" />
                    Storage add-on: +$49/mo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-400">
                    <HardDrive className="w-3 h-3" />
                    No storage
                  </span>
                )}
              </div>

              {/* Feature list */}
              <ul className="px-6 py-4 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    <span className={cn(
                      "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                      f.included ? "bg-teal-50" : "bg-slate-100"
                    )}>
                      {f.included
                        ? <Check className="w-2.5 h-2.5 text-teal-600" />
                        : <X className="w-2.5 h-2.5 text-slate-300" />
                      }
                    </span>
                    <span className={f.included ? "text-slate-700" : "text-slate-400"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-6 pb-6 pt-2">
                {plan.monthlyPrice === null ? (
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Get Started Free
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 text-white font-bold py-2.5 rounded-xl text-sm transition-colors hover:opacity-90"
                    style={{ backgroundColor: colors.accent }}
                  >
                    Get {plan.name}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise card */}
      <div className="rounded-2xl border-2 border-[#0f1e3c] bg-[#0f1e3c] px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            Enterprise
          </div>
          <h3 className="text-white font-bold text-lg mb-1">Built for large organizations</h3>
          <p className="text-blue-300/70 text-sm max-w-xl leading-relaxed">
            Custom contracts, volume pricing, dedicated onboarding, and tailored feature access for enterprise teams and multi-location firms.
          </p>
        </div>
        <a
          href="tel:+1"
          className="shrink-0 flex items-center gap-2 bg-white text-[#0f1e3c] font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          Call for info
        </a>
      </div>

      {/* Storage add-on callout — Core only */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-bold text-[#0f1e3c] text-sm mb-0.5">
              Storage Add-On <span className="text-xs font-medium text-blue-500 ml-1">— Core plan only</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-lg">
              Persistent storage for files, cases, and cross-app access. <span className="font-semibold text-[#0f1e3c]">+$49/month.</span>
              {" "}Storage is included automatically on Pro and Firm plans.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Add Storage <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* What is a report credit */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-[#0f1e3c] text-sm">What is a report credit?</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
          A report credit is consumed each time you generate a report across any app — a claim narrative in Appraisly, a photo export package in ImageLablr, or a job completion report in RestoreCam.
          Credits are used first. When they run out, you are charged the per-report rate for your plan — you are never blocked.
          <span className="font-semibold text-[#0f1e3c]"> Free plan credits are one-time only and do not renew. Core has no included credits.</span>
        </p>
      </div>

      {/* Apps included */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { name: "Appraisly",  color: "#3B82F6", desc: "AI-powered claim narratives, estimate review & appraisal workflows." },
          { name: "ImageLablr", color: "#0D9488", desc: "Fast, structured photo labeling and export for claims documentation." },
          { name: "RestoreCam", color: "#F59E0B", desc: "Field documentation, moisture logs, and job reports for restoration." },
        ].map((app) => (
          <div key={app.name} className="bg-white border border-slate-200 rounded-xl p-5">
            <div
              className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-lg mb-3"
              style={{ backgroundColor: `${app.color}15`, color: app.color }}
            >
              {app.name}
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">{app.desc}</p>
            <p className="text-slate-400 text-xs mt-2 font-medium">Included in all plans.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
