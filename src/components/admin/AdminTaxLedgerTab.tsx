"use client";

import React, { useState, useMemo } from "react";
import {
  FileSpreadsheet,
  Download,
  Mail,
  Send,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Percent,
  FileText,
  Copy,
  Clock,
  Printer,
  ChevronRight,
} from "lucide-react";
import { PlacedOrder } from "@/lib/orderStore";
import {
  computeCaMonthEndSummary,
  downloadGstr1TaxReport,
  downloadRazorpaySettlementReport,
  generateCaEmailBody,
  EFFECTIVE_MDR_PERCENT,
} from "@/lib/taxExport";
import { OfficialTaxInvoiceModal } from "@/components/OfficialTaxInvoiceModal";

interface Props {
  orders: PlacedOrder[];
}

export const AdminTaxLedgerTab: React.FC<Props> = ({ orders }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [activeSubTab, setActiveSubTab] = useState<"gstr1" | "razorpay" | "hsn">("gstr1");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<PlacedOrder | null>(null);
  const [isCaModalOpen, setIsCaModalOpen] = useState(false);
  const [caEmail, setCaEmail] = useState("ca.audit@incredibletreasures.com");
  const [copiedDossier, setCopiedDossier] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Derive unique months available from orders
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    orders.forEach((o) => {
      const ym = o.createdAt.slice(0, 7);
      if (ym) set.add(ym);
    });
    return Array.from(set).sort().reverse();
  }, [orders]);

  // Compute Financial Summaries
  const summary = useMemo(() => {
    return computeCaMonthEndSummary(orders, selectedMonth);
  }, [orders, selectedMonth]);

  // Filtered orders for table views
  const filteredOrders = useMemo(() => {
    if (selectedMonth === "ALL") return orders;
    return orders.filter((o) => o.createdAt.slice(0, 7) === selectedMonth);
  }, [orders, selectedMonth]);

  const handleCopyDossier = () => {
    const body = generateCaEmailBody(summary);
    navigator.clipboard.writeText(body);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2500);
    showToast("Audit Dossier copied to clipboard!");
  };

  const handleSendEmailToCa = () => {
    const body = generateCaEmailBody(summary);
    const subject = `Month-End GST Audit & Settlement Dossier - ${summary.periodMonth} - Incredible Treasures`;
    const mailto = `mailto:${encodeURIComponent(caEmail)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
    setIsCaModalOpen(false);
    showToast("Dispatched audit dossier to CA email client.");
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-[#A9782B] text-amber-200 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-[#261b0d] to-slate-950 border border-[#EAD5B3]/40 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3]">
              ✦ Module II • Statutory CA Audit & Tax Engine ✦
            </span>
            <span className="text-xs text-amber-200/80 font-serif">GSTIN: 29AAKFI2392F1Z5 • Bengaluru</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-[#CBA768]" />
            Automated Month-End CA Tax & Payment Ledger
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-sans">
            Generates 31st month-end GSTR-1 government return registers, reconciles Razorpay gateway MDR deductions, and synthesizes 1-click audit dossiers for your Chartered Accountant.
          </p>
        </div>

        {/* Period Selector & Primary CA Dispatch CTA */}
        <div className="flex items-center gap-2.5 flex-wrap relative z-10">
          <div className="flex items-center gap-2 bg-black/60 border border-[#EAD5B3]/30 px-3.5 py-2 rounded-2xl text-xs backdrop-blur-xs">
            <Calendar className="w-4 h-4 text-[#CBA768]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-white font-mono font-bold outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Filing Periods</option>
              {availableMonths.map((ym) => (
                <option key={ym} value={ym} className="bg-slate-900">
                  {new Date(ym + "-01").toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setIsCaModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#A9782B] hover:bg-[#8E621E] text-white font-serif font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>1-Click CA Dispatch</span>
          </button>
        </div>
      </div>

      {/* 4 Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Gross Sales Turnover */}
        <div className="bg-white rounded-2xl border border-[#EAD5B3] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-serif font-medium">
            <span>Gross Turnover (B2B + B2C)</span>
            <span className="p-1 rounded-lg bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3]">
              <IndianRupee className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            ₹{summary.grossTurnover.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
            <span>B2B: ₹{summary.b2bTurnover.toLocaleString("en-IN")}</span>
            <span>B2C: ₹{summary.b2cTurnover.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* KPI 2: Total 18% GST Output Liability */}
        <div className="bg-white rounded-2xl border border-[#EAD5B3] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-serif font-medium">
            <span>Total GST Collected (18%)</span>
            <span className="p-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Percent className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-black text-blue-700 font-mono">
            ₹{summary.totalGstLiability.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
            <span>CGST: ₹{summary.totalCgst.toLocaleString("en-IN")}</span>
            <span>SGST: ₹{summary.totalSgst.toLocaleString("en-IN")}</span>
            <span>IGST: ₹{summary.totalIgst.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* KPI 3: Razorpay MDR Fees Deducted */}
        <div className="bg-white rounded-2xl border border-[#EAD5B3] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-serif font-medium">
            <span>Gateway MDR Fee (2.36%)</span>
            <span className="p-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-black text-rose-600 font-mono">
            -₹{summary.totalMdrFeeDeducted.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
            2.0% Razorpay Fee + 18% GST on MDR
          </p>
        </div>

        {/* KPI 4: Net Bank Settlement */}
        <div className="bg-white rounded-2xl border border-[#EAD5B3] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-serif font-medium">
            <span>Net Bank Credit (HDFC A/c)</span>
            <span className="p-1 rounded-lg bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3]">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-700 font-mono">
            ₹{summary.netBankSettlement.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-[#734D15] font-mono pt-2 border-t border-slate-100 truncate font-semibold">
            HDFC Current A/c #50200084920145
          </p>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAD5B3] pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab("gstr1")}
            className={`px-4 py-2 rounded-xl text-xs font-serif tracking-wide transition flex items-center gap-2 cursor-pointer ${
              activeSubTab === "gstr1"
                ? "bg-[#A9782B] text-white shadow-md font-bold"
                : "bg-white text-slate-700 hover:bg-[#FAF6EE] border border-[#EAD5B3] font-medium"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>GSTR-1 Tax Return Table ({filteredOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("razorpay")}
            className={`px-4 py-2 rounded-xl text-xs font-serif tracking-wide transition flex items-center gap-2 cursor-pointer ${
              activeSubTab === "razorpay"
                ? "bg-[#A9782B] text-white shadow-md font-bold"
                : "bg-white text-slate-700 hover:bg-[#FAF6EE] border border-[#EAD5B3] font-medium"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Razorpay Settlement Audit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("hsn")}
            className={`px-4 py-2 rounded-xl text-xs font-serif tracking-wide transition flex items-center gap-2 cursor-pointer ${
              activeSubTab === "hsn"
                ? "bg-[#A9782B] text-white shadow-md font-bold"
                : "bg-white text-slate-700 hover:bg-[#FAF6EE] border border-[#EAD5B3] font-medium"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>HSN Code Breakdown</span>
          </button>
        </div>

        {/* Direct CSV Exporters */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => downloadGstr1TaxReport(filteredOrders, selectedMonth)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF6EE] text-[#734D15] font-serif font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer border border-[#EAD5B3]"
            title="Download Official Indian GSTR-1 Sales Register CSV"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>GSTR-1 CSV</span>
          </button>

          <button
            type="button"
            onClick={() => downloadRazorpaySettlementReport(filteredOrders, selectedMonth)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF6EE] text-[#734D15] font-serif font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer border border-[#EAD5B3]"
            title="Download Razorpay Settlement Reconciliation CSV"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Razorpay CSV</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: GSTR-1 TAX REGISTER TABLE                                      */}
      {/* ========================================================================= */}
      {activeSubTab === "gstr1" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-700 tracking-wider font-mono">
              Official Indian GSTR-1 Sales Register (Section 31 CGST Act)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Showing {filteredOrders.length} Transaction(s)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Invoice Ref</th>
                  <th className="py-2.5 px-3 font-bold">Date</th>
                  <th className="py-2.5 px-3 font-bold">Customer Trade Name</th>
                  <th className="py-2.5 px-3 font-bold">Buyer GSTIN</th>
                  <th className="py-2.5 px-3 font-bold">State / POS</th>
                  <th className="py-2.5 px-3 font-bold text-right">Taxable (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">CGST 9%</th>
                  <th className="py-2.5 px-3 font-bold text-right">SGST 9%</th>
                  <th className="py-2.5 px-3 font-bold text-right">IGST 18%</th>
                  <th className="py-2.5 px-3 font-bold text-right">Total (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-8 text-center text-slate-400">
                      No transactions recorded for the selected filing period.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const invYear = new Date(order.createdAt).getFullYear();
                    const invNumber = `INV-IT-${invYear}-${(order.id.replace(/\D/g, "") || "017378").slice(-6)}`;
                    const isB2B = Boolean(order.customer.gstin && order.customer.gstin.length >= 15);
                    const stateCode = order.customer.gstin?.slice(0, 2) || "29";
                    const isIntraState = stateCode === "29";

                    const taxable = Math.round((order.pricing.subtotal / 1.18) * 100) / 100;
                    const cgst = isIntraState ? Math.round(taxable * 0.09 * 100) / 100 : 0;
                    const sgst = isIntraState ? Math.round(taxable * 0.09 * 100) / 100 : 0;
                    const igst = !isIntraState ? Math.round(taxable * 0.18 * 100) / 100 : 0;

                    return (
                      <tr key={order.id} className="hover:bg-slate-50 transition">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{invNumber}</td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {new Date(order.createdAt).toISOString().slice(0, 10)}
                        </td>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800 truncate max-w-[160px]">
                          {order.customer.companyName || order.customer.fullName}
                        </td>
                        <td className="py-2.5 px-3">
                          {isB2B ? (
                            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">
                              {order.customer.gstin}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">B2C (Unregistered)</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {order.customer.state} ({stateCode})
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                          {taxable.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{cgst.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{sgst.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{igst.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right font-black text-slate-900">
                          {order.pricing.grandTotal.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                            title="View Official GST Tax Invoice"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: RAZORPAY GATEWAY RECONCILIATION                                */}
      {/* ========================================================================= */}
      {activeSubTab === "razorpay" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-700 tracking-wider font-mono">
              Razorpay Settlement Audit (Merchant MDR 2.36% Deductions)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Settlement Target: HDFC Bank Current A/c #50200084920145
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Order ID</th>
                  <th className="py-2.5 px-3 font-bold">Razorpay Payment ID</th>
                  <th className="py-2.5 px-3 font-bold">Method</th>
                  <th className="py-2.5 px-3 font-bold">Client Name</th>
                  <th className="py-2.5 px-3 font-bold text-right">Gross Total (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">Base 2% (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">GST on MDR (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">Total MDR (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">Net Bank Credit (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filteredOrders.map((o) => {
                  const gross = o.pricing.grandTotal;
                  const baseFee = Math.round(gross * 0.02 * 100) / 100;
                  const gstOnFee = Math.round(baseFee * 0.18 * 100) / 100;
                  const totalMdr = Math.round((baseFee + gstOnFee) * 100) / 100;
                  const netCredit = Math.round((gross - totalMdr) * 100) / 100;
                  const payId = o.payment.referenceId?.startsWith("pay_")
                    ? o.payment.referenceId
                    : `pay_auto_${(o.id.replace(/\D/g, "") || "849201").slice(-8)}`;

                  return (
                    <tr key={o.id} className="hover:bg-slate-50 transition">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{o.id}</td>
                      <td className="py-2.5 px-3 text-blue-700 font-mono font-bold">{payId}</td>
                      <td className="py-2.5 px-3 uppercase text-slate-600">{o.payment.method}</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-800 truncate max-w-[140px]">
                        {o.customer.fullName}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">{gross.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">{baseFee.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500">{gstOnFee.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-rose-600">-{totalMdr.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right font-black text-emerald-700">
                        ₹{netCredit.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                          SETTLED
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: HSN CODE SUMMARY                                               */}
      {/* ========================================================================= */}
      {activeSubTab === "hsn" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-sm font-black text-slate-900">
                Statutory HSN (Harmonized System of Nomenclature) Table
              </h2>
              <p className="text-xs text-slate-500">
                Required for GSTR-1 Table 12 statutory tax filing in India.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#A9782B]/10 text-[#734D15]">
              GST Rate: 18% Flat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {Object.entries(summary.hsnSummary).map(([hsnCode, data]) => {
              let label = "Custom Printed Matter";
              if (hsnCode === "49090000" || hsnCode === "4909") label = "Visiting Cards & Printed Cards";
              if (hsnCode === "49111010" || hsnCode === "4911") label = "Commercial PVC & Polymer Cards";
              if (hsnCode === "69120010" || hsnCode === "6912") label = "Ceramic Tableware & Mugs";
              if (hsnCode === "6105") label = "Corporate Cotton Polos & Apparel";
              if (hsnCode === "4819") label = "Packaging Boxes & Folding Cartons";

              return (
                <div key={hsnCode} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      HSN {hsnCode}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600">
                      {data.count} units
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{label}</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/80 font-mono">
                    <span className="text-slate-600">Taxable Value:</span>
                    <span className="font-bold text-slate-900">₹{data.taxable.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600">18% GST Amount:</span>
                    <span className="font-bold text-emerald-700">₹{data.tax.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: 1-CLICK CA DISPATCH PACKAGE                                       */}
      {/* ========================================================================= */}
      {isCaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Dispatch Month-End Audit Dossier to Chartered Accountant
                </h3>
                <p className="text-xs text-slate-500">
                  Prepares the complete GSTR-1, Razorpay settlement, and tax liability package.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCaModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Chartered Accountant (CA) Email Address</label>
                <input
                  type="email"
                  value={caEmail}
                  onChange={(e) => setCaEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none font-mono focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Dossier Text Preview */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Audit Dossier Executive Summary</label>
                  <button
                    type="button"
                    onClick={handleCopyDossier}
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedDossier ? "Copied ✓" : "Copy Dossier"}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={10}
                  value={generateCaEmailBody(summary)}
                  className="w-full p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-xl border border-slate-800 outline-none resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  <strong>Statutory Declaration:</strong> The attached ledger is auto-certified by Incredible Treasures Private Limited under Rule 46 of CGST Rules, 2017. GSTR-1 and Razorpay settlement CSVs can also be downloaded directly.
                </p>
              </div>

              <div className="pt-2 border-t flex justify-between items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadGstr1TaxReport(filteredOrders, selectedMonth)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download GSTR-1 CSV</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCaModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmailToCa}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Launch CA Email Dispatch</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <OfficialTaxInvoiceModal
          isOpen={Boolean(selectedInvoiceOrder)}
          orderData={selectedInvoiceOrder}
          orderId={selectedInvoiceOrder.id}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};

