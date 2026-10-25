"use client";

export interface CustomerUser {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  companyName?: string;
  gstin?: string;
  role?: string;
}

export interface SavedDesignItem {
  id: string;
  userId?: string | null;
  sessionId?: string | null;
  name: string;
  productSlug: string;
  substrateId: string;
  orientation: "horizontal" | "vertical";
  cornerStyle: "square" | "rounded";
  backgroundColor: string;
  gildedEdge: boolean;
  cardTexture: string;
  frontElements: any[];
  backElements: any[];
  frontBgImage?: string | null;
  backBgImage?: string | null;
  frontBgOpacity: number;
  backBgOpacity: number;
  frontBgFit: "cover" | "contain" | "repeat";
  backBgFit: "cover" | "contain" | "repeat";
  previewFront?: string | null;
  previewBack?: string | null;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY_USER = "it_customer_session";
const STORAGE_KEY_SESSION_ID = "it_guest_session_id";

export function getSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  let sid = localStorage.getItem(STORAGE_KEY_SESSION_ID);
  if (!sid) {
    sid = "sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    localStorage.setItem(STORAGE_KEY_SESSION_ID, sid);
  }
  return sid;
}

export function getCustomerSession(): CustomerUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) {
      // Default to Mahi Kapoor demo session for seamless luxury experience
      const defaultUser: CustomerUser = {
        email: "mahi.kapoor@incredibletreasures.com",
        name: "Mahi Kapoor",
        phone: "+91 99450 39266",
        companyName: "Incredible Treasures Luxury Studio",
        gstin: "29AAKFI2392F1Z5",
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCustomerSession(user: CustomerUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
}

export function clearCustomerSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_USER);
}
