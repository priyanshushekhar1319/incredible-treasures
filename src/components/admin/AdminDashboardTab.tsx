"use client";

import React from "react";
import {
  Layers,
  Sparkles,
  ShoppingBag,
  Package,
  Plane,
  CreditCard,
  Building2,
  FileSpreadsheet,
  Settings,
  ShieldCheck,
  Lock,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Eye,
  EyeOff,
} from "lucide-react";
import { AdminUserSession, AdminTab, canRoleAccessTab, ENTERPRISE_ADMIN_ACCOUNTS } from "@/lib/adminAuth";
import { PlacedOrder } from "@/lib/orderStore";

interface Props {
  session: AdminUserSession;
  orders: PlacedOrder[];
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminDashboardTab: React.FC<Props> = ({ session, orders, onSelectTab }) => {
  const account = ENTERPRISE_ADMIN_ACCOUNTS[session.email.toLowerCase()] || ENTERPRISE_ADMIN_ACCOUNTS["admin@incredibletreasures.com"];
  const isRevenueHidden = Boolean(session.hideRevenueData || account.hideRevenueData);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.pricing.grandTotal || 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== "DELIVERED").length;
  const vipRushOrders = orders.filter((o) => o.pricing.shippingTier === "priority_vip" && o.status !== "DELIVERED").length;

