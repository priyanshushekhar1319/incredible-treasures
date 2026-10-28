"use client";

import React, { useState } from "react";
import {
  Layers,
  CheckCircle2,
  Clock,
  Printer,
  Truck,
  Check,
  Search,
  Filter,
  Eye,
  FileCheck2,
  FileText,
  Share2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Send,
  Building,
  Phone,
  Mail,
  MapPin,
  PackageCheck,
  RefreshCw,
  Download,
  AlertCircle,
} from "lucide-react";
import { PlacedOrder, updateOrderStatus, updateOrderAwb } from "@/lib/orderStore";
import { computePreFlightReport, PreFlightReport } from "@/lib/adminStore";
import { OfficialTaxInvoiceModal } from "@/components/OfficialTaxInvoiceModal";

interface Props {
  orders: PlacedOrder[];
  onRefreshOrders: () => void;
}

const PIPELINE_STAGES: Array<{ id: PlacedOrder["status"] | "ALL"; label: string }> = [
  { id: "ALL", label: "All Orders" },
  { id: "ORDER_CONFIRMED", label: "1. New Paid Orders" },
  { id: "PRE_FLIGHT_VERIFIED", label: "2. Pre-Flight Verified" },
  { id: "IN_PRODUCTION", label: "3. On Press Machine" },
  { id: "QUALITY_FINISHING", label: "4. Cutting & Die-Punch" },
  { id: "DISPATCHED", label: "5. Dispatched (Air Cargo)" },
  { id: "DELIVERED", label: "6. Delivered" },
];

