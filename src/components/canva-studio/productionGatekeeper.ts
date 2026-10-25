import { CanvasElement } from "./types";
import { calculateImageDpi } from "./dpiUtils";

export interface ProductionDefect {
  id: string;
  category: "resolution" | "blade-margin" | "inspection" | "content";
  severity: "critical-blocking" | "advisory";
  title: string;
  errorMessage: string;
  elementId?: string;
  elementLabel?: string;
  side?: "front" | "back";
  currentValue?: string;
  requiredValue?: string;
  fixType: "upscale-image" | "nudge-safe-zone" | "switch-side" | "edit-text";
}

export interface ProductionGateResult {
  canPrint: boolean;
  criticalErrorsCount: number;
  advisoriesCount: number;
  defects: ProductionDefect[];
  summaryMessage: string;
}

/**
 * STRICT COMMERCIAL PRODUCTION PRE-FLIGHT GATEKEEPER
 * Checks every rule. If ANY critical defect exists, canPrint is FALSE
 * and printing/ordering is completely locked.
 */
export function validateProductionReadiness(
  frontElements: CanvasElement[],
  backElements: CanvasElement[],
  orientation: "horizontal" | "vertical",
  hasInspectedBackSide: boolean
): ProductionGateResult {
  const defects: ProductionDefect[] = [];

  // ---------------------------------------------------------------
  // GATE 1: 600+ DPI RESOLUTION CHECK (Strict Client Rule)
  // ---------------------------------------------------------------
  const allElements = [
    ...frontElements.map((el) => ({ ...el, side: "front" as const })),
    ...backElements.map((el) => ({ ...el, side: "back" as const })),
  ];

  const imageElements = allElements.filter((el) => el.type === "image");
  imageElements.forEach((img, idx) => {
    const dpiCalc = calculateImageDpi(img, orientation);
    if (dpiCalc.dpi < 600) {
      defects.push({
        id: `dpi-${img.id || idx}`,
        category: "resolution",
        severity: "critical-blocking",
        title: `Low Resolution Logo on Side ${img.side.toUpperCase()}`,
        errorMessage: `"${img.fileName || "Uploaded Logo"}" is only ${dpiCalc.dpi} DPI. Bangalore offset press strictly requires 600+ DPI to prevent blurry/pixelated prints.`,
        elementId: img.id,
        elementLabel: img.fileName || "Logo Image",
        side: img.side,
        currentValue: `${dpiCalc.dpi} DPI`,
        requiredValue: "600+ DPI",
        fixType: "upscale-image",
      });
    }
  });

  // ---------------------------------------------------------------
  // GATE 2: MECHANICAL CUTTING BLADE SAFE ZONE CHECK (2mm Margin)
  // ---------------------------------------------------------------
  // Safe zone bounds: 7% to 93% on X, 7% to 93% on Y
  allElements.forEach((el, idx) => {
    if (el.hidden) return; // ignore hidden elements
    // Exclude full card decorative border frames and dividers from cutting blade alarms
    if (el.type === "shape" && (el.shapeKind === "frame" || el.shapeKind === "rectangle")) return;
    if (el.type === "shape" && (el.shapeKind === "divider-h" || el.shapeKind === "divider-v")) return;

    const isOutsideSafe = el.x < 7 || el.x > 93 || el.y < 7 || el.y > 93;

    if (isOutsideSafe) {
      const label =
        el.type === "text"
          ? `"${el.text?.substring(0, 20)}..."`
          : el.type === "qr"
          ? "QR Code"
          : el.type === "image"
          ? `Logo (${el.fileName || "Image"})`
          : el.type === "shape"
          ? `Shape (${el.shapeKind})`
          : "Icon";

      defects.push({
        id: `blade-${el.id || idx}`,
        category: "blade-margin",
        severity: "critical-blocking",
        title: `Element Dangerously Close to Cutting Blade (Side ${el.side.toUpperCase()})`,
        errorMessage: `${label} is placed inside the 2mm mechanical trim zone. When the industrial hydraulic cutter cuts the cards, this element will be sliced off!`,
        elementId: el.id,
        elementLabel: label,
        side: el.side,
        currentValue: `Position X:${Math.round(el.x)}%, Y:${Math.round(el.y)}%`,
        requiredValue: "Inside 7%–93% Safe Line",
        fixType: "nudge-safe-zone",
      });
    }
  });

  // ---------------------------------------------------------------
  // GATE 3: DUAL-SIDE INSPECTION VERIFICATION
  // ---------------------------------------------------------------
  if (!hasInspectedBackSide && backElements.length > 0) {
    defects.push({
      id: "inspect-back-face",
      category: "inspection",
      severity: "critical-blocking",
      title: "Back Face (Side B) Has Not Been Reviewed",
      errorMessage: `Your card has ${backElements.length} elements on Side B (Back Face), but you have not inspected it yet. You must switch to Side B or view 3D turnaround before printing.`,
      side: "back",
      currentValue: "Only Side A viewed",
      requiredValue: "Both sides inspected",
      fixType: "switch-side",
    });
  }

  // ---------------------------------------------------------------
  // GATE 4: UNEDITED DEFAULT PLACEHOLDER TEXT CHECK
  // ---------------------------------------------------------------
  const placeholderPhrases = ["YOUR NAME", "MANAGING DIRECTOR", "NAME SURNAME"];
  allElements.forEach((el, idx) => {
    if (el.type === "text" && el.text) {
      const upper = el.text.trim().toUpperCase();
      if (placeholderPhrases.includes(upper)) {
        defects.push({
          id: `content-${el.id || idx}`,
          category: "content",
          severity: "critical-blocking",
          title: `Default Placeholder Text Found on Side ${el.side.toUpperCase()}`,
          errorMessage: `Your card still has the default template text "${el.text}". Please replace it with your real name or designation before sending to print.`,
          elementId: el.id,
          elementLabel: el.text,
          side: el.side,
          currentValue: el.text,
          requiredValue: "Real Client Data",
          fixType: "edit-text",
        });
      }
    }
  });

  const criticalErrors = defects.filter((d) => d.severity === "critical-blocking");
  const advisories = defects.filter((d) => d.severity === "advisory");
  const canPrint = criticalErrors.length === 0;

  let summaryMessage = "✓ 100% Production Ready: All 4 Quality Gates Passed";
  if (!canPrint) {
    summaryMessage = `🚨 BLOCKED FOR PRINTING: ${criticalErrors.length} critical defect(s) must be fixed first`;
  }

  return {
    canPrint,
    criticalErrorsCount: criticalErrors.length,
    advisoriesCount: advisories.length,
    defects,
    summaryMessage,
  };
}
