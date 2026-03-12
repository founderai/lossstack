export interface SeoFeature {
  featureSlug: string;
  featureName: string;
  app: "imagelablr" | "restorecam" | "appraisly";
  appUrl: string;
  appColor: string;
  description: string;
}

export interface IndustryTarget {
  industrySlug: string;
  industryName: string;
  industryPlural: string;
}

export const seoFeatures: SeoFeature[] = [
  {
    featureSlug: "photo-labeling",
    featureName: "Photo Labeling",
    app: "imagelablr",
    appUrl: "https://imagelablr.com",
    appColor: "#00c9c9",
    description: "AI-powered photo labeling that automatically organizes and tags job site photos by location, damage type, and category.",
  },
  {
    featureSlug: "damage-documentation",
    featureName: "Damage Documentation",
    app: "restorecam",
    appUrl: "https://restorecam.com",
    appColor: "#0B4DA2",
    description: "Field documentation software that captures GPS-tagged photos, voice notes, and room-by-room condition reports.",
  },
  {
    featureSlug: "estimate-comparison",
    featureName: "Estimate Comparison",
    app: "appraisly",
    appUrl: "https://appraislyai.com",
    appColor: "#2563eb",
    description: "AI-powered estimate comparison that identifies missing line items and scope gaps between your estimate and the insurance company's Xactimate.",
  },
  {
    featureSlug: "insurance-claim-software",
    featureName: "Insurance Claim Software",
    app: "restorecam",
    appUrl: "https://restorecam.com",
    appColor: "#0B4DA2",
    description: "End-to-end insurance claim documentation software that turns field data into professional reports in minutes.",
  },
  {
    featureSlug: "ai-photo-organization",
    featureName: "AI Photo Organization",
    app: "imagelablr",
    appUrl: "https://imagelablr.com",
    appColor: "#00c9c9",
    description: "AI that automatically sorts, labels, and organizes hundreds of job site photos into structured, adjuster-ready packages.",
  },
];

export const industryTargets: IndustryTarget[] = [
  { industrySlug: "roofers", industryName: "Roofer", industryPlural: "Roofers" },
  { industrySlug: "contractors", industryName: "Contractor", industryPlural: "Contractors" },
  { industrySlug: "adjusters", industryName: "Insurance Adjuster", industryPlural: "Insurance Adjusters" },
  { industrySlug: "restoration-companies", industryName: "Restoration Company", industryPlural: "Restoration Companies" },
  { industrySlug: "public-adjusters", industryName: "Public Adjuster", industryPlural: "Public Adjusters" },
  { industrySlug: "mitigation-companies", industryName: "Mitigation Company", industryPlural: "Mitigation Companies" },
];

export function generateProgrammaticPages(): { featureSlug: string; industrySlug: string }[] {
  const pages: { featureSlug: string; industrySlug: string }[] = [];
  for (const feature of seoFeatures) {
    for (const industry of industryTargets) {
      pages.push({ featureSlug: feature.featureSlug, industrySlug: industry.industrySlug });
    }
  }
  return pages;
}
