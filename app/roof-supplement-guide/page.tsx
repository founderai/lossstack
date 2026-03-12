import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";

const steps = [
  {
    step: 1,
    heading: "Get the adjuster's line-item estimate",
    body: "Always request the full Xactimate line-item breakdown — not just the summary page or total. The line-item detail shows every code, quantity, and unit price. This is what you'll compare against your own scope.",
    tip: "If the adjuster only sent a summary, email them directly and request the full Xactimate estimate with line items.",
  },
  {
    step: 2,
    heading: "Build your own scope from scratch",
    body: "Don't start from the adjuster's estimate — build your own scope independently based on your site inspection and measurements. This ensures you catch items they missed rather than anchoring to their version.",
    tip: "Use photos and measurements from your site visit. Document everything before, during, and after.",
  },
  {
    step: 3,
    heading: "Compare line by line",
    body: "Go through every line item in your scope and check whether it appears in the adjuster's estimate, at the right quantity, and at the right code. Missing items, wrong codes, and under-measured quantities are all supplementable.",
    tip: "Appraisly automates this comparison — it highlights every discrepancy automatically.",
  },
  {
    step: 4,
    heading: "Document every discrepancy",
    body: "For each supplemented item, gather supporting evidence: photos showing the condition, measurements, manufacturer specs, and local building code citations where applicable.",
    tip: "Code citations are powerful — 'Per [city] building code, drip edge is required on all eaves and rakes' is harder to deny than a verbal request.",
  },
  {
    step: 5,
    heading: "Write and submit the supplement request",
    body: "Submit your supplement as a written document — not a phone call. Include the specific Xactimate codes you're adding or correcting, the quantities, your justification, and the supporting documentation.",
    tip: "Submit via email and keep a paper trail. Reference the claim number in every communication.",
  },
  {
    step: 6,
    heading: "Follow up until approved",
    body: "Most supplements take 1–3 weeks. If you haven't heard back in 5 business days, follow up in writing. If a supplement is denied, request the specific reason in writing and respond to each denial point individually.",
    tip: "Never accept a verbal denial. Get the reason in writing so you can address it specifically.",
  },
];

const topSupplementItems = [
  { item: "Starter shingles (RFG 226)", typical: "$400–$700", notes: "Count all eave and rake linear footage" },
  { item: "Drip edge (RFG 270)", typical: "$300–$550", notes: "All eaves and rakes — code requirement" },
  { item: "Ice & water shield (RFG 358)", typical: "$800–$1,800", notes: "Eaves + valleys + skylights per local code" },
  { item: "Synthetic underlayment upgrade (RFG 356)", typical: "$500–$1,000", notes: "Code upgrade from felt paper" },
  { item: "Steep slope pitch adder", typical: "$750–$2,500", notes: "Verify pitch matches your measurement" },
  { item: "Pipe boots (RFG 290)", typical: "$150–$400", notes: "Count all penetrations from photos" },
  { item: "Multi-layer tear-off adder (RFG 181)", typical: "$850–$1,500", notes: "If 2+ shingle layers exist" },
  { item: "Shingle grade upgrade (RFG 242 vs 240)", typical: "$500–$1,500", notes: "When existing were 40–50yr architectural" },
  { item: "Ridge vent (RFG 310)", typical: "$200–$600", notes: "Required by most shingle manufacturers" },
  { item: "Overhead & profit (O&P)", typical: "$1,500–$4,000", notes: "10% OH + 10% profit for GC coordination" },
];

const denialResponses = [
  { denial: '"That\'s not covered under this policy."', response: 'Request the specific policy exclusion in writing. Most code-required items (drip edge, ice & water shield) are not excluded — they\'re simply omitted from the scope.' },
  { denial: '"We already included that."', response: 'Point to the specific line item on their estimate. If it\'s there, confirm the quantity matches yours. If quantities differ, that\'s a separate supplement.' },
  { denial: '"That\'s not storm damage."', response: 'Provide documentation showing the item was damaged or that replacement is required due to the storm damage scope (e.g., pipe boots must be replaced when a roof is replaced).' },
  { denial: '"The price list doesn\'t support that rate."', response: 'Request their current pricing period. If it\'s outdated, request repricing to the current period. Xactimate prices update quarterly.' },
];

