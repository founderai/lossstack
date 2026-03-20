"use client";

import { useState } from "react";
import { Check, X, Zap, Star, ArrowRight, HardDrive } from "lucide-react";
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
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div className="space-y-10">

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {unifiedPlans.map((plan) => {
          const colors = PLAN_COLORS[plan.id];
          const isHighlighted = plan.popular || hoveredPlan === plan.id;

          return (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
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
              <div className={cn("px-6 pt-7 pb-5 rounded-t-2xl", plan.popular ? "pt-9" : "")}
                style={{ backgroundColor: isHighlighted ? colors.bg : undefined }}
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
                {plan.reportPrice !== null && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Zap className="w-3 h-3" style={{ color: colors.accent }} />
                    <span className="text-xs text-slate-500">
                      <span className="font-semibold text-[#0f1e3c]">${plan.reportPrice}</span>/report after credits
                    </span>
                  </div>
                )}
                <p className="text-slate-400 text-xs leading-relaxed">{plan.description}</p>
              </div>

              {/* Credits + storage pills */}
              <div className="px-6 py-3 border-t border-slate-100 flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
                >
                  {plan.creditsIncluded} credits/mo
                </span>
                {plan.storageIncluded && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    <HardDrive className="w-3 h-3" />
                    Storage included
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

      {/* Storage add-on callout */}
      <div className="bg-[#0f1e3c] rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="font-bold text-white text-sm mb-0.5">Storage Add-On</div>
            <p className="text-blue-300/70 text-xs leading-relaxed max-w-lg">
              Available on Core plan. Enables file persistence, photo storage, and export history across all three apps.
              <span className="text-white font-semibold"> +$49/month.</span>
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/15 transition-colors"
        >
          Add Storage <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* What's a credit */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-[#0f1e3c] text-sm">What&apos;s a credit?</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
          One credit = one report generation across any app — an Appraisly claim narrative, an ImageLablr photo export package, or a RestoreCam job completion report. Credits reset monthly. When you run out, you&apos;re charged the per-report overage rate for your plan instead of being blocked.
        </p>
      </div>

      {/* Apps included note */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { name: "Appraisly",   color: "#3B82F6", desc: "AI-powered claim narratives, estimate review & appraisal workflows." },
          { name: "ImageLablr",  color: "#0D9488", desc: "Fast, structured photo labeling and export for claims documentation." },
          { name: "RestoreCam",  color: "#F59E0B", desc: "Field documentation, moisture logs, and job reports for restoration." },
        ].map((app) => (
          <div key={app.name} className="bg-white border border-slate-200 rounded-xl p-5">
            <div
              className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-lg mb-3"
              style={{ backgroundColor: `${app.color}15`, color: app.color }}
            >
              {app.name}
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">{app.desc}</p>
          </div>
        ))}
      </div>

      {/* Corporate CTA */}
      <div className="text-center space-y-3 py-4">
        <p className="text-slate-500 text-sm">
          Need a custom contract, volume pricing, or dedicated onboarding?
        </p>
        <a
          href="mailto:founderai@pm.me?subject=LossStack Corporate Pricing"
          className="inline-flex items-center gap-2 text-[#0f1e3c] font-semibold text-sm border-2 border-[#0f1e3c] px-5 py-2.5 rounded-xl hover:bg-[#0f1e3c] hover:text-white transition-colors"
        >
          Contact us for Corporate pricing
        </a>
      </div>
    </div>
  );
}
