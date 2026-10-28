"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Save, Check, RefreshCw, Sparkles, ShieldCheck, Tag } from "lucide-react";
import { getPricingConfig, savePricingConfig, PricingConfig, DEFAULT_PRICING_CONFIG } from "@/lib/adminStore";

export const AdminPricingTab: React.FC = () => {
  const [config, setConfig] = useState<PricingConfig>(DEFAULT_PRICING_CONFIG);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setConfig(getPricingConfig());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    savePricingConfig(config);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset pricing rules to factory defaults?")) {
      setConfig(DEFAULT_PRICING_CONFIG);
      savePricingConfig(DEFAULT_PRICING_CONFIG);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span>Dynamic Price Matrix & GST Rules</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
              Active on Customer Storefront
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Configure volume tier multipliers, paper stock rates, and tax parameters without redeploying code.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:opacity-95 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? "Saved to Storefront!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Card 1: Volume Discount Tier Multipliers */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-[#A9782B]" />
            <h4 className="font-bold text-slate-900 text-xs">Bulk Quantity Multipliers</h4>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>100 pcs Batch Multiplier:</span>
                <span className="font-mono font-bold text-slate-900">{config.volumeMultipliers.qty100}x</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.volumeMultipliers.qty100}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    volumeMultipliers: {
                      ...config.volumeMultipliers,
                      qty100: parseFloat(e.target.value) || 1.0,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
              <span className="text-[10px] text-slate-400">Short-run penalty (+20% standard)</span>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>250 pcs Batch Multiplier:</span>
                <span className="font-mono font-bold text-slate-900">{config.volumeMultipliers.qty250}x</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.volumeMultipliers.qty250}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    volumeMultipliers: {
                      ...config.volumeMultipliers,
                      qty250: parseFloat(e.target.value) || 1.0,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
              <span className="text-[10px] text-slate-400">Medium batch multiplier (+10%)</span>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>500 pcs Standard Multiplier:</span>
                <span className="font-mono font-bold text-slate-900">{config.volumeMultipliers.qty500}x</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.volumeMultipliers.qty500}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    volumeMultipliers: {
                      ...config.volumeMultipliers,
                      qty500: parseFloat(e.target.value) || 1.0,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
              <span className="text-[10px] text-slate-400">Baseline standard volume (1.00x)</span>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>1000 pcs Bulk Discount Multiplier:</span>
                <span className="font-mono font-bold text-emerald-700">{config.volumeMultipliers.qty1000}x</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.volumeMultipliers.qty1000}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    volumeMultipliers: {
                      ...config.volumeMultipliers,
                      qty1000: parseFloat(e.target.value) || 0.88,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
              <span className="text-[10px] text-slate-400">High-volume corporate incentive (12% off)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Paper Substrate Base Rates */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Tag className="w-4 h-4 text-[#A9782B]" />
            <h4 className="font-bold text-slate-900 text-xs">Custom Visiting Card Substrate Rates (₹/pc)</h4>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>350 GSM Silk Matte:</span>
                <strong className="font-mono text-slate-900">₹{config.substrateRates.matte.toFixed(2)}</strong>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.substrateRates.matte}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    substrateRates: {
                      ...config.substrateRates,
                      matte: parseFloat(e.target.value) || 1.58,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>350 GSM High-Gloss:</span>
                <strong className="font-mono text-slate-900">₹{config.substrateRates.glossy.toFixed(2)}</strong>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.substrateRates.glossy}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    substrateRates: {
                      ...config.substrateRates,
                      glossy: parseFloat(e.target.value) || 1.88,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>400 GSM Velvet + Gold Foil:</span>
                <strong className="font-mono text-slate-900">₹{config.substrateRates.goldFoil.toFixed(2)}</strong>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.substrateRates.goldFoil}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    substrateRates: {
                      ...config.substrateRates,
                      goldFoil: parseFloat(e.target.value) || 4.49,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1 font-semibold">
                <span>350 GSM Textured Linen:</span>
                <strong className="font-mono text-slate-900">₹{config.substrateRates.linen.toFixed(2)}</strong>
              </div>
              <input
                type="number"
                step="0.01"
                value={config.substrateRates.linen}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    substrateRates: {
                      ...config.substrateRates,
                      linen: parseFloat(e.target.value) || 2.78,
                    },
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Indian GST Statutory Tax Rule Display */}
        <div className="md:col-span-2 bg-[#FAF8F5] rounded-3xl border border-[#E5E0D8] p-5 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h4 className="font-black text-slate-900 text-xs">
              Active Indian GST Bifurcation Rule (Statutory Compliance)
            </h4>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            In compliance with your architectural directives:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-white border border-[#E5E0D8] space-y-1">
              <strong className="text-emerald-800 font-bold text-xs">1. GST-Inclusive Products:</strong>
              <p className="text-slate-500 text-[11px]">
                Products tagged as <em>isGstIncluded</em> (e.g. PVC Visiting Cards) have CGST 9% + SGST 9% embedded into their rates. Checkout adds <strong>₹0.00 extra tax</strong>, preventing double taxation.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#E5E0D8] space-y-1">
              <strong className="text-amber-800 font-bold text-xs">2. GST-Exclusive Products:</strong>
              <p className="text-slate-500 text-[11px]">
                Products tagged as non-inclusive (e.g. AquaBot Ceramic Mugs, Merchandise) are strictly charged <strong>18% GST (CGST 9% + SGST 9%)</strong> on their exclusive base subtotal.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
