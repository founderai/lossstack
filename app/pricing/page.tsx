import Footer from "@/components/sections/Footer";
import UnifiedPricing from "@/components/sections/UnifiedPricing";
import Link from "next/link";
import { BarChart2 } from "lucide-react";

export const metadata = {
  title: "Pricing — LossStack",
  description: "One subscription. All three apps. Plans from free to firm.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Page header */}
      <div className="bg-[#0f1e3c] px-6 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Unified Pricing</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            One plan.
            <br />
            <span className="text-blue-300/80">All three apps included.</span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-2xl mx-auto mb-8">
            Every LossStack plan gives you access to Appraisly, ImageLablr, and RestoreCam. Pay once, use all three. Scale with credits as your volume grows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "No per-app fees", color: "bg-white/10 border-white/15 text-blue-200" },
              { label: "Credits roll forward", color: "bg-teal-500/20 border-teal-400/30 text-teal-200" },
              { label: "Cancel anytime", color: "bg-white/10 border-white/15 text-blue-200" },
            ].map((pill) => (
              <div key={pill.label} className={`flex items-center border rounded-xl px-4 py-2 text-sm font-medium ${pill.color}`}>
                {pill.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <UnifiedPricing />
      </div>

      {/* Compare link */}
      <div className="max-w-5xl mx-auto px-6 pb-12 text-center">
        <p className="text-slate-500 text-sm mb-4">
          Want a side-by-side feature breakdown?
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
