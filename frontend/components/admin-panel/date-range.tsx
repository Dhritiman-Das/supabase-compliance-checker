// DatePickerContent.js
"use client";

import * as React from "react";
import { addDays, format, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

function DatePickerContent({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    return {
      from: fromParam ? new Date(parseInt(fromParam)) : subDays(new Date(), 7),
      to: toParam ? new Date(parseInt(toParam)) : new Date()
    };
  });

  React.useEffect(() => {
    if (date?.from && date?.to) {
      const params = new URLSearchParams(searchParams);
      params.set("from", date.from.getTime().toString());
      params.set("to", date.to.getTime().toString());
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [date, router, searchParams]);

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// DatePickerWithRange.js
import { Suspense } from "react";

export function DatePickerWithRange({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Suspense fallback={<div>Loading date picker...</div>}>
      <DatePickerContent className={className} />
    </Suspense>
  );
}
