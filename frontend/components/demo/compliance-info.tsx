import React from "react";

const ComplianceInfo: React.FC = () => {
  return (
    <>
      <h2>Compliance Check: Supabase Configuration</h2>
      <p>
        We are running a compliance audit on your Supabase setup. This includes
        verifying Multi-Factor Authentication (MFA), Row Level Security (RLS),
        and Point in Time Recovery (PITR) settings.
      </p>
      <ul>
        <li>
          <strong>MFA:</strong> Ensure that MFA is enabled for each user.
        </li>
        <li>
          <strong>RLS:</strong> Verify if Row Level Security is enabled for all
          tables.
        </li>
        <li>
          <strong>PITR:</strong> Check if Point in Time Recovery is enabled for
          all projects.
        </li>
      </ul>
      <p>
        You will receive a detailed report on the status of these
        configurations, along with suggestions to fix any issues identified.
      </p>
    </>
  );
};

export default ComplianceInfo;
