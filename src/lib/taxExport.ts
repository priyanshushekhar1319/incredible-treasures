"use client";

import { PlacedOrder } from "@/lib/orderStore";
import { resolveHsnCode, calculateGstTaxSplit } from "@/lib/gstEngine";

/**
 * Standard Indian Razorpay Merchant Discount Rate (MDR):
 * Standard Payment Gateway Fee: 2.00% + 18% GST on MDR = 2.36% total deduction.
 */
export const RAZORPAY_MDR_RATE = 0.02;
export const GST_ON_MDR_RATE = 0.18;
export const EFFECTIVE_MDR_PERCENT = 2.36; // 2% + (2% * 18%) = 2.36%

export interface CaMonthEndSummary {
  periodMonth: string;
  totalOrders: number;
  grossTurnover: number;
  b2bTurnover: number;
  b2cTurnover: number;
  totalTaxableValue: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  totalGstLiability: number;
  totalMdrFeeDeducted: number;
  netBankSettlement: number;
  hsnSummary: Record<string, { count: number; taxable: number; tax: number }>;
}

/**
 * Computes complete Chartered Accountant month-end audit summary.
 */
export function computeCaMonthEndSummary(orders: PlacedOrder[], selectedMonth?: string): CaMonthEndSummary {
  const filtered = selectedMonth && selectedMonth !== "ALL"
    ? orders.filter((o) => o.createdAt.slice(0, 7) === selectedMonth)
    : orders;

  let grossTurnover = 0;
  let b2bTurnover = 0;
  let b2cTurnover = 0;
  let totalTaxableValue = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;

  const hsnSummary: Record<string, { count: number; taxable: number; tax: number }> = {};

  filtered.forEach((order) => {
    grossTurnover += order.pricing.grandTotal;

    const isB2B = Boolean(order.customer.gstin && order.customer.gstin.length >= 15);
    if (isB2B) {
      b2bTurnover += order.pricing.grandTotal;
    } else {
      b2cTurnover += order.pricing.grandTotal;
    }

    const state = (order.customer.state || "").toLowerCase();
    const gstin = (order.customer.gstin || "").trim();
    let stateCode = "29";
    if (gstin.length >= 2 && !isNaN(Number(gstin.slice(0, 2)))) {
      stateCode = gstin.slice(0, 2);
    } else if (state.includes("maharashtra")) {
      stateCode = "27";
    } else if (state.includes("delhi")) {
      stateCode = "07";
    }
    const isIntraState = stateCode === "29";

    order.items.forEach((item) => {
      const hsn = resolveHsnCode(item.title, item.categoryName);
      const isIncl = Boolean(item.isGstIncluded);
      const taxable = isIncl ? Math.round((item.totalPrice / 1.18) * 100) / 100 : item.totalPrice;
      totalTaxableValue += taxable;

      let cgst = 0;
      let sgst = 0;
      let igst = 0;

      if (isIntraState) {
        cgst = Math.round(taxable * 0.09 * 100) / 100;
        sgst = Math.round(taxable * 0.09 * 100) / 100;
        totalCgst += cgst;
        totalSgst += sgst;
      } else {
        igst = Math.round(taxable * 0.18 * 100) / 100;
        totalIgst += igst;
      }

      const totalItemTax = cgst + sgst + igst;

      if (!hsnSummary[hsn.code]) {
        hsnSummary[hsn.code] = { count: 0, taxable: 0, tax: 0 };
      }
      hsnSummary[hsn.code].count += item.quantity;
      hsnSummary[hsn.code].taxable += taxable;
      hsnSummary[hsn.code].tax += totalItemTax;
    });
  });

  const totalGstLiability = totalCgst + totalSgst + totalIgst;
  const totalMdrFeeDeducted = Math.round(grossTurnover * (EFFECTIVE_MDR_PERCENT / 100) * 100) / 100;
  const netBankSettlement = Math.round((grossTurnover - totalMdrFeeDeducted) * 100) / 100;

  return {
    periodMonth: selectedMonth || "All Recorded Periods",
    totalOrders: filtered.length,
    grossTurnover: Math.round(grossTurnover * 100) / 100,
    b2bTurnover: Math.round(b2bTurnover * 100) / 100,
    b2cTurnover: Math.round(b2cTurnover * 100) / 100,
    totalTaxableValue: Math.round(totalTaxableValue * 100) / 100,
    totalCgst: Math.round(totalCgst * 100) / 100,
    totalSgst: Math.round(totalSgst * 100) / 100,
    totalIgst: Math.round(totalIgst * 100) / 100,
    totalGstLiability: Math.round(totalGstLiability * 100) / 100,
    totalMdrFeeDeducted,
    netBankSettlement,
    hsnSummary,
  };
}

