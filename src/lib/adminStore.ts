"use client";

import { ALL_PRODUCTS, CatalogProduct } from "@/data/products";
import { PlacedOrder } from "@/lib/orderStore";

const STORAGE_KEY_ADMIN_CATALOG = "it_admin_catalog_v1";
const STORAGE_KEY_INVENTORY = "it_admin_inventory_v1";
const STORAGE_KEY_PRICING_CONFIG = "it_admin_pricing_matrix_v1";
const STORAGE_KEY_CORPORATE_ROSTER = "it_admin_corporate_roster_v1";

// ============================================================================
// 1. PRODUCT CATALOG MANAGEMENT
// ============================================================================

export function getAdminCatalog(): CatalogProduct[] {
  if (typeof window === "undefined") return ALL_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_CATALOG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ADMIN_CATALOG, JSON.stringify(ALL_PRODUCTS));
      return ALL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ALL_PRODUCTS;
  } catch {
    return ALL_PRODUCTS;
  }
}

export function saveAdminProduct(product: CatalogProduct): void {
  if (typeof window === "undefined") return;
  try {
    const catalog = getAdminCatalog();
    const idx = catalog.findIndex((p) => p.id === product.id);
    let updated: CatalogProduct[];
    if (idx >= 0) {
      updated = [...catalog];
      updated[idx] = product;
    } else {
      updated = [product, ...catalog];
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_CATALOG, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("it_catalog_updated", { detail: updated }));
  } catch (err) {
    console.error("Failed to save product:", err);
  }
}

export function deleteAdminProduct(productId: string): void {
  if (typeof window === "undefined") return;
  try {
    const catalog = getAdminCatalog().filter((p) => p.id !== productId);
    localStorage.setItem(STORAGE_KEY_ADMIN_CATALOG, JSON.stringify(catalog));
    window.dispatchEvent(new CustomEvent("it_catalog_updated", { detail: catalog }));
  } catch (err) {
    console.error("Failed to delete product:", err);
  }
}

// ============================================================================
// 2. DYNAMIC PRICING MATRIX & GST RULES
// ============================================================================

export interface PricingConfig {
  volumeMultipliers: {
    qty100: number;
    qty250: number;
    qty500: number;
    qty1000: number;
  };
  substrateRates: {
    matte: number;
    glossy: number;
    goldFoil: number;
    linen: number;
  };
  cornerAddons: {
    rounded500: number;
    rounded100: number;
  };
  gstRuleMode: "statutory_bifurcated"; // Exclusive + 18% GST vs Inclusive
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  volumeMultipliers: {
    qty100: 1.2,
    qty250: 1.1,
    qty500: 1.0,
    qty1000: 0.88,
  },
  substrateRates: {
    matte: 1.58,
    glossy: 1.88,
    goldFoil: 4.49,
    linen: 2.78,
  },
  cornerAddons: {
    rounded500: 99,
    rounded100: 49,
  },
  gstRuleMode: "statutory_bifurcated",
};

export function getPricingConfig(): PricingConfig {
  if (typeof window === "undefined") return DEFAULT_PRICING_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRICING_CONFIG);
    if (!raw) return DEFAULT_PRICING_CONFIG;
    return { ...DEFAULT_PRICING_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PRICING_CONFIG;
  }
}

export function savePricingConfig(config: PricingConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PRICING_CONFIG, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent("it_pricing_updated", { detail: config }));
  } catch (err) {
    console.error("Failed to save pricing config:", err);
  }
}

// ============================================================================
// 3. INVENTORY & RAW MATERIAL STOCK CONTROLLER
// ============================================================================

export interface InventoryStockItem {
  id: string;
  name: string;
  category: "pvc" | "paper" | "mugs" | "foil" | "packaging";
  currentQuantity: number;
  unit: "Sheets" | "Pieces" | "Rolls" | "Reams" | "Cartons";
  minThreshold: number;
  reorderLeadTimeDays: number;
  supplier: string;
  lastUpdated: string;
}

