import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface ConfigurationStepProps {
  supabaseConfig: {
    supabaseUrl: string;
    supabaseAnonKey: string;
    supabaseApiKey: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  supabaseConfig,
  handleInputChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-2">Supabase Configuration</h2>
      <Input
        name="supabaseUrl"
        value={supabaseConfig.supabaseUrl}
        onChange={handleInputChange}
        placeholder="Supabase URL"
        className="mb-4"
      />
      <Input
        name="supabaseAnonKey"
        value={supabaseConfig.supabaseAnonKey}
        onChange={handleInputChange}
        type="password"
        placeholder="Supabase Anon Key"
        className="mb-4"
      />
      <Input
        name="supabaseApiKey"
        value={supabaseConfig.supabaseApiKey}
        onChange={handleInputChange}
        placeholder="Supabase API Key"
        type="password"
        className="mb-4"
      />
    </motion.div>
  );
};

export default ConfigurationStep;
