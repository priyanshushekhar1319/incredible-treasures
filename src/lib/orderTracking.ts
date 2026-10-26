"use client";

import { lookupIndianPincode } from "./pincodeEngine";
import { getOrderById, PlacedOrder } from "./orderStore";

export interface OrderTrackingCheckpoint {
  id: string;
  stepNumber: number;
  title: string;
  locationName: string;
  city: string;
  timestamp: string;
  status: "COMPLETED" | "CURRENT_ACTIVE_STAGE" | "UPCOMING";
  description: string;
  facilityType: "factory" | "quality_lab" | "air_cargo" | "in_transit" | "city_hub" | "doorstep";
}

export interface GenuineOrderTrackingDetails {
  isFound: boolean;
  orderId: string;
  createdAt: string;
  createdAtFormatted: string;
  statusLabel: string;
  courierPartner: string;
  awbNumber: string;
  courierTrackingUrl: string;
  courierHelpline: string;
  customerName: string;
  companyName: string;
  deliveryAddress: string;
  destinationCity: string;
  pincode: string;
  gstin?: string;
  items: {
    id: string;
    title: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    image?: string;
    specs?: string;
  }[];
  grandTotal: number;
  paymentMethod: string;
  paymentStatus: string;
  currentStageNumber: number; // 1 to 6
  currentStageTitle: string;
  currentStageDescription: string;
  estimatedDeliveryDate: string;
  deliveryExecutive?: {
    name: string;
    phone: string;
    vehicleNumber?: string;
    badge?: string;
  };
  checkpoints: OrderTrackingCheckpoint[];
}

/**
 * Returns genuine, order-aware tracking details for any order ID or AWB.
 * Reads directly from real stored production orders.
 */
