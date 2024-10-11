"use client";

import { Compliance } from "@/types/compliance";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useComplainceDetails = (isSupabaseSetup: boolean) => {
  const session = useSession();
  const [complianceDetailsLoading, setComplianceDetailsLoading] =
    useState(false);
  const [complianceDetails, setComplianceDetails] = useState<Compliance>({
    projectPitrStatus: [],
    tableRlsStatus: [],
    userMfaStatus: [],
  });

  useEffect(() => {
    //@ts-ignore
    const jwtToken = session?.data?.jwtToken;
    if (!jwtToken || !isSupabaseSetup) return;
    const fetchUserComplianceDetails = async () => {
      setComplianceDetailsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/compliance/check-status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log({ response });

      setComplianceDetailsLoading(false);

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const complianceData = await response.json();
      setComplianceDetails(complianceData);
    };
    fetchUserComplianceDetails();
  }, [session, isSupabaseSetup]);
  return { complianceDetailsLoading, complianceDetails };
};
