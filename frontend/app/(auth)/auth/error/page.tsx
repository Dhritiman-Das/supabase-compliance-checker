"use client";

import { ModeToggle } from "@/components/mode-toggle";
import AppLogo from "@/components/ui/app-logo";
import { Button } from "@/components/ui/button";
import { H2, H4 } from "@/components/ui/typography";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  return (
    <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-4">
      <H2>Error</H2>
      <H4>{error}</H4>
      <div className="flex gap-4">
        <Button
          onClick={async () => {
            const data = await signOut({
              redirect: false,
              callbackUrl: "/"
            });
            router.push(data.url);
          }}
        >
          Logout
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="container py-4">
        <AppLogo />
      </nav>
      <div className="container flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
          <Image
            className="w-full md:w-1/2 max-w-md"
            alt="error_astronaut"
            src="/not-authorized.jpg"
            width={400}
            height={400}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
