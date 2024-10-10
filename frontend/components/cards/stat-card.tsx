import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { H2 } from "../ui/typography";
import { cn } from "@/lib/utils";

export default function StatCard({
  title,
  description,
  value,
  className,
}: {
  title: string;
  description: string;
  value: string | number;
  className?: string;
}) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <H2>{value}</H2>
      </CardContent>
    </Card>
  );
}
