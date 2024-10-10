// UserAuthFormContent.js
"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginFormDataSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

function UserAuthFormContent({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof LoginFormDataSchema>>({
    resolver: zodResolver(LoginFormDataSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit(data: z.infer<typeof LoginFormDataSchema>) {
    console.log({ data });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="email">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        required
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                console.log(form.getValues("email"));

                await signIn("email", {
                  email: form.getValues("email"),
                  callbackUrl
                });
                setIsLoading(false);
              }}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await signIn("github", { callbackUrl });
          setIsLoading(false);
        }}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}

// UserAuthForm.js
import { Suspense } from "react";

export function UserAuthForm(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Suspense fallback={<div>Loading authentication form...</div>}>
      <UserAuthFormContent {...props} />
    </Suspense>
  );
}
