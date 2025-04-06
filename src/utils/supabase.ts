import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  alert("⚠️ Please make sure you properly configured Supabase - refer to the README.");
  throw new Error("⚠️ Please make sure you properly configured Supabase - refer to the README.");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
