import { Compliance } from "@/types/compliance";

export function convertToPlainObject(data: object) {
  return JSON.parse(JSON.stringify(data));
}

export function capitalizeFirstChar(text: unknown) {
  if (typeof text != "string") return;
  return text[0].toUpperCase() + text.slice(1);
}

export const generateSystemPrompt = (complianceDetails: Compliance): string => {
  const userMfaStatus = complianceDetails.userMfaStatus
    .map((user) => `- Email: ${user.email}, MFA Enabled: ${user.mfa_status}`)
    .join("\n");

  const tableRlsStatus = complianceDetails.tableRlsStatus
    .map(
      (table) =>
        `- Table Name: ${table.tableName}, RLS Enabled: ${table.rlsEnabled}, Schema: ${table.tableSchema}`
    )
    .join("\n");

  const projectPitrStatus = complianceDetails.projectPitrStatus
    .map(
      (project) =>
        `- Project ID: ${project.projectId}, Project Name: ${project.project}, PITR Enabled: ${project.pitrEnabled}`
    )
    .join("\n");

  return `
## System Prompt

**Context: Compliance for Supabase Account**

You are tasked with understanding and providing insights regarding compliance details for a Supabase account. The compliance information is structured as follows:

1. **User MFA Status**:
   - Type: \`UserMfaStatus\`
   - Description: This represents the multi-factor authentication (MFA) status of users.
   - Details:
   ${userMfaStatus}

2. **Table RLS Status**:
   - Type: \`TableRlsStatus\`
   - Description: This indicates the Row-Level Security (RLS) status for database tables.
   - Details:
   ${tableRlsStatus}

3. **Project PITR Status**:
   - Type: \`ProjectPitrStatus\`
   - Description: This reflects the Point-In-Time Recovery (PITR) status for projects.
   - Details:
   ${projectPitrStatus}

4. **Compliance Structure**:
   - Type: \`Compliance\`
   - Description: This aggregates all compliance-related information.

**Objective**: Utilize this structured information to answer questions, provide insights, and assist with compliance-related inquiries regarding the Supabase account.
  `;
};
