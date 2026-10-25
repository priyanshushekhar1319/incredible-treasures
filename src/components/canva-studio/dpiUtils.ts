import { CanvasElement } from "./types";

export interface DpiCalculationResult {
  dpi: number;
  status: "ultra-crisp" | "crisp" | "acceptable" | "warning";
  label: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  physicalWidthInches: number;
  physicalHeightInches: number;
  naturalWidth: number;
  naturalHeight: number;
  megapixels: number;
  is600Plus: boolean;
}

export interface PreFlightImageItem {
  id: string;
  fileName: string;
  side: "front" | "back";
  naturalWidth: number;
  naturalHeight: number;
  megapixels: number;
  fileSizeBytes?: number;
  physicalWidthInches: number;
  physicalHeightInches: number;
  dpi: number;
  status: "ultra-crisp" | "crisp" | "acceptable" | "warning";
  is600Plus: boolean;
}

export interface PreFlightReport {
  overallStatus: "approved" | "warning" | "caution";
  totalElements: number;
  totalImages: number;
  ultraCrispImagesCount: number; // 600+ DPI
  crispImagesCount: number; // 300 - 599 DPI
  acceptableImagesCount: number; // 150 - 299 DPI
  warningImagesCount: number; // < 150 DPI
  lowestDpi: number | null;
  hasBlurRisk: boolean;
  safeZoneViolationsCount: number;
  foilsCount: number;
  images: PreFlightImageItem[];
}

/**
 * Standard Visiting Card Dimensions in Physical Inches:
 * Landscape: 3.5" wide x 2.0" high (Cut Trim)
 * Portrait:  2.0" wide x 3.5" high (Cut Trim)
 */
export const CARD_SPECS = {
  horizontal: { widthInches: 3.5, heightInches: 2.0 },
  vertical: { widthInches: 2.0, heightInches: 3.5 },
};

/**
 * Educational Guide: Vector vs Raster for Print Production
 */
export const VECTOR_VS_RASTER_GUIDE = {
  title: "Why Vector Text & Logos Never Pixelate",
  vector: {
    name: "Vector Graphics (SVG / Paths / Typography)",
    description:
      "Stored as pure mathematical curves and Bézier coordinates. Infinitely scalable with zero quality loss. Always outputs at maximum press hardware capability (1200+ to 2400 DPI).",
    elementsInStudio: "All text layers, Google Fonts, lines, divider rules, role pill badges, luxury frames, and QR codes.",
    badge: "100% Lossless Vector Sharpness",
  },
  raster: {
    name: "Raster Bitmaps (PNG / JPG / WebP)",
    description:
      "Stored as a fixed rectangular grid of colored pixels. Must meet 600+ DPI for micro-sharp luxury offset printing, or 300 DPI minimum for standard commercial printing.",
    elementsInStudio: "Uploaded logos, team photos, background wallpapers, and custom customer artwork.",
    badge: "Resolution (DPI) Dependent",
  },
};

/**
 * Calculate the effective print resolution (DPI) of a raster image on the card
 * Calibrated for client's 600+ DPI Ultra-HD Offset standard
 */