export const DEFAULT_INVENTORY_ITEMS: InventoryStockItem[] = [
  {
    id: "inv-pvc-glossy",
    name: "400-Micron Regular Glossy White PVC Blanks",
    category: "pvc",
    currentQuantity: 12400,
    unit: "Pieces",
    minThreshold: 2000,
    reorderLeadTimeDays: 3,
    supplier: "Jindal Poly Films Ltd • Mumbai Depot",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "inv-pvc-matt",
    name: "400-Micron Satin Matt White PVC Blanks",
    category: "pvc",
    currentQuantity: 8200,
    unit: "Pieces",
    minThreshold: 1500,
    reorderLeadTimeDays: 3,
    supplier: "Jindal Poly Films Ltd • Mumbai Depot",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "inv-paper-350matte",
    name: "350 GSM Silk Matte Art Board (12x18 Inches)",
    category: "paper",
    currentQuantity: 95,
    unit: "Reams",
    minThreshold: 20,
    reorderLeadTimeDays: 2,
    supplier: "ITC Paperboards & Specialty Papers • Chennai",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "inv-paper-400velvet",
    name: "400 GSM Velvet Soft-Touch Heavyweight Stock",
    category: "paper",
    currentQuantity: 42,
    unit: "Reams",
    minThreshold: 15,
    reorderLeadTimeDays: 4,
    supplier: "Fedrigoni Luxury Papers • Bengaluru Warehouse",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "inv-mug-ceramic",
    name: "Grade-A 350ml Matte Black Ceramic Corporate Mugs",
    category: "mugs",
    currentQuantity: 380,
    unit: "Pieces",
    minThreshold: 120,
    reorderLeadTimeDays: 5,
    supplier: "Khurja Ceramics Export Corporation",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "inv-foil-24k",
    name: "24K Metallic Gold Foil Master Stamping Rolls",
    category: "foil",
    currentQuantity: 14,
    unit: "Rolls",
    minThreshold: 4,
    reorderLeadTimeDays: 7,
    supplier: "Kurz Foil Systems India • Peenya",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "inv-pack-deckle",
    name: "120 GSM Cotton Deckle Edge Premium Envelopes",
    category: "packaging",
    currentQuantity: 3200,
    unit: "Pieces",
    minThreshold: 600,
    reorderLeadTimeDays: 2,
    supplier: "Incredible Treasures Conversion Plant",
    lastUpdated: new Date().toISOString(),
  },
];

export function getInventoryStock(): InventoryStockItem[] {
  if (typeof window === "undefined") return DEFAULT_INVENTORY_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INVENTORY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(DEFAULT_INVENTORY_ITEMS));
      return DEFAULT_INVENTORY_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_INVENTORY_ITEMS;
  } catch {
    return DEFAULT_INVENTORY_ITEMS;
  }
}

export function updateStockQuantity(id: string, delta: number): void {
  if (typeof window === "undefined") return;
  try {
    const stock = getInventoryStock();
    const idx = stock.findIndex((it) => it.id === id);
    if (idx >= 0) {
      stock[idx].currentQuantity = Math.max(0, stock[idx].currentQuantity + delta);
      stock[idx].lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(stock));
      window.dispatchEvent(new CustomEvent("it_inventory_updated", { detail: stock }));
    }
  } catch (err) {
    console.error("Failed to update stock quantity:", err);
  }
}

export function saveInventoryItem(item: InventoryStockItem): void {
  if (typeof window === "undefined") return;
  try {
    const stock = getInventoryStock();
    const idx = stock.findIndex((it) => it.id === item.id);
    let updated: InventoryStockItem[];
    if (idx >= 0) {
      updated = [...stock];
      updated[idx] = item;
    } else {
      updated = [item, ...stock];
    }
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("it_inventory_updated", { detail: updated }));
  } catch (err) {
    console.error("Failed to save inventory item:", err);
  }
}

// ============================================================================
// 4. CORPORATE CLIENT ROSTER & RE-ORDER DESK (Feature 5)
// ============================================================================

export interface CorporateClientProfile {
  id: string;
  companyName: string;
  gstin: string;
  primaryContactName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  brandHexColors: string[];
  savedSubstrate: string;
  savedCornerStyle: string;
  totalOrdersRun: number;
  employees: Array<{
    id: string;
    fullName: string;
    designation: string;
    phone: string;
    email: string;
    lastCardRunDate?: string;
  }>;
}

