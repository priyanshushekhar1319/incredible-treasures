"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FolderHeart,
  Edit3,
  Trash2,
  Download,
  ShoppingBag,
  Sparkles,
  Layers,
  Calendar,
  Loader2,
  RefreshCw,
  Search,
  ExternalLink,
  Plus,
} from "lucide-react";
import { SavedDesignItem, getCustomerSession, getSessionId } from "@/lib/customerSession";
import { ALL_PRODUCTS } from "@/data/products";
import { generate300DpiPdf } from "./printExportEngine";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoadDesign: (design: SavedDesignItem) => void;
  onAddToCartFromSaved?: (design: SavedDesignItem) => void;
}

export const SavedDesignsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLoadDesign,
  onAddToCartFromSaved,
}) => {
  const [designs, setDesigns] = useState<SavedDesignItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSideView, setActiveSideView] = useState<Record<string, "front" | "back">>({});
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const user = getCustomerSession();
      const sessionId = getSessionId();

      let url = "/api/designs";
      if (user?.id) {
        url += `?userId=${encodeURIComponent(user.id)}`;
      } else if (user?.email) {
        url += `?email=${encodeURIComponent(user.email)}`;
      } else if (sessionId) {
        url += `?sessionId=${encodeURIComponent(sessionId)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.success && Array.isArray(data.designs)) {
        setDesigns(data.designs);
      }
    } catch (err) {
      console.error("Failed to load saved designs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDesigns();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredDesigns = designs.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSide = (id: string, side: "front" | "back") => {
    setActiveSideView((prev) => ({ ...prev, [id]: side }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this saved design?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/designs?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDesigns((prev) => prev.filter((d) => d.id !== id));
      } else {
        alert(data.error || "Failed to delete design");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadPdf = async (d: SavedDesignItem) => {
    setExportingId(d.id);
    try {
      const prod = ALL_PRODUCTS.find((p) => p.id === d.substrateId);
      const frontParams = {
        elements: d.frontElements || [],
        side: "front" as const,
        orientation: d.orientation || "horizontal",
        backgroundColor: d.backgroundColor || "#FFFFFF",
        backgroundImage: d.frontBgImage || undefined,
        backgroundOpacity: d.frontBgOpacity ?? 1,
        backgroundFit: d.frontBgFit ?? "cover",
        gildedEdge: d.gildedEdge,
        cardTexture: (d.cardTexture as any) || "smooth",
      };

      const backParams = {
        elements: d.backElements || [],
        side: "back" as const,
        orientation: d.orientation || "horizontal",
        backgroundColor: d.backgroundColor || "#FFFFFF",
        backgroundImage: d.backBgImage || undefined,
        backgroundOpacity: d.backBgOpacity ?? 1,
        backgroundFit: d.backBgFit ?? "cover",
        gildedEdge: d.gildedEdge,
        cardTexture: (d.cardTexture as any) || "smooth",
      };

      await generate300DpiPdf(frontParams, backParams, {
        orientation: d.orientation || "horizontal",
        targetDpi: 600,
        includeBleed: true,
        includePrinterMarks: true,
        jobTitle: d.name,
        orderNumber: `SAVED-${d.id.slice(-6).toUpperCase()}`,
        substrateTitle: prod?.title || "Luxury Visiting Card",
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF export. Please try opening in Studio first.");
    } finally {
      setExportingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col font-sans overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] to-white border-b border-[#E5E0D8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF6EE] border border-[#EAD5B3] flex items-center justify-center shadow-2xs">
              <FolderHeart className="w-5 h-5 text-[#A9782B]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                My Saved Designs Library
                <span className="text-xs font-bold text-[#734D15] bg-[#FAF6EE] px-2.5 py-0.5 rounded-full border border-[#EAD5B3]">
                  {designs.length} {designs.length === 1 ? "Design" : "Designs"}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                1-Click restore to Studio, re-order, or export 600+ DPI press proofs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchDesigns}
              disabled={loading}
              title="Refresh Designs"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#A9782B]" : ""}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Omnibar */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E5E0D8] flex items-center gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or executive..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-medium text-slate-800 bg-white outline-none"
            />
          </div>
        </div>

        {/* Designs Gallery Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#A9782B] mb-3" />
              <p className="text-sm font-bold text-slate-700">Loading your saved designs from cloud...</p>
              <p className="text-xs text-slate-400 mt-1">Retrieving vector elements, layouts, and print settings</p>
            </div>
          ) : filteredDesigns.length === 0 ? (
            <div className="py-16 text-center max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-[#FAF6EE] border border-[#EAD5B3] flex items-center justify-center mx-auto mb-4 text-[#A9782B]">
                <FolderHeart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-black text-slate-800 mb-1">No Saved Designs Found</h4>
              <p className="text-xs text-slate-500 mb-5">
                {searchQuery
                  ? `No designs matching "${searchQuery}". Try clearing search.`
                  : "You haven't saved any visiting card designs yet. Start tailoring your card and click 'Save Design' in the studio toolbar."}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#A9782B] hover:bg-[#8E621E] transition shadow-sm cursor-pointer"
              >
                Continue in Studio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDesigns.map((d) => {
                const prod = ALL_PRODUCTS.find((p) => p.id === d.substrateId);
                const currentSide = activeSideView[d.id] || "front";
                const isHoriz = d.orientation === "horizontal";
                const thumb = currentSide === "front" ? d.previewFront : d.previewBack;
                const formattedDate = new Date(d.updatedAt || d.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={d.id}
                    className="bg-white rounded-2xl border border-[#E5E0D8] hover:border-[#A9782B]/60 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Bar: Title & Substrate Badge */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div>
                          <h4 className="text-sm font-black text-slate-900 group-hover:text-[#A9782B] transition tracking-tight">
                            {d.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {formattedDate}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                              {isHoriz ? "3.5\"×2.0\" Landscape" : "2.0\"×3.5\" Portrait"}
                            </span>
                          </div>
                        </div>

                        <span className="shrink-0 px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-[#EAD5B3] text-[11px] font-bold text-[#734D15] flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#A9782B]" />
                          <span className="truncate max-w-[110px]">
                            {prod?.title.replace("Visiting Card", "") || "Luxury Card"}
                          </span>
                        </span>
                      </div>

                      {/* Visual Preview Container */}
                      <div className="relative my-3 rounded-xl overflow-hidden border border-slate-200 bg-[#FAF8F5] flex items-center justify-center group/card">
                        <div
                          className={`w-full flex items-center justify-center p-2 transition-all ${
                            isHoriz ? "aspect-[1.75/1]" : "aspect-[1/1.75] max-h-48"
                          }`}
                        >
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={d.name}
                              className="w-full h-full object-cover rounded-md shadow-xs"
                            />
                          ) : (
                            <div
                              className="w-full h-full rounded-md shadow-inner flex flex-col items-center justify-center p-4 border border-slate-300"
                              style={{ backgroundColor: d.backgroundColor || "#FFFFFF" }}
                            >
                              <Sparkles className="w-6 h-6 text-[#A9782B] mb-1" />
                              <span className="text-xs font-bold text-slate-700">
                                {d.name}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                                {currentSide === "front" ? "Side A • Front" : "Side B • Back"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Front / Back Toggle Buttons Floating on Preview */}
                        <div className="absolute bottom-2 left-2 flex items-center rounded-lg bg-black/60 backdrop-blur-md p-0.5 border border-white/20">
                          <button
                            type="button"
                            onClick={() => toggleSide(d.id, "front")}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                              currentSide === "front"
                                ? "bg-white text-slate-900 shadow-xs"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            Front
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleSide(d.id, "back")}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                              currentSide === "back"
                                ? "bg-white text-slate-900 shadow-xs"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            Back
                          </button>
                        </div>

                        {d.gildedEdge && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[9px] font-black tracking-wide uppercase shadow-xs flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            Gilded
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* 1-Click Open in Studio */}
                        <button
                          type="button"
                          onClick={() => {
                            onLoadDesign(d);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-xl font-black text-xs text-white bg-[#A9782B] hover:bg-[#8E621E] transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                          title="Open this saved card in Canva Studio for live editing"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Open in Studio</span>
                        </button>

                        {/* Direct Re-Order CTA */}
                        {onAddToCartFromSaved && (
                          <button
                            type="button"
                            onClick={() => onAddToCartFromSaved(d)}
                            className="px-2.5 py-1.5 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1 cursor-pointer"
                            title="1-Click Re-Order this design"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-slate-600" />
                            <span>Re-Order</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {/* 600+ DPI Vector PDF Download */}
                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(d)}
                          disabled={exportingId === d.id}
                          className="p-1.5 rounded-xl text-slate-500 hover:text-[#A9782B] hover:bg-[#FAF6EE] transition cursor-pointer"
                          title="Download 600+ DPI Production PDF"
                        >
                          {exportingId === d.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#A9782B]" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>

                        {/* Delete Design */}
                        <button
                          type="button"
                          onClick={() => handleDelete(d.id)}
                          disabled={deletingId === d.id}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          title="Delete saved design"
                        >
                          {deletingId === d.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-slate-500">
          <span>
            Designs are encrypted and saved securely with all 600+ DPI print coordinates.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
