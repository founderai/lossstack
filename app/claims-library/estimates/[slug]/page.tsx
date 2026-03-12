import { notFound } from "next/navigation";
import { estimateExamples, getEstimateExample } from "@/data/estimates";
import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return estimateExamples.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const estimate = getEstimateExample(slug);
  if (!estimate) return {};
  return {
    title: estimate.title,
    description: estimate.metaDescription,
    alternates: { canonical: `https://lossstack.com/claims-library/estimates/${slug}` },
    openGraph: { title: estimate.title, description: estimate.metaDescription, url: `https://lossstack.com/claims-library/estimates/${slug}`, siteName: "LossStack", type: "article" },
    twitter: { card: "summary_large_image", title: estimate.title, description: estimate.metaDescription },
  };
}

export default async function EstimateExamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const estimate = getEstimateExample(slug);
  if (!estimate) notFound();

  const breadcrumbItems = [
    { name: "LossStack", url: "https://lossstack.com" },
    { name: "Claims Library", url: "https://lossstack.com/claims-library" },
    { name: "Estimate Examples", url: "https://lossstack.com/claims-library#estimates" },
    { name: estimate.damageType, url: `https://lossstack.com/claims-library/estimates/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: estimate.heroHeading, description: estimate.metaDescription, url: `https://lossstack.com/claims-library/estimates/${slug}`, publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" } }) }} />
      <main>
        {/* Hero */}
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Claims Library", href: "/claims-library" }, { name: "Estimates" }, { name: estimate.damageType }]} />
            <h1 className="text-3xl lg:text-4xl font-bold mt-6 mb-4 leading-tight">{estimate.heroHeading}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{estimate.heroSubheading}</p>
          </div>
        </section>

        {/* Overview */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed">{estimate.overview}</p>
          </div>
        </section>

        {/* Typical Scope */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">What a complete {estimate.damageType.toLowerCase()} estimate includes</h2>
            <div className="flex flex-col gap-3">
              {estimate.typicalScope.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0f1e3c] text-sm mb-1">{item.item}</div>
                      <div className="text-slate-500 text-sm">{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Line Items Table */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Line item breakdown with typical ranges</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Category</th>
                    <th className="text-left px-4 py-3 font-semibold">Line Item</th>
                    <th className="text-left px-4 py-3 font-semibold">Unit</th>
                    <th className="text-left px-4 py-3 font-semibold">Typical Range</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.lineItems.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-medium text-[#0f1e3c]">{item.category}</td>
                      <td className="px-4 py-3 text-slate-700">{item.lineItem}</td>
                      <td className="px-4 py-3 text-slate-500">{item.unit}</td>
                      <td className="px-4 py-3 font-semibold text-teal-700">{item.typicalRange}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell text-xs">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">* Ranges based on national Xactimate averages. Actual pricing varies by market, labor rates, and material costs.</p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Common items insurance companies leave out</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {estimate.commonMistakes.map((m, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-red-100 p-4">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Tips */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">How to compare your estimate to the insurance company's scope</h2>
            <div className="flex flex-col gap-3">
              {estimate.comparisonTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#f5f0e8] rounded-xl border border-slate-200 p-4">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#0f1e3c] text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-slate-700 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-2">Compare estimates automatically with Appraisly</h2>
            <InternalCTA app="appraisly" context="Appraisly compares your estimate to the insurance company's Xactimate scope line by line — finding missing items and discrepancies so you can supplement with confidence." />
          </div>
        </section>

        {/* Related links */}
        <section className="bg-white px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/claims-library" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">← Claims Library</Link>
              <Link href="/claims-library/xactimate/xactimate-roofing-line-items" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Xactimate Roofing Line Items</Link>
              <Link href="/claims-library/guides/how-to-document-hail-damage" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">How to Document Hail Damage</Link>
              <Link href="/software-for-roofers" className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Software for Roofers</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
