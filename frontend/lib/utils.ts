import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PLAN_PRICES, PlanType } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to calculate revenue based on the billing plan
function calculateRevenue(plan: PlanType): number {
  return PLAN_PRICES[plan];
}
