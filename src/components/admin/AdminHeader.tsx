"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Layers,
  ShoppingBag,
  Sliders,
  Package,
  Grid3X3,
  Building2,
  FileSpreadsheet,
  LogOut,
  Sparkles,
  Plane,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { logoutAdmin } from "@/lib/adminAuth";
import { PlacedOrder } from "@/lib/orderStore";
import { downloadGstr1TaxReport } from "@/lib/taxExport";

export type AdminTab =
  | "orders"
  | "marketing"
  | "tax"
  | "catalog"
  | "pricing"
  | "inventory"
  | "batching"
  | "roster";

interface Props {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  orders: PlacedOrder[];
  onLogout: () => void;
}

export const AdminHeader: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  orders,
  onLogout,
}) => {
  // Real-time Airport Cargo Cutoff Timer (Feature 6)
  const [cargoCountdown, setCargoCountdown] = useState<string>("03h 48m 12s");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(19, 30, 0, 0); // 07:30 PM Kempegowda Airport BlueDart Apex Air

      if (now.getTime() > cutoff.getTime()) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diff = cutoff.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCargoCountdown(
        `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(
          seconds
        ).padStart(2, "0")}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const pendingVipCount = orders.filter(
    (o) => o.pricing.shippingTier === "priority_vip" && o.status !== "DELIVERED"
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAD5B3] shadow-xs font-sans">
      {/* Top Luxury Announcement & Airport Cutoff Strip */}
      <div className="px-4 sm:px-8 py-2 bg-gradient-to-r from-[#FAF8F5] via-[#FAF6EE] to-[#FAF8F5] border-b border-[#EAD5B3]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Brand Identification */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#734D15] bg-[#FAF6EE] px-2.5 py-0.5 rounded-full border border-[#EAD5B3]">
            ✦ Executive Command ERP • Peenya Works ✦
          </span>
          <span className="hidden md:inline text-[11px] text-slate-500 font-medium">
            GSTIN: 29AAKFI2392F1Z5 • Bengaluru
          </span>
        </div>

        {/* Right: Airport Timer & Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* BlueDart Airport Cargo Cutoff */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAD5B3] text-[#734D15] text-[11px] shadow-xs">
            <Plane className="w-3.5 h-3.5 text-[#A9782B] animate-pulse" />
            <span>
              <strong className="font-serif">BlueDart Kempegowda Cargo:</strong>{" "}
              <span className="font-mono font-black text-slate-900">{cargoCountdown}</span>
            </span>
            {pendingVipCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase">
                {pendingVipCount} VIP Rush
              </span>
            )}
          </div>

          {/* 1-Click GSTR-1 CSV Download */}
          <button
            type="button"
            onClick={() => downloadGstr1TaxReport(orders)}
            className="px-3 py-1 rounded-xl bg-white hover:bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3] font-bold text-[11px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Download Official Indian GSTR-1 Sales Register CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>GSTR-1 CSV</span>
          </button>

          {/* View Live Storefront */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold transition flex items-center gap-1 border border-slate-200"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Brand Logo Bar */}
      <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-4">
          {/* Official Brand Logo */}
          <div className="relative h-11 sm:h-12 w-48 sm:w-56">
            <Image
              src="/images/logo-transparent.png"
              alt="Incredible Treasures"
              fill
              sizes="(max-width: 640px) 192px, 224px"
              priority
              className="object-contain object-left"
            />
          </div>

          <div className="hidden lg:block border-l border-[#EAD5B3] pl-4">
            <h2 className="font-serif font-bold text-sm text-slate-900 tracking-wide uppercase">
              Factory Command & Pre-Press Operations
            </h2>
            <p className="text-[11px] text-[#8E621E] font-medium">
              Autonomous D2C & B2B Production Management Portal
            </p>
          </div>
        </div>

        {/* Security Stamp */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted Session</span>
          </span>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="px-4 sm:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1 bg-white">
        {[
          { id: "orders", label: "Orders & Production Pipeline", icon: Layers, badge: orders.length },
          { id: "marketing", label: "Banners & Festive Offers", icon: Sparkles, highlight: true },
          { id: "tax", label: "Month-End CA Tax Ledger", icon: FileSpreadsheet },
          { id: "catalog", label: "Product Catalog Manager", icon: ShoppingBag },
          { id: "pricing", label: "Dynamic Pricing & GST Matrix", icon: Sliders },
          { id: "inventory", label: "Stock & Substrates", icon: Package },
          { id: "batching", label: "Gang-Run Batching Optimizer", icon: Grid3X3 },
          { id: "roster", label: "Corporate Client Roster", icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id as AdminTab)}
              className={`px-3.5 py-2.5 rounded-xl font-serif text-xs tracking-wide transition flex items-center gap-2 cursor-pointer shrink-0 border-b-2 ${
                isActive
                  ? "bg-[#FAF6EE] text-[#734D15] border-[#A9782B] shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent font-medium"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#A9782B]" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                    isActive ? "bg-[#A9782B] text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {tab.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9782B] animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
