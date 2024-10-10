"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { Supabase } from "@/types/user";
import { revalidateTag } from "next/cache";
import { domain } from "./fetchers";

export const setupSupabase = async (
  supabase: Omit<Supabase, "isSupabaseSetup">
) => {
  try {
    const session: any = await getServerSession(authOptions);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/setup-supabase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwtToken}`,
        },
        body: JSON.stringify(supabase),
      }
    );
    console.log({ responseInsideApi: response });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    revalidateTag(`${domain}-user-own`);
    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Server error",
    };
  }
};
