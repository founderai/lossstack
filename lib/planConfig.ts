export const PLAN_CONFIG = {
  core: {
    includedSeats: 1,
    seatPrice: 2900, // $29/seat/mo in cents
    stripeSeatPriceId: process.env.STRIPE_SEAT_PRICE_CORE ?? "",
  },
  pro: {
    includedSeats: 3,
    seatPrice: 2400, // $24/seat/mo in cents
    stripeSeatPriceId: process.env.STRIPE_SEAT_PRICE_PRO ?? "",
  },
  firm: {
    includedSeats: 5,
    seatPrice: 1900, // $19/seat/mo in cents
    stripeSeatPriceId: process.env.STRIPE_SEAT_PRICE_FIRM ?? "",
  },
} as const;

export type PlanId = keyof typeof PLAN_CONFIG;

export function getSeatLimit(plan: PlanId, extraSeats: number): number {
  return PLAN_CONFIG[plan].includedSeats + Math.max(0, extraSeats);
}

export function getSeatPriceDollars(plan: PlanId): number {
  return PLAN_CONFIG[plan].seatPrice / 100;
}
