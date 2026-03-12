import Footer from "@/components/sections/Footer";
import PricingBuilder from "@/components/sections/PricingBuilder";
import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { pricingConfig } from "@/data/pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Page header */}
      <div className="bg-[#0f1e3c] px-6 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Bundle Pricing</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Build your stack.
            <br />
            <span className="text-blue-300/80">Save more as you add more.</span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-2xl mx-auto mb-8">
            Each app has its own pricing tiers — visit any app site to subscribe. Add 2 or 3 apps and unlock LossStack bundle savings on top.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-blue-200">
              <span className="font-bold text-white">{pricingConfig.twoAppDiscountPercent}% off</span>
              any 2 apps
            </div>
            <div className="flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 rounded-xl px-4 py-2.5 text-sm text-teal-200">
              <span className="font-bold text-teal-300">{pricingConfig.threeAppDiscountPercent}% off</span>
              full 3-app suite
            </div>
          </div>
        </div>
      </div>

      {/* Bundle calculator — top of page */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <PricingBuilder />
      </div>

      {/* Compare link */}
      <div className="max-w-5xl mx-auto px-6 pb-12 text-center">
        <p className="text-slate-500 text-sm mb-4">
          Not sure which apps you need? See a full feature-by-feature comparison.
        </p>
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a3060] transition-colors text-sm"
        >
          <BarChart2 className="w-4 h-4" />
          Compare All Plans
        </Link>
      </div>

      <Footer />
    </div>
  );
}
