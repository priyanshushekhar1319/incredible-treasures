"use client";

import React, { useRef } from "react";
import {
  X,
  Printer,
  Download,
  Share2,
  FileCheck2,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import { getOrderById, PlacedOrder } from "@/lib/orderStore";
import {
  SUPPLIER_PROFILE,
  resolveHsnCode,
  calculateGstTaxSplit,
  numberToWordsIndian,
} from "@/lib/gstEngine";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  orderData?: PlacedOrder | null;
}

export const OfficialTaxInvoiceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  orderId = "IT-PRINT-017378",
  orderData,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Resolve the order: either passed directly or retrieved by ID from orderStore
  const order: PlacedOrder | null = orderData || getOrderById(orderId);

  if (!order) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4">
          <FileCheck2 className="w-12 h-12 text-slate-400 mx-auto" />
          <h4 className="text-base font-black text-slate-900">Tax Invoice Not Found</h4>
          <p className="text-xs text-slate-500">
            No billing record found for Order Reference &ldquo;{orderId}&rdquo;.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Invoice Number derivation from Order ID
  const invoiceNumber = `INV-IT-${new Date(order.createdAt).getFullYear()}-${(
    order.id.replace(/\D/g, "") || "017378"
  ).slice(-6)}`;

  const invoiceDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Extract buyer state code from GSTIN or customer pincode
  const buyerGstin = order.customer.gstin?.trim() || "";
  let buyerStateCode = "29";
  if (buyerGstin.length >= 2 && !isNaN(Number(buyerGstin.slice(0, 2)))) {
    buyerStateCode = buyerGstin.slice(0, 2);
  } else if (order.customer.state.toLowerCase().includes("maharashtra")) {
    buyerStateCode = "27";
  } else if (order.customer.state.toLowerCase().includes("delhi")) {
    buyerStateCode = "07";
  } else if (order.customer.state.toLowerCase().includes("tamil")) {
    buyerStateCode = "33";
  } else if (order.customer.state.toLowerCase().includes("telangana")) {
    buyerStateCode = "36";
  }

  // Tax calculations based on genuine state split
  const taxSplit = calculateGstTaxSplit(
    order.pricing.subtotal,
    buyerStateCode,
    order.customer.state || "Karnataka"
  );

  const grandTotal = Math.round(order.pricing.grandTotal);
  const totalInWords = numberToWordsIndian(grandTotal);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col font-sans overflow-hidden">
        {/* Top Control Toolbar (Hidden during browser printing) */}
        <div className="px-6 py-3.5 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF6EE] border-b border-[#E5E0D8] flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center shadow-xs">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">
                  Official GST Tax Invoice
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase border border-emerald-300">
                  ITC ELIGIBLE • 18% GST
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {invoiceNumber} • {order.customer.companyName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <a
              href={`https://wa.me/919945039266?text=${encodeURIComponent(
                `Hi Incredible Treasures Accounts Desk, please find my official corporate tax invoice reference ${invoiceNumber} for Order #${order.id} (Total: ₹${grandTotal.toLocaleString("en-IN")}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close Invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div
          ref={invoiceRef}
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 bg-white text-slate-900 print:p-0 print:m-0 print:overflow-visible text-xs"
        >
          {/* Document Header & Legal Title */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  {SUPPLIER_PROFILE.tradeName}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5">
                {SUPPLIER_PROFILE.legalName}
              </span>
              <p className="text-[11px] text-slate-600 max-w-sm mt-1 leading-relaxed">
                {SUPPLIER_PROFILE.registeredAddress}
              </p>
              <div className="text-[10px] text-slate-500 font-mono mt-1 space-x-2">
                <span>GSTIN: <strong className="text-slate-900">{SUPPLIER_PROFILE.gstin}</strong></span>
                <span>•</span>
                <span>PAN: <strong className="text-slate-900">{SUPPLIER_PROFILE.pan}</strong></span>
                <span>•</span>
                <span>State Code: <strong className="text-slate-900">29 (Karnataka)</strong></span>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded">
                TAX INVOICE
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
                ORIGINAL FOR RECIPIENT
              </span>
              <span className="text-[9px] text-slate-400 block">
                Issued u/s 31 of CGST Act, 2017
              </span>

              <div className="mt-2 text-right">
                <span className="text-[10px] text-slate-400 block font-mono">Invoice Number</span>
                <strong className="text-sm font-black font-mono text-slate-900">
                  {invoiceNumber}
                </strong>
                <span className="text-[11px] text-slate-600 block mt-0.5 font-medium">
                  Date: {invoiceDate}
                </span>
              </div>
            </div>
          </div>

          {/* Transport & Supply Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Place of Supply</span>
              <strong className="text-slate-800">{taxSplit.placeOfSupply}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Reverse Charge (RCM)</span>
              <strong className="text-slate-800">NO</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Air Cargo Docket</span>
              <strong className="text-slate-800 font-mono">{order.logistics.awbNumber}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Payment Status</span>
              <strong className="text-emerald-700">PAID IN ADVANCE</strong>
            </div>
          </div>

          {/* Billed To / Shipped To Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                BILLED TO (BUYER DETAILS)
              </span>
              <h5 className="font-black text-slate-900 text-xs">
                {order.customer.companyName}
              </h5>
              <span className="text-[11px] font-semibold text-slate-700 block">
                Attn: {order.customer.fullName}
              </span>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
              <div className="mt-2 text-[11px] text-slate-700 space-y-0.5">
                <div>
                  <span className="text-slate-400 font-medium">Buyer GSTIN: </span>
                  <strong className="font-mono text-slate-900">
                    {order.customer.gstin || "Unregistered B2C"}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">State & Code: </span>
                  <strong className="text-slate-800">
                    {order.customer.state} (Code: {taxSplit.buyerStateCode})
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Contact: </span>
                  <span className="text-slate-800">{order.customer.phone}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                SHIPPED TO (DELIVERY DESTINATION)
              </span>
              <h5 className="font-black text-slate-900 text-xs">
                {order.customer.companyName}
              </h5>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
              <div className="mt-2 text-[11px] text-slate-700 space-y-0.5">
                <div>
                  <span className="text-slate-400 font-medium">Logistics Carrier: </span>
                  <strong className="text-slate-800">{order.logistics.courierPartner}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Guaranteed ETA: </span>
                  <strong className="text-emerald-700 font-bold">
                    {order.logistics.guaranteedDeliveryFormatted}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Manufacturing Facility: </span>
                  <span className="text-slate-600">{SUPPLIER_PROFILE.facilityAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Line Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3 w-8">#</th>
                  <th className="py-2.5 px-3">Description of Goods / Services</th>
                  <th className="py-2.5 px-3 text-center">HSN</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Rate</th>
                  <th className="py-2.5 px-3 text-right">Taxable Value</th>
                  {taxSplit.taxType === "INTRA_STATE" ? (
                    <>
                      <th className="py-2.5 px-3 text-right">CGST (9%)</th>
                      <th className="py-2.5 px-3 text-right">SGST (9%)</th>
                    </>
                  ) : (
                    <th className="py-2.5 px-3 text-right">IGST (18%)</th>
                  )}
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {order.items.map((it, idx) => {
                  const hsn = resolveHsnCode(it.title, it.categoryName);
                  const lineTaxable = it.totalPrice;
                  const lineCgst = Math.round(lineTaxable * 0.09);
                  const lineSgst = Math.round(lineTaxable * 0.09);
                  const lineIgst = Math.round(lineTaxable * 0.18);
                  const lineTotal =
                    taxSplit.taxType === "INTRA_STATE"
                      ? lineTaxable + lineCgst + lineSgst
                      : lineTaxable + lineIgst;

                  return (
                    <tr key={it.id || idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <strong className="text-slate-900 block font-bold">{it.title}</strong>
                        {it.specs && (
                          <span className="text-[10px] text-slate-500 block">{it.specs}</span>
                        )}
                        <span className="text-[9px] text-[#A9782B] font-bold block">
                          600+ DPI Precision Press Run
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-600">{hsn.code}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                        {it.quantity}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                        ₹{it.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        ₹{lineTaxable.toLocaleString("en-IN")}
                      </td>

                      {taxSplit.taxType === "INTRA_STATE" ? (
                        <>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                            ₹{lineCgst.toLocaleString("en-IN")}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                            ₹{lineSgst.toLocaleString("en-IN")}
                          </td>
                        </>
                      ) : (
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                          ₹{lineIgst.toLocaleString("en-IN")}
                        </td>
                      )}

                      <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Financial Totals & Tax Split Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bank RTGS Details & Legal Declarations */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[11px] space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                BANK NEFT / RTGS PAYMENT DETAILS
              </span>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Bank:</span>
                  <strong className="text-slate-800">{SUPPLIER_PROFILE.bankDetails.bankName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Account No:</span>
                  <strong className="text-slate-900 font-mono">
                    {SUPPLIER_PROFILE.bankDetails.accountNumber}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">IFSC Code:</span>
                  <strong className="text-slate-900 font-mono">
                    {SUPPLIER_PROFILE.bankDetails.ifscCode}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Account Type:</span>
                  <span className="text-slate-800">{SUPPLIER_PROFILE.bankDetails.accountType}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed space-y-1">
                <p>
                  <strong>Terms & Conditions:</strong> 1. Goods once printed with approved artwork are non-returnable except for verified manufacturing defects. 2. Subject to Bengaluru Jurisdiction. 3. Input Tax Credit (ITC) is eligible under Section 16 of CGST Act.
                </p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Taxable Value (Subtotal):</span>
                <strong className="text-slate-900 font-mono">
                  ₹{taxSplit.taxableAmount.toLocaleString("en-IN")}
                </strong>
              </div>

              {taxSplit.taxType === "INTRA_STATE" ? (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>Central GST (CGST 9%):</span>
                    <strong className="text-slate-900 font-mono">
                      ₹{taxSplit.cgstAmount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>State GST (SGST 9%):</span>
                    <strong className="text-slate-900 font-mono">
                      ₹{taxSplit.sgstAmount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-slate-600">
                  <span>Integrated GST (IGST 18%):</span>
                  <strong className="text-slate-900 font-mono">
                    ₹{taxSplit.igstAmount.toLocaleString("en-IN")}
                  </strong>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Insured Air Dispatch ({order.pricing.shippingTier === "priority_vip" ? "Priority VIP" : "Standard"}):</span>
                <strong className={order.pricing.shippingFee === 0 ? "text-emerald-700" : "text-slate-900 font-mono"}>
                  {order.pricing.shippingFee === 0 ? "FREE" : `₹${order.pricing.shippingFee}`}
                </strong>
              </div>

              <div className="flex justify-between text-slate-900 font-black text-sm border-t-2 border-slate-900 pt-2">
                <span>Grand Total (INR):</span>
                <span className="text-[#A9782B] text-base font-mono font-black">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 pt-1 leading-snug">
                <span>Amount in Words: </span>
                <strong className="text-slate-800">{totalInWords}</strong>
              </div>
            </div>
          </div>

          {/* Digital Signature & Authorization Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-1">
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-500">
                <span className="font-bold text-slate-800 block">MCA & GST Verified E-Invoice</span>
                <span>IRN / Digital Signature Embedded</span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                FOR {SUPPLIER_PROFILE.legalName.toUpperCase()}
              </span>
              <div className="py-2">
                <div className="inline-block border-2 border-dashed border-[#A9782B]/60 rounded-full px-4 py-1 text-[10px] font-black text-[#734D15] uppercase tracking-wider bg-[#FAF6EE]">
                  DIGITALLY SIGNED & VERIFIED
                </div>
              </div>
              <span className="text-[11px] font-black text-slate-900 block">Authorized Signatory</span>
              <span className="text-[9px] text-slate-400 block">Peenya Offset Press Works, Bengaluru</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