/**
 * Generates an official GSTR-1 compliant CSV audit tax report from orders.
 */
export function generateGstr1TaxCsv(orders: PlacedOrder[], selectedMonth?: string): string {
  const filtered = selectedMonth && selectedMonth !== "ALL"
    ? orders.filter((o) => o.createdAt.slice(0, 7) === selectedMonth)
    : orders;

  const headers = [
    "Invoice Number",
    "Invoice Date",
    "Customer Trade Name",
    "Contact Person",
    "Customer GSTIN",
    "Customer State",
    "Place of Supply Code",
    "Supply Classification",
    "HSN / SAC Code",
    "Product Description",
    "Quantity",
    "Taxable Value (INR)",
    "CGST Rate (%)",
    "Central Tax CGST (INR)",
    "SGST Rate (%)",
    "State Tax SGST (INR)",
    "IGST Rate (%)",
    "Integrated Tax IGST (INR)",
    "Total Invoice Value (INR)",
    "Razorpay Reference / Payment Method",
    "Reverse Charge (RCM)",
    "ITC Eligibility",
  ];

  const rows: string[][] = [];

  filtered.forEach((order) => {
    const invYear = new Date(order.createdAt).getFullYear();
    const invNumber = `INV-IT-${invYear}-${(order.id.replace(/\D/g, "") || "017378").slice(-6)}`;
    const invDate = new Date(order.createdAt).toISOString().slice(0, 10);

    const buyerGstin = order.customer.gstin?.trim() || "B2C_UNREGISTERED";
    let stateCode = "29";
    if (buyerGstin.length >= 2 && !isNaN(Number(buyerGstin.slice(0, 2)))) {
      stateCode = buyerGstin.slice(0, 2);
    } else if (order.customer.state.toLowerCase().includes("maharashtra")) {
      stateCode = "27";
    } else if (order.customer.state.toLowerCase().includes("delhi")) {
      stateCode = "07";
    }

    const isIntraState = stateCode === "29";

    order.items.forEach((item) => {
      const hsn = resolveHsnCode(item.title, item.categoryName);
      const isIncl = Boolean(item.isGstIncluded);

      const taxableValue = isIncl
        ? Math.round((item.totalPrice / 1.18) * 100) / 100
        : item.totalPrice;

      const cgstRate = isIntraState ? 9 : 0;
      const sgstRate = isIntraState ? 9 : 0;
      const igstRate = isIntraState ? 0 : 18;

      const cgstAmt = isIntraState ? Math.round(taxableValue * 0.09 * 100) / 100 : 0;
      const sgstAmt = isIntraState ? Math.round(taxableValue * 0.09 * 100) / 100 : 0;
      const igstAmt = !isIntraState ? Math.round(taxableValue * 0.18 * 100) / 100 : 0;

      const lineTotal = isIncl
        ? item.totalPrice
        : isIntraState
        ? Math.round((taxableValue + cgstAmt + sgstAmt) * 100) / 100
        : Math.round((taxableValue + igstAmt) * 100) / 100;

      rows.push([
        invNumber,
        invDate,
        `"${(order.customer.companyName || "Retail Customer").replace(/"/g, '""')}"`,
        `"${order.customer.fullName.replace(/"/g, '""')}"`,
        buyerGstin,
        `"${order.customer.state}"`,
        stateCode,
        isIntraState ? "Intra-State Supply (CGST + SGST)" : "Inter-State Supply (IGST)",
        hsn.code,
        `"${item.title.replace(/"/g, '""')}"`,
        String(item.quantity),
        taxableValue.toFixed(2),
        `${cgstRate}%`,
        cgstAmt.toFixed(2),
        `${sgstRate}%`,
        sgstAmt.toFixed(2),
        `${igstRate}%`,
        igstAmt.toFixed(2),
        lineTotal.toFixed(2),
        `"${order.payment.method.toUpperCase()} • ${order.payment.referenceId || "RZP-AUTO"}"`,
        "NO",
        buyerGstin !== "B2C_UNREGISTERED" ? "YES (Section 16)" : "NO (B2C)",
      ]);
    });
  });

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
}

/**
 * Generates Razorpay Gateway Settlement Reconciliation CSV.
 */
