"use client";

const STORAGE_KEY_HERO_BANNERS = "it_admin_hero_banners_v1";
const STORAGE_KEY_ANNOUNCEMENT = "it_admin_announcement_v1";
const STORAGE_KEY_COUPONS = "it_admin_coupons_v1";

export type { HeroBannerItem, AnnouncementBarConfig } from "@/data/banners";
import {
  HeroBannerItem,
  AnnouncementBarConfig,
  INITIAL_HERO_BANNERS,
  DEFAULT_ANNOUNCEMENT_CONFIG,
} from "@/data/banners";
export { INITIAL_HERO_BANNERS, DEFAULT_ANNOUNCEMENT_CONFIG };

export interface AdminCouponRule {
  code: string;
  description: string;
  type: "percent" | "flat" | "free_shipping";
  value: number;
  minOrder: number;
  isActive?: boolean;
  expiryDate?: string;
  usageCount: number;
  createdAt: string;
}

// Initial Preset Coupons (including festive Diwali & corporate offers)
export const DEFAULT_COUPONS: AdminCouponRule[] = [
  {
    code: "DIWALI20",
    description: "Diwali Mahotsav: Flat 20% Off on 500+ Luxury PVC Cards",
    type: "percent",
    value: 20,
    minOrder: 2500,
    isActive: true,
    expiryDate: "2026-11-20T23:59:59Z",
    usageCount: 42,
    createdAt: "2026-11-01T00:00:00Z",
  },
  {
    code: "FIRST500",
    description: "₹500 Flat Discount on First Corporate Order",
    type: "flat",
    value: 500,
    minOrder: 1500,
    isActive: true,
    usageCount: 128,
    createdAt: "2026-10-01T00:00:00Z",
  },
  {
    code: "MAHI20",
    description: "20% Exclusive Executive Privilege Discount",
    type: "percent",
    value: 20,
    minOrder: 1000,
    isActive: true,
    usageCount: 89,
    createdAt: "2026-10-01T00:00:00Z",
  },
  {
    code: "CORPORATE10",
    description: "10% Bulk Corporate Savings on Orders > ₹3,000",
    type: "percent",
    value: 10,
    minOrder: 3000,
    isActive: true,
    usageCount: 215,
    createdAt: "2026-10-01T00:00:00Z",
  },
  {
    code: "FREESHIP",
    description: "Free Insured Express Air Dispatch via BlueDart",
    type: "free_shipping",
    value: 150,
    minOrder: 0,
    isActive: true,
    usageCount: 310,
    createdAt: "2026-10-01T00:00:00Z",
  },
];

// ============================================================================
// 1. HERO BANNER CONTROLLER & DEDUPLICATION ENGINE
// ============================================================================

/**
 * Strictly deduplicate banners by ID and Category/Key to guarantee
 * that slides never repeat (e.g. visiting cards 2-3x or polos multiple times)
 */
export function deduplicateBanners(banners: HeroBannerItem[]): HeroBannerItem[] {
  const seenIds = new Set<string>();
  const seenKeys = new Set<string>();
  const result: HeroBannerItem[] = [];

  for (const b of banners) {
    if (!b || !b.id) continue;
    if (seenIds.has(b.id)) continue;

    // Build dedupe key combining category and core title phrase
    const normCategory = b.category || "general";
    const titleKey = (b.title || "").trim().toLowerCase().slice(0, 15);
    const dedupeKey = `${normCategory}:${titleKey}`;

    if (seenKeys.has(dedupeKey)) continue;

    seenIds.add(b.id);
    seenKeys.add(dedupeKey);
    result.push(b);
  }

  return result;
}

export function getAllHeroBanners(): HeroBannerItem[] {
  if (typeof window === "undefined") return INITIAL_HERO_BANNERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HERO_BANNERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_HERO_BANNERS, JSON.stringify(INITIAL_HERO_BANNERS));
      return INITIAL_HERO_BANNERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_HERO_BANNERS;
    }
    const deduped = deduplicateBanners(parsed);
    if (deduped.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY_HERO_BANNERS, JSON.stringify(deduped));
    }
    return deduped;
  } catch {
    return INITIAL_HERO_BANNERS;
  }
}

export function resetHeroBannersToDefault(): HeroBannerItem[] {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_HERO_BANNERS, JSON.stringify(INITIAL_HERO_BANNERS));
    window.dispatchEvent(new CustomEvent("it_marketing_updated", { detail: INITIAL_HERO_BANNERS }));
  }
  return INITIAL_HERO_BANNERS;
}

export function getActiveHeroBanners(): HeroBannerItem[] {
  const all = getAllHeroBanners();
  const now = new Date();
  return all.filter((banner) => {
    if (!banner.isActive) return false;
    if (banner.expiryDate) {
      const exp = new Date(banner.expiryDate);
      if (now > exp) return false; // Scheduled auto-expiry
    }
    if (banner.startDate) {
      const start = new Date(banner.startDate);
      if (now < start) return false;
    }
    return true;
  });
}

export async function syncBannersFromServer(): Promise<HeroBannerItem[]> {
  if (typeof window === "undefined") return INITIAL_HERO_BANNERS;
  try {
    const res = await fetch("/api/marketing/banners");
    const data = await res.json();
    if (data.success && Array.isArray(data.banners) && data.banners.length > 0) {
      const deduped = deduplicateBanners(data.banners);
      localStorage.setItem(STORAGE_KEY_HERO_BANNERS, JSON.stringify(deduped));
      window.dispatchEvent(new CustomEvent("it_marketing_updated", { detail: deduped }));
      return deduped;
    }
  } catch (err) {
    console.warn("Could not sync banners from server:", err);
  }
  return getAllHeroBanners();
}

