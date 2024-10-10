export const PLAN_PRICES = {
  trial: 0,
  basic: 99,
  pro: 149,
  enterprise: 297,
} as const;

export type PlanType = keyof typeof PLAN_PRICES;
