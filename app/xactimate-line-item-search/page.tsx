"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, ArrowRight, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle2, BookOpen, Zap, Shield, BarChart2
} from "lucide-react";
import {
  xactimateLineItems,
  xactimateCategories,
  tradeOptions,
  damageTypeOptions,
} from "@/data/xactimate-search-data";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  RFG: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  SID: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  DRY: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  PNT: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  FLR: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  WTR: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
};

const faqs = [
  {
    q: "What are Xactimate category codes?",
    a: "Xactimate organizes every line item under a 3-letter category code — RFG for Roofing, SID for Siding, DRY for Drywall, PNT for Painting, FLR for Flooring, WTR for Water Mitigation, and so on. Each code corresponds to a specific unit of work with a localized price. Insurance adjusters use these codes to build scope-of-loss estimates, and contractors use them to verify that all work items are included.",
  },
  {
    q: "How do I find roofing line items in Xactimate?",
    a: 'Roofing line items in Xactimate fall under the "RFG" category. Search for "RFG" in Xactimate\'s price list or use the search tool on this page. Common roofing items include RFG 240 (architectural shingles), RFG 180 (tear-off), RFG 358 (ice & water shield), RFG 270 (drip edge), RFG 226 (starter shingles), and RFG 310 (ridge vent).',
  },
  {
    q: "What items are most often missed on roof estimates?",
    a: "The most frequently missed roofing items are: starter shingles (RFG 226), drip edge (RFG 270), ice & water shield (RFG 358), synthetic underlayment upgrade from felt paper (RFG 356), pipe boot replacements (RFG 290), and steep slope pitch adders. These items can represent $1,000–$3,000+ in value on a typical residential roof replacement.",
  },
  {
    q: "How do I compare two Xactimate estimates faster?",
    a: "The fastest way is to export both estimates and compare line items side by side — but this is time-consuming manually. Appraisly automates this process by ingesting both estimates and highlighting every discrepancy, missing line item, and pricing difference. What takes hours manually takes minutes with Appraisly.",
  },
  {
    q: "What is the difference between a contractor estimate and an insurance estimate?",
    a: "An insurance estimate (typically in Xactimate) is built by an adjuster based on their scope of the loss. A contractor estimate is built by the company doing the work. Discrepancies arise from different measurements, omitted code-required items, different material grades, missing adders (pitch, story height), and matching provisions. The gap between the two estimates is what contractors and public adjusters supplement.",
  },
  {
    q: "What does O&P mean in Xactimate?",
    a: 'O&P stands for Overhead and Profit — the markup a general contractor is entitled to on an insurance claim for managing the project. Standard O&P is 10% overhead and 10% profit applied to the subtotal. Insurance companies sometimes dispute O&P, but it is a legitimate and standard line item on any claim involving a general contractor.',
  },
];

