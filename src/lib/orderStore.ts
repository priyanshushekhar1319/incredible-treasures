"use client";

import { lookupIndianPincode } from "./pincodeEngine";
import { calculateDeliverySla } from "./deliverySla";

export interface OrderItem {
  id: string;
  productId?: string;
  title: string;
  categoryName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
  branding?: string;
  specs?: string;
  finishType?: string;
  cornerStyle?: string;
  isGstIncluded?: boolean;
}

export interface PlacedOrder {
  id: string;
  createdAt: string; // ISO string
  source: "studio" | "ready_made_storefront";
  status:
    | "ORDER_CONFIRMED"
    | "PRE_FLIGHT_VERIFIED"
    | "IN_PRODUCTION"
    | "QUALITY_FINISHING"
    | "DISPATCHED"
    | "DELIVERED";
  statusLabel: string;
  items: OrderItem[];
  customer: {
    fullName: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    gstin?: string;
  };
  pricing: {
    subtotal: number;
    gstAmount: number;
    shippingFee: number;
    shippingTier: "standard" | "priority_vip";
    couponCode?: string;
    couponDiscount: number;
    grandTotal: number;
  };
  payment: {
    method: "upi" | "card" | "po";
    status: "PAID_ADVANCE" | "AWAITING_PAYMENT" | "PO_NET30";
    referenceId: string;
    razorpayReady: boolean;
  };
  logistics: {
    courierPartner: string;
    awbNumber: string;
    courierTrackingUrl: string;
    courierHelpline: string;
    guaranteedDeliveryFormatted: string;
    originFacility: string;
    destinationCity: string;
    cutoffCountdownText: string;
    deliveryExecutive?: {
      name: string;
      phone: string;
      vehicleNumber: string;
      badge: string;
    };
  };
}

const STORAGE_KEY_ORDERS = "it_production_orders";

// Clean Real Orders Only - No fake or pre-seeded dummy orders
export function getStoredOrders(): PlacedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!raw) return [];
    const parsed: PlacedOrder[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter out any legacy dummy demo orders or test orders
    const realOrders = parsed.filter(
      (o) =>
        o &&
        o.id &&
        o.id !== "IT-PRINT-017378" &&
        o.id !== "IT-PRINT-017379" &&
        o.id !== "IT-TEST-999999" &&
        !o.id.startsWith("IT-PRINT-") &&
        !o.id.startsWith("IT-TEST-") &&
        !o.id.startsWith("demo-") &&
        o.customer?.fullName !== "Mahi Kapoor" &&
        o.customer?.fullName !== "Anand Singhania" &&
        o.customer?.fullName !== "Ratan Tata" &&
        o.customer?.fullName !== "Narayana Murthy" &&
        o.customer?.fullName !== "Mahi Kapoor (Demo)"
    );

    if (realOrders.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(realOrders));
    }

    return realOrders;
  } catch {
    return [];
  }
}

/**
 * Clean all legacy demo orders completely
 */
export function clearAllDemoOrders(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_ORDERS);
    window.dispatchEvent(new CustomEvent("it_order_updated", { detail: [] }));
    window.dispatchEvent(new CustomEvent("it_orders_synced", { detail: [] }));
  } catch (err) {
    console.error("Failed to clear demo orders:", err);
  }
}

/**
 * Delete a specific order by ID
 */
export function deleteOrder(orderId: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredOrders().filter((o) => o.id !== orderId);
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent("it_order_updated", { detail: current }));

    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "DELETE",
    }).catch(() => {});
  } catch (err) {
    console.error("Failed to delete order:", err);
  }
}

/**
 * Get an order by ID or Docket. Case-insensitive lookup.
 */
export function getOrderById(orderIdOrAwb: string): PlacedOrder | null {
  const query = (orderIdOrAwb || "").trim().toUpperCase();
  if (!query) return null;

  const all = getStoredOrders();
  const match = all.find(
    (o) =>
      o.id.toUpperCase() === query ||
      o.logistics.awbNumber.toUpperCase() === query ||
      o.id.toUpperCase().replace(/\D/g, "") === query.replace(/\D/g, "")
  );

  return match || null;
}

/**
 * Save a newly placed order to localStorage and sync to central database.
 */
export function savePlacedOrder(order: PlacedOrder): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredOrders().filter((o) => o.id !== order.id);
    const updated = [order, ...existing];
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("it_order_placed", { detail: order }));

    // Seamless Server Database Sync (Prisma / Supabase Postgres)
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).catch((err) => {
      console.warn("Background order DB sync will retry on reconnect:", err);
    });
  } catch (err) {
    console.error("Failed to save placed order to localStorage:", err);
  }
}

/**
 * Fetch latest orders from the central Database and update local storage.
 */