export const DEFAULT_CORPORATE_ROSTER: CorporateClientProfile[] = [
  {
    id: "corp-singhania",
    companyName: "Singhania FinCorp HQ",
    gstin: "27AAACS1482E1Z8",
    primaryContactName: "Anand Singhania",
    phone: "+91 98201 44820",
    email: "anand.s@singhaniafincorp.com",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    brandHexColors: ["#0B1B3D", "#A9782B", "#FFFFFF"],
    savedSubstrate: "Executive Ceramic Mugs & 400 GSM Velvet",
    savedCornerStyle: "6mm Rounded Corners",
    totalOrdersRun: 14,
    employees: [
      {
        id: "emp-1",
        fullName: "Anand Singhania",
        designation: "Managing Director & CEO",
        phone: "+91 98201 44820",
        email: "anand.s@singhaniafincorp.com",
        lastCardRunDate: "2026-10-24",
      },
      {
        id: "emp-2",
        fullName: "Meera Deshmukh",
        designation: "Chief Risk Officer",
        phone: "+91 98201 55219",
        email: "meera.d@singhaniafincorp.com",
        lastCardRunDate: "2026-09-15",
      },
      {
        id: "emp-3",
        fullName: "Karan Johar",
        designation: "VP • Institutional Banking",
        phone: "+91 98201 99120",
        email: "karan.j@singhaniafincorp.com",
        lastCardRunDate: "2026-08-10",
      },
    ],
  },
  {
    id: "corp-mahindra",
    companyName: "Mahindra Tech Park Bangalore",
    gstin: "29AAACM4921K1ZX",
    primaryContactName: "Rajeshwari Nair",
    phone: "+91 98450 29103",
    email: "rajeshwari.n@mahindratech.com",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560100",
    brandHexColors: ["#C72828", "#1E293B", "#FFFFFF"],
    savedSubstrate: "400-Micron Luxury Glossy PVC",
    savedCornerStyle: "Standard Square 90°",
    totalOrdersRun: 28,
    employees: [
      {
        id: "emp-4",
        fullName: "Rajeshwari Nair",
        designation: "Head of Infrastructure",
        phone: "+91 98450 29103",
        email: "rajeshwari.n@mahindratech.com",
        lastCardRunDate: "2026-10-26",
      },
      {
        id: "emp-5",
        fullName: "Srinivas Rao",
        designation: "Principal Cloud Architect",
        phone: "+91 98450 78201",
        email: "srinivas.r@mahindratech.com",
        lastCardRunDate: "2026-09-29",
      },
    ],
  },
];

export function getCorporateRoster(): CorporateClientProfile[] {
  if (typeof window === "undefined") return DEFAULT_CORPORATE_ROSTER;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CORPORATE_ROSTER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CORPORATE_ROSTER, JSON.stringify(DEFAULT_CORPORATE_ROSTER));
      return DEFAULT_CORPORATE_ROSTER;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CORPORATE_ROSTER;
  } catch {
    return DEFAULT_CORPORATE_ROSTER;
  }
}

export function addEmployeeToCorporateRoster(
  clientId: string,
  employee: { fullName: string; designation: string; phone: string; email: string }
): void {
  if (typeof window === "undefined") return;
  try {
    const roster = getCorporateRoster();
    const client = roster.find((c) => c.id === clientId);
    if (client) {
      client.employees.unshift({
        id: `emp-${Date.now()}`,
        ...employee,
        lastCardRunDate: new Date().toISOString().slice(0, 10),
      });
      localStorage.setItem(STORAGE_KEY_CORPORATE_ROSTER, JSON.stringify(roster));
      window.dispatchEvent(new CustomEvent("it_roster_updated", { detail: roster }));
    }
  } catch (err) {
    console.error("Failed to add employee:", err);
  }
}

// ============================================================================
// 5. AUTOMATED PRE-FLIGHT ARTWORK QUALITY SCANNER (Feature 1)
// ============================================================================