export default function XactimateLineItemSearch() {
  const [query, setQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("All");
  const [selectedDamage, setSelectedDamage] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>("RFG");

  const filtered = useMemo(() => {
    return xactimateLineItems.filter((item) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.includes(q)) ||
        item.trade.toLowerCase().includes(q);
      const matchesTrade = selectedTrade === "All" || item.trade === selectedTrade;
      const matchesDamage = selectedDamage === "All" || item.damageTypes.includes(selectedDamage.toLowerCase());
      return matchesQuery && matchesTrade && matchesDamage;
    });
  }, [query, selectedTrade, selectedDamage]);

  const hasFilters = query !== "" || selectedTrade !== "All" || selectedDamage !== "All";

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wide">Xactimate Line Item Reference</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-5 leading-tight max-w-4xl">
            Xactimate Line Item Search — Roofing, Siding, Drywall &amp; More
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">
            Search every major Xactimate category code, find the items insurance adjusters most often miss, and compare your scope against the carrier estimate — all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://appraislyai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm"
            >
              Compare Estimates with Appraisly <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#search" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Search Line Items
            </a>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-[#f5f0e8] border-b border-slate-200 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">On this page</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "Search Line Items", href: "#search" },
              { label: "Category Reference", href: "#categories" },
              { label: "Roofing Deep Dive", href: "#roofing" },
              { label: "Estimate Review", href: "#estimate-review" },
              { label: "FAQ", href: "#faq" },
              { label: "Related Resources", href: "#related" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-[#0f1e3c] hover:text-blue-600 transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section id="search" className="bg-white px-6 py-14 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-2">Search Xactimate Line Items</h2>
          <p className="text-slate-500 text-base mb-8">Search by code, description, trade, or damage type. Filter to find exactly what you need.</p>

          {/* Search bar + filters */}
          <div className="bg-[#f5f0e8] border border-slate-200 rounded-2xl p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Search by code or keyword</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. ridge cap, RFG 226, pipe boot..."
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0f1e3c]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Filter by trade</label>
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0f1e3c]"
                >
                  <option>All</option>
                  {tradeOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Filter by damage type</label>
                <select
                  value={selectedDamage}
                  onChange={(e) => setSelectedDamage(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0f1e3c]"
                >
                  <option>All</option>
                  {damageTypeOptions.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {hasFilters && (
            <div>
              <p className="text-sm text-slate-500 mb-4">{filtered.length} result{filtered.length !== 1 ? "s" : ""} found</p>
              {filtered.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0f1e3c] text-white">
                        <th className="text-left px-4 py-3 font-semibold">Code</th>
                        <th className="text-left px-4 py-3 font-semibold">Description</th>
                        <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Unit</th>
                        <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Range</th>
                        <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item, i) => {
                        const colors = categoryColors[item.category] || { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };
                        return (
                          <tr key={item.code + i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                            <td className="px-4 py-3">
                              <span className={`inline-block font-mono font-bold text-xs px-2 py-1 rounded-lg ${colors.bg} ${colors.text} border ${colors.border}`}>{item.code}</span>
                            </td>
                            <td className="px-4 py-3 text-[#0f1e3c] font-medium">{item.description}</td>
                            <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{item.unit}</td>
                            <td className="px-4 py-3 font-semibold text-teal-700 hidden md:table-cell whitespace-nowrap">{item.typicalRange}</td>
                            <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell max-w-xs">{item.notes}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 bg-[#f5f0e8] rounded-2xl border border-slate-200">
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No line items match your search.</p>
                  <p className="text-sm mt-1">Try a different code, keyword, or filter.</p>
                </div>
              )}
            </div>
          )}

          {!hasFilters && (
            <div className="text-center py-10 text-slate-400 bg-[#f5f0e8] rounded-2xl border border-slate-200">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-slate-600">Enter a search term or apply a filter to search {xactimateLineItems.length}+ line items.</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Reference */}
      <section id="categories" className="bg-[#f5f0e8] px-6 py-14 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-2">Xactimate Category Reference</h2>
          <p className="text-slate-500 text-base mb-10">Browse by trade. Click any category to expand commonly used codes, scope notes, and the items adjusters most often miss.</p>
          <div className="flex flex-col gap-3">
            {xactimateCategories.map((cat) => {
              const colors = categoryColors[cat.categoryCode] || { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };
              const isOpen = openCategory === cat.categoryCode;
              return (
                <div key={cat.categoryCode} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenCategory(isOpen ? null : cat.categoryCode)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-bold text-sm px-3 py-1 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>{cat.categoryCode}</span>
                      <div className="text-left">
                        <div className="font-bold text-[#0f1e3c] text-base">{cat.trade}</div>
                        <div className="text-slate-400 text-xs">{cat.commonItems.length} line items · {cat.damageTypes.join(", ")} damage</div>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-5">
                        {/* Line items */}
                        <div className="lg:col-span-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Common Line Items</h4>
                          <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                  <th className="text-left px-3 py-2 font-semibold text-slate-600">Code</th>
                                  <th className="text-left px-3 py-2 font-semibold text-slate-600">Description</th>
                                  <th className="text-left px-3 py-2 font-semibold text-slate-600 hidden md:table-cell">Range</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cat.commonItems.map((item, i) => (
                                  <tr key={item.code + i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                    <td className="px-3 py-2 font-mono font-bold text-xs text-teal-700">{item.code}</td>
                                    <td className="px-3 py-2 text-[#0f1e3c] text-xs">{item.description}</td>
                                    <td className="px-3 py-2 text-slate-500 text-xs hidden md:table-cell whitespace-nowrap">{item.typicalRange}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* Often missed + scope notes */}
                        <div className="flex flex-col gap-4">
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-red-400 mb-2">Often Missed</h4>
                            <div className="flex flex-col gap-1.5">
                              {cat.oftenMissed.map((m, i) => (
                                <div key={i} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                  <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                                  <span className="text-red-700 text-xs">{m}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-2">Scope Notes</h4>
                            <div className="flex flex-col gap-1.5">
                              {cat.scopeNotes.map((n, i) => (
                                <div key={i} className="flex items-start gap-2 bg-teal-50 border border-teal-100 rounded-lg px-3 py-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                                  <span className="text-teal-700 text-xs">{n}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roofing Deep Dive */}
      <section id="roofing" className="bg-white px-6 py-14 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide">RFG Category Deep Dive</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-4">Roofing Xactimate Line Items: The Complete Guide</h2>
          <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-3xl">
            Roofing is the most supplemented trade in property insurance claims. The gap between a typical adjuster estimate and a properly scoped roof replacement is often $2,000–$6,000 on a standard residential job — almost entirely from missing or under-priced line items.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-[#0f1e3c] mb-4">The 6 most missed roofing items</h3>
              <div className="flex flex-col gap-3">
                {[
                  { code: "RFG 226", name: "Starter shingles", why: "Required at all eaves and rakes. Frequently omitted entirely — worth $2.50–$4.50/LF on every eave." },
                  { code: "RFG 270", name: "Drip edge", why: "A code requirement in most jurisdictions. Measured on all eaves and rakes. Often completely absent from adjuster estimates." },
                  { code: "RFG 358", name: "Ice & water shield", why: "Local codes define coverage areas — at minimum, eaves and all valleys. Adjusters routinely under-measure or omit." },
                  { code: "RFG 356", name: "Synthetic underlayment", why: "Code upgrade from felt paper. When existing roof had #15 felt, synthetic is a required code upgrade." },
                  { code: "RFG 290", name: "Pipe boots", why: "Each penetration is a separate line item. Count from photos — a typical house has 3–6 penetrations." },
                  { code: "PITCH", name: "Steep slope adder", why: "Any roof over 6/12 gets a steep slope labor adder. Wrong pitch in the sketch = all labor items are under-priced." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 bg-[#f5f0e8] border border-slate-200 rounded-xl p-4">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#0f1e3c] text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">{item.code}</span>
                        <span className="font-semibold text-[#0f1e3c] text-sm">{item.name}</span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f1e3c] mb-4">Example hail &amp; wind roof scope checklist</h3>
              <div className="bg-[#f5f0e8] border border-slate-200 rounded-xl p-5 mb-4">
                <h4 className="font-semibold text-[#0f1e3c] text-sm mb-3">Primary scope items</h4>
                <div className="flex flex-col gap-2">
                  {["RFG 180 — Tear-off (verify layer count)", "RFG 188 — Haul debris", "RFG 356 — Synthetic underlayment", "RFG 358 — Ice & water shield (eaves + valleys)", "RFG 240 — Arch comp shingles (verify grade)", "RFG 226 — Starter shingles", "RFG 252 — Ridge cap", "RFG 270 — Drip edge (all eaves + rakes)"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                      <span className="font-mono text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#f5f0e8] border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-[#0f1e3c] text-sm mb-3">Secondary &amp; supplement items</h4>
                <div className="flex flex-col gap-2">
                  {["RFG 281 — Step flashing (all wall intersections)", "RFG 290 — Pipe boots (count each penetration)", "RFG 310 — Ridge vent", "PITCH ADDER — Verify correct pitch is in sketch", "STORY ADDER — Verify correct story count", "RFG 181 — Multi-layer adder if applicable"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-mono text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Link href="/claims-library/guides/how-to-document-hail-damage" className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:underline">
                  See full hail damage documentation guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-[#f5f0e8] border border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#0f1e3c] mb-3">Related roofing resources</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Roof Replacement Estimate Example", href: "/claims-library/estimates/roof-replacement-estimate-example" },
                { label: "Hail Damage Estimate Example", href: "/claims-library/estimates/hail-damage-estimate-example" },
                { label: "How to Document Hail Damage", href: "/claims-library/guides/how-to-document-hail-damage" },
                { label: "How to Document Roof Damage", href: "/claims-library/guides/how-to-document-roof-damage" },
                { label: "Xactimate Roofing Line Items Guide", href: "/claims-library/xactimate/xactimate-roofing-line-items" },
                { label: "Software for Roofers", href: "/software-for-roofers" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Review */}
      <section id="estimate-review" className="bg-[#0f1e3c] text-white px-6 py-14 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Why contractor and insurance estimates always differ</h2>
          <p className="text-slate-300 text-base leading-relaxed mb-10 max-w-3xl">
            The gap between what you scope and what the insurance company approves is almost never random. It comes from a small set of recurring patterns — and once you know them, you can find them on every claim.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { icon: AlertCircle, color: "#EF4444", title: "Missing code-required items", body: "Drip edge, ice & water shield, and synthetic underlayment are code requirements in most jurisdictions — not optional upgrades. Adjusters frequently omit them, expecting contractors not to notice." },
              { icon: BarChart2, color: "#F59E0B", title: "Under-priced codes", body: "Using RFG 220 (3-tab) codes when the roof has architectural shingles, or using the wrong pitch in the sketch, systematically under-prices every labor item in the estimate." },
              { icon: Shield, color: "#10B981", title: "Missing adders and multipliers", body: "Steep slope adders, story height adders, and multi-layer tear-off codes are applied automatically — but only if the correct measurements are entered. Wrong inputs = wrong outputs." },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}22` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-3 py-1 mb-3">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-blue-300 text-xs font-semibold uppercase tracking-wide">Appraisly</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Compare estimates automatically — line by line</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Appraisly ingests your estimate and the insurance company's Xactimate scope and surfaces every missing line item, pricing discrepancy, and under-measured quantity — in minutes, not hours. Built for roofers, public adjusters, and restoration contractors.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {["Automatic line-item comparison", "Missing item detection", "Pricing discrepancy flagging", "Supplement-ready output"].map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-teal-300">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <Link
                  href="https://appraislyai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Try Appraisly Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white px-6 py-14 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-2">Frequently asked questions</h2>
          <p className="text-slate-500 mb-8">Common questions about Xactimate line items, category codes, and estimate comparison.</p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-[#0f1e3c] text-sm pr-4">{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 border-t border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section id="related" className="bg-[#f5f0e8] px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#0f1e3c] mb-6">Related resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Claims Library", desc: "All estimate examples, Xactimate guides, and damage documentation resources.", href: "/claims-library", icon: BookOpen },
              { label: "Software for Roofers", desc: "LossStack tools purpose-built for roofing contractors working insurance claims.", href: "/software-for-roofers", icon: Shield },
              { label: "Software for Public Adjusters", desc: "Tools for public adjusters to document losses and find missing estimate items.", href: "/software-for-public-adjusters", icon: BarChart2 },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm hover:border-slate-300 transition-all group">
                <item.icon className="w-6 h-6 text-[#0f1e3c] mb-3" />
                <div className="font-bold text-[#0f1e3c] mb-1 group-hover:text-blue-600 transition-colors">{item.label}</div>
                <p className="text-slate-500 text-sm">{item.desc}</p>
                <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold mt-3">Read more <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "Roof Replacement Estimate Example", href: "/claims-library/estimates/roof-replacement-estimate-example" },
              { label: "How to Document Hail Damage", href: "/claims-library/guides/how-to-document-hail-damage" },
              { label: "Xactimate Roofing Line Items Guide", href: "/claims-library/xactimate/xactimate-roofing-line-items" },
              { label: "Roof Waste Calculator", href: "/tools/roof-waste-calculator" },
              { label: "Roof Pitch Calculator", href: "/tools/roof-pitch-calculator" },
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
