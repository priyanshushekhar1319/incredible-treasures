"use client";

import React, { useState } from "react";
import { ProductionGateResult, ProductionDefect } from "./productionGatekeeper";
import {
  AlertOctagon,
  ShieldAlert,
  CheckCircle2,
  Wand2,
  Move,
  ArrowRight,
  Rotate3d,
  Edit3,
  X,
  Lock,
  Unlock,
  Scissors,
  Image as ImageIcon,
  Check,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gateResult: ProductionGateResult;
  onFixUpscaleImage: (elementId: string) => Promise<void>;
  onFixNudgeSafeZone: (elementId: string, side: "front" | "back") => void;
  onFixSwitchSide: () => void;
  onFixSelectElement: (elementId: string, side: "front" | "back") => void;
  onProceedToOrder: () => void;
  onAutoFixAllAndProceed?: () => Promise<void> | void;
}

export const OrderBlockedModal: React.FC<Props> = ({
  isOpen,
  onClose,
  gateResult,
  onFixUpscaleImage,
  onFixNudgeSafeZone,
  onFixSwitchSide,
  onFixSelectElement,
  onProceedToOrder,
  onAutoFixAllAndProceed,
}) => {
  const [fixingId, setFixingId] = useState<string | null>(null);
  const [isAutoFixingAll, setIsAutoFixingAll] = useState<boolean>(false);

  if (!isOpen) return null;

  const isBlocked = !gateResult.canPrint;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-rose-300 max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-2xl ${
                isBlocked
                  ? "bg-rose-100 text-rose-700 border border-rose-300 animate-pulse"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-300"
              }`}
            >
              {isBlocked ? (
                <ShieldAlert className="w-6 h-6 text-rose-600" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {isBlocked
                    ? "Printing Blocked: Pre-Press Errors Must Be Fixed"
                    : "✓ Production Approved: Ready for Offset Press"}
                </h3>
                <span
                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    isBlocked
                      ? "bg-rose-100 text-rose-800 border-rose-300"
                      : "bg-emerald-100 text-emerald-800 border-emerald-300"
                  }`}
                >
                  {isBlocked ? "HARD BLOCKED" : "UNLOCKED"}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isBlocked
                  ? "Our industrial print safety system prevents printing to avoid defective or blurry cards."
                  : "All 4 commercial printing criteria have been verified and passed."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 font-bold text-xl p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Status Callout Banner */}
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 shrink-0 ${
            isBlocked
              ? "bg-rose-50 border-rose-300 text-rose-950"
              : "bg-emerald-50 border-emerald-300 text-emerald-950"
          }`}
        >
          {isBlocked ? (
            <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}

          <div className="space-y-1">
            <span className="text-xs font-black block">
              {isBlocked
                ? `🚨 ${gateResult.criticalErrorsCount} Critical Defect(s) Preventing Commercial Printing`
                : "✓ 100% Quality Assurance Cleared for Offset Machine"}
            </span>
            <p className="text-[11px] leading-relaxed text-slate-600">
              {isBlocked
                ? "If printed with these defects, your cards will have chopped-off text or blurry logos. Use the 1-click automatic fix buttons below to resolve each issue instantly."
                : "Congratulations! Your card meets the 600+ DPI standard, safe cutting margins, dual-sided inspection, and personalized data criteria."}
            </p>
          </div>
        </div>

        {/* List of Exact Errors with 1-Click Fixes */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
          <div className="flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider">
            <span>Required Fixes ({gateResult.defects.length})</span>
            <span className="text-[10px] text-slate-500 font-normal">
              Click fix buttons to auto-resolve
            </span>
          </div>

          {gateResult.defects.length === 0 ? (
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <strong className="text-emerald-950 font-black block text-sm">
                Zero Defects Detected!
              </strong>
              <p className="text-xs text-emerald-800">
                Your card layout and artwork are 100% compliant with commercial print specifications.
              </p>
            </div>
          ) : (
            gateResult.defects.map((defect, idx) => (
              <div
                key={defect.id}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-rose-200 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-rose-300">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 font-black text-xs">
                          {defect.title}
                        </strong>
                        {defect.side && (
                          <span className="text-[9px] uppercase font-bold bg-white text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                            Side {defect.side.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {defect.errorMessage}
                      </p>
                    </div>
                  </div>

                  {/* 1-Click Fix Button based on fixType */}
                  <div className="shrink-0">
                    {defect.fixType === "upscale-image" && defect.elementId && (
                      <button
                        type="button"
                        disabled={fixingId === defect.elementId}
                        onClick={async () => {
                          try {
                            setFixingId(defect.elementId!);
                            await onFixUpscaleImage(defect.elementId!);
                          } finally {
                            setFixingId(null);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#A9782B] hover:bg-[#8E621E] text-white font-black text-[11px] transition flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        <Wand2
                          className={`w-3.5 h-3.5 ${
                            fixingId === defect.elementId ? "animate-spin" : ""
                          }`}
                        />
                        <span>
                          {fixingId === defect.elementId ? "Upscaling..." : "✨ Auto-Upscale to 600+ DPI"}
                        </span>
                      </button>
                    )}

                    {defect.fixType === "nudge-safe-zone" && defect.elementId && (
                      <button
                        type="button"
                        onClick={() =>
                          onFixNudgeSafeZone(defect.elementId!, defect.side || "front")
                        }
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-[#A9782B] hover:from-amber-700 hover:to-[#8E621E] text-white font-black text-[11px] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Move className="w-3.5 h-3.5" />
                        <span>Auto-Nudge Safe Zone</span>
                      </button>
                    )}

                    {defect.fixType === "switch-side" && (
                      <button
                        type="button"
                        onClick={() => {
                          onFixSwitchSide();
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-[11px] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Rotate3d className="w-3.5 h-3.5" />
                        <span>Switch to Side B</span>
                      </button>
                    )}

                    {defect.fixType === "edit-text" && defect.elementId && (
                      <button
                        type="button"
                        onClick={() => {
                          onFixSelectElement(defect.elementId!, defect.side || "front");
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#A9782B] text-[#734D15] hover:bg-[#FAF6EE] font-black text-[11px] transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Real Text</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>
                    Current: <strong className="text-rose-700">{defect.currentValue}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Required: <strong className="text-emerald-700">{defect.requiredValue}</strong>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer"
          >
            Back to Editor
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {isBlocked && onAutoFixAllAndProceed && (
              <button
                type="button"
                disabled={isAutoFixingAll}
                onClick={async () => {
                  try {
                    setIsAutoFixingAll(true);
                    await onAutoFixAllAndProceed();
                    onClose();
                  } finally {
                    setIsAutoFixingAll(false);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-[#A9782B] hover:from-amber-700 hover:to-[#8E621E] text-white font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-101"
                title="Automatically upscale low-res images to 600+ DPI, nudge out-of-margin items safely, and open cart"
              >
                <Wand2 className={`w-3.5 h-3.5 ${isAutoFixingAll ? "animate-spin" : ""}`} />
                <span>{isAutoFixingAll ? "Auto-Fixing..." : "⚡ Auto-Fix All & Open Cart"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onProceedToOrder();
                onClose();
              }}
              className={`px-4 py-2 rounded-xl text-white font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-101 ${
                isBlocked
                  ? "bg-slate-800 hover:bg-slate-900 border border-slate-700"
                  : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800"
              }`}
            >
              {isBlocked ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Check className="w-3.5 h-3.5" />}
              <span>{isBlocked ? "Proceed to Cart Anyway" : "✓ Add to Cart & Open Order"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
