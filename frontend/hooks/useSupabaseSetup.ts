import { setupSupabase } from "@/lib/action";
import { useEffect, useState } from "react";

interface User {
  isSupabaseSetup: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseApiKey: string;
}

export const useSupabaseSetup = (
  user: User,
  updateUserSupabaseStatus: (updateUser: User) => void
) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupabaseSetup, setIsSupabaseSetup] = useState(false);
  const [supabaseConfig, setSupabaseConfig] = useState({
    supabaseUrl: user.supabaseUrl || "",
    supabaseAnonKey: user.supabaseAnonKey || "",
    supabaseApiKey: user.supabaseApiKey || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupabaseConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await setupSupabase(supabaseConfig);
      console.log({ responseInsideHook: data });

      // After successful submission, update user's isSupabaseSetup status
      updateUserSupabaseStatus({
        ...supabaseConfig,
        isSupabaseSetup: true,
      });
    } catch (error) {
      console.error("Error submitting Supabase config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startAudit = async () => {
    setIsLoading(true);
    try {
      // Simulate starting the audit process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(1);
    } catch (error) {
      console.error("Error starting audit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    supabaseConfig,
    isLoading,
    handleInputChange,
    handleSubmit,
    startAudit,
  };
};