export function generateRazorpaySettlementCsv(orders: PlacedOrder[], selectedMonth?: string): string {
  const filtered = selectedMonth && selectedMonth !== "ALL"
    ? orders.filter((o) => o.createdAt.slice(0, 7) === selectedMonth)
    : orders;

  const headers = [
    "Order Reference",
    "Order Date",
    "Razorpay Payment ID",
    "Payment Method",
    "Customer Name",
    "Gross Order Total (INR)",
    "Gateway Base Fee 2% (INR)",
    "GST on MDR 18% (INR)",
    "Total Gateway Deduction 2.36% (INR)",
    "Net Credit to Bank Account (INR)",
    "Bank Settlement Status",
  ];

  const rows: string[][] = [];

  filtered.forEach((o) => {
    const gross = o.pricing.grandTotal;
    const baseFee = Math.round(gross * 0.02 * 100) / 100;
    const gstOnFee = Math.round(baseFee * 0.18 * 100) / 100;
    const totalMdr = Math.round((baseFee + gstOnFee) * 100) / 100;
    const netCredit = Math.round((gross - totalMdr) * 100) / 100;
    const payId = o.payment.referenceId?.startsWith("pay_")
      ? o.payment.referenceId
      : `pay_auto_${(o.id.replace(/\D/g, "") || "849201").slice(-8)}`;

    rows.push([
      o.id,
      new Date(o.createdAt).toISOString().slice(0, 10),
      payId,
      o.payment.method.toUpperCase(),
      `"${o.customer.fullName.replace(/"/g, '""')}"`,
      gross.toFixed(2),
      baseFee.toFixed(2),
      gstOnFee.toFixed(2),
      totalMdr.toFixed(2),
      netCredit.toFixed(2),
      o.payment.status === "PAID_ADVANCE" ? "SETTLED_TO_HDFC_CURRENT" : "PENDING_RECONCILIATION",
    ]);
  });

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
}

/**
 * Triggers browser download of GSTR-1 CSV audit report.
 */
export function downloadGstr1TaxReport(orders: PlacedOrder[], selectedMonth?: string): void {
  const csvData = generateGstr1TaxCsv(orders, selectedMonth);
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  const dateStr = selectedMonth || new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `Incredible_Treasures_GSTR1_Sales_Register_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers browser download of Razorpay Settlement Reconciliation CSV.
 */
export function downloadRazorpaySettlementReport(orders: PlacedOrder[], selectedMonth?: string): void {
  const csvData = generateRazorpaySettlementCsv(orders, selectedMonth);
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  const dateStr = selectedMonth || new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `Incredible_Treasures_Razorpay_Settlement_Audit_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates an executive dispatch message for the Chartered Accountant.
 */
export function generateCaEmailBody(summary: CaMonthEndSummary): string {
  return `CONFIDENTIAL: MONTH-END GST AUDIT & RECONCILIATION DOSSIER
Entity: Incredible Treasures Private Limited
GSTIN: 29AAKFI2392F1Z5 • State: Karnataka (Code: 29)
Filing Period: ${summary.periodMonth}

Dear CA Audit Team,

Please find enclosed the 31st Month-End GST Sales Register and Gateway Reconciliation Summary:

1. TURNOVER BREAKDOWN:
- Gross Order Turnover: ₹${summary.grossTurnover.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Registered B2B Turnover (with buyer GSTIN): ₹${summary.b2bTurnover.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Consumer B2C Turnover: ₹${summary.b2cTurnover.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Total Processed Orders: ${summary.totalOrders}

2. STATUTORY GST LIABILITY (18% COMPLIANT):
- Intra-State Central Tax (CGST 9%): ₹${summary.totalCgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Intra-State State Tax (SGST 9%): ₹${summary.totalSgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Inter-State Integrated Tax (IGST 18%): ₹${summary.totalIgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Total Output GST Liability: ₹${summary.totalGstLiability.toLocaleString("en-IN", { minimumFractionDigits: 2 })}

3. RAZORPAY GATEWAY & HDFC SETTLEMENT AUDIT:
- Gross Captured via Razorpay: ₹${summary.grossTurnover.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Razorpay MDR Deductions (2.36% inc. GST): ₹${summary.totalMdrFeeDeducted.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
- Net Expected Bank Credit to HDFC A/c: ₹${summary.netBankSettlement.toLocaleString("en-IN", { minimumFractionDigits: 2 })}

4. HSN CLASSIFICATION SUMMARY:
${Object.entries(summary.hsnSummary)
  .map(([hsn, data]) => `  • HSN ${hsn}: ${data.count} units | Taxable: ₹${data.taxable.toLocaleString("en-IN")} | GST: ₹${data.tax.toLocaleString("en-IN")}`)
  .join("\n")}

This report has been synthesized autonomously from the Incredible Treasures Master Factory ERP.
Please proceed with the GSTR-1 & GSTR-3B filings accordingly.`;
}
