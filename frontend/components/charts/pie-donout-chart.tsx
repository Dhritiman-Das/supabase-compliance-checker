"use client";

import React, { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ChartDataItem {
  name: string;
  count: number;
  fill: string;
}

interface ReusablePieChartProps {
  title: string;
  description: string;
  chartData: ChartDataItem[];
  chartConfig: ChartConfig;
  trendPercentage: number;
  trendPeriod: string;
  footerText: string;
  className: string;
}

const PieDonutChartComponent: React.FC<ReusablePieChartProps> = ({
  title,
  description,
  chartData,
  chartConfig,
  trendPercentage,
  trendPeriod,
  footerText,
  className,
}) => {
  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);
  console.log({ chartData, totalValue, chartConfig });

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalValue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trendPercentage >= 0 ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(trendPercentage)}% {trendPeriod}
          {trendPercentage >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">{footerText}</div>
      </CardFooter>
    </Card>
  );
};

export default PieDonutChartComponent;
