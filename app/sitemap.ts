import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { estimateExamples } from "@/data/estimates";
import { xactimateGuides } from "@/data/xactimate-guides";
import { damageGuides } from "@/data/damage-guides";
import { seoFeatures, industryTargets } from "@/data/seo-features";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lossstack.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/claims-library`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools/roof-pitch-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/roof-waste-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/insurance-estimate-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/water-mitigation-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${base}/${ind.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const estimatePages: MetadataRoute.Sitemap = estimateExamples.map((e) => ({
    url: `${base}/claims-library/estimates/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const xactimatePages: MetadataRoute.Sitemap = xactimateGuides.map((g) => ({
    url: `${base}/claims-library/xactimate/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = damageGuides.map((g) => ({
    url: `${base}/claims-library/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const programmaticPages: MetadataRoute.Sitemap = seoFeatures.flatMap((feat) =>
    industryTargets.map((ind) => ({
      url: `${base}/${feat.featureSlug}-for-${ind.industrySlug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [
    ...staticPages,
    ...industryPages,
    ...estimatePages,
    ...xactimatePages,
    ...guidePages,
    ...programmaticPages,
  ];
}
