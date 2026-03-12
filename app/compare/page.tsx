import ComparisonTable from "@/components/sections/ComparisonTable";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { Layers, ArrowRight, ExternalLink } from "lucide-react";
import { appPricingData, pricingConfig } from "@/data/pricing";
import { apps } from "@/data/apps";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Page header */}
      <div className="bg-[#0f1e3c] px-6 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Compare Plans</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            See exactly what each app delivers.
          </h1>
          <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
            Compare features, pricing, and use cases side by side. Every app is built for a distinct workflow stage — and they stack to cover the full lifecycle.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <ComparisonTable />

        {/* Bundle savings note */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-[#0f1e3c] text-base mb-1">
                Bundle discount applies automatically
              </div>
              <p className="text-slate-500 text-sm">
                Select any 2 apps and save {pricingConfig.twoAppDiscountPercent}%. Select all 3 and save {pricingConfig.threeAppDiscountPercent}%.
                No promo codes needed — pricing is calculated at checkout.
              </p>
            </div>
            <Link
              href="/pricing"
              className="flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a3060] transition-colors text-sm shrink-0"
            >
              <Layers className="w-4 h-4" />
              Build Your Stack
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Per-app pricing summary — pulled from real tier data */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {appPricingData.map((appData) => {
            const app = apps.find((a) => a.id === appData.appId)!;

            return (
              <div key={appData.appId} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold mb-3 shrink-0"
                  style={{ backgroundColor: `${app.accentColor}18`, color: app.accentColor }}
                >
                  {app.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="font-bold text-[#0f1e3c] text-base mb-1">{app.name}</div>
                <p className="text-slate-400 text-xs mb-4">{app.tagline}</p>

                {/* Tier list */}
                <div className="space-y-1.5 mb-4 flex-1">
                  {appData.tiers.map((tier) => (
                    <div key={tier.name} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{tier.name}</span>
                      <span className="font-semibold text-[#0f1e3c]">
                        {typeof tier.price === "number" ? `$${tier.price}/mo` : "Custom"}
                      </span>
                    </div>
                  ))}
                </div>

                {appData.annualDiscount && (
                  <div className="text-teal-600 text-xs font-medium mb-3">{appData.annualDiscount}</div>
                )}

                <Link
                  href={appData.pricingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  View full pricing
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
