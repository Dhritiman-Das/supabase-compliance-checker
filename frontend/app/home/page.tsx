import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  if (session) {
    redirect("/home/dashboard");
  }
  return <div>Home</div>;
}
