import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// SERVER ONLY. Uses the service_role key, which bypasses RLS.
// Never import this module into client ("use client") code.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
