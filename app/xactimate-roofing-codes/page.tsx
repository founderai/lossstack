import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";

const rfgItems = [
  { code: "RFG 180", description: "Remove roofing — comp shingles (1 layer)", unit: "SQ", range: "$45–$95/SQ", notes: "Standard single-layer tear-off." },
  { code: "RFG 181", description: "Remove roofing — comp shingles (2 layers)", unit: "SQ", range: "$75–$140/SQ", notes: "Document layer count in photos." },
  { code: "RFG 188", description: "Haul debris", unit: "SQ", range: "$25–$45/SQ", notes: "Disposal separate from removal." },
  { code: "RFG 220", description: "Roofing — 3-tab comp shingles", unit: "SQ", range: "$140–$200/SQ", notes: "Only use if existing were 3-tab." },
  { code: "RFG 240", description: "Roofing — arch comp shingles (30yr)", unit: "SQ", range: "$180–$280/SQ", notes: "Most common residential shingle code." },
  { code: "RFG 242", description: "Roofing — arch comp shingles (40–50yr)", unit: "SQ", range: "$210–$320/SQ", notes: "Supplement from RFG 240 if existing were premium grade." },
  { code: "RFG 226", description: "Starter — comp shingles", unit: "LF", range: "$2.50–$4.50/LF", notes: "Required at all eaves and rakes. Frequently omitted.", missed: true },
  { code: "RFG 252", description: "Ridge cap — comp shingles", unit: "LF", range: "$4.50–$8.00/LF", notes: "Separate from field shingles. Often under-counted.", missed: true },
  { code: "RFG 270", description: "Drip edge — aluminum", unit: "LF", range: "$1.50–$3.50/LF", notes: "Code requirement on all eaves and rakes.", missed: true },
  { code: "RFG 281", description: "Flashing — step flashing", unit: "LF", range: "$4.00–$8.50/LF", notes: "All wall intersections. Count from site photos." },
  { code: "RFG 285", description: "Flashing — valley", unit: "LF", range: "$3.50–$7.00/LF", notes: "All valley lengths from sketch." },
  { code: "RFG 290", description: "Pipe flashing — lead or rubber boot", unit: "EA", range: "$35–$65/EA", notes: "Each penetration is separate. Count from photos.", missed: true },
  { code: "RFG 310", description: "Ridge vent", unit: "LF", range: "$5.00–$9.00/LF", notes: "Required by most shingle manufacturers for warranty." },
  { code: "RFG 315", description: "Roof vent — plastic", unit: "EA", range: "$25–$55/EA", notes: "Each box vent is a separate line item." },
  { code: "RFG 356", description: "Synthetic underlayment", unit: "SQ", range: "$18–$35/SQ", notes: "Code upgrade from felt paper. Required by most codes.", missed: true },
  { code: "RFG 358", description: "Ice & water shield", unit: "SQ", range: "$55–$85/SQ", notes: "Required at eaves, valleys, skylights per local code.", missed: true },
  { code: "RFG 362", description: "Felt paper — #15", unit: "SQ", range: "$8–$15/SQ", notes: "Only use if existing was felt and no code upgrade applies." },
];

const pitchAdders = [
  { pitch: "4/12 – 6/12", adder: "No adder (standard slope)" },
  { pitch: "6/12 – 7/12", adder: "+$15–$25/SQ" },
  { pitch: "7/12 – 9/12", adder: "+$25–$45/SQ" },
  { pitch: "9/12 – 12/12", adder: "+$45–$75/SQ" },
  { pitch: "12/12+", adder: "+$75–$120/SQ" },
];

