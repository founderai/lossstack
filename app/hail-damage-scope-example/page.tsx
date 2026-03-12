import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";

const roofScope = [
  { code: "RFG 180", description: "Remove roofing — comp shingles (1 layer)", qty: "28.50", unit: "SQ", range: "$68/SQ", total: "$1,938" },
  { code: "RFG 188", description: "Haul debris", qty: "28.50", unit: "SQ", range: "$32/SQ", total: "$912" },
  { code: "RFG 356", description: "Synthetic underlayment", qty: "28.50", unit: "SQ", range: "$24/SQ", total: "$684" },
  { code: "RFG 358", description: "Ice & water shield", qty: "4.20", unit: "SQ", range: "$72/SQ", total: "$302" },
  { code: "RFG 240", description: "Arch comp shingles — 30yr", qty: "28.50", unit: "SQ", range: "$245/SQ", total: "$6,983" },
  { code: "RFG 226", description: "Starter shingles", qty: "168", unit: "LF", range: "$3.25/LF", total: "$546" },
  { code: "RFG 252", description: "Ridge cap", qty: "62", unit: "LF", range: "$5.80/LF", total: "$360" },
  { code: "RFG 270", description: "Drip edge — aluminum", qty: "168", unit: "LF", range: "$2.15/LF", total: "$361" },
  { code: "RFG 281", description: "Step flashing", qty: "24", unit: "LF", range: "$6.50/LF", total: "$156" },
  { code: "RFG 290", description: "Pipe boots (4 total)", qty: "4", unit: "EA", range: "$52/EA", total: "$208" },
  { code: "RFG 310", description: "Ridge vent", qty: "32", unit: "LF", range: "$7.20/LF", total: "$230" },
];

const sidingScope = [
  { code: "SID 160", description: "Vinyl siding — double 4\" (south elevation)", qty: "420", unit: "SF", range: "$3.85/SF", total: "$1,617" },
  { code: "SID 180", description: "Corner posts — vinyl", qty: "48", unit: "LF", range: "$3.50/LF", total: "$168" },
  { code: "SID 270", description: "Soffit — vinyl vented", qty: "180", unit: "SF", range: "$4.20/SF", total: "$756" },
  { code: "SID 275", description: "Fascia — aluminum wrap", qty: "96", unit: "LF", range: "$5.10/LF", total: "$490" },
];

const gutterScope = [
  { code: "GTR 130", description: "Gutters — aluminum 5\"", qty: "96", unit: "LF", range: "$4.80/LF", total: "$461" },
  { code: "GTR 150", description: "Downspouts — aluminum", qty: "32", unit: "LF", range: "$3.20/LF", total: "$102" },
  { code: "GTR 180", description: "Gutter guards — remove & replace", qty: "96", unit: "LF", range: "$5.50/LF", total: "$528" },
];

const checklistItems = [
  "Drip edge on all eaves and rakes",
  "Ice & water shield at eaves, valleys, and skylights",
  "Synthetic underlayment (not felt paper)",
  "Starter shingles on all eaves and rakes",
  "Correct shingle grade matching existing material",
  "Steep slope adder if pitch exceeds 6/12",
  "All pipe boots counted and included",
  "Step flashing at all wall intersections",
  "Ridge cap separate from field shingles",
  "Ridge vent included",
  "South and west elevations checked for siding impact marks",
  "All gutter sections evaluated — not just visibly dented",
  "Downspouts checked for denting",
  "Gutter guards replaced if present",
  "Window screens checked for hail impact",
  "A/C condenser fins checked for hail damage",
  "Satellite dishes documented",
  "Skylights checked for cracking or seal damage",
];

