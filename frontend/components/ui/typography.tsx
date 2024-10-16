import { cn } from "@/lib/utils";
import React from "react";

interface TypeProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
interface ULProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export function H1({ children, className = "", ...props }: TypeProps) {
  return (
    <h1
      className={cn(
        `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`,
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = "", ...props }: TypeProps) {
  return (
    <h2
      className={cn(
        `mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0`,
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = "", ...props }: TypeProps) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className = "", ...props }: TypeProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function P({ children, className = "", ...props }: TypeProps) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function UL({ children, className = "", ...props }: ULProps) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}
