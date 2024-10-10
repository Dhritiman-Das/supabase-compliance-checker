import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

interface complianceDetailsProps {
  userMFAStatus: { email: string; mfa_status: boolean }[];
  tableRLSStatus: {
    tableName: string;
    rlsEnabled: boolean;
    tableSchema: string;
  }[];
  projectPITRStatus: {
    projectId: string;
    project: string;
    pitrEnabled: boolean;
  }[];
}

export default function ComplianceStatus(
  complianceDetails: complianceDetailsProps
) {
  const { userMFAStatus, tableRLSStatus, projectPITRStatus } =
    complianceDetails;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User MFA Status</CardTitle>
        </CardHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>MFA Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userMFAStatus?.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.mfa_status ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <XCircle className="text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </motion.div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Table RLS Status</CardTitle>
        </CardHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Schema</TableHead>
                  <TableHead>RLS Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRLSStatus?.map((table) => (
                  <TableRow key={`${table.tableSchema}.${table.tableName}`}>
                    <TableCell>{table.tableName}</TableCell>
                    <TableCell>{table.tableSchema}</TableCell>
                    <TableCell>
                      {table.rlsEnabled ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <XCircle className="text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </motion.div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project PITR Status</CardTitle>
        </CardHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>PITR Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectPITRStatus?.map((project) => (
                  <TableRow key={project.projectId}>
                    <TableCell>{project.projectId}</TableCell>
                    <TableCell>{project.project}</TableCell>
                    <TableCell>
                      {project.pitrEnabled ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <XCircle className="text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </motion.div>
      </Card>
    </>
  );
}
