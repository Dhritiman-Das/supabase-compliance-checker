import { useEffect, useState } from "react";
import axios from "axios";

interface SupabaseConfig {
  isSupabaseSetup: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseApiKey?: string;
}

const useOnboarding = () => {
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupabaseConfig = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user/get-me");
        setSupabaseConfig(response.data);
      } catch (err) {
        setError("Failed to load supabase configuration.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupabaseConfig();
  }, []);

  return { supabaseConfig, loading, error };
};

export default useOnboarding;
