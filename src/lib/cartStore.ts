"use client";

export interface CartCardItem {
  id: string;
  title: string;
  substrateId: string;
  substrateTitle?: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  orientation: "horizontal" | "vertical";
  cornerStyle?: "square" | "rounded";
  gildedEdge?: boolean;
  specs: string;
  frontPreviewBg?: string;
  backPreviewBg?: string;
  designId?: string;
  frontElementsCount?: number;
  backElementsCount?: number;
}

export interface LuxuryUpsell {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  category: "case" | "envelope" | "swatch";
  badge?: string;
  iconSvg?: string;
}

export const LUXURY_UPSELLS: LuxuryUpsell[] = [
  {
    id: "upsell-card-case",
    name: "Laser-Engraved Stainless Steel Card Case",
    subtitle: "Matte Black & Gold • Holds 25 cards with scratch-free velvet interior",
    price: 399,
    originalPrice: 799,
    category: "case",
    badge: "50% OFF WITH PRINT RUN",
  },
  {
    id: "upsell-luxury-envelopes",
    name: "Handcrafted Luxury Cotton Envelopes (Pack of 50)",
    subtitle: "120 GSM Deckle-edge paper with peel-and-seal gold foil emblem",
    price: 449,
    originalPrice: 899,
    category: "envelope",
    badge: "EXECUTIVE SUITE",
  },
  {
    id: "upsell-substrate-swatch",
    name: "Physical 12-Substrate Sample Swatch Kit",
    subtitle: "Full tactile box with 24K Gold Foil, Raised Spot UV & Velvet samples",
    price: 299,
    originalPrice: 599,
    category: "swatch",
    badge: "CLIENT FAVORITE",
  },
];

export interface CouponDef {
  code: string;
  description: string;
  type: "flat" | "percent" | "free_shipping";
  value: number;
  minOrder?: number;
}

export const VALID_COUPONS: Record<string, CouponDef> = {
  FIRST500: {
    code: "FIRST500",
    description: "₹500 Flat Discount on First Corporate Order",
    type: "flat",
    value: 500,
    minOrder: 1500,
  },
  MAHI20: {
    code: "MAHI20",
    description: "20% Exclusive Executive Privilege Discount",
    type: "percent",
    value: 20,
    minOrder: 1000,
  },
  CORPORATE10: {
    code: "CORPORATE10",
    description: "10% Bulk Corporate Savings",
    type: "percent",
    value: 10,
    minOrder: 3000,
  },
  FREESHIP: {
    code: "FREESHIP",
    description: "Free Insured Express Air Dispatch",
    type: "free_shipping",
    value: 150,
  },
};

export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 150;

const STORAGE_KEY_CART = "it_studio_cart";

export function getStoredCart(): CartCardItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CART);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(items: CartCardItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
    window.dispatchEvent(new Event("it_cart_updated"));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
}

export function addStoredCartItem(item: CartCardItem): CartCardItem[] {
  const current = getStoredCart();
  const existingIdx = current.findIndex((i) => i.id === item.id);
  let updated: CartCardItem[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [item, ...current];
  }
  saveStoredCart(updated);
  return updated;
}

export function removeStoredCartItem(id: string): CartCardItem[] {
  const current = getStoredCart();
  const updated = current.filter((i) => i.id !== id);
  saveStoredCart(updated);
  return updated;
}

export function clearStoredCart(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_CART);
    window.dispatchEvent(new Event("it_cart_updated"));
  } catch {}
}
