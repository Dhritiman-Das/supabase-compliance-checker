export type UserMfaStatus = { email: string; mfa_status: boolean };
export type TableRlsStatus = {
  tableName: string;
  rlsEnabled: boolean;
  tableSchema: string;
};
export type ProjectPitrStatus = {
  projectId: string;
  project: string;
  pitrEnabled: boolean;
};

export type Compliance = {
  userMfaStatus: UserMfaStatus[];
  tableRlsStatus: TableRlsStatus[];
  projectPitrStatus: ProjectPitrStatus[];
};
