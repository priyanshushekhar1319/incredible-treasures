"use client";

import React, { useState, useEffect } from "react";
import { getAdminSession, logoutAdmin } from "@/lib/adminAuth";
import { getStoredOrders, syncOrdersFromDatabase, PlacedOrder } from "@/lib/orderStore";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AdminHeader, AdminTab } from "@/components/admin/AdminHeader";
import { AdminPipelineTab } from "@/components/admin/AdminPipelineTab";
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

  if (!isAuthenticated) {
    return <AdminLoginModal onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-slate-900">
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

        {activeTab === "catalog" && <AdminCatalogTab />}

        {activeTab === "pricing" && <AdminPricingTab />}

        {activeTab === "inventory" && <AdminInventoryTab />}

        {activeTab === "batching" && <AdminBatchingTab orders={orders} />}

        {activeTab === "roster" && <AdminCorporateRosterTab />}
      </main>

      <footer className="py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500 font-medium">
        <span>Incredible Treasures Industrial Web-to-Print ERP • Automated Indian GST & CTP Production Active</span>
      </footer>
    </div>
  );
}
