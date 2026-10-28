"use client";

import { PlacedOrder } from "@/lib/orderStore";
import { resolveHsnCode, calculateGstTaxSplit } from "@/lib/gstEngine";

/**
 * Generates an official GSTR-1 compliant CSV audit tax report from orders.
 */
export function generateGstr1TaxCsv(orders: PlacedOrder[]): string {
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

  orders.forEach((order) => {
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

      // Derive taxable value: If inclusive, back-calculate (price / 1.18)
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
        `"${order.customer.companyName.replace(/"/g, '""')}"`,
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
        `"${order.payment.method.toUpperCase()} • ${order.payment.referenceId}"`,
        "NO",
        buyerGstin !== "B2C_UNREGISTERED" ? "YES (Section 16)" : "NO (B2C)",
      ]);
    });
  });

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
  return csvContent;
}

/**
 * Triggers browser download of GSTR-1 CSV audit report.
 */
export function downloadGstr1TaxReport(orders: PlacedOrder[]): void {
  const csvData = generateGstr1TaxCsv(orders);
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `Incredible_Treasures_GSTR1_Sales_Register_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
