// =============================================================
// Stripe Price ID → Plan Code mapping.
//
// Env vars required (set in .env.local + Vercel dashboard):
//   STRIPE_PRICE_CORE            — Stripe price ID for Core plan ($99/mo)
//   STRIPE_PRICE_PRO             — Stripe price ID for Pro plan ($249/mo)
//   STRIPE_PRICE_FIRM            — Stripe price ID for Firm plan ($499/mo)
//   STRIPE_PRICE_STORAGE_ADDON   — Stripe price ID for Core storage add-on ($49/mo)
//
// Optional seat price IDs (extra seats, quantity-based):
//   STRIPE_SEAT_PRICE_CORE       — $29/seat/mo
//   STRIPE_SEAT_PRICE_PRO        — $24/seat/mo
//   STRIPE_SEAT_PRICE_FIRM       — $19/seat/mo
//
// Required for webhook (set in Vercel + Stripe dashboard):
//   STRIPE_WEBHOOK_SECRET        — from Stripe Dashboard > Webhooks > Signing Secret
//
// These env var names are kept in sync with data/pricing.ts (unifiedStripePriceIds).
// =============================================================

export const STRIPE_PLAN_MAP: Record<string, string> = {
  // Core plan — $99/mo, 0 monthly credits, $14.99/report overage
  [process.env.STRIPE_PRICE_CORE ?? '']:  'core',
  // Pro plan — $249/mo, 10 monthly credits, $12.99/report overage
  [process.env.STRIPE_PRICE_PRO ?? '']:   'pro',
  // Firm plan — $499/mo, 25 monthly credits, $9.99/report overage
  [process.env.STRIPE_PRICE_FIRM ?? '']: 'firm',
};

// Overage price in cents per report, keyed by plan code.
// These MUST match plan_entitlements.per_report_overage_price_cents in the DB.
// Source of truth: data/pricing.ts (reportPrice field).
export const OVERAGE_PRICE_CENTS: Record<string, number> = {
  core:  1499,  // $14.99 — matches data/pricing.ts core.reportPrice
  pro:   1299,  // $12.99 — matches data/pricing.ts pro.reportPrice
  firm:  999,   // $9.99  — matches data/pricing.ts firm.reportPrice
};
