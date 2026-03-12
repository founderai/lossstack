import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import InternalCTA from "./InternalCTA";
import Breadcrumb from "./Breadcrumb";
import BreadcrumbSchema from "./BreadcrumbSchema";
import type { Industry } from "@/data/industries";

const appMeta = {
  imagelablr: {
    name: "ImageLablr",
    color: "#00c9c9",
    tagline: "AI photo labeling & organization",
    url: "https://imagelablr.com",
    how: "ImageLablr automatically labels, sorts, and packages your job photos into organized, adjuster-ready submissions — eliminating hours of manual photo work per job.",
  },
  restorecam: {
    name: "RestoreCam",
    color: "#0B4DA2",
    tagline: "Field documentation & reporting",
    url: "https://restorecam.com",
    how: "RestoreCam captures GPS-tagged photos, voice notes, and room-by-room condition data in the field, then generates professional documentation packages in minutes.",
  },
  appraisly: {
    name: "Appraisly",
    color: "#2563eb",
    tagline: "Estimate comparison & supplements",
    url: "https://appraislyai.com",
    how: "Appraisly compares your scope to the insurance company's Xactimate estimate line by line — surfacing missing items and discrepancies so you can supplement with confidence.",
  },
};

export default function IndustryPageTemplate({ industry }: { industry: Industry }) {
  const breadcrumbItems = [
    { name: "LossStack", url: "https://lossstack.com" },
    { name: "Industries", url: "https://lossstack.com/#industries" },
    { name: industry.plural, url: `https://lossstack.com/${industry.slug}` },
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
            name: industry.title,
            description: industry.metaDescription,
            url: `https://lossstack.com/${industry.slug}`,
            isPartOf: { "@type": "WebSite", name: "LossStack", url: "https://lossstack.com" },
          }),
        }}
      />

      <main>
        {/* Hero */}
        <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb
              items={[
                { name: "LossStack", href: "/" },
                { name: "Industries" },
                { name: industry.plural },
              ]}
            />
            <h1 className="text-3xl lg:text-5xl font-bold mt-6 mb-5 leading-tight">
              {industry.heroHeading}
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl leading-relaxed max-w-3xl mb-8">
              {industry.heroSubheading}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm"
              >
                See Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#apps"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                Explore Apps
              </Link>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="bg-[#f5f0e8] px-6 py-14 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-10">
              The challenges {industry.plural.toLowerCase()} face on every job
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industry.problems.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <AlertCircle className="w-6 h-6 text-red-400 mb-3" />
                  <h3 className="font-bold text-[#0f1e3c] mb-2 text-base">{p.heading}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How LossStack Solves It */}
        <section className="bg-white px-6 py-14 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-4">
              How LossStack solves it for {industry.plural.toLowerCase()}
            </h2>
            <p className="text-slate-500 text-base mb-10">
              LossStack gives {industry.plural.toLowerCase()} three purpose-built tools that work independently — and stack together for a complete claims workflow.
            </p>
            <div className="flex flex-col gap-6">
              {industry.apps.map((appKey) => {
                const app = appMeta[appKey];
                return (
                  <div key={appKey} className="rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${app.color}18` }}>
                      <span className="font-black text-xs" style={{ color: app.color }}>
                        {app.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[#0f1e3c] text-base mb-1">{app.name}</div>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: app.color }}>{app.tagline}</div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{app.how}</p>
                      <Link
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                        style={{ color: app.color }}
                      >
                        Try {app.name} Free <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="bg-[#f5f0e8] px-6 py-14 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f1e3c] mb-8">
              What {industry.plural.toLowerCase()} get with LossStack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "AI-powered photo labeling that organizes hundreds of job photos automatically",
                "GPS-tagged field documentation captured from any mobile device",
                "Line-by-line estimate comparison against insurance company Xactimate scopes",
                "Professional documentation packages ready in minutes, not hours",
                "Consistent, standardized documentation across your entire team",
                "Built-in supplement identification — never miss a line item again",
                "Works on iOS, Android, and desktop — no new hardware required",
                "All three apps designed to work together as one seamless workflow",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-slate-200 p-4">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0f1e3c] px-6 py-14 lg:py-20 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to upgrade your claims workflow?
            </h2>
            <p className="text-slate-300 mb-8">
              Join {industry.plural.toLowerCase()} using LossStack to document faster, get paid more, and close claims without the paperwork headaches.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
              >
                See Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </section>

        {/* Internal links to guides */}
        <section className="bg-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-[#0f1e3c] mb-5">Related resources for {industry.plural.toLowerCase()}</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "How to Organize Claim Photos", href: "/claims-library/guides/how-to-organize-claim-photos" },
                { label: "How to Document Hail Damage", href: "/claims-library/guides/how-to-document-hail-damage" },
                { label: "How to Document Water Damage", href: "/claims-library/guides/how-to-document-water-damage" },
                { label: "Roof Replacement Estimate Example", href: "/claims-library/estimates/roof-replacement-estimate-example" },
                { label: "Xactimate Roofing Line Items", href: "/claims-library/xactimate/xactimate-roofing-line-items" },
                { label: "Claims Library →", href: "/claims-library" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#0f1e3c] bg-[#f5f0e8] border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