export default function HailDamageScopeExamplePage() {
  const roofTotal = roofScope.reduce((s, r) => s + parseFloat(r.total.replace(/[$,]/g, "")), 0);
  const sidingTotal = sidingScope.reduce((s, r) => s + parseFloat(r.total.replace(/[$,]/g, "")), 0);
  const gutterTotal = gutterScope.reduce((s, r) => s + parseFloat(r.total.replace(/[$,]/g, "")), 0);
  const subtotal = roofTotal + sidingTotal + gutterTotal;
  const op = subtotal * 0.2;
  const grandTotal = subtotal + op;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "LossStack", url: "https://lossstack.com" },
        { name: "Xactimate Line Items", url: "https://lossstack.com/xactimate-line-item-search" },
        { name: "Hail Damage Scope Example", url: "https://lossstack.com/hail-damage-scope-example" },
      ]} />
      <main>
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Xactimate Line Items", href: "/xactimate-line-item-search" }, { name: "Hail Damage Scope Example" }]} />
            <div className="mt-6 mb-3">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">Scope Example</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-5 leading-tight">
              Hail Damage Scope Example — Complete Xactimate Line Item Breakdown
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">
              A fully-scoped hail damage claim for a 2,800 SF two-story home with a 6/12 pitch roof, one affected siding elevation, and full gutter replacement. See every line item, quantity, and typical range.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://appraislyai.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm">
                Compare Your Estimate with Appraisly <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/claims-library/guides/how-to-document-hail-damage" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Hail Documentation Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Job overview */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-5">Job overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Home Size", value: "2,800 SF" },
                { label: "Roof Squares", value: "28.5 SQ" },
                { label: "Roof Pitch", value: "6/12" },
                { label: "Stories", value: "2-story" },
              ].map((item) => (
                <div key={item.label} className="bg-[#f5f0e8] border border-slate-200 rounded-xl p-4 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-[#0f1e3c]">{item.value}</div>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-4">
              * All prices are representative of national Xactimate averages. Actual pricing varies by market and pricing period.
            </p>
          </div>
        </section>

        {/* Roof scope table */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Roofing scope (RFG)</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Code</th>
                    <th className="text-left px-4 py-3 font-semibold">Description</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Qty</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Unit</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Rate</th>
                    <th className="text-right px-4 py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {roofScope.map((item, i) => (
                    <tr key={item.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-mono font-bold text-xs text-blue-700">{item.code}</td>
                      <td className="px-4 py-3 text-[#0f1e3c] font-medium">{item.description}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.qty}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.unit}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.range}</td>
                      <td className="px-4 py-3 font-semibold text-teal-700 text-right">{item.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td colSpan={5} className="px-4 py-3 font-bold text-[#0f1e3c] text-right hidden md:table-cell">Roofing Subtotal</td>
                    <td colSpan={2} className="px-4 py-3 font-bold text-[#0f1e3c] text-right md:hidden">Roofing Subtotal</td>
                    <td className="px-4 py-3 font-bold text-[#0f1e3c] text-right">${roofTotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Siding scope */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Siding scope (SID) — south elevation</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Code</th>
                    <th className="text-left px-4 py-3 font-semibold">Description</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Qty</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Unit</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Rate</th>
                    <th className="text-right px-4 py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sidingScope.map((item, i) => (
                    <tr key={item.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-mono font-bold text-xs text-amber-700">{item.code}</td>
                      <td className="px-4 py-3 text-[#0f1e3c] font-medium">{item.description}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.qty}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.unit}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.range}</td>
                      <td className="px-4 py-3 font-semibold text-teal-700 text-right">{item.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50 border-t-2 border-amber-200">
                    <td colSpan={5} className="px-4 py-3 font-bold text-[#0f1e3c] text-right hidden md:table-cell">Siding Subtotal</td>
                    <td colSpan={2} className="px-4 py-3 font-bold text-[#0f1e3c] text-right md:hidden">Siding Subtotal</td>
                    <td className="px-4 py-3 font-bold text-[#0f1e3c] text-right">${sidingTotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Gutters */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Gutters &amp; downspouts scope</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Code</th>
                    <th className="text-left px-4 py-3 font-semibold">Description</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Qty</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Unit</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Rate</th>
                    <th className="text-right px-4 py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {gutterScope.map((item, i) => (
                    <tr key={item.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-mono font-bold text-xs text-teal-700">{item.code}</td>
                      <td className="px-4 py-3 text-[#0f1e3c] font-medium">{item.description}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.qty}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.unit}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.range}</td>
                      <td className="px-4 py-3 font-semibold text-teal-700 text-right">{item.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-teal-50 border-t-2 border-teal-200">
                    <td colSpan={5} className="px-4 py-3 font-bold text-[#0f1e3c] text-right hidden md:table-cell">Gutters Subtotal</td>
                    <td colSpan={2} className="px-4 py-3 font-bold text-[#0f1e3c] text-right md:hidden">Gutters Subtotal</td>
                    <td className="px-4 py-3 font-bold text-[#0f1e3c] text-right">${gutterTotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Grand total */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Estimate summary</h2>
            <div className="bg-[#f5f0e8] border border-slate-200 rounded-2xl p-6 max-w-sm">
              {[
                { label: "Roofing (RFG)", value: `$${roofTotal.toLocaleString()}` },
                { label: "Siding (SID)", value: `$${sidingTotal.toLocaleString()}` },
                { label: "Gutters (GTR)", value: `$${gutterTotal.toLocaleString()}` },
                { label: "Subtotal", value: `$${subtotal.toLocaleString()}`, bold: true },
                { label: "Overhead & Profit (20%)", value: `$${Math.round(op).toLocaleString()}` },
              ].map((row) => (
                <div key={row.label} className={`flex justify-between py-2 ${row.bold ? "border-t border-slate-300 font-bold" : ""} text-sm`}>
                  <span className="text-slate-600">{row.label}</span>
                  <span className="text-[#0f1e3c] font-semibold">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between py-3 border-t-2 border-[#0f1e3c] mt-1 font-bold text-base">
                <span className="text-[#0f1e3c]">Total Estimate</span>
                <span className="text-teal-700 text-lg">${Math.round(grandTotal).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* What the adjuster typically misses */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">What adjusters typically miss on this scope</h2>
            <p className="text-slate-500 mb-6">On a job like this, a typical adjuster estimate leaves out $3,000–$5,000 in legitimate scope items.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Starter shingles (RFG 226) — often omitted entirely",
                "Drip edge (RFG 270) — omitted on both eaves and rakes",
                "Synthetic underlayment upgrade (RFG 356) — defaults to felt",
                "Ice & water shield under-measured — eaves only, not valleys",
                "Gutter guards not included despite being damaged",
                "Soffit and fascia scoped as part of siding instead of separate line",
                "Corner posts omitted on siding elevation",
                "O&P not included despite GC coordinating multiple trades",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-red-100 rounded-xl p-4">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-5">Hail damage scope checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklistItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#f5f0e8] border border-slate-200 rounded-xl p-4">
                  <div className="shrink-0 w-5 h-5 rounded border-2 border-slate-400 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-1">Compare your estimate against this scope automatically</h2>
            <InternalCTA app="appraisly" context="Appraisly compares your hail damage estimate to the insurance company's Xactimate scope and identifies every missing item — in minutes." />
          </div>
        </section>

        <section className="bg-white px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "← Xactimate Line Item Search", href: "/xactimate-line-item-search" },
                { label: "Xactimate Roofing Codes", href: "/xactimate-roofing-codes" },
                { label: "Roof Supplement Guide", href: "/roof-supplement-guide" },
                { label: "How to Document Hail Damage", href: "/claims-library/guides/how-to-document-hail-damage" },
                { label: "Hail Damage Estimate Example", href: "/claims-library/estimates/hail-damage-estimate-example" },
                { label: "Contractor vs Insurance Estimate", href: "/contractor-vs-insurance-estimate" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
