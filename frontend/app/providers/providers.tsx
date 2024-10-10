"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./themeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <Toaster className="dark:hidden" />
        <Toaster theme="dark" className="hidden dark:block" />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
