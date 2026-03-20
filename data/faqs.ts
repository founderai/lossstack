export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is LossStack?",
    answer:
      "LossStack is a software suite designed for insurance claims, appraisal, and restoration professionals. It brings together three specialized workflow tools — Appraisly, ImageLablr, and RestoreCam — under one unified platform with a single subscription.",
    category: "General",
  },
  {
    question: "Can I subscribe to just one app?",
    answer:
      "LossStack is a unified platform — one subscription gives you access to all apps. Plans start at $99/month. Visit the pricing page to see all available tiers.",
    category: "Pricing",
  },
  {
    question: "How does LossStack pricing work?",
    answer:
      "LossStack uses a unified plan model — one subscription covers all apps. Plans include a set number of report credits per month. When credits are used, a per-report rate applies based on your plan. The Free plan includes 3 one-time credits. Core, Pro, and Firm plans scale in features, credits, and report rates.",
    category: "Pricing",
  },
  {
    question: "Is there an annual pricing option?",
    answer:
      "Annual billing options are available. Contact us at founderai@pm.me for annual pricing details.",
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
    question: "Can I change my plan later?",
    answer:
      "Yes. You can upgrade or downgrade your LossStack plan at any time. Changes take effect at the start of your next billing cycle.",
    category: "Pricing",
  },
  {
    question: "Is my data secure?",
    answer:
      "All apps in the LossStack suite are built with enterprise-grade security practices, including encrypted data storage, secure API communications, and role-based access controls. Visit each app's website for detailed security documentation.",
    category: "Security",
  },
];
