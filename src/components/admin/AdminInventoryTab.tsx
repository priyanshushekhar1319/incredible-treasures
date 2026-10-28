"use client";

import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Layers,
  Sparkles,
  RefreshCw,
  Building,
  Clock,
  X,
} from "lucide-react";
import {
  getInventoryStock,
  updateStockQuantity,
  saveInventoryItem,
  InventoryStockItem,
} from "@/lib/adminStore";

export const AdminInventoryTab: React.FC = () => {
  const [stock, setStock] = useState<InventoryStockItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Item Form
  const [name, setName] = useState("");
  const [category, setCategory] = useState<InventoryStockItem["category"]>("paper");
  const [qty, setQty] = useState(1000);
  const [unit, setUnit] = useState<InventoryStockItem["unit"]>("Pieces");
  const [threshold, setThreshold] = useState(200);
  const [leadDays, setLeadDays] = useState(3);
  const [supplier, setSupplier] = useState("Peenya Paper Mill Supply Co.");

  const reloadStock = () => {
    setStock(getInventoryStock());
  };

  useEffect(() => {
    reloadStock();
    const handleUpdate = () => reloadStock();
    window.addEventListener("it_inventory_updated", handleUpdate);
    return () => window.removeEventListener("it_inventory_updated", handleUpdate);
  }, []);

  const handleAdjustQty = (id: string, delta: number) => {
    updateStockQuantity(id, delta);
    reloadStock();
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: InventoryStockItem = {
      id: `inv-${Date.now()}`,
      name,
      category,
      currentQuantity: qty,
      unit,
      minThreshold: threshold,
      reorderLeadTimeDays: leadDays,
      supplier,
      lastUpdated: new Date().toISOString(),
    };

    saveInventoryItem(newItem);
    setIsAddModalOpen(false);
    reloadStock();
  };

  const lowStockItems = stock.filter((s) => s.currentQuantity <= s.minThreshold);

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Total Raw Materials
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">{stock.length}</span>
            <Package className="w-5 h-5 text-[#A9782B]" />
          </div>
          <span className="text-[11px] text-slate-500">Active Substrates & Accessories</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Stock Health Status
          </span>
          <div className="flex items-center justify-between">
            <span
              className={`text-2xl font-black font-mono ${
                lowStockItems.length > 0 ? "text-rose-600" : "text-emerald-700"
              }`}
            >
              {lowStockItems.length > 0 ? `${lowStockItems.length} Low Stock` : "100% Healthy"}
            </span>
            <AlertTriangle
              className={`w-5 h-5 ${lowStockItems.length > 0 ? "text-rose-500" : "text-emerald-500"}`}
            />
          </div>
          <span className="text-[11px] text-slate-500">
            {lowStockItems.length > 0
              ? "Reorder recommended for flagged substrates"
              : "All substrate reserves above reorder limits"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Stock Management
          </span>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-1"
          >
            <Plus className="w-4 h-4 text-[#CBA768]" />
            <span>Add Raw Material SKU</span>
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-black text-rose-950 block">
              Urgent Factory Reorder Required for {lowStockItems.length} Substrate(s):
            </strong>
            <p className="text-[11px] text-rose-800 leading-relaxed">
              {lowStockItems.map((s) => `${s.name} (${s.currentQuantity} ${s.unit} left)`).join(", ")}. Please transmit purchase orders to vendors.
            </p>
          </div>
        </div>
      )}

      {/* Inventory Items List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h4 className="font-black text-slate-900 text-xs">Substrate Reserves & Stock Registry</h4>
          <span className="text-[11px] text-slate-500">Offset, Digital & PVC Conversion Line</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {stock.map((item) => {
            const isLow = item.currentQuantity <= item.minThreshold;
            return (
              <div
                key={item.id}
                className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-slate-50/60 ${
                  isLow ? "bg-rose-50/30" : ""
                }`}
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 font-bold text-sm">{item.name}</strong>
                    {isLow && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[9px] font-black uppercase">
                        Low Stock Alert
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="capitalize font-semibold text-slate-700">Category: {item.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-400" />
                      {item.supplier}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Lead Time: {item.reorderLeadTimeDays} Days
                    </span>
                  </div>
                </div>

                {/* Quantity & Adjustment Controls */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">
                      Current Stock / Min Limit
                    </span>
                    <div className="font-mono text-base font-black">
                      <span className={isLow ? "text-rose-600" : "text-slate-900"}>
                        {item.currentQuantity.toLocaleString("en-IN")}
                      </span>{" "}
                      <span className="text-slate-400 text-xs font-normal">
                        / {item.minThreshold.toLocaleString("en-IN")} {item.unit}
                      </span>
                    </div>
                  </div>

                  {/* Increment / Decrement Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleAdjustQty(item.id, -100)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-xs transition cursor-pointer"
                      title="Deduct 100"
                    >
                      -100
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustQty(item.id, 100)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-xs transition cursor-pointer"
                      title="Add 100"
                    >
                      +100
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustQty(item.id, 500)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs transition cursor-pointer"
                      title="Restock 500 units"
                    >
                      +500
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#A9782B]" />
                <h4 className="text-sm font-black text-slate-900">Add Raw Material SKU</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Substrate / Material Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 400-Micron Transparent PVC Blanks"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  >
                    <option value="pvc">PVC Blanks</option>
                    <option value="paper">Paper Sheets</option>
                    <option value="mugs">Ceramic Mugs</option>
                    <option value="foil">Stamping Foils</option>
                    <option value="packaging">Packaging</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit of Measure:</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  >
                    <option value="Pieces">Pieces</option>
                    <option value="Sheets">Sheets</option>
                    <option value="Reams">Reams</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Cartons">Cartons</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Qty:</label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min Threshold:</label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lead Days:</label>
                  <input
                    type="number"
                    value={leadDays}
                    onChange={(e) => setLeadDays(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Supplier:</label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="e.g. Jindal Poly Films Ltd • Mumbai"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition cursor-pointer"
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