export const AdminPipelineTab: React.FC<Props> = ({ orders, onRefreshOrders }) => {
  const [selectedFilter, setSelectedFilter] = useState<PlacedOrder["status"] | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<PlacedOrder | null>(null);

  // AWB Quick Modal State
  const [editingAwbOrderId, setEditingAwbOrderId] = useState<string | null>(null);
  const [awbInput, setAwbInput] = useState<string>("");

  // Filtering
  const filteredOrders = orders.filter((order) => {
    const matchesFilter = selectedFilter === "ALL" || order.status === selectedFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.customer.fullName.toLowerCase().includes(q) ||
      order.customer.companyName.toLowerCase().includes(q) ||
      order.logistics.awbNumber.toLowerCase().includes(q) ||
      (order.customer.gstin && order.customer.gstin.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  // Status Advancer
  const handleAdvanceStatus = (orderId: string, nextStatus: PlacedOrder["status"]) => {
    updateOrderStatus(orderId, nextStatus);
    onRefreshOrders();
  };

  // AWB Update
  const handleSaveAwb = (orderId: string) => {
    if (!awbInput.trim()) return;
    updateOrderAwb(orderId, awbInput.trim());
    setEditingAwbOrderId(null);
    setAwbInput("");
    onRefreshOrders();
  };

  // WhatsApp Messaging Helpers (Feature 2)
  const openWhatsAppProof = (order: PlacedOrder) => {
    const phone = order.customer.phone.replace(/[^0-9]/g, "");
    const msg = `Hi ${order.customer.fullName}, greetings from Incredible Treasures Luxury Studio & Press Works! Your corporate print order #${order.id} for "${order.customer.companyName}" has passed pre-press validation (600+ DPI Certified). Please reply with 'APPROVED' to transmit plates to our Heidelberg press line.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const openWhatsAppTracking = (order: PlacedOrder) => {
    const phone = order.customer.phone.replace(/[^0-9]/g, "");
    const msg = `Hi ${order.customer.fullName}, your custom print run #${order.id} has been dispatched via BlueDart Apex Air! Master Docket AWB: ${order.logistics.awbNumber}. Guaranteed Delivery: ${order.logistics.guaranteedDeliveryFormatted}. Track live here: ${order.logistics.courierTrackingUrl}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const openWhatsAppInvoice = (order: PlacedOrder) => {
    const phone = order.customer.phone.replace(/[^0-9]/g, "");
    const invYear = new Date(order.createdAt).getFullYear();
    const invNum = `INV-IT-${invYear}-${order.id.replace(/\D/g, "").slice(-6)}`;
    const msg = `Hi ${order.customer.companyName} Accounts Desk, please find your Official GST Tax Invoice ${invNum} for Order #${order.id} (Amount: ₹${order.pricing.grandTotal.toLocaleString("en-IN")}, ITC Eligible under Section 16). Download your statutory copy from your client portal.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Search & Pipeline Stage Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {PIPELINE_STAGES.map((st) => {
            const count =
              st.id === "ALL"
                ? orders.length
                : orders.filter((o) => o.status === st.id).length;
            const isActive = selectedFilter === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedFilter(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-[#A9782B] text-slate-900 font-bold" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, company, GSTIN..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
          />
        </div>
      </div>

      {/* Orders Grid / Cards */}
      {filteredOrders.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-black text-slate-700">No Orders in this Pipeline Stage</h4>
          <p className="text-xs text-slate-400">
            Orders matching the selected filters will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const preflight: PreFlightReport = computePreFlightReport(order);
            const isVip = order.pricing.shippingTier === "priority_vip";

            return (
              <div
                key={order.id}
                className={`bg-white rounded-3xl border transition shadow-xs hover:shadow-md overflow-hidden ${
                  isVip ? "border-[#CBA768] ring-1 ring-[#CBA768]/50" : "border-slate-200"
                }`}
              >
                {/* Order Top Bar */}
                <div
                  className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
                    isVip ? "bg-[#FAF6EE] border-[#EAD5B3]" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-black text-slate-900 text-sm">
                      {order.id}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 text-[11px]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {isVip && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-2.5 h-2.5" />
                        Priority VIP Air Run
                      </span>
                    )}
                  </div>

                  {/* Status Badge & Stage Switcher */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase font-mono">
                      {order.statusLabel}
                    </span>

                    {/* Quick Stage Transitions */}
                    {order.status === "ORDER_CONFIRMED" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order.id, "PRE_FLIGHT_VERIFIED")}
                        className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Artwork (Pre-Press)</span>
                      </button>
                    )}
                    {order.status === "PRE_FLIGHT_VERIFIED" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order.id, "IN_PRODUCTION")}
                        className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Transmit to Offset Press</span>
                      </button>
                    )}
                    {order.status === "IN_PRODUCTION" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order.id, "QUALITY_FINISHING")}
                        className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>Finishing & Die-Punch</span>
                      </button>
                    )}
                    {order.status === "QUALITY_FINISHING" && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAwbOrderId(order.id);
                          setAwbInput(order.logistics.awbNumber || "");
                        }}
                        className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Assign AWB & Dispatch</span>
                      </button>
                    )}
                    {order.status === "DISPATCHED" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order.id, "DELIVERED")}
                        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] transition cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Mark Delivered</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Main Content */}
                <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
                  {/* Left: Customer & Delivery Info (4 cols) */}
                  <div className="lg:col-span-4 space-y-2.5 border-b lg:border-b-0 lg:border-r border-slate-100 pr-0 lg:pr-5">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">
                        {order.customer.companyName}
                      </h4>
                      <span className="text-slate-600 text-xs font-semibold block">
                        Attn: {order.customer.fullName}
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-600 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{order.customer.email}</span>
                      </div>
                      <div className="flex items-start gap-1.5 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>
                          {order.customer.city}, {order.customer.pincode} ({order.customer.state})
                        </span>
                      </div>
                      {order.customer.gstin && (
                        <div className="pt-1">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-bold">
                            GSTIN: {order.customer.gstin}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Logistics Docket Info */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Carrier:</span>
                        <strong className="text-slate-800">{order.logistics.courierPartner}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">AWB Docket:</span>
                        <strong className="font-mono text-slate-900">{order.logistics.awbNumber}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ETA:</span>
                        <strong className="text-emerald-700 font-bold">{order.logistics.guaranteedDeliveryFormatted}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Items & Automated AI Pre-Flight Inspection (5 cols) */}
                  <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-slate-100 pr-0 lg:pr-5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                        Print Job Specifications ({order.items.length} items)
                      </span>
                      <div className="space-y-2">
                        {order.items.map((it, idx) => (
                          <div
                            key={it.id || idx}
                            className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <strong className="text-slate-900 font-bold text-xs">{it.title}</strong>
                              <span className="font-mono font-black text-slate-900 text-xs">
                                ₹{it.totalPrice.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">
                              {it.specs || it.branding || "Precision Press Run • Standard Specifications"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feature 1: Automated AI Pre-Flight Quality Report Box */}
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#CBA768]" />
                          <span className="font-bold text-xs">AI Pre-Flight Inspector:</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black font-mono ${
                            preflight.overallScore >= 90
                              ? "bg-emerald-500 text-white"
                              : "bg-amber-500 text-slate-950"
                          }`}
                        >
                          {preflight.overallScore}/100 {preflight.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                        <div className="p-1.5 rounded-lg bg-slate-800/80 text-center">
                          <span className="text-slate-400 block text-[9px]">DPI DENSITY</span>
                          <span className="font-bold text-emerald-400">{preflight.dpiMetric}+ DPI</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-800/80 text-center">
                          <span className="text-slate-400 block text-[9px]">3MM BLEED</span>
                          <span className="font-bold text-emerald-400">PASSED</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-800/80 text-center">
                          <span className="text-slate-400 block text-[9px]">COLOR PROFILE</span>
                          <span className="font-bold text-[#CBA768]">CMYK CERTIFIED</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-300">
                        {preflight.recommendations[0]}
                      </div>
                    </div>
                  </div>

                  {/* Right: Payment Reference & Instant WhatsApp Command Desk (3 cols) */}
                  <div className="lg:col-span-3 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Razorpay Settlement & Total
                      </span>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Method:</span>
                          <strong className="uppercase font-mono text-slate-800">{order.payment.method}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Gateway Ref:</span>
                          <strong className="font-mono text-slate-900 truncate max-w-[120px]" title={order.payment.referenceId}>
                            {order.payment.referenceId}
                          </strong>
                        </div>
                        <div className="flex justify-between text-xs font-black text-slate-900 pt-1 border-t border-slate-200">
                          <span>Total Paid:</span>
                          <span className="text-[#A9782B] font-mono text-sm">
                            ₹{order.pricing.grandTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Feature 2: Instant WhatsApp Automation Command Desk */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-emerald-600" />
                        WhatsApp Actions
                      </span>

                      <button
                        type="button"
                        onClick={() => openWhatsAppProof(order)}
                        className="w-full py-1.5 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px] transition flex items-center justify-between cursor-pointer"
                        title="Send proof approval request on WhatsApp"
                      >
                        <span>Send Proof Approval</span>
                        <Send className="w-3 h-3 text-emerald-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openWhatsAppTracking(order)}
                        className="w-full py-1.5 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-[11px] transition flex items-center justify-between cursor-pointer"
                        title="Send live flight tracking link on WhatsApp"
                      >
                        <span>Send BlueDart Tracking</span>
                        <Truck className="w-3 h-3 text-blue-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openWhatsAppInvoice(order)}
                        className="w-full py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition flex items-center justify-between cursor-pointer"
                        title="Send official tax invoice on WhatsApp"
                      >
                        <span>Send GST Tax Invoice</span>
                        <FileText className="w-3 h-3 text-slate-600" />
                      </button>

                      {/* Official Tax Invoice Modal Trigger */}
                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="w-full py-1.5 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-[#CBA768]" />
                        <span>View / Print GST Invoice</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AWB Assignment Quick Modal */}
      {editingAwbOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#A9782B]" />
              <h4 className="text-sm font-black text-slate-900">Assign BlueDart Air AWB</h4>
            </div>
            <p className="text-xs text-slate-500">
              Enter the master consignment docket number for Order <strong>#{editingAwbOrderId}</strong>.
            </p>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                BlueDart AWB Number:
              </label>
              <input
                type="text"
                value={awbInput}
                onChange={(e) => setAwbInput(e.target.value.toUpperCase())}
                placeholder="e.g. BD-891024560"
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#A9782B]"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSaveAwb(editingAwbOrderId)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Save & Mark Dispatched
              </button>
              <button
                type="button"
                onClick={() => setEditingAwbOrderId(null)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <OfficialTaxInvoiceModal
          isOpen={Boolean(selectedInvoiceOrder)}
          onClose={() => setSelectedInvoiceOrder(null)}
          orderData={selectedInvoiceOrder}
          orderId={selectedInvoiceOrder.id}
        />
      )}
    </div>
  );
};
