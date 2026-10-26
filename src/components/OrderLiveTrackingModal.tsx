"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  ExternalLink,
  Navigation,
  Sparkles,
  PackageCheck,
  Search,
  RefreshCw,
  Building,
  User,
  ShoppingBag,
  FileText,
  AlertCircle,
  Layers,
} from "lucide-react";
import { getGenuineOrderTracking, GenuineOrderTrackingDetails } from "@/lib/orderTracking";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  initialPincode?: string;
  customerName?: string;
  companyName?: string;
}

export const OrderLiveTrackingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialOrderId = "IT-PRINT-017378",
}) => {
  const [searchOrderId, setSearchOrderId] = useState<string>(initialOrderId);
  const [trackingData, setTrackingData] = useState<GenuineOrderTrackingDetails | null>(() =>
    getGenuineOrderTracking(initialOrderId)
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsRefreshing(true);
    setHasSearched(true);
    setTimeout(() => {
      const result = getGenuineOrderTracking(searchOrderId.trim());
      setTrackingData(result);
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col font-sans overflow-hidden">
        {/* Header Strip */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF6EE] border-b border-[#E5E0D8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center shadow-xs">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Corporate Order & Production Tracking
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase flex items-center gap-1 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  Live Press & Air Transit
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Real-time manufacturing lifecycle from Bangalore offset press to doorstep delivery.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close Tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Omnibar: Search Any Real Order ID or BlueDart AWB */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E5E0D8] flex items-center gap-2 shrink-0">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value.toUpperCase())}
                placeholder="Enter Order ID (e.g. IT-ORD-749214) or BlueDart AWB"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5E0D8] focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-mono font-bold text-slate-900 outline-none bg-white uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60"
            >
              {isRefreshing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <span>Track</span>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={() => handleSearch()}
            title="Refresh order status"
            className="p-2 rounded-xl bg-white border border-[#E5E0D8] hover:bg-slate-50 text-slate-600 transition cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#A9782B]" : ""}`} />
          </button>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {!trackingData ? (
            /* Order Not Found State */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="font-black text-slate-900 text-base">
                  No Order Found for Reference &ldquo;{searchOrderId}&rdquo;
                </h4>
                <p className="text-xs text-slate-500">
                  Please verify your 6-digit Order Reference ID or Master AWB docket number from your order confirmation receipt or email.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOrderId("IT-PRINT-017378");
                    const res = getGenuineOrderTracking("IT-PRINT-017378");
                    setTrackingData(res);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FAF6EE] border border-[#EAD5B3] text-[#734D15] text-xs font-bold hover:bg-[#EAD5B3]/40 transition cursor-pointer"
                >
                  View Sample Dispatched Order (#IT-PRINT-017378)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOrderId("IT-PRINT-018241");
                    const res = getGenuineOrderTracking("IT-PRINT-018241");
                    setTrackingData(res);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  View In-Production Order (#IT-PRINT-018241)
                </button>
              </div>
            </div>
          ) : (
            /* Order Found: Genuine Order Lifecycle & Live Progress */
            <>
              {/* Top Order Status Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#1e150a] text-white border border-[#A9782B]/40 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                      OFFICIAL ORDER REFERENCE
                    </span>
                    <h4 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
                      {trackingData.orderId}
                      <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/15">
                        AWB: {trackingData.awbNumber}
                      </span>
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Placed on {trackingData.createdAtFormatted}
                    </span>
                  </div>

                  <div className="sm:text-right bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                      GUARANTEED DOORSTEP DELIVERY
                    </span>
                    <span className="text-sm font-black text-emerald-400">
                      {trackingData.estimatedDeliveryDate}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Via {trackingData.courierPartner}
                    </span>
                  </div>
                </div>

                {/* Active Production Stage Card */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#A9782B] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Layers className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                        STAGE {trackingData.currentStageNumber} OF 6 ACTIVE
                      </span>
                      <strong className="text-xs font-black text-white">
                        {trackingData.currentStageTitle}
                      </strong>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {trackingData.currentStageDescription}
                    </p>
                  </div>
                </div>

                {/* Step Progress Line */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>1. Order Placed</span>
                    <span>2. 600+ DPI Pre-Flight</span>
                    <span>3. Offset Press</span>
                    <span>4. Finishing</span>
                    <span>5. Air Cargo</span>
                    <span>6. Doorstep</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-[#A9782B] to-emerald-400 transition-all duration-500 rounded-full"
                      style={{
                        width: `${(trackingData.currentStageNumber / 6) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Order Items & Real Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ordered Items List */}
                <div className="p-4 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#A9782B]" />
                    <span>Real Order Items ({trackingData.items.length})</span>
                  </span>

                  <div className="space-y-2.5">
                    {trackingData.items.map((it, idx) => (
                      <div
                        key={it.id || idx}
                        className="p-2.5 rounded-xl bg-white border border-[#E5E0D8] flex items-start gap-3 shadow-2xs"
                      >
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-1 text-[10px] font-bold text-[#A9782B]">
                          {it.image ? (
                            <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                          ) : (
                            <span>{it.quantity} pcs</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <strong className="text-slate-900 block truncate font-bold leading-snug">
                            {it.title}
                          </strong>
                          <span className="text-[11px] text-slate-500 block">
                            Qty: {it.quantity} units • ₹{it.unitPrice.toFixed(2)}/pc
                          </span>
                          {it.specs && (
                            <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                              {it.specs}
                            </span>
                          )}
                        </div>
                        <div className="text-right text-xs font-black text-slate-900 shrink-0">
                          ₹{it.totalPrice.toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-bold text-slate-800">
                    <span>Order Total (Incl. 18% GST):</span>
                    <strong className="text-[#A9782B] text-sm">
                      ₹{trackingData.grandTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                {/* Delivery Address & Carrier Details */}
                <div className="p-4 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#A9782B]" />
                    <span>Destination & Logistics Details</span>
                  </span>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D8] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{trackingData.customerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{trackingData.companyName}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed pt-0.5">
                        {trackingData.deliveryAddress}
                      </p>
                      {trackingData.gstin && (
                        <span className="text-[10px] font-mono font-bold text-slate-500 block pt-0.5">
                          GSTIN: {trackingData.gstin}
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D8] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">
                          AIR LOGISTICS PARTNER
                        </span>
                        <strong className="text-slate-900 font-bold block">
                          {trackingData.courierPartner}
                        </strong>
                        <span className="text-[11px] text-slate-500">
                          Helpline: {trackingData.courierHelpline}
                        </span>
                      </div>
                      <a
                        href={trackingData.courierTrackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#FAF6EE] text-[#734D15] hover:bg-[#EAD5B3]/40 border border-[#EAD5B3] font-bold text-[11px] transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Courier Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6-Stage Genuine Factory-to-Doorstep Journey */}
              <div className="p-5 rounded-2xl border border-[#E5E0D8] bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Real Manufacturing & Air Transit Checkpoints</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    600+ DPI Certified Press Production
                  </span>
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                  {trackingData.checkpoints.map((chk) => {
                    const isCompleted = chk.status === "COMPLETED";
                    const isCurrent = chk.status === "CURRENT_ACTIVE_STAGE";

                    return (
                      <div key={chk.id} className="relative group text-xs">
                        {/* Step Marker Node */}
                        <div
                          className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition shadow-2xs ${
                            isCompleted
                              ? "bg-emerald-600 text-white"
                              : isCurrent
                              ? "bg-[#A9782B] text-white ring-4 ring-[#A9782B]/20 animate-pulse"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <span className="text-[10px] font-black">{chk.stepNumber}</span>
                          )}
                        </div>

                        {/* Checkpoint Details */}
                        <div
                          className={`p-3 rounded-xl border transition ${
                            isCurrent
                              ? "bg-gradient-to-r from-[#FAF6EE] to-white border-[#A9782B]/60 shadow-xs"
                              : "bg-[#FAF8F5] border-[#E5E0D8]"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5
                              className={`font-black text-xs ${
                                isCurrent
                                  ? "text-[#734D15]"
                                  : isCompleted
                                  ? "text-slate-900"
                                  : "text-slate-500"
                              }`}
                            >
                              {chk.title}
                            </h5>
                            <span
                              className={`text-[10px] font-mono font-bold ${
                                isCurrent
                                  ? "text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded"
                                  : "text-slate-400"
                              }`}
                            >
                              {chk.timestamp}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>
                              {chk.locationName} • {chk.city}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                            {chk.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All corporate shipments are 100% transit-insured against damage or delay.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {trackingData && (
              <a
                href={`https://wa.me/919945039266?text=${encodeURIComponent(
                  `Hi Incredible Treasures, I am tracking my corporate order #${trackingData.orderId} (AWB: ${trackingData.awbNumber}). Please confirm today's production & dispatch schedule.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Live Desk</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
