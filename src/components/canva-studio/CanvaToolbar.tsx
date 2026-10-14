"use client";

import React, { useState } from "react";
import { CanvasElement, ProFinish, CardTexture, ColorHarmony } from "./types";
import { renderProIcon } from "./proIcons";
import { COLOR_HARMONIES, TEXTURE_OPTIONS } from "./harmonies";
import {
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sliders,
  Palette,
  Trash2,
  Copy,
  Ruler,
  RotateCw,
  QrCode,
  Shapes,
  Sparkles,
  Download,
  Eye,
  Undo2,
  Redo2,
  Lock,
  Unlock,
  ArrowUp,
  ArrowDown,
  Wand2,
  Crown,
  Layers,
} from "lucide-react";

interface Props {
  selectedElement: CanvasElement | null;
  onUpdateSelected: (updates: Partial<CanvasElement>) => void;
  onDuplicateSelected: () => void;
  onDeleteSelected: () => void;
  onBringForward?: () => void;
  onSendBackward?: () => void;

  orientation: "horizontal" | "vertical";
  onChangeOrientation: (o: "horizontal" | "vertical") => void;
  cornerStyle: "square" | "rounded";
  onChangeCornerStyle: (c: "square" | "rounded") => void;
  showGuides: boolean;
  onToggleGuides: () => void;
  backgroundColor: string;
  onChangeBackgroundColor: (color: string) => void;
  is3DMode?: boolean;
  onToggle3DMode?: () => void;
  onExportProof?: () => void;

  // Pro History Stack
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;

  // AI Assistant Modal trigger
  onOpenAiModal?: () => void;

  // Aesthetic Upgrades
  gildedEdge?: boolean;
  onToggleGildedEdge?: () => void;
  cardTexture?: CardTexture;
  onChangeTexture?: (texture: CardTexture) => void;
  onApplyHarmony?: (harmony: ColorHarmony) => void;
}

const FONTS = [
  { name: "Montserrat", family: "'Montserrat', sans-serif" },
  { name: "Poppins", family: "'Poppins', sans-serif" },
  { name: "Inter", family: "'Inter', sans-serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif" },
  { name: "Cinzel (Royal)", family: "'Cinzel', serif" },
  { name: "Space Mono", family: "'Space Mono', monospace" },
  { name: "Plus Jakarta", family: "'Plus Jakarta Sans', sans-serif" },
];

const COLORS = [
  { name: "Brand Gold", hex: "#A9782B" },
  { name: "Obsidian Black", hex: "#0F172A" },
  { name: "Royal Navy", hex: "#1E3A8A" },
  { name: "Forest Emerald", hex: "#047857" },
  { name: "Metallic Bronze", hex: "#78350F" },
  { name: "Executive Crimson", hex: "#991B1B" },
  { name: "Crisp White", hex: "#FFFFFF" },
  { name: "Slate Grey", hex: "#475569" },
];

