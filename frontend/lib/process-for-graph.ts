import { format, startOfDay } from "date-fns";
import { Analytics } from "./fetchers";
import { PlanType } from "./constants";

interface LineGraphDataPoint {
  date: string;
  count: number;
}

export function processSignupsForLineGraph(
  details: Analytics[]
): LineGraphDataPoint[] {
  // Create a map to store the count for each day
  const dailySignups = new Map<string, number>();

  // Process each signup
  details.forEach((signup) => {
    const dayKey = format(startOfDay(signup.billing.startDate), "yyyy-MM-dd");
    dailySignups.set(dayKey, (dailySignups.get(dayKey) || 0) + 1);
  });

  // Convert the map to an array of data points, sorted by date
  const dataPoints = Array.from(dailySignups, ([date, count]) => ({
    date,
    count,
  }));
  dataPoints.sort((a, b) => a.date.localeCompare(b.date));

  return dataPoints;
}

export function processPlanDistribution(details: Analytics[]) {
  const planCounts = details.reduce<Record<PlanType, number>>((acc, signup) => {
    const { plan } = signup.billing;
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {} as Record<PlanType, number>);

  const chartData: { plan: PlanType; count: number }[] = Object.entries(
    planCounts
  ).map(([plan, count]) => ({
    plan: plan as PlanType,
    count,
  }));

  return chartData;
}
