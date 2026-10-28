"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  ShoppingBag,
  Sliders,
  Package,
  Grid3X3,
  Building2,
  FileSpreadsheet,
  LogOut,
  Clock,
  Sparkles,
  Plane,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { logoutAdmin } from "@/lib/adminAuth";
import { PlacedOrder } from "@/lib/orderStore";
import { downloadGstr1TaxReport } from "@/lib/taxExport";

export type AdminTab = "orders" | "catalog" | "pricing" | "inventory" | "batching" | "roster";

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
      // Cutoff time set at 19:30 (07:30 PM) for BlueDart Kempegowda Airport Apex Air flights
      const cutoff = new Date();
      cutoff.setHours(19, 30, 0, 0);

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
    <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40 shadow-xl font-sans">
      {/* Top Utility & Airport Cutoff Bar */}
      <div className="px-4 sm:px-8 py-2.5 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Brand & Security Stamp */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            IT
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-white tracking-tight text-sm">
              Incredible Treasures
            </span>
            <span className="text-[10px] bg-[#A9782B]/20 border border-[#A9782B]/40 text-[#CBA768] px-2 py-0.5 rounded-full font-mono uppercase font-bold">
              Factory Command ERP
            </span>
          </div>
        </div>

        {/* Airport Cargo Cutoff Live Timer (Feature 6) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-300 text-[11px] shadow-xs">
            <Plane className="w-3.5 h-3.5 text-[#CBA768] animate-pulse" />
            <span>
              <strong>BlueDart Air Cargo Cutoff:</strong>{" "}
              <span className="font-mono font-black text-amber-200">{cargoCountdown}</span>
            </span>
            {pendingVipCount > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[10px] font-black uppercase">
                {pendingVipCount} VIP Rush
              </span>
            )}
          </div>

          {/* 1-Click GSTR-1 Tax Report Download (Feature 7) */}
          <button
            type="button"
            onClick={() => downloadGstr1TaxReport(orders)}
            className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-[11px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Download Official Indian GSTR-1 Sales Register CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>GSTR-1 Tax Report (CSV)</span>
          </button>

          {/* View Live Storefront */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition flex items-center gap-1"
          >
            <span>Storefront</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="px-4 sm:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
        {[
          { id: "orders", label: "Orders & Production Pipeline", icon: Layers, badge: orders.length },
          { id: "catalog", label: "Product Catalog Manager", icon: ShoppingBag },
          { id: "pricing", label: "Dynamic Pricing & GST Matrix", icon: Sliders },
          { id: "inventory", label: "Stock & Substrates", icon: Package },
          { id: "batching", label: "Gang-Run Batching Optimizer", icon: Grid3X3, highlight: true },
          { id: "roster", label: "Corporate Client Roster", icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id as AdminTab)}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shrink-0 border-b-2 ${
                isActive
                  ? "bg-slate-900 text-amber-300 border-[#A9782B] shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60 border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#CBA768]" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                    isActive ? "bg-[#A9782B] text-slate-950" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {tab.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
