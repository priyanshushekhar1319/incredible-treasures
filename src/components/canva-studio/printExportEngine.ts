import jsPDF from "jspdf";
import QRCode from "qrcode";
import { CanvasElement, CardTexture, ProFinish } from "./types";

export interface ExportOptions {
  orientation: "horizontal" | "vertical";
  includeBleed?: boolean; // Adds 0.125" (3.175mm) mechanical blade bleed on each side
  includePrinterMarks?: boolean; // Adds corner crop ticks & color registration marks
  targetDpi?: 150 | 300 | 600 | number; // Resolution DPI (or lightweight 100-150 for thumbnail)
  jobTitle?: string;
  orderNumber?: string;
  substrateTitle?: string;
}

export interface RenderFaceParams {
  elements: CanvasElement[];
  side: "front" | "back";
  orientation: "horizontal" | "vertical";
  backgroundColor: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
  backgroundFit?: "cover" | "contain" | "repeat";
  cardTexture?: CardTexture;
  gildedEdge?: boolean;
  options?: ExportOptions;
}

// -------------------------------------------------------------
// SVG Icons for Canvas Rendering
// -------------------------------------------------------------
const ICON_SVG_PATHS: Record<string, string> = {
  phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
  whatsapp: `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`,
  mail: `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  "map-pin": `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`,
  linkedin: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>`,
  instagram: `<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>`,
  twitter: `<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>`,
  crown: `<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/>`,
  diamond: `<path d="M6 3h12l4 6-10 12L2 9l4-6z"/>`,
  award: `<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>`,
  star: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
  "shield-check": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  sparkles: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>`,
  briefcase: `<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  building: `<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/>`,
  "trending-up": `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
  "credit-card": `<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`,
  percent: `<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>`,
  "user-check": `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>`,
  stethoscope: `<path d="M4.5 3v5a5.5 5.5 0 0 0 11 0V3"/><path d="M8 19v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"/><circle cx="10" cy="3" r="1"/><circle cx="14" cy="3" r="1"/><circle cx="12" cy="17" r="3"/>`,
  "heart-pulse": `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>`,
  "plus-circle": `<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/>`,
  activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
};

/**
 * Loads an image from a URL or DataURL safely
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Converts an SVG string into a drawable HTMLImageElement
 */
function svgToImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to parse SVG into image"));
    };
    img.src = url;
  });
}

/**
 * Creates metallic gradients for Foil / Spot UV finishes
 */
function createFinishGradient(
  ctx: CanvasRenderingContext2D,
  finish: ProFinish,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  defaultColor: string
): string | CanvasGradient {
  if (finish === "gold-foil") {
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, "#D4AF37");
    grad.addColorStop(0.25, "#FFF2B2");
    grad.addColorStop(0.5, "#B8860B");
    grad.addColorStop(0.75, "#FFDF73");
    grad.addColorStop(1, "#A9782B");
    return grad;
  }
  if (finish === "silver-foil") {
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, "#94A3B8");
    grad.addColorStop(0.3, "#F8FAFC");
    grad.addColorStop(0.6, "#64748B");
    grad.addColorStop(1, "#CBD5E1");
    return grad;
  }
  if (finish === "rose-gold-foil") {
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, "#E0A899");
    grad.addColorStop(0.4, "#FFE4DE");
    grad.addColorStop(0.7, "#B76E79");
    grad.addColorStop(1, "#F4C2C2");
    return grad;
  }
  return defaultColor;
}

/**
 * Main 300 DPI Offscreen Headless Canvas Renderer
 */
export async function renderCardFaceToCanvas(params: RenderFaceParams): Promise<HTMLCanvasElement> {
  const {
    elements,
    side,
    orientation,
    backgroundColor,
    backgroundImage,
    backgroundOpacity = 1,
    backgroundFit = "cover",
    gildedEdge = false,
    options = { orientation: "horizontal" },
  } = params;

  const dpi = options.targetDpi || 600;
  const includeBleed = options.includeBleed !== false; // Default true: includes 0.125" bleed
  const includePrinterMarks = options.includePrinterMarks === true;

  // Base Physical Dimensions in Inches:
  // Standard Visiting Card: 3.5" x 2.0" (or 2.0" x 3.5" in portrait)
  const isHoriz = orientation === "horizontal";
  const trimWidthIn = isHoriz ? 3.5 : 2.0;
  const trimHeightIn = isHoriz ? 2.0 : 3.5;
  const bleedIn = includeBleed ? 0.125 : 0; // 1/8 inch
  const slugIn = includePrinterMarks ? 0.25 : 0; // Outer margin for printer ticks

  const totalWidthIn = trimWidthIn + (bleedIn * 2) + (slugIn * 2);
  const totalHeightIn = trimHeightIn + (bleedIn * 2) + (slugIn * 2);

  // Pixel Dimensions at Target DPI
  const canvasWidth = Math.round(totalWidthIn * dpi);
  const canvasHeight = Math.round(totalHeightIn * dpi);

  const trimWidthPx = Math.round(trimWidthIn * dpi);
  const trimHeightPx = Math.round(trimHeightIn * dpi);
  const bleedPx = Math.round(bleedIn * dpi);
  const slugPx = Math.round(slugIn * dpi);

  // The origin of the Trim Box inside the canvas
  const trimOriginX = slugPx + bleedPx;
  const trimOriginY = slugPx + bleedPx;

  // The origin and dimensions of the Bleed Box
  const bleedOriginX = slugPx;
  const bleedOriginY = slugPx;
  const bleedWidthPx = trimWidthPx + (bleedPx * 2);
  const bleedHeightPx = trimHeightPx + (bleedPx * 2);

  // Create high-resolution offscreen canvas
  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not acquire 2D canvas context for 300 DPI export");

  // Fill outer slug/printer background with clean press-sheet white
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 1. Fill Card Base Background (Spans across the entire Bleed Box)
  ctx.fillStyle = backgroundColor || "#FFFFFF";
  ctx.fillRect(bleedOriginX, bleedOriginY, bleedWidthPx, bleedHeightPx);

  // 2. Custom Background Image Layer (Cover, Contain, or Repeat)
  if (backgroundImage) {
    try {
      const bgImg = await loadImage(backgroundImage);
      ctx.save();
      ctx.globalAlpha = backgroundOpacity;

      // Clip to bleed bounds
      ctx.beginPath();
      ctx.rect(bleedOriginX, bleedOriginY, bleedWidthPx, bleedHeightPx);
      ctx.clip();

      if (backgroundFit === "repeat") {
        const pattern = ctx.createPattern(bgImg, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(bleedOriginX, bleedOriginY, bleedWidthPx, bleedHeightPx);
        }
      } else if (backgroundFit === "contain") {
        const scale = Math.min(bleedWidthPx / bgImg.naturalWidth, bleedHeightPx / bgImg.naturalHeight);
        const nw = bgImg.naturalWidth * scale;
        const nh = bgImg.naturalHeight * scale;
        const nx = bleedOriginX + (bleedWidthPx - nw) / 2;
        const ny = bleedOriginY + (bleedHeightPx - nh) / 2;
        ctx.drawImage(bgImg, nx, ny, nw, nh);
      } else {
        // "cover" mode
        const scale = Math.max(bleedWidthPx / bgImg.naturalWidth, bleedHeightPx / bgImg.naturalHeight);
        const nw = bgImg.naturalWidth * scale;
        const nh = bgImg.naturalHeight * scale;
        const nx = bleedOriginX + (bleedWidthPx - nw) / 2;
        const ny = bleedOriginY + (bleedHeightPx - nh) / 2;
        ctx.drawImage(bgImg, nx, ny, nw, nh);
      }

      ctx.restore();
    } catch (err) {
      console.warn("Background image failed to render on 300 DPI canvas:", err);
    }
  }

  // 3. Gilded 24K Gold Edge Border (Inset border along trim line)
  if (gildedEdge) {
    ctx.save();
    const goldGrad = ctx.createLinearGradient(
      trimOriginX,
      trimOriginY,
      trimOriginX + trimWidthPx,
      trimOriginY + trimHeightPx
    );
    goldGrad.addColorStop(0, "#D4AF37");
    goldGrad.addColorStop(0.3, "#FFF2B2");
    goldGrad.addColorStop(0.7, "#A9782B");
    goldGrad.addColorStop(1, "#E5C158");
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = Math.max(3, Math.round(dpi * 0.015)); // ~4.5px at 300 DPI
    ctx.strokeRect(trimOriginX + 2, trimOriginY + 2, trimWidthPx - 4, trimHeightPx - 4);
    ctx.restore();
  }

  // 4. Render All Drag-and-Drop Elements
  // Scale factor: Standard preview card width in CSS is approx 560px.
  // We calibrate elements relative to trimWidthPx / 560
  const previewBaseWidth = 560;
  const scaleRatio = trimWidthPx / previewBaseWidth;

  // Filter elements belonging to this side and not hidden
  const activeElements = elements.filter((el) => el.side === side && !el.hidden);

  for (const el of activeElements) {
    ctx.save();

    // Position in canvas coordinates relative to Trim Box:
    const posX = trimOriginX + (el.x / 100) * trimWidthPx;
    const posY = trimOriginY + (el.y / 100) * trimHeightPx;

    ctx.translate(posX, posY);
    if (el.rotation) {
      ctx.rotate((el.rotation * Math.PI) / 180);
    }

    // -------------------------------------------------------------
    // Type A: TEXT ELEMENT
    // -------------------------------------------------------------
    if (el.type === "text" && el.text) {
      const rawSize = el.fontSize || 14;
      const scaledFontSize = Math.round(rawSize * scaleRatio);
      const fontFam = el.fontFamily || "'Cinzel', serif";
      const weight = el.fontWeight === "bold" || el.fontWeight === "800" ? "bold" : "normal";
      const style = el.fontStyle === "italic" ? "italic" : "normal";

      ctx.font = `${style} ${weight} ${scaledFontSize}px ${fontFam}, sans-serif`;
      ctx.textAlign = (el.textAlign as CanvasTextAlign) || "center";
      ctx.textBaseline = "middle";

      const displayText = el.textTransform === "uppercase" ? el.text.toUpperCase() : el.text;
      const baseColor = el.color || "#0F172A";

      // Finish Gradients / Foils
      const finish = el.proFinish || "standard";
      if (finish !== "standard") {
        const textMetrics = ctx.measureText(displayText);
        const textWidth = textMetrics.width;
        ctx.fillStyle = createFinishGradient(
          ctx,
          finish,
          -textWidth / 2,
          -scaledFontSize / 2,
          textWidth / 2,
          scaledFontSize / 2,
          baseColor
        );
      } else {
        ctx.fillStyle = baseColor;
      }

      // Selective finish shadows
      if (finish === "gold-foil") {
        ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        ctx.shadowBlur = Math.round(dpi * 0.01);
      } else if (finish === "spot-uv") {
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = Math.round(dpi * 0.008);
        ctx.shadowOffsetY = Math.round(dpi * 0.004);
      }

      ctx.fillText(displayText, 0, 0);

      // Text Decoration: Underline
      if (el.textDecoration === "underline") {
        const metrics = ctx.measureText(displayText);
        const w = metrics.width;
        let startX = -w / 2;
        if (el.textAlign === "left") startX = 0;
        if (el.textAlign === "right") startX = -w;
        const lineY = scaledFontSize * 0.55;
        ctx.lineWidth = Math.max(1, Math.round(scaledFontSize * 0.06));
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.moveTo(startX, lineY);
        ctx.lineTo(startX + w, lineY);
        ctx.stroke();
      }
    }

    // -------------------------------------------------------------
    // Type B: SHAPE ELEMENT
    // -------------------------------------------------------------
    if (el.type === "shape") {
      ctx.globalAlpha = el.opacity ?? 1;
      const finish = el.proFinish || "standard";
      const strokeCol = el.strokeColor || "#A9782B";
      const strokeW = Math.max(1, Math.round((el.strokeWidth || 1.5) * scaleRatio));

      // Divider Horizontal
      if (el.shapeKind === "divider-h") {
        const shapeW = Math.round(((el.width || 60) / 100) * trimWidthPx);
        ctx.lineWidth = strokeW;
        ctx.strokeStyle = createFinishGradient(ctx, finish, -shapeW / 2, 0, shapeW / 2, 0, strokeCol);
        if (el.strokeStyle === "dashed") ctx.setLineDash([8, 6]);
        else if (el.strokeStyle === "dotted") ctx.setLineDash([3, 4]);

        ctx.beginPath();
        ctx.moveTo(-shapeW / 2, 0);
        ctx.lineTo(shapeW / 2, 0);
        ctx.stroke();
      }

      // Divider Vertical
      if (el.shapeKind === "divider-v") {
        const shapeH = Math.round(((el.height || 40) / 100) * trimHeightPx);
        ctx.lineWidth = strokeW;
        ctx.strokeStyle = createFinishGradient(ctx, finish, 0, -shapeH / 2, 0, shapeH / 2, strokeCol);
        if (el.strokeStyle === "dashed") ctx.setLineDash([8, 6]);
        else if (el.strokeStyle === "dotted") ctx.setLineDash([3, 4]);

        ctx.beginPath();
        ctx.moveTo(0, -shapeH / 2);
        ctx.lineTo(0, shapeH / 2);
        ctx.stroke();
      }

      // Badge Pill
      if (el.shapeKind === "badge") {
        const badgeLabel = el.badgeText || "EXECUTIVE MEMBER";
        const badgeFontSize = Math.round(9 * scaleRatio);
        ctx.font = `bold ${badgeFontSize}px 'Inter', sans-serif`;
        const textW = ctx.measureText(badgeLabel).width;
        const padX = Math.round(14 * scaleRatio);
        const padY = Math.round(7 * scaleRatio);
        const bw = textW + padX * 2;
        const bh = badgeFontSize + padY * 2;
        const rad = bh / 2;

        ctx.fillStyle = el.fillColor || "#FAF6EE";
        ctx.strokeStyle = createFinishGradient(ctx, finish, -bw / 2, 0, bw / 2, 0, strokeCol);
        ctx.lineWidth = strokeW;

        // Draw rounded pill
        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, rad);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = createFinishGradient(ctx, finish, -bw / 2, 0, bw / 2, 0, strokeCol);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(badgeLabel, 0, 1);
      }

      // Inset Frame Border
      if (el.shapeKind === "frame") {
        const fw = Math.round(((el.width || 85) / 100) * trimWidthPx);
        const fh = Math.round(((el.height || 75) / 100) * trimHeightPx);
        ctx.lineWidth = strokeW;
        ctx.strokeStyle = createFinishGradient(ctx, finish, -fw / 2, 0, fw / 2, 0, strokeCol);
        ctx.strokeRect(-fw / 2, -fh / 2, fw, fh);
      }
    }

    // -------------------------------------------------------------
    // Type C: DYNAMIC QR CODE ELEMENT
    // -------------------------------------------------------------
    if (el.type === "qr") {
      let payload = "https://www.incredible-treasures.com";
      if (el.qrKind === "upi") {
        const upi = el.upiId || "brand@okhdfcbank";
        const name = encodeURIComponent(el.payeeName || "Incredible Treasures");
        payload = `upi://pay?pa=${upi}&pn=${name}&cu=INR`;
      } else if (el.qrKind === "whatsapp") {
        const cleanPhone = (el.whatsappNumber || "919945039266").replace(/[^0-9]/g, "");
        const msg = encodeURIComponent(el.whatsappMessage || "Hi, connecting via your visiting card!");
        payload = `https://wa.me/${cleanPhone}?text=${msg}`;
      } else if (el.qrKind === "vcard") {
        payload = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${el.vcardName || "Mahi Kapoor"}`,
          `ORG:${el.vcardCompany || "Incredible Treasures"}`,
          `TEL:${el.vcardPhone || "+91 99450 39266"}`,
          `EMAIL:${el.vcardEmail || "contact@incredible-treasures.com"}`,
          "END:VCARD",
        ].join("\n");
      } else if (el.urlValue) {
        payload = el.urlValue.startsWith("http") ? el.urlValue : `https://${el.urlValue}`;
      }

      const qrPixelSize = Math.round((el.qrSize || 56) * scaleRatio);
      try {
        const qrDataUrl = await QRCode.toDataURL(payload, {
          width: qrPixelSize,
          margin: 1,
          errorCorrectionLevel: "M",
          color: {
            dark: el.qrColor || "#0F172A",
            light: el.qrBgColor || "#FFFFFF",
          },
        });
        const qrImg = await loadImage(qrDataUrl);

        // Draw white backing container with subtle border
        const pad = Math.round(4 * scaleRatio);
        const containerSize = qrPixelSize + pad * 2;
        ctx.fillStyle = el.qrBgColor || "#FFFFFF";
        ctx.strokeStyle = el.qrColor || "#0F172A";
        ctx.lineWidth = Math.max(1, Math.round(1 * scaleRatio));

        ctx.beginPath();
        ctx.roundRect(-containerSize / 2, -containerSize / 2, containerSize, containerSize, Math.round(8 * scaleRatio));
        ctx.fill();
        ctx.stroke();

        ctx.drawImage(qrImg, -qrPixelSize / 2, -qrPixelSize / 2, qrPixelSize, qrPixelSize);

        // Optional QR Label
        if (el.qrLabel) {
          const labelSize = Math.round(7.5 * scaleRatio);
          ctx.font = `bold ${labelSize}px 'Inter', sans-serif`;
          ctx.fillStyle = el.qrColor || "#0F172A";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(el.qrLabel.toUpperCase(), 0, containerSize / 2 + Math.round(3 * scaleRatio));
        }
      } catch (err) {
        console.warn("Failed to render QR Code on 300 DPI canvas:", err);
      }
    }

    // -------------------------------------------------------------
    // Type D: PRO VECTOR ICON ELEMENT
    // -------------------------------------------------------------
    if (el.type === "icon") {
      const iconKey = el.iconName || "sparkles";
      const iconPath = ICON_SVG_PATHS[iconKey] || ICON_SVG_PATHS.sparkles;
      const iconSizePx = Math.round((el.iconSize || 22) * scaleRatio);
      const iconColor = el.color || "#A9782B";

      const svgMarkup = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${iconSizePx}" height="${iconSizePx}" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${iconPath}
        </svg>
      `;
      try {
        const iconImg = await svgToImage(svgMarkup);
        ctx.drawImage(iconImg, -iconSizePx / 2, -iconSizePx / 2, iconSizePx, iconSizePx);
      } catch (err) {
        console.warn("Failed to draw pro icon on 300 DPI canvas:", err);
      }
    }

    // -------------------------------------------------------------
    // Type E: IMAGE / LOGO ELEMENT
    // -------------------------------------------------------------
    if (el.type === "image" && el.imageSrc) {
      try {
        const img = await loadImage(el.imageSrc);
        const elemWidthPct = el.width || 25;
        const renderW = Math.round((elemWidthPct / 100) * trimWidthPx);
        const aspect = el.aspectRatio || img.naturalWidth / img.naturalHeight || 1;
        const renderH = Math.round(renderW / aspect);

        if (el.flipX) ctx.scale(-1, 1);
        if (el.flipY) ctx.scale(1, -1);

        ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);
      } catch (err) {
        console.warn("Failed to render image layer on 300 DPI canvas:", err);
      }
    }

    ctx.restore();
  }

  // -------------------------------------------------------------
  // 5. INDUSTRIAL PRINTER'S CROP MARKS & JOB SLUG
  // -------------------------------------------------------------
  if (includePrinterMarks) {
    ctx.save();
    ctx.strokeStyle = "#0F172A";
    ctx.lineWidth = Math.max(1, Math.round(dpi * 0.0025)); // crisp ~0.75pt line
    const tickLen = Math.round(dpi * 0.125); // 1/8" tick marks
    const offset = Math.round(dpi * 0.04); // spacing from cut edge

    // Crop Marks at Trim Box Corners
    const x1 = trimOriginX;
    const y1 = trimOriginY;
    const x2 = trimOriginX + trimWidthPx;
    const y2 = trimOriginY + trimHeightPx;

    // Top-Left Corner
    ctx.beginPath();
    ctx.moveTo(x1, y1 - offset);
    ctx.lineTo(x1, y1 - offset - tickLen);
    ctx.moveTo(x1 - offset, y1);
    ctx.lineTo(x1 - offset - tickLen, y1);
    ctx.stroke();

    // Top-Right Corner
    ctx.beginPath();
    ctx.moveTo(x2, y1 - offset);
    ctx.lineTo(x2, y1 - offset - tickLen);
    ctx.moveTo(x2 + offset, y1);
    ctx.lineTo(x2 + offset + tickLen, y1);
    ctx.stroke();

    // Bottom-Left Corner
    ctx.beginPath();
    ctx.moveTo(x1, y2 + offset);
    ctx.lineTo(x1, y2 + offset + tickLen);
    ctx.moveTo(x1 - offset, y2);
    ctx.lineTo(x1 - offset - tickLen, y2);
    ctx.stroke();

    // Bottom-Right Corner
    ctx.beginPath();
    ctx.moveTo(x2, y2 + offset);
    ctx.lineTo(x2, y2 + offset + tickLen);
    ctx.moveTo(x2 + offset, y2);
    ctx.lineTo(x2 + offset + tickLen, y2);
    ctx.stroke();

    // Technical Pre-Press Metadata Header (Job Slug)
    const headerFontSize = Math.round(dpi * 0.022); // ~6.6pt
    ctx.font = `bold ${headerFontSize}px 'Inter', sans-serif`;
    ctx.fillStyle = "#475569";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const jobSlug = `INCREDIBLE TREASURES • FACTORY JOB #${options.orderNumber || "IT-2026"} • ${
      side === "front" ? "SIDE A (FRONT)" : "SIDE B (BACK)"
    } • TRIM: ${trimWidthIn}"×${trimHeightIn}" • 300 DPI OFFSET PRODUCTION • ${new Date().toLocaleDateString()}`;
    ctx.fillText(jobSlug, x1, Math.round(dpi * 0.06));

    // Color Calibration Check Strip (CMYK + 100% K)
    const colorBarW = Math.round(dpi * 0.06);
    const colorBarH = Math.round(dpi * 0.04);
    const colors = ["#00FFFF", "#FF00FF", "#FFFF00", "#000000", "#D4AF37", "#A9782B"];
    let barX = x2 - colors.length * (colorBarW + 4);
    const barY = Math.round(dpi * 0.05);

    colors.forEach((c) => {
      ctx.fillStyle = c;
      ctx.fillRect(barX, barY, colorBarW, colorBarH);
      barX += colorBarW + 4;
    });

    ctx.restore();
  }

  return canvas;
}

/**
 * Generates and downloads the Complete 2-Page Vector PDF at 300 DPI
 */
export async function generate300DpiPdf(
  frontParams: RenderFaceParams,
  backParams: RenderFaceParams,
  options: ExportOptions
): Promise<{ pdfBlob: Blob; fileName: string }> {
  // Render Front & Back canvases at 300 DPI
  const frontCanvas = await renderCardFaceToCanvas(frontParams);
  const backCanvas = await renderCardFaceToCanvas(backParams);

  const isHoriz = options.orientation === "horizontal";
  const trimWidthIn = isHoriz ? 3.5 : 2.0;
  const trimHeightIn = isHoriz ? 2.0 : 3.5;
  const bleedIn = options.includeBleed !== false ? 0.125 : 0;
  const slugIn = options.includePrinterMarks ? 0.25 : 0;

  const pdfWidthIn = trimWidthIn + (bleedIn * 2) + (slugIn * 2);
  const pdfHeightIn = trimHeightIn + (bleedIn * 2) + (slugIn * 2);

  // Initialize jsPDF with exact physical dimensions in inches
  const doc = new jsPDF({
    orientation: isHoriz ? "landscape" : "portrait",
    unit: "in",
    format: [pdfWidthIn, pdfHeightIn],
    compress: true,
  });

  // Set Production PDF Metadata
  doc.setProperties({
    title: `Incredible Treasures - Factory Print Package (${options.orderNumber || "IT-2026"})`,
    subject: "600+ DPI Commercial Print Vector PDF with Industrial Bleed",
    author: "Incredible Treasures Luxury Print Studio, Bangalore",
    keywords: "business-cards, 600dpi, prepress, offset-print, cmyk, ultra-hd",
    creator: "Incredible Treasures Web-to-Print Engine v3.0",
  });

  // Page 1: Side A (Front)
  const frontDataUrl = frontCanvas.toDataURL("image/png", 1.0);
  doc.addImage(frontDataUrl, "PNG", 0, 0, pdfWidthIn, pdfHeightIn, undefined, "FAST");

  // Page 2: Side B (Back)
  doc.addPage([pdfWidthIn, pdfHeightIn], isHoriz ? "landscape" : "portrait");
  const backDataUrl = backCanvas.toDataURL("image/png", 1.0);
  doc.addImage(backDataUrl, "PNG", 0, 0, pdfWidthIn, pdfHeightIn, undefined, "FAST");

  const fileName = `IncredibleTreasures-PrintProof-600DPI-${options.orderNumber || "IT-2026"}.pdf`;

  // Trigger browser download
  doc.save(fileName);

  const pdfBlob = doc.output("blob");
  return { pdfBlob, fileName };
}

/**
 * Exports a high-resolution PNG file directly to customer machine
 */
export async function downloadCardFacePng(
  params: RenderFaceParams,
  fileName: string
): Promise<Blob> {
  const canvas = await renderCardFaceToCanvas(params);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas conversion to PNG blob failed"));
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        resolve(blob);
      },
      "image/png",
      1.0
    );
  });
}

/**
 * Generates a lightweight preview thumbnail DataURL for fast UI rendering in "My Saved Designs"
 */
export async function generateThumbnailDataUrl(params: RenderFaceParams): Promise<string> {
  try {
    const canvas = await renderCardFaceToCanvas({
      ...params,
      options: {
        orientation: params.orientation,
        targetDpi: 100, // Fast, lightweight thumbnail for customer gallery
        includeBleed: false,
        includePrinterMarks: false,
      },
    });
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch (err) {
    console.warn("Could not generate thumbnail data URL:", err);
    return "";
  }
}

