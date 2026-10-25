"use client";

import React, { useEffect, useState } from "react";
import { QrConfig, ShapeItem } from "./types";
import { ContactData, buildQrPayload, generateQrSvg } from "./qrUtils";

interface Props {
  side: "front" | "back";
  qrConfig: QrConfig;
  contact: ContactData;
  shapes: ShapeItem[];
  selectedShapeId?: string | null;
  onSelectShape?: (id: string) => void;
  orientation?: "horizontal" | "vertical";
}

export const CardQrAndShapesOverlay: React.FC<Props> = ({
  side,
  qrConfig,
  contact,
  shapes,
  selectedShapeId,
  onSelectShape,
  orientation = "horizontal",
}) => {
  const [svgString, setSvgString] = useState<string>("");

  const showQr = qrConfig.enabled && (qrConfig.side === side || qrConfig.side === "both");
  const relevantShapes = shapes.filter((s) => s.side === side || s.side === "both");

  // Re-generate QR SVG whenever config, contact, or color changes
  useEffect(() => {
    let isCancelled = false;
    if (showQr) {
      const payload = buildQrPayload(qrConfig, contact);
      generateQrSvg(payload, qrConfig.color, qrConfig.bgColor).then((svg) => {
        if (!isCancelled) {
          setSvgString(svg);
        }
      });
    } else {
      setSvgString("");
    }
    return () => {
      isCancelled = true;
    };
  }, [
    showQr,
    qrConfig.type,
    qrConfig.upiId,
    qrConfig.payeeName,
    qrConfig.whatsappNumber,
    qrConfig.whatsappMessage,
    qrConfig.websiteUrl,
    qrConfig.reviewUrl,
    qrConfig.color,
    qrConfig.bgColor,
    contact.customerName,
    contact.companyName,
    contact.customerDesignation,
    contact.phone,
    contact.email,
    contact.website,
  ]);

  // Position classes for QR code
  const getPositionClass = (pos: QrConfig["position"]) => {
    switch (pos) {
      case "bottom-right":
        return "bottom-2 right-2 sm:bottom-3 sm:right-3";
      case "bottom-left":
        return "bottom-2 left-2 sm:bottom-3 sm:left-3";
      case "top-right":
        return "top-2 right-2 sm:top-3 sm:right-3";
      case "top-left":
        return "top-2 left-2 sm:top-3 sm:left-3";
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      default:
        return "bottom-2 right-2";
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      {/* 1. VECTOR SHAPE LAYERS */}
      {relevantShapes.map((shape) => {
        const isSelected = selectedShapeId === shape.id;
        const pointerEvents = onSelectShape ? "pointer-events-auto cursor-pointer" : "pointer-events-none";

        if (shape.type === "divider-h") {
          return (
            <div
              key={shape.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectShape?.(shape.id);
              }}
              style={{
                top: shape.position === "top" ? "22%" : shape.position === "bottom" ? "78%" : "50%",
                left: "10%",
                width: `${shape.widthPercent || 80}%`,
                borderTopWidth: `${shape.thickness}px`,
                borderTopStyle: shape.style,
                borderTopColor: shape.color,
                opacity: shape.opacity,
              }}
              className={`absolute transition-all ${pointerEvents} ${
                isSelected ? "ring-2 ring-emerald-500 ring-offset-1" : ""
              }`}
              title="Click to edit Horizontal Divider"
            />
          );
        }

        if (shape.type === "divider-v") {
          return (
            <div
              key={shape.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectShape?.(shape.id);
              }}
              style={{
                left: shape.position === "left" ? "25%" : shape.position === "right" ? "75%" : "50%",
                top: "15%",
                height: `${shape.heightPercent || 70}%`,
                borderLeftWidth: `${shape.thickness}px`,
                borderLeftStyle: shape.style,
                borderLeftColor: shape.color,
                opacity: shape.opacity,
              }}
              className={`absolute transition-all ${pointerEvents} ${
                isSelected ? "ring-2 ring-emerald-500 ring-offset-1" : ""
              }`}
              title="Click to edit Vertical Divider"
            />
          );
        }

        if (shape.type === "frame") {
          return (
            <div
              key={shape.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectShape?.(shape.id);
              }}
              style={{
                borderWidth: `${shape.thickness}px`,
                borderStyle: shape.style,
                borderColor: shape.color,
                opacity: shape.opacity,
              }}
              className={`absolute inset-2 sm:inset-3 rounded-lg transition-all ${pointerEvents} ${
                isSelected ? "ring-2 ring-emerald-500" : ""
              }`}
              title="Click to edit Luxury Frame"
            />
          );
        }

        if (shape.type === "badge") {
          return (
            <div
              key={shape.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectShape?.(shape.id);
              }}
              style={{
                top: shape.position === "top" ? "12%" : shape.position === "bottom" ? "82%" : "48%",
                left: shape.position === "left" ? "10%" : shape.position === "right" ? "65%" : "50%",
                transform: shape.position === "left" ? "none" : shape.position === "right" ? "none" : "translateX(-50%)",
                backgroundColor: shape.bgColor || "#faf6ee",
                borderColor: shape.color,
                borderWidth: `${shape.thickness}px`,
                borderStyle: shape.style,
                color: shape.color,
                opacity: shape.opacity,
              }}
              className={`absolute px-2.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider shadow-2xs whitespace-nowrap transition-all ${pointerEvents} ${
                isSelected ? "ring-2 ring-emerald-500" : ""
              }`}
              title="Click to edit Badge"
            >
              {shape.text || "EXECUTIVE MEMBER"}
            </div>
          );
        }

        if (shape.type === "accent-bar") {
          return (
            <div
              key={shape.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectShape?.(shape.id);
              }}
              style={{
                backgroundColor: shape.color,
                opacity: shape.opacity,
                width: `${shape.thickness * 2}px`,
              }}
              className={`absolute top-0 bottom-0 ${
                shape.position === "right" ? "right-0" : "left-0"
              } transition-all ${pointerEvents} ${isSelected ? "ring-2 ring-emerald-500" : ""}`}
              title="Click to edit Accent Bar"
            />
          );
        }

        if (shape.type === "circle") {
          return (
            <div
              key={shape.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectShape?.(shape.id);
              }}
              style={{
                borderColor: shape.color,
                borderWidth: `${shape.thickness}px`,
                borderStyle: shape.style,
                backgroundColor: shape.bgColor || "transparent",
                opacity: shape.opacity,
                width: `${(shape.widthPercent || 40) * 0.8}px`,
                height: `${(shape.widthPercent || 40) * 0.8}px`,
                top: shape.position === "top" ? "12%" : "60%",
                right: "12%",
              }}
              className={`absolute rounded-full transition-all flex items-center justify-center text-[7px] font-extrabold ${pointerEvents} ${
                isSelected ? "ring-2 ring-emerald-500" : ""
              }`}
              title="Click to edit Circle Seal"
            >
              {shape.text && <span style={{ color: shape.color }}>{shape.text}</span>}
            </div>
          );
        }

        return null;
      })}

      {/* 2. DYNAMIC LIVE QR CODE LAYER */}
      {showQr && svgString && (
        <div
          className={`absolute ${getPositionClass(
            qrConfig.position
          )} z-20 pointer-events-auto flex flex-col items-center group cursor-pointer transition-all hover:scale-105`}
          title={`Live ${qrConfig.type.toUpperCase()} QR Code • Scannable via real smartphone camera`}
        >
          <div
            className="p-1 rounded-xl shadow-md border transition-all"
            style={{
              backgroundColor: qrConfig.bgColor === "transparent" ? "#ffffff" : qrConfig.bgColor,
              borderColor: qrConfig.color === "#ffffff" ? "#e2e8f0" : qrConfig.color,
              width: `${qrConfig.size}px`,
              height: `${qrConfig.size}px`,
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
              dangerouslySetInnerHTML={{ __html: svgString }}
            />
          </div>

          {qrConfig.showLabel && qrConfig.label && (
            <div
              className="mt-0.5 text-[7px] sm:text-[7.5px] font-black tracking-tight uppercase px-1.5 py-0.2 rounded bg-white/95 backdrop-blur-xs shadow-2xs border border-slate-200/80 truncate max-w-[80px]"
              style={{ color: qrConfig.color === "#ffffff" ? "#0f172a" : qrConfig.color }}
            >
              {qrConfig.label}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
