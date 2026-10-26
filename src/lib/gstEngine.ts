"use client";

import { lookupIndianPincode } from "./pincodeEngine";

export interface SupplierTaxProfile {
  legalName: string;
  tradeName: string;
  cin: string;
  pan: string;
  gstin: string;
  state: string;
  stateCode: string;
  registeredAddress: string;
  facilityAddress: string;
  email: string;
  phone: string;
  bankDetails: {
    bankName: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
    upiId: string;
  };
}

export const SUPPLIER_PROFILE: SupplierTaxProfile = {
  legalName: "Incredible Treasures Private Limited",
  tradeName: "Incredible Treasures Luxury Studio & Press Works",
  cin: "U22219KA2024PTC189201",
  pan: "AAKFI2392F",
  gstin: "29AAKFI2392F1Z5",
  state: "Karnataka",
  stateCode: "29",
  registeredAddress: "42, Commercial Street, Tasker Town, Bengaluru, Karnataka - 560001",
  facilityAddress: "Offset Press Works Unit 3, Peenya 2nd Stage, Bengaluru, Karnataka - 560058",
  email: "billing@incredibletreasures.com",
  phone: "+91 99450 39266",
  bankDetails: {
    bankName: "HDFC Bank Limited",
    branch: "MG Road Corporate Branch, Bengaluru",
    accountName: "Incredible Treasures Private Limited",
    accountNumber: "50200084920145",
    ifscCode: "HDFC0000140",
    accountType: "Current Account",
    upiId: "incredibletreasures@hdfcbank",
  },
};

export const HSN_DIRECTORY: Record<string, { code: string; description: string; rate: number }> = {
  visiting_cards: {
    code: "4911",
    description: "Other Printed Matter - Luxury Polymer & PVC Visiting Cards",
    rate: 18,
  },
  paper_cards: {
    code: "4909",
    description: "Printed or Illustrated Cards - Soft Touch & Raised Spot UV",
    rate: 18,
  },
  drinkware: {
    code: "6912",
    description: "Ceramic Tableware & Corporate Mugs - 350ml Grade-A",
    rate: 18,
  },
  apparel: {
    code: "6105",
    description: "Men's Knitted Corporate Polos & Executive T-Shirts",
    rate: 18,
  },
  packaging: {
    code: "4819",
    description: "Cartons, Boxes & Cases of Corrugated Paper or Board",
    rate: 18,
  },
  envelopes: {
    code: "4817",
    description: "Envelopes & Letter Cards of Paper - 120 GSM Cotton Deckle",
    rate: 18,
  },
  accessories: {
    code: "7326",
    description: "Articles of Stainless Steel - Laser-Engraved Executive Cases",
    rate: 18,
  },
};

/**
 * Returns the legal HSN code for any product title or category.
 */
export function resolveHsnCode(productTitle: string, categoryName: string = ""): {
  code: string;
  description: string;
  rate: number;
} {
  const t = (productTitle + " " + categoryName).toLowerCase();

  if (t.includes("mug") || t.includes("ceramic") || t.includes("cup")) {
    return HSN_DIRECTORY.drinkware;
  }
  if (t.includes("t-shirt") || t.includes("polo") || t.includes("apparel") || t.includes("shirt")) {
    return HSN_DIRECTORY.apparel;
  }
  if (t.includes("box") || t.includes("carton") || t.includes("packaging")) {
    return HSN_DIRECTORY.packaging;
  }
  if (t.includes("envelope")) {
    return HSN_DIRECTORY.envelopes;
  }
  if (t.includes("case") || t.includes("steel")) {
    return HSN_DIRECTORY.accessories;
  }
  if (t.includes("paper") || t.includes("velvet") || t.includes("cotton")) {
    return HSN_DIRECTORY.paper_cards;
  }

  // Default to 4911 for all visiting cards and printed stationery
  return HSN_DIRECTORY.visiting_cards;
}