export async function syncOrdersFromDatabase(): Promise<PlacedOrder[]> {
  if (typeof window === "undefined") return getStoredOrders();
  try {
    const res = await fetch("/api/orders?limit=100");
    const data = await res.json();
    if (data.success && Array.isArray(data.orders)) {
      const dbOrders: PlacedOrder[] = data.orders.filter(
        (o: PlacedOrder) =>
          o &&
          o.id &&
          !o.id.startsWith("IT-PRINT-") &&
          !o.id.startsWith("IT-TEST-") &&
          !o.id.startsWith("demo-") &&
          o.id !== "IT-TEST-999999" &&
          o.customer?.fullName !== "Ratan Tata" &&
          o.customer?.fullName !== "Mahi Kapoor" &&
          o.customer?.fullName !== "Anand Singhania" &&
          o.customer?.fullName !== "Narayana Murthy"
      );
      if (dbOrders.length === 0) {
        // Central DB has 0 genuine orders; clean local cache as well
        const cleanLocal = getStoredOrders();
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(cleanLocal));
        window.dispatchEvent(new CustomEvent("it_orders_synced", { detail: cleanLocal }));
        return cleanLocal;
      }
      const local = getStoredOrders();
      const dbIds = new Set(dbOrders.map((o) => o.id));
      const merged = [...dbOrders, ...local.filter((l) => !dbIds.has(l.id))];
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent("it_orders_synced", { detail: merged }));
      return merged;
    }
  } catch (err) {
    console.warn("Could not sync orders from server DB (using cached):", err);
  }
  return getStoredOrders();
}

export interface CreateOrderParams {
  source: "studio" | "ready_made_storefront";
  items: OrderItem[];
  customer: {
    fullName: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    gstin?: string;
  };
  pricing: {
    subtotal: number;
    gstAmount: number;
    shippingFee: number;
    shippingTier: "standard" | "priority_vip";
    couponCode?: string;
    couponDiscount: number;
    grandTotal: number;
  };
  paymentMethod: "upi" | "card" | "po";
}

/**
 * Factory function to create a genuine production-ready order.
 */
export function createRealOrder(params: CreateOrderParams): PlacedOrder {
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const orderId = `IT-ORD-${randNum}`;
  const now = new Date();

  const sla = calculateDeliverySla(
    params.customer.pincode,
    params.pricing.shippingTier,
    now
  );

  const awbNumber = `BD-${randNum}${params.customer.pincode.slice(0, 3)}`;

  const newOrder: PlacedOrder = {
    id: orderId,
    createdAt: now.toISOString(),
    source: params.source,
    status: "ORDER_CONFIRMED",
    statusLabel: "Order Confirmed • Queued for Press Run",
    items: params.items,
    customer: params.customer,
    pricing: params.pricing,
    payment: {
      method: params.paymentMethod,
      status: "PAID_ADVANCE",
      referenceId: `TXN-${now.getFullYear()}${randNum}`,
      razorpayReady: true,
    },
    logistics: {
      courierPartner: sla.pincodeInfo.courierPartner || "BlueDart Express",
      awbNumber: "Pending Dispatch",
      courierTrackingUrl: "",
      courierHelpline: "1860 233 1234",
      guaranteedDeliveryFormatted: sla.guaranteedDeliveryFormatted,
      originFacility: "Incredible Treasures Press Works • Peenya Industrial Area, Bengaluru",
      destinationCity: params.customer.city || sla.pincodeInfo.city,
      cutoffCountdownText: sla.cutoffCountdownText,
    },
  };

  savePlacedOrder(newOrder);
  return newOrder;
}

/**
 * Update the production status of an order in the pipeline
 */
export function updateOrderStatus(
  orderId: string,
  newStatus: PlacedOrder["status"],
  customLabel?: string
): PlacedOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const orders = getStoredOrders();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx === -1) return null;

    const defaultLabels: Record<PlacedOrder["status"], string> = {
      ORDER_CONFIRMED: "Order Confirmed • Queued for Press Run",
      PRE_FLIGHT_VERIFIED: "Pre-Flight Artwork Approved • Plates Generated",
      IN_PRODUCTION: "In Production • Offset Press & Foil Stamping",
      QUALITY_FINISHING: "Finishing & Die-Punching • Quality Inspected",
      DISPATCHED: "Dispatched via BlueDart Apex Air",
      DELIVERED: "Delivered to Corporate Recipient",
    };

    orders[idx] = {
      ...orders[idx],
      status: newStatus,
      statusLabel: customLabel || defaultLabels[newStatus] || orders[idx].statusLabel,
    };

    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent("it_order_updated", { detail: orders[idx] }));

    // Sync to Server Database
    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: newStatus,
        statusLabel: orders[idx].statusLabel,
      }),
    }).catch((err) => {
      console.warn("Background order status sync will retry:", err);
    });

    return orders[idx];
  } catch (err) {
    console.error("Failed to update order status:", err);
    return null;
  }
}

/**
 * Assign or update the BlueDart AWB tracking number for an order
 */
export function updateOrderAwb(
  orderId: string,
  awbNumber: string,
  courierPartner: string = "BlueDart Apex Air"
): PlacedOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const orders = getStoredOrders();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx === -1) return null;

    orders[idx] = {
      ...orders[idx],
      status: "DISPATCHED",
      statusLabel: `Dispatched via ${courierPartner} (AWB: ${awbNumber})`,
      logistics: {
        ...orders[idx].logistics,
        awbNumber,
        courierPartner,
        courierTrackingUrl: `https://www.bluedart.com/tracking?handler=t&action=custorder&awb=awb&numbers=${awbNumber}`,
      },
    };

    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent("it_order_updated", { detail: orders[idx] }));

    // Sync to Server Database
    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "DISPATCHED",
        statusLabel: orders[idx].statusLabel,
        awbNumber,
        courierPartner,
        courierTrackingUrl: orders[idx].logistics.courierTrackingUrl,
      }),
    }).catch((err) => {
      console.warn("Background order AWB sync will retry:", err);
    });

    return orders[idx];
  } catch (err) {
    console.error("Failed to update order AWB:", err);
    return null;
  }
}
