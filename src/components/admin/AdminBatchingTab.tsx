"use client";

import React, { useState } from "react";
import {
  Grid3X3,
  Layers,
  Sparkles,
  Printer,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  Maximize2,
  FileCheck2,
} from "lucide-react";
import { PlacedOrder } from "@/lib/orderStore";
import { computeGangRunBatches, GangRunBatch } from "@/lib/adminStore";

interface Props {
  orders: PlacedOrder[];
}

export const AdminBatchingTab: React.FC<Props> = ({ orders }) => {
  const batches = computeGangRunBatches(orders);
  const [selectedBatchIndex, setSelectedBatchIndex] = useState<number>(0);

  const activeBatch: GangRunBatch | undefined = batches[selectedBatchIndex];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-2 relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-[#CBA768]" />
          <h3 className="text-base font-black tracking-tight text-white flex items-center gap-2">
            <span>Gang-Run Imposition & Plate Optimizer</span>
            <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-mono uppercase font-black">
              Cost Saver Engine
            </span>
          </h3>
        </div>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Instead of running individual press plates for each 500-card order, our automated imposition algorithm groups identical paper substrates onto a single master 12&quot; × 18&quot; sheet. This reduces CTP plate setup costs and paper trim wastage by up to <strong>42%</strong>.
        </p>
      </div>

      {batches.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-black text-slate-700">No Active Orders Available to Batch</h4>
          <p className="text-xs text-slate-400">
            When new orders arrive with matching substrates, the batching engine will group them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          {/* Left Column: Substrate Batch Groups (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Optimized Substrate Batches ({batches.length})
            </span>

            {batches.map((b, idx) => {
              const isSelected = selectedBatchIndex === idx;
              return (
                <button
                  key={b.substrateName}
                  type="button"
                  onClick={() => setSelectedBatchIndex(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer space-y-2 shadow-xs ${
                    isSelected
                      ? "bg-white border-[#A9782B] ring-2 ring-[#A9782B]/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <strong className="text-slate-900 font-bold text-xs">
                      {b.substrateName}
                    </strong>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black font-mono">
                      {b.savingsPercent}% Savings
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{b.matchingOrdersCount} Active Order(s)</span>
                    <span className="font-mono font-bold text-slate-800">
                      {b.totalCardsCount.toLocaleString("en-IN")} Total Units
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#A9782B] rounded-full"
                      style={{ width: `${b.sheetUtilizationPercent}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Plate Imposition Layout (8 cols) */}
          {activeBatch && (
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {activeBatch.impositionLayout}
                  </h4>
                  <p className="text-slate-500 text-xs">
                    Substrate: <strong className="text-slate-800">{activeBatch.substrateName}</strong> • {activeBatch.sheetUtilizationPercent}% Plate Fill
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Batch Transmitted to CTP Plate Setter for ${activeBatch.substrateName}! All 8 job plates scheduled on Heidelberg Press Works.`)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-[#CBA768]" />
                  <span>Transmit Batch to Heidelberg CTP</span>
                </button>
              </div>

              {/* Master 12x18 Sheet Visual Representation (8-Up Slots) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>12&quot; × 18&quot; Master Sheet Surface</span>
                  <span>Gripper Margin: 8mm • Cutting Gutter: 3mm</span>
                </div>

                {/* 8-Up Grid Simulation */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Array.from({ length: 8 }).map((_, slotIdx) => {
                    const assignedOrder = activeBatch.orders[slotIdx % activeBatch.orders.length];
                    const slotItem = assignedOrder?.items[0];

                    return (
                      <div
                        key={slotIdx}
                        className="p-3 rounded-xl border bg-white border-slate-200 hover:border-[#A9782B] transition space-y-1.5 shadow-2xs text-[10px]"
                      >
                        <div className="flex justify-between items-center text-slate-400 font-mono text-[9px]">
                          <span>SLOT #{slotIdx + 1}</span>
                          <span className="text-[#A9782B] font-bold">3.5&quot; × 2.0&quot;</span>
                        </div>

                        <strong className="text-slate-900 font-bold block truncate" title={assignedOrder?.customer.companyName}>
                          {assignedOrder?.customer.companyName || "Open Gang Slot"}
                        </strong>

                        <span className="text-slate-500 block truncate">
                          {slotItem?.specs?.slice(0, 30) || "Double-Sided 600 DPI"}
                        </span>

                        <div className="pt-1 flex items-center justify-between text-[9px]">
                          <span className="font-mono text-slate-600">
                            {assignedOrder?.id || "BUFFER-RUN"}
                          </span>
                          <span className="px-1 rounded bg-emerald-50 text-emerald-800 font-bold">
                            OK
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Economic Impact Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    Combined Run Volume
                  </span>
                  <strong className="text-slate-900 font-mono text-sm">
                    {activeBatch.totalCardsCount.toLocaleString("en-IN")} Units
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    Plate Setup Saved
                  </span>
                  <strong className="text-emerald-700 font-mono text-sm">
                    {activeBatch.matchingOrdersCount > 1 ? `${activeBatch.matchingOrdersCount - 1} CTP Plates` : "1 CTP Plate"}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    Paper Trim Efficiency
                  </span>
                  <strong className="text-slate-900 font-mono text-sm">
                    {activeBatch.sheetUtilizationPercent}% Usable Area
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