export const CanvaToolbar: React.FC<Props> = ({
  selectedElement,
  onUpdateSelected,
  onDuplicateSelected,
  onDeleteSelected,
  onBringForward,
  onSendBackward,
  orientation,
  onChangeOrientation,
  cornerStyle,
  onChangeCornerStyle,
  showGuides,
  onToggleGuides,
  backgroundColor,
  onChangeBackgroundColor,
  is3DMode = false,
  onToggle3DMode,
  onExportProof,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onOpenAiModal,
  gildedEdge = false,
  onToggleGildedEdge,
  cardTexture = "smooth",
  onChangeTexture,
  onApplyHarmony,
}) => {
  const [isHarmoniesOpen, setIsHarmoniesOpen] = useState<boolean>(false);

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-[#E5E0D8] px-4 py-2 flex flex-wrap items-center justify-between gap-2.5 min-h-[52px] text-xs shadow-2xs relative">
      {/* ----------------------------------------------------- */}
      {/* CASE 1: TEXT ELEMENT SELECTED                         */}
      {/* ----------------------------------------------------- */}
      {selectedElement && selectedElement.type === "text" && (
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Font Family */}
          <select
            value={selectedElement.fontFamily || "'Montserrat', sans-serif"}
            onChange={(e) => onUpdateSelected({ fontFamily: e.target.value })}
            className="bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#A9782B] rounded-xl px-2.5 py-1.5 text-slate-800 text-xs font-bold focus:outline-none cursor-pointer shadow-2xs"
          >
            {FONTS.map((f) => (
              <option key={f.family} value={f.family} style={{ fontFamily: f.family }}>
                {f.name}
              </option>
            ))}
          </select>

          {/* Font Size Stepper */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onUpdateSelected({ fontSize: Math.max(6, (selectedElement.fontSize || 12) - 1) })}
              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white font-bold cursor-pointer transition"
            >
              -
            </button>
            <span className="w-7 text-center font-mono font-bold text-slate-900">{selectedElement.fontSize || 12}</span>
            <button
              type="button"
              onClick={() => onUpdateSelected({ fontSize: Math.min(36, (selectedElement.fontSize || 12) + 1) })}
              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white font-bold cursor-pointer transition"
            >
              +
            </button>
          </div>

          {/* Color Picker */}
          <div className="relative flex items-center gap-1">
            <select
              value={selectedElement.color || "#0F172A"}
              onChange={(e) => onUpdateSelected({ color: e.target.value })}
              className="bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#A9782B] rounded-xl px-2 py-1.5 text-slate-800 text-xs font-bold focus:outline-none cursor-pointer shadow-2xs"
            >
              {COLORS.map((c) => (
                <option key={c.hex} value={c.hex}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* PRO FINISH SELECTOR (FOIL & SPOT UV) */}
          <div className="flex items-center gap-1 bg-[#FAF6EE] border border-[#EAD5B3] rounded-xl px-2 py-1 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A9782B]" />
            <select
              value={selectedElement.proFinish || "standard"}
              onChange={(e) => onUpdateSelected({ proFinish: e.target.value as ProFinish })}
              className="bg-transparent text-[#734D15] text-[11px] font-black cursor-pointer focus:outline-none"
              title="Select Pro Special Effects"
            >
              <option value="standard">Standard Ink</option>
              <option value="gold-foil">🟡 24K Gold Foil</option>
              <option value="silver-foil">⚪ Silver Chrome Foil</option>
              <option value="rose-gold-foil">🌸 Rose Gold Foil</option>
              <option value="spot-uv">💎 Raised Spot UV</option>
            </select>
          </div>

          <div className="h-4 w-px bg-[#E5E0D8]" />

          {/* Style Toggles (B, I, U, TT) */}
          <div className="flex items-center gap-0.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() =>
                onUpdateSelected({
                  fontWeight: selectedElement.fontWeight === "bold" ? "normal" : "bold",
                })
              }
              className={`w-7 h-6 flex items-center justify-center rounded-lg font-black transition cursor-pointer ${
                selectedElement.fontWeight === "bold"
                  ? "bg-[#A9782B] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() =>
                onUpdateSelected({
                  fontStyle: selectedElement.fontStyle === "italic" ? "normal" : "italic",
                })
              }
              className={`w-7 h-6 flex items-center justify-center rounded-lg italic font-black transition cursor-pointer ${
                selectedElement.fontStyle === "italic"
                  ? "bg-[#A9782B] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() =>
                onUpdateSelected({
                  textDecoration: selectedElement.textDecoration === "underline" ? "none" : "underline",
                })
              }
              className={`w-7 h-6 flex items-center justify-center rounded-lg underline font-black transition cursor-pointer ${
                selectedElement.textDecoration === "underline"
                  ? "bg-[#A9782B] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
              title="Underline"
            >
              U
            </button>
            <button
              type="button"
              onClick={() =>
                onUpdateSelected({
                  textTransform: selectedElement.textTransform === "uppercase" ? "none" : "uppercase",
                })
              }
              className={`w-7 h-6 flex items-center justify-center rounded-lg text-[10px] font-black transition cursor-pointer ${
                selectedElement.textTransform === "uppercase"
                  ? "bg-[#A9782B] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
              title="Uppercase"
            >
              TT
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-0.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-0.5 shadow-2xs">
            {(["left", "center", "right"] as const).map((align) => (
              <button
                key={align}
                type="button"
                onClick={() => onUpdateSelected({ textAlign: align })}
                className={`w-7 h-6 flex items-center justify-center rounded-lg transition uppercase text-[10px] font-bold cursor-pointer ${
                  selectedElement.textAlign === align
                    ? "bg-[#A9782B] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
                title={`Align ${align}`}
              >
                {align.charAt(0)}
              </button>
            ))}
          </div>

          {/* Letter Spacing */}
          <div className="flex items-center gap-1.5 text-slate-500 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2 py-1">
            <span className="text-[10px] font-bold">Spacing:</span>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={selectedElement.letterSpacing || 0}
              onChange={(e) => onUpdateSelected({ letterSpacing: parseFloat(e.target.value) })}
              className="w-14 accent-[#A9782B] cursor-pointer"
            />
          </div>

          {/* Right Action Icons: Lock, Layer Order, Duplicate, Delete */}
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => onUpdateSelected({ locked: !selectedElement.locked })}
              className={`p-1.5 rounded-xl border transition cursor-pointer ${
                selectedElement.locked
                  ? "bg-amber-100 text-amber-800 border-amber-300"
                  : "bg-[#FAF8F5] hover:bg-slate-100 text-slate-600 border-[#E5E0D8]"
              }`}
              title={selectedElement.locked ? "Unlock element" : "Lock element in place"}
            >
              {selectedElement.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>

            {onBringForward && (
              <button
                type="button"
                onClick={onBringForward}
                className="p-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-600 border border-[#E5E0D8] transition"
                title="Bring Forward"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}
            {onSendBackward && (
              <button
                type="button"
                onClick={onSendBackward}
                className="p-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-600 border border-[#E5E0D8] transition"
                title="Send Backward"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onDuplicateSelected}
              className="p-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-[#E5E0D8] transition cursor-pointer shadow-2xs"
              title="Duplicate (Ctrl+D)"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onDeleteSelected}
              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 transition cursor-pointer shadow-2xs"
              title="Delete (Del)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------- */}
      {/* CASE 2: PRO ICON SELECTED                             */}
      {/* ----------------------------------------------------- */}
      {selectedElement && selectedElement.type === "icon" && (
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <span className="text-slate-900 font-extrabold text-xs capitalize flex items-center gap-1.5">
            {renderProIcon(selectedElement.iconName || "sparkles", "#A9782B", 16)}
            Vector Icon: {selectedElement.iconName}
          </span>

          {/* Color */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 text-[11px] font-semibold">Color:</span>
            <select
              value={selectedElement.color || "#A9782B"}
              onChange={(e) => onUpdateSelected({ color: e.target.value })}
              className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-1 text-slate-800 text-xs cursor-pointer font-bold"
            >
              {COLORS.map((c) => (
                <option key={c.hex} value={c.hex}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Size Stepper */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onUpdateSelected({ iconSize: Math.max(12, (selectedElement.iconSize || 22) - 2) })}
              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white font-bold cursor-pointer transition"
            >
              -
            </button>
            <span className="w-7 text-center font-mono font-bold text-slate-900">{selectedElement.iconSize || 22}</span>
            <button
              type="button"
              onClick={() => onUpdateSelected({ iconSize: Math.min(64, (selectedElement.iconSize || 22) + 2) })}
              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white font-bold cursor-pointer transition"
            >
              +
            </button>
          </div>

          {/* Pro Finish */}
          <div className="flex items-center gap-1 bg-[#FAF6EE] border border-[#EAD5B3] rounded-xl px-2 py-1 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A9782B]" />
            <select
              value={selectedElement.proFinish || "standard"}
              onChange={(e) => onUpdateSelected({ proFinish: e.target.value as ProFinish })}
              className="bg-transparent text-[#734D15] text-[11px] font-black cursor-pointer focus:outline-none"
            >
              <option value="standard">Standard Ink</option>
              <option value="gold-foil">🟡 24K Gold Foil</option>
              <option value="silver-foil">⚪ Silver Chrome Foil</option>
              <option value="rose-gold-foil">🌸 Rose Gold Foil</option>
              <option value="spot-uv">💎 Raised Spot UV</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => onUpdateSelected({ locked: !selectedElement.locked })}
              className={`p-1.5 rounded-xl border transition cursor-pointer ${
                selectedElement.locked
                  ? "bg-amber-100 text-amber-800 border-amber-300"
                  : "bg-[#FAF8F5] hover:bg-slate-100 text-slate-600 border-[#E5E0D8]"
              }`}
            >
              {selectedElement.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onDuplicateSelected}
              className="p-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-[#E5E0D8] transition"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onDeleteSelected}
              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------- */}
      {/* CASE 3: SHAPE ELEMENT SELECTED                        */}
      {/* ----------------------------------------------------- */}
      {selectedElement && selectedElement.type === "shape" && (
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <span className="text-slate-900 font-extrabold text-xs capitalize flex items-center gap-1.5">
            <Shapes className="w-3.5 h-3.5 text-[#A9782B]" />
            Shape: {selectedElement.shapeKind}
          </span>

          {/* Color */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 text-[11px] font-semibold">Color:</span>
            <select
              value={selectedElement.strokeColor || "#A9782B"}
              onChange={(e) => onUpdateSelected({ strokeColor: e.target.value })}
              className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-1 text-slate-800 text-xs cursor-pointer font-bold"
            >
              {COLORS.map((c) => (
                <option key={c.hex} value={c.hex}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pro Finish */}
          <div className="flex items-center gap-1 bg-[#FAF6EE] border border-[#EAD5B3] rounded-xl px-2 py-1 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A9782B]" />
            <select
              value={selectedElement.proFinish || "standard"}
              onChange={(e) => onUpdateSelected({ proFinish: e.target.value as ProFinish })}
              className="bg-transparent text-[#734D15] text-[11px] font-black cursor-pointer focus:outline-none"
            >
              <option value="standard">Standard Line</option>
              <option value="gold-foil">🟡 24K Gold Foil</option>
              <option value="silver-foil">⚪ Silver Chrome Foil</option>
              <option value="rose-gold-foil">🌸 Rose Gold Foil</option>
              <option value="spot-uv">💎 Raised Spot UV</option>
            </select>
          </div>

          {/* If Badge, edit text */}
          {selectedElement.shapeKind === "badge" && (
            <div className="flex items-center gap-1">
              <span className="text-slate-500 text-[11px] font-semibold">Badge Label:</span>
              <input
                type="text"
                value={selectedElement.badgeText || ""}
                onChange={(e) => onUpdateSelected({ badgeText: e.target.value })}
                className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-1 text-slate-900 text-xs uppercase font-bold w-36 focus:outline-none"
              />
            </div>
          )}

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={onDuplicateSelected}
              className="p-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-[#E5E0D8] transition"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onDeleteSelected}
              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------- */}
      {/* CASE 4: QR CODE SELECTED                              */}
      {/* ----------------------------------------------------- */}
      {selectedElement && selectedElement.type === "qr" && (
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <span className="text-slate-900 font-extrabold text-xs capitalize flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-[#A9782B]" />
            Dynamic QR: {selectedElement.qrKind?.toUpperCase()}
          </span>

          {/* QR Purpose Dropdown */}
          <select
            value={selectedElement.qrKind || "upi"}
            onChange={(e) =>
              onUpdateSelected({
                qrKind: e.target.value as CanvasElement["qrKind"],
                qrLabel:
                  e.target.value === "upi"
                    ? "SCAN TO PAY VIA UPI"
                    : e.target.value === "whatsapp"
                    ? "CHAT ON WHATSAPP"
                    : e.target.value === "vcard"
                    ? "SAVE CONTACT"
                    : "SCAN LINK",
              })
            }
            className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-1 text-slate-800 text-xs font-bold cursor-pointer"
          >
            <option value="upi">⚡ UPI Payment</option>
            <option value="whatsapp">💬 WhatsApp Chat</option>
            <option value="vcard">📇 Digital vCard</option>
            <option value="url">🌐 Website Link</option>
          </select>

          {/* Quick Payload Input based on kind */}
          {selectedElement.qrKind === "upi" && (
            <input
              type="text"
              value={selectedElement.upiId || ""}
              onChange={(e) => onUpdateSelected({ upiId: e.target.value })}
              placeholder="e.g. mahi@okhdfcbank"
              className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-1 text-slate-900 text-xs font-mono w-44"
            />
          )}

          {selectedElement.qrKind === "whatsapp" && (
            <input
              type="text"
              value={selectedElement.whatsappNumber || ""}
              onChange={(e) => onUpdateSelected({ whatsappNumber: e.target.value })}
              placeholder="+91 99450 39266"
              className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-1 text-slate-900 text-xs font-mono w-40"
            />
          )}

          {/* QR Color */}
          <select
            value={selectedElement.qrColor || "#0F172A"}
            onChange={(e) => onUpdateSelected({ qrColor: e.target.value })}
            className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2 py-1 text-slate-800 text-xs font-bold cursor-pointer"
          >
            {COLORS.map((c) => (
              <option key={c.hex} value={c.hex}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={onDuplicateSelected}
              className="p-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-[#E5E0D8] transition"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onDeleteSelected}
              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------- */}
      {/* CASE 5: NOTHING SELECTED (GLOBAL CANVAS & PRO AESTHETICS) */}
      {/* ----------------------------------------------------- */}
      {!selectedElement && (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full text-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            {/* Undo / Redo Buttons */}
            <div className="inline-flex rounded-xl bg-[#FAF8F5] p-0.5 border border-[#E5E0D8] shadow-2xs">
              <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onRedo}
                disabled={!canRedo}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Smart Autofill CTA */}
            {onOpenAiModal && (
              <button
                type="button"
                onClick={onOpenAiModal}
                className="px-2.5 py-1.5 rounded-xl font-black bg-gradient-to-r from-amber-500/10 via-[#A9782B]/15 to-amber-600/10 text-[#734D15] border border-[#EAD5B3] hover:border-[#A9782B] transition flex items-center gap-1.5 shadow-2xs cursor-pointer group"
                title="AI Business Card Generator"
              >
                <Wand2 className="w-3.5 h-3.5 text-[#A9782B] group-hover:rotate-12 transition-transform" />
                <span>AI Autofill</span>
                <span className="text-[8px] bg-[#A9782B] text-white px-1.5 py-0.2 rounded-full font-bold">
                  PRO
                </span>
              </button>
            )}

            {/* 1-Click Luxury Harmonies Picker */}
            {onApplyHarmony && (
              <div className="relative">
                <button
                  type="button"
                  id="harmonies-btn"
                  onClick={() => setIsHarmoniesOpen(!isHarmoniesOpen)}
                  className="px-2.5 py-1.5 rounded-xl font-bold bg-[#FAF8F5] hover:bg-[#FAF6EE] text-slate-800 border border-[#E5E0D8] hover:border-[#A9782B] transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  title="1-Click Curated Color Harmonies"
                >
                  <Palette className="w-3.5 h-3.5 text-[#A9782B]" />
                  <span>Harmonies</span>
                </button>

                {isHarmoniesOpen && (
                  <div className="absolute top-11 left-0 z-50 bg-white border border-[#E5E0D8] rounded-2xl p-2 shadow-2xl w-64 space-y-1.5 animate-in fade-in zoom-in-95">
                    <span className="text-[10px] font-black uppercase text-slate-400 px-2 block">
                      Curated Palettes
                    </span>
                    {COLOR_HARMONIES.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => {
                          onApplyHarmony(h);
                          setIsHarmoniesOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-[#FAF6EE] flex items-center gap-2.5 transition cursor-pointer text-xs"
                      >
                        <div
                          className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${h.previewBg} border border-slate-300 shadow-2xs shrink-0`}
                        />
                        <span className="font-bold text-slate-800 truncate text-[11px]">{h.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Gilded 24K Gold Edge Inset Toggle */}
            {onToggleGildedEdge && (
              <button
                type="button"
                id="gilded-edge-btn"
                onClick={onToggleGildedEdge}
                className={`px-2.5 py-1.5 rounded-xl font-bold border transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  gildedEdge
                    ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/30 text-amber-900 border-amber-500 shadow-xs font-black"
                    : "bg-[#FAF8F5] text-slate-700 border-[#E5E0D8] hover:bg-[#FAF6EE]"
                }`}
                title="Simulate luxury 24K gold foil beveled card edges"
              >
                <Crown className={`w-3.5 h-3.5 ${gildedEdge ? "text-amber-600" : "text-slate-500"}`} />
                <span>{gildedEdge ? "Gilded Edge Active" : "Gilded Edge"}</span>
              </button>
            )}

            {/* Tactile Texture Selector */}
            {onChangeTexture && (
              <select
                id="texture-select"
                value={cardTexture}
                onChange={(e) => onChangeTexture(e.target.value as CardTexture)}
                className="bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#A9782B] rounded-xl px-2.5 py-1 text-slate-800 text-xs font-bold cursor-pointer focus:outline-none shadow-2xs"
                title="Tactile paper texture finish"
              >
                {TEXTURE_OPTIONS.map((tex) => (
                  <option key={tex.id} value={tex.id}>
                    📄 {tex.name}
                  </option>
                ))}
              </select>
            )}

            <div className="h-4 w-px bg-[#E5E0D8] hidden md:block" />

            {/* Orientation Selector */}
            <div className="inline-flex rounded-xl bg-[#FAF8F5] p-0.5 border border-[#E5E0D8] shadow-2xs">
              <button
                type="button"
                onClick={() => onChangeOrientation("horizontal")}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px] ${
                  orientation === "horizontal"
                    ? "bg-[#A9782B] text-white shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ⬌ Landscape
              </button>
              <button
                type="button"
                onClick={() => onChangeOrientation("vertical")}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px] ${
                  orientation === "vertical"
                    ? "bg-[#A9782B] text-white shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ⬍ Portrait
              </button>
            </div>

            {/* Corner Radius */}
            <div className="inline-flex rounded-xl bg-[#FAF8F5] p-0.5 border border-[#E5E0D8] shadow-2xs">
              <button
                type="button"
                onClick={() => onChangeCornerStyle("square")}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px] ${
                  cornerStyle === "square"
                    ? "bg-[#A9782B] text-white shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Square
              </button>
              <button
                type="button"
                onClick={() => onChangeCornerStyle("rounded")}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px] ${
                  cornerStyle === "rounded"
                    ? "bg-[#A9782B] text-white shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                3mm Round
              </button>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* 3D Gold Foil Sheen Toggle */}
            {onToggle3DMode && (
              <button
                type="button"
                onClick={onToggle3DMode}
                className={`px-2.5 py-1 rounded-xl font-bold border transition flex items-center gap-1.5 cursor-pointer shadow-2xs text-xs ${
                  is3DMode
                    ? "bg-gradient-to-r from-amber-500 to-[#A9782B] text-white border-amber-600 shadow-xs"
                    : "bg-[#FAF8F5] text-slate-700 border-[#E5E0D8] hover:bg-slate-100"
                }`}
                title="Simulate realistic 3D specular gold foil lighting reflections"
              >
                <Sparkles className={`w-3.5 h-3.5 ${is3DMode ? "text-yellow-200 animate-spin" : "text-amber-600"}`} />
                <span>{is3DMode ? "3D Sheen" : "3D Off"}</span>
              </button>
            )}

            {/* Print Guidelines Toggle Button */}
            <button
              type="button"
              onClick={onToggleGuides}
              className={`px-2.5 py-1 rounded-xl font-bold border transition flex items-center gap-1.5 cursor-pointer shadow-2xs text-xs ${
                showGuides
                  ? "bg-[#FAF6EE] text-[#734D15] border-[#EAD5B3]"
                  : "bg-[#FAF8F5] text-slate-600 border-[#E5E0D8] hover:bg-slate-100"
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-[#A9782B]" />
              <span>{showGuides ? "Hide Guides" : "Show Guides"}</span>
            </button>

            {/* Instant Export Proof Button */}
            {onExportProof && (
              <button
                type="button"
                onClick={onExportProof}
                className="px-2.5 py-1 rounded-xl font-bold border border-[#E5E0D8] bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs text-xs"
                title="Download 300 DPI Proof File"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Proof</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
