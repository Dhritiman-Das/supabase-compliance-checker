export type User = {
  image: string;
  email: string;
  name: string;
};

export type Supabase = {
  isSupabaseSetup: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  suapabaseApiKey?: string;
};

export type UserSchema = User & Supabase;
