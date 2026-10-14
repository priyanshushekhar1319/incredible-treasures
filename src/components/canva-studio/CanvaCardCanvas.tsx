"use client";

import React, { useRef, useState, useEffect } from "react";
import { CanvasElement, ProFinish, CardTexture } from "./types";
import { generateQrSvg } from "../studio/qrUtils";
import { renderProIcon } from "./proIcons";
import {
  Copy,
  Trash2,
  Move,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Lock,
  Unlock,
  RotateCw,
} from "lucide-react";

interface Props {
  elements: CanvasElement[];
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  side: "front" | "back";
  orientation: "horizontal" | "vertical";
  cornerStyle: "square" | "rounded";
  showGuides: boolean;
  backgroundColor: string;
  zoom: number;
  is3DMode?: boolean;
  substrateId?: string;
  is3DFlipping?: boolean;
  onToggle3DFlip?: () => void;
  cardTexture?: CardTexture;
  gildedEdge?: boolean;
}

export const CanvaCardCanvas: React.FC<Props> = ({
  elements,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  selectedId,
  onSelectElement,
  side,
  orientation,
  cornerStyle,
  showGuides,
  backgroundColor,
  zoom,
  is3DMode = false,
  substrateId = "pvc-regular-glossy",
  is3DFlipping = false,
  onToggle3DFlip,
  cardTexture = "smooth",
  gildedEdge = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapLineX, setSnapLineX] = useState<boolean>(false);
  const [snapLineY, setSnapLineY] = useState<boolean>(false);
  const [isOutsideSafeZone, setIsOutsideSafeZone] = useState<boolean>(false);

  // 3D Tilt Physics State
  const [tilt, setTilt] = useState<{ x: number; y: number; sheenX: number; sheenY: number }>({
    x: 0,
    y: 0,
    sheenX: 50,
    sheenY: 50,
  });

  // Cache for QR SVGs
  const [qrSvgMap, setQrSvgMap] = useState<Record<string, string>>({});

  // Generate QR SVGs whenever QR elements change
  useEffect(() => {
    let active = true;
    const qrElements = elements.filter((el) => el.type === "qr");
    qrElements.forEach((qr) => {
      let payload = "https://www.incredible-treasures.com";
      if (qr.qrKind === "upi") {
        const upi = qr.upiId || "brand@okhdfcbank";
        const name = encodeURIComponent(qr.payeeName || "Incredible Treasures");
        payload = `upi://pay?pa=${upi}&pn=${name}&cu=INR`;
      } else if (qr.qrKind === "whatsapp") {
        const cleanPhone = (qr.whatsappNumber || "919945039266").replace(/[^0-9]/g, "");
        const msg = encodeURIComponent(qr.whatsappMessage || "Hi, connecting via your visiting card!");
        payload = `https://wa.me/${cleanPhone}?text=${msg}`;
      } else if (qr.qrKind === "vcard") {
        payload = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${qr.vcardName || "Mahi Kapoor"}`,
          `ORG:${qr.vcardCompany || "Incredible Treasures"}`,
          `TEL:${qr.vcardPhone || "+91 99450 39266"}`,
          `EMAIL:${qr.vcardEmail || "contact@incredible-treasures.com"}`,
          "END:VCARD",
        ].join("\n");
      } else if (qr.urlValue) {
        payload = qr.urlValue.startsWith("http") ? qr.urlValue : `https://${qr.urlValue}`;
      }

      generateQrSvg(payload, qr.qrColor || "#0F172A", qr.qrBgColor || "#FFFFFF").then((svg) => {
        if (active && svg) {
          setQrSvgMap((prev) => ({ ...prev, [qr.id]: svg }));
        }
      });
    });

    return () => {
      active = false;
    };
  }, [elements]);

  // Handle 3D Mouse Movement
  const handleDeskMouseMove = (e: React.MouseEvent) => {
    if (!is3DMode || draggingId || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100;

    setTilt({
      x: Math.max(-12, Math.min(12, deltaY * -8)),
      y: Math.max(-12, Math.min(12, deltaX * 8)),
      sheenX: Math.max(0, Math.min(100, sheenX)),
      sheenY: Math.max(0, Math.min(100, sheenY)),
    });
  };

  const handleDeskMouseLeave = () => {
    if (is3DMode) {
      setTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
    }
  };

  // Handle Drag Start
  const handlePointerDown = (e: React.PointerEvent, element: CanvasElement) => {
    e.stopPropagation();
    onSelectElement(element.id);

    if (element.locked) return;

    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    setDraggingId(element.id);
    setDragOffset({
      x: clickX - element.x,
      y: clickY - element.y,
    });

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Handle Dragging
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    let newX = ((e.clientX - rect.left) / rect.width) * 100 - dragOffset.x;
    let newY = ((e.clientY - rect.top) / rect.height) * 100 - dragOffset.y;

    newX = Math.max(2, Math.min(98, newX));
    newY = Math.max(2, Math.min(98, newY));

    // Magnetic Center Snapping
    if (Math.abs(newX - 50) < 2) {
      newX = 50;
      setSnapLineX(true);
    } else {
      setSnapLineX(false);
    }

    if (Math.abs(newY - 50) < 2) {
      newY = 50;
      setSnapLineY(true);
    } else {
      setSnapLineY(false);
    }

    // Safe Zone check
    const outside = newX < 7 || newX > 93 || newY < 7 || newY > 93;
    setIsOutsideSafeZone(outside);

    onUpdateElement(draggingId, {
      x: Math.round(newX * 10) / 10,
      y: Math.round(newY * 10) / 10,
    });
  };

  // Handle Drag End
  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingId) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (_) {}
      setDraggingId(null);
      setSnapLineX(false);
      setSnapLineY(false);
    }
  };

  // Deselect on empty canvas click
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === cardRef.current || (e.target as HTMLElement).id === "card-bg") {
      onSelectElement(null);
    }
  };

  // Get Substrate and Texture overlay
  const getSubstrateAndTextureOverlay = () => {
    // 1. Check Substrate Product
    if (substrateId === "pvc-brushed-silver") {
      return "bg-gradient-to-r from-slate-200/40 via-white/50 to-slate-300/40 backdrop-saturate-50";
    }
    if (substrateId === "pvc-rainbow") {
      return "bg-gradient-to-tr from-pink-200/20 via-sky-200/20 to-yellow-200/20";
    }
    if (substrateId === "pvc-transparent" || cardTexture === "frosted") {
      return "backdrop-blur-md bg-white/70";
    }

    // 2. Check Tactile Texture Overlays
    if (cardTexture === "linen") {
      return "opacity-25 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:4px_4px]";
    }
    if (cardTexture === "cotton") {
      return "opacity-20 bg-[linear-gradient(45deg,#000000_25%,transparent_25%),linear-gradient(-45deg,#000000_25%,transparent_25%)] [background-size:6px_6px]";
    }
    if (cardTexture === "brushed") {
      return "opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.1)_3px,transparent_4px)]";
    }

    return "";
  };

  // Pro Finish CSS Styling Helper
  const getProFinishStyle = (finish?: ProFinish, defaultColor?: string) => {
    if (finish === "gold-foil") {
      return {
        backgroundImage: "linear-gradient(135deg, #FFE89E 0%, #D4AF37 40%, #AA771C 80%, #F5DEB3 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))",
      };
    }
    if (finish === "silver-foil") {
      return {
        backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 30%, #94A3B8 75%, #F1F5F9 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))",
      };
    }
    if (finish === "rose-gold-foil") {
      return {
        backgroundImage: "linear-gradient(135deg, #FFE4E6 0%, #FDA4AF 40%, #BE185D 80%, #FECDD3 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))",
      };
    }
    if (finish === "spot-uv") {
      return {
        color: defaultColor || "#0F172A",
        textShadow: "0 1px 1px rgba(255,255,255,0.8), 0 -1px 1px rgba(0,0,0,0.4)",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
      };
    }
    return {
      color: defaultColor || "#0F172A",
    };
  };

  return (
    <div
      ref={deskRef}
      onMouseMove={handleDeskMouseMove}
      onMouseLeave={handleDeskMouseLeave}
      className="relative flex flex-col items-center justify-center p-4 sm:p-8 select-none w-full"
      style={{
        perspective: "1400px",
        backgroundImage: `
          radial-gradient(#D3CCC0 1.2px, transparent 1.2px),
          radial-gradient(#E8E3D8 1.2px, transparent 1.2px)
        `,
        backgroundSize: "28px 28px, 14px 14px",
      }}
    >
      {/* Safe Zone Alert Banner */}
      {isOutsideSafeZone && (
        <div className="mb-3 px-4 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold flex items-center gap-2 animate-pulse shadow-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Careful: Element is near blade cut edge! Keep inside the green Safe Zone.</span>
        </div>
      )}

      {/* Blueprint Scale Calibrations (Horizontal & Vertical Rulers) */}
      <div className="w-full max-w-[620px] mb-1.5 flex items-center justify-between text-[8px] font-mono font-bold text-stone-500 select-none px-2">
        <span className="flex items-center gap-1">
          <span className="text-[#A9782B]">0.0"</span> | . . . . |
        </span>
        <span>1.0" | . . . . |</span>
        <span>2.0" | . . . . |</span>
        <span>3.0" | . . . . |</span>
        <span className="flex items-center gap-1">
          | <span className="text-[#A9782B]">3.5" (Standard Cut Trim)</span>
        </span>
      </div>

      {/* Main Physical Card Canvas with 3D Flip Wrapper */}
      <div
        ref={cardRef}
        onClick={handleCanvasClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          backgroundColor,
          transform: is3DMode
            ? `scale(${zoom / 100}) rotateX(${tilt.x}deg) rotateY(${
                tilt.y + (is3DFlipping ? 180 : 0)
              }deg)`
            : `scale(${zoom / 100}) rotateY(${is3DFlipping ? 180 : 0}deg)`,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          transition: is3DFlipping
            ? "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)"
            : is3DMode && !draggingId
            ? "transform 0.1s ease-out"
            : "none",
          boxShadow: gildedEdge
            ? `0 25px 60px -15px rgba(28, 25, 23, 0.25), 0 0 0 2.5px #D4AF37, 0 0 16px rgba(212, 175, 55, 0.5)`
            : `0 25px 60px -15px rgba(28, 25, 23, 0.22), 0 10px 24px -6px rgba(28, 25, 23, 0.12)`,
        }}
        className={`relative w-full max-w-[620px] ${
          orientation === "horizontal" ? "aspect-[1.75/1]" : "aspect-[1/1.75] max-w-[350px]"
        } ${
          cornerStyle === "rounded" ? "rounded-3xl" : "rounded-sm"
        } border border-stone-300/80 overflow-hidden cursor-default relative group bg-white`}
      >
        {/* Physical 400-Micron Card Thickness Edge Emulation */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-stone-400/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.2)]" />

        {/* Gilded 24K Gold Edge Inset Border */}
        {gildedEdge && (
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] border-2 border-[#D4AF37] shadow-[inset_0_0_8px_rgba(212,175,55,0.7)] z-30" />
        )}

        {/* Background Click Layer */}
        <div id="card-bg" className="absolute inset-0 pointer-events-none" />

        {/* Substrate Texture Overlay */}
        <div className={`absolute inset-0 pointer-events-none z-5 ${getSubstrateAndTextureOverlay()}`} />

        {/* 3D Specular Sheen / Foil Gleam Reflection Overlay */}
        {is3DMode && (
          <div
            style={{
              background: `radial-gradient(circle 340px at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255,255,255,0.5) 0%, rgba(203,167,104,0.3) 30%, transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none z-35 mix-blend-overlay transition-opacity duration-200"
          />
        )}

        {/* PRINT SAFETY GUIDELINES (BLEED, TRIM & SAFE ZONE) */}
        {showGuides && (
          <div className="absolute inset-0 pointer-events-none z-40 select-none">
            {/* 1. Outer Bleed Line (Red Dashed) */}
            <div className="absolute inset-0 border border-dashed border-rose-500/80">
              <span className="absolute top-1 left-2 text-[7px] font-bold text-rose-600 uppercase tracking-widest bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-2xs border border-rose-200">
                Bleed Line (+2mm)
              </span>
            </div>

            {/* 2. Machine Cutting Trim Line (Solid Amber) */}
            <div className="absolute inset-2 border border-solid border-amber-500/90">
              <span className="absolute top-1 right-2 text-[7px] font-bold text-amber-700 uppercase tracking-widest bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-2xs border border-amber-200">
                Cut Trim (3.5" × 2.0")
              </span>
            </div>

            {/* 3. Safe Zone Box (Green Dashed) */}
            <div className="absolute inset-4 sm:inset-5 border border-dashed border-emerald-500/90 bg-emerald-500/[0.015]">
              <span className="absolute bottom-1 right-2 text-[7px] font-bold text-emerald-700 uppercase tracking-widest bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-2xs border border-emerald-200">
                ✓ Safe Zone (Keep text inside)
              </span>
            </div>
          </div>
        )}

        {/* MAGNETIC CENTER SNAP GUIDES */}
        {snapLineX && (
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-indigo-500 z-50 pointer-events-none shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        )}
        {snapLineY && (
          <div className="absolute left-0 right-0 top-1/2 h-px bg-indigo-500 z-50 pointer-events-none shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        )}

        {/* RENDER ALL DRAGGABLE ELEMENTS */}
        {elements
          .filter((el) => !el.hidden)
          .map((el) => {
            const isSelected = selectedId === el.id;

            let transformX = "-50%";
            if (el.textAlign === "left") transformX = "0%";
            if (el.textAlign === "right") transformX = "-100%";

            return (
              <div
                key={el.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement(el.id);
                }}
                onPointerDown={(e) => handlePointerDown(e, el)}
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  transform: `translate(${transformX}, -50%)`,
                  zIndex: isSelected ? 35 : 20,
                }}
                className={`absolute ${
                  el.locked ? "cursor-default" : "cursor-move"
                } pointer-events-auto transition-shadow ${
                  isSelected
                    ? "ring-2 ring-[#A9782B] ring-offset-2 ring-offset-transparent shadow-lg rounded"
                    : "hover:outline-1 hover:outline-dashed hover:outline-[#A9782B]/60"
                }`}
              >
                {/* Canva Floating Mini Action Bar above selected item */}
                {isSelected && (
                  <div
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white text-slate-800 border border-[#E5E0D8] rounded-xl px-2 py-1 shadow-xl flex items-center gap-1.5 text-xs z-50 whitespace-nowrap animate-in fade-in"
                  >
                    {el.locked ? (
                      <div className="flex items-center gap-1 px-1 text-amber-700 text-[10px] font-bold">
                        <Lock className="w-3 h-3 text-amber-600" />
                        <span>Locked</span>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onDuplicateElement(el.id)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition cursor-pointer"
                          title="Duplicate Element"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#A9782B]" />
                        </button>
                        <div className="w-px h-3 bg-slate-200" />
                        <button
                          type="button"
                          onClick={() => onDeleteElement(el.id)}
                          className="p-1 hover:bg-rose-50 rounded text-rose-600 hover:text-rose-700 transition cursor-pointer"
                          title="Delete Element"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* 1. TEXT ELEMENT WITH SELECTIVE FOIL & SPOT UV */}
                {el.type === "text" && (
                  <div
                    style={{
                      fontFamily: el.fontFamily || "'Montserrat', sans-serif",
                      fontSize: `${el.fontSize || 12}px`,
                      fontWeight: el.fontWeight || "normal",
                      fontStyle: el.fontStyle || "normal",
                      textDecoration: el.textDecoration || "none",
                      textTransform: el.textTransform || "none",
                      textAlign: el.textAlign || "left",
                      letterSpacing: `${el.letterSpacing || 0}px`,
                      lineHeight: el.lineHeight || 1.3,
                      ...getProFinishStyle(el.proFinish, el.color || "#0F172A"),
                    }}
                    className="px-1.5 py-0.5 whitespace-pre-line break-words select-none"
                  >
                    {el.text || "Double click to edit"}
                  </div>
                )}

                {/* 2. PRO VECTOR ICON ELEMENT */}
                {el.type === "icon" && (
                  <div
                    style={{
                      ...getProFinishStyle(el.proFinish, el.color || "#A9782B"),
                    }}
                    className="p-1 flex items-center justify-center select-none"
                  >
                    {renderProIcon(el.iconName || "sparkles", el.color || "#A9782B", el.iconSize || 22)}
                  </div>
                )}

                {/* 3. SHAPE ELEMENT */}
                {el.type === "shape" && (
                  <div className="p-0.5">
                    {el.shapeKind === "divider-h" && (
                      <div
                        style={{
                          width: `${(el.width || 60) * 4}px`,
                          borderTopWidth: `${el.strokeWidth || 1.5}px`,
                          borderTopStyle: el.strokeStyle || "solid",
                          borderTopColor:
                            el.proFinish === "gold-foil"
                              ? "#D4AF37"
                              : el.proFinish === "silver-foil"
                              ? "#94A3B8"
                              : el.proFinish === "rose-gold-foil"
                              ? "#FDA4AF"
                              : el.strokeColor || "#A9782B",
                          opacity: el.opacity ?? 1,
                          boxShadow:
                            el.proFinish === "gold-foil"
                              ? "0 0 6px rgba(212,175,55,0.6)"
                              : el.proFinish === "spot-uv"
                              ? "0 2px 4px rgba(0,0,0,0.2)"
                              : "none",
                        }}
                      />
                    )}

                    {el.shapeKind === "divider-v" && (
                      <div
                        style={{
                          height: `${(el.height || 40) * 3}px`,
                          borderLeftWidth: `${el.strokeWidth || 1.5}px`,
                          borderLeftStyle: el.strokeStyle || "solid",
                          borderLeftColor:
                            el.proFinish === "gold-foil"
                              ? "#D4AF37"
                              : el.proFinish === "silver-foil"
                              ? "#94A3B8"
                              : el.proFinish === "rose-gold-foil"
                              ? "#FDA4AF"
                              : el.strokeColor || "#A9782B",
                          opacity: el.opacity ?? 1,
                        }}
                      />
                    )}

                    {el.shapeKind === "badge" && (
                      <div
                        style={{
                          backgroundColor: el.fillColor || "#FAF6EE",
                          borderColor:
                            el.proFinish === "gold-foil" ? "#D4AF37" : el.strokeColor || "#A9782B",
                          borderWidth: `${el.strokeWidth || 1}px`,
                          opacity: el.opacity ?? 1,
                          ...getProFinishStyle(el.proFinish, el.strokeColor || "#A9782B"),
                        }}
                        className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-2xs whitespace-nowrap"
                      >
                        {el.badgeText || "EXECUTIVE MEMBER"}
                      </div>
                    )}

                    {el.shapeKind === "frame" && (
                      <div
                        style={{
                          width: `${(el.width || 85) * 4.5}px`,
                          height: `${(el.height || 75) * 2.5}px`,
                          borderWidth: `${el.strokeWidth || 1}px`,
                          borderStyle: el.strokeStyle || "solid",
                          borderColor:
                            el.proFinish === "gold-foil" ? "#D4AF37" : el.strokeColor || "#A9782B",
                          opacity: el.opacity ?? 0.6,
                        }}
                        className="rounded-lg pointer-events-none"
                      />
                    )}
                  </div>
                )}

                {/* 4. DYNAMIC QR CODE ELEMENT */}
                {el.type === "qr" && (
                  <div className="flex flex-col items-center group">
                    <div
                      style={{
                        width: `${el.qrSize || 56}px`,
                        height: `${el.qrSize || 56}px`,
                        backgroundColor: el.qrBgColor || "#FFFFFF",
                        borderColor: el.qrColor || "#0F172A",
                      }}
                      className="p-1 rounded-xl shadow-md border overflow-hidden flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: qrSvgMap[el.id] || "" }}
                    />
                    {el.qrLabel && (
                      <span
                        style={{ color: el.qrColor || "#0F172A" }}
                        className="mt-1 text-[7.5px] font-black uppercase tracking-tight px-1.5 py-0.2 bg-white/95 rounded shadow-2xs border border-slate-200"
                      >
                        {el.qrLabel}
                      </span>
                    )}
                  </div>
                )}

                {/* 5. IMAGE / LOGO ELEMENT */}
                {el.type === "image" && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 p-1 rounded-xl overflow-hidden bg-white/40 border border-slate-200/80 backdrop-blur-xs flex items-center justify-center shadow-xs">
                    {el.imageSrc ? (
                      <img src={el.imageSrc} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-[10px] text-slate-400">Logo</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
