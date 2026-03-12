"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import InternalCTA from "@/components/seo/InternalCTA";
import Breadcrumb from "@/components/seo/Breadcrumb";

export default function RoofPitchCalculator() {
  const [rise, setRise] = useState("");
  const [run, setRun] = useState("12");
  const [result, setResult] = useState<{ pitch: string; angle: number; multiplier: number; category: string } | null>(null);

  function calculate() {
    const r = parseFloat(rise);
    const ru = parseFloat(run);
    if (!r || !ru || ru === 0) return;
    const pitch = r / ru;
    const angle = Math.atan(pitch) * (180 / Math.PI);
    const multiplier = 1 / Math.cos(Math.atan(pitch));
    let category = "Low slope";
    if (pitch >= 4 / 12) category = "Standard slope";
    if (pitch >= 7 / 12) category = "Steep slope";
    if (pitch >= 10 / 12) category = "Very steep slope";
    setResult({ pitch: `${r}/${ru}`, angle: Math.round(angle * 10) / 10, multiplier: Math.round(multiplier * 1000) / 1000, category });
  }

  return (
    <main>
      <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Free Tools", href: "/claims-library" }, { name: "Roof Pitch Calculator" }]} />
          <div className="mt-6 mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">
              <Calculator className="w-3.5 h-3.5" /> Free Tool
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Roof Pitch Calculator</h1>
          <p className="text-slate-300 text-lg leading-relaxed">Calculate roof pitch, angle in degrees, and roof area multiplier for any rise/run measurement. Free for roofers, contractors, and adjusters.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f5f0e8] border border-slate-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[#0f1e3c] mb-5">Enter your measurements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-2">Rise (inches)</label>
                <input
                  type="number"
                  value={rise}
                  onChange={(e) => setRise(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1e3c] bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-2">Run (inches) — typically 12</label>
                <input
                  type="number"
                  value={run}
                  onChange={(e) => setRun(e.target.value)}
                  placeholder="12"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1e3c] bg-white"
                />
              </div>
            </div>
            <button
              onClick={calculate}
              className="inline-flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#1a3060] transition-colors text-sm"
            >
              Calculate <Calculator className="w-4 h-4" />
            </button>
          </div>

          {result && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Pitch", value: result.pitch },
                { label: "Angle", value: `${result.angle}°` },
                { label: "Multiplier", value: result.multiplier.toString() },
                { label: "Category", value: result.category },
              ].map((item) => (
                <div key={item.label} className="bg-[#f5f0e8] border border-slate-200 rounded-xl p-4 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-[#0f1e3c]">{item.value}</div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[#0f1e3c] mb-4">Common roof pitches reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 font-semibold text-[#0f1e3c]">Pitch</th>
                    <th className="text-left py-2 font-semibold text-[#0f1e3c]">Angle</th>
                    <th className="text-left py-2 font-semibold text-[#0f1e3c]">Multiplier</th>
                    <th className="text-left py-2 font-semibold text-[#0f1e3c]">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2/12", "9.5°", "1.014", "Low slope"],
                    ["3/12", "14.0°", "1.031", "Low slope"],
                    ["4/12", "18.4°", "1.054", "Standard"],
                    ["5/12", "22.6°", "1.083", "Standard"],
                    ["6/12", "26.6°", "1.118", "Standard"],
                    ["7/12", "30.3°", "1.158", "Steep"],
                    ["8/12", "33.7°", "1.202", "Steep"],
                    ["9/12", "36.9°", "1.250", "Steep"],
                    ["10/12", "39.8°", "1.302", "Very steep"],
                    ["12/12", "45.0°", "1.414", "Very steep"],
                  ].map(([pitch, angle, mult, cat]) => (
                    <tr key={pitch} className="border-b border-slate-100">
                      <td className="py-2 font-mono font-semibold text-teal-700">{pitch}</td>
                      <td className="py-2 text-slate-600">{angle}</td>
                      <td className="py-2 text-slate-600">{mult}</td>
                      <td className="py-2 text-slate-500 text-xs">{cat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <InternalCTA app="imagelablr" context="Use ImageLablr to label and organize your roof documentation photos by slope and damage type — automatically." />
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-base font-bold text-[#0f1e3c] mb-4">More free tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Roof Waste Calculator", href: "/tools/roof-waste-calculator" },
              { label: "Insurance Estimate Calculator", href: "/tools/insurance-estimate-calculator" },
              { label: "Water Mitigation Calculator", href: "/tools/water-mitigation-calculator" },
              { label: "Claims Library →", href: "/claims-library" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
