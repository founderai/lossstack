"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";
import InternalCTA from "@/components/seo/InternalCTA";
import Breadcrumb from "@/components/seo/Breadcrumb";

type RoofType = "gable" | "hip" | "complex";

const wasteFactors: Record<RoofType, { label: string; low: number; high: number; desc: string }> = {
  gable: { label: "Simple Gable", low: 10, high: 12, desc: "Two slopes, simple ridge — lowest waste" },
  hip: { label: "Hip Roof", low: 15, high: 17, desc: "Four slopes with hip returns — moderate waste" },
  complex: { label: "Complex / Multi-Gable", low: 20, high: 25, desc: "Multiple valleys, dormers, or intersections — highest waste" },
};

export default function RoofWasteCalculator() {
  const [squares, setSquares] = useState("");
  const [roofType, setRoofType] = useState<RoofType>("gable");
  const [result, setResult] = useState<{ low: number; high: number; totalLow: number; totalHigh: number } | null>(null);

  function calculate() {
    const sq = parseFloat(squares);
    if (!sq) return;
    const wf = wasteFactors[roofType];
    const low = Math.round(sq * (1 + wf.low / 100) * 100) / 100;
    const high = Math.round(sq * (1 + wf.high / 100) * 100) / 100;
    setResult({ low: wf.low, high: wf.high, totalLow: low, totalHigh: high });
  }

  return (
    <main>
      <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Free Tools", href: "/claims-library" }, { name: "Roof Waste Calculator" }]} />
          <div className="mt-6 mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">
              <Calculator className="w-3.5 h-3.5" /> Free Tool
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Roof Waste Calculator</h1>
          <p className="text-slate-300 text-lg leading-relaxed">Calculate the correct waste factor for any roof type. Get the total squares to order for accurate material estimates and insurance supplements.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f5f0e8] border border-slate-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[#0f1e3c] mb-5">Enter roof details</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#0f1e3c] mb-2">Measured squares (from sketch)</label>
              <input
                type="number"
                value={squares}
                onChange={(e) => setSquares(e.target.value)}
                placeholder="e.g. 28.5"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1e3c] bg-white max-w-xs"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-[#0f1e3c] mb-3">Roof complexity</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.entries(wasteFactors) as [RoofType, typeof wasteFactors[RoofType]][]).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setRoofType(key)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${roofType === key ? "border-[#0f1e3c] bg-[#0f1e3c] text-white" : "border-slate-200 bg-white text-[#0f1e3c] hover:border-slate-300"}`}
                  >
                    <div className="font-semibold text-sm mb-1">{val.label}</div>
                    <div className={`text-xs ${roofType === key ? "text-slate-300" : "text-slate-500"}`}>{val.desc}</div>
                    <div className={`text-xs font-semibold mt-2 ${roofType === key ? "text-teal-300" : "text-teal-600"}`}>{val.low}–{val.high}% waste</div>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={calculate}
              className="inline-flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#1a3060] transition-colors text-sm"
            >
              Calculate Waste <Calculator className="w-4 h-4" />
            </button>
          </div>

          {result && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-[#0f1e3c] mb-4">Results for {wasteFactors[roofType].label}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Measured Squares", value: parseFloat(squares).toFixed(2) },
                  { label: "Waste Factor", value: `${result.low}–${result.high}%` },
                  { label: "Squares to Order (Low)", value: result.totalLow.toFixed(2) },
                  { label: "Squares to Order (High)", value: result.totalHigh.toFixed(2) },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">{item.label}</div>
                    <div className="text-2xl font-bold text-[#0f1e3c]">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-teal-700 text-xs mt-4">Order the higher estimate to avoid material shortages. Excess material can be returned or used for future repairs.</p>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[#0f1e3c] mb-4">Why waste factor matters for insurance supplements</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">Insurance companies often use a lower waste factor than what the roof geometry actually requires. If the adjuster estimated 10% waste on a complex hip roof with multiple valleys, the supplement for the correct waste factor can add 1–3 squares of material to the approved scope.</p>
            <p className="text-slate-600 text-sm leading-relaxed">Always document the roof geometry with photos and a detailed sketch to support your waste factor calculation in the estimate.</p>
          </div>

          <InternalCTA app="appraisly" context="Appraisly compares your roofing estimate — including waste factors — to the insurance company's scope to identify every discrepancy." />
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-base font-bold text-[#0f1e3c] mb-4">More free tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Roof Pitch Calculator", href: "/tools/roof-pitch-calculator" },
              { label: "Insurance Estimate Calculator", href: "/tools/insurance-estimate-calculator" },
              { label: "Water Mitigation Calculator", href: "/tools/water-mitigation-calculator" },
              { label: "Claims Library →", href: "/claims-library" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