  const STAGES: Array<{
    title: string;
    subtitle: string;
    items: Array<{ id: AdminTab; label: string; desc: string; icon: any }>;
  }> = [
    {
      title: "1. Setup & Configuration",
      subtitle: "Foundational product attributes & store settings",
      items: [
        { id: "catalog", label: "Product Catalog", desc: "Substrates, variants & luxury finishes", icon: ShoppingBag },
        { id: "inventory", label: "Inventory Stock", desc: "Raw PVC blanks, paper art boards & mugs", icon: Package },
        { id: "settings", label: "Team Roles & Settings", desc: "5 Enterprise admin IDs & permissions", icon: Settings },
      ],
    },
    {
      title: "2. Attract & Marketing",
      subtitle: "Campaign promotions & festive conversion drivers",
      items: [
        { id: "marketing", label: "Festive Banners & FX", desc: "Diwali 24K gold foil banner with crackers", icon: Sparkles },
        { id: "marketing", label: "Coupons & Discounts", desc: "DIWALI20, FIRST500 & free air shipping", icon: Sparkles },
      ],
    },
    {
      title: "3. Fulfil Orders & Logistics",
      subtitle: "Offset press workflow, payments & air cargo dispatch",
      items: [
        { id: "orders", label: "Order Pipeline", desc: "6-stage lifecycle from Placed to Delivered", icon: Layers },
        { id: "shipping", label: "BlueDart Air Shipping", desc: "Kempegowda airport master docket AWB", icon: Truck },
        { id: "payments", label: "Payments & Tax Ledger", desc: "Razorpay reconciliation & GSTR-1 CSV", icon: CreditCard },
      ],
    },
    {
      title: "4. Grow & Corporate Roster",
      subtitle: "Enterprise clients, repeat batches & statutory audits",
      items: [
        { id: "customers", label: "Corporate Client Roster", desc: "Brand palettes, GSTIN & 1-click reorders", icon: Building2 },
        { id: "payments", label: "Statutory CA Reports", desc: "Monthly tax audits, CGST 9% & SGST 9%", icon: FileSpreadsheet },
      ],
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#1C150C] to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-[#EAD5B3]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A9782B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase border ${account.badgeColor}`}>
                {account.badgeLabel}
              </span>
              <span className="text-xs text-amber-200/80 font-mono">
                {session.email}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
              Welcome back, {session.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {account.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">Active Orders</span>
              <strong className="text-xl font-mono font-black text-amber-400">{pendingOrders}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">BlueDart Priority</span>
              <strong className="text-xl font-mono font-black text-rose-400">{vipRushOrders}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Orders Pipeline */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAD5B3] space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#734D15]">
              Real Production Orders
            </span>
            <Layers className="w-4 h-4 text-[#A9782B]" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{orders.length}</div>
          <p className="text-[11px] text-slate-500 font-serif">
            {pendingOrders === 0 ? "Production floor 100% clear" : `${pendingOrders} orders active on press machines`}
          </p>
        </div>

        {/* KPI 2: Gross Store Revenue (Hidden for Warehouse Role per PDF) */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAD5B3] space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#734D15]">
              Gross Store Revenue
            </span>
            {isRevenueHidden ? (
              <span title="Restricted per Security Policy">
                <EyeOff className="w-4 h-4 text-slate-400" />
              </span>
            ) : (
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            )}
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {isRevenueHidden ? (
              <span className="text-sm text-slate-400 tracking-wider">₹ •••••• (Restricted)</span>
            ) : (
              `₹${totalRevenue.toLocaleString("en-IN")}`
            )}
          </div>
          <p className="text-[11px] text-slate-500 font-serif">
            {isRevenueHidden ? "Restricted: Warehouse clearance required" : "18% GST collected & ITC audited"}
          </p>
        </div>

        {/* KPI 3: Airport Cargo Cutoff */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAD5B3] space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#734D15]">
              Airport Air Cargo SLA
            </span>
            <Plane className="w-4 h-4 text-[#A9782B]" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">07:30 PM</div>
          <p className="text-[11px] text-slate-500 font-serif">
            Kempegowda BLR Apex Air Daily Flight
          </p>
        </div>

        {/* KPI 4: Festive Campaign Active */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAD5B3] space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#734D15]">
              Diwali Mahotsav Campaign
            </span>
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">Active 20% Off</div>
          <p className="text-[11px] text-slate-500 font-serif">
            Crackers FX & 24K Gold Foil banner live
          </p>
        </div>
      </div>

      {/* 4 Stages Matrix from PDF Page 2 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900">
              Role-Based Operation Modules (4 Stages)
            </h3>
            <p className="text-xs text-slate-500">
              Green border = Unlocked for your role ({account.badgeLabel}). Lock icon = Restricted per company security matrix.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STAGES.map((stage, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="border-b border-slate-100 pb-2.5">
                <h4 className="font-serif font-bold text-sm text-slate-900">{stage.title}</h4>
                <p className="text-[11px] text-slate-500">{stage.subtitle}</p>
              </div>

              <div className="space-y-2">
                {stage.items.map((it, i) => {
                  const Icon = it.icon;
                  const isAllowed = canRoleAccessTab(session.role, it.id);

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (isAllowed) {
                          onSelectTab(it.id);
                        } else {
                          alert(`🔒 Access Restricted: The "${it.label}" module is not permitted for ${account.badgeLabel}. Please contact the Super Admin.`);
                        }
                      }}
                      className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 ${
                        isAllowed
                          ? "bg-slate-50 hover:bg-[#FAF6EE] border-slate-200 hover:border-[#A9782B] cursor-pointer"
                          : "bg-slate-100/60 border-slate-200/60 opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isAllowed ? "bg-white text-[#A9782B] border border-[#EAD5B3]" : "bg-slate-200 text-slate-400"
                          }`}
                        >
                          {isAllowed ? <Icon className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </div>
                        <div>
                          <strong className={`text-xs block ${isAllowed ? "text-slate-900" : "text-slate-500"}`}>
                            {it.label}
                          </strong>
                          <span className="text-[11px] text-slate-400 block">{it.desc}</span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isAllowed ? (
                          <span className="text-[11px] font-bold text-[#A9782B] flex items-center gap-1">
                            <span>Open</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1 bg-slate-200/70 px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Center for Pending Work (PDF Page 2) */}
      <div className="bg-white rounded-3xl border border-[#EAD5B3] p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h4 className="font-serif font-bold text-base text-slate-900">
              Operations Action Center
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Security Status: 100% Operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3] space-y-1">
            <strong className="text-slate-900 block font-bold">1. Zero Fake Data Guarantee</strong>
            <p className="text-[11px] text-slate-500">
              All demo orders, fake companies, and test coupons have been purged. Only live customer transactions appear here.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3] space-y-1">
            <strong className="text-slate-900 block font-bold">2. Stealth 404 Route Active</strong>
            <p className="text-[11px] text-slate-500">
              Unauthenticated public visits to /admin return a standard 404 Not Found. Only authorized accounts can see this console.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3] space-y-1">
            <strong className="text-slate-900 block font-bold">3. Multi-Role Clearance</strong>
            <p className="text-[11px] text-slate-500">
              You are signed in as <strong>{account.badgeLabel}</strong>. Switch accounts in the header to test permissions for other team members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