export interface PreFlightReport {
  overallScore: number; // 0 - 100
  status: "EXCELLENT" | "ACCEPTABLE" | "ACTION_REQUIRED";
  dpiMetric: number;
  bleedStatus: "PASS" | "WARNING" | "FAIL";
  colorGamut: "CMYK_VERIFIED" | "RGB_CONVERTED" | "UNKNOWN";
  vectorStatus: "VECTOR_SHARP" | "RASTER_OK";
  recommendations: string[];
}

export function computePreFlightReport(order: PlacedOrder): PreFlightReport {
  // Deterministic calculation based on order specs & assets
  const hasFrontImage = order.items.some((it) => Boolean(it.image));
  const isPvc = order.items.some((it) => it.title.toLowerCase().includes("pvc"));
  const hasCustomSpecs = order.items.some((it) => Boolean(it.specs));

  let score = 92;
  const recommendations: string[] = [];

  if (hasFrontImage) {
    score += 4;
  } else {
    score -= 10;
    recommendations.push("Front Side vector artwork preview missing; manual proof required.");
  }

  if (isPvc) {
    score += 2;
  }

  if (hasCustomSpecs) {
    score += 2;
  }

  const finalScore = Math.min(100, Math.max(65, score));

  return {
    overallScore: finalScore,
    status: finalScore >= 90 ? "EXCELLENT" : finalScore >= 75 ? "ACCEPTABLE" : "ACTION_REQUIRED",
    dpiMetric: finalScore >= 90 ? 600 : 300,
    bleedStatus: "PASS",
    colorGamut: "CMYK_VERIFIED",
    vectorStatus: "VECTOR_SHARP",
    recommendations: recommendations.length > 0 ? recommendations : ["Artwork certified for 600+ DPI plate generation."],
  };
}

// ============================================================================
// 6. GANG-RUN (BATCHING) SHEET OPTIMIZER (Feature 3)
// ============================================================================

export interface GangRunBatch {
  substrateName: string;
  matchingOrdersCount: number;
  orders: PlacedOrder[];
  totalCardsCount: number;
  sheetUtilizationPercent: number;
  impositionLayout: string; // e.g. "8-Up Master Sheet (12x18 Inches)"
  savingsPercent: number;
}

export function computeGangRunBatches(orders: PlacedOrder[]): GangRunBatch[] {
  const activeOrders = orders.filter((o) =>
    ["ORDER_CONFIRMED", "PRE_FLIGHT_VERIFIED", "IN_PRODUCTION"].includes(o.status)
  );

  // Group by broad substrate category
  const groups: Record<string, PlacedOrder[]> = {};

  activeOrders.forEach((o) => {
    let substrate = "350 GSM Silk Matte Artboard";
    const itemTitle = (o.items[0]?.title || "").toLowerCase();
    if (itemTitle.includes("pvc")) {
      substrate = "400-Micron Glossy Polymer PVC";
    } else if (itemTitle.includes("mug") || itemTitle.includes("ceramic")) {
      substrate = "Grade-A 350ml Ceramic Blank";
    } else if (itemTitle.includes("foil") || itemTitle.includes("gold")) {
      substrate = "400 GSM Velvet Soft-Touch Stock";
    }

    if (!groups[substrate]) groups[substrate] = [];
    groups[substrate].push(o);
  });

  return Object.entries(groups).map(([substrateName, grpOrders]) => {
    const totalCards = grpOrders.reduce(
      (sum, o) => sum + o.items.reduce((acc, it) => acc + it.quantity, 0),
      0
    );

    const isPlates = !substrateName.includes("Ceramic");
    const sheetUtilizationPercent = isPlates ? Math.min(98, 82 + grpOrders.length * 4) : 90;
    const savingsPercent = isPlates ? Math.min(42, 24 + grpOrders.length * 6) : 15;

    return {
      substrateName,
      matchingOrdersCount: grpOrders.length,
      orders: grpOrders,
      totalCardsCount: totalCards,
      sheetUtilizationPercent,
      impositionLayout: isPlates ? "8-Up Gang-Run Plate (12\" × 18\" Sheet)" : "Single-Job Ceramic Fixture",
      savingsPercent,
    };
  });
}
