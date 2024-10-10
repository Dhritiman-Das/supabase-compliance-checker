import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import AppLogo from "@/components/ui/app-logo";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Page() {
  return (
    <>
      <nav className="py-4 fixed flex items-center justify-between w-screen px-8">
        <AppLogo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Link href="/">
            <Button variant={"ghost"}>Log in</Button>
          </Link>
        </div>
      </nav>
      <div className="flex h-screen">
        <div className="w-0 md:w-1/2 bg-secondary"></div>
        <div className="lg:p-8 p-4 w-full md:w-1/2 flex items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
