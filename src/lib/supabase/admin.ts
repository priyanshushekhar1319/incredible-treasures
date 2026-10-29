import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

/**
 * Returns a Supabase service role client (bypasses RLS) for backend operations.
 * Returns null if service role key is not configured.
 */
export function createSupabaseAdminClient() {
  const { url, serviceRoleKey, anonKey } = getSupabaseConfig();

  const keyToUse = serviceRoleKey || anonKey;
  if (!url || !keyToUse) {
    return null;
  }

  return createClient(url, keyToUse, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
