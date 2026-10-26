"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Plane,
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
  Radio,
} from "lucide-react";
import { getLiveOrderTracking, LiveOrderTrackingDetails } from "@/lib/orderTracking";

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
  initialPincode = "560001",
  customerName = "Mahi Kapoor",
  companyName = "Incredible Treasures Luxury Studio",
}) => {
  const [searchOrderId, setSearchOrderId] = useState<string>(initialOrderId);
  const [trackingData, setTrackingData] = useState<LiveOrderTrackingDetails>(() =>
    getLiveOrderTracking(initialOrderId, initialPincode, customerName, companyName)
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsRefreshing(true);
    setTimeout(() => {
      setTrackingData(
        getLiveOrderTracking(
          searchOrderId.trim() || initialOrderId,
          initialPincode,
          customerName,
          companyName
        )
      );
      setIsRefreshing(false);
    }, 400);
  };

  const currentActiveCheckpoint = trackingData.checkpoints.find(
    (c) => c.status === "CURRENT_LIVE_LOCATION"
  ) || trackingData.checkpoints[3];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col font-sans overflow-hidden">
        {/* Header Strip */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF6EE] border-b border-[#E5E0D8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center shadow-xs">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Live Product Location & Air Dispatch Tracker
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase flex items-center gap-1 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  Live GPS Transit
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Real-time tracking from our Bangalore offset press to your destination office.
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

        {/* Omnibar: Search any Order / AWB */}
        <div className="px-6 py-2.5 bg-[#FAF8F5] border-b border-[#E5E0D8] flex items-center justify-between gap-3 shrink-0">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value.toUpperCase())}
                placeholder="Search by Order ID (e.g. IT-PRINT-017378) or AWB..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-mono font-bold text-slate-800 bg-white outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
            >
              Track
            </button>
          </form>

          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={isRefreshing}
            className="p-2 rounded-xl text-slate-500 hover:text-[#A9782B] hover:bg-white transition cursor-pointer"
            title="Refresh GPS Location"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#A9782B]" : ""}`} />
          </button>
        </div>

        {/* Scrollable Tracker Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50/50">
          {/* Top Live Radar Card */}
          <div className="rounded-3xl border border-[#EAD5B3] bg-gradient-to-br from-slate-950 via-[#1C140A] to-slate-900 text-white p-5 shadow-lg relative overflow-hidden">
            {/* Ambient Background Grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#A9782B 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#CBA768] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  CURRENT LIVE LOCATION
                </span>
                <h4 className="text-base sm:text-lg font-black text-white mt-1 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{trackingData.currentLocationName}</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Air Cargo Terminal • Master Docket: <span className="font-mono text-amber-300 font-bold">#{trackingData.awbNumber}</span>
                </p>
              </div>

              {/* ETA Golden Pill */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shrink-0 text-right">
                <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">
                  Guaranteed Doorstep ETA
                </span>
                <span className="text-sm font-black text-white block mt-0.5">
                  {trackingData.estimatedDeliveryTime}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                  ✓ On-Time Express Schedule
                </span>
              </div>
            </div>

            {/* Simulated Live Route Bar */}
            <div className="relative z-10 mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2">
                <span>Bengaluru Factory Press</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 animate-bounce" />
                  Air Transit in Progress
                </span>
                <span>{trackingData.destinationCity} Destination</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-[#CBA768] to-yellow-300 rounded-full transition-all duration-700"
                  style={{ width: `${trackingData.progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Courier Partner Card */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Air Courier Partner
              </span>
              <strong className="text-slate-900 font-bold block text-sm mt-0.5">
                {trackingData.courierPartner}
              </strong>
              <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                Helpline: {trackingData.courierHelpline}
              </span>
            </div>

            {/* Destination Address */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Destination Address
              </span>
              <strong className="text-slate-900 font-bold block text-sm mt-0.5 truncate">
                {trackingData.destinationCity} ({trackingData.pincode})
              </strong>
              <span className="text-[11px] text-slate-500 mt-0.5 block truncate">
                {trackingData.deliveryAddress}
              </span>
            </div>

            {/* Delivery Executive */}
            {trackingData.deliveryExecutive && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Assigned Delivery Lead
                </span>
                <strong className="text-slate-900 font-bold block text-sm mt-0.5">
                  {trackingData.deliveryExecutive.name}
                </strong>
                <a
                  href={`tel:${trackingData.deliveryExecutive.phone}`}
                  className="text-[11px] text-[#A9782B] font-bold mt-0.5 flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>{trackingData.deliveryExecutive.phone}</span>
                </a>
              </div>
            )}
          </div>

          {/* Step-by-Step Factory-to-Doorstep Tracking Milestones */}
          <div className="bg-white rounded-3xl border border-[#E5E0D8] p-5 shadow-2xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-4 flex items-center justify-between">
              <span>Factory-to-Doorstep Checkpoint Journey</span>
              <span className="text-[11px] font-bold text-slate-500">
                6-Stage Production & Air Transit Flow
              </span>
            </h4>

            <div className="space-y-4">
              {trackingData.checkpoints.map((chk, index) => {
                const isCompleted = chk.status === "COMPLETED";
                const isCurrent = chk.status === "CURRENT_LIVE_LOCATION";
                const isUpcoming = chk.status === "UPCOMING";

                return (
                  <div key={chk.id} className="flex items-start gap-3.5 relative group">
                    {/* Vertical connecting line */}
                    {index < trackingData.checkpoints.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                          isCompleted ? "bg-[#A9782B]" : "bg-slate-200"
                        }`}
                      />
                    )}

                    {/* Step Icon Node */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        isCompleted
                          ? "bg-[#A9782B] border-[#A9782B] text-white shadow-xs"
                          : isCurrent
                          ? "bg-amber-500 border-amber-600 text-white ring-4 ring-amber-400/30 animate-pulse shadow-md"
                          : "bg-slate-100 border-slate-300 text-slate-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isCurrent ? (
                        <Plane className="w-4 h-4" />
                      ) : (
                        <span className="text-[11px] font-bold">{chk.stepNumber}</span>
                      )}
                    </div>

                    {/* Content Details */}
                    <div
                      className={`flex-1 rounded-2xl p-3 border transition-all ${
                        isCurrent
                          ? "bg-[#FAF6EE] border-[#A9782B] shadow-xs"
                          : "bg-[#FAF8F5]/60 border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <strong className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span>{chk.title}</span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider">
                              ACTIVE LOCATION
                            </span>
                          )}
                        </strong>
                        <span className="text-[10px] font-bold text-slate-500 font-mono">
                          {chk.timestamp}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 mt-1">
                        {chk.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-slate-500">
                        <span className="flex items-center gap-1 text-[#734D15]">
                          <MapPin className="w-3 h-3 text-[#A9782B]" />
                          {chk.locationName} ({chk.city})
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#A9782B]" />
            <span>All transit orders are 100% insured against damage or delay.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* WhatsApp Live Updates */}
            <a
              href={`https://wa.me/919945039266?text=${encodeURIComponent(
                `Hi Incredible Treasures, please send live WhatsApp location updates for Order #${trackingData.orderId} (AWB: ${trackingData.awbNumber}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer flex-1 sm:flex-initial"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Alerts</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer shadow-2xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
