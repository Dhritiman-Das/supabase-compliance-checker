"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const queries = [
  {
    title: "Create evidence_logs table",
    sql: `CREATE TABLE auth.evidence_logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  change_log TEXT NULL
) TABLESPACE pg_default;`,
  },
  {
    title: "Create get_user_mfa_status function",
    sql: `CREATE OR REPLACE FUNCTION get_user_mfa_status()
RETURNS TABLE (email TEXT, mfa_status BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.email::text,
        CASE 
            WHEN mfa.user_id IS NOT NULL THEN true
            ELSE false
        END AS mfa_status
    FROM 
        auth.users u
    LEFT JOIN 
        auth.mfa_factors mfa ON u.id = mfa.user_id
    WHERE 
        u.email IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;`,
  },
  {
    title: "Create get_rls_status function",
    sql: `CREATE OR REPLACE FUNCTION get_rls_status()
RETURNS jsonb AS $$
BEGIN
  RETURN (
    SELECT jsonb_agg(jsonb_build_object(
      'tableSchema', n.nspname::text,
      'tableName', c.relname::text,
      'rlsEnabled', c.relrowsecurity
    ))
    FROM
      pg_catalog.pg_class c
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE
      c.relkind = 'r'
      AND n.nspname NOT IN ('pg_catalog', 'information_schema')
  );
END;
$$ LANGUAGE plpgsql STABLE;`,
  },
];

export default function SqlQueriesCodeBlock() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <CardContent className="space-y-6 px-0">
      {queries.map((query, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{query.title}</h3>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => copyToClipboard(query.sql, index)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copiedIndex === index ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
              {copiedIndex === index ? "Copied!" : "Copy"}
            </Button>
          </div>
          <motion.pre
            className="p-4 bg-muted rounded-md overflow-x-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <code className="text-sm">{query.sql}</code>
          </motion.pre>
        </motion.div>
      ))}
    </CardContent>
  );
}
