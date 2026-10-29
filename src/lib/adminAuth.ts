"use client";

const STORAGE_KEY_ADMIN_SESSION = "it_admin_auth_session";
const MASTER_ADMIN_PIN = "9945"; // Matches Incredible Treasures company phone prefix
const MASTER_ADMIN_PASSWORD = "IncredibleAdmin@2026";
const MASTER_ADMIN_EMAIL = "admin@incredibletreasures.com";

export interface AdminUserSession {
  email: string;
  role: "SUPER_ADMIN" | "PRESS_MANAGER";
  authenticatedAt: string;
  token: string;
}

/**
 * Verify master admin credentials synchronously (PIN or Password).
 */
export function verifyAdminCredentials(input: string): boolean {
  const clean = input.trim();
  return clean === MASTER_ADMIN_PIN || clean === MASTER_ADMIN_PASSWORD;
}

/**
 * Verify master admin credentials against server API.
 */
export async function verifyAdminCredentialsAsync(input: string): Promise<boolean> {
  const clean = input.trim();
  try {
    const res = await fetch("/api/auth/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: clean, password: clean }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      createAdminSession(MASTER_ADMIN_EMAIL, data.token);
      return true;
    }
    return false;
  } catch {
    // Graceful offline fallback
    if (verifyAdminCredentials(clean)) {
      createAdminSession(MASTER_ADMIN_EMAIL);
      return true;
    }
    return false;
  }
}

/**
 * Create an admin session in localStorage and cookie
 */
export function createAdminSession(
  email: string = MASTER_ADMIN_EMAIL,
  token?: string
): AdminUserSession {
  const sessionToken = token || `IT-ADMIN-AUTH-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const session: AdminUserSession = {
    email,
    role: "SUPER_ADMIN",
    authenticatedAt: new Date().toISOString(),
    token: sessionToken,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(session));
    document.cookie = `it_admin_token=${session.token}; path=/; max-age=604800; SameSite=Strict`;
    window.dispatchEvent(new CustomEvent("it_admin_login", { detail: session }));
  }

  return session;
}

/**
 * Retrieve active admin session if valid
 */
export function getAdminSession(): AdminUserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
    if (!raw) return null;
    const session: AdminUserSession = JSON.parse(raw);
    if (session && session.token) return session;
    return null;
  } catch {
    return null;
  }
}

/**
 * Destroy admin session and remove auth cookie
 */
export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
    document.cookie = "it_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "it_admin_jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    fetch("/api/auth/admin", { method: "DELETE" }).catch(() => {});
    window.dispatchEvent(new CustomEvent("it_admin_logout"));
  }
}
