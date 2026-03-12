export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is LossStack?",
    answer:
      "LossStack is a software suite designed for insurance claims, appraisal, and restoration professionals. It bundles together three specialized workflow tools — Appraisly, ImageLablr, and RestoreCam — under one unified platform with bundle pricing.",
    category: "General",
  },
  {
    question: "Can I subscribe to just one app?",
    answer:
      "Yes. Each app in the LossStack suite can be purchased individually. However, subscribing to 2 or 3 apps together unlocks automatic bundle discounts, making it the smartest value for teams that need more than one workflow tool.",
    category: "Pricing",
  },
  {
    question: "How does bundle pricing work?",
    answer:
      "When you select any 2 apps, a bundle discount is automatically applied to your total. When you select all 3 apps, an even larger discount is applied. Discounts are calculated off the standard per-app price and shown clearly before checkout.",
    category: "Pricing",
  },
  {
    question: "Is there an annual pricing option?",
    answer:
      "Yes. All apps and bundles are available on monthly or annual billing. Choosing annual billing provides additional savings on top of any bundle discount you may already have.",
    category: "Pricing",
  },
  {
    question: "Who are these tools built for?",
    answer:
      "The LossStack suite is purpose-built for insurance claims professionals, public adjusters, independent appraisers, restoration contractors, and field documentation teams. Each app targets a specific workflow stage within the claims and restoration process.",
    category: "General",
  },
  {
    question: "Are the apps separate products or do they integrate together?",
    answer:
      "Each app is a standalone product that can be used independently. As the LossStack platform evolves, integration capabilities between apps will be introduced to create a seamless end-to-end claims and restoration workflow.",
    category: "General",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Free trial availability varies by app. Visit each app's individual website for current trial and demo options. You can also request a demo of the full LossStack suite directly from this page.",
    category: "General",
  },
  {
    question: "What kind of support is included?",
    answer:
      "All subscriptions include standard support. Higher-tier plans and enterprise agreements include priority support, onboarding assistance, and dedicated account management. Contact us to discuss enterprise needs.",
    category: "Support",
  },
  {
    question: "Can I add or remove apps from my bundle later?",
    answer:
      "Yes. You can adjust your app subscriptions at any time. Bundle pricing will be recalculated automatically based on the number of apps in your active subscription.",
    category: "Pricing",
  },
  {
    question: "Is my data secure?",
    answer:
      "All apps in the LossStack suite are built with enterprise-grade security practices, including encrypted data storage, secure API communications, and role-based access controls. Visit each app's website for detailed security documentation.",
    category: "Security",
  },
];
