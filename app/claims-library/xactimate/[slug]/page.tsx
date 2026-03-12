import { notFound } from "next/navigation";
import { xactimateGuides, getXactimateGuide } from "@/data/xactimate-guides";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return xactimateGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getXactimateGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: `https://lossstack.com/claims-library/xactimate/${slug}` },
    openGraph: { title: guide.title, description: guide.metaDescription, url: `https://lossstack.com/claims-library/xactimate/${slug}`, siteName: "LossStack", type: "article" },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.metaDescription },
  };
}

export default async function XactimateGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getXactimateGuide(slug);
  if (!guide) notFound();

  const breadcrumbItems = [
    { name: "LossStack", url: "https://lossstack.com" },
    { name: "Claims Library", url: "https://lossstack.com/claims-library" },
    { name: "Xactimate Guides", url: "https://lossstack.com/claims-library#xactimate" },
    { name: guide.trade, url: `https://lossstack.com/claims-library/xactimate/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: guide.heroHeading, description: guide.metaDescription, url: `https://lossstack.com/claims-library/xactimate/${slug}`, publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" } }) }} />
      <main>
        {/* Hero */}
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Claims Library", href: "/claims-library" }, { name: "Xactimate Guides" }, { name: guide.trade }]} />
            <div className="mt-6 mb-3">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">Xactimate Guide</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{guide.heroHeading}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{guide.heroSubheading}</p>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-slate-600 text-base leading-relaxed">{guide.intro}</p>
          </div>
        </section>

        {/* Sections with line items */}
        {guide.sections.map((section, si) => (
          <section key={si} className={`px-6 py-12 ${si % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-[#0f1e3c] mb-3">{section.heading}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{section.body}</p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0f1e3c] text-white">
                      <th className="text-left px-4 py-3 font-semibold">Code</th>
                      <th className="text-left px-4 py-3 font-semibold">Description</th>
                      <th className="text-left px-4 py-3 font-semibold">Unit</th>
                      <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.lineItems.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-mono font-semibold text-teal-700 text-xs">{item.code}</td>
                        <td className="px-4 py-3 text-[#0f1e3c] font-medium">{item.description}</td>
                        <td className="px-4 py-3 text-slate-500">{item.unit}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs hidden md:table-cell">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}

        {/* Common Misses */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-6">Most commonly missed {guide.trade.toLowerCase()} line items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guide.commonMisses.map((m, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-red-100 p-4">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supplement Tips */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-6">Supplement tips for {guide.trade.toLowerCase()}</h2>
            <div className="flex flex-col gap-3">
              {guide.supplementTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#f5f0e8] rounded-xl border border-slate-200 p-4">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-2">Compare estimates line by line with Appraisly</h2>
            <InternalCTA app="appraisly" context="Appraisly identifies missing Xactimate line items and scope discrepancies automatically — so you can supplement with confidence and get paid in full." />
          </div>
        </section>

        {/* Related */}
        <section className="bg-white px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/claims-library" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">← Claims Library</Link>
              <Link href="/claims-library/estimates/roof-replacement-estimate-example" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Roof Replacement Estimate Example</Link>
              <Link href="/software-for-roofers" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Software for Roofers</Link>
              <Link href="/software-for-public-adjusters" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Software for Public Adjusters</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