export default function XactimateRoofingCodesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "LossStack", url: "https://lossstack.com" },
        { name: "Xactimate Line Items", url: "https://lossstack.com/xactimate-line-item-search" },
        { name: "Roofing Codes", url: "https://lossstack.com/xactimate-roofing-codes" },
      ]} />
      <main>
        {/* Hero */}
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[
              { name: "LossStack", href: "/" },
              { name: "Xactimate Line Items", href: "/xactimate-line-item-search" },
              { name: "Roofing Codes" },
            ]} />
            <div className="mt-6 mb-3">
              <span className="inline-block font-mono font-bold text-xs px-3 py-1 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-300">RFG Category</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-5 leading-tight">
              Xactimate Roofing Codes — Complete RFG Category Reference
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">
              Every Xactimate RFG roofing code — descriptions, units, typical price ranges, pitch adders, and the items insurance adjusters most often miss on roof estimates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://appraislyai.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm">
                Compare Estimates with Appraisly <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/xactimate-line-item-search" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Search All Line Items
              </Link>
            </div>
          </div>
        </section>

        {/* Full RFG table */}
        <section className="bg-white px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-2">All RFG roofing codes</h2>
            <p className="text-slate-500 text-sm mb-6">
              Items marked <span className="inline-flex items-center gap-1 text-red-500 font-semibold"><AlertCircle className="w-3.5 h-3.5" />Often Missed</span> are the most frequently omitted from adjuster estimates.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Code</th>
                    <th className="text-left px-4 py-3 font-semibold">Description</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Unit</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Typical Range</th>
                    <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {rfgItems.map((item, i) => (
                    <tr key={item.code} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} ${item.missed ? "border-l-4 border-red-300" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded whitespace-nowrap">{item.code}</span>
                          {item.missed && <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#0f1e3c] font-medium">{item.description}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.unit}</td>
                      <td className="px-4 py-3 font-semibold text-teal-700 hidden md:table-cell whitespace-nowrap">{item.range}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">* Ranges based on national Xactimate averages. Actual pricing varies by market and pricing period.</p>
          </div>
        </section>

        {/* Pitch adders */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">Steep slope pitch adders</h2>
            <p className="text-slate-500 text-base leading-relaxed mb-7 max-w-2xl">
              Any roof over 6/12 pitch requires a steep slope labor adder applied to every labor line item. If the adjuster uses the wrong pitch in the sketch, <strong>every single labor item is systematically under-priced</strong>. Always verify the pitch listed in the estimate matches your measurement.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Roof Pitch</th>
                    <th className="text-left px-4 py-3 font-semibold">Typical Steep Slope Adder</th>
                  </tr>
                </thead>
                <tbody>
                  {pitchAdders.map((row, i) => (
                    <tr key={row.pitch} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-mono font-semibold text-teal-700">{row.pitch}</td>
                      <td className="px-4 py-3 text-[#0f1e3c]">{row.adder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <Link href="/tools/roof-pitch-calculator" className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:underline">
                Use the free Roof Pitch Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Most missed */}
        <section className="bg-white px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">The 6 most missed RFG line items</h2>
            <p className="text-slate-500 mb-8 max-w-2xl">These items alone can represent <strong>$2,000–$5,000</strong> in missing value on a standard residential roof replacement. Find them on every job.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { code: "RFG 226", name: "Starter shingles", value: "$2.50–$4.50/LF", why: "Required at all eaves and rakes. A typical house has 120–200 LF of eave/rake." },
                { code: "RFG 270", name: "Drip edge", value: "$1.50–$3.50/LF", why: "Code-required on all eaves and rakes. Measured the same as starter shingles." },
                { code: "RFG 358", name: "Ice & water shield", value: "$55–$85/SQ", why: "Local codes require coverage at eaves, valleys, and skylights. Adjusters regularly under-measure." },
                { code: "RFG 356", name: "Synthetic underlayment", value: "$18–$35/SQ", why: "If existing roof had #15 felt, synthetic is a code upgrade. Adjusters default to felt paper." },
                { code: "RFG 290", name: "Pipe boots", value: "$35–$65/EA", why: "Each pipe penetration is a separate line item. A typical house has 3–6. Count from photos." },
                { code: "PITCH", name: "Steep slope adder", value: "Varies by pitch", why: "Wrong pitch in the sketch means every labor item is under-priced. Verify with your own measurement." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-[#f5f0e8] border border-slate-200 rounded-xl p-4">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-red-400 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">{item.code}</span>
                      <span className="font-semibold text-[#0f1e3c] text-sm">{item.name}</span>
                      <span className="text-teal-600 text-xs font-semibold">{item.value}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supplement checklist */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Roof supplement checklist — verify before closing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Pitch is correctly measured and matches estimate sketch",
                "Story height adder is applied (2-story = higher labor)",
                "Tear-off code matches actual layer count (1 vs 2 layers)",
                "Debris haul is a separate line from tear-off",
                "Shingle grade matches existing material (30yr vs 40–50yr)",
                "Starter shingles (RFG 226) are on all eaves and rakes",
                "Drip edge (RFG 270) is on all eaves and rakes",
                "Ice & water shield coverage matches local code requirements",
                "Synthetic underlayment upgrade from felt paper is included",
                "All pipe penetrations counted and pipe boots included",
                "Ridge cap measured from sketch and matches actual ridge footage",
                "Step flashing included at all wall intersections",
                "Valley flashing included for all valleys",
                "Ridge vent footage measured and included",
                "O&P included if GC is managing the project",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-1">Find every missing item automatically</h2>
            <InternalCTA app="appraisly" context="Appraisly compares your roofing estimate to the insurance company's Xactimate scope line by line — surfacing every missing RFG code, wrong pitch adder, and under-measured item." />
          </div>
        </section>

        {/* Internal links */}
        <section className="bg-[#f5f0e8] px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "← All Xactimate Line Items", href: "/xactimate-line-item-search" },
                { label: "Roof Replacement Estimate Example", href: "/claims-library/estimates/roof-replacement-estimate-example" },
                { label: "Hail Damage Estimate Example", href: "/claims-library/estimates/hail-damage-estimate-example" },
                { label: "How to Document Hail Damage", href: "/claims-library/guides/how-to-document-hail-damage" },
                { label: "Roof Waste Calculator", href: "/tools/roof-waste-calculator" },
                { label: "Roof Pitch Calculator", href: "/tools/roof-pitch-calculator" },
                { label: "Hail Damage Scope Example", href: "/hail-damage-scope-example" },
                { label: "Roof Supplement Guide", href: "/roof-supplement-guide" },
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
