export interface HeroBannerItem {
  id: string;
  category: "visiting-cards" | "letterheads" | "mugs" | "labels" | "tshirts" | "festive";
  breadcrumb: string;
  badge: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  videoUrl?: string; // Optional MP4/WebM video of crackers/fireworks or banner motion
  enableCrackersEffect?: boolean; // Festive Diwali bursting firecrackers particle FX
  primaryCtaText: string;
  ctaLabel: string;
  features: string[];
  targetUrl?: string;
  isActive?: boolean;
  startDate?: string;
  expiryDate?: string;
  isFestiveCampaign?: boolean;
}

export interface AnnouncementBarConfig {
  enabled: boolean;
  message: string;
  couponCode?: string;
  badgeText?: string;
  expiryDate?: string;
  accentTheme: "gold" | "crimson" | "dark" | "emerald";
}

export const DEFAULT_ANNOUNCEMENT_CONFIG: AnnouncementBarConfig = {
  enabled: true,
  message: "Diwali Mahotsav Offer: Flat 20% Off on 500+ Luxury PVC Cards & 24K Gold Foiling",
  couponCode: "DIWALI20",
  badgeText: "FESTIVE SALE",
  expiryDate: "2026-11-20T23:59:59Z",
  accentTheme: "gold",
};

export const INITIAL_HERO_BANNERS: HeroBannerItem[] = [
  {
    id: "diwali-luxury-special",
    category: "festive",
    breadcrumb: "Diwali Luxury Gifting & 24K Gold Foil",
    badge: "FESTIVE SPECIAL • 20% OFF",
    eyebrow: "DIWALI MAHOTSAV EDITION",
    title: "Luxury 24K Gold Foil Visiting Cards",
    subtitle: "Make an unforgettable festive impression with mirror gold stamping & velvet PVC",
    description: "Command absolute authority this festive season. Crafted with genuine hot-stamped 24K gold foil on obsidian velvet and waterproof 400-micron polymer.",
    image: "/images/pvc/card_pvc-gold-metallic.png",
    primaryCtaText: "Claim 20% Off with Code DIWALI20",
    ctaLabel: "EXPLORE DIWALI FOIL",
    features: ["24K Mirror Gold Foil", "400 Micron Polymer", "48-Hour BlueDart Dispatch"],
    targetUrl: "/#visiting-cards",
    isActive: true,
    expiryDate: "2026-11-20T23:59:59Z",
    isFestiveCampaign: true,
    enableCrackersEffect: true,
  },
  {
    id: "visiting-cards",
    category: "visiting-cards",
    breadcrumb: "Custom Visiting Cards",
    badge: "400 Micron PVC",
    eyebrow: "SIGNATURE IDENTITY",
    title: "Custom Visiting Cards",
    subtitle: "Architectural 400 micron PVC, 3D raised gold foil & royal velvet finishes",
    description: "Make an unforgettable executive first impression with 400 micron waterproof PVC, 3D raised gold foil, and luxury visiting cards crafted for corporate excellence.",
    image: "/images/custom-visiting-cards-banner.jpg",
    primaryCtaText: "Shop Visiting Cards",
    ctaLabel: "SHOP NOW",
    features: ["400 Micron PVC", "3D Raised Gold Foil", "2-Day Dispatch"],
    targetUrl: "/#visiting-cards",
    isActive: true,
  },
  {
    id: "letterheads",
    category: "letterheads",
    breadcrumb: "Executive Bond Letterheads",
    badge: "100 GSM Royal Bond",
    eyebrow: "EXECUTIVE STATIONERY",
    title: "Executive Bond Letterheads",
    subtitle: "Command authority with certified corporate bond paper & matching envelopes",
    description: "Command corporate respect with 100 GSM Royal Executive Bond and 120 GSM fine cotton stationery sheets with crisp laser-sharp printing & gold foil crests.",
    image: "/images/custom-letterheads-banner.jpg",
    primaryCtaText: "Shop Letterheads",
    ctaLabel: "SHOP NOW",
    features: ["100 GSM Bond Paper", "Laser & Inkjet Safe", "Matching Envelopes"],
    targetUrl: "/#letterheads",
    isActive: true,
  },
  {
    id: "mugs",
    category: "mugs",
    breadcrumb: "Custom Ceramic Coffee Mugs",
    badge: "100% Pure Ceramic",
    eyebrow: "ARTISAN CERAMICS",
    title: "Custom Ceramic Coffee Mugs",
    subtitle: "Two-tone and executive matte black ceramic mugs with vibrant 300 DPI sublimation",
    description: "Premium two-tone, classic white, and matte black ceramic coffee mugs with vibrant 300 DPI sublimation printing. Microwave & dishwasher safe with individual gift packaging.",
    image: "/images/custom-ceramic-mugs-banner.jpg",
    primaryCtaText: "Shop Ceramic Mugs",
    ctaLabel: "SHOP NOW",
    features: ["Grade-A Ceramic (350ml)", "300 DPI Sublimation", "Individual Gift Box"],
    targetUrl: "/#mugs",
    isActive: true,
  },
  {
    id: "labels",
    category: "labels",
    breadcrumb: "Custom Stickers & Packaging Labels",
    badge: "Waterproof Vinyl",
    eyebrow: "BESPOKE PACKAGING",
    title: "Packaging, Labels & Stamps",
    subtitle: "Precision die-cut vinyl stickers, unboxing roll labels & self-inking stamps",
    description: "Elevate your unboxing experience with waterproof contour die-cut vinyl stickers, branded packaging roll labels, corporate envelopes, and self-inking stamps.",
    image: "/images/custom-stickers-labels.jpg",
    primaryCtaText: "Shop Stickers & Labels",
    ctaLabel: "SHOP NOW",
    features: ["Waterproof Die-Cut Vinyl", "10,000-Impression Stamps", "Custom DL Envelopes"],
    targetUrl: "/#labels",
    isActive: true,
  },
  {
    id: "tshirts",
    category: "tshirts",
    breadcrumb: "Custom T-Shirts & Corporate Apparel",
    badge: "100% Combed Cotton",
    eyebrow: "CORPORATE APPAREL",
    title: "Corporate Polo & Cotton T-Shirts",
    subtitle: "High-density 240 GSM bio-washed pique polos and breathable cotton t-shirts",
    description: "Reinforce brand cohesion with premium 240 GSM combed cotton corporate polos, executive collar tipping, and high-definition Japanese embroidery or DTF transfers.",
    image: "/images/custom-cotton-tshirt.jpg",
    primaryCtaText: "Shop Corporate Apparel",
    ctaLabel: "SHOP NOW",
    features: ["240 GSM Combed Cotton", "Japanese Embroidery", "Sizes XS to 3XL"],
    targetUrl: "/#tshirts",
    isActive: true,
  },
];

