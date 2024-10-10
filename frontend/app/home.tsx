"use client";
import ErrorScreen from "@/components/errorScreen";
import LoadingScreen from "@/components/loadingScreen";
import { useAccount } from "@/hooks/useUser";
import React from "react";

export default function HomeContent() {
  // const { isPending, isAuthenticated, isSupabaseSetup } = useAccount();

  if (isPending) return <LoadingScreen />;
  return <LoadingScreen />;
}
