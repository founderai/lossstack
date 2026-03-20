export interface PricingTier {
  name: string;
  price: number | "Custom";
  annualPrice?: number | "Custom";
  description: string;
}

export interface AppPricing {
  appId: string;
  pricingUrl: string;
  annualDiscount?: string;
  tiers: PricingTier[];
}

// ─── Unified LossStack Plans ────────────────────────────────────────────────

export type FeatureLevel = "limited" | "standard" | "full";

export interface UnifiedPlan {
  id: "free" | "core" | "pro" | "firm";
  name: string;
  monthlyPrice: number | null;      // null = free
  reportPrice: number | null;       // per-report charge when credits exhausted
  creditsIncluded: number;          // monthly credits included
  storageIncluded: boolean;
  featureLevel: FeatureLevel;
  popular?: boolean;
  description: string;
  features: { text: string; included: boolean }[];
  // Stripe price ID — fill in after creating products in Stripe dashboard
  stripePriceId?: string;
}

export const unifiedPlans: UnifiedPlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: null,
    reportPrice: null,
    creditsIncluded: 2,
    storageIncluded: false,
    featureLevel: "limited",
    description: "Try the platform. No credit card required.",
    features: [
      { text: "2 reports/month", included: true },
      { text: "Access to all 3 apps", included: true },
      { text: "Basic photo labeling", included: true },
      { text: "Basic field documentation", included: true },
      { text: "PDF exports", included: false },
      { text: "Bulk processing", included: false },
      { text: "Storage & file persistence", included: false },
      { text: "Advanced AI features", included: false },
      { text: "Team seats", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    id: "core",
    name: "Core",
    monthlyPrice: 99,
    reportPrice: 18,
    creditsIncluded: 8,
    storageIncluded: false,
    featureLevel: "standard",
    description: "For solo adjusters and independent pros.",
    features: [
      { text: "8 reports/month included", included: true },
      { text: "$18/report after credits", included: true },
      { text: "Access to all 3 apps", included: true },
      { text: "PDF exports", included: true },
      { text: "Photo labeling & organization", included: true },
      { text: "Field documentation tools", included: true },
      { text: "Bulk processing", included: false },
      { text: "Storage add-on available (+$49/mo)", included: false },
      { text: "Advanced AI features", included: false },
      { text: "Team seats", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 249,
    reportPrice: 14,
    creditsIncluded: 25,
    storageIncluded: true,
    featureLevel: "full",
    popular: true,
    description: "For growing teams and multi-app workflows.",
    features: [
      { text: "25 reports/month included", included: true },
      { text: "$14/report after credits", included: true },
      { text: "Access to all 3 apps", included: true },
      { text: "PDF exports", included: true },
      { text: "Bulk processing", included: true },
      { text: "Storage included", included: true },
      { text: "Advanced AI features", included: true },
      { text: "Up to 5 team seats", included: true },
      { text: "Priority support", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    id: "firm",
    name: "Firm",
    monthlyPrice: 499,
    reportPrice: 10,
    creditsIncluded: 60,
    storageIncluded: true,
    featureLevel: "full",
    description: "For large firms, CAT teams, and high-volume operations.",
    features: [
      { text: "60 reports/month included", included: true },
      { text: "$10/report after credits", included: true },
      { text: "Access to all 3 apps", included: true },
      { text: "PDF exports", included: true },
      { text: "Bulk processing", included: true },
      { text: "Storage included", included: true },
      { text: "Advanced AI features", included: true },
      { text: "Unlimited team seats", included: true },
      { text: "Priority support", included: true },
      { text: "API access", included: true },
    ],
  },
];

// Stripe Price IDs for unified plans — update after creating in Stripe dashboard
export const unifiedStripePriceIds: Record<string, string> = {
  core:    "", // price_xxx
  pro:     "", // price_xxx
  firm:    "", // price_xxx
  storage: "", // price_xxx  ($49/mo storage add-on)
};

// Real pricing from each app's website — edit here to keep in sync
export const appPricingData: AppPricing[] = [
  {
    appId: "appraisly",
    pricingUrl: "https://appraislyai.com/pricing",
    annualDiscount: "15% off annual billing",
    tiers: [
      { name: "Solo",    price: 99,    description: "8 credits/mo · $18/cr overage" },
      { name: "Pro",     price: 199,   description: "18 credits/mo · $15/cr overage · CAT Packs" },
      { name: "Elite",   price: 349,   description: "35 credits/mo · $12/cr overage · CAT Packs" },
    ],
  },
  {
    appId: "imagelablr",
    pricingUrl: "https://www.imagelablr.com/pricing",
    tiers: [
      { name: "Solo",       price: 99,      description: "3 seats · 1,000 AI analyses/mo · 50 GB storage" },
      { name: "Pro",        price: 199,     description: "5 seats · 5,000 AI analyses/mo · 200 GB storage" },
      { name: "Agency",     price: 349,     description: "10 seats · 15,000 AI analyses/mo · unlimited storage" },
    ],
  },
  {
    appId: "restorecam",
    pricingUrl: "https://www.restorecam.com",
    tiers: [
      { name: "Starter",    price: 199, description: "Up to 250 jobs/yr · GPS tracking · AI voice notes · report builder" },
      { name: "Pro",        price: 399, description: "Up to 450 jobs/yr · white-label portal · 10 team members" },
      { name: "Enterprise", price: 599, description: "Up to 650 jobs/yr · unlimited team · API access · dedicated onboarding" },
    ],
  },
];

// Stripe Price IDs — keep in sync with Stripe dashboard
export const stripePriceIds: Record<string, Record<string, string>> = {
  appraisly: {
    Solo:  "price_1T7M1wGhSLQ9s5VgMZDVvVtN",
    Pro:   "price_1T7M1gGhSLQ9s5VgjjXXXdmf",
    Elite: "price_1T7M1OGhSLQ9s5Vgcv6DVhjg",
  },
  imagelablr: {
    Solo:   "price_1TAMs9GhSLQ9s5VgFCTCSDFW",
    Pro:    "price_1TAMsaGhSLQ9s5Vg5Zo7OuEm",
    Agency: "price_1TAMt3GhSLQ9s5Vg8tJYRUNz",
  },
  restorecam: {
    Starter:    "price_1TAMFrGhSLQ9s5VgCTCaFvnm",
    Pro:        "price_1TAMGfGhSLQ9s5Vggw4E8td7",
    Enterprise: "price_1TAMHDGhSLQ9s5VgDBnoLeoO",
  },
};

// Bundle coupon IDs from Stripe dashboard (applied server-side, no user-facing code)
export const stripeCouponIds = {
  twoApp:   "s3u9k72f",
  threeApp: "vIYuKJ8G",
};

// Entry-level (lowest paid) price per app — used for bundle calculator baseline
export const pricingConfig = {
  // Entry-level monthly price per app (lowest paid tier)
  appraislyMonthly: 49.99,
  imagelablrMonthly: 99,
  restorecamMonthly: 199,

  // Annual price (15% off for Appraisly; others same as monthly until confirmed)
  appraislyAnnual: 42,
  imagelablrAnnual: 99,
  restorecamAnnual: 199,

  // Bundle discount percentages (applied on top of chosen tier)
  twoAppDiscountPercent: 15,
  threeAppDiscountPercent: 25,

  currency: "$",

  monthlyLabel: "starting at / month",
  annualLabel: "starting at / month",

  twoAppSavingsMessage: "Save {percent}% when you stack any 2 apps.",
  threeAppSavingsMessage: "Save {percent}% with the full LossStack suite.",
};

export type BillingPeriod = "monthly" | "annual";

export function getAppPrice(appId: string, billing: BillingPeriod): number {
  const key = `${appId}${billing === "monthly" ? "Monthly" : "Annual"}` as keyof typeof pricingConfig;
  return (pricingConfig[key] as number) ?? 0;
}

export function calculateBundle(
  selectedApps: string[],
  billing: BillingPeriod
): {
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  savings: number;
} {
  const subtotal = selectedApps.reduce(
    (sum, appId) => sum + getAppPrice(appId, billing),
    0
  );

  let discountPercent = 0;
  if (selectedApps.length === 2) discountPercent = pricingConfig.twoAppDiscountPercent;
  if (selectedApps.length >= 3) discountPercent = pricingConfig.threeAppDiscountPercent;

  const discountAmount = Math.round(subtotal * (discountPercent / 100) * 100) / 100;
  const total = Math.round((subtotal - discountAmount) * 100) / 100;

  return {
    subtotal,
    discountPercent,
    discountAmount,
    total,
    savings: discountAmount,
  };
}
