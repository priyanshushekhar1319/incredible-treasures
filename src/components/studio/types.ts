export type QrType = "upi" | "whatsapp" | "vcard" | "url" | "google-review";

export type DetailPlacement = "front" | "back" | "both";

export type QrPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";

export interface QrConfig {
  enabled: boolean;
  type: QrType;
  side: DetailPlacement;
  position: QrPosition;
  size: number; // in pixels, e.g. 56
  color: string; // e.g. "#000000" or "#A9782B"
  bgColor: string; // e.g. "#FFFFFF" or "transparent"
  label: string; // e.g. "Scan to Pay", "Scan to Connect"
  showLabel: boolean;
  // Specific data fields:
  upiId: string;
  payeeName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  websiteUrl: string;
  reviewUrl: string;
}

export type ShapeType = "divider-h" | "divider-v" | "badge" | "frame" | "circle" | "accent-bar";

export interface ShapeItem {
  id: string;
  name: string;
  type: ShapeType;
  side: DetailPlacement;
  color: string;
  bgColor?: string;
  text?: string;
  thickness: number; // 1 to 8 px
  style: "solid" | "dashed" | "dotted";
  opacity: number; // 0.1 to 1.0
  widthPercent?: number; // 20 to 100
  heightPercent?: number;
  position?: "top" | "bottom" | "center" | "left" | "right";
}
