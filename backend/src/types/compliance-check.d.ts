interface SupabaseCredentials {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseApiKey: string;
}

interface UserMFAStatus {
  email: string;
  mfaEnabled: boolean;
}

interface TableRLSStatus {
  tableSchema: string;
  tableName: string;
  rlsEnabled: boolean;
}

interface ProjectPITRStatus {
  projectId: string;
  name: string;
  pitrEnabled: boolean;
}

interface ComplianceCheckResult {
  userMFAStatus: UserMFAStatus[];
  tableRLSStatus: TableRLSStatus[];
  projectPITRStatus: ProjectPITRStatus[];
}

export {
  ComplianceCheckResult,
  ProjectPITRStatus,
  SupabaseCredentials,
  TableRLSStatus,
  UserMFAStatus,
};
