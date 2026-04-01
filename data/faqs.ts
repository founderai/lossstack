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
      "All LossStack plans are currently billed monthly — no annual commitment required. Core starts at $99/mo, Pro at $249/mo, and Firm at $499/mo. You can cancel or change plans at any time with no long-term lock-in.",
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
      "Yes — LossStack includes a permanent Free tier with no credit card required. It gives you access to all three apps in limited mode plus 3 one-time report credits so you can explore the platform before committing to a paid plan. Upgrade to Core, Pro, or Firm when you're ready.",
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
