"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Check,
  Loader2,
  Sparkles,
  Layers,
  FolderHeart,
  CloudCheck,
  ShieldCheck,
} from "lucide-react";
import {
  RenderFaceParams,
  generateThumbnailDataUrl,
} from "./printExportEngine";
import { getCustomerSession, getSessionId } from "@/lib/customerSession";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: (design: any) => void;
  currentDesignName: string;
  substrateId: string;
  substrateTitle: string;
  orientation: "horizontal" | "vertical";
  cornerStyle: "square" | "rounded";
  backgroundColor: string;
  gildedEdge: boolean;
  cardTexture: string;
  frontParams: RenderFaceParams;
  backParams: RenderFaceParams;
  existingDesignId?: string | null;
}

export const SaveDesignModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSaveSuccess,
  currentDesignName,
  substrateId,
  substrateTitle,
  orientation,
  cornerStyle,
  backgroundColor,
  gildedEdge,
  cardTexture,
  frontParams,
  backParams,
  existingDesignId,
}) => {
  const [designName, setDesignName] = useState<string>(
    currentDesignName || "Executive 24K Gold Visiting Card"
  );
  const [frontThumb, setFrontThumb] = useState<string>("");
  const [backThumb, setBackThumb] = useState<string>("");
  const [isGeneratingThumbs, setIsGeneratingThumbs] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [saveAsCopy, setSaveAsCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsSaved(false);
      setDesignName(currentDesignName || "Executive 24K Gold Visiting Card");
      setIsGeneratingThumbs(true);

      // Generate compact thumbnail previews in background
      Promise.all([
        generateThumbnailDataUrl(frontParams),
        generateThumbnailDataUrl(backParams),
      ])
        .then(([f, b]) => {
          setFrontThumb(f);
          setBackThumb(b);
        })
        .finally(() => {
          setIsGeneratingThumbs(false);
        });
    }
  }, [isOpen, currentDesignName, frontParams, backParams]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!designName.trim()) return;
    setIsSaving(true);

    try {
      const user = getCustomerSession();
      const sessionId = getSessionId();

      const payload = {
        id: saveAsCopy ? undefined : existingDesignId || undefined,
        userId: user?.id,
        email: user?.email,
        sessionId,
        name: designName.trim(),
        productSlug: "visiting-cards",
        substrateId,
        orientation,
        cornerStyle,
        backgroundColor,
        gildedEdge,
        cardTexture,
        frontElements: frontParams.elements,
        backElements: backParams.elements,
        frontBgImage: frontParams.backgroundImage,
        backBgImage: backParams.backgroundImage,
        frontBgOpacity: frontParams.backgroundOpacity ?? 1,
        backBgOpacity: backParams.backgroundOpacity ?? 1,
        frontBgFit: frontParams.backgroundFit ?? "cover",
        backBgFit: backParams.backgroundFit ?? "cover",
        previewFront: frontThumb || undefined,
        previewBack: backThumb || undefined,
      };

      const res = await fetch("/api/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.design) {
        // Also persist locally as active draft
        try {
          localStorage.setItem("it_last_saved_design", JSON.stringify(data.design));
        } catch {}

        setIsSaved(true);
        setTimeout(() => {
          onSaveSuccess(data.design);
          onClose();
        }, 900);
      } else {
        throw new Error(data.error || "Failed to save design");
      }
    } catch (err) {
      console.error("Save design error:", err);
      alert("Could not save design to cloud. Please check your network connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const isHoriz = orientation === "horizontal";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col font-sans">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] to-white border-b border-[#E5E0D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#FAF6EE] border border-[#EAD5B3] flex items-center justify-center shadow-2xs">
              <FolderHeart className="w-5 h-5 text-[#A9782B]" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                Save Design
                <span className="text-[10px] font-bold text-[#734D15] bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-[#EAD5B3]">
                  CLOUD BACKUP
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Saves two-sided typography, substrate finishes, and vector elements.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Design Name Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Design Title / Project Name
            </label>
            <input
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="e.g. Mahi Kapoor • 24K Gold Stamped Executive Card"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-sm font-semibold text-slate-900 transition outline-none bg-slate-50/50"
            />
          </div>

          {/* Substrate & Finish Specs Pill Strip */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-slate-700 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#A9782B]" />
              {substrateTitle}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-slate-700 font-bold">
              {orientation === "horizontal" ? "Landscape 3.5\"×2.0\"" : "Portrait 2.0\"×3.5\""}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-slate-700 font-bold">
              {cornerStyle === "rounded" ? "3mm Round Corners" : "Square Corners"}
            </span>
            {gildedEdge && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#A9782B]" />
                24K Gilded Edge
              </span>
            )}
          </div>

          {/* Dual Face Thumbnails Showcase */}
          <div>
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Cloud Render Snapshot
            </span>
            <div className="grid grid-cols-2 gap-3">
              {/* Front Face Thumbnail */}
              <div className="border border-[#E5E0D8] rounded-2xl p-2.5 bg-[#FAF8F5] flex flex-col items-center">
                <span className="text-[10px] font-black uppercase text-slate-500 mb-1.5">
                  Side A • Front Face
                </span>
                <div
                  className={`relative w-full rounded-lg overflow-hidden border border-slate-200 shadow-xs flex items-center justify-center bg-white ${
                    isHoriz ? "aspect-[1.75/1]" : "aspect-[1/1.75] max-h-36"
                  }`}
                >
                  {isGeneratingThumbs ? (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A9782B]" />
                      <span>Rendering...</span>
                    </div>
                  ) : frontThumb ? (
                    <img
                      src={frontThumb}
                      alt="Front Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400">Front Canvas</span>
                  )}
                </div>
              </div>

              {/* Back Face Thumbnail */}
              <div className="border border-[#E5E0D8] rounded-2xl p-2.5 bg-[#FAF8F5] flex flex-col items-center">
                <span className="text-[10px] font-black uppercase text-slate-500 mb-1.5">
                  Side B • Back Face
                </span>
                <div
                  className={`relative w-full rounded-lg overflow-hidden border border-slate-200 shadow-xs flex items-center justify-center bg-white ${
                    isHoriz ? "aspect-[1.75/1]" : "aspect-[1/1.75] max-h-36"
                  }`}
                >
                  {isGeneratingThumbs ? (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A9782B]" />
                      <span>Rendering...</span>
                    </div>
                  ) : backThumb ? (
                    <img
                      src={backThumb}
                      alt="Back Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400">Back Canvas</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Overwrite or Save as Copy toggle if editing existing */}
          {existingDesignId && (
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={saveAsCopy}
                onChange={(e) => setSaveAsCopy(e.target.checked)}
                className="w-4 h-4 text-[#A9782B] rounded border-slate-300 focus:ring-[#A9782B]"
              />
              <span>Save as a new separate copy (keep existing version intact)</span>
            </label>
          )}

          {/* Quality Guarantee Note */}
          <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#EAD5B3] flex items-center gap-2.5 text-xs text-[#734D15]">
            <ShieldCheck className="w-4 h-4 text-[#A9782B] shrink-0" />
            <span>
              All fonts, vector lines, QR codes, and 600+ DPI assets are preserved without loss of clarity.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-[#E5E0D8] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isSaved || !designName.trim()}
            className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] transition shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Saving to Cloud...</span>
              </>
            ) : isSaved ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Saved to Library!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-white" />
                <span>Save Design</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