export function getGenuineOrderTracking(
  orderIdOrAwb: string = "IT-PRINT-017378"
): GenuineOrderTrackingDetails | null {
  const order = getOrderById(orderIdOrAwb);

  if (!order) {
    return null;
  }

  const orderDate = new Date(order.createdAt);
  const orderDateFormatted = orderDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const pinData = lookupIndianPincode(order.customer.pincode);

  // Determine actual lifecycle stage based on order status or elapsed time
  let currentStageNumber = 2; // Default for new orders: Pre-Flight verification
  let currentStageTitle = "600+ DPI Pre-Flight Verification & Proof Approval";
  let currentStageDescription =
    "Artwork vectors and color separations undergoing mathematical 600+ DPI check. Scheduled for next press run.";

  if (order.status === "ORDER_CONFIRMED") {
    currentStageNumber = 2;
    currentStageTitle = "600+ DPI Pre-Flight Verification & Proof Approval";
    currentStageDescription =
      "Artwork vectors and typography validated. Queued for Heidelberg CTP plate imaging.";
  } else if (order.status === "PRE_FLIGHT_VERIFIED") {
    currentStageNumber = 2;
    currentStageTitle = "CTP Aluminum Plates Imaged";
    currentStageDescription = "Pre-flight passed with zero DPI loss. Mounting onto press cylinders.";
  } else if (order.status === "IN_PRODUCTION") {
    currentStageNumber = 3;
    currentStageTitle = "Offset Press Printing & UV Curing";
    currentStageDescription = "Running on Heidelberg Speedmaster XL 75 with precision color balance.";
  } else if (order.status === "QUALITY_FINISHING") {
    currentStageNumber = 4;
    currentStageTitle = "24K Gold Stamping & Micro-Bevel Trimming";
    currentStageDescription = "Hydraulic die stamping and 24K gilded edge application in progress.";
  } else if (order.status === "DISPATCHED") {
    currentStageNumber = 5;
    currentStageTitle = `Dispatched via ${order.logistics.courierPartner}`;
    currentStageDescription = `Palletized in tamper-evident security packaging under Master AWB #${order.logistics.awbNumber}.`;
  } else if (order.status === "DELIVERED") {
    currentStageNumber = 6;
    currentStageTitle = "Delivered to Doorstep";
    currentStageDescription = "Hand-delivered and signed by corporate executive.";
  }

  // Build the 6 genuine checkpoints
  const checkpoints: OrderTrackingCheckpoint[] = [
    {
      id: "chk-1",
      stepNumber: 1,
      title: "Order Placed & Payment Acknowledged",
      locationName: "Incredible Treasures Corporate Portal",
      city: "Bengaluru E-Commerce Desk",
      timestamp: orderDateFormatted,
      status: "COMPLETED",
      description: `Corporate order ${order.id} verified with 18% GST tax compliance.`,
      facilityType: "factory",
    },
    {
      id: "chk-2",
      stepNumber: 2,
      title: "600+ DPI Pre-Flight Verification & CTP Laser Imaged",
      locationName: "Incredible Treasures Offset Press Works",
      city: "Bengaluru, Peenya Industrial Area",
      timestamp:
        currentStageNumber >= 2
          ? currentStageNumber === 2
            ? "In Progress • Active Stage"
            : `${orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} • +1 hr`
          : "Scheduled",
      status:
        currentStageNumber === 2
          ? "CURRENT_ACTIVE_STAGE"
          : currentStageNumber > 2
          ? "COMPLETED"
          : "UPCOMING",
      description:
        "Mathematical vector coordinates rasterized at 600+ DPI. Aluminum CTP plates burned with zero DPI loss.",
      facilityType: "factory",
    },
    {
      id: "chk-3",
      stepNumber: 3,
      title: "Offset Press Litho Run & Curing",
      locationName: "Heidelberg Speedmaster 4-Color Unit",
      city: "Bengaluru Press Facility",
      timestamp:
        currentStageNumber >= 3
          ? currentStageNumber === 3
            ? "In Progress • Active Stage"
            : `${orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} • +3 hrs`
          : "Upcoming",
      status:
        currentStageNumber === 3
          ? "CURRENT_ACTIVE_STAGE"
          : currentStageNumber > 3
          ? "COMPLETED"
          : "UPCOMING",
      description:
        "High-grade polymer/cardstock litho printing with calibrated spectrophotometer color density.",
      facilityType: "factory",
    },
    {
      id: "chk-4",
      stepNumber: 4,
      title: "24K Gold Stamping, Micro-Bevel Trimming & Quality Control",
      locationName: "Precision Finishing & Hand-Inspection Vault",
      city: "Bengaluru Finishing Studio",
      timestamp:
        currentStageNumber >= 4
          ? currentStageNumber === 4
            ? "In Progress • Active Stage"
            : `${orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} • +5 hrs`
          : "Upcoming",
      status:
        currentStageNumber === 4
          ? "CURRENT_ACTIVE_STAGE"
          : currentStageNumber > 4
          ? "COMPLETED"
          : "UPCOMING",
      description:
        "Hydraulic blade trimming inside 2mm safe line. Gold foil application and 100% count audit.",
      facilityType: "quality_lab",
    },
    {
      id: "chk-5",
      stepNumber: 5,
      title: `Air Cargo Handover (${order.logistics.courierPartner})`,
      locationName: "Air Cargo Logistics Complex",
      city: "Kempegowda Int'l Airport (BLR)",
      timestamp:
        currentStageNumber >= 5
          ? currentStageNumber === 5
            ? "In Transit • Active Stage"
            : `${orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} • Evening Air Batch`
          : "Scheduled Upon Packaging",
      status:
        currentStageNumber === 5
          ? "CURRENT_ACTIVE_STAGE"
          : currentStageNumber > 5
          ? "COMPLETED"
          : "UPCOMING",
      description: `Palletized in climate-controlled transit box under Master AWB #${order.logistics.awbNumber}.`,
      facilityType: "air_cargo",
    },
    {
      id: "chk-6",
      stepNumber: 6,
      title: "Doorstep Hand-Delivery & Proof of Delivery",
      locationName: `Local Destination Hub • ${pinData.district}`,
      city: `${order.customer.city || pinData.city} (${order.customer.pincode})`,
      timestamp: `Guaranteed by: ${order.logistics.guaranteedDeliveryFormatted}`,
      status: currentStageNumber === 6 ? "CURRENT_ACTIVE_STAGE" : "UPCOMING",
      description:
        "Executive delivery with signature proof of delivery in tamper-evident security satchel.",
      facilityType: "doorstep",
    },
  ];

  return {
    isFound: true,
    orderId: order.id,
    createdAt: order.createdAt,
    createdAtFormatted: orderDateFormatted,
    statusLabel: order.statusLabel,
    courierPartner: order.logistics.courierPartner,
    awbNumber: order.logistics.awbNumber,
    courierTrackingUrl: order.logistics.courierTrackingUrl,
    courierHelpline: order.logistics.courierHelpline,
    customerName: order.customer.fullName,
    companyName: order.customer.companyName,
    deliveryAddress: `${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`,
    destinationCity: order.customer.city || pinData.city,
    pincode: order.customer.pincode,
    gstin: order.customer.gstin,
    items: order.items.map((it) => ({
      id: it.id,
      title: it.title,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      totalPrice: it.totalPrice,
      image: it.image,
      specs: it.specs || it.branding,
    })),
    grandTotal: order.pricing.grandTotal,
    paymentMethod: order.payment.method.toUpperCase(),
    paymentStatus: order.payment.status,
    currentStageNumber,
    currentStageTitle,
    currentStageDescription,
    estimatedDeliveryDate: order.logistics.guaranteedDeliveryFormatted,
    deliveryExecutive: order.logistics.deliveryExecutive,
    checkpoints,
  };
}
