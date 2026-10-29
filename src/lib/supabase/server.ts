import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";

/**
 * Creates a server-side Supabase client with Next.js cookie handling.
 * Returns null if Supabase environment variables are not yet configured.
 */
export async function createServerSupabaseClient() {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // Handled similarly to set
        }
      },
    },
  });
}
