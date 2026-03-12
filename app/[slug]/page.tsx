import { notFound } from "next/navigation";
import { seoFeatures, industryTargets, generateProgrammaticPages } from "@/data/seo-features";
import { industries, getIndustry } from "@/data/industries";
import IndustryPageTemplate from "@/components/seo/IndustryPageTemplate";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InternalCTA from "@/components/seo/InternalCTA";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const industryParams = industries.map((ind) => ({ slug: ind.slug }));
  const programmaticParams = generateProgrammaticPages().map(({ featureSlug, industrySlug }) => ({
    slug: `${featureSlug}-for-${industrySlug}`,
  }));
  return [...industryParams, ...programmaticParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const industry = getIndustry(slug);
  if (industry) {
    return {
      title: industry.title,
      description: industry.metaDescription,
      alternates: { canonical: `https://lossstack.com/${slug}` },
      openGraph: { title: industry.title, description: industry.metaDescription, url: `https://lossstack.com/${slug}`, siteName: "LossStack", type: "website" },
      twitter: { card: "summary_large_image", title: industry.title, description: industry.metaDescription },
    };
  }

  const match = parseProgrammaticSlug(slug);
  if (match) {
    const { feat, ind } = match;
    const appName = feat.app === "imagelablr" ? "ImageLablr" : feat.app === "restorecam" ? "RestoreCam" : "Appraisly";
    const title = `${feat.featureName} for ${ind.industryPlural} — ${appName} | LossStack`;
    const description = `${feat.featureName} software built for ${ind.industryPlural.toLowerCase()}. ${feat.description} Part of the LossStack claims workflow suite.`;
    return {
      title,
      description,
      alternates: { canonical: `https://lossstack.com/${slug}` },
      openGraph: { title, description, url: `https://lossstack.com/${slug}`, siteName: "LossStack", type: "website" },
      twitter: { card: "summary_large_image", title, description },
    };
  }

  return {};
}

function parseProgrammaticSlug(slug: string) {
  for (const feat of seoFeatures) {
    for (const ind of industryTargets) {
      if (slug === `${feat.featureSlug}-for-${ind.industrySlug}`) {
        return { feat, ind };
      }
    }
  }
  return null;
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Industry page
  const industry = getIndustry(slug);
  if (industry) {
    return <IndustryPageTemplate industry={industry} />;
  }

  // Programmatic SEO page
  const match = parseProgrammaticSlug(slug);
  if (!match) notFound();

  const { feat, ind } = match;
  const appName = feat.app === "imagelablr" ? "ImageLablr" : feat.app === "restorecam" ? "RestoreCam" : "Appraisly";
  const pageTitle = `${feat.featureName} for ${ind.industryPlural}`;

  const benefits = [
    `Save hours per job on ${feat.featureName.toLowerCase()} tasks`,
    `Consistent, standardized workflow across your entire team`,
    `Professional outputs that get claims approved faster`,
    `Works on iOS, Android, and desktop`,
    `Purpose-built for ${ind.industryPlural.toLowerCase()} — not generic software`,
    `Integrates with the full LossStack claims workflow suite`,
  ];

  const breadcrumbItems = [
    { name: "LossStack", url: "https://lossstack.com" },
    { name: feat.featureName, url: `https://lossstack.com/${slug}` },
    { name: ind.industryPlural, url: `https://lossstack.com/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: pageTitle,
            description: feat.description,
            url: `https://lossstack.com/${slug}`,
            isPartOf: { "@type": "WebSite", name: "LossStack", url: "https://lossstack.com" },
          }),
        }}
      />
      <main>
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: feat.featureName }, { name: ind.industryPlural }]} />
            <div className="mt-6 mb-3">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">{appName}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-5 leading-tight">{pageTitle}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">{feat.description}</p>
            <Link
              href={feat.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm"
            >
              Try {appName} Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="bg-[#f5f0e8] px-6 py-14 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-4">
              Why {ind.industryPlural.toLowerCase()} need {feat.featureName.toLowerCase()} software
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-3xl">
              {ind.industryPlural} work in one of the most documentation-intensive industries in the world. Every claim, every job, every supplement requires organized evidence. {feat.featureName} software built specifically for {ind.industryPlural.toLowerCase()} eliminates the manual work and standardizes your workflow across every job.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-slate-200 p-4">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#0f1e3c] mb-2">Get started with {appName}</h2>
            <InternalCTA app={feat.app} context={`${feat.featureName} software purpose-built for ${ind.industryPlural.toLowerCase()}. ${feat.description}`} />
          </div>
        </section>

        <section className="bg-[#f5f0e8] px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-[#0f1e3c] mb-4">Related resources</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Claims Library", href: "/claims-library" },
                { label: "Software for Roofers", href: "/software-for-roofers" },
                { label: "Software for Adjusters", href: "/software-for-insurance-adjusters" },
                { label: "How to Document Hail Damage", href: "/claims-library/guides/how-to-document-hail-damage" },
                { label: "Xactimate Roofing Line Items", href: "/claims-library/xactimate/xactimate-roofing-line-items" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
