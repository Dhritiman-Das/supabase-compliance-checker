import { SupabaseClient, createClient } from "@supabase/supabase-js";
import {
  ProjectPITRStatus,
  TableRLSStatus,
  UserMFAStatus,
} from "src/types/compliance-check";

export class ComplianceService {
  async checkMFAStatus(supabase: SupabaseClient): Promise<UserMFAStatus[]> {
    try {
      const { data: usersMFAStatus, error } = await supabase.rpc(
        "get_user_mfa_status"
      );
      if (error) throw error;
      return usersMFAStatus;
    } catch (error) {
      console.error("Failed to check MFA status:", error);
      throw error;
    }
  }

  async checkRLSStatus(supabase: SupabaseClient): Promise<TableRLSStatus[]> {
    try {
      const { data: tablesRLSStatus, error } = await supabase.rpc(
        "get_rls_status"
      );
      if (error) throw error;
      return tablesRLSStatus;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  async checkPITRStatus(supabaseAnonKey: string): Promise<ProjectPITRStatus[]> {
    try {
      // Step 1: Retrieve project IDs
      const projectsResponse = await fetch(
        "https://api.supabase.com/v1/projects",
        {
          headers: {
            Authorization: `Bearer ${supabaseAnonKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!projectsResponse.ok) {
        throw new Error(
          `Failed to fetch projects: ${projectsResponse.statusText}`
        );
      }

      const projects = await projectsResponse.json();

      // Step 2: Check PITR status for each project
      const projectStatuses = await Promise.all(
        projects.map(async (project: { id: string; name: string }) => {
          const backupResponse = await fetch(
            `https://api.supabase.com/v1/projects/${project.id}/database/backups`,
            {
              headers: {
                Authorization: `Bearer ${supabaseAnonKey}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!backupResponse.ok) {
            throw new Error(
              `Failed to fetch backup details for project ${project.name}: ${backupResponse.statusText}`
            );
          }

          const backupDetails = await backupResponse.json();

          return {
            projectId: project.id,
            project: project.name,
            pitrEnabled: backupDetails.pitr_enabled,
          };
        })
      );

      return projectStatuses;
    } catch (error) {
      console.error("Error in checkPITRStatus:", error);
      throw error;
    }
  }

  async getEvidenceLogs(supabaseUrl: string, supabaseAnonKey: string) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from("evidence_log")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(10);

      if (error) throw error;

      return data;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }
  async checkCompliance(
    supabaseUrl: string,
    supabaseAnonKey: string,
    supabaseApiKey: string
  ) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const [userMfaStatus, tableRlsStatus, projectPitrStatus] =
        await Promise.all([
          this.checkMFAStatus(supabase),
          this.checkRLSStatus(supabase),
          this.checkPITRStatus(supabaseApiKey),
        ]);
      return {
        userMfaStatus,
        tableRlsStatus,
        projectPitrStatus,
      };
    } catch (error) {
      console.log(error);
      return error instanceof Error
        ? error.message
        : "Failed to retrieve compliance status";
    }
  }
}
