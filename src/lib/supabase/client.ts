import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Returns a Supabase browser client singleton for React Client Components.
 * Returns null if Supabase environment variables are not yet configured.
 */
export function createClient() {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(url, anonKey);
  }

  return browserClient;
}
