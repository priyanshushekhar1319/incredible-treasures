export type ElementType = "text" | "shape" | "qr" | "image" | "icon";

export type ProFinish = "standard" | "gold-foil" | "silver-foil" | "rose-gold-foil" | "spot-uv";

export type ShapeKind = "divider-h" | "divider-v" | "rectangle" | "badge" | "circle" | "frame";

export type QrKind = "upi" | "whatsapp" | "vcard" | "url";

export interface CanvasElement {
  id: string;
  type: ElementType;
  side: "front" | "back";
  x: number; // percentage (0 - 100) from left
  y: number; // percentage (0 - 100) from top
  width?: number; // percentage of card width
  height?: number; // percentage of card height
  rotation?: number; // 0 - 360
  locked?: boolean; // Pro: lock position & deletion
  hidden?: boolean; // Pro: toggle visibility
  proFinish?: ProFinish; // Pro: Selective Foil & Spot UV finishes

  // Text attributes:
  text?: string;
  fontFamily?: string;
  fontSize?: number; // px relative to card standard preview
  fontWeight?: "normal" | "600" | "bold" | "800";
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline";
  textTransform?: "none" | "uppercase";
  textAlign?: "left" | "center" | "right";
  color?: string;
  letterSpacing?: number;
  lineHeight?: number;

  // Shape attributes:
  shapeKind?: ShapeKind;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number; // px
  strokeStyle?: "solid" | "dashed" | "dotted";
  opacity?: number;
  badgeText?: string;

  // Icon attributes:
  iconName?: string;
  iconCategory?: "contact" | "luxury" | "business" | "medical";
  iconSize?: number; // px

  // QR attributes:
  qrKind?: QrKind;
  qrPayload?: string;
  qrLabel?: string;
  qrColor?: string;
  qrBgColor?: string;
  qrSize?: number; // px
  // QR fields
  upiId?: string;
  payeeName?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  vcardName?: string;
  vcardPhone?: string;
  vcardEmail?: string;
  vcardCompany?: string;
  urlValue?: string;

  // Image attributes:
  imageSrc?: string;
  imageAlt?: string;
}

export type CardTexture = "smooth" | "linen" | "cotton" | "brushed" | "frosted";

export interface ColorHarmony {
  id: string;
  name: string;
  cardBg: string;
  primaryAccent: string;
  primaryFinish: ProFinish;
  secondaryText: string;
  previewBg: string;
}

export interface CardState {
  frontElements: CanvasElement[];
  backElements: CanvasElement[];
  backgroundColor: string;
  backgroundGradient?: string;
  cardSubstrateId: string;
  orientation: "horizontal" | "vertical";
  cornerStyle: "square" | "rounded";
  cardTexture?: CardTexture;
  gildedEdge?: boolean;
}
