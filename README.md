# LossStack — AI-Powered Claims & Restoration Suite Website

A professional SaaS umbrella marketing website for the LossStack platform, built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

---

## Quick Start

```bash
cd lossstack
npm install
npm run dev
```

Dev server runs at **http://localhost:3000** (or 3001 if 3000 is in use).

---

## Folder Structure

```
lossstack/
├── app/
│   ├── layout.tsx          # Root layout — wraps all pages in MainLayout
│   ├── page.tsx            # Homepage (hero, apps, why stack, testimonials, FAQ, CTA)
│   ├── globals.css         # Global styles + Tailwind v4 theme
│   ├── apps/
│   │   └── page.tsx        # Apps overview with tabbed feature explorer
│   ├── pricing/
│   │   └── page.tsx        # Bundle pricing builder page
│   ├── compare/
│   │   └── page.tsx        # Feature comparison table page
│   └── not-found.tsx       # 404 page
│
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx  # Root layout shell — sidebar + topbar + main
│   │   ├── Sidebar.tsx     # Collapsible nav sidebar (desktop + mobile drawer)
│   │   └── Topbar.tsx      # Fixed top navigation bar
│   └── sections/
│       ├── HeroSection.tsx       # Homepage hero with CTAs
│       ├── AppCard.tsx           # Reusable app card component
│       ├── FeatureList.tsx       # Feature grid for each app
│       ├── PricingBuilder.tsx    # Interactive bundle pricing calculator
│       ├── ComparisonTable.tsx   # Feature/pricing comparison table
│       ├── TestimonialsSection.tsx
│       ├── FAQSection.tsx        # Accordion FAQ
│       ├── CTASection.tsx        # CTA + Explore each product links
│       ├── ContactSection.tsx    # Contact / demo CTA block
│       └── Footer.tsx
│
├── data/                   # ← EDIT THESE FILES to update content
│   ├── apps.ts             # App names, descriptions, features, URLs
│   ├── pricing.ts          # All prices + bundle discount percentages
│   ├── faqs.ts             # FAQ questions and answers
│   ├── testimonials.ts     # Testimonial content
│   └── navigation.ts       # Sidebar nav structure
│
└── lib/
    └── utils.ts            # cn() utility for Tailwind class merging
```

---

## How to Edit Content

### Update Pricing

Edit **`data/pricing.ts`**:

```ts
export const pricingConfig = {
  appraislyMonthly: 79,       // ← change monthly prices here
  imagelablrMonthly: 49,
  restorecamMonthly: 59,
  appraislyAnnual: 69,        // ← change annual prices here
  imagelablrAnnual: 42,
  restorecamAnnual: 51,
  twoAppDiscountPercent: 15,  // ← 2-app bundle discount %
  threeAppDiscountPercent: 25, // ← 3-app bundle discount %
};
```

### Update App Features / Descriptions

Edit **`data/apps.ts`** — find the app by `id` and edit:
- `name`, `tagline`, `description`
- `idealUser`
- `useCases[]`
- `features[]` — each has a `title` and `description`
- `externalUrl` — the link to that app's standalone website

### Update External Website URLs

In **`data/apps.ts`**, find each app and update `externalUrl`:

```ts
{ id: "appraisly",   externalUrl: "https://appraisly.app"   },  // ← update
{ id: "imagelablr",  externalUrl: "https://imagelablr.app"  },  // ← update
{ id: "restorecam",  externalUrl: "https://restorecam.app"  },  // ← update
```

### Update FAQs

Edit **`data/faqs.ts`** — add, remove, or edit entries in the `faqs` array.

### Update Testimonials

Edit **`data/testimonials.ts`** — each entry has `name`, `title`, `company`, `quote`, and optionally `appId`.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, app cards, why stack, testimonials, FAQ, CTA |
| `/apps` | Tabbed app explorer with features for each app |
| `/pricing` | Interactive bundle pricing calculator |
| `/compare` | Side-by-side feature + pricing comparison table |

---

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — page and section animations
- **Lucide React** — icons
- **clsx + tailwind-merge** — conditional class utilities

---

## Brand Colors

| Usage | Color |
|-------|-------|
| Sidebar / Topbar | `#0f1e3c` (deep navy) |
| Main background | `#f5f0e8` (cream) |
| Appraisly accent | `#3B82F6` (blue) |
| ImageLablr accent | `#0D9488` (teal) |
| RestoreCam accent | `#F59E0B` (amber) |

---

## Placeholder URLs

These are the current placeholder external links — update them in `data/apps.ts` when real domains are ready:

- Appraisly → `https://appraisly.app`
- ImageLablr → `https://imagelablr.app`
- RestoreCam → `https://restorecam.app`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
