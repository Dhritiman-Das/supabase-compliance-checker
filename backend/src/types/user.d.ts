export interface IUser {
  name: string;
  email: string;
  image: string;
  isSupabaseSetup: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseApiKey?: string;
}