export interface GstTaxSplit {
  taxType: "INTRA_STATE" | "INTER_STATE";
  taxTypeLabel: string;
  sellerStateCode: string;
  buyerStateCode: string;
  placeOfSupply: string;
  isKarnatakaBuyer: boolean;
  taxableAmount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  totalGst: number;
  grandTotal: number;
}

/**
 * Calculates genuine CGST/SGST vs IGST split based on buyer state code.
 * Seller state is Karnataka (29).
 */
export function calculateGstTaxSplit(
  taxableAmount: number,
  buyerStateCode: string = "29",
  buyerStateName: string = "Karnataka"
): GstTaxSplit {
  const isKarnatakaBuyer = buyerStateCode === "29";
  const amount = Math.max(0, Math.round(taxableAmount * 100) / 100);

  if (isKarnatakaBuyer) {
    const cgstAmount = Math.round(amount * 0.09 * 100) / 100;
    const sgstAmount = Math.round(amount * 0.09 * 100) / 100;
    const totalGst = Math.round((cgstAmount + sgstAmount) * 100) / 100;

    return {
      taxType: "INTRA_STATE",
      taxTypeLabel: "Intra-State Supply (CGST 9% + SGST 9%)",
      sellerStateCode: "29",
      buyerStateCode: "29",
      placeOfSupply: "29 - Karnataka",
      isKarnatakaBuyer: true,
      taxableAmount: amount,
      cgstRate: 9,
      cgstAmount,
      sgstRate: 9,
      sgstAmount,
      igstRate: 0,
      igstAmount: 0,
      totalGst,
      grandTotal: Math.round((amount + totalGst) * 100) / 100,
    };
  } else {
    const igstAmount = Math.round(amount * 0.18 * 100) / 100;

    return {
      taxType: "INTER_STATE",
      taxTypeLabel: "Inter-State Supply (IGST 18%)",
      sellerStateCode: "29",
      buyerStateCode,
      placeOfSupply: `${buyerStateCode} - ${buyerStateName}`,
      isKarnatakaBuyer: false,
      taxableAmount: amount,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 18,
      igstAmount,
      totalGst: igstAmount,
      grandTotal: Math.round((amount + igstAmount) * 100) / 100,
    };
  }
}

/**
 * Validates 15-digit Indian GSTIN format and extracts State Code.
 */
export function validateGstin(gstin: string): {
  isValid: boolean;
  stateCode: string;
  pan: string;
  error?: string;
} {
  const clean = (gstin || "").trim().toUpperCase();
  if (!clean) {
    return { isValid: false, stateCode: "", pan: "", error: "GSTIN cannot be empty" };
  }

  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!regex.test(clean)) {
    return {
      isValid: false,
      stateCode: clean.slice(0, 2),
      pan: clean.slice(2, 12),
      error: "Invalid 15-digit GSTIN pattern. Expected format: 29AAKFI2392F1Z5",
    };
  }

  return {
    isValid: true,
    stateCode: clean.slice(0, 2),
    pan: clean.slice(2, 12),
  };
}

/**
 * Converts Indian Rupee number into legal words (Lakhs, Thousands, Hundreds).
 */
export function numberToWordsIndian(num: number): string {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const n = Math.floor(num);
  if (n === 0) return "Zero Rupees Only";

  const inWords = (val: number): string => {
    let str = "";
    if (val > 19) {
      str += b[Math.floor(val / 10)] + (val % 10 !== 0 ? " " + a[val % 10] : "");
    } else {
      str += a[val];
    }
    return str;
  };

  let words = "";

  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred = Math.floor((n % 1000) / 100);
  const rest = Math.floor(n % 100);

  if (crore > 0) words += inWords(crore) + " Crore ";
  if (lakh > 0) words += inWords(lakh) + " Lakh ";
  if (thousand > 0) words += inWords(thousand) + " Thousand ";
  if (hundred > 0) words += a[hundred] + " Hundred ";
  if (rest > 0) words += (words !== "" ? "and " : "") + inWords(rest) + " ";

  return "INR " + words.trim() + " Only";
}
