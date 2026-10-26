"use client";

import { lookupIndianPincode, PincodeLookupResult } from "./pincodeEngine";

export interface ProductionMilestone {
  step: number;
  name: string;
  stage: "prepress" | "printing" | "finishing" | "dispatch" | "delivery";
  description: string;
  hubLocation: string;
  estimatedDate: string;
  estimatedTime: string;
  isComplete: boolean;
  isActive: boolean;
}

export interface DeliverySlaResult {
  pincodeInfo: PincodeLookupResult;
  shippingTier: "standard" | "priority_vip";
  productionDays: number;
  transitDays: number;
  totalDays: number;
  guaranteedDeliveryDate: string;
  guaranteedDeliveryFormatted: string;
  dispatchDateFormatted: string;
  cutoffCountdownText: string;
  milestones: ProductionMilestone[];
}

/**
 * Calculates accurate factory dispatch date and guaranteed delivery date.
 */
export function calculateDeliverySla(
  pincode: string,
  shippingTier: "standard" | "priority_vip" = "standard",
  orderDate: Date = new Date()
): DeliverySlaResult {
  const pincodeInfo = lookupIndianPincode(pincode);

  // In standard tier: 2 days production (plate burning + offset + UV/finishing)
  // In Priority VIP tier: 1 day priority production lane
  const productionDays = shippingTier === "priority_vip" ? 1 : 2;
  const transitDays =
    shippingTier === "priority_vip"
      ? pincodeInfo.priorityTransitDays
      : pincodeInfo.standardTransitDays;

  const totalDays = productionDays + transitDays;

  // Add business days (skipping Sundays for printing press schedule)
  const dispatchDate = new Date(orderDate);
  let daysAdded = 0;
  while (daysAdded < productionDays) {
    dispatchDate.setDate(dispatchDate.getDate() + 1);
    if (dispatchDate.getDay() !== 0) {
      daysAdded++;
    }
  }

  const deliveryDate = new Date(dispatchDate);
  let transitDaysAdded = 0;
  while (transitDaysAdded < transitDays) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    if (deliveryDate.getDay() !== 0) {
      transitDaysAdded++;
    }
  }

  const dispatchDateFormatted = dispatchDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const guaranteedDeliveryFormatted = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Calculate cutoff timer (Orders placed before 5:00 PM IST enter today's queue)
  const currentHour = orderDate.getHours();
  let cutoffCountdownText = "Order within next 3 hrs for Today's Plate Queue";
  if (currentHour >= 17) {
    cutoffCountdownText = "Orders queue for Tomorrow Morning 8:00 AM Press Run";
  } else {
    const hoursLeft = Math.max(1, 17 - currentHour);
    cutoffCountdownText = `Order within ${hoursLeft} hr${hoursLeft > 1 ? "s" : ""} to guarantee ${shippingTier === "priority_vip" ? "Tomorrow" : "Next-Day"} Dispatch!`;
  }

  // Milestones progression
  const d0 = new Date(orderDate);
  const d1 = new Date(dispatchDate);
  const dDelivery = new Date(deliveryDate);

  const milestones: ProductionMilestone[] = [
    {
      step: 1,
      name: "Vector Pre-Flight & 600+ DPI Plate Burning",
      stage: "prepress",
      description: "Automated RIP rasterization & laser CTP offset plate imaging",
      hubLocation: "Bengaluru Peenya Press Hub",
      estimatedDate: d0.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      estimatedTime: "Today • 6:30 PM",
      isComplete: true,
      isActive: false,
    },
    {
      step: 2,
      name: "400µ PVC Offset Print & 24K Gold Foiling",
      stage: "printing",
      description: "Heidelberg 4-Color commercial print run with hot foil specular gleam",
      hubLocation: "Bengaluru Press Facility • Unit 2",
      estimatedDate: d1.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      estimatedTime: "Tomorrow • 11:00 AM",
      isComplete: false,
      isActive: true,
    },
    {
      step: 3,
      name: "Mechanical Trimming, Bleed Cut & 24K Gilded Edge",
      stage: "finishing",
      description: "High-precision blade trimming to 3.5\"x2.0\" with luxury beveled edge",
      hubLocation: "Bengaluru Finishing Studio",
      estimatedDate: d1.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      estimatedTime: "Tomorrow • 4:00 PM",
      isComplete: false,
      isActive: false,
    },
    {
      step: 4,
      name: `Air Cargo Dispatch via ${pincodeInfo.courierPartner}`,
      stage: "dispatch",
      description: `Sealed in tamper-proof executive packaging with BlueDart AWB docket`,
      hubLocation: "Kempegowda International Airport Air Cargo Terminal 2",
      estimatedDate: dispatchDateFormatted,
      estimatedTime: "Evening • 8:30 PM",
      isComplete: false,
      isActive: false,
    },
    {
      step: 5,
      name: `Doorstep Executive Hand-Delivery to ${pincodeInfo.city}`,
      stage: "delivery",
      description: `Guaranteed delivery to ${pincodeInfo.city}, ${pincodeInfo.pincode} (${pincodeInfo.state})`,
      hubLocation: `${pincodeInfo.city} Local Destination Hub`,
      estimatedDate: guaranteedDeliveryFormatted,
      estimatedTime: "By 2:00 PM",
      isComplete: false,
      isActive: false,
    },
  ];

  return {
    pincodeInfo,
    shippingTier,
    productionDays,
    transitDays,
    totalDays,
    guaranteedDeliveryDate: deliveryDate.toISOString(),
    guaranteedDeliveryFormatted,
    dispatchDateFormatted,
    cutoffCountdownText,
    milestones,
  };
}