export function calculateImageDpi(
  element: CanvasElement,
  orientation: "horizontal" | "vertical" = "horizontal"
): DpiCalculationResult {
  const cardDimensions = CARD_SPECS[orientation];
  const naturalWidth = element.naturalWidth || 800; // fallback if not loaded yet
  const naturalHeight = element.naturalHeight || 600;
  const megapixels = Math.round((naturalWidth * naturalHeight) / 10000) / 100;

  // Percentage of card width occupied by this element (default 25% if not explicitly set)
  const widthPercent = element.width || 25;
  const physicalWidthInches = Math.max(0.2, (widthPercent / 100) * cardDimensions.widthInches);

  // Height based on aspect ratio
  const aspectRatio = element.aspectRatio || naturalWidth / naturalHeight || 1;
  const physicalHeightInches = physicalWidthInches / aspectRatio;

  // Exact Effective DPI formula: Intrinsic Pixels / Physical Inches
  const calculatedDpi = Math.round(naturalWidth / physicalWidthInches);

  // TIER 1: 600+ DPI (Ultra-HD Offset Press Grade - Gold Standard)
  if (calculatedDpi >= 600) {
    return {
      dpi: calculatedDpi,
      status: "ultra-crisp",
      label: `${calculatedDpi} DPI Ultra-HD Press Ready (600+)`,
      badgeColor: "text-emerald-900",
      badgeBg: "bg-gradient-to-r from-emerald-100 to-teal-50",
      badgeBorder: "border-emerald-400",
      physicalWidthInches: Math.round(physicalWidthInches * 100) / 100,
      physicalHeightInches: Math.round(physicalHeightInches * 100) / 100,
      naturalWidth,
      naturalHeight,
      megapixels,
      is600Plus: true,
    };
  }

  // TIER 2: 300 - 599 DPI (High Commercial Print Grade)
  if (calculatedDpi >= 300) {
    return {
      dpi: calculatedDpi,
      status: "crisp",
      label: `${calculatedDpi} DPI Commercial Print Grade`,
      badgeColor: "text-emerald-700",
      badgeBg: "bg-emerald-50",
      badgeBorder: "border-emerald-300",
      physicalWidthInches: Math.round(physicalWidthInches * 100) / 100,
      physicalHeightInches: Math.round(physicalHeightInches * 100) / 100,
      naturalWidth,
      naturalHeight,
      megapixels,
      is600Plus: false,
    };
  }

  // TIER 3: 150 - 299 DPI (Acceptable Digital Quick-Print)
  if (calculatedDpi >= 150) {
    return {
      dpi: calculatedDpi,
      status: "acceptable",
      label: `${calculatedDpi} DPI Acceptable Quality`,
      badgeColor: "text-amber-800",
      badgeBg: "bg-amber-50",
      badgeBorder: "border-amber-300",
      physicalWidthInches: Math.round(physicalWidthInches * 100) / 100,
      physicalHeightInches: Math.round(physicalHeightInches * 100) / 100,
      naturalWidth,
      naturalHeight,
      megapixels,
      is600Plus: false,
    };
  }

  // TIER 4: < 150 DPI (Critical Low Resolution Warning)
  return {
    dpi: calculatedDpi,
    status: "warning",
    label: `${calculatedDpi} DPI Low Resolution (Blur Risk)`,
    badgeColor: "text-rose-700",
    badgeBg: "bg-rose-50",
    badgeBorder: "border-rose-300",
    physicalWidthInches: Math.round(physicalWidthInches * 100) / 100,
    physicalHeightInches: Math.round(physicalHeightInches * 100) / 100,
    naturalWidth,
    naturalHeight,
    megapixels,
    is600Plus: false,
  };
}

/**
 * Conduct comprehensive Pre-Flight Quality Check across all elements on Front & Back
 */
export function runCardPreFlightInspection(
  frontElements: CanvasElement[],
  backElements: CanvasElement[],
  orientation: "horizontal" | "vertical" = "horizontal"
): PreFlightReport {
  const allElements = [
    ...frontElements.map((el) => ({ ...el, side: "front" as const })),
    ...backElements.map((el) => ({ ...el, side: "back" as const })),
  ];

  const imageElements = allElements.filter((el) => el.type === "image");
  const inspectedImages: PreFlightImageItem[] = [];

  let ultraCrispCount = 0;
  let crispCount = 0;
  let acceptableCount = 0;
  let warningCount = 0;
  let lowestDpi: number | null = null;

  imageElements.forEach((imgEl, idx) => {
    const calc = calculateImageDpi(imgEl, orientation);
    if (lowestDpi === null || calc.dpi < lowestDpi) {
      lowestDpi = calc.dpi;
    }

    if (calc.status === "ultra-crisp") ultraCrispCount++;
    else if (calc.status === "crisp") crispCount++;
    else if (calc.status === "acceptable") acceptableCount++;
    else if (calc.status === "warning") warningCount++;

    inspectedImages.push({
      id: imgEl.id,
      fileName: imgEl.fileName || `Uploaded_Logo_${idx + 1}.png`,
      side: imgEl.side,
      naturalWidth: calc.naturalWidth,
      naturalHeight: calc.naturalHeight,
      megapixels: calc.megapixels,
      fileSizeBytes: imgEl.fileSizeBytes,
      physicalWidthInches: calc.physicalWidthInches,
      physicalHeightInches: calc.physicalHeightInches,
      dpi: calc.dpi,
      status: calc.status,
      is600Plus: calc.is600Plus,
    });
  });

  // Check Safe Zone Violations (outside 7% to 93% padding)
  const safeZoneViolations = allElements.filter(
    (el) => el.x < 7 || el.x > 93 || el.y < 7 || el.y > 93
  ).length;

  // Count Foil / Spot UV effects
  const foilsCount = allElements.filter(
    (el) => el.proFinish && el.proFinish !== "standard"
  ).length;

  const hasBlurRisk = warningCount > 0;
  let overallStatus: PreFlightReport["overallStatus"] = "approved";
  if (hasBlurRisk) {
    overallStatus = "warning";
  } else if (acceptableCount > 0 || safeZoneViolations > 0) {
    overallStatus = "caution";
  }

  return {
    overallStatus,
    totalElements: allElements.length,
    totalImages: imageElements.length,
    ultraCrispImagesCount: ultraCrispCount,
    crispImagesCount: crispCount,
    acceptableImagesCount: acceptableCount,
    warningImagesCount: warningCount,
    lowestDpi,
    hasBlurRisk,
    safeZoneViolationsCount: safeZoneViolations,
    foilsCount,
    images: inspectedImages,
  };
}
