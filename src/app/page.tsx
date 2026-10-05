"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Sparkles,
  ShieldCheck,
  Truck,
  FileCheck2,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle2,
  Building2,
  Palette,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  // Live Price Calculator State (Demonstrating Production Math)
  const [selectedPaper, setSelectedPaper] = useState<"matte" | "goldFoil">("matte");
  const [orderMode, setOrderMode] = useState<"samples" | "bulk">("bulk");
  const [quantity, setQuantity] = useState<number>(500);

  // Pricing math matrix (Supporting 1 pc sample, 10 pcs trial, up to 1000 pcs bulk)
  const pricingData = {
    matte: {
      name: "350 GSM Royal Silk Matte",
      description: "Non-reflective anti-fingerprint coating with ultra-crisp offset vector printing.",
      basePerPiece: 3.99,
      tiers: {
        1: { unit: 99.0, total: 99, discount: 0, label: "Sample Kit", note: "1 PC proof + paper swatch kit" },
        10: { unit: 19.9, total: 199, discount: 0, label: "Trial Pack", note: "10 cards for quick meetings" },
        25: { unit: 11.96, total: 299, discount: 0, label: "Boutique", note: "25 cards small batch" },
        50: { unit: 6.98, total: 349, discount: 0, label: "Startup", note: "50 cards starter pack" },
        100: { unit: 3.99, total: 399, discount: 0, label: "Standard", note: "100 cards classic box" },
        250: { unit: 3.40, total: 850, discount: 15, label: "Corporate", note: "250 cards team pack" },
        500: { unit: 2.60, total: 1300, discount: 35, label: "Growth", note: "500 cards (Most Popular)" },
        1000: { unit: 1.99, total: 1990, discount: 50, label: "Wholesale", note: "1000 cards enterprise tier" },
      },
    },
    goldFoil: {
      name: "400 GSM Velvet + 3D Raised Gold Foil",
      description: "Tactile metallic gold foil stamped over obsidian velvet cardstock.",
      basePerPiece: 7.99,
      tiers: {
        1: { unit: 149.0, total: 149, discount: 0, label: "Gold Sample", note: "1 PC master foil proof" },
        10: { unit: 34.9, total: 349, discount: 0, label: "VIP Trial", note: "10 cards executive pack" },
        25: { unit: 19.96, total: 499, discount: 0, label: "Boutique", note: "25 cards luxury run" },
        50: { unit: 12.98, total: 649, discount: 0, label: "Founder", note: "50 cards prestige pack" },
        100: { unit: 7.99, total: 799, discount: 0, label: "Standard", note: "100 cards luxury box" },
        250: { unit: 6.99, total: 1748, discount: 12, label: "Corporate", note: "250 cards executive suite" },
        500: { unit: 5.49, total: 2745, discount: 31, label: "Growth", note: "500 cards (Most Popular)" },
        1000: { unit: 4.29, total: 4290, discount: 46, label: "Wholesale", note: "1000 cards elite bulk" },
      },
    },
  };

  const currentConfig = pricingData[selectedPaper];
  const tierInfo = currentConfig.tiers[quantity as keyof typeof currentConfig.tiers] || currentConfig.tiers[100];
  const subtotal = tierInfo.total;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const totalWithTax = Math.round((subtotal + gstAmount) * 100) / 100;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FBFBFA]">
      {/* 1. Official Corporate Regulatory Trust Bar */}
      <div className="bg-[#121212] border-b border-[#D4AF37]/20 px-4 py-2 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[#D4AF37] font-semibold tracking-wider uppercase">
              <Building2 className="w-3.5 h-3.5" /> M/s Incredible Treasures
            </span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="hidden sm:inline text-stone-400">
              GSTIN: <strong className="text-white">29AAKFI2392F1Z5</strong>
            </span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-stone-400">Yelahanka, Bengaluru – 560064</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="flex items-center gap-1 hover:text-[#D4AF37] transition">
              <Phone className="w-3 h-3 text-[#D4AF37]" /> +91 9945039266
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#D4AF37]" /> Bangalore Express 48h Delivery
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Header & Brand Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] via-[#C59B27] to-[#996515] p-0.5 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0A0A0A] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <span className="font-serif tracking-[0.25em] text-lg font-bold uppercase gold-gradient-text block leading-none">
                Incredible
              </span>
              <span className="text-[10px] tracking-[0.35em] text-stone-400 uppercase font-medium block mt-0.5">
                Treasures
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#visiting-cards" className="hover:text-[#D4AF37] transition flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Visiting Cards
            </a>
            <a href="#calculator" className="hover:text-[#D4AF37] transition">
              Pricing Calculator
            </a>
            <a href="#corporate-stationery" className="hover:text-[#D4AF37] transition">
              Corporate Stationery
            </a>
            <a href="#corporate-gifting" className="hover:text-[#D4AF37] transition">
              Luxury Gifts
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#calculator"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
            >
              Volume Rates
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition active:scale-95 animate-shimmer"
            >
              Order Cards <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Taste Skill & ThreeUI Luxury Style) */}
      <section className="relative pt-20 pb-28 px-4 overflow-hidden border-b border-white/5">
        {/* Ambient Gold Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#D4AF37]/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-[#D4AF37]/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#161616] text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-8">
            <Sparkles className="w-3.5 h-3.5" /> Bespoke Corporate Web-to-Print • Bengaluru
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6 font-serif">
            Print That <span className="gold-gradient-text">Commands Respect.</span>
            <br />
            Luxury For Bangalore’s Leaders.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 leading-relaxed mb-10">
            Ditch generic, flimsy business cards. Elevate your executive presence with European 400 GSM velvet cardstock,
            tactile 3D raised gold foil, and precision laser-etched corporate merchandise.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#calculator"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#996515] text-black font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-105 transition active:scale-95 flex items-center gap-2"
            >
              Calculate Your Price <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#visiting-cards"
              className="px-8 py-3.5 rounded-full border border-white/15 bg-stone-900/60 hover:bg-stone-800 text-stone-200 font-semibold text-sm transition flex items-center gap-2"
            >
              Browse 5 Flagship Products <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Proof Trust Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/5 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#191919] border border-[#D4AF37]/20 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Print Guarantee</h4>
                <p className="text-xs text-stone-400 mt-0.5">Free reprint if any color or cut defect</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#191919] border border-[#D4AF37]/20 text-[#D4AF37]">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Official GST Invoices</h4>
                <p className="text-xs text-stone-400 mt-0.5">Claim full 18% Input Tax Credit</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#191919] border border-[#D4AF37]/20 text-[#D4AF37]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Bangalore 48h Express</h4>
                <p className="text-xs text-stone-400 mt-0.5">Courier dispatch direct from Yelahanka</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#191919] border border-[#D4AF37]/20 text-[#D4AF37]">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">300 DPI Vector Studio</h4>
                <p className="text-xs text-stone-400 mt-0.5">True press-ready PDF output</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Interactive Price Calculator Engine (Day 1 Production Feature) */}
      <section id="calculator" className="py-20 px-4 bg-[#0E0E0E] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block mb-2">
              Transparent Factory Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
              Dynamic Volume Price Calculator
            </h2>
            <p className="text-stone-400 text-sm">
              Zero hidden charges. Real-time rate calculation with automatic bulk discounts and compliant GST breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls: Paper Stock & Quantity Selector */}
            <div className="lg:col-span-7 space-y-6">
              {/* Paper Selection */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3">
                  Step 1: Choose Paper Stock & Finish
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedPaper("matte")}
                    className={`p-4 rounded-xl text-left border transition ${
                      selectedPaper === "matte"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/10"
                        : "border-white/10 bg-stone-900/40 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-sm text-white">350 GSM Silk Matte</span>
                      {selectedPaper === "matte" && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                    </div>
                    <p className="text-xs text-stone-400">Soft-touch silk finish with zero reflection. Bangalore best-seller.</p>
                    <div className="mt-3 text-xs font-medium text-[#D4AF37]">From ₹1.99 / pc</div>
                  </button>

                  <button
                    onClick={() => setSelectedPaper("goldFoil")}
                    className={`p-4 rounded-xl text-left border transition ${
                      selectedPaper === "goldFoil"
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/10"
                        : "border-white/10 bg-stone-900/40 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-sm text-white">400 GSM Velvet Gold Foil</span>
                      {selectedPaper === "goldFoil" && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                    </div>
                    <p className="text-xs text-stone-400">Heavyweight velvet black with 3D tactile raised metallic gold foil.</p>
                    <div className="mt-3 text-xs font-medium text-[#D4AF37]">From ₹4.29 / pc</div>
                  </button>
                </div>
              </div>

              {/* Quantity Tier Selector with Sample / 1 PC & Bulk Toggle */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Step 2: Choose Order Size & Quantity
                  </label>
                  {/* Mode Switcher */}
                  <div className="inline-flex rounded-lg bg-stone-900 p-1 border border-white/10 text-xs">
                    <button
                      onClick={() => {
                        setOrderMode("bulk");
                        setQuantity(500);
                      }}
                      className={`px-3 py-1.5 rounded-md font-semibold transition ${
                        orderMode === "bulk"
                          ? "bg-[#D4AF37] text-black shadow"
                          : "text-stone-400 hover:text-white"
                      }`}
                    >
                      Corporate Bulk (100–1000+)
                    </button>
                    <button
                      onClick={() => {
                        setOrderMode("samples");
                        setQuantity(1);
                      }}
                      className={`px-3 py-1.5 rounded-md font-semibold transition flex items-center gap-1.5 ${
                        orderMode === "samples"
                          ? "bg-[#D4AF37] text-black shadow"
                          : "text-stone-400 hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" /> Samples (1–50 pcs)
                    </button>
                  </div>
                </div>

                {/* Bulk Quantities (100, 250, 500, 1000) */}
                {orderMode === "bulk" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[100, 250, 500, 1000].map((qty) => {
                      const tier = currentConfig.tiers[qty as keyof typeof currentConfig.tiers];
                      const isSelected = quantity === qty;
                      return (
                        <button
                          key={qty}
                          onClick={() => setQuantity(qty)}
                          className={`p-3.5 rounded-xl text-center border relative transition ${
                            isSelected
                              ? "border-[#D4AF37] bg-[#D4AF37]/15 shadow-md shadow-[#D4AF37]/15"
                              : "border-white/10 bg-stone-900/30 hover:border-white/20"
                          }`}
                        >
                          {tier.discount > 0 && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-black">
                              Save {tier.discount}%
                            </span>
                          )}
                          <div className="text-base font-bold text-white">{qty} pcs</div>
                          <div className="text-xs text-stone-400 mt-1">₹{tier.unit}/pc</div>
                          <div className="text-xs font-semibold text-[#D4AF37] mt-1">₹{tier.total}</div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Small Batch & Samples (1, 10, 25, 50) */
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[1, 10, 25, 50].map((qty) => {
                        const tier = currentConfig.tiers[qty as keyof typeof currentConfig.tiers];
                        const isSelected = quantity === qty;
                        return (
                          <button
                            key={qty}
                            onClick={() => setQuantity(qty)}
                            className={`p-3.5 rounded-xl text-center border relative transition ${
                              isSelected
                                ? "border-[#D4AF37] bg-[#D4AF37]/20 shadow-md shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]"
                                : "border-white/10 bg-stone-900/30 hover:border-white/20"
                            }`}
                          >
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                              {tier.label}
                            </span>
                            <div className="text-lg font-bold text-white">{qty} {qty === 1 ? "pc" : "pcs"}</div>
                            <div className="text-xs text-stone-400 mt-0.5">₹{tier.unit}/pc</div>
                            <div className="text-xs font-bold text-[#D4AF37] mt-1">₹{tier.total}</div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/60 border border-white/5 text-xs text-stone-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>
                        <strong>Zero MOQ Guarantee:</strong> Need 1 single card to verify your logo & gold foil finish before placing a 500-card order? Or just 10 cards for a board meeting? We support digital fast-track printing!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary: Instant Quotation & Tax Invoice Breakdown */}
            <div className="lg:col-span-5">
              <div className="glass-panel-gold p-7 rounded-2xl border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Live Order Estimate
                  </span>
                  <span className="px-2.5 py-1 rounded bg-stone-800 text-[10px] text-stone-300 font-mono">
                    HSN: 49090000
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-semibold text-white text-base">{currentConfig.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-stone-300 font-medium">
                        Quantity: <strong className="text-white font-mono">{quantity} {quantity === 1 ? "Card (Sample Kit)" : "Cards"}</strong>
                      </span>
                      {quantity === 1 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-black">
                          Proof Sample
                        </span>
                      )}
                      {quantity === 10 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-black">
                          Trial Pack
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-2.5">
                    <div className="flex justify-between text-stone-300">
                      <span>Rate per piece:</span>
                      <span className="font-mono text-white">₹{tierInfo.unit.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-stone-300">
                      <span>Subtotal (Net):</span>
                      <span className="font-mono text-white">₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-stone-300 text-xs">
                      <span>GST (18% Total):</span>
                      <span className="font-mono text-stone-400">
                        ₹{gstAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-stone-400 text-[11px] pl-3">
                      <span>• CGST (9% Karnataka):</span>
                      <span className="font-mono">₹{(gstAmount / 2).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-stone-400 text-[11px] pl-3">
                      <span>• SGST (9% Karnataka):</span>
                      <span className="font-mono">₹{(gstAmount / 2).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-stone-300 pt-2 border-t border-white/5">
                      <span>Estimated Shipping:</span>
                      <span className="font-semibold text-emerald-400">FREE in Bangalore</span>
                    </div>
                  </div>

                  {/* Final Total */}
                  <div className="pt-5 border-t border-[#D4AF37]/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 uppercase tracking-wider block">Total Amount</span>
                      <span className="text-2xl font-bold font-mono text-[#D4AF37]">₹{totalWithTax.toFixed(2)}</span>
                    </div>
                    {tierInfo.discount > 0 && (
                      <div className="text-right">
                        <span className="text-xs text-emerald-400 font-semibold block">
                          You save ₹{Math.round(quantity * (currentConfig.basePerPiece - tierInfo.unit))}!
                        </span>
                        <span className="text-[10px] text-stone-500">Includes 18% ITC</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => alert(`Day 1 Prototype: Configured ${quantity} ${currentConfig.name} for ₹${totalWithTax}. Week 2 Online Canvas Studio opens on Day 8!`)}
                  className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-black font-bold uppercase tracking-wider text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Start Customizing In Canvas Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Flagship Products Catalog (Seeded from PostgreSQL DB) */}
      <section id="visiting-cards" className="py-20 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block mb-2">
                Curated Corporate Suite
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Flagship Printing Products
              </h2>
            </div>
            <p className="text-stone-400 text-sm max-w-md mt-2 md:mt-0">
              Each product is backed by our Bangalore workshop’s 300 DPI high-precision offset press and manual quality inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition group">
              <div className="h-52 overflow-hidden relative bg-stone-900">
                <img
                  src="/images/royal-matte-card.jpg"
                  alt="Royal Matte Visiting Card"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                  350 GSM Silk Matte
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/90 text-black">
                  48h Express
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-[#D4AF37] text-xs mb-2">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span className="font-semibold text-white">4.9</span>
                  <span className="text-stone-400">(247 Bangalore reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">Royal Matte Executive Card</h3>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-4">
                  Non-reflective silk matte lamination on European imported board. Soft-touch and anti-fingerprint.
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Starting at</span>
                    <span className="text-lg font-bold text-[#D4AF37] font-mono">₹1.49</span>
                    <span className="text-xs text-stone-400"> / pc</span>
                  </div>
                  <a
                    href="#calculator"
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-[#D4AF37] hover:text-black text-xs font-semibold transition"
                  >
                    Configure
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-panel-gold rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group">
              <div className="h-52 overflow-hidden relative bg-stone-900">
                <img
                  src="/images/gold-foil-card.jpg"
                  alt="Imperial Raised Gold Foil Card"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/90 text-[#D4AF37] border border-[#D4AF37]/50 backdrop-blur-md">
                  👑 Signature Gold Foil
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#D4AF37] text-black">
                  400 GSM Velvet
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-[#D4AF37] text-xs mb-2">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span className="font-semibold text-white">5.0</span>
                  <span className="text-stone-400">(189 Bangalore reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">Imperial Raised Gold Foil Card</h3>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-4">
                  Double-thick obsidian velvet board with 3D tactile metallic gold foil that catches ambient light.
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Starting at</span>
                    <span className="text-lg font-bold text-[#D4AF37] font-mono">₹4.29</span>
                    <span className="text-xs text-stone-400"> / pc</span>
                  </div>
                  <a
                    href="#calculator"
                    className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-xs font-bold hover:brightness-110 transition"
                  >
                    Configure
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition group">
              <div className="h-52 overflow-hidden relative bg-stone-900">
                <img
                  src="/images/letterhead-suite.jpg"
                  alt="Executive Letterhead Suite"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-stone-300 border border-white/15 backdrop-blur-md">
                  120 GSM Bond
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-[#D4AF37] text-xs mb-2">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span className="font-semibold text-white">4.8</span>
                  <span className="text-stone-400">(94 Corporate reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">Executive Bond Letterhead</h3>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-4">
                  Watermarked natural white bond paper. Laser and inkjet printer certified for corporate correspondence.
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Starting at</span>
                    <span className="text-lg font-bold text-[#D4AF37] font-mono">₹3.20</span>
                    <span className="text-xs text-stone-400"> / pc</span>
                  </div>
                  <a
                    href="#calculator"
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-[#D4AF37] hover:text-black text-xs font-semibold transition"
                  >
                    Configure
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Official Regulatory Footer */}
      <footer className="bg-[#070707] border-t border-white/10 pt-16 pb-12 px-4 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-serif font-bold text-base gold-gradient-text tracking-widest uppercase">
                Incredible Treasures
              </span>
            </div>
            <p className="text-stone-400 max-w-sm leading-relaxed">
              M/s Incredible Treasures is a registered partnership enterprise specializing in luxury corporate gifts,
              custom promotional merchandise, and premium web-to-print business collateral.
            </p>
            <div className="space-y-1.5 pt-2 text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>B405, Century Saras, Off Ananthapura Road, Yelahanka, Bengaluru, Karnataka – 560064</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href="mailto:info@incredible-treasures.com" className="hover:text-white">
                  info@incredible-treasures.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+91 9945039266</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider mb-4">Credentials & Legal</h5>
            <ul className="space-y-2.5">
              <li>GSTIN: <span className="text-[#D4AF37] font-mono">29AAKFI2392F1Z5</span></li>
              <li>PAN: <span className="text-white font-mono">AAKFI2392F</span></li>
              <li>UDYAM: <span className="text-white font-mono">UDYAM-KR-03-0309999</span></li>
              <li>State of Jurisdiction: Karnataka</li>
              <li>18% Input Tax Credit Eligible</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider mb-4">Print Products</h5>
            <ul className="space-y-2.5">
              <li><a href="#calculator" className="hover:text-white">Royal Matte Cards</a></li>
              <li><a href="#calculator" className="hover:text-white">Raised Gold Foil Cards</a></li>
              <li><a href="#corporate-stationery" className="hover:text-white">Executive Bond Letterheads</a></li>
              <li><a href="#corporate-gifting" className="hover:text-white">Laser-Engraved Pens</a></li>
              <li><a href="#corporate-gifting" className="hover:text-white">Luxury Presentation Boxes</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>© {new Date().getFullYear()} M/s Incredible Treasures. All rights reserved. Handcrafted in Bengaluru.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Terms of Service</a>
            <a href="#" className="hover:text-stone-300">Shipping Policy</a>
            <a href="#" className="hover:text-stone-300">Refund Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
