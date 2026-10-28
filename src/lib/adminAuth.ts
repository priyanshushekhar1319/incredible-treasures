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
 * Verify master admin credentials (Password or Security PIN).
 */
export function verifyAdminCredentials(input: string): boolean {
  const clean = input.trim();
  return clean === MASTER_ADMIN_PIN || clean === MASTER_ADMIN_PASSWORD;
}

/**
 * Create an admin session in localStorage and cookie
 */
export function createAdminSession(email: string = MASTER_ADMIN_EMAIL): AdminUserSession {
  const session: AdminUserSession = {
    email,
    role: "SUPER_ADMIN",
    authenticatedAt: new Date().toISOString(),
    token: `IT-ADMIN-AUTH-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(session));
    // Set a lightweight cookie for Next.js middleware / layout check
    document.cookie = `it_admin_token=${session.token}; path=/; max-age=86400; SameSite=Strict`;
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
 * Clear admin session on logout
 */
export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
    document.cookie = `it_admin_token=; path=/; max-age=0; SameSite=Strict`;
    window.dispatchEvent(new CustomEvent("it_admin_logout"));
  }
}
