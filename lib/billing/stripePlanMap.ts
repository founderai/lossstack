// =============================================================
// Stripe Price ID → Plan Code mapping.
// Add your live/test price IDs here as env vars.
// =============================================================

export const STRIPE_PLAN_MAP: Record<string, string> = {
  // Free
  [process.env.STRIPE_PRICE_FREE ?? '']:  'free',
  // Core
  [process.env.STRIPE_PRICE_CORE ?? '']:  'core',
  // Pro
  [process.env.STRIPE_PRICE_PRO ?? '']:   'pro',
  // Firm
  [process.env.STRIPE_PRICE_FIRM ?? '']: 'firm',
};
