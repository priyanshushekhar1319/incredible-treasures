"use client";

import React, { useState } from "react";
import { CanvasElement } from "./types";
import {
  runCardPreFlightInspection,
  PreFlightReport,
  PreFlightImageItem,
  VECTOR_VS_RASTER_GUIDE,
} from "./dpiUtils";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Scissors,
  Check,
  AlertOctagon,
  Wand2,
  Layers,
  HelpCircle,
  FileCheck2,
  Printer,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { hexToCmyk, formatCmyk, checkGamut, VERIFIED_CORPORATE_CMYK } from "./cmykUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  frontElements: CanvasElement[];
  backElements: CanvasElement[];
  orientation: "horizontal" | "vertical";
  productTitle: string;
  onProceedWithOrder?: () => void;
  onEnhanceImageElement?: (elementId: string) => Promise<void>;
}

export const PreFlightModal: React.FC<Props> = ({
  isOpen,
  onClose,
  frontElements,
  backElements,
  orientation,
  productTitle,
  onProceedWithOrder,
  onEnhanceImageElement,
}) => {
  const [approvedWarning, setApprovedWarning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"resolution" | "vector" | "cmyk">("resolution");
  const [enhancingId, setEnhancingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const report: PreFlightReport = runCardPreFlightInspection(
    frontElements,
    backElements,
    orientation
  );

  const handleEnhance = async (elementId: string) => {
    if (!onEnhanceImageElement) return;
    try {
      setEnhancingId(elementId);
      await onEnhanceImageElement(elementId);
    } finally {
      setEnhancingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-[#E5E0D8] max-w-3xl w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-2xl ${
                report.overallStatus === "approved"
                  ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                  : report.overallStatus === "caution"
                  ? "bg-amber-500/10 text-amber-700 border border-amber-500/20"
                  : "bg-rose-500/10 text-rose-700 border border-rose-500/20"
              }`}
            >
              <ShieldCheck className="w-6 h-6 text-[#A9782B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  Pre-Flight Industrial Print Inspector
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#FAF6EE] text-[#A9782B] px-2 py-0.5 rounded-full border border-[#EAD5B3]">
                  600+ DPI Ultra-HD Standard
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Automated optical pre-press analysis for <strong>{productTitle}</strong> (3.5" × 2.0" commercial cut trim).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold text-xl cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs (Resolution, Vector Guide, CMYK Proofing) */}
        <div className="flex items-center gap-2 border-b border-[#E5E0D8] pb-2 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("resolution")}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "resolution"
                ? "bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3] font-black"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#A9782B]" />
            <span>Resolution & 600+ DPI Meter</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("vector")}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "vector"
                ? "bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3] font-black"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#A9782B]" />
            <span>Vector vs Raster Clarity</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cmyk")}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "cmyk"
                ? "bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3] font-black"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-[#A9782B]" />
            <span>CMYK Press Color Inks</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-1">
          {/* ======================================================== */}
          {/* TAB 1: RESOLUTION & 600+ DPI METER                       */}
          {/* ======================================================== */}
          {activeTab === "resolution" && (
            <>
              {/* Overall Status Banner */}
              <div
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  report.overallStatus === "approved"
                    ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                    : report.overallStatus === "caution"
                    ? "bg-amber-50/80 border-amber-200 text-amber-950"
                    : "bg-rose-50/80 border-rose-200 text-rose-950"
                }`}
              >
                {report.overallStatus === "approved" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : report.overallStatus === "caution" ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}

                <div className="space-y-1">
                  <span className="text-xs font-black block">
                    {report.overallStatus === "approved"
                      ? "✓ 100% Pre-Flight Approved: Ultra-HD 600+ DPI / Vector Grade"
                      : report.overallStatus === "caution"
                      ? "⚠️ Quality Advisory: Standard Commercial Print Grade"
                      : "🚨 Low-Resolution Warning: Blurry Pixelation Risk"}
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    {report.overallStatus === "approved"
                      ? "All card typography, QR codes, icons, and uploaded logos meet the rigorous 600+ DPI offset press standard. Fine lines and micro-lettering will print with razor-sharp precision."
                      : report.overallStatus === "caution"
                      ? "One or more uploaded logos are between 150–599 DPI. While acceptable for everyday cards, use our 1-Click Smart Enhancer below to upscale directly to 600+ DPI."
                      : "One or more uploaded images are below 150 DPI and will print blurry. Click '✨ Enhance to 600+ DPI' below to automatically sharpen and double their resolution."}
                  </p>
                </div>
              </div>

              {/* Technical Inspection Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Images Inspected
                  </span>
                  <span className="text-base font-black text-slate-900 block mt-0.5">
                    {report.totalImages} {report.totalImages === 1 ? "Image" : "Images"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {report.ultraCrispImagesCount} @ 600+ DPI • {report.crispImagesCount} @ 300+
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Lowest DPI Detected
                  </span>
                  <span
                    className={`text-base font-black block mt-0.5 ${
                      report.lowestDpi && report.lowestDpi >= 600
                        ? "text-emerald-900"
                        : report.lowestDpi && report.lowestDpi >= 300
                        ? "text-emerald-700"
                        : report.lowestDpi && report.lowestDpi >= 150
                        ? "text-amber-700"
                        : report.lowestDpi !== null
                        ? "text-rose-700"
                        : "text-slate-700"
                    }`}
                  >
                    {report.lowestDpi ? `${report.lowestDpi} DPI` : "Vector (1200+ DPI)"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Target Standard: 600+ DPI
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Blade Safe Zone
                  </span>
                  <span className="text-base font-black text-slate-900 block mt-0.5 flex items-center gap-1">
                    <Scissors className="w-3.5 h-3.5 text-[#A9782B]" />
                    {report.safeZoneViolationsCount === 0 ? "100% Safe" : `${report.safeZoneViolationsCount} Near Trim`}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    2mm Bleed & Cut Margins
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Luxury Finishes
                  </span>
                  <span className="text-base font-black text-slate-900 block mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#A9782B]" />
                    {report.foilsCount} Layer(s)
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Foil & Spot UV Channels
                  </span>
                </div>
              </div>

              {/* Detailed Image Breakdown Table with 1-Click Enhancer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#A9782B]" />
                    Raster Artwork & Logo Resolution Breakdown ({report.images.length})
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Gold Standard: <strong>600+ DPI @ physical card size</strong>
                  </span>
                </div>

                {report.images.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#E5E0D8] text-center text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900">✨ Pure Vector Design (Zero Raster Artifacts)</p>
                    <p className="text-[11px] text-slate-500">
                      All elements on this card are native typography, mathematical vector rules, shapes, and QR codes. They output at 1200+ DPI press sharpness with zero blurriness.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {report.images.map((img) => (
                      <div
                        key={img.id}
                        className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                              img.status === "ultra-crisp"
                                ? "bg-emerald-200 text-emerald-950 font-black"
                                : img.status === "crisp"
                                ? "bg-emerald-100 text-emerald-800"
                                : img.status === "acceptable"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {img.status === "ultra-crisp"
                              ? "💎"
                              : img.status === "crisp"
                              ? "🟢"
                              : img.status === "acceptable"
                              ? "🟡"
                              : "🔴"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="text-slate-900 font-bold">{img.fileName}</strong>
                              <span className="text-[9px] uppercase font-bold bg-white text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                                Side {img.side.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <span>
                                Pixels: {img.naturalWidth} × {img.naturalHeight} px ({img.megapixels} MP)
                              </span>
                              <span>•</span>
                              <span>
                                Physical: {img.physicalWidthInches}" × {img.physicalHeightInches}"
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                          {/* 1-Click Smart Enhancer / 600+ DPI Upscaler */}
                          {onEnhanceImageElement && img.dpi < 600 && (
                            <button
                              type="button"
                              onClick={() => handleEnhance(img.id)}
                              disabled={enhancingId === img.id}
                              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-[#A9782B]/20 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-600/25 text-[#734D15] border border-[#EAD5B3] text-[10px] font-black transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                              title="Upscale 2x and apply unsharp masking to achieve 600+ DPI"
                            >
                              <Wand2 className={`w-3 h-3 ${enhancingId === img.id ? "animate-spin" : ""}`} />
                              <span>{enhancingId === img.id ? "Enhancing..." : "✨ Enhance to 600+ DPI"}</span>
                            </button>
                          )}

                          <div className="text-right">
                            <span
                              className={`font-mono font-black text-sm block ${
                                img.status === "ultra-crisp"
                                  ? "text-emerald-900"
                                  : img.status === "crisp"
                                  ? "text-emerald-700"
                                  : img.status === "acceptable"
                                  ? "text-amber-700"
                                  : "text-rose-700"
                              }`}
                            >
                              {img.dpi} DPI
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase">
                              {img.status === "ultra-crisp"
                                ? "💎 600+ Ultra-HD"
                                : img.status === "crisp"
                                ? "🟢 300+ Commercial"
                                : img.status === "acceptable"
                                ? "🟡 Acceptable"
                                : "🔴 Blur Risk"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* TAB 2: VECTOR VS RASTER CLARITY EXPLANATION              */}
          {/* ======================================================== */}
          {activeTab === "vector" && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF6EE] to-white border border-[#EAD5B3] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#A9782B]" />
                  <h4 className="text-xs font-black text-slate-900">
                    Understanding Vector vs Raster for Print Quality
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Commercial offset presses produce the finest prints when artwork uses mathematical vectors rather than pixel grids. Here is how your visiting card elements are constructed:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Vector Card */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-900 text-xs">📐 Pure Vector Elements</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-950 font-black px-1.5 py-0.5 rounded-full">
                      Infinity DPI Sharp
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                    {VECTOR_VS_RASTER_GUIDE.vector.description}
                  </p>
                  <div className="pt-1 border-t border-emerald-200/60 text-[10px] text-emerald-800">
                    <strong>Included in your design:</strong> {VECTOR_VS_RASTER_GUIDE.vector.elementsInStudio}
                  </div>
                </div>

                {/* Raster Card */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-amber-900 text-xs">🖼️ Raster Bitmap Images</span>
                    <span className="text-[9px] bg-amber-200 text-amber-950 font-black px-1.5 py-0.5 rounded-full">
                      DPI Dependent
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed">
                    {VECTOR_VS_RASTER_GUIDE.raster.description}
                  </p>
                  <div className="pt-1 border-t border-amber-200/60 text-[10px] text-amber-800">
                    <strong>Included in your design:</strong> {VECTOR_VS_RASTER_GUIDE.raster.elementsInStudio}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">💡 Pro Printing Tip:</span>
                <p>
                  If you have your company logo in SVG, EPS, or high-res vector PDF format, upload it directly. It will remain vector sharp at all sizes with zero degradation.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: CMYK COMMERCIAL PRESS COLOR INKS                  */}
          {/* ======================================================== */}
          {activeTab === "cmyk" && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF6EE] to-white border border-[#EAD5B3] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-[#A9782B]" />
                  <h4 className="text-xs font-black text-slate-900">
                    CMYK 4-Color Process Soft-Proofing (ISO 12647-2)
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Computer monitors emit <strong>RGB light</strong>, whereas printing presses blend 4 physical inks: <strong>Cyan (C)</strong>, <strong>Magenta (M)</strong>, <strong>Yellow (Y)</strong>, and <strong>Key Black (K)</strong>. Below are the verified press ink formulas for your palette:
                </p>
              </div>

              {/* 4 CMYK Plate Swatches */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 text-center">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 mx-auto mb-1.5 shadow-2xs" />
                  <span className="font-black text-cyan-950 block text-xs">Cyan Plate</span>
                  <span className="text-[10px] text-cyan-800">Process Blue Ink</span>
                </div>

                <div className="p-3 rounded-2xl bg-fuchsia-50 border border-fuchsia-200 text-center">
                  <div className="w-6 h-6 rounded-full bg-fuchsia-500 mx-auto mb-1.5 shadow-2xs" />
                  <span className="font-black text-fuchsia-950 block text-xs">Magenta Plate</span>
                  <span className="text-[10px] text-fuchsia-800">Process Red Ink</span>
                </div>

                <div className="p-3 rounded-2xl bg-yellow-50 border border-yellow-200 text-center">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 mx-auto mb-1.5 shadow-2xs" />
                  <span className="font-black text-yellow-950 block text-xs">Yellow Plate</span>
                  <span className="text-[10px] text-yellow-800">Process Yellow Ink</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-300 text-center">
                  <div className="w-6 h-6 rounded-full bg-slate-900 mx-auto mb-1.5 shadow-2xs" />
                  <span className="font-black text-slate-950 block text-xs">Key Plate</span>
                  <span className="text-[10px] text-slate-700">Carbon Black Ink</span>
                </div>
              </div>

              {/* Verified Press Colors Table */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                  Studio Ink Formulations:
                </span>
                <div className="space-y-1.5">
                  {VERIFIED_CORPORATE_CMYK.map((item) => {
                    const cmykStr = formatCmyk(item.cmyk);
                    const gamut = checkGamut(item.hex);
                    return (
                      <div
                        key={item.hex}
                        className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-5 h-5 rounded-lg border border-slate-300 shadow-2xs shrink-0"
                            style={{ backgroundColor: item.hex }}
                          />
                          <span className="font-bold text-slate-900">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
                            {cmykStr}
                          </span>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                            ✓ CMYK Certified
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Low-DPI Gatekeeper Checkbox if Warning */}
        {report.hasBlurRisk && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5 shrink-0">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={approvedWarning}
                onChange={(e) => setApprovedWarning(e.target.checked)}
                className="mt-0.5 rounded text-rose-600 focus:ring-rose-500 accent-rose-600"
              />
              <div className="text-[11px] text-rose-900">
                <span className="font-black block">Pre-Flight Customer Waiver:</span>
                I acknowledge that 1 or more uploaded images are below the 150 DPI threshold and may print pixelated. I approve production as-is.
              </div>
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5E0D8] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer"
          >
            Back to Studio
          </button>

          <div className="flex items-center gap-2">
            {onProceedWithOrder && (
              <button
                type="button"
                disabled={report.hasBlurRisk && !approvedWarning}
                onClick={() => {
                  onProceedWithOrder();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] text-white font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                <span>
                  {report.hasBlurRisk ? "Confirm Waiver & Proceed" : "Approve Pre-Flight & Order"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