export function saveHeroBanner(banner: HeroBannerItem): void {
  if (typeof window === "undefined") return;
  try {
    const list = getAllHeroBanners();
    const idx = list.findIndex((b) => b.id === banner.id);
    let updated: HeroBannerItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = banner;
    } else {
      // Replace matching category if it already exists to prevent duplicate slides
      const catIdx = banner.category !== "festive" ? list.findIndex((b) => b.category === banner.category) : -1;
      if (catIdx >= 0) {
        updated = [...list];
        updated[catIdx] = banner;
      } else {
        updated = [banner, ...list];
      }
    }
    const deduped = deduplicateBanners(updated);
    localStorage.setItem(STORAGE_KEY_HERO_BANNERS, JSON.stringify(deduped));
    window.dispatchEvent(new CustomEvent("it_marketing_updated", { detail: deduped }));

    // Sync to Server API
    fetch("/api/marketing/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    }).catch((err) => console.warn("Background banner sync failed:", err));
  } catch (err) {
    console.error("Failed to save hero banner:", err);
  }
}

export function deleteHeroBanner(bannerId: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getAllHeroBanners().filter((b) => b.id !== bannerId);
    localStorage.setItem(STORAGE_KEY_HERO_BANNERS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("it_marketing_updated"));

    // Sync to Server API
    fetch(`/api/marketing/banners?id=${encodeURIComponent(bannerId)}`, {
      method: "DELETE",
    }).catch((err) => console.warn("Background banner delete failed:", err));
  } catch (err) {
    console.error("Failed to delete hero banner:", err);
  }
}

// ============================================================================
// 2. TOP ANNOUNCEMENT BAR CONTROLLER
// ============================================================================

export function getAnnouncementConfig(): AnnouncementBarConfig {
  if (typeof window === "undefined") return DEFAULT_ANNOUNCEMENT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ANNOUNCEMENT, JSON.stringify(DEFAULT_ANNOUNCEMENT_CONFIG));
      return DEFAULT_ANNOUNCEMENT_CONFIG;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : DEFAULT_ANNOUNCEMENT_CONFIG;
  } catch {
    return DEFAULT_ANNOUNCEMENT_CONFIG;
  }
}

export function saveAnnouncementConfig(config: AnnouncementBarConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ANNOUNCEMENT, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent("it_marketing_updated"));
  } catch (err) {
    console.error("Failed to save announcement config:", err);
  }
}

// ============================================================================
// 3. PROMOTIONAL COUPON ENGINE
// ============================================================================

export function getAdminCoupons(): AdminCouponRule[] {
  if (typeof window === "undefined") return DEFAULT_COUPONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COUPONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(DEFAULT_COUPONS));
      return DEFAULT_COUPONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_COUPONS;
  } catch {
    return DEFAULT_COUPONS;
  }
}

export function getActiveCoupons(): AdminCouponRule[] {
  const all = getAdminCoupons();
  const now = new Date();
  return all.filter((c) => {
    if (!c.isActive) return false;
    if (c.expiryDate) {
      const exp = new Date(c.expiryDate);
      if (now > exp) return false; // Auto-expired
    }
    return true;
  });
}

export function saveAdminCoupon(coupon: AdminCouponRule): void {
  if (typeof window === "undefined") return;
  try {
    const list = getAdminCoupons();
    const idx = list.findIndex((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
    let updated: AdminCouponRule[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = { ...coupon, code: coupon.code.toUpperCase().trim() };
    } else {
      updated = [{ ...coupon, code: coupon.code.toUpperCase().trim() }, ...list];
    }
    localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("it_coupons_updated"));
  } catch (err) {
    console.error("Failed to save coupon:", err);
  }
}

export function deleteAdminCoupon(code: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getAdminCoupons().filter((c) => c.code.toUpperCase() !== code.toUpperCase());
    localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("it_coupons_updated"));
  } catch (err) {
    console.error("Failed to delete coupon:", err);
  }
}

export function toggleAdminCoupon(code: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getAdminCoupons();
    const target = list.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (target) {
      target.isActive = !target.isActive;
      localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("it_coupons_updated"));
    }
  } catch (err) {
    console.error("Failed to toggle coupon:", err);
  }
}

/**
 * Validates a coupon code dynamically against stored coupon rules, minimum cart value, and expiration dates.
 */
export function evaluateCoupon(
  code: string,
  cartSubtotal: number
): { valid: boolean; error?: string; discount: number; coupon?: AdminCouponRule } {
  const cleanCode = code.trim().toUpperCase();
  const coupons = getAdminCoupons();
  const match = coupons.find((c) => c.code.toUpperCase() === cleanCode);

  if (!match) {
    return { valid: false, error: "Invalid coupon code. Check spelling or try DIWALI20.", discount: 0 };
  }

  if (!match.isActive) {
    return { valid: false, error: "This coupon code is currently deactivated.", discount: 0 };
  }

  if (match.expiryDate) {
    const exp = new Date(match.expiryDate);
    if (new Date() > exp) {
      return { valid: false, error: "This promotional campaign has expired.", discount: 0 };
    }
  }

  if (match.minOrder && cartSubtotal < match.minOrder) {
    return {
      valid: false,
      error: `Minimum order value of ₹${match.minOrder.toLocaleString("en-IN")} required for code ${match.code}.`,
      discount: 0,
    };
  }

  let discount = 0;
  if (match.type === "percent") {
    discount = Math.round((cartSubtotal * match.value) / 100);
  } else if (match.type === "flat") {
    discount = Math.min(match.value, cartSubtotal);
  } else if (match.type === "free_shipping") {
    discount = match.value;
  }

  return { valid: true, discount, coupon: match };
}

