import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Wrench, BarChart2 } from "lucide-react";
import type { Metadata } from "next";
import { estimateExamples } from "@/data/estimates";
import { xactimateGuides } from "@/data/xactimate-guides";
import { damageGuides } from "@/data/damage-guides";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Claims Resource Library — Insurance, Roofing & Restoration Guides | LossStack",
  description: "Free guides, estimate examples, Xactimate line item breakdowns, and damage documentation checklists for insurance claims professionals. Built by LossStack.",
  alternates: { canonical: "https://lossstack.com/claims-library" },
  openGraph: {
    title: "Claims Resource Library | LossStack",
    description: "Free guides for insurance claims professionals — estimate examples, Xactimate guides, and damage documentation checklists.",
    url: "https://lossstack.com/claims-library",
    siteName: "LossStack",
    type: "website",
  },
};

const sections = [
  {
    icon: BarChart2,
    label: "Estimate Examples",
    color: "#2563eb",
    bg: "bg-blue-50",
    description: "Real estimate breakdowns with line items, typical ranges, and comparison tips.",
    items: estimateExamples.map((e) => ({ title: e.heroHeading, href: `/claims-library/estimates/${e.slug}` })),
  },
  {
    icon: FileText,
    label: "Xactimate Line Item Guides",
    color: "#0D9488",
    bg: "bg-teal-50",
    description: "Code-by-code breakdowns of Xactimate categories with supplement tips.",
    items: xactimateGuides.map((g) => ({ title: g.heroHeading, href: `/claims-library/xactimate/${g.slug}` })),
  },
  {
    icon: BookOpen,
    label: "Damage Documentation Guides",
    color: "#D97706",
    bg: "bg-amber-50",
    description: "Step-by-step photo checklists and documentation processes for every damage type.",
    items: damageGuides.map((g) => ({ title: g.heroHeading, href: `/claims-library/guides/${g.slug}` })),
  },
  {
    icon: Wrench,
    label: "Free Calculators",
    color: "#7C3AED",
    bg: "bg-violet-50",
    description: "Free tools for roofers and adjusters — pitch, waste, and estimate calculators.",
    items: [
      { title: "Roof Pitch Calculator", href: "/tools/roof-pitch-calculator" },
      { title: "Roof Waste Calculator", href: "/tools/roof-waste-calculator" },
      { title: "Insurance Estimate Calculator", href: "/tools/insurance-estimate-calculator" },
      { title: "Water Mitigation Equipment Calculator", href: "/tools/water-mitigation-calculator" },
    ],
  },
];

export default function ClaimsLibraryPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "LossStack", url: "https://lossstack.com" },
        { name: "Claims Library", url: "https://lossstack.com/claims-library" },
      ]} />
      <main>
        {/* Hero */}
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Claims Library</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-5 leading-tight">
              The free resource library for insurance claims professionals
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
              Estimate examples, Xactimate line item guides, damage documentation checklists, and free calculators — built for roofers, adjusters, restoration companies, and contractors.
            </p>
          </div>
        </section>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.label} className="px-6 py-14 lg:py-16 even:bg-[#f5f0e8] odd:bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.bg}`}>
                  <section.icon className="w-5 h-5" style={{ color: section.color }} />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-[#0f1e3c]">{section.label}</h2>
              </div>
              <p className="text-slate-500 text-sm mb-7">{section.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-slate-300 hover:shadow-sm transition-all group"
                  >
                    <span className="text-[#0f1e3c] font-medium text-sm group-hover:text-blue-600 transition-colors">{item.title}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="bg-[#0f1e3c] px-6 py-14 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Put the knowledge to work
            </h2>
            <p className="text-slate-300 mb-8">
              LossStack gives claims professionals the tools to document faster, compare estimates, and get paid in full — on every job.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors">
                See Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                Explore Apps
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
