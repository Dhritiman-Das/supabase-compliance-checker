"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useSupabaseSetup } from "@/hooks/useSupabaseSetup";
import ComplianceInfo from "./compliance-info";
import ConfigurationStep from "./configuration-step";
import ComplianceStatus from "./compliance-status";
import { useComplainceDetails } from "@/hooks/useComplianceDetails";
import ComplianceStatusLoading from "./compliance-loading";
import DangerZone from "./danger-zone";
import SqlQueriesCodeBlock from "./sql-queries-code-block";
import Link from "next/link";

interface User {
  isSupabaseSetup: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseApiKey: string;
}

const SupabaseSetup: React.FC<{ user: User }> = ({ user }) => {
  const {
    step,
    supabaseConfig,
    isLoading,
    handleInputChange,
    handleSubmit,
    startAudit,
    startAuth,
  } = useSupabaseSetup(user, () => {});

  const { complianceDetailsLoading, complianceDetails } = useComplainceDetails(
    Boolean(user?.isSupabaseSetup)
  );
  if (complianceDetailsLoading) {
    return <ComplianceStatusLoading />;
  }

  if (user.isSupabaseSetup) {
    return (
      <>
        <div className="space-y-6 p-6  min-h-screen">
          <h1 className="text-3xl font-bold text-start mb-8">
            Supabase Compliance Status
          </h1>
          <ComplianceStatus
            projectPITRStatus={complianceDetails?.projectPitrStatus}
            tableRLSStatus={complianceDetails?.tableRlsStatus}
            userMFAStatus={complianceDetails?.userMfaStatus}
          />
          <DangerZone />
        </div>
      </>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Setup</CardTitle>
        <CardDescription>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {step === 0 && <ComplianceInfo />}
            {step === 1 && (
              <>
                Setup your SQL queries in Supabase. Click{" "}
                <Link
                  href={
                    "https://supabase.com/docs/guides/database/functions?queryGroups=language&language=sql"
                  }
                  target="_blank"
                >
                  here
                </Link>{" "}
                to know more
              </>
            )}
          </motion.div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 0 && <></>}
        {step === 1 && <SqlQueriesCodeBlock />}
        {step === 2 && (
          <ConfigurationStep
            supabaseConfig={supabaseConfig}
            handleInputChange={handleInputChange}
          />
        )}
      </CardContent>
      <CardFooter>
        {step === 0 && (
          <>
            <Button onClick={startAudit} className="mr-2" disabled={isLoading}>
              {isLoading ? "Starting..." : "Start Audit"}
            </Button>
            <Button variant="secondary" disabled={isLoading}>
              Cancel
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <Button onClick={startAuth} className="mr-2" disabled={isLoading}>
              {isLoading ? "Procceding..." : "Procced"}
            </Button>
          </>
        )}
        {step === 2 && (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Configuration"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SupabaseSetup;
