"use client";

const STORAGE_KEY_ADMIN_SESSION = "it_admin_auth_session";

export type AdminRole =
  | "SUPER_ADMIN"
  | "MANAGER"
  | "SUPPORT"
  | "WAREHOUSE"
  | "ACCOUNTANT";

export type AdminTab =
  | "dashboard"
  | "orders"
  | "catalog"
  | "inventory"
  | "shipping"
  | "payments"
  | "customers"
  | "marketing"
  | "settings";

export interface AdminAccountConfig {
  id: string;
  name: string;
  title: string;
  email: string;
  role: AdminRole;
  tierLevel: string;
  badgeLabel: string;
  badgeColor: string;
  description: string;
  allowedTabs: AdminTab[];
  hideRevenueData?: boolean;
}

// 5 Enterprise Admin Accounts per Client Roadmap Specification (PDF Page 4 & 5)
// STRICT ZERO-TRUST SECURITY: Passwords are NEVER stored or exposed in client-side code.
export const ENTERPRISE_ADMIN_ACCOUNTS: Record<string, AdminAccountConfig> = {
  "admin@incredibletreasures.com": {
    id: "admin-super",
    name: "Master Administrator",
    title: "Chief Executive & Studio Owner",
    email: "admin@incredibletreasures.com",
    role: "SUPER_ADMIN",
    tierLevel: "Tier 1: Master Clearance",
    badgeLabel: "SUPER ADMIN",
    badgeColor: "bg-amber-500 text-slate-950 border-amber-400",
    description: "Complete master clearance. Access to all modules, team settings, and API configurations.",
    allowedTabs: [
      "dashboard",
      "orders",
      "catalog",
      "inventory",
      "shipping",
      "payments",
      "customers",
      "marketing",
      "settings",
    ],
  },
  "manager@incredibletreasures.com": {
    id: "admin-manager",
    name: "Operations Manager",
    title: "General Store & Production Manager",
    email: "manager@incredibletreasures.com",
    role: "MANAGER",
    tierLevel: "Tier 2: Operations Lead",
    badgeLabel: "STORE MANAGER",
    badgeColor: "bg-indigo-600 text-white border-indigo-500",
    description: "Controls product catalog, orders, corporate customers, banners, and executive reports.",
    allowedTabs: [
      "dashboard",
      "orders",
      "catalog",
      "customers",
      "marketing",
      "shipping",
    ],
  },
  "support@incredibletreasures.com": {
    id: "admin-support",
    name: "Customer Support Executive",
    title: "Client Care & Ticket Concierge",
    email: "support@incredibletreasures.com",
    role: "SUPPORT",
    tierLevel: "Tier 3: Client Relations",
    badgeLabel: "SUPPORT DESK",
    badgeColor: "bg-teal-600 text-white border-teal-500",
    description: "Inspects order states, client profiles, and tax invoices. Financial and pricing settings are locked.",
    allowedTabs: [
      "dashboard",
      "orders",
      "customers",
    ],
  },
  "warehouse@incredibletreasures.com": {
    id: "admin-warehouse",
    name: "Warehouse & Logistics Lead",
    title: "Offset Press, Imposition & Packaging",
    email: "warehouse@incredibletreasures.com",
    role: "WAREHOUSE",
    tierLevel: "Tier 3: Fulfillment & Press",
    badgeLabel: "WAREHOUSE LEAD",
    badgeColor: "bg-orange-600 text-white border-orange-500",
    description: "Manages raw material inventory, BlueDart AWB packing, and press sheet batching. Revenue data is hidden.",
    allowedTabs: [
      "dashboard",
      "inventory",
      "shipping",
    ],
    hideRevenueData: true, // PDF Page 5: "Warehouse: Inventory, packing, shipping. No revenue data"
  },
  "accountant@incredibletreasures.com": {
    id: "admin-accountant",
    name: "Senior Financial Auditor",
    title: "Chartered Accountant & GST Officer",
    email: "accountant@incredibletreasures.com",
    role: "ACCOUNTANT",
    tierLevel: "Tier 2: Statutory Compliance",
    badgeLabel: "AUDITOR / CA",
    badgeColor: "bg-emerald-600 text-white border-emerald-500",
    description: "Audits statutory GSTR-1, Razorpay settlements, refunds, and MCA tax ledgers.",
    allowedTabs: [
      "dashboard",
      "payments",
      "orders",
    ],
  },
};

