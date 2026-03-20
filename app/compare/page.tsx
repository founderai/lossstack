import ComparisonTable from "@/components/sections/ComparisonTable";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

        {/* View full pricing CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/pricing"
            className="flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a3060] transition-colors text-sm"
          >
            View Full Pricing
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
