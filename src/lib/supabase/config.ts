/**
 * Supabase Environment & Runtime Configuration
 * Supports graceful dual-mode:
 * 1. Cloud Supabase Mode (when NEXT_PUBLIC_SUPABASE_URL & ANON_KEY are in .env)
 * 2. Enterprise Local/Prisma Mode (seamless fallback so the app never crashes)
 */

export const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

  const isConfigured = Boolean(
    url &&
    anonKey &&
    url.startsWith("https://") &&
    !url.includes("your-supabase-url")
  );

  return {
    url,
    anonKey,
    serviceRoleKey,
    isConfigured,
  };
};

export const isSupabaseConfigured = (): boolean => {
  return getSupabaseConfig().isConfigured;
};