export const MASTER_ADMIN_EMAIL = "admin@incredibletreasures.com";

export interface AdminUserSession {
  email: string;
  name: string;
  role: AdminRole;
  title: string;
  authenticatedAt: string;
  token: string;
  allowedTabs: AdminTab[];
  hideRevenueData: boolean;
}

/**
 * Check if a given role is permitted to interact with an Admin module
 */
export function canRoleAccessTab(role: AdminRole, tab: AdminTab): boolean {
  if (role === "SUPER_ADMIN") return true;
  if (tab === "dashboard") return true; // Mutual landing page for all admin tiers
  const account = Object.values(ENTERPRISE_ADMIN_ACCOUNTS).find((a) => a.role === role);
  return account ? account.allowedTabs.includes(tab) : false;
}

/**
 * Verify admin credentials strictly against the secure server API
 * Zero plaintext passwords are checked or stored in client memory.
 */
export async function verifyAdminCredentialsAsync(
  emailInput: string,
  passwordInput: string
): Promise<{ success: boolean; session?: AdminUserSession; error?: string }> {
  const cleanEmail = (emailInput || "").toLowerCase().trim();
  const cleanPassword = (passwordInput || "").trim();

  try {
    const res = await fetch("/api/auth/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, password: cleanPassword, action: "login" }),
    });
    const data = await res.json();
    if (data.success && (data.isAdmin || data.role)) {
      const session = createAdminSession(cleanEmail, data.role, data.name, data.token);
      return { success: true, session };
    }
    return {
      success: false,
      error: data.error || "Invalid admin credentials. Access Denied.",
    };
  } catch {
    return {
      success: false,
      error: "Authentication service temporarily unreachable. Please check network connection.",
    };
  }
}

/**
 * Create an admin session in localStorage and cookie
 */
export function createAdminSession(
  email: string = MASTER_ADMIN_EMAIL,
  roleOrToken?: AdminRole | string,
  name?: string,
  token?: string
): AdminUserSession {
  const account = ENTERPRISE_ADMIN_ACCOUNTS[email.toLowerCase()] || ENTERPRISE_ADMIN_ACCOUNTS[MASTER_ADMIN_EMAIL];

  const validRoles: AdminRole[] = ["SUPER_ADMIN", "MANAGER", "SUPPORT", "WAREHOUSE", "ACCOUNTANT"];
  let finalRole: AdminRole = account.role;
  let finalToken: string | undefined = token;

  if (roleOrToken) {
    if (validRoles.includes(roleOrToken as AdminRole)) {
      finalRole = roleOrToken as AdminRole;
    } else if (typeof roleOrToken === "string" && !token) {
      finalToken = roleOrToken;
    }
  }

  const finalName: string = name || account.name;
  const sessionToken = finalToken || `IT-ADMIN-AUTH-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  const session: AdminUserSession = {
    email: account.email,
    name: finalName,
    role: finalRole,
    title: account.title,
    authenticatedAt: new Date().toISOString(),
    token: sessionToken,
    allowedTabs: account.allowedTabs,
    hideRevenueData: Boolean(account.hideRevenueData),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(session));
    document.cookie = `it_admin_token=${session.token}; path=/; max-age=604800; SameSite=Strict`;
    document.cookie = `it_admin_role=${session.role}; path=/; max-age=604800; SameSite=Strict`;
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
    if (session && session.token) {
      // Ensure allowedTabs & hideRevenueData are populated
      const account = ENTERPRISE_ADMIN_ACCOUNTS[session.email.toLowerCase()] || ENTERPRISE_ADMIN_ACCOUNTS[MASTER_ADMIN_EMAIL];
      session.allowedTabs = account.allowedTabs;
      session.hideRevenueData = Boolean(account.hideRevenueData);
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Destroy admin session and remove auth cookies
 */
export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
    document.cookie = "it_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "it_admin_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "it_admin_jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    fetch("/api/auth/admin", { method: "DELETE" }).catch(() => {});
    window.dispatchEvent(new CustomEvent("it_admin_logout"));
  }
}
