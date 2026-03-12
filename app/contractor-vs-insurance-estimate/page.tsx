import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, BarChart2, Shield, Zap } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";

const gaps = [
  {
    num: 1,
    title: "Missing code-required items",
    icon: AlertCircle,
    color: "#EF4444",
    body: "Drip edge, ice & water shield, and synthetic underlayment are code requirements in most jurisdictions — not optional upgrades. Adjusters frequently omit them entirely because they assume the contractor won't push back.",
    examples: ["Drip edge (RFG 270) — required on all eaves and rakes", "Ice & water shield (RFG 358) — required at eaves, valleys, skylights", "Synthetic underlayment — code upgrade from #15 felt paper"],
  },
  {
    num: 2,
    title: "Wrong material grade codes",
    icon: BarChart2,
    color: "#F59E0B",
    body: "Using a 3-tab shingle code (RFG 220) when the roof has architectural shingles (RFG 240/242), or using standard grade when the existing material was premium, systematically under-prices the material cost.",
    examples: ["3-tab code on an architectural shingle roof", "Standard 30yr code when existing was 40–50yr premium", "Incorrect siding profile code (double 4\" vs double 5\")"],
  },
  {
    num: 3,
    title: "Missing pitch and story adders",
    icon: Zap,
    color: "#8B5CF6",
    body: "Pitch adders and story height adders multiply every labor line item in the estimate. A 7/12 pitch requires a steep slope adder worth $25–$45/SQ — on a 30-square roof, that's $750–$1,350 in missing labor alone.",
    examples: ["Wrong pitch in sketch = all labor under-priced", "2-story adder omitted on 2-story homes", "Steep slope adder missing on any roof over 6/12"],
  },
  {
    num: 4,
    title: "Matching provisions ignored",
    icon: Shield,
    color: "#0D9488",
    body: "When damaged materials can't be matched — because the color is discontinued or the product is no longer made — insurance policy language typically requires full replacement. Adjusters scope partial replacement, expecting it to go unchallenged.",
    examples: ["Discontinued siding color = full elevation replacement", "Discontinued shingle line = full roof", "Partial carpet replacement when full room matching required"],
  },
  {
    num: 5,
    title: "Scope limited to visible damage only",
    icon: AlertCircle,
    color: "#3B82F6",
    body: "Adjusters often scope only what they can see from ground level or a quick inspection. Secondary damage — like step flashing failure, pipe boot cracking, or attic insulation compression from hail — gets missed entirely.",
    examples: ["Pipe boots cracked from hail impact", "Step flashing lifted or failed at wall intersections", "Attic insulation displaced from foot traffic or hail"],
  },
];

const comparisonRows = [
  { item: "Shingle grade", adjuster: "Standard 30yr (RFG 240)", contractor: "Matches existing grade — may require 40–50yr" },
  { item: "Starter shingles", adjuster: "Often omitted entirely", contractor: "All eaves and rakes (RFG 226)" },
  { item: "Drip edge", adjuster: "Often omitted entirely", contractor: "All eaves and rakes (RFG 270)" },
  { item: "Underlayment", adjuster: "#15 felt paper", contractor: "Synthetic (code upgrade, RFG 356)" },
  { item: "Ice & water shield", adjuster: "Eaves only or omitted", contractor: "Eaves + all valleys + skylights (RFG 358)" },
  { item: "Pitch adder", adjuster: "May use wrong pitch from satellite", contractor: "Measured pitch with steep slope adder" },
  { item: "Pipe boots", adjuster: "1–2 counted", contractor: "All penetrations counted from photos" },
  { item: "O&P", adjuster: "Often not included", contractor: "10% OH + 10% profit for GC coordination" },
];

export default function ContractorVsInsuranceEstimatePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "LossStack", url: "https://lossstack.com" },
        { name: "Xactimate Line Items", url: "https://lossstack.com/xactimate-line-item-search" },
        { name: "Contractor vs Insurance Estimate", url: "https://lossstack.com/contractor-vs-insurance-estimate" },
      ]} />
      <main>
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Xactimate Line Items", href: "/xactimate-line-item-search" }, { name: "Contractor vs Insurance" }]} />
            <h1 className="text-3xl lg:text-5xl font-bold mt-6 mb-5 leading-tight">
              Contractor vs Insurance Estimate — Why They're Always Different
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">
              The gap between your estimate and the insurance company's Xactimate scope is almost never random. It comes from the same 5 patterns on nearly every claim — and once you know them, you can find them every time.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://appraislyai.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm">
                Compare Estimates with Appraisly <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/xactimate-line-item-search" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Search Line Items
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">The gap is structural, not accidental</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Insurance adjusters build estimates in Xactimate — a pricing software that assigns a localized cost to every unit of repair work. The adjuster enters a scope: what they observed, what measurements they took, and what codes they applied. The software calculates the total.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The problem isn't the software. The problem is what gets entered. Adjusters are trained to scope what they see, not what the building code requires. They default to the cheapest applicable code, not the one that matches existing materials. And they're working 20+ claims simultaneously, so things get missed.
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-[#0f1e3c]">The result:</strong> a structural gap between the adjuster's estimate and what it actually costs to restore the property to pre-loss condition. On a typical residential roof claim, that gap is <strong className="text-[#0f1e3c]">$2,000–$6,000</strong>. On a full exterior claim it can exceed $10,000.
            </p>
          </div>
        </section>

        {/* 5 gaps */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-3">The 5 reasons estimates always differ</h2>
            <p className="text-slate-500 mb-10">These patterns appear on almost every claim. Learn to find them systematically.</p>
            <div className="flex flex-col gap-6">
              {gaps.map((gap) => (
                <div key={gap.num} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: gap.color }}>
                      {gap.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f1e3c] text-lg mb-2">{gap.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{gap.body}</p>
                    </div>
                  </div>
                  <div className="ml-14">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Common examples</p>
                    <div className="flex flex-col gap-1.5">
                      {gap.examples.map((ex, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: gap.color }} />
                          <span className="text-slate-600 text-sm">{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-white px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-3">What adjusters use vs what contractors include</h2>
            <p className="text-slate-500 mb-7">A typical roofing claim — side by side.</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Line Item</th>
                    <th className="text-left px-4 py-3 font-semibold text-red-300">Adjuster Estimate</th>
                    <th className="text-left px-4 py-3 font-semibold text-teal-300">Contractor Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.item} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-semibold text-[#0f1e3c]">{row.item}</td>
                      <td className="px-4 py-3 text-red-600 text-sm">{row.adjuster}</td>
                      <td className="px-4 py-3 text-teal-700 text-sm">{row.contractor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What is a supplement */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">What is a supplement — and how does it work?</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              A supplement is a formal request to the insurance company to revise their estimate upward based on items that were missed, under-priced, or incorrectly scoped. Supplements are a standard, expected part of the claims process — not a dispute.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { step: 1, text: "Receive the adjuster's Xactimate estimate (ask for the line-item breakdown, not just the total)" },
                { step: 2, text: "Compare line by line — look for missing codes, wrong material grades, missing adders, and under-measured quantities" },
                { step: 3, text: "Document every discrepancy with photos, measurements, and code citations" },
                { step: 4, text: "Submit a written supplement request with specific line items and supporting documentation" },
                { step: 5, text: "Follow up with the adjuster or insurance company — most supplements take 1–3 weeks to process" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[#0f1e3c] text-white text-xs font-bold flex items-center justify-center">{item.step}</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/roof-supplement-guide" className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:underline">
                Read the complete Roof Supplement Guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-1">Compare estimates in minutes, not hours</h2>
            <InternalCTA app="appraisly" context="Appraisly ingests your estimate and the insurance company's scope and highlights every missing line item, wrong code, and pricing discrepancy — automatically." />
          </div>
        </section>

        {/* Internal links */}
        <section className="bg-[#f5f0e8] px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "← Xactimate Line Item Search", href: "/xactimate-line-item-search" },
                { label: "Xactimate Roofing Codes", href: "/xactimate-roofing-codes" },
                { label: "Roof Supplement Guide", href: "/roof-supplement-guide" },
                { label: "Hail Damage Scope Example", href: "/hail-damage-scope-example" },
                { label: "Roof Replacement Estimate Example", href: "/claims-library/estimates/roof-replacement-estimate-example" },
                { label: "Software for Public Adjusters", href: "/software-for-public-adjusters" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
