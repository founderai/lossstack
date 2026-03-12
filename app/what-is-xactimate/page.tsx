import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";

const categories = [
  { code: "RFG", trade: "Roofing", examples: "Shingles, tear-off, underlayment, flashing, vents" },
  { code: "SID", trade: "Siding", examples: "Vinyl, fiber cement, soffit, fascia, corner posts" },
  { code: "DRY", trade: "Drywall", examples: "Install, remove, flood cut, texture, corner bead" },
  { code: "PNT", trade: "Painting", examples: "Walls, ceilings, trim, primer, shellac sealer" },
  { code: "FLR", trade: "Flooring", examples: "Carpet, pad, hardwood, LVP, tile" },
  { code: "WTR", trade: "Water Mitigation", examples: "Air movers, dehumidifiers, monitoring, antimicrobial" },
  { code: "STR", trade: "Structural", examples: "Framing, sheathing, OSB, plywood" },
  { code: "WIN", trade: "Windows & Doors", examples: "Window replacement, exterior doors, screens" },
];

const faqs = [
  { q: "Does Xactimate pricing change by location?", a: "Yes — Xactimate uses a localized price list called the 'Xactimate Price List' that is updated quarterly for each market. Prices in coastal markets, high cost-of-living cities, and areas with labor shortages are higher than national averages." },
  { q: "What is a Xactimate pricing period?", a: "The pricing period is the date the estimate is created, which determines which price list is used. Using a price list from months ago on a current job can result in under-priced labor and materials." },
  { q: "Can contractors use Xactimate?", a: "Yes — Xactimate licenses are available to contractors and public adjusters. However, the cost is significant and the learning curve is steep. Tools like Appraisly let contractors compare against Xactimate estimates without needing a full license." },
  { q: "Who owns Xactimate?", a: "Xactimate is owned by Verisk Analytics (formerly Xactware). It is the dominant estimating platform in the property insurance industry, used by most major carriers for property damage claims." },
];

export default function WhatIsXactimatePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "LossStack", url: "https://lossstack.com" },
        { name: "Xactimate Line Items", url: "https://lossstack.com/xactimate-line-item-search" },
        { name: "What Is Xactimate", url: "https://lossstack.com/what-is-xactimate" },
      ]} />
      <main>
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Xactimate Line Items", href: "/xactimate-line-item-search" }, { name: "What Is Xactimate" }]} />
            <h1 className="text-3xl lg:text-5xl font-bold mt-6 mb-5 leading-tight">
              What Is Xactimate? The Insurance Estimating Software Explained
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
              Xactimate is the software insurance companies use to build property damage estimates. Here's how it works, who uses it, and what every contractor and adjuster needs to know about it.
            </p>
          </div>
        </section>

        {/* What it is */}
        <section className="bg-white px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">What is Xactimate?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Xactimate is a property damage estimating software owned by Verisk Analytics. It is used by insurance carriers, independent adjusters, public adjusters, and many restoration contractors to price the cost of repairing property damage from events like hail, wind, water, and fire.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Xactimate works by assigning a specific code to every unit of repair work — <strong className="text-[#0f1e3c]">RFG 240</strong> for architectural shingles per square, <strong className="text-[#0f1e3c]">DRY 200</strong> for drywall per square foot, and so on. Each code has a price that is updated quarterly based on the local market. The adjuster enters the scope (what needs to be repaired) and Xactimate calculates the total.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The result is called an Xactimate estimate — a line-by-line breakdown of every repair item, its quantity, its unit price, and its total cost. This estimate is what the insurance company uses to determine the claim payment.
            </p>
          </div>
        </section>

        {/* Who uses it */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-8">Who uses Xactimate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Insurance Carriers", body: "Most major property insurance companies use Xactimate as their standard estimating platform. Adjusters — both staff and independent — build the initial scope in Xactimate and submit it as the basis for the claim payment.", color: "#2563EB" },
                { title: "Contractors & Roofers", body: "Many roofing and restoration contractors use Xactimate to build their own estimates for comparison against the insurance scope. Knowing the same codes the adjuster uses is a significant advantage during the supplement process.", color: "#0D9488" },
                { title: "Public Adjusters", body: "Public adjusters represent policyholders in disputes with insurance companies. They use Xactimate to identify missing items in the adjuster's scope and build supplement requests that are in the same format as the original estimate.", color: "#7C3AED" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: item.color }} />
                  <h3 className="font-bold text-[#0f1e3c] mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">How Xactimate pricing works</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Every line item in Xactimate has three components: a <strong className="text-[#0f1e3c]">code</strong> (the specific work item), a <strong className="text-[#0f1e3c]">unit</strong> (how it's measured — per square foot, per linear foot, per each), and a <strong className="text-[#0f1e3c]">quantity</strong> (how much of that unit is needed). The unit price comes from the localized Xactimate price list for that market.
            </p>
            <div className="bg-[#f5f0e8] border border-slate-200 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[#0f1e3c] mb-4 text-sm uppercase tracking-wide">Example line item calculation</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-300"><th className="text-left py-2 font-semibold text-slate-600">Code</th><th className="text-left py-2 font-semibold text-slate-600">Description</th><th className="text-left py-2 font-semibold text-slate-600">Qty</th><th className="text-left py-2 font-semibold text-slate-600">Unit</th><th className="text-left py-2 font-semibold text-slate-600">Unit Price</th><th className="text-left py-2 font-semibold text-slate-600">Total</th></tr></thead>
                  <tbody>
                    {[
                      ["RFG 240", "Arch comp shingles", "28.50", "SQ", "$245.00", "$6,982.50"],
                      ["RFG 180", "Tear-off (1 layer)", "28.50", "SQ", "$68.00", "$1,938.00"],
                      ["RFG 226", "Starter shingles", "160", "LF", "$3.25", "$520.00"],
                      ["RFG 270", "Drip edge", "160", "LF", "$2.15", "$344.00"],
                    ].map(([code, desc, qty, unit, price, total]) => (
                      <tr key={code} className="border-b border-slate-100">
                        <td className="py-2 font-mono font-bold text-xs text-blue-700">{code}</td>
                        <td className="py-2 text-[#0f1e3c]">{desc}</td>
                        <td className="py-2 text-slate-500">{qty}</td>
                        <td className="py-2 text-slate-500">{unit}</td>
                        <td className="py-2 text-slate-500">{price}</td>
                        <td className="py-2 font-semibold text-teal-700">{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-5">The major Xactimate categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div key={cat.code} className="flex items-start gap-3 bg-[#f5f0e8] border border-slate-200 rounded-xl p-4">
                  <span className="shrink-0 font-mono font-bold text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded">{cat.code}</span>
                  <div>
                    <div className="font-semibold text-[#0f1e3c] text-sm">{cat.trade}</div>
                    <div className="text-slate-500 text-xs">{cat.examples}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-7">Common questions about Xactimate</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-bold text-[#0f1e3c] mb-2 text-sm">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-1">Work with Xactimate estimates — without the license</h2>
            <InternalCTA app="appraisly" context="Appraisly lets you compare your estimate against a Xactimate scope line by line — finding every discrepancy and missing item without needing a full Xactimate subscription." />
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
                { label: "Roof Supplement Guide", href: "/roof-supplement-guide" },
                { label: "Claims Library", href: "/claims-library" },
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
