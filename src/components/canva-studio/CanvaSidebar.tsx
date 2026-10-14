"use client";

import React, { useState } from "react";
import { CanvasElement } from "./types";
import { STARTER_TEMPLATES, StudioTemplate } from "./templates";
import { ALL_PRODUCTS, CatalogProduct } from "@/data/products";
import { PRO_ICONS, renderProIcon } from "./proIcons";
import {
  LayoutTemplate,
  Type,
  Shapes,
  QrCode,
  UploadCloud,
  Layers,
  Sparkles,
  Plus,
  Check,
  Smartphone,
  CreditCard,
  FileCheck2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Trash2,
  Copy,
  Smile,
  Image as ImageIcon,
} from "lucide-react";

export type SidebarTabId =
  | "templates"
  | "text"
  | "icons"
  | "elements"
  | "qr"
  | "uploads"
  | "layers"
  | "substrate";

interface Props {
  activeTab: SidebarTabId;
  onChangeTab: (tab: SidebarTabId) => void;
  onApplyTemplate: (tpl: StudioTemplate) => void;
  onAddText: (type: "heading" | "subheading" | "body", defaultText?: string) => void;
  onAddShape: (kind: "divider-h" | "divider-v" | "badge" | "frame") => void;
  onAddIcon: (iconName: string) => void;
  onAddQr: (kind: "upi" | "whatsapp" | "vcard" | "url") => void;
  onUploadImage: (src: string) => void;
  selectedSubstrateId: string;
  onSelectSubstrate: (id: string) => void;

  // Pro Layers support
  currentElements: CanvasElement[];
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onReorderElement: (id: string, direction: "up" | "down") => void;

  // Custom Full Card Background support
  activeSide: "front" | "back";
  currentBgImage?: string;
  currentBgOpacity?: number;
  currentBgFit?: "cover" | "contain" | "repeat";
  onUploadBackgroundImage: (src: string, applyBothSides?: boolean) => void;
  onChangeBgOpacity?: (opacity: number) => void;
  onChangeBgFit?: (fit: "cover" | "contain" | "repeat") => void;
  onRemoveBgImage?: () => void;
}

const VISITING_CARDS = ALL_PRODUCTS.filter((p) => p.category === "visiting-cards");

