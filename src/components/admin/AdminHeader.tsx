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
  Lock,
  LayoutDashboard,
  Settings,
  Truck,
  CreditCard,
  ChevronDown,
  UserCheck,
} from "lucide-react";
import {
  AdminUserSession,
  AdminTab,
  AdminRole,
  canRoleAccessTab,
  ENTERPRISE_ADMIN_ACCOUNTS,
  switchAdminRole,
} from "@/lib/adminAuth";
import { PlacedOrder } from "@/lib/orderStore";
import { downloadGstr1TaxReport } from "@/lib/taxExport";

interface Props {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  orders: PlacedOrder[];
  session: AdminUserSession;
  onLogout: () => void;
  onRoleSwitched?: () => void;
}

export const AdminHeader: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  orders,
  session,
  onLogout,
  onRoleSwitched,
}) => {
  const [cargoCountdown, setCargoCountdown] = useState<string>("03h 48m 12s");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState<boolean>(false);
  const [restrictedToast, setRestrictedToast] = useState<string | null>(null);

  const account = ENTERPRISE_ADMIN_ACCOUNTS[session.email.toLowerCase()] || ENTERPRISE_ADMIN_ACCOUNTS["admin@incredibletreasures.com"];

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

  const showRestrictedAlert = (tabLabel: string) => {
    setRestrictedToast(`🔒 Access Restricted: The "${tabLabel}" module is locked for ${account.badgeLabel} per company security policy.`);
    setTimeout(() => setRestrictedToast(null), 3500);
  };

  const handleRoleSwitch = (email: string) => {
    switchAdminRole(email);
    setIsRoleDropdownOpen(false);
    if (onRoleSwitched) onRoleSwitched();
  };

  const ALL_TABS: Array<{ id: AdminTab; label: string; icon: any; badge?: number; highlight?: boolean }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders Pipeline", icon: Layers, badge: orders.length },
    { id: "catalog", label: "Product Catalog", icon: ShoppingBag },
    { id: "inventory", label: "Inventory Stock", icon: Package },
    { id: "shipping", label: "BlueDart Shipping", icon: Truck },
    { id: "payments", label: "Payments & Tax Ledger", icon: CreditCard },
    { id: "customers", label: "Corporate Roster", icon: Building2 },
    { id: "marketing", label: "Banners & Festive", icon: Sparkles, highlight: true },
    { id: "settings", label: "RBAC & Team Settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAD5B3] shadow-xs font-sans">
      {/* Restricted Alert Toast */}
      {restrictedToast && (
        <div className="bg-rose-600 text-white text-xs font-bold px-4 py-2 text-center animate-in slide-in-from-top duration-200">
          {restrictedToast}
        </div>
      )}

      {/* Top Luxury Announcement & Airport Cutoff Strip */}
      <div className="px-4 sm:px-8 py-2 bg-gradient-to-r from-[#FAF8F5] via-[#FAF6EE] to-[#FAF8F5] border-b border-[#EAD5B3]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Brand Identification & Current Role Badge */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase border ${account.badgeColor}`}>
            {account.badgeLabel}
          </span>
          <span className="text-[11px] text-slate-700 font-bold">
            {session.name}
          </span>
          <span className="hidden md:inline text-[11px] text-slate-400">
            • {session.email}
          </span>
        </div>

        {/* Right: Quick Role Switcher + Airport Timer */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Fast Role Switcher Dropdown (Allows client to test all 5 IDs in 1 click!) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="px-3 py-1 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Test permissions across all 5 Admin Roles"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#A9782B]" />
              <span>Test Role: <strong>{account.badgeLabel}</strong></span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95">
                <span className="px-3 py-1.5 text-[10px] font-mono font-black uppercase text-slate-400 block border-b border-slate-100">
                  Switch Active Role (5 Admin IDs)
                </span>
                {Object.values(ENTERPRISE_ADMIN_ACCOUNTS).map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleRoleSwitch(acc.email)}
                    className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between cursor-pointer ${
                      session.email.toLowerCase() === acc.email.toLowerCase()
                        ? "bg-[#FAF6EE] text-[#734D15] font-bold"
                        : "hover:bg-slate-50 text-slate-700 font-medium"
                    }`}
                  >
                    <div>
                      <strong className="block text-xs">{acc.name}</strong>
                      <span className="text-[10px] text-slate-400 block">{acc.email}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase border ${acc.badgeColor}`}>
                      {acc.badgeLabel}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BlueDart Airport Cargo Cutoff */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAD5B3] text-[#734D15] text-[11px] shadow-xs">
            <Plane className="w-3.5 h-3.5 text-[#A9782B] animate-pulse" />
            <span>
              <strong className="font-serif">Air Cargo Cutoff:</strong>{" "}
              <span className="font-mono font-black text-slate-900">{cargoCountdown}</span>
            </span>
          </div>

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
            title="Sign Out of Admin Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Brand Logo Bar */}
      <div className="px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-44 sm:w-52">
            <Image
              src="/images/logo-transparent.png"
              alt="Incredible Treasures"
              fill
              sizes="(max-width: 640px) 176px, 208px"
              priority
              className="object-contain object-left"
            />
          </div>

          <div className="hidden lg:block border-l border-[#EAD5B3] pl-4">
            <h2 className="font-serif font-bold text-sm text-slate-900 tracking-wide uppercase">
              Factory Command & Enterprise Backoffice
            </h2>
            <p className="text-[11px] text-[#8E621E] font-medium">
              Role-Based Access Control • 5 Authorized Tiers • Mutual Landing Dashboard
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Session: {account.badgeLabel}</span>
          </span>
        </div>
      </div>

      {/* Main Tab Navigation Bar with Role-Based Locks */}
      <div className="px-4 sm:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5 bg-white">
        {ALL_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isAllowed = canRoleAccessTab(session.role, tab.id);

          if (!isAllowed) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => showRestrictedAlert(tab.label)}
                className="px-3.5 py-2 rounded-xl font-serif text-xs tracking-wide transition flex items-center gap-2 shrink-0 text-slate-400 bg-slate-50/80 border border-transparent opacity-50 cursor-not-allowed select-none"
                title={`Locked: ${tab.label} is restricted for ${account.badgeLabel}`}
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span className="line-through">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-serif text-xs tracking-wide transition flex items-center gap-2 cursor-pointer shrink-0 border-b-2 ${
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
