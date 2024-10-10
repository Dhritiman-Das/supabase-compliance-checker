import { ModeToggle } from "@/components/mode-toggle";
import AppLogo from "@/components/ui/app-logo";
import { Card } from "@/components/ui/card";
import { H4, P } from "@/components/ui/typography";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <nav className="py-4  fixed flex items-center justify-between w-screen px-8">
        <AppLogo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
        </div>
      </nav>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="px-4">
          <Card className="sm:w-[500px] w-full  px-14 py-10 bg-">
            <div className="flex flex-col items-center">
              <Mail size={48} className="text-primary" />
              <H4>Check your email</H4>
            </div>
            <P>
              We have sent a sign-in link to your email address. Click on the
              link to sign in.
            </P>
            <P className="font-light text-[12px]">
              Didn&apos;t receive an email? Check your spam folder or{" "}
              <Link
                href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                className="hover:underline"
              >
                Contact us
              </Link>
            </P>
          </Card>
        </div>
      </div>
    </>
  );
}