const toSvgDataUri = (svgStr: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;

const PRESET_LUXURY_WALLPAPERS = [
  {
    id: "obsidian-gold",
    name: "Obsidian Gold",
    previewBg: "from-slate-900 via-neutral-900 to-amber-950",
    dataUrl: toSvgDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="#0B0F19"/><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#CBA768" stop-opacity="0.35"/><stop offset="100%" stop-color="#8E621E" stop-opacity="0.08"/></linearGradient></defs><path d="M-50,0 L200,240 L450,0 Z" fill="url(#g1)"/><circle cx="320" cy="60" r="120" fill="none" stroke="#CBA768" stroke-width="0.75" opacity="0.3"/><circle cx="80" cy="180" r="90" fill="none" stroke="#CBA768" stroke-width="0.5" opacity="0.2"/></svg>`
    ),
  },
  {
    id: "royal-navy",
    name: "Royal Navy Line",
    previewBg: "from-blue-950 via-slate-900 to-indigo-950",
    dataUrl: toSvgDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="#081426"/><g stroke="#38BDF8" stroke-width="0.75" opacity="0.25"><line x1="0" y1="40" x2="400" y2="40"/><line x1="0" y1="80" x2="400" y2="80"/><line x1="0" y1="120" x2="400" y2="120"/><line x1="0" y1="160" x2="400" y2="160"/><line x1="0" y1="200" x2="400" y2="200"/><line x1="80" y1="0" x2="80" y2="240"/><line x1="160" y1="0" x2="160" y2="240"/><line x1="240" y1="0" x2="240" y2="240"/><line x1="320" y1="0" x2="320" y2="240"/></g></svg>`
    ),
  },
  {
    id: "imperial-emerald",
    name: "Imperial Emerald",
    previewBg: "from-emerald-950 via-slate-900 to-teal-950",
    dataUrl: toSvgDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="#04201A"/><circle cx="200" cy="120" r="180" fill="none" stroke="#10B981" stroke-width="1.2" opacity="0.25"/><circle cx="200" cy="120" r="130" fill="none" stroke="#34D399" stroke-width="0.9" opacity="0.3"/><circle cx="200" cy="120" r="80" fill="none" stroke="#6EE7B7" stroke-width="0.6" opacity="0.35"/></svg>`
    ),
  },
  {
    id: "milky-guilloche",
    name: "Milky Guilloche",
    previewBg: "from-amber-50 via-white to-stone-100",
    dataUrl: toSvgDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="#FAF8F5"/><g fill="none" stroke="#CBA768" stroke-width="0.85" opacity="0.35"><ellipse cx="200" cy="120" rx="160" ry="90"/><ellipse cx="200" cy="120" rx="130" ry="70"/><ellipse cx="200" cy="120" rx="100" ry="50"/><ellipse cx="200" cy="120" rx="70" ry="30"/></g></svg>`
    ),
  },
];

export const CanvaSidebar: React.FC<Props> = ({
  activeTab,
  onChangeTab,
  onApplyTemplate,
  onAddText,
  onAddShape,
  onAddIcon,
  onAddQr,
  onUploadImage,
  selectedSubstrateId,
  onSelectSubstrate,
  currentElements,
  selectedId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onReorderElement,
  activeSide,
  currentBgImage,
  currentBgOpacity = 1,
  currentBgFit = "cover",
  onUploadBackgroundImage,
  onChangeBgOpacity,
  onChangeBgFit,
  onRemoveBgImage,
}) => {
  const [selectedIconCategory, setSelectedIconCategory] = useState<string>("all");
  const [applyBothSides, setApplyBothSides] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) onUploadImage(result);
    };
    reader.readAsDataURL(file);
  };

  const SIDEBAR_TABS = [
    { id: "templates" as const, label: "Templates", icon: LayoutTemplate },
    { id: "text" as const, label: "Text", icon: Type },
    { id: "icons" as const, label: "Icons", icon: Smile },
    { id: "elements" as const, label: "Elements", icon: Shapes },
    { id: "qr" as const, label: "QR Codes", icon: QrCode },
    { id: "uploads" as const, label: "Uploads", icon: UploadCloud },
    { id: "layers" as const, label: "Layers", icon: Layers },
    { id: "substrate" as const, label: "Material", icon: CreditCard },
  ];

  const filteredIcons =
    selectedIconCategory === "all"
      ? PRO_ICONS
      : PRO_ICONS.filter((i) => i.category === selectedIconCategory);

  return (
    <aside className="flex h-full border-r border-[#E5E0D8] bg-[#FAF8F5] text-slate-800 select-none shadow-sm">
      {/* 1. CANVA LEFT ICON STRIP */}
      <div className="w-18 flex flex-col items-center py-3 border-r border-[#E5E0D8] bg-white gap-1 shrink-0 overflow-y-auto">
        {SIDEBAR_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`w-14 py-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition cursor-pointer text-[10px] font-bold ${
                isActive
                  ? "bg-[#FAF6EE] text-[#A9782B] font-black border border-[#EAD5B3] shadow-xs"
                  : "text-slate-500 hover:text-slate-900 hover:bg-[#FAF8F5]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#A9782B]" : "text-slate-400"}`} />
              <span className="leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. EXPANDED PANEL CONTENT */}
      <div className="w-64 sm:w-72 p-4 overflow-y-auto space-y-4 bg-white flex flex-col">
        {/* TAB 1: TEMPLATES */}
        {activeTab === "templates" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Starter Layouts</h3>
              <p className="text-[10px] text-slate-500">1-click professional layouts. Drag or edit any element.</p>
            </div>

            <div className="space-y-2.5">
              {STARTER_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => onApplyTemplate(tpl)}
                  className="w-full text-left p-3 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] hover:bg-[#FAF6EE] hover:border-[#A9782B] transition cursor-pointer group shadow-2xs"
                >
                  {/* Miniature Physical Card Preview */}
                  <div
                    className={`h-20 rounded-xl bg-gradient-to-r ${tpl.previewBg} p-2.5 flex flex-col justify-between mb-2.5 border border-slate-700/20 group-hover:scale-102 transition-transform shadow-md relative overflow-hidden`}
                  >
                    {/* Mini Gilded Gold Trim Inset */}
                    <div className="absolute inset-1 border border-amber-400/30 rounded-lg pointer-events-none" />

                    {/* Mini Header / Company */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 font-serif truncate max-w-[140px]">
                        {tpl.frontElements[0]?.text || "EXECUTIVE"}
                      </span>
                      <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-black/40 text-amber-200/90 border border-amber-300/30">
                        {tpl.frontElements.length}L
                      </span>
                    </div>

                    {/* Mini Divider Rule */}
                    <div className="w-12 h-0.5 bg-amber-400/70 rounded-full" />

                    {/* Mini Details Mockup */}
                    <div className="space-y-0.5">
                      <div className="w-20 h-1 bg-white/60 rounded-full" />
                      <div className="w-14 h-0.5 bg-white/30 rounded-full" />
                    </div>
                  </div>

                  <span className="text-xs font-black text-slate-900 block group-hover:text-[#A9782B]">
                    {tpl.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block">{tpl.category}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TEXT */}
        {activeTab === "text" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Add Freeform Text</h3>
              <p className="text-[10px] text-slate-500">Click to drop text anywhere onto the card canvas.</p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onAddText("heading", "YOUR NAME")}
                className="w-full p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-left transition cursor-pointer shadow-2xs group"
              >
                <span className="text-sm font-black text-slate-900 group-hover:text-[#A9782B] block font-serif tracking-wide">
                  + Add a Heading
                </span>
                <span className="text-[10px] text-slate-500 block">Executive name, Doctor name</span>
              </button>

              <button
                type="button"
                onClick={() => onAddText("subheading", "MANAGING DIRECTOR")}
                className="w-full p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-left transition cursor-pointer shadow-2xs group"
              >
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#A9782B] block uppercase tracking-wider">
                  + Add a Subheading
                </span>
                <span className="text-[10px] text-slate-500 block">Designation, Specialization, Role</span>
              </button>

              <button
                type="button"
                onClick={() => onAddText("body", "contact@company.com  •  +91 99000 12345")}
                className="w-full p-2.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-left transition cursor-pointer shadow-2xs group"
              >
                <span className="text-xs font-normal text-slate-700 group-hover:text-[#A9782B] block">
                  + Add Little Bit of Body Text
                </span>
                <span className="text-[10px] text-slate-500 block">Email, phone, clinic hours, address</span>
              </button>
            </div>

            {/* Quick Preset Buttons */}
            <div className="pt-2 border-t border-[#E5E0D8] space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Quick Industry Text Tags:
              </span>
              {[
                { label: "Doctor Reg No (KMC)", text: "REG. NO. KMC 48291" },
                { label: "GSTIN Number", text: "GSTIN: 29AAAAA0000A1Z5" },
                { label: "Clinic Timings", text: "Hours: 9 AM – 1 PM & 5 PM – 9 PM" },
                { label: "Corporate Tagline", text: "Delivering Excellence Since 2012" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onAddText("body", item.text)}
                  className="w-full text-left p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-[11px] text-slate-700 hover:text-slate-900 transition cursor-pointer font-medium"
                >
                  + {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRO VECTOR ICONS & BADGES */}
        {activeTab === "icons" && (
          <div className="space-y-3.5">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A9782B]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Pro Vector Icons
                </h3>
              </div>
              <p className="text-[10px] text-slate-500">100+ SVG icons. Click to add & recolor in Gold/Silver.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#E5E0D8]">
              {[
                { id: "all", label: "All" },
                { id: "contact", label: "Contact" },
                { id: "luxury", label: "Luxury" },
                { id: "business", label: "Business" },
                { id: "medical", label: "Medical" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedIconCategory(cat.id)}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition cursor-pointer ${
                    selectedIconCategory === cat.id
                      ? "bg-[#A9782B] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-3 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredIcons.map((ico) => {
                const IconComponent = ico.icon;
                return (
                  <button
                    key={ico.id}
                    type="button"
                    onClick={() => onAddIcon(ico.id)}
                    className="p-2.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] flex flex-col items-center justify-center gap-1.5 text-center transition cursor-pointer shadow-2xs group"
                    title={ico.name}
                  >
                    <IconComponent className="w-5 h-5 text-slate-700 group-hover:text-[#A9782B] transition-transform group-hover:scale-110" />
                    <span className="text-[9px] font-semibold text-slate-600 group-hover:text-slate-900 truncate w-full">
                      {ico.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ELEMENTS & SHAPES */}
        {activeTab === "elements" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Shapes & Dividers</h3>
              <p className="text-[10px] text-slate-500">Click to add divider rules, badges, or border frames.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onAddShape("divider-h")}
                className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] transition text-center cursor-pointer flex flex-col items-center gap-2 shadow-2xs"
              >
                <div className="w-12 h-0.5 bg-[#A9782B] rounded my-2" />
                <span className="text-[11px] font-bold text-slate-800">Gold Divider</span>
              </button>

              <button
                type="button"
                onClick={() => onAddShape("divider-v")}
                className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] transition text-center cursor-pointer flex flex-col items-center gap-2 shadow-2xs"
              >
                <div className="w-0.5 h-8 bg-[#A9782B] rounded" />
                <span className="text-[11px] font-bold text-slate-800">Vertical Line</span>
              </button>

              <button
                type="button"
                onClick={() => onAddShape("badge")}
                className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] transition text-center cursor-pointer flex flex-col items-center gap-1.5 shadow-2xs"
              >
                <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#A9782B] border border-[#EAD5B3]">
                  BADGE
                </span>
                <span className="text-[11px] font-bold text-slate-800">Role Pill Tag</span>
              </button>

              <button
                type="button"
                onClick={() => onAddShape("frame")}
                className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] transition text-center cursor-pointer flex flex-col items-center gap-1.5 shadow-2xs"
              >
                <div className="w-8 h-6 rounded border border-dashed border-[#A9782B]" />
                <span className="text-[11px] font-bold text-slate-800">Border Frame</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: DYNAMIC QR CODE */}
        {activeTab === "qr" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Dynamic QR Codes</h3>
              <p className="text-[10px] text-slate-500">Click to add a scannable vector QR code directly onto the card.</p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onAddQr("upi")}
                className="w-full p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-left transition cursor-pointer flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-black text-sm shrink-0">
                  ⚡
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 group-hover:text-[#A9782B] block">UPI Payment QR</span>
                  <span className="text-[10px] text-slate-500 block">PhonePe / GPay / Paytm scan to pay</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onAddQr("whatsapp")}
                className="w-full p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-left transition cursor-pointer flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center font-black text-sm shrink-0">
                  💬
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 group-hover:text-[#A9782B] block">WhatsApp Direct QR</span>
                  <span className="text-[10px] text-slate-500 block">1-tap chat with pre-filled message</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onAddQr("vcard")}
                className="w-full p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-left transition cursor-pointer flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center font-black text-sm shrink-0">
                  📇
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 group-hover:text-[#A9782B] block">Digital vCard Contact</span>
                  <span className="text-[10px] text-slate-500 block">Saves full contact into phone address book</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onAddQr("url")}
                className="w-full p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#A9782B] text-left transition cursor-pointer flex items-center gap-3 shadow-2xs group"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 flex items-center justify-center font-black text-sm shrink-0">
                  🌐
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 group-hover:text-[#A9782B] block">Website / Portfolio Link</span>
                  <span className="text-[10px] text-slate-500 block">Direct URL to your business</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: UPLOADS & CUSTOM BACKGROUND */}
        {activeTab === "uploads" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Uploads & Background</h3>
              <p className="text-[10px] text-slate-500">Upload personalized full card background or company logos.</p>
            </div>

            {/* SECTION 1: PERSONALIZED FULL CARD BACKGROUND */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#A9782B]" />
                  <span className="text-xs font-black text-slate-900">
                    Custom Card Background
                  </span>
                </div>
                <span className="text-[8px] font-bold uppercase bg-[#FAF6EE] text-[#A9782B] px-1.5 py-0.2 rounded border border-[#EAD5B3]">
                  Side {activeSide.toUpperCase()}
                </span>
              </div>

              {currentBgImage ? (
                <div className="space-y-2.5">
                  {/* Thumbnail Preview */}
                  <div className="relative h-20 rounded-xl overflow-hidden border border-slate-300 shadow-xs group">
                    <img
                      src={currentBgImage}
                      alt="Custom Background"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={onRemoveBgImage}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold transition flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Opacity Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600">
                      <span>Background Opacity:</span>
                      <span className="font-mono text-[#A9782B]">
                        {Math.round((currentBgOpacity ?? 1) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={currentBgOpacity ?? 1}
                      onChange={(e) => onChangeBgOpacity?.(parseFloat(e.target.value))}
                      className="w-full accent-[#A9782B] cursor-pointer"
                    />
                  </div>

                  {/* Scaling Fit */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-600 block">Fit Mode:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {(["cover", "contain", "repeat"] as const).map((fit) => (
                        <button
                          key={fit}
                          type="button"
                          onClick={() => onChangeBgFit?.(fit)}
                          className={`py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                            currentBgFit === fit
                              ? "bg-[#A9782B] text-white shadow-2xs font-black"
                              : "bg-white border border-[#E5E0D8] text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {fit}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Replace Button */}
                  <label className="w-full py-1.5 rounded-xl border border-[#E5E0D8] bg-white hover:bg-slate-50 text-slate-700 text-center block text-[11px] font-bold cursor-pointer transition">
                    Replace Background Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const r = new FileReader();
                        r.onload = (ev) => {
                          const res = ev.target?.result as string;
                          if (res) onUploadBackgroundImage(res, applyBothSides);
                        };
                        r.readAsDataURL(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="p-4 border-2 border-dashed border-[#E5E0D8] hover:border-[#A9782B] rounded-xl bg-white hover:bg-[#FAF6EE] transition flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer shadow-2xs">
                    <UploadCloud className="w-6 h-6 text-[#A9782B]" />
                    <span className="text-xs font-bold text-slate-800 block">
                      Upload Custom Card Background
                    </span>
                    <span className="text-[9px] text-slate-500 block">
                      High-Res PNG, JPG, or SVG (Applied as wallpaper behind all elements)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const r = new FileReader();
                        r.onload = (ev) => {
                          const res = ev.target?.result as string;
                          if (res) onUploadBackgroundImage(res, applyBothSides);
                        };
                        r.readAsDataURL(file);
                      }}
                      className="hidden"
                    />
                  </label>

                  {/* Apply to both faces toggle */}
                  <label className="flex items-center gap-2 text-[11px] text-slate-700 font-bold cursor-pointer select-none px-1">
                    <input
                      type="checkbox"
                      checked={applyBothSides}
                      onChange={(e) => setApplyBothSides(e.target.checked)}
                      className="rounded text-[#A9782B] focus:ring-[#A9782B] accent-[#A9782B]"
                    />
                    <span>Apply to both Front & Back faces</span>
                  </label>

                  {/* Quick Preset Luxury Wallpapers */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      Or Choose Curated Background:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {PRESET_LUXURY_WALLPAPERS.map((wp) => (
                        <button
                          key={wp.id}
                          type="button"
                          onClick={() => onUploadBackgroundImage(wp.dataUrl, applyBothSides)}
                          className="p-1.5 rounded-xl border border-[#E5E0D8] hover:border-[#A9782B] bg-white hover:bg-[#FAF6EE] transition cursor-pointer text-left flex items-center gap-2 shadow-2xs group"
                        >
                          <div
                            className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${wp.previewBg} border border-slate-300 shadow-2xs shrink-0 group-hover:scale-105 transition-transform`}
                          />
                          <span className="text-[10px] font-bold text-slate-700 truncate">
                            {wp.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: FLOATING LOGO / GRAPHIC ARTWORK */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2 shadow-2xs">
              <span className="text-xs font-black text-slate-900 block">
                Upload Logo / Floating Element
              </span>
              <p className="text-[10px] text-slate-500">
                Adds a movable, draggable logo or icon layer on the card.
              </p>

              <label className="p-3 border-2 border-dashed border-[#E5E0D8] hover:border-[#A9782B] rounded-xl bg-white hover:bg-[#FAF6EE] transition flex flex-col items-center justify-center text-center gap-1 cursor-pointer">
                <UploadCloud className="w-5 h-5 text-slate-500" />
                <span className="text-xs font-bold text-slate-800">Choose Logo File</span>
                <span className="text-[9px] text-slate-500">Transparent PNG recommended</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>
        )}

        {/* TAB 7: CANVA PRO LAYERS PANEL */}
        {activeTab === "layers" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Layers Panel</h3>
                <p className="text-[10px] text-slate-500">{currentElements.length} elements on active side</p>
              </div>
              <span className="text-[9px] font-bold uppercase bg-[#FAF6EE] text-[#A9782B] px-2 py-0.5 rounded-full border border-[#EAD5B3]">
                Pro
              </span>
            </div>

            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
              {currentElements.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#E5E0D8]">
                  No elements on this side yet.
                </div>
              ) : (
                // Render from top to bottom (reverse array for visual hierarchy)
                [...currentElements].reverse().map((el, idx) => {
                  const isSelected = selectedId === el.id;
                  const label =
                    el.type === "text"
                      ? el.text || "Text Layer"
                      : el.type === "icon"
                      ? `Icon: ${el.iconName || "Symbol"}`
                      : el.type === "shape"
                      ? `Shape: ${el.shapeKind || "Divider"}`
                      : el.type === "qr"
                      ? `QR: ${el.qrKind?.toUpperCase() || "Code"}`
                      : "Image / Logo";

                  return (
                    <div
                      key={el.id}
                      onClick={() => onSelectElement(el.id)}
                      className={`p-2 rounded-xl border transition flex items-center justify-between gap-2 cursor-pointer text-xs ${
                        isSelected
                          ? "bg-[#FAF6EE] border-[#A9782B] text-slate-900 shadow-2xs font-bold"
                          : "bg-[#FAF8F5] border-[#E5E0D8] text-slate-700 hover:bg-[#FAF6EE]"
                      }`}
                    >
                      {/* Name & Type */}
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-[9px] font-mono font-bold text-slate-400 w-3">
                          {currentElements.length - idx}
                        </span>
                        <span className="truncate text-[11px]">{label}</span>
                      </div>

                      {/* Layer Actions */}
                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        {/* Lock / Unlock */}
                        <button
                          type="button"
                          onClick={() => onUpdateElement(el.id, { locked: !el.locked })}
                          className={`p-1 rounded-lg transition ${
                            el.locked ? "text-amber-700 bg-amber-100" : "text-slate-400 hover:text-slate-700"
                          }`}
                          title={el.locked ? "Unlock element" : "Lock element"}
                        >
                          {el.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        </button>

                        {/* Visibility Hide/Show */}
                        <button
                          type="button"
                          onClick={() => onUpdateElement(el.id, { hidden: !el.hidden })}
                          className={`p-1 rounded-lg transition ${
                            el.hidden ? "text-rose-500 bg-rose-50" : "text-slate-400 hover:text-slate-700"
                          }`}
                          title={el.hidden ? "Show element" : "Hide element"}
                        >
                          {el.hidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>

                        {/* Layer Reorder */}
                        <button
                          type="button"
                          onClick={() => onReorderElement(el.id, "up")}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200"
                          title="Bring Forward"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onReorderElement(el.id, "down")}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200"
                          title="Send Backward"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => onDeleteElement(el.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Layer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 8: MATERIAL / SUBSTRATE */}
        {activeTab === "substrate" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Physical Card Substrate</h3>
              <p className="text-[10px] text-slate-500">Select your material finish.</p>
            </div>

            <div className="space-y-2">
              {VISITING_CARDS.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => onSelectSubstrate(prod.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    selectedSubstrateId === prod.id
                      ? "bg-[#FAF6EE] border-[#A9782B] text-slate-900 shadow-2xs"
                      : "bg-[#FAF8F5] border-[#E5E0D8] text-slate-700 hover:bg-[#FAF6EE]"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-black block truncate">{prod.title}</span>
                    <span className="text-[10px] text-slate-500 block">{prod.badge || "400 Micron PVC"}</span>
                  </div>
                  {selectedSubstrateId === prod.id && <Check className="w-4 h-4 text-[#A9782B] shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
