import React from "react";
import SupabaseSetup from "./supabase-setup";
import { getUserDetails } from "@/lib/fetchers";

const MainContent = async () => {
  const [user] = await Promise.all([getUserDetails()]);

  return (
    <div>
      <SupabaseSetup user={user} />
    </div>
  );
};

export default MainContent;
