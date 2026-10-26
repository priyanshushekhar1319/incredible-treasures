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

// Pre-seeded realistic orders for demonstration & client lookup
const DEFAULT_DEMO_ORDERS: PlacedOrder[] = [
  {
    id: "IT-PRINT-017378",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(), // 36 hours ago (Dispatched stage)
    source: "studio",
    status: "DISPATCHED",
    statusLabel: "Dispatched via BlueDart Apex Air",
    items: [
      {
        id: "item-demo-1",
        productId: "pvc-regular-glossy",
        title: "400-Micron Luxury Glossy PVC Visiting Cards (500 pcs)",
        categoryName: "Visiting Cards",
        quantity: 500,
        unitPrice: 5.0,
        totalPrice: 2500,
        image: "/images/hero-banner-1.png",
        branding: "24K Gold Stamped • Rounded Corners",
        specs: "Dual-Face Custom Layout • Mahi Kapoor (Managing Director)",
        isGstIncluded: true,
      },
    ],
    customer: {
      fullName: "Mahi Kapoor",
      companyName: "Incredible Treasures Luxury Studio",
      phone: "+91 99450 39266",
      email: "mahi.kapoor@incredibletreasures.com",
      address: "42, Commercial Street, Tasker Town",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      gstin: "29AAKFI2392F1Z5",
    },
    pricing: {
      subtotal: 2118.64,
      gstAmount: 381.36,
      shippingFee: 0,
      shippingTier: "standard",
      couponDiscount: 0,
      grandTotal: 2500,
    },
    payment: {
      method: "upi",
      status: "PAID_ADVANCE",
      referenceId: "UPI-TXN-9945038192",
      razorpayReady: true,
    },
    logistics: {
      courierPartner: "BlueDart Apex Air",
      awbNumber: "BD-017378560",
      courierTrackingUrl:
        "https://www.bluedart.com/tracking?handler=t&action=custorder&awb=awb&numbers=BD-017378560",
      courierHelpline: "1860 233 1234",
      guaranteedDeliveryFormatted: "Tomorrow by 01:30 PM",
      originFacility: "Incredible Treasures Offset Press Works • Peenya Industrial Area, Bengaluru",
      destinationCity: "Bengaluru",
      cutoffCountdownText: "Dispatched on schedule",
      deliveryExecutive: {
        name: "Rameshwar Rao (BlueDart Prime Lead)",
        phone: "+91 98450 18274",
        vehicleNumber: "KA-04-BD-8921",
        badge: "BlueDart Air Verified Specialist",
      },
    },
  },
  {
    id: "IT-PRINT-018241",
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), // 4 hours ago (In Production stage)
    source: "ready_made_storefront",
    status: "IN_PRODUCTION",
    statusLabel: "In Production • Offset Press & Foil Stamping",
    items: [
      {
        id: "item-demo-2",
        productId: "mug-matte-black",
        title: "Executive Ceramic Matte Black Mugs (100 pcs)",
        categoryName: "Ceramic Mugs",
        quantity: 100,
        unitPrice: 280,
        totalPrice: 28000,
        image: "/images/hero-banner-3.png",
        branding: "Gold Leaf Screen Printed • Grade-A Ceramic",
        specs: "350ml Ceramic Mug • Corporate Logo Imprint",
        isGstIncluded: false,
      },
    ],
    customer: {
      fullName: "Anand Singhania",
      companyName: "Singhania FinCorp HQ",
      phone: "+91 98201 44820",
      email: "anand.s@singhaniafincorp.com",
      address: "Level 8, Platina Tower, G-Block, Bandra Kurla Complex",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      gstin: "27AAACS1482E1Z8",
    },
    pricing: {
      subtotal: 28000,
      gstAmount: 5040,
      shippingFee: 0,
      shippingTier: "priority_vip",
      couponDiscount: 2800,
      grandTotal: 30240,
    },
    payment: {
      method: "card",
      status: "PAID_ADVANCE",
      referenceId: "CARD-AUTH-88291039",
      razorpayReady: true,
    },
    logistics: {
      courierPartner: "BlueDart Apex Air",
      awbNumber: "BD-018241400",
      courierTrackingUrl:
        "https://www.bluedart.com/tracking?handler=t&action=custorder&awb=awb&numbers=BD-018241400",
      courierHelpline: "1860 233 1234",
      guaranteedDeliveryFormatted: "In 2 Business Days",
      originFacility: "Incredible Treasures Ceramic Print Line • Bengaluru",
      destinationCity: "Mumbai",
      cutoffCountdownText: "Press curing completed",
      deliveryExecutive: {
        name: "Vikram Jadhav (BlueDart Mumbai Prime)",
        phone: "+91 98202 81920",
        vehicleNumber: "MH-02-BD-1829",
        badge: "BlueDart BKC Priority Courier",
      },
    },
  },
];

/**
 * Retrieve all placed orders from localStorage, merged with demo orders.
 */
export function getStoredOrders(): PlacedOrder[] {
  if (typeof window === "undefined") return DEFAULT_DEMO_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!raw) return DEFAULT_DEMO_ORDERS;
    const parsed: PlacedOrder[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_DEMO_ORDERS;

    // Merge: user's real placed orders first, followed by default demos
    const userOrderIds = new Set(parsed.map((o) => o.id));
    const unseeded = DEFAULT_DEMO_ORDERS.filter((o) => !userOrderIds.has(o.id));
    return [...parsed, ...unseeded];
  } catch {
    return DEFAULT_DEMO_ORDERS;
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
 * Save a newly placed order to localStorage.
 */
export function savePlacedOrder(order: PlacedOrder): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredOrders().filter((o) => o.id !== order.id);
    const updated = [order, ...existing];
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("it_order_placed", { detail: order }));
  } catch (err) {
    console.error("Failed to save placed order to localStorage:", err);
  }
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
      courierPartner: sla.pincodeInfo.courierPartner,
      awbNumber,
      courierTrackingUrl: `https://www.bluedart.com/tracking?handler=t&action=custorder&awb=awb&numbers=${awbNumber}`,
      courierHelpline: "1860 233 1234",
      guaranteedDeliveryFormatted: sla.guaranteedDeliveryFormatted,
      originFacility: "Incredible Treasures Press Works • Peenya Industrial Area, Bengaluru",
      destinationCity: params.customer.city || sla.pincodeInfo.city,
      cutoffCountdownText: sla.cutoffCountdownText,
      deliveryExecutive: {
        name: "Rameshwar Rao (BlueDart Lead)",
        phone: "+91 98450 18274",
        vehicleNumber: "KA-04-BD-8921",
        badge: "BlueDart Air Verified Specialist",
      },
    },
  };

  savePlacedOrder(newOrder);
  return newOrder;
}