export default function RoofSupplementGuidePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "LossStack", url: "https://lossstack.com" },
        { name: "Xactimate Line Items", url: "https://lossstack.com/xactimate-line-item-search" },
        { name: "Roof Supplement Guide", url: "https://lossstack.com/roof-supplement-guide" },
      ]} />
      <main>
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Xactimate Line Items", href: "/xactimate-line-item-search" }, { name: "Roof Supplement Guide" }]} />
            <h1 className="text-3xl lg:text-5xl font-bold mt-6 mb-5 leading-tight">
              The Roof Supplement Guide — How to Get Paid in Full on Every Claim
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">
              A complete, step-by-step process for supplementing a roof insurance claim — from getting the adjuster's estimate to submitting your request and handling denials.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://appraislyai.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm">
                Automate Supplements with Appraisly <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/xactimate-roofing-codes" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Roofing Code Reference
              </Link>
            </div>
          </div>
        </section>

        {/* What is a supplement */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">What is a roof supplement?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A supplement is a formal, written request to the insurance company to revise their estimate upward — adding missing line items, correcting wrong codes, or adjusting under-measured quantities. Supplementing is a <strong className="text-[#0f1e3c]">standard, expected part of the claims process</strong>, not a dispute or complaint.
            </p>
            <p className="text-slate-600 leading-relaxed">
              On a typical residential roof replacement, the gap between a carrier's initial estimate and a properly-scoped job is <strong className="text-[#0f1e3c]">$2,000–$6,000</strong>. Roofers and public adjusters who supplement systematically recover this on every claim. Those who don't either absorb the loss or do the work for less than it costs.
            </p>
          </div>
        </section>

        {/* Step by step */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-8">The supplement process — step by step</h2>
            <div className="flex flex-col gap-5">
              {steps.map((s) => (
                <div key={s.step} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#0f1e3c] text-white font-bold text-sm flex items-center justify-center">{s.step}</div>
                  <div>
                    <h3 className="font-bold text-[#0f1e3c] mb-2">{s.heading}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{s.body}</p>
                    <div className="bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5">
                      <span className="text-teal-700 text-xs font-semibold">Pro tip: </span>
                      <span className="text-teal-700 text-xs">{s.tip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top 10 supplement items */}
        <section className="bg-white px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-3">The 10 most common roofing supplement items</h2>
            <p className="text-slate-500 mb-7">These items appear in the vast majority of successful roof supplements. Check every one on every claim.</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">#</th>
                    <th className="text-left px-4 py-3 font-semibold">Item</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Typical Value</th>
                    <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">How to Document</th>
                  </tr>
                </thead>
                <tbody>
                  {topSupplementItems.map((item, i) => (
                    <tr key={item.item} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-bold text-slate-400 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-[#0f1e3c]">{item.item}</td>
                      <td className="px-4 py-3 font-semibold text-teal-700 hidden md:table-cell whitespace-nowrap">{item.typical}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <Link href="/xactimate-roofing-codes" className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:underline">
                See all RFG roofing codes with price ranges <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Handling denials */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-3">How to handle supplement denials</h2>
            <p className="text-slate-500 mb-7">Every denial has a specific response. Don't accept a denial at face value — address the stated reason directly.</p>
            <div className="flex flex-col gap-4">
              {denialResponses.map((d, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="font-semibold text-[#0f1e3c] text-sm italic">{d.denial}</span>
                  </div>
                  <div className="flex items-start gap-3 ml-8">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{d.response}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-1">Find every supplement item in minutes</h2>
            <InternalCTA app="appraisly" context="Appraisly compares your roofing estimate to the insurance company's Xactimate scope line by line — automating the comparison that takes contractors hours to do manually." />
          </div>
        </section>

        <section className="bg-[#f5f0e8] px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "← Xactimate Line Item Search", href: "/xactimate-line-item-search" },
                { label: "Xactimate Roofing Codes", href: "/xactimate-roofing-codes" },
                { label: "Contractor vs Insurance Estimate", href: "/contractor-vs-insurance-estimate" },
                { label: "Hail Damage Scope Example", href: "/hail-damage-scope-example" },
                { label: "Roof Replacement Estimate Example", href: "/claims-library/estimates/roof-replacement-estimate-example" },
                { label: "Software for Roofers", href: "/software-for-roofers" },
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
