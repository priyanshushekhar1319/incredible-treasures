"use client";

import React, { useState, useEffect } from "react";
import { getAdminSession, logoutAdmin } from "@/lib/adminAuth";
import { getStoredOrders, syncOrdersFromDatabase, PlacedOrder } from "@/lib/orderStore";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AdminHeader, AdminTab } from "@/components/admin/AdminHeader";
import { AdminPipelineTab } from "@/components/admin/AdminPipelineTab";
import { AdminMarketingTab } from "@/components/admin/AdminMarketingTab";
import { AdminTaxLedgerTab } from "@/components/admin/AdminTaxLedgerTab";
import { AdminCatalogTab } from "@/components/admin/AdminCatalogTab";
import { AdminPricingTab } from "@/components/admin/AdminPricingTab";
import { AdminInventoryTab } from "@/components/admin/AdminInventoryTab";
import { AdminBatchingTab } from "@/components/admin/AdminBatchingTab";
import { AdminCorporateRosterTab } from "@/components/admin/AdminCorporateRosterTab";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("orders");
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [isClientReady, setIsClientReady] = useState<boolean>(false);

  const reloadOrders = async () => {
    // 1. Immediate local cache rendering
    setOrders(getStoredOrders());
    // 2. Live Server Database sync (Postgres / Prisma)
    try {
      const live = await syncOrdersFromDatabase();
      if (live && live.length > 0) {
        setOrders(live);
      }
    } catch (e) {
      console.warn("Could not sync live DB orders:", e);
    }
  };

  useEffect(() => {
    setIsClientReady(true);
    const session = getAdminSession();
    if (session) {
      setIsAuthenticated(true);
      reloadOrders();
    }

    const handleOrderPlaced = () => reloadOrders();
    const handleOrderUpdated = () => reloadOrders();
    const handleAdminLogin = () => {
      setIsAuthenticated(true);
      reloadOrders();
    };
    const handleAdminLogout = () => {
      setIsAuthenticated(false);
    };

    window.addEventListener("it_order_placed", handleOrderPlaced);
    window.addEventListener("it_order_updated", handleOrderUpdated);
    window.addEventListener("it_admin_login", handleAdminLogin);
    window.addEventListener("it_admin_logout", handleAdminLogout);

    // Live Database polling every 12 seconds so new customer orders appear in real-time
    const pollInterval = setInterval(() => {
      if (session) {
        syncOrdersFromDatabase().then((live) => {
          if (live && live.length > 0) setOrders(live);
        });
      }
    }, 12000);

    return () => {
      window.removeEventListener("it_order_placed", handleOrderPlaced);
      window.removeEventListener("it_order_updated", handleOrderUpdated);
      window.removeEventListener("it_admin_login", handleAdminLogin);
      window.removeEventListener("it_admin_logout", handleAdminLogout);
      clearInterval(pollInterval);
    };
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  if (!isClientReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-sans">
        <div className="space-y-2 text-center">
          <div className="w-8 h-8 border-2 border-[#A9782B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Initializing Factory Command Security...</p>
        </div>
      </div>
    );
  }

  // Stealth Mode: If not authenticated, render 404 Not Found to obscure admin existence
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAD5B3] p-8 sm:p-10 shadow-sm space-y-4">
          <span className="text-6xl sm:text-7xl font-serif font-black text-[#A9782B] tracking-tight">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            The requested page could not be located. It may have been moved, renamed, or is temporarily unavailable.
          </p>
          <div className="pt-2">
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold tracking-wide transition shadow-sm"
            >
              Return to Storefront
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-slate-900">
      <AdminHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        orders={orders}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === "orders" && (
          <AdminPipelineTab orders={orders} onRefreshOrders={reloadOrders} />
        )}

        {activeTab === "marketing" && <AdminMarketingTab />}

        {activeTab === "tax" && <AdminTaxLedgerTab orders={orders} />}

        {activeTab === "catalog" && <AdminCatalogTab />}

        {activeTab === "pricing" && <AdminPricingTab />}

        {activeTab === "inventory" && <AdminInventoryTab />}

        {activeTab === "batching" && <AdminBatchingTab orders={orders} />}

        {activeTab === "roster" && <AdminCorporateRosterTab />}
      </main>

      <footer className="py-6 border-t border-[#EAD5B3] bg-white text-center text-xs text-slate-600 font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-serif font-bold text-slate-900 tracking-wide">
            INCREDIBLE TREASURES LUXURY STUDIO & PRESS WORKS
          </p>
          <p className="text-[11px] text-[#734D15]">
            Corporate Office: Tasker Town • Offset Press Works: Peenya 2nd Stage • Bengaluru, India • GSTIN: 29AAKFI2392F1Z5
          </p>
          <p className="text-[10px] text-slate-400 font-mono pt-1">
            Statutory MCA/GST Compliance • BlueDart Kempegowda Cargo Air Dispatch • 256-Bit Cryptographic Authorization
          </p>
        </div>
      </footer>
    </div>
  );
}
