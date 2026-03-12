import { notFound } from "next/navigation";
import { damageGuides, getDamageGuide } from "@/data/damage-guides";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Camera } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return damageGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getDamageGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: `https://lossstack.com/claims-library/guides/${slug}` },
    openGraph: { title: guide.title, description: guide.metaDescription, url: `https://lossstack.com/claims-library/guides/${slug}`, siteName: "LossStack", type: "article" },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.metaDescription },
  };
}

export default async function DamageGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getDamageGuide(slug);
  if (!guide) notFound();

  const breadcrumbItems = [
    { name: "LossStack", url: "https://lossstack.com" },
    { name: "Claims Library", url: "https://lossstack.com/claims-library" },
    { name: "Documentation Guides", url: "https://lossstack.com/claims-library#guides" },
    { name: guide.damageType, url: `https://lossstack.com/claims-library/guides/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: guide.heroHeading,
        description: guide.metaDescription,
        url: `https://lossstack.com/claims-library/guides/${slug}`,
        publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" },
        step: guide.steps.map((s) => ({ "@type": "HowToStep", position: s.step, name: s.heading, text: s.body })),
      })}} />
      <main>
        {/* Hero */}
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Claims Library", href: "/claims-library" }, { name: "Guides" }, { name: guide.damageType }]} />
            <div className="mt-6 mb-3">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">Documentation Guide</span>
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

        {/* Steps */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-8">The {guide.damageType.toLowerCase()} documentation process — step by step</h2>
            <div className="flex flex-col gap-6">
              {guide.steps.map((step) => (
                <div key={step.step} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#0f1e3c] text-white font-bold text-sm flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#0f1e3c] mb-2">{step.heading}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{step.body}</p>
                    {step.tip && (
                      <div className="bg-teal-50 border border-teal-100 rounded-lg px-4 py-3">
                        <span className="text-teal-700 text-xs font-semibold uppercase tracking-wide">Pro Tip: </span>
                        <span className="text-teal-700 text-sm">{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Checklist */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-6 h-6 text-[#0f1e3c]" />
              <h2 className="text-2xl font-bold text-[#0f1e3c]">{guide.damageType} photo checklist</h2>
            </div>
            <p className="text-slate-500 text-sm mb-6">Use this checklist on every job to ensure your photo submission is complete before leaving the site.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guide.photoChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#f5f0e8] rounded-xl border border-slate-200 p-4">
                  <div className="shrink-0 w-5 h-5 rounded border-2 border-slate-400 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="bg-[#f5f0e8] px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-6">Common documentation mistakes to avoid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guide.commonMistakes.map((m, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-red-100 p-4">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0f1e3c] mb-2">Tools that make this process faster</h2>
            <InternalCTA app={guide.primaryApp} />
            <InternalCTA app={guide.secondaryApp} />
          </div>
        </section>

        {/* Related */}
        <section className="bg-[#f5f0e8] px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/claims-library" className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">← Claims Library</Link>
              <Link href="/claims-library/estimates/hail-damage-estimate-example" className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Hail Damage Estimate Example</Link>
              <Link href="/claims-library/xactimate/xactimate-roofing-line-items" className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Xactimate Roofing Line Items</Link>
              <Link href="/software-for-roofers" className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Software for Roofers</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
