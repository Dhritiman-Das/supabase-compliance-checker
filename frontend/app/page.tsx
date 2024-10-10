import { UserAuthForm } from "@/components/auth/user-auth-form";
import { ModeToggle } from "@/components/mode-toggle";
import AppLogo from "@/components/ui/app-logo";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  if (session) {
    redirect("/home");
  }
  return (
    <>
      <nav className="py-4 fixed flex items-center justify-between w-screen px-8">
        <AppLogo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Link href="/auth/signin">
            <Button variant={"ghost"}>Sign in</Button>
          </Link>
        </div>
      </nav>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="lg:p-8 p-4">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to log in to your account
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
