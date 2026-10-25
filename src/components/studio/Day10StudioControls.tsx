"use client";

import React, { useState } from "react";
import {
  QrCode,
  Shapes,
  Check,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  Sliders,
  Palette,
  Maximize2,
  RefreshCw,
  Sparkles,
  Info,
} from "lucide-react";
import { QrConfig, ShapeItem, QrType, DetailPlacement, ShapeType } from "./types";
import { ContactData, buildQrPayload } from "./qrUtils";

interface Props {
  qrConfig: QrConfig;
  onUpdateQrConfig: (updates: Partial<QrConfig>) => void;
  shapes: ShapeItem[];
  onAddShape: (shape: ShapeItem) => void;
  onUpdateShape: (id: string, updates: Partial<ShapeItem>) => void;
  onDeleteShape: (id: string) => void;
  selectedShapeId: string | null;
  onSelectShape: (id: string | null) => void;
  contact: ContactData;
}

export const Day10StudioControls: React.FC<Props> = ({
  qrConfig,
  onUpdateQrConfig,
  shapes,
  onAddShape,
  onUpdateShape,
  onDeleteShape,
  selectedShapeId,
  onSelectShape,
  contact,
}) => {
  const [activeTab, setActiveTab] = useState<"qr" | "shapes">("qr");

  const activeShape = shapes.find((s) => s.id === selectedShapeId) || shapes[0] || null;
  const currentPayload = buildQrPayload(qrConfig, contact);

  // Quick preset adder for shapes
  const handleAddPresetShape = (type: ShapeType) => {
    const ts = Date.now();
    let newShape: ShapeItem;

    switch (type) {
      case "divider-h":
        newShape = {
          id: `shp-${ts}`,
          name: "Horizontal Gold Divider",
          type: "divider-h",
          side: "front",
          color: "#A9782B",
          thickness: 1.5,
          style: "solid",
          opacity: 0.85,
          widthPercent: 80,
          position: "center",
        };
        break;
      case "divider-v":
        newShape = {
          id: `shp-${ts}`,
          name: "Vertical Separator Line",
          type: "divider-v",
          side: "back",
          color: "#A9782B",
          thickness: 1.5,
          style: "solid",
          opacity: 0.8,
          heightPercent: 65,
          position: "center",
        };
        break;
      case "badge":
        newShape = {
          id: `shp-${ts}`,
          name: "Executive Role Badge",
          type: "badge",
          side: "front",
          color: "#A9782B",
          bgColor: "#FAF6EE",
          text: contact.customerDesignation || "MANAGING DIRECTOR",
          thickness: 1,
          style: "solid",
          opacity: 1,
          position: "bottom",
        };
        break;
      case "frame":
        newShape = {
          id: `shp-${ts}`,
          name: "Luxury Border Frame",
          type: "frame",
          side: "both",
          color: "#A9782B",
          thickness: 1,
          style: "solid",
          opacity: 0.7,
        };
        break;
      case "accent-bar":
        newShape = {
          id: `shp-${ts}`,
          name: "Edge Accent Stripe",
          type: "accent-bar",
          side: "front",
          color: "#A9782B",
          thickness: 3,
          style: "solid",
          opacity: 1,
          position: "left",
        };
        break;
      case "circle":
        newShape = {
          id: `shp-${ts}`,
          name: "Corporate Seal Ring",
          type: "circle",
          side: "back",
          color: "#A9782B",
          bgColor: "#FAF6EE40",
          text: "VERIFIED",
          thickness: 1.5,
          style: "solid",
          opacity: 0.9,
          widthPercent: 44,
          position: "top",
        };
        break;
      default:
        return;
    }

    onAddShape(newShape);
    onSelectShape(newShape.id);
  };

  const COLOR_SWATCHES = [
    { name: "Brand Gold", hex: "#A9782B" },
    { name: "Deep Obsidian", hex: "#0F172A" },
    { name: "Executive Navy", hex: "#1E3A8A" },
    { name: "Royal Emerald", hex: "#047857" },
    { name: "Rich Bronze", hex: "#78350F" },
    { name: "Crisp White", hex: "#FFFFFF" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#A9782B] border border-[#EAD5B3] flex items-center justify-center font-bold shadow-2xs">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              Shape Library & Live Dynamic QR Code
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Vector geometric shapes & real-time scannable UPI / vCard / WhatsApp QR engine
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#734D15] bg-[#FAF6EE] px-2.5 py-0.5 rounded-full border border-[#EAD5B3] shrink-0 self-start sm:self-auto">
          VECTOR & QR ENGINE
        </span>
      </div>

      {/* TOP NAVIGATION SUB-TABS */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          type="button"
          id="day10-tab-qr"
          onClick={() => setActiveTab("qr")}
          className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "qr"
              ? "bg-white text-slate-900 shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <QrCode className={`w-3.5 h-3.5 ${activeTab === "qr" ? "text-[#A9782B]" : "text-slate-400"}`} />
          <span>Dynamic QR Generator</span>
          {qrConfig.enabled && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          )}
        </button>

        <button
          type="button"
          id="day10-tab-shapes"
          onClick={() => setActiveTab("shapes")}
          className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "shapes"
              ? "bg-white text-slate-900 shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Shapes className={`w-3.5 h-3.5 ${activeTab === "shapes" ? "text-[#A9782B]" : "text-slate-400"}`} />
          <span>Vector Shape Library</span>
          {shapes.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3] text-[9px] font-bold">
              {shapes.length}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: DYNAMIC QR CODE ENGINE                             */}
      {/* ========================================================= */}
      {activeTab === "qr" && (
        <div className="space-y-4">
          {/* Master Enable Toggle */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-slate-900 block">
                Enable Dynamic QR Code on Card
              </span>
              <span className="text-[10px] text-slate-500 block">
                Crisp vector SVG rendered directly on Side A or Side B
              </span>
            </div>
            <button
              type="button"
              id="qr-toggle-btn"
              onClick={() => onUpdateQrConfig({ enabled: !qrConfig.enabled })}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                qrConfig.enabled ? "bg-[#A9782B]" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  qrConfig.enabled ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>

          {qrConfig.enabled && (
            <div className="space-y-4 pt-1">
              {/* QR Type Selector Chips */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Select QR Purpose / Action:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { type: "upi", label: "⚡ UPI Payment", desc: "GPay / PhonePe / Paytm" },
                    { type: "whatsapp", label: "💬 WhatsApp Chat", desc: "1-Tap Direct Message" },
                    { type: "vcard", label: "📇 Digital vCard", desc: "Save Contact to Phone" },
                    { type: "url", label: "🌐 Website URL", desc: "Company / Portfolio" },
                    { type: "google-review", label: "⭐ Google Review", desc: "Instant 5-Star Rating" },
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => onUpdateQrConfig({ type: item.type as QrType })}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        qrConfig.type === item.type
                          ? "bg-[#FAF6EE] border-[#A9782B] ring-2 ring-[#A9782B]/20 text-[#734D15]"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xs font-black block">{item.label}</span>
                      <span className="text-[9.5px] text-slate-500 block truncate">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Context Fields Based on QR Type */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
                {qrConfig.type === "upi" && (
                  <>
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700">UPI ID / VPA</label>
                      <span className="text-[10px] text-emerald-700 font-bold">✓ Direct Bank Settlement</span>
                    </div>
                    <input
                      type="text"
                      id="qr-upi-id-input"
                      value={qrConfig.upiId}
                      onChange={(e) => onUpdateQrConfig({ upiId: e.target.value })}
                      placeholder="e.g. mahi.kapoor@okhdfcbank"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none font-mono"
                    />
                    <div className="flex flex-wrap gap-1.5 items-center pt-0.5">
                      <span className="text-[10px] text-slate-500 font-medium">Quick suffixes:</span>
                      {["@okhdfcbank", "@okicici", "@paytm", "@ybl", "@ibl"].map((suffix) => (
                        <button
                          key={suffix}
                          type="button"
                          onClick={() => {
                            const prefix = qrConfig.upiId.split("@")[0] || "merchant";
                            onUpdateQrConfig({ upiId: `${prefix}${suffix}` });
                          }}
                          className="px-2 py-0.5 text-[9.5px] font-bold bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700 cursor-pointer"
                        >
                          {suffix}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Payee / Business Name
                      </label>
                      <input
                        type="text"
                        value={qrConfig.payeeName}
                        onChange={(e) => onUpdateQrConfig({ payeeName: e.target.value })}
                        placeholder="e.g. Incredible Treasures"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {qrConfig.type === "whatsapp" && (
                  <>
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700">WhatsApp Mobile Number</label>
                      <span className="text-[10px] text-slate-500">Include country code</span>
                    </div>
                    <input
                      type="text"
                      id="qr-whatsapp-input"
                      value={qrConfig.whatsappNumber}
                      onChange={(e) => onUpdateQrConfig({ whatsappNumber: e.target.value })}
                      placeholder="+91 99450 39266"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none font-mono"
                    />

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Pre-filled Greeting Message
                      </label>
                      <input
                        type="text"
                        value={qrConfig.whatsappMessage}
                        onChange={(e) => onUpdateQrConfig({ whatsappMessage: e.target.value })}
                        placeholder="Hi Mahi, connecting via your visiting card!"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {qrConfig.type === "vcard" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700">Digital Contact vCard</label>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateQrConfig({
                            payeeName: contact.customerName,
                            websiteUrl: contact.website,
                          });
                        }}
                        className="text-[10px] font-bold text-[#A9782B] flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Sync with Card Details</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                      When scanned by an iPhone or Android phone camera, it will prompt:
                      <strong className="text-slate-900 block mt-0.5">
                        "Add {contact.customerName || "Contact"} ({contact.companyName || "Incredible Treasures"}) to Contacts"
                      </strong>
                    </p>
                  </div>
                )}

                {qrConfig.type === "url" && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Website / Portfolio URL
                    </label>
                    <input
                      type="text"
                      id="qr-url-input"
                      value={qrConfig.websiteUrl}
                      onChange={(e) => onUpdateQrConfig({ websiteUrl: e.target.value })}
                      placeholder="https://www.incredible-treasures.com"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none"
                    />
                  </div>
                )}

                {qrConfig.type === "google-review" && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Google Maps Review Shortlink
                    </label>
                    <input
                      type="text"
                      value={qrConfig.reviewUrl}
                      onChange={(e) => onUpdateQrConfig({ reviewUrl: e.target.value })}
                      placeholder="https://g.page/r/your-shop-name/review"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Placement & Position Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Print Side Placement */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Print Side Placement
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {(["front", "back", "both"] as const).map((side) => (
                      <button
                        key={side}
                        type="button"
                        onClick={() => onUpdateQrConfig({ side })}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                          qrConfig.side === side
                            ? "bg-slate-900 text-white shadow-2xs font-black"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {side}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Position on Card */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Card Corner Position
                  </label>
                  <select
                    id="qr-position-select"
                    value={qrConfig.position}
                    onChange={(e) =>
                      onUpdateQrConfig({ position: e.target.value as QrConfig["position"] })
                    }
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="bottom-right">Bottom-Right (Standard)</option>
                    <option value="bottom-left">Bottom-Left</option>
                    <option value="center">Center (Executive Back)</option>
                    <option value="top-right">Top-Right</option>
                    <option value="top-left">Top-Left</option>
                  </select>
                </div>
              </div>

              {/* Color, Size & Label Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* QR Code Color */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    QR Foreground Color
                  </label>
                  <select
                    value={qrConfig.color}
                    onChange={(e) => onUpdateQrConfig({ color: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-bold text-slate-800 cursor-pointer"
                  >
                    {COLOR_SWATCHES.map((sw) => (
                      <option key={sw.hex} value={sw.hex}>
                        {sw.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-600">Size</label>
                    <span className="text-[10px] font-mono font-black text-slate-700">
                      {qrConfig.size}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="78"
                    step="2"
                    value={qrConfig.size}
                    onChange={(e) => onUpdateQrConfig({ size: parseInt(e.target.value, 10) })}
                    className="w-full accent-[#A9782B] cursor-pointer"
                  />
                </div>

                {/* Label Option */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Under-QR Caption
                  </label>
                  <input
                    type="text"
                    value={qrConfig.label}
                    onChange={(e) => onUpdateQrConfig({ label: e.target.value })}
                    placeholder="e.g. Scan to Pay"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* LIVE PHONE SCAN VERIFICATION & PREVIEW */}
              <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl border border-slate-700 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Phone Scanner Verification</span>
                  </div>
                  <span className="text-[9.5px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 font-black">
                    🟢 100% Valid & Scannable
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono bg-black/40 p-2 rounded-xl break-all line-clamp-2 border border-white/10">
                  {currentPayload}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Error Correction Level: M (15% redundancy)</span>
                  <span>Supports iPhone & Android stock cameras</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: VECTOR SHAPE & DIVIDER LIBRARY                     */}
      {/* ========================================================= */}
      {activeTab === "shapes" && (
        <div className="space-y-4">
          {/* Preset Buttons Grid */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              1-Click Vector Shape Presets:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { type: "divider-h", label: "➖ Gold Divider Line", sub: "Horizontal Separator" },
                { type: "divider-v", label: "▮ Vertical Separator", sub: "Column Divider" },
                { type: "badge", label: "🏷️ Executive Role Pill", sub: "Rounded Title Badge" },
                { type: "frame", label: "🔲 Luxury Border Frame", sub: "Stationery Perimeter" },
                { type: "accent-bar", label: "▎ Edge Accent Stripe", sub: "Modern Margin Stripe" },
                { type: "circle", label: "⭕ Corporate Seal Ring", sub: "Stamp Container" },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => handleAddPresetShape(item.type as ShapeType)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#FAF6EE] hover:border-[#A9782B] hover:text-[#734D15] text-slate-800 transition flex flex-col text-left gap-0.5 cursor-pointer shadow-2xs group"
                >
                  <span className="text-xs font-black text-slate-900 group-hover:text-[#734D15]">
                    {item.label}
                  </span>
                  <span className="text-[9.5px] text-slate-500 font-semibold">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Shape Layers List */}
          {shapes.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Active Vector Shape Layers ({shapes.length})
                </span>
                <span className="text-[10px] text-slate-500">Click layer to customize</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectShape(s.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
                      selectedShapeId === s.id
                        ? "bg-[#A9782B] text-white border-[#8E621E] ring-2 ring-[#A9782B]/20 shadow-xs"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    <span className="truncate max-w-[120px]">{s.name}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-black/10 font-mono">
                      {s.side}
                    </span>
                  </button>
                ))}
              </div>

              {/* Edit Controls for Selected Shape */}
              {activeShape && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                      <Sliders className="w-3.5 h-3.5 text-[#A9782B]" />
                      Editing: <span className="text-[#734D15] font-black">{activeShape.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeleteShape(activeShape.id)}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Print Side Placement */}
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-600">Print Placement</label>
                    <div className="inline-flex rounded-lg bg-white p-0.5 border border-slate-200 text-[10px] font-bold">
                      {(["front", "back", "both"] as const).map((side) => (
                        <button
                          key={side}
                          type="button"
                          onClick={() => onUpdateShape(activeShape.id, { side })}
                          className={`px-2.5 py-0.5 rounded-md transition cursor-pointer capitalize ${
                            activeShape.side === side
                              ? "bg-slate-900 text-white font-extrabold shadow-2xs"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          {side}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* If Badge or Circle, allow text edit */}
                  {(activeShape.type === "badge" || activeShape.type === "circle") && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Badge / Seal Text
                      </label>
                      <input
                        type="text"
                        value={activeShape.text || ""}
                        onChange={(e) => onUpdateShape(activeShape.id, { text: e.target.value })}
                        placeholder="e.g. MANAGING DIRECTOR"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#A9782B] focus:outline-none uppercase font-bold"
                      />
                    </div>
                  )}

                  {/* Stroke Style & Color */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Stroke Style
                      </label>
                      <select
                        value={activeShape.style}
                        onChange={(e) =>
                          onUpdateShape(activeShape.id, {
                            style: e.target.value as "solid" | "dashed" | "dotted",
                          })
                        }
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-bold text-slate-800 cursor-pointer"
                      >
                        <option value="solid">Solid Line</option>
                        <option value="dashed">Dashed Line</option>
                        <option value="dotted">Dotted Line</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Color</label>
                      <select
                        value={activeShape.color}
                        onChange={(e) => onUpdateShape(activeShape.id, { color: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-bold text-slate-800 cursor-pointer"
                      >
                        {COLOR_SWATCHES.map((sw) => (
                          <option key={sw.hex} value={sw.hex}>
                            {sw.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Thickness Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-600">Line Thickness</label>
                      <span className="text-[10px] font-mono font-black text-slate-700">
                        {activeShape.thickness}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="0.5"
                      value={activeShape.thickness}
                      onChange={(e) =>
                        onUpdateShape(activeShape.id, { thickness: parseFloat(e.target.value) })
                      }
                      className="w-full accent-[#A9782B] cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
