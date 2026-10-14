import { ColorHarmony, CardTexture } from "./types";

export const COLOR_HARMONIES: ColorHarmony[] = [
  {
    id: "obsidian-gold",
    name: "Royal Obsidian & 24K Gold",
    cardBg: "#0B0E14",
    primaryAccent: "#D4AF37",
    primaryFinish: "gold-foil",
    secondaryText: "#E5E7EB",
    previewBg: "from-stone-950 via-slate-900 to-amber-950",
  },
  {
    id: "champagne-ivory",
    name: "Champagne Silk & Ivory",
    cardBg: "#FAF8F5",
    primaryAccent: "#A9782B",
    primaryFinish: "gold-foil",
    secondaryText: "#334155",
    previewBg: "from-[#FAF8F5] via-[#F3ECE1] to-[#E8DCC8]",
  },
  {
    id: "midnight-platinum",
    name: "Midnight Navy & Platinum",
    cardBg: "#0B1528",
    primaryAccent: "#CBD5E1",
    primaryFinish: "silver-foil",
    secondaryText: "#E2E8F0",
    previewBg: "from-slate-950 via-sky-950 to-slate-900",
  },
  {
    id: "emerald-rosegold",
    name: "Imperial Emerald & Rose Gold",
    cardBg: "#062319",
    primaryAccent: "#FDA4AF",
    primaryFinish: "rose-gold-foil",
    secondaryText: "#F1F5F9",
    previewBg: "from-emerald-950 via-teal-950 to-stone-900",
  },
  {
    id: "burgundy-brass",
    name: "Burgundy Velvet & Antique Gold",
    cardBg: "#2A0B16",
    primaryAccent: "#E5C158",
    primaryFinish: "gold-foil",
    secondaryText: "#FCE7F3",
    previewBg: "from-rose-950 via-stone-900 to-amber-950",
  },
];

export interface TextureOption {
  id: CardTexture;
  name: string;
  badge: string;
  description: string;
}

export const TEXTURE_OPTIONS: TextureOption[] = [
  {
    id: "smooth",
    name: "Smooth Satin Finish",
    badge: "Default PVC",
    description: "Ultra-clean silk smooth surface with minimal gloss grain.",
  },
  {
    id: "linen",
    name: "Fine Linen Weave",
    badge: "Paper Craft",
    description: "Microscopic criss-cross woven fabric texture used in royal stationery.",
  },
  {
    id: "cotton",
    name: "Handmade Cotton Felt",
    badge: "600 GSM",
    description: "Natural organic rag fiber texture with soft tactile depth.",
  },
  {
    id: "brushed",
    name: "Hairline Brushed Metal",
    badge: "Metallic",
    description: "Directional brushed aluminum and platinum metallic sheen.",
  },
  {
    id: "frosted",
    name: "Frosted Acrylic Glass",
    badge: "Translucent",
    description: "Semi-translucent frosted glass effect with diffused back-lighting.",
  },
];
