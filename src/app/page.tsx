"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Menu,
  CreditCard,
  Search,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  UploadCloud,
  FileCheck2,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Printer,
  X,
  Check,
  Plus,
  Minus,
  MessageSquare,
  Layers,
  FileText,
  Stamp,
  Shirt,
  Coffee,
  Package,
  Sparkles,
  RotateCw,
  Eye,
  Sliders,
  Palette,
  Leaf,
  Briefcase,
  Laptop,
  HeartPulse,
  Scale,
  Utensils,
  Image as ImageIcon,
  Download,
  Trash2,
  ArrowLeft,
  Filter,
  Trophy,
  PenTool,
  BookOpen,
  Smartphone,
  Gift,
  ExternalLink,
  Star,
  ThumbsUp,
  ZoomIn,
  Box,
  Maximize2,
  Share2,
  HelpCircle,
  Info,
  User,
  Camera,
  ScanLine,
  FileUp,
  Mic,
  MicOff,
  Volume2,
} from "lucide-react";
import { ALL_PRODUCTS, CatalogProduct, PricingTier } from "@/data/products";

// ==========================================
// HIGH-AESTHETIC BOTANICAL & ORNATE SVG ICONS
// ==========================================
function BotanicalBranchSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 105C45 95 70 70 85 30M85 30C82 18 92 12 96 15C100 18 97 28 85 30ZM85 30C72 38 68 48 72 52C76 56 84 50 85 30ZM68 52C55 58 52 68 56 71C60 74 67 67 68 52ZM52 72C40 76 38 86 42 88C46 90 52 84 52 72ZM72 45C78 35 88 38 90 42C92 46 84 52 72 45ZM56 64C62 55 72 58 74 61C76 64 68 70 56 64Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.85" />
    </svg>
  );
}

function GoldenWreathSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15C30 15 15 30 15 50C15 65 25 78 38 83M50 15C70 15 85 30 85 50C85 65 75 78 62 83M20 35C24 38 22 46 16 46M25 50C29 53 26 61 20 60M35 68C38 72 34 79 28 77M80 35C76 38 78 46 84 46M75 50C71 53 74 61 80 60M65 68C62 72 66 79 72 77M50 78L50 88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.4" />
    </svg>
  );
}

function MonsteraLeafSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10C35 25 20 45 25 75C28 88 42 95 50 95C58 95 72 88 75 75C80 45 65 25 50 10ZM50 10V95M35 35L48 45M65 35L52 45M30 55L48 60M70 55L52 60M35 75L48 75M65 75L52 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.75" />
    </svg>
  );
}

// Product Template Interface
interface ProductTemplate {
  id: string;
  productId: string;
  name: string;
  category: "leaf" | "corporate" | "tech" | "luxury" | "medical" | "creative" | "finance";
  bgStyle: string;
  textColor: string;
  accentColor: string;
  subColor: string;
  fontFamily: string;
  motifType: "botanical" | "monstera" | "wreath" | "gold-strip" | "tech-glow" | "clean";
  tag: string;
}

// 60+ Rich Curated Product Templates across All Categories
const PRODUCT_TEMPLATES: ProductTemplate[] = [
  // ================= 1. VISITING CARDS (BOTANICAL & LEAF) =================
  {
    id: "vc-leaf-sage",
    productId: "visiting-cards",
    name: "Botanical Sage & Olive Branch",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#F5F8F5] via-[#EBF3EC] to-[#E2EFE3]",
    textColor: "text-[#1B3624]",
    accentColor: "text-[#2D6A4F]",
    subColor: "text-[#52796F]",
    fontFamily: "font-serif",
    motifType: "botanical",
    tag: "Botanical Bestseller",
  },
  {
    id: "vc-leaf-emerald",
    productId: "visiting-cards",
    name: "Deep Emerald Monstera & Gold",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#082317] via-[#0F3523] to-[#0A2619]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#4ADE80]",
    subColor: "text-[#86EFAC]",
    fontFamily: "font-sans",
    motifType: "monstera",
    tag: "Organic Luxury",
  },
  {
    id: "vc-leaf-eucalyptus",
    productId: "visiting-cards",
    name: "Eucalyptus Minimalist Branch",
    category: "leaf",
    bgStyle: "bg-white",
    textColor: "text-[#0F172A]",
    accentColor: "text-[#16A34A]",
    subColor: "text-[#64748B]",
    fontFamily: "font-sans",
    motifType: "botanical",
    tag: "Clean Nature",
  },
  {
    id: "vc-leaf-terracotta",
    productId: "visiting-cards",
    name: "Terracotta Flora & Clay",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#FAF5F0] to-[#F5EBE1]",
    textColor: "text-[#431407]",
    accentColor: "text-[#C2410C]",
    subColor: "text-[#9A3412]",
    fontFamily: "font-serif",
    motifType: "botanical",
    tag: "Artisanal Boutique",
  },
  {
    id: "vc-leaf-forest-gold",
    productId: "visiting-cards",
    name: "Forest Fern & 3D Gold Foil",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#051A11] via-[#0A2619] to-[#061D13]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#FBBF24]",
    subColor: "text-[#FDE68A]",
    fontFamily: "font-serif",
    motifType: "wreath",
    tag: "Hot Foil Stamped",
  },
  {
    id: "vc-leaf-zen",
    productId: "visiting-cards",
    name: "Matcha Zen Herbal & Spa",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#F5F7F0] to-[#EAF0E2]",
    textColor: "text-[#283618]",
    accentColor: "text-[#606C38]",
    subColor: "text-[#65A30D]",
    fontFamily: "font-sans",
    motifType: "botanical",
    tag: "Wellness / Clinic",
  },

  // ================= 2. VISITING CARDS (CORPORATE & LUXURY) =================
  {
    id: "vc-corp-navy",
    productId: "visiting-cards",
    name: "Midnight Navy Executive Suite",
    category: "corporate",
    bgStyle: "bg-gradient-to-br from-[#091427] via-[#0F1E38] to-[#0B172E]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#38BDF8]",
    subColor: "text-[#94A3B8]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Leadership",
  },
  {
    id: "vc-lux-gold",
    productId: "visiting-cards",
    name: "Royal Black & 3D Stamped Gold",
    category: "luxury",
    bgStyle: "bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0D0D0D]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#FBBF24]",
    subColor: "text-[#FCD34D]",
    fontFamily: "font-serif",
    motifType: "gold-strip",
    tag: "3D Raised Foil",
  },
  {
    id: "vc-tech-matrix",
    productId: "visiting-cards",
    name: "Cyber Terminal Neon Matrix",
    category: "tech",
    bgStyle: "bg-gradient-to-br from-[#080D1A] to-[#030712]",
    textColor: "text-[#F8FAFC]",
    accentColor: "text-[#10B981]",
    subColor: "text-[#6EE7B7]",
    fontFamily: "font-mono",
    motifType: "tech-glow",
    tag: "AI & SaaS",
  },
  {
    id: "vc-med-clean",
    productId: "visiting-cards",
    name: "Doctor & Clinic Trust Blue",
    category: "medical",
    bgStyle: "bg-white",
    textColor: "text-[#0F172A]",
    accentColor: "text-[#0284C7]",
    subColor: "text-[#64748B]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Healthcare",
  },

  // ================= 3. CUSTOM ENVELOPES DESIGNS =================
  {
    id: "env-leaf-return",
    productId: "custom-envelopes",
    name: "Botanical Sage Return Address DL",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#F5F8F5] to-[#EAF2EA]",
    textColor: "text-[#1A3323]",
    accentColor: "text-[#2E6B43]",
    subColor: "text-[#587B64]",
    fontFamily: "font-serif",
    motifType: "botanical",
    tag: "Botanical Envelope",
  },
  {
    id: "env-corp-navy",
    productId: "custom-envelopes",
    name: "Executive Navy Stripe Business DL",
    category: "corporate",
    bgStyle: "bg-white",
    textColor: "text-[#0F172A]",
    accentColor: "text-[#1E40AF]",
    subColor: "text-[#64748B]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Corporate DL",
  },
  {
    id: "env-lux-gold",
    productId: "custom-envelopes",
    name: "Charcoal Velvet & Gold Foil Flap",
    category: "luxury",
    bgStyle: "bg-gradient-to-br from-[#18181B] to-[#09090B]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#FBBF24]",
    subColor: "text-[#A1A1AA]",
    fontFamily: "font-serif",
    motifType: "gold-strip",
    tag: "Luxury Invitation",
  },
  {
    id: "env-tech-clean",
    productId: "custom-envelopes",
    name: "Clean Minimalist Startup Envelope",
    category: "tech",
    bgStyle: "bg-white",
    textColor: "text-[#020617]",
    accentColor: "text-[#0284C7]",
    subColor: "text-[#64748B]",
    fontFamily: "font-mono",
    motifType: "tech-glow",
    tag: "Modern Tech",
  },

  // ================= 4. EXECUTIVE LETTERHEADS DESIGNS =================
  {
    id: "lh-leaf-suite",
    productId: "official-letterheads",
    name: "Botanical Border & Watermark Letterhead",
    category: "leaf",
    bgStyle: "bg-white",
    textColor: "text-[#1C3322]",
    accentColor: "text-[#2E5A36]",
    subColor: "text-[#52796F]",
    fontFamily: "font-serif",
    motifType: "botanical",
    tag: "Nature Watermark",
  },
  {
    id: "lh-corp-executive",
    productId: "official-letterheads",
    name: "Corporate Executive Navy Header A4",
    category: "corporate",
    bgStyle: "bg-white",
    textColor: "text-[#0F172A]",
    accentColor: "text-[#1E40AF]",
    subColor: "text-[#64748B]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Official Bond A4",
  },
  {
    id: "lh-lux-gold-crest",
    productId: "official-letterheads",
    name: "Luxury Gold Foil Crest Letterhead",
    category: "luxury",
    bgStyle: "bg-gradient-to-br from-[#FAF9F5] to-white",
    textColor: "text-[#18181B]",
    accentColor: "text-[#B45309]",
    subColor: "text-[#71717A]",
    fontFamily: "font-serif",
    motifType: "wreath",
    tag: "Foil Stamped A4",
  },

  // ================= 5. SELF-INKING RUBBER STAMPS =================
  {
    id: "st-round-seal",
    productId: "self-inking-stamps",
    name: "Corporate Round Seal 42mm",
    category: "corporate",
    bgStyle: "bg-white",
    textColor: "text-[#1E3A8A]",
    accentColor: "text-[#1E40AF]",
    subColor: "text-[#3B82F6]",
    fontFamily: "font-serif",
    motifType: "wreath",
    tag: "Standard Seal",
  },
  {
    id: "st-leaf-botanical",
    productId: "self-inking-stamps",
    name: "Handcrafted Botanical Eco Store Stamp",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#FAF7F2] to-white",
    textColor: "text-[#283618]",
    accentColor: "text-[#3F6212]",
    subColor: "text-[#65A30D]",
    fontFamily: "font-serif",
    motifType: "botanical",
    tag: "Eco Artisan",
  },
  {
    id: "st-address-rect",
    productId: "self-inking-stamps",
    name: "Return Address Rectangle 58x22mm",
    category: "corporate",
    bgStyle: "bg-white",
    textColor: "text-[#0F172A]",
    accentColor: "text-[#0F172A]",
    subColor: "text-[#475569]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Quick Address",
  },

  // ================= 6. CUSTOM POLO T-SHIRTS =================
  {
    id: "ts-corp-navy",
    productId: "custom-polo-shirts",
    name: "Navy Blue Executive Chest Embroidery",
    category: "corporate",
    bgStyle: "bg-gradient-to-br from-[#0F1D38] to-[#0A1428]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#38BDF8]",
    subColor: "text-[#93C5FD]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Office Wear",
  },
  {
    id: "ts-leaf-organic",
    productId: "custom-polo-shirts",
    name: "Organic White & Emerald Leaf Crest",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#F8FAF8] to-white",
    textColor: "text-[#1C3322]",
    accentColor: "text-[#16A34A]",
    subColor: "text-[#52796F]",
    fontFamily: "font-sans",
    motifType: "botanical",
    tag: "Eco Matty Cotton",
  },
  {
    id: "ts-tech-black",
    productId: "custom-polo-shirts",
    name: "Matte Black Silicon Valley Tech Polo",
    category: "tech",
    bgStyle: "bg-gradient-to-br from-[#18181B] to-[#09090B]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#06B6D4]",
    subColor: "text-[#94A3B8]",
    fontFamily: "font-mono",
    motifType: "tech-glow",
    tag: "Startup Uniform",
  },

  // ================= 7. CERAMIC COFFEE MUGS (PURE MUGS ONLY) =================
  {
    id: "mug-leaf-botanical",
    productId: "coffee-mugs",
    name: "Watercolor Leaf Wraparound Ceramic Mug",
    category: "leaf",
    bgStyle: "bg-gradient-to-br from-[#F5F8F5] to-white",
    textColor: "text-[#1A3323]",
    accentColor: "text-[#2D6A4F]",
    subColor: "text-[#52796F]",
    fontFamily: "font-serif",
    motifType: "botanical",
    tag: "Ceramic 350ml",
  },
  {
    id: "mug-corp-matte-black",
    productId: "coffee-mugs",
    name: "Executive Matte Black & Gloss White Logo Mug",
    category: "corporate",
    bgStyle: "bg-gradient-to-br from-[#18181B] to-[#0D0D0F]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#E2E8F0]",
    subColor: "text-[#94A3B8]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Ceramic 350ml",
  },
  {
    id: "mug-gold-crest",
    productId: "coffee-mugs",
    name: "Royal Gold Crest Matte Black Ceramic Mug",
    category: "luxury",
    bgStyle: "bg-gradient-to-br from-[#0F172A] to-[#020617]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#FBBF24]",
    subColor: "text-[#D4AF37]",
    fontFamily: "font-sans",
    motifType: "wreath",
    tag: "Ceramic 350ml",
  },
];

export interface HeroBannerItem {
  id: string;
  category: "visiting-cards" | "letterheads" | "mugs" | "labels" | "tshirts";
  breadcrumb: string;
  badge: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCtaText: string;
  ctaLabel: string;
  features: string[];
}

export const HERO_BANNERS: HeroBannerItem[] = [
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
  },
  {
    id: "tshirts",
    category: "tshirts",
    breadcrumb: "Custom T-Shirts & Corporate Apparel",
    badge: "100% Combed Cotton",
    eyebrow: "CORPORATE APPAREL",
    title: "Corporate Polo & Cotton T-Shirts",
    subtitle: "240 GSM heavyweight pique polos and 180 GSM bio-washed cotton workwear",
    description: "Outfit your team in 240 GSM heavyweight pique polos and 180 GSM bio-washed combed cotton t-shirts with high-density embroidery & full-color digital printing.",
    image: "/images/custom-cotton-tshirt.jpg",
    primaryCtaText: "Shop T-Shirts & Apparel",
    ctaLabel: "SHOP NOW",
    features: ["240 GSM Pique Knit", "High-Density Embroidery", "12+ Corporate Shades"],
  },
];

// ALL_PRODUCTS and CatalogProduct are imported from @/data/products

export const NAV_CATEGORIES = [
  { id: "visiting-cards", label: "Visiting Cards" },
  { id: "letterheads", label: "Letterheads" },
  { id: "mugs", label: "Mugs" },
  { id: "labels", label: "Labels & Packaging" },
  { id: "tshirts", label: "T-Shirts" },
];

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  categoryName: string;
  image: string;
  quantity: number;
  unitPrice: number;
  branding?: string;
  specs?: string;
  isGstIncluded?: boolean;
}

const QrCodePlaceholder = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <rect x="0" y="0" width="30" height="30" rx="3" />
    <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
    <rect x="9" y="9" width="12" height="12" />
    <rect x="70" y="0" width="30" height="30" rx="3" />
    <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
    <rect x="79" y="9" width="12" height="12" />
    <rect x="0" y="70" width="30" height="30" rx="3" />
    <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
    <rect x="9" y="79" width="12" height="12" />
    <rect x="38" y="8" width="8" height="8" />
    <rect x="52" y="16" width="8" height="8" />
    <rect x="38" y="38" width="14" height="14" />
    <rect x="60" y="38" width="10" height="10" />
    <rect x="78" y="60" width="12" height="12" />
    <rect x="42" y="72" width="10" height="10" />
    <rect x="60" y="78" width="14" height="8" />
  </svg>
);

// Standardized Luxury Visiting Card Preview Component (Exact Same Size & Same Name: Mahi Kapoor)
function VisitingCardCatalogPreview({ product, name = "Mahi Kapoor" }: { product: CatalogProduct; name?: string }) {
  const pid = product.id;
  const displayName = name || "Mahi Kapoor";

  return (
    <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/90 flex items-center justify-center p-3.5 sm:p-4 overflow-hidden select-none">
      {/* Subtle Studio Backdrop Radial Shadow */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/5 pointer-events-none" />

      {/* The Standard Visiting Card (Identical Dimensions: Standard 3.5" x 2" Ratio Across All Products) */}
      <div className="relative w-full max-w-[270px] aspect-[1.75/1] rounded-xl shadow-xl border border-black/15 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        {pid === "pvc-regular-glossy" ? (
          /* 1. PVC Regular Glossy */
          <div className="w-full h-full bg-white flex overflow-hidden text-slate-900 relative">
            <div className="w-[60%] p-2.5 sm:p-3 flex flex-col justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-700 text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
                  IT
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-black text-slate-900 truncate leading-tight">
                    {displayName}
                  </div>
                  <div className="text-[8px] font-semibold text-slate-500 truncate">
                    Managing Director
                  </div>
                </div>
              </div>
              <div className="space-y-0.5 text-[7px] sm:text-[8px] text-slate-600 font-medium">
                <div className="truncate">+91 99450 39266</div>
                <div className="truncate">contact@company.com</div>
                <div className="truncate">Bengaluru, Karnataka</div>
              </div>
            </div>
            <div className="w-[40%] bg-gradient-to-br from-[#A81D24] via-[#851117] to-[#1E232A] p-2 sm:p-2.5 text-white flex flex-col justify-between relative">
              <div className="text-right">
                <div className="text-[9px] font-black tracking-tight leading-tight uppercase">
                  INCREDIBLE
                </div>
                <div className="text-[7px] text-amber-300 font-bold tracking-widest">
                  TREASURES
                </div>
              </div>
              <div className="text-[7px] text-amber-200/90 font-bold tracking-wider uppercase text-right">
                400μm Gloss
              </div>
            </div>
            <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
          </div>
        ) : pid === "pvc-regular-matt" ? (
          /* 2. PVC Regular Matt */
          <div className="w-full h-full bg-gradient-to-br from-[#1E0B36] via-[#3B1560] to-[#120524] text-white p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-fuchsia-600/25 blur-lg pointer-events-none" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <div className="text-[10px] font-serif italic text-white/95">Incredible Treasures</div>
                <div className="text-[7px] text-fuchsia-300 font-bold uppercase tracking-wider">Executive Suite</div>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="relative z-10">
              <div className="text-[11px] sm:text-xs font-black text-white truncate">{displayName}</div>
              <div className="text-[8px] text-amber-300 font-semibold">Executive Director • +91 99450 39266</div>
            </div>
            <div className="flex justify-between text-[7px] text-slate-300 border-t border-white/10 pt-1 relative z-10">
              <span>Silk Matt PVC</span>
              <span>400 Micron</span>
            </div>
          </div>
        ) : pid === "pvc-brushed-silver" ? (
          /* 3. PVC Brushed Silver */
          <div className="w-full h-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between border border-slate-400/60 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-400/40 pb-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                <div className="text-[9px] font-black tracking-tight uppercase leading-tight">
                  METALLIC EXECUTIVE SUITE
                </div>
              </div>
              <span className="text-[7px] font-black text-slate-700 bg-white/80 px-1 py-0.5 rounded border border-slate-300">
                RFID
              </span>
            </div>
            <div className="flex items-center gap-2 py-0.5">
              <div className="w-8 h-9 bg-white rounded border border-slate-400 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-[10px] sm:text-[11px] font-black text-slate-950 truncate leading-tight">{displayName}</div>
                <div className="text-[7.5px] text-slate-700 font-bold">Chief Executive Officer</div>
                <div className="text-[7px] text-slate-500 truncate">+91 99450 39266</div>
              </div>
            </div>
            <div className="text-[7px] text-slate-600 font-mono tracking-widest uppercase">
              BRUSHED METALLIC SILVER 400μ
            </div>
          </div>
        ) : pid === "pvc-rainbow" ? (
          /* 4. PVC Rainbow Holographic */
          <div className="w-full h-full bg-gradient-to-tr from-[#FFD1DC] via-[#FFE4B5] via-[#D1E8E2] to-[#E6E6FA] text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] sm:text-xs font-black text-slate-900 truncate leading-tight">{displayName}</div>
                <div className="text-[8px] font-bold text-emerald-800">Creative Director</div>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <div className="text-center py-0.5">
              <div className="text-xs font-black tracking-wider text-slate-950 uppercase">
                INCREDIBLE TREASURES
              </div>
              <div className="text-[7px] font-bold text-amber-900 tracking-wider">
                Holographic Prismatic Sheen
              </div>
            </div>
            <div className="flex items-center justify-between text-[7px] font-bold text-slate-700 pt-1 border-t border-slate-900/10">
              <span>+91 99450 39266</span>
              <span>Rainbow Iridescent</span>
            </div>
          </div>
        ) : pid === "pvc-transparent" ? (
          /* 5. PVC Transparent Clear Frosted */
          <div className="w-full h-full bg-white/70 backdrop-blur-md text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between border border-white/80 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 to-indigo-500" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-400 via-amber-400 to-red-500" />
            <div className="pt-0.5">
              <div className="text-[11px] sm:text-xs font-black tracking-wider text-slate-950 uppercase truncate leading-tight">
                {displayName.toUpperCase()}
              </div>
              <div className="text-[7.5px] font-extrabold text-slate-700 tracking-wider uppercase">
                DIRECTOR - OPERATIONS
              </div>
            </div>
            <div className="py-0.5">
              <div className="text-[9px] font-black text-slate-900">INCREDIBLE TREASURES</div>
              <div className="text-[7px] text-slate-600 font-medium">400 Micron Frosted Crystal</div>
            </div>
            <div className="text-[7px] font-bold text-slate-800 flex justify-between pb-0.5">
              <span>Cell: +91 99450 39266</span>
              <span>Waterproof Clear</span>
            </div>
          </div>
        ) : pid === "pvc-glitter" ? (
          /* 6. PVC Glitter */
          <div className="w-full h-full bg-gradient-to-tr from-[#DEBA78] via-[#F4E0A5] to-[#D5A754] text-slate-950 p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden">
            <div className="bg-white/95 rounded-lg p-2 shadow-xs border border-amber-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-slate-900 leading-tight">CREATIVE MIND</div>
                  <div className="text-[7px] font-bold text-amber-800">Artist Director Suite</div>
                </div>
                <Sparkles className="w-3 h-3 text-amber-600" />
              </div>
              <div className="mt-1 text-[11px] font-black text-slate-950 truncate">
                {displayName}
              </div>
            </div>
            <div className="text-[7.5px] font-bold text-slate-900 flex justify-between items-center">
              <span>+91 99450 39266</span>
              <span className="font-mono uppercase tracking-wider">GLITTER LUXURY</span>
            </div>
          </div>
        ) : pid === "pvc-embossed" ? (
          /* 7. PVC Embossed */
          <div className="w-full h-full bg-slate-50 text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between border border-slate-300 relative shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-red-600 tracking-wider">IDJET</span>
                <span className="text-[8px] font-bold text-slate-600">RFID )))</span>
              </div>
              <span className="text-[7px] font-black text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
                SMART CHIP
              </span>
            </div>
            <div className="py-0.5">
              <div className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-slate-800 truncate drop-shadow-[1px_1px_0px_rgba(0,0,0,0.3)]">
                {displayName.toUpperCase()}
              </div>
              <div className="text-[7.5px] font-bold tracking-wider uppercase text-slate-600">
                MANAGING DIRECTOR
              </div>
            </div>
            <div className="text-[7.5px] font-mono text-slate-700 flex justify-between">
              <span>+91 99450 39266</span>
              <span className="font-bold">3D EMBOSSED</span>
            </div>
          </div>
        ) : pid === "pvc-matt-foiling" ? (
          /* 8. PVC Matt + Foiling */
          <div className="w-full h-full bg-[#121214] text-white p-3 sm:p-3.5 flex flex-col justify-between border border-neutral-800 relative">
            <div className="flex items-center justify-between">
              <div className="w-6 h-6 rounded-full border border-amber-300/60 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <span className="text-[7px] font-serif font-black tracking-widest uppercase text-amber-300">
                METALLIC HOT FOIL
              </span>
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-serif font-black tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent truncate">
                {displayName.toUpperCase()}
              </div>
              <div className="text-[7.5px] font-serif tracking-widest text-amber-200/80 uppercase">
                EXECUTIVE CHAIRMAN
              </div>
              <div className="text-[8px] font-bold text-neutral-300 mt-0.5">
                INCREDIBLE TREASURES
              </div>
            </div>
            <div className="text-[7px] text-neutral-400 font-mono flex justify-between">
              <span>+91 99450 39266</span>
              <span>400 Micron Matt</span>
            </div>
          </div>
        ) : pid === "pvc-matt-spot-uv" ? (
          /* 9. PVC Matt + Spot UV */
          <div className="w-full h-full bg-[#C79A3B] text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between border border-[#A67E28] relative">
            <div className="flex items-center justify-between">
              <span className="text-[7px] font-black uppercase tracking-widest bg-black/20 text-slate-950 px-1.5 py-0.5 rounded">
                RAISED 3D SPOT UV
              </span>
              <Trophy className="w-3.5 h-3.5 text-slate-950" />
            </div>
            <div className="text-center py-0.5">
              <div className="text-xs font-serif font-black tracking-tight text-slate-950">
                INCREDIBLE TREASURES
              </div>
              <div className="text-[10px] font-bold text-slate-950 tracking-wider truncate">
                {displayName}
              </div>
              <div className="text-[7px] text-slate-900 font-medium">Founder & Managing Director</div>
            </div>
            <div className="text-[7px] font-bold text-slate-900 flex justify-between">
              <span>+91 99450 39266</span>
              <span>Spot Gloss Varnish</span>
            </div>
          </div>
        ) : pid === "gold-foil-cards" ? (
          /* 10. Gold Foil Luxury Cards */
          <div className="w-full h-full bg-[#0F0F12] text-white p-3 sm:p-3.5 flex flex-col justify-between border border-amber-500/30 relative">
            <div className="flex items-center justify-between">
              <div className="w-5 h-5 rounded border border-amber-400 flex items-center justify-center font-serif text-[9px] font-black text-amber-300">
                IT
              </div>
              <span className="text-[7px] font-bold tracking-widest text-amber-300 uppercase">
                3D Raised Gold Foil
              </span>
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-serif font-bold tracking-wider text-amber-200 truncate">
                {displayName}
              </div>
              <div className="text-[7.5px] text-slate-400 uppercase tracking-wider">Managing Director</div>
            </div>
            <div className="flex justify-between text-[7px] text-amber-300/80 font-mono border-t border-white/10 pt-1">
              <span>400 GSM Velvet Card</span>
              <span>Hot Stamped</span>
            </div>
          </div>
        ) : pid === "royal-matte-cards" ? (
          /* 11. Royal Velvet Touch Cards */
          <div className="w-full h-full bg-gradient-to-br from-[#0A192F] to-[#020C1B] text-white p-3 sm:p-3.5 flex flex-col justify-between border border-cyan-900/40 relative">
            <div className="flex items-center justify-between">
              <div className="text-[8px] font-bold text-cyan-300 uppercase tracking-widest">Royal Velvet</div>
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-black tracking-wide text-white truncate">
                {displayName}
              </div>
              <div className="text-[7.5px] text-cyan-200/90 font-medium">Chief Executive Officer</div>
            </div>
            <div className="flex justify-between text-[7px] text-slate-400 border-t border-white/10 pt-1">
              <span>350 GSM European Card</span>
              <span>Soft-Touch Feel</span>
            </div>
          </div>
        ) : (
          /* 12. Default / Silk Matte Visiting Cards */
          <div className="w-full h-full bg-white text-slate-900 p-3 sm:p-3.5 flex flex-col justify-between border border-slate-200 relative">
            <div className="flex items-center justify-between">
              <div className="text-[8px] font-black uppercase tracking-wider text-emerald-800">
                Incredible Treasures
              </div>
              <span className="text-[7px] font-bold bg-emerald-50 text-emerald-800 px-1 py-0.5 rounded border border-emerald-200">
                Silk Matte
              </span>
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-black text-slate-900 truncate">
                {displayName}
              </div>
              <div className="text-[7.5px] font-bold text-slate-500">Managing Director</div>
            </div>
            <div className="flex justify-between text-[7px] text-slate-600 border-t border-slate-100 pt-1">
              <span>+91 99450 39266</span>
              <span>350 GSM Art Card</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Visual Search (Lens) Curated Samples for Instant 1-Click Testing
const VISUAL_SEARCH_SAMPLES = [
  {
    name: "Regular Glossy PVC Visiting Card",
    category: "visiting-cards",
    previewUrl: "/images/pvc/card_pvc-regular-glossy.png",
    type: "image" as const,
    sizeStr: "1.8 MB",
    label: "Visiting Card",
  },
  {
    name: "Executive Matte Black Mug",
    category: "mugs",
    previewUrl: "/images/matte-black-ceramic-mug.jpg",
    type: "image" as const,
    sizeStr: "2.1 MB",
    label: "Ceramic Mug",
  },
  {
    name: "Highline 240 GSM Corporate Polo",
    category: "tshirts",
    previewUrl: "/images/catalog/apparel/highline-corporate-polo-suite.jpg",
    type: "image" as const,
    sizeStr: "2.6 MB",
    label: "Corporate Polo",
  },
  {
    name: "Custom Die-Cut Roll Labels",
    category: "labels",
    previewUrl: "/images/custom-stickers-labels.jpg",
    type: "image" as const,
    sizeStr: "1.4 MB",
    label: "Packaging Label",
  },
  {
    name: "Corporate_Stationery_Master_Artwork.pdf",
    category: "letterheads",
    previewUrl: "",
    type: "pdf" as const,
    sizeStr: "4.2 MB",
    label: "Artwork PDF",
  },
];

export default function VistaprintStorePage() {
  // Navigation & Product Selection state
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  // Global Omnibar Search & Quick View state
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogProduct | null>(null);

  // Google Lens & IndiaMART-Style Visual Search State
  const [showVisualSearchModal, setShowVisualSearchModal] = useState<boolean>(false);
  const [visualSearchFile, setVisualSearchFile] = useState<{
    name: string;
    previewUrl: string;
    type: "image" | "pdf";
    sizeStr?: string;
  } | null>(null);
  const [isAnalyzingVisual, setIsAnalyzingVisual] = useState<boolean>(false);
  const [visualSearchCategoryDetected, setVisualSearchCategoryDetected] = useState<string | null>(null);
  const [visualSearchResults, setVisualSearchResults] = useState<Array<{
    product: CatalogProduct;
    matchScore: number;
    matchBadge: string;
    reason: string;
  }>>([]);
  const visualSearchInputRef = useRef<HTMLInputElement>(null);

  // Google & IndiaMART-Style Voice Search State
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>("");
  const [voiceStatusText, setVoiceStatusText] = useState<string>("Listening... Speak your request");
  const [voiceRecognitionInstance, setVoiceRecognitionInstance] = useState<any>(null);

  // Responsive Mobile Navigation Drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const searchResults = searchQuery.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const selectProductById = (id: string, openEditor = false) => {
    const p = ALL_PRODUCTS.find((item) => item.id === id) || ALL_PRODUCTS[0];
    setSelectedProduct(p);
    setIsEditorOpen(true);
    setProductViewTab("studio");
    if (p.pricingTiers && p.pricingTiers.length > 0) {
      setSelectedPvcTier(p.pricingTiers[0]);
    } else {
      setSelectedPvcTier(null);
    }
    setActiveDropdown(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // AUTOMATIC HOVER MEGA-MENU STATE (Controlled on mouse cursor enter/leave!)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMenuMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms smooth buffer so cursor can move between navbar and menu effortlessly
  };

  // Catalog category sidebar filter
  const [activeCatalogCategory, setActiveCatalogCategory] = useState("all");

  // Hero Banner Carousel State (Cinematic Full-Page Presentation)
  const [activeBannerIndex, setActiveBannerIndex] = useState<number>(0);
  const [isBannerPaused, setIsBannerPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isBannerPaused) return;
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isBannerPaused]);

  // Template browser state
  const [templateFilter, setTemplateFilter] = useState<string>("all");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("vc-leaf-sage");
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  // Default Cardholder Name
  const [customerName, setCustomerName] = useState("Mahi Kapoor");
  const [customerDesignation, setCustomerDesignation] = useState("Managing Director");
  const [companyName, setCompanyName] = useState("Incredible Treasures");
  const [phone, setPhone] = useState("+91 99450 39266");
  const [email, setEmail] = useState("contact@incredible-treasures.com");
  const [address, setAddress] = useState("Yelahanka, Bengaluru – 560064");
  const [website, setWebsite] = useState("www.incredible-treasures.com");
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [cardOrientation, setCardOrientation] = useState<"horizontal" | "vertical">("horizontal");

  // Field Placement (Front / Back / Both) for Live Dual-Side Personalization
  type DetailPlacement = "front" | "back" | "both";

  const [detailPlacements, setDetailPlacements] = useState<{
    companyName: DetailPlacement;
    customerName: DetailPlacement;
    customerDesignation: DetailPlacement;
    phone: DetailPlacement;
    email: DetailPlacement;
    website: DetailPlacement;
    address: DetailPlacement;
  }>({
    companyName: "both",
    customerName: "front",
    customerDesignation: "front",
    phone: "both",
    email: "front",
    website: "back",
    address: "back",
  });

  const showFront = (field: keyof typeof detailPlacements) =>
    detailPlacements[field] === "front" || detailPlacements[field] === "both";

  const showBack = (field: keyof typeof detailPlacements) =>
    detailPlacements[field] === "back" || detailPlacements[field] === "both";

  // Reusable Placement Selector Component (Front / Back / Both)
  const PlacementSelector = ({
    field,
    label,
    icon: Icon,
  }: {
    field: keyof typeof detailPlacements;
    label: string;
    icon?: React.ElementType;
  }) => {
    const current = detailPlacements[field];
    return (
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <label className="font-bold text-slate-700 flex items-center gap-1.5 text-xs truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
          <span className="truncate">{label}</span>
        </label>
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[10px] font-bold shrink-0">
          <button
            type="button"
            onClick={() => setDetailPlacements((prev) => ({ ...prev, [field]: "front" }))}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              current === "front"
                ? "bg-emerald-600 text-white shadow-2xs font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Print on Front Side (Side A)"
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setDetailPlacements((prev) => ({ ...prev, [field]: "back" }))}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              current === "back"
                ? "bg-indigo-600 text-white shadow-2xs font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Print on Back Side (Side B)"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setDetailPlacements((prev) => ({ ...prev, [field]: "both" }))}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              current === "both"
                ? "bg-slate-900 text-white shadow-2xs font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Print on Both Front & Back"
          >
            Both
          </button>
        </div>
      </div>
    );
  };

  // Dual-Side Custom Artwork Uploads (Front & Back)
  const [uploadedFrontArtwork, setUploadedFrontArtwork] = useState<string | null>(null);
  const [uploadedBackArtwork, setUploadedBackArtwork] = useState<string | null>(null);
  const [uploadedFrontName, setUploadedFrontName] = useState<string | null>(null);
  const [uploadedBackName, setUploadedBackName] = useState<string | null>(null);
  const frontArtworkInputRef = useRef<HTMLInputElement>(null);
  const backArtworkInputRef = useRef<HTMLInputElement>(null);

  // Tab view: "studio" (Dual Front + Back Proofing) vs "photo" (Studio Photography & Specs)
  const [productViewTab, setProductViewTab] = useState<"studio" | "photo">("studio");

  // ==========================================
  // DAY 4: PRODUCT DETAIL PAGE (PDP) STATE
  // ==========================================
  // 1. Multi-image gallery & 3D angle view states
  const [galleryAngle, setGalleryAngle] = useState<"front" | "3d" | "back" | "texture">("front");
  const [isHoverZoomActive, setIsHoverZoomActive] = useState<boolean>(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [interactive3dRotX, setInteractive3dRotX] = useState<number>(14);
  const [interactive3dRotY, setInteractive3dRotY] = useState<number>(-24);
  const [is3dAutoSpin, setIs3dAutoSpin] = useState<boolean>(false);

  // 2. Detailed specification tabs state
  const [specActiveTab, setSpecActiveTab] = useState<"substrate" | "finish" | "dimensions" | "packaging" | "tax">("substrate");

  // Reference cards filter state
  const [cardReferenceFilter, setCardReferenceFilter] = useState<string>("all");

  // 3. Customer review & rating states
  const [reviewFilter, setReviewFilter] = useState<"all" | "verified" | "photos" | "5star">("all");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({
    "rev-1": 32,
    "rev-2": 27,
    "rev-3": 19,
    "rev-4": 15,
    "rev-5": 12,
  });
  const [userVotedReviews, setUserVotedReviews] = useState<Record<string, boolean>>({});
  const [showWriteReviewModal, setShowWriteReviewModal] = useState<boolean>(false);
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewName, setNewReviewName] = useState<string>("");
  const [newReviewRole, setNewReviewRole] = useState<string>("");
  const [newReviewCompany, setNewReviewCompany] = useState<string>("");
  const [newReviewTitle, setNewReviewTitle] = useState<string>("");
  const [newReviewComment, setNewReviewComment] = useState<string>("");
  const [newReviewQty, setNewReviewQty] = useState<string>("500 pcs");

  const [pdpReviews, setPdpReviews] = useState<Array<{
    id: string;
    author: string;
    role: string;
    company: string;
    city: string;
    rating: number;
    date: string;
    orderQty: string;
    isVerified: boolean;
    hasPhoto: boolean;
    title: string;
    content: string;
    tags: string[];
  }>>([
    {
      id: "rev-1",
      author: "Rajesh Sharma",
      role: "Director of Operations",
      company: "Apex Global Logistics",
      city: "Bengaluru",
      rating: 5,
      date: "2 days ago",
      orderQty: "500 pcs",
      isVerified: true,
      hasPhoto: true,
      title: "Substantial 400 Micron thickness. Zero bend in leather wallets.",
      content: "We ordered 500 pcs for our executive leadership team. The thickness and rigidity of the 400 micron PVC card is identical to a luxury bank card. The rounded edges are laser cut with zero burrs. Our team loves handing these to clients.",
      tags: ["400 Micron PVC", "Executive B2B", "Rounded Corners"],
    },
    {
      id: "rev-2",
      author: "Pooja Sundaram",
      role: "Principal Architect & Founder",
      company: "Studio Bloom Architecture",
      city: "Mumbai",
      rating: 5,
      date: "1 week ago",
      orderQty: "200 pcs",
      isVerified: true,
      hasPhoto: true,
      title: "Spot UV and foil registration is 100% millimeter accurate!",
      content: "In web-to-print, spot UV misalignments often ruin dark aesthetic cards. Here, the raised gloss coating sits exactly on top of our foil branding with zero offset. The dual-side canvas preview showed exact colors.",
      tags: ["Raised Spot UV", "Gold Foil", "Design Studio"],
    },
    {
      id: "rev-3",
      author: "Arjun Mehta",
      role: "VP of Product",
      company: "Nexus FinTech Pvt Ltd",
      city: "Hyderabad",
      rating: 5,
      date: "2 weeks ago",
      orderQty: "1000 pcs",
      isVerified: true,
      hasPhoto: false,
      title: "Rapid 48-Hour dispatch + official GST tax invoice with ITC.",
      content: "We needed 1000 cards on urgent notice before our Bangalore fintech summit. Incredible Treasures dispatched them via BlueDart Air within 48 hours. Acrylic packaging kept cards pristine and accounting easily claimed the 18% GST ITC.",
      tags: ["Fast Dispatch", "18% GST ITC Invoice", "1000 pcs MOQ"],
    },
    {
      id: "rev-4",
      author: "Dr. Siddharth Rao",
      role: "Medical Director",
      company: "CarePulse Multi-Speciality Clinic",
      city: "Bengaluru",
      rating: 5,
      date: "3 weeks ago",
      orderQty: "500 pcs",
      isVerified: true,
      hasPhoto: true,
      title: "100% Waterproof and tearproof in everyday clinic use.",
      content: "Being in healthcare, regular paper visiting cards stain or degrade when sanitized. These PVC cards are completely impervious to water and sanitizer. Crystal clear typography and great print resolution.",
      tags: ["Waterproof", "Tearproof", "Healthcare Clinic"],
    },
    {
      id: "rev-5",
      author: "Sneha Kapoor",
      role: "Brand Director",
      company: "Verve Digital Labs",
      city: "Gurugram",
      rating: 5,
      date: "1 month ago",
      orderQty: "1000 pcs",
      isVerified: true,
      hasPhoto: false,
      title: "Online studio made Front & Back editing effortless.",
      content: "Loved being able to see both Front (Side A) and Back (Side B) side-by-side in real time. We generated our company LinkedIn QR code right inside the studio. Production quality is unmatched.",
      tags: ["Dual-Side Live Preview", "QR Code", "Matte Lamination"],
    },
  ]);

  // Auto-spin 3D card timer
  React.useEffect(() => {
    if (!is3dAutoSpin) return;
    const interval = setInterval(() => {
      setInteractive3dRotY((prev) => (prev >= 360 ? 0 : prev + 2));
    }, 40);
    return () => clearInterval(interval);
  }, [is3dAutoSpin]);

  const handleVoteHelpful = (reviewId: string) => {
    if (userVotedReviews[reviewId]) {
      setToastMessage("You already marked this review as helpful.");
      return;
    }
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
    setUserVotedReviews((prev) => ({
      ...prev,
      [reviewId]: true,
    }));
    setToastMessage("Thank you for your feedback! Marked as helpful.");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewTitle.trim() || !newReviewComment.trim()) {
      setToastMessage("Please enter your name, headline, and comments.");
      return;
    }
    const createdReview = {
      id: `rev-${Date.now()}`,
      author: newReviewName.trim(),
      role: newReviewRole.trim() || "Corporate Client",
      company: newReviewCompany.trim() || "Verified Enterprise",
      city: "Bengaluru",
      rating: newReviewRating,
      date: "Just now",
      orderQty: newReviewQty,
      isVerified: true,
      hasPhoto: false,
      title: newReviewTitle.trim(),
      content: newReviewComment.trim(),
      tags: ["Verified Corporate Order", selectedProduct?.categoryName || "Visiting Cards"],
    };
    setPdpReviews((prev) => [createdReview, ...prev]);
    setHelpfulVotes((prev) => ({ ...prev, [createdReview.id]: 0 }));
    setShowWriteReviewModal(false);
    setNewReviewName("");
    setNewReviewRole("");
    setNewReviewCompany("");
    setNewReviewTitle("");
    setNewReviewComment("");
    setToastMessage("Your corporate review was submitted successfully! Thank you.");
  };

  // Card finish & quantity specifications
  const [selectedStock, setSelectedStock] = useState<"matte" | "glossy" | "goldFoil" | "linen">("matte");
  const [cornerStyle, setCornerStyle] = useState<"square" | "rounded">("square");
  const [quantity, setQuantity] = useState<number>(500);

  const [selectedPvcTier, setSelectedPvcTier] = useState<PricingTier | null>(null);

  // Cart & UI feedback states
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart-sample-item-1",
      productId: "aquabot-ceramic-coffee-mug",
      title: "AquaBot Two-Tone Ceramic Corporate Mug (50 pcs)",
      categoryName: "Custom Mugs",
      image: "/images/catalog/drinkware/aquabot-ceramic-coffee-mug.jpg",
      quantity: 50,
      unitPrice: 165,
      branding: "Full Color Sublimation",
      specs: "Grade-A Ceramic • Gloss Enamel • Standard Rate (+18% GST Extra)",
      isGstIncluded: false,
    },
    {
      id: "cart-sample-item-2",
      productId: "pvc-regular-glossy",
      title: "Regular Glossy PVC Visiting Card (200 pcs)",
      categoryName: "PVC Visiting Cards",
      image: "/images/pvc/card_pvc-regular-glossy.png",
      quantity: 200,
      unitPrice: 12.50,
      branding: "400 Micron Glossy",
      specs: "400 Micron White PVC • 2-Sided • Price Includes 18% GST",
      isGstIncluded: true,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [isWhatsAppWidgetOpen, setIsWhatsAppWidgetOpen] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "moq">("featured");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Google Lens & IndiaMART-Style Visual Search Analysis Engine
  const runVisualSearchAnalysis = (
    fileName: string,
    previewUrl: string,
    fileType: "image" | "pdf",
    fileSizeStr?: string,
    forcedCategory?: string
  ) => {
    setVisualSearchFile({
      name: fileName,
      previewUrl,
      type: fileType,
      sizeStr: fileSizeStr || "2.4 MB",
    });
    setIsAnalyzingVisual(true);
    setVisualSearchResults([]);
    setVisualSearchCategoryDetected(null);

    // Realistic scanning duration (850ms) to simulate ML feature extraction
    setTimeout(() => {
      const lowerName = fileName.toLowerCase();
      let matchedCategory = forcedCategory || "";

      if (!matchedCategory) {
        if (lowerName.includes("card") || lowerName.includes("visiting") || lowerName.includes("bcard")) {
          matchedCategory = "visiting-cards";
        } else if (lowerName.includes("mug") || lowerName.includes("cup") || lowerName.includes("coffee")) {
          matchedCategory = "mugs";
        } else if (lowerName.includes("tshirt") || lowerName.includes("shirt") || lowerName.includes("polo") || lowerName.includes("apparel")) {
          matchedCategory = "tshirts";
        } else if (lowerName.includes("envelope") || lowerName.includes("stamp") || lowerName.includes("label") || lowerName.includes("sticker") || lowerName.includes("box")) {
          matchedCategory = "labels";
        } else if (lowerName.includes("letterhead") || lowerName.includes("doc") || fileType === "pdf") {
          matchedCategory = "letterheads";
        } else {
          matchedCategory = "visiting-cards";
        }
      }

      // Filter catalog products for matches
      let matchedProds = ALL_PRODUCTS.filter((p) => p.category === matchedCategory);
      if (matchedProds.length === 0) {
        matchedProds = ALL_PRODUCTS.slice(0, 4);
      }

      const categoryLabels: Record<string, string> = {
        "visiting-cards": "Corporate Visiting Cards & PVC Substrates",
        "mugs": "Ceramic Drinkware & Corporate Mugs",
        "tshirts": "Corporate Apparel & Premium Cotton Polos",
        "labels": "Die-Cut Labels, Packaging & Office Envelopes",
        "letterheads": "Executive Letterheads & Print-Ready PDF Documents",
      };

      setVisualSearchCategoryDetected(categoryLabels[matchedCategory] || "Corporate Stationery");

      const results = matchedProds.slice(0, 4).map((prod, idx) => {
        const score = idx === 0 ? 98 : idx === 1 ? 94 : idx === 2 ? 89 : 84;
        let reason = "High visual pattern & layout alignment";
        if (matchedCategory === "visiting-cards") {
          reason = idx === 0
            ? "Standard 3.5×2 inch card ratio & glossy PVC surface detected"
            : "Matching corporate typography hierarchy & card finish";
        } else if (matchedCategory === "mugs") {
          reason = "Cylindrical ceramic silhouette & centered branding footprint";
        } else if (matchedCategory === "tshirts") {
          reason = "Textile weave pattern & chest embroidery placement detected";
        } else if (matchedCategory === "labels") {
          reason = "Contour cutline geometry & adhesive sticker substrate detected";
        } else if (matchedCategory === "letterheads") {
          reason = "Standard A4 / 8.5×11 vector document margins & header grid detected";
        }
        return {
          product: prod,
          matchScore: score,
          matchBadge: `${score}% Visual Match`,
          reason,
        };
      });

      setVisualSearchResults(results);
      setIsAnalyzingVisual(false);
    }, 850);
  };

  const handleVisualSearchFileUpload = (file: File) => {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    if (isPdf) {
      runVisualSearchAnalysis(file.name, "", "pdf", sizeStr);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          runVisualSearchAnalysis(file.name, e.target.result as string, "image", sizeStr);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyVisualMatchToStudio = (matchProd: CatalogProduct, uploadedArtUrl?: string) => {
    setSelectedProduct(matchProd);
    setIsEditorOpen(true);
    setProductViewTab("studio");
    if (matchProd.pricingTiers && matchProd.pricingTiers.length > 0) {
      setSelectedPvcTier(matchProd.pricingTiers[0]);
    } else {
      setSelectedPvcTier(null);
    }
    if (uploadedArtUrl && uploadedArtUrl.startsWith("data:image")) {
      setUploadedFrontArtwork(uploadedArtUrl);
      setUploadedFrontName(visualSearchFile?.name || "visual-search-artwork.png");
      setToastMessage(`Visual search design loaded into 3D Studio for ${matchProd.title}!`);
    } else {
      setToastMessage(`Loaded ${matchProd.title} in 3D Studio!`);
    }
    setShowVisualSearchModal(false);
    setTimeout(() => setToastMessage(null), 3500);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Google & IndiaMART-Style Voice Recognition Engine & Intent Parser
  const handleVoiceQuery = (spokenText: string) => {
    const raw = spokenText.trim().toLowerCase();
    setVoiceTranscript(spokenText);
    setVoiceStatusText(`Recognized: "${spokenText}"`);

    // Intent 1: Visiting Cards (e.g. "i want to see the visiting card", "visiting card", "visiting cards", "business cards", "pvc cards")
    if (
      raw.includes("visiting") ||
      raw.includes("business card") ||
      raw.includes("pvc card") ||
      raw.includes("visiting card") ||
      (raw.includes("card") && !raw.includes("credit") && !raw.includes("gift"))
    ) {
      setSearchQuery("");
      setActiveCatalogCategory("visiting-cards");
      setSelectedProduct(null);
      setIsEditorOpen(false);
      setToastMessage(`Voice recognized: "${spokenText}" → Opening Visiting Cards`);
      setTimeout(() => {
        setShowVoiceModal(false);
        setIsVoiceListening(false);
        const el = document.getElementById("catalog-grid");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 700);
      return;
    }

    // Intent 2: Custom Ceramic Mugs (e.g. "the mugs", "mugs", "coffee mug", "ceramic mug", "cup")
    if (
      raw.includes("mug") ||
      raw.includes("mugs") ||
      raw.includes("coffee") ||
      raw.includes("cup")
    ) {
      setSearchQuery("");
      setActiveCatalogCategory("mugs");
      setSelectedProduct(null);
      setIsEditorOpen(false);
      setToastMessage(`Voice recognized: "${spokenText}" → Opening Custom Ceramic Mugs`);
      setTimeout(() => {
        setShowVoiceModal(false);
        setIsVoiceListening(false);
        const el = document.getElementById("catalog-grid");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 700);
      return;
    }

    // Intent 3: Executive Letterheads & Documents (e.g. "letterhead", "letterheads", "the letterhead", "open letterhead", "bond paper")
    if (
      raw.includes("letterhead") ||
      raw.includes("letter head") ||
      raw.includes("bond paper")
    ) {
      setSearchQuery("");
      setActiveCatalogCategory("letterheads");
      setSelectedProduct(null);
      setIsEditorOpen(false);
      setToastMessage(`Voice recognized: "${spokenText}" → Opening Executive Letterheads`);
      setTimeout(() => {
        setShowVoiceModal(false);
        setIsVoiceListening(false);
        const el = document.getElementById("catalog-grid");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 700);
      return;
    }

    // Intent 4: Corporate T-Shirts & Apparel (e.g. "tshirt", "t-shirt", "t-shirts", "shirts", "polo", "apparel")
    if (
      raw.includes("shirt") ||
      raw.includes("t-shirt") ||
      raw.includes("tshirt") ||
      raw.includes("polo") ||
      raw.includes("apparel")
    ) {
      setSearchQuery("");
      setActiveCatalogCategory("tshirts");
      setSelectedProduct(null);
      setIsEditorOpen(false);
      setToastMessage(`Voice recognized: "${spokenText}" → Opening Corporate T-Shirts`);
      setTimeout(() => {
        setShowVoiceModal(false);
        setIsVoiceListening(false);
        const el = document.getElementById("catalog-grid");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 700);
      return;
    }

    // Intent 5: Labels, Stickers & Packaging (e.g. "labels", "packaging", "stickers", "stamps", "envelopes")
    if (
      raw.includes("label") ||
      raw.includes("sticker") ||
      raw.includes("envelope") ||
      raw.includes("stamp") ||
      raw.includes("packaging") ||
      raw.includes("box")
    ) {
      setSearchQuery("");
      setActiveCatalogCategory("labels");
      setSelectedProduct(null);
      setIsEditorOpen(false);
      setToastMessage(`Voice recognized: "${spokenText}" → Opening Labels & Packaging`);
      setTimeout(() => {
        setShowVoiceModal(false);
        setIsVoiceListening(false);
        const el = document.getElementById("catalog-grid");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 700);
      return;
    }

    // Intent 6: Specific product match in catalog
    const matchedProd = ALL_PRODUCTS.find(
      (p) =>
        raw.includes(p.title.toLowerCase()) ||
        p.title.toLowerCase().includes(raw)
    );

    if (matchedProd) {
      selectProductById(matchedProd.id, true);
      setToastMessage(`Voice recognized: "${spokenText}" → Opening ${matchedProd.title}`);
      setTimeout(() => {
        setShowVoiceModal(false);
        setIsVoiceListening(false);
      }, 700);
      return;
    }

    // Fallback: General text search filter in omnibar
    setSearchQuery(spokenText);
    setSelectedProduct(null);
    setIsEditorOpen(false);
    setToastMessage(`Voice search: "${spokenText}"`);
    setTimeout(() => {
      setShowVoiceModal(false);
      setIsVoiceListening(false);
      const el = document.getElementById("catalog-grid");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 700);
  };

  const startVoiceSearch = () => {
    setShowVoiceModal(true);
    setVoiceTranscript("");
    setVoiceStatusText("Listening... Speak now");
    setIsVoiceListening(true);

    if (typeof window !== "undefined") {
      const SpeechRecClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecClass) {
        try {
          const recognition = new SpeechRecClass();
          recognition.lang = "en-IN";
          recognition.interimResults = true;
          recognition.continuous = false;

          recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const text = event.results[current][0].transcript;
            setVoiceTranscript(text);
            if (event.results[current].isFinal) {
              handleVoiceQuery(text);
            }
          };

          recognition.onerror = (event: any) => {
            console.warn("Speech recognition notice:", event.error);
            if (event.error === "no-speech") {
              setVoiceStatusText("No speech detected. Please speak or choose a sample prompt.");
            } else if (event.error === "not-allowed") {
              setVoiceStatusText("Microphone access blocked. Click any sample prompt below.");
            } else {
              setVoiceStatusText("Audio ready. Tap any sample prompt below to search.");
            }
            setIsVoiceListening(false);
          };

          recognition.onend = () => {
            setIsVoiceListening(false);
          };

          recognition.start();
          setVoiceRecognitionInstance(recognition);
        } catch (err) {
          console.warn("Speech recognition initialization notice:", err);
          setVoiceStatusText("Tap any sample prompt below to search.");
          setIsVoiceListening(false);
        }
      } else {
        setVoiceStatusText("Speech API is supported in Chrome/Edge/Safari. Tap any prompt below to search.");
        setIsVoiceListening(false);
      }
    }
  };

  const stopVoiceSearch = () => {
    if (voiceRecognitionInstance) {
      try {
        voiceRecognitionInstance.stop();
      } catch (e) {}
    }
    setIsVoiceListening(false);
    setShowVoiceModal(false);
  };


  // Cart financial calculations (Strictly respecting "This card only price is including GST"):
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Additional GST: only applies to products where GST is NOT included in the base rate
  const additionalGst = cartItems
    .filter((item) => !item.isGstIncluded)
    .reduce((sum, item) => sum + item.unitPrice * item.quantity * 0.18, 0);
  const cartGst = Math.round(additionalGst * 100) / 100;

  // Embedded GST component in PVC visiting cards (18/118):
  const includedGst = cartItems
    .filter((item) => item.isGstIncluded)
    .reduce((sum, item) => sum + (item.unitPrice * item.quantity * 18) / 118, 0);
  const cartIncludedGst = Math.round(includedGst * 100) / 100;

  // Grand Total never adds extra tax on GST-included PVC cards
  const cartGrandTotal = Math.round((cartSubtotal + cartGst) * 100) / 100;

  const addItemToCart = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
    setToastMessage(`Added "${item.title}" to your cart!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  };

  const removeCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setToastMessage("Item removed from cart.");
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Corporate merchandise bulk customization state
  const [merchTierQty, setMerchTierQty] = useState<number>(1);
  const [merchBranding, setMerchBranding] = useState<string>("Laser Precision Engraving");
  const [merchLogoName, setMerchLogoName] = useState<string | null>(null);

  const currentTemplate =
    PRODUCT_TEMPLATES.find((t) => t.id === selectedTemplateId) || PRODUCT_TEMPLATES[0];

  // Pricing calculation
  const pricingData = {
    matte: { name: "350 GSM Silk Matte", baseRate: 1.58 },
    glossy: { name: "350 GSM High-Gloss", baseRate: 1.88 },
    goldFoil: { name: "400 GSM Velvet + Gold Foil", baseRate: 4.49 },
    linen: { name: "350 GSM Textured Linen", baseRate: 2.78 },
  };

  const currentPricing = pricingData[selectedStock];
  const unitRate =
    quantity === 100
      ? currentPricing.baseRate * 1.2
      : quantity === 250
      ? currentPricing.baseRate * 1.1
      : quantity === 500
      ? currentPricing.baseRate
      : quantity === 1000
      ? currentPricing.baseRate * 0.88
      : currentPricing.baseRate * 0.79;

  const baseTotal = Math.round(unitRate * quantity);
  const cornerAddon = cornerStyle === "rounded" ? (quantity >= 500 ? 99 : 49) : 0;
  const subtotal = baseTotal + cornerAddon;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const finalTotal = Math.round((subtotal + gstAmount) * 100) / 100;
  const perCardCost = (finalTotal / quantity).toFixed(2);

  // Handle local logo file upload
  const handleFrontArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFrontName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedFrontArtwork(event.target.result as string);
          setToastMessage(`Front artwork "${file.name}" rendered onto Side A preview!`);
          setTimeout(() => setToastMessage(null), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedBackName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedBackArtwork(event.target.result as string);
          setToastMessage(`Back artwork "${file.name}" rendered onto Side B preview!`);
          setTimeout(() => setToastMessage(null), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedLogo(event.target.result as string);
          setToastMessage("Logo uploaded and rendered onto your card preview!");
          setTimeout(() => setToastMessage(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const baseCardRate = Math.round((subtotal / quantity) * 100) / 100;
    const namePlacementText = detailPlacements.customerName === "both" ? "Front & Back" : detailPlacements.customerName === "back" ? "Back" : "Front";
    addItemToCart({
      productId: selectedProduct?.id || "visiting-cards",
      title: `${selectedProduct?.title || "Custom Visiting Cards"} (${quantity} pcs)`,
      categoryName: "Visiting Cards",
      image: selectedProduct?.image || "/images/gold-foil-card.jpg",
      quantity: quantity,
      unitPrice: baseCardRate,
      branding: `${selectedStock.toUpperCase()} • ${cardOrientation.toUpperCase()} • ${cornerStyle} corners`,
      specs: `${pricingData[selectedStock].name} • Orientation: ${cardOrientation === "vertical" ? "Vertical (Portrait)" : "Horizontal (Landscape)"} • Name on ${namePlacementText}: ${customerName} • (+18% GST Added)`,
      isGstIncluded: false,
    });
  };

  // Get templates for the currently selected product
  const activeProductTemplates = PRODUCT_TEMPLATES.filter((tpl) => {
    if (!selectedProduct) return true;
    const matchesProduct =
      selectedProduct.id === "gold-foil-cards"
        ? tpl.productId === "visiting-cards" && tpl.category === "luxury"
        : tpl.productId === selectedProduct.id;
    const matchesCategory = templateFilter === "all" || tpl.category === templateFilter;
    return matchesProduct && matchesCategory;
  });

  // Filter and sort catalog products for sidebar, price filter & sort dropdown
  const filteredCatalog = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = activeCatalogCategory === "all" || p.category === activeCatalogCategory;
    if (!matchesCategory) return false;

    const priceNum = parseFloat(p.startingPrice.replace(/[^0-9.]/g, "")) || 0;
    const moqNum = parseInt(p.minQty.replace(/[^0-9]/g, "")) || 0;

    if (priceFilter === "budget") return priceNum < 250;
    if (priceFilter === "mid") return priceNum >= 250 && priceNum <= 600;
    if (priceFilter === "premium") return priceNum > 600;
    if (priceFilter === "low-moq") return moqNum <= 25;

    return true;
  }).sort((a, b) => {
    const priceA = parseFloat(a.startingPrice.replace(/[^0-9.]/g, "")) || 0;
    const priceB = parseFloat(b.startingPrice.replace(/[^0-9.]/g, "")) || 0;
    const moqA = parseInt(a.minQty.replace(/[^0-9]/g, "")) || 0;
    const moqB = parseInt(b.minQty.replace(/[^0-9]/g, "")) || 0;

    if (sortBy === "price-asc") return priceA - priceB;
    if (sortBy === "price-desc") return priceB - priceA;
    if (sortBy === "moq") return moqA - moqB;
    return 0; // featured default
  });

  const categoryHeroInfo: Record<string, { title: string; subtitle: string; tag: string; image: string }> = {
    all: {
      tag: "Bengaluru's Premier Corporate Suite",
      title: "Visiting Cards, Letterheads, Mugs, Packaging & T-Shirts",
      subtitle: "3D raised gold foil visiting cards, executive bond letterheads, custom ceramic mugs, precision packaging labels, and highline bio-washed corporate t-shirts.",
      image: "/images/gold-foil-card.jpg",
    },
    "visiting-cards": {
      tag: "Incredible Treasures Signature Studio",
      title: "Luxury Visiting Cards & Identity",
      subtitle: "Raised metallic gold foil, 350-400 GSM silk velvet finishes, and executive business card templates.",
      image: "/images/gold-foil-card.jpg",
    },
    letterheads: {
      tag: "Executive Stationery & Corporate Identity",
      title: "Executive Bond & Luxury Letterheads",
      subtitle: "100-120 GSM Royal Executive Bond paper, elegant watermarks, high-resolution laser printing, and gold foil crest options.",
      image: "/images/letterhead-suite.jpg",
    },
    mugs: {
      tag: "Custom Ceramic Coffee Mugs (Mugs Only)",
      title: "Personalized Corporate Ceramic Mugs",
      subtitle: "Two-tone and matte black glazed ceramic coffee mugs with vibrant 300 DPI sublimation printing. 100% pure ceramic.",
      image: "/images/custom-ceramic-mugs-banner.jpg",
    },
    labels: {
      tag: "Stickers, Envelopes & Packaging",
      title: "Custom Labels & Packaging Solutions",
      subtitle: "Precision die-cut waterproof vinyl stickers, roll labels, branded corporate envelopes, and self-inking stamps.",
      image: "/images/custom-stickers-labels.jpg",
    },
    tshirts: {
      tag: "Highline Bio-Washed Apparel Suite",
      title: "Premium Corporate Polo & Cotton T-Shirts",
      subtitle: "240 GSM combed cotton matty polos and crew necks with high-density logo embroidery and screen printing.",
      image: "/images/custom-cotton-tshirt.jpg",
    },
  };

  const activeHero = categoryHeroInfo[activeCatalogCategory] || categoryHeroInfo.all;

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased text-base">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-slate-700 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-semibold">{toastMessage}</p>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RESPONSIVE MOBILE NAVIGATION DRAWER (Slide-over with smooth animations)  */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer slide-over panel */}
          <div className="fixed inset-y-0 left-0 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div
                onClick={() => {
                  setSelectedProduct(null);
                  setIsEditorOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center cursor-pointer py-1"
                title="Incredible Treasures - Home"
              >
                <div className="relative h-10 w-44">
                  <Image
                    src="/images/logo-transparent.png"
                    alt="Incredible Treasures"
                    fill
                    sizes="176px"
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Omnibar Search */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search visiting cards, letterheads, mugs, packaging labels, t-shirts..."
                  className="w-full pl-10 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                {searchQuery.trim().length > 0 && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-slate-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Results inside Drawer */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-2 max-h-56 overflow-y-auto divide-y divide-slate-100 bg-white border border-slate-200 rounded-xl shadow-lg">
                  {searchResults.slice(0, 6).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setSearchQuery("");
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="p-2.5 flex items-center gap-3 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-10 h-10 relative rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <Image src={prod.image} alt={prod.title} fill sizes="40px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{prod.title}</div>
                        <div className="text-[10px] text-slate-400">{prod.startingPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scrollable Categories List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                Browse Catalog Categories
              </div>

              {[
                { id: "all", label: `All Products (${ALL_PRODUCTS.length} Items)`, icon: Layers, badge: "Curated" },
                { id: "visiting-cards", label: "Visiting Cards & Studio", icon: CreditCard, badge: "3D Studio" },
                { id: "letterheads", label: "Executive Letterheads (A4)", icon: FileText, badge: "Bond A4" },
                { id: "mugs", label: "Custom Printed Mugs", icon: Coffee, badge: "Ceramic" },
                { id: "labels", label: "Labels & Packaging", icon: Package, badge: "Stickers" },
                { id: "tshirts", label: "Corporate T-Shirts & Polos", icon: Shirt, badge: "Highline" },
              ].map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeCatalogCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCatalogCategory(cat.id);
                      setSelectedProduct(null);
                      setIsEditorOpen(false);
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 350, behavior: "smooth" });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-semibold transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-500"}`} />
                      <span>{cat.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                      {cat.badge}
                    </span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => {
                    selectProductById("gold-foil-cards", true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-bold text-xs shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Open 3D Visiting Card Studio
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setShowUploadModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-emerald-600" />
                    Upload Ready Print PDF
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Mobile Drawer Footer with Direct WhatsApp */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
              <a
                href="https://wa.me/919945039266?text=Hi%20Incredible%20Treasures,%20I%20would%20like%20a%20corporate%20printing%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Instant WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Brand Header with Omnibar, Sign In & Cart */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 sm:py-4 flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-1 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition focus:outline-none"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo (Official Client Identity) */}
          <div
            onClick={() => {
              setSelectedProduct(null);
              setIsEditorOpen(false);
              setActiveDropdown(null);
            }}
            className="flex items-center shrink-0 cursor-pointer group py-1"
            title="Incredible Treasures - Home"
          >
            <div className="relative h-11 sm:h-12 w-48 sm:w-56 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/images/logo-transparent.png"
                alt="Incredible Treasures"
                fill
                priority
                sizes="(max-width: 640px) 190px, 224px"
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Centered Omnibar Search with Instant Live Typeahead, Voice Search & Google Lens */}
          <div className="flex-1 max-w-2xl lg:max-w-3xl xl:max-w-4xl relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search visiting cards, letterheads, mugs, packaging labels, t-shirts..."
              className="w-full pl-11 pr-36 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3" />
            
            <div className="absolute right-2.5 top-1.5 flex items-center gap-1.5">
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full transition"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {/* Voice Search Button */}
              <button
                type="button"
                onClick={startVoiceSearch}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-full shadow-2xs transition group"
                title="Voice Search: Speak product name"
                aria-label="Voice Search"
              >
                <Mic className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-slate-600 group-hover:text-emerald-700 hidden lg:inline">Voice</span>
              </button>
              {/* Google Lens Visual Search Button */}
              <button
                type="button"
                onClick={() => setShowVisualSearchModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-full shadow-2xs transition group"
                title="Search by Image or PDF (Visual Lens)"
                aria-label="Visual Search by Image or PDF"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-slate-600 group-hover:text-emerald-700 hidden lg:inline">Lens</span>
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Matching Catalog Products ({searchResults.length})</span>
                  <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-700">Close</button>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No products matching &quot;{searchQuery}&quot;. Try searching &quot;visiting card&quot;, &quot;letterhead&quot;, &quot;ceramic mug&quot;, or &quot;t-shirt&quot;.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setSelectedProduct(prod);
                          setSearchQuery("");
                          setIsEditorOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3.5 transition group"
                      >
                        <div className="w-12 h-12 relative rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <Image src={prod.image} alt={prod.title} fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 truncate">{prod.title}</span>
                            {prod.badge && (
                              <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 truncate block">{prod.specs}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-slate-900 block">{prod.startingPrice}</span>
                          <span className="text-[10px] text-slate-400">MOQ: {prod.minQty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sign In & Cart Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Voice Search Button on Mobile */}
            <button
              type="button"
              onClick={startVoiceSearch}
              className="md:hidden p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition flex items-center justify-center"
              aria-label="Voice Search"
              title="Voice Search"
            >
              <Mic className="w-5 h-5" />
            </button>
            {/* Visual Search Lens Button on Mobile */}
            <button
              type="button"
              onClick={() => setShowVisualSearchModal(true)}
              className="md:hidden p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition flex items-center justify-center"
              aria-label="Visual Search by Image or PDF"
              title="Visual Search (Google Lens)"
            >
              <Camera className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Sign In Button beside Cart */}
            <button
              type="button"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-slate-200 hover:border-slate-300 transition cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Cart</span>
              <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

                {/* ========================================================================= */}
        {/* AUTOMATIC HOVER MEGA-DROPDOWNS BAR (DYNAMIC AUTO-ADJUSTING SPACING) */}
        {/* ========================================================================= */}
        <div
          className="border-t border-slate-100 bg-white relative"
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4 text-sm font-semibold text-slate-700 py-2.5 whitespace-nowrap overflow-x-auto no-scrollbar">
            {NAV_CATEGORIES.map((cat) => {
              const isOpen = activeDropdown === cat.id;
              return (
                <div
                  key={cat.id}
                  id={`nav-btn-${cat.id}`}
                  onMouseEnter={() => handleMenuMouseEnter(cat.id)}
                  onClick={() => setActiveDropdown(isOpen ? null : cat.id)}
                  className={`group flex items-center justify-center gap-2 cursor-pointer px-4 lg:px-6 py-2 rounded-xl transition-all duration-200 select-none ${
                    isOpen
                      ? "text-emerald-700 bg-emerald-50 font-bold shadow-xs border border-emerald-200/70"
                      : "hover:text-emerald-700 hover:bg-slate-50 font-semibold"
                  }`}
                >
                  <span className="tracking-tight">{cat.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 text-emerald-700"
                        : "text-slate-400 group-hover:text-emerald-700"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* DROPDOWN 1: VISITING CARDS                                                */}
          {/* ========================================================================= */}
          {activeDropdown === "visiting-cards" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("visiting-cards")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
                  {/* Col 1: PVC Cards (Essential & Metallic) */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      PVC Cards (400 Micron)
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-regular-glossy", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-bold text-slate-900 block w-full transition"
                        >
                          Regular Glossy PVC
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-regular-matt", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Regular Matt PVC
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-brushed-silver", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Brushed Silver PVC
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-rainbow", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Rainbow Holographic
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-transparent", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Transparent Frosted (1S)
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: PVC Luxury Specialty Finishes */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      PVC Luxury Finishes
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-glitter", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Gold / Silver Glitter PVC
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-embossed", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Embossed Visiting Card
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-matt-foiling", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Matt + Gold/Silver Foil
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("pvc-matt-spot-uv", false);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium block w-full transition"
                        >
                          Matt + Raised Spot UV
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: PVC Technical Specifications */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      400 Micron PVC Specs
                    </h4>
                    <ul className="space-y-2.5 text-slate-600 text-xs">
                      <li className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>400 Micron Heavy Polymer</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>100% Waterproof & Tearproof</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>2-Sided High Definition Print</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>2 Days Production Lead Time</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Tiers: 200, 500 & 1,000 Cards</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 4: Paper & Luxury Studio Cards */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Paper & Velvet Cards
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("gold-foil-cards", true)}
                          className="hover:text-emerald-700 text-left font-bold text-slate-900 flex items-center gap-1.5"
                        >
                          <span>3D Raised Gold Foil</span>
                          <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-black">HOT</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("visiting-cards", true)}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Executive Silk Matte Cards
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("royal-matte-cards", true)}
                          className="hover:text-emerald-700 text-left"
                        >
                          Royal Velvet Soft-Touch Cards
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer text-xs">350 & 400 GSM European Artboard</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer text-xs">Textured Linen & Pearl Stock</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Online Studio & Help */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Interactive Studio & Help
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("gold-foil-cards", true);
                            setActiveDropdown(null);
                          }}
                          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Open 3D Live Studio</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setShowUploadModal(true);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 font-medium"
                        >
                          Upload Ready Print File (PDF/AI)
                        </button>
                      </li>
                      <li>
                        <a
                          href="https://wa.me/919945039266"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-700 flex items-center gap-1.5 font-medium"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp Quote (+91 9945039266)</span>
                        </a>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer text-xs">Free Digital Proof in 30 mins</span></li>
                      <li className="pt-1">
                        <button
                          onClick={() => {
                            setActiveCatalogCategory("visiting-cards");
                            setActiveDropdown(null);
                          }}
                          className="font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
                        >
                          View Full Visiting Cards Grid →
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Featured Banner */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/pvc/card_pvc-regular-glossy.png" alt="PVC Visiting Card" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: 400 Micron PVC Visiting Card Suite</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Heavy 400 Micron tearproof polymer • 2-sided print • 2 days dispatch • Premium waterproof finish.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        selectProductById("pvc-regular-glossy", false);
                        setActiveDropdown(null);
                      }}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View PVC Cards →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <button onClick={() => { setActiveCatalogCategory("visiting-cards"); setActiveDropdown(null); }} className="font-bold text-slate-900 hover:text-emerald-700">
                      See All Visiting Cards
                    </button>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 2: LETTERHEADS                                                   */}
          {/* ========================================================================= */}
          {activeDropdown === "letterheads" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("letterheads")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
                  {/* Col 1: Bestseller Letterheads */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Bestseller Letterheads
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("official-letterheads");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-bold text-slate-900 flex items-center gap-1.5"
                        >
                          <span>Executive Bond Paper (A4)</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-black">TOP</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("premium-texture-letterheads");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Textured Cotton Letterheads
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("gold-crest-letterheads");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium flex items-center gap-1.5"
                        >
                          <span>Gold Foil Crest Letterheads</span>
                          <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-black">LUXURY</span>
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Corporate Clean Border A4</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Doctor / Clinic Prescription Pads</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Paper Stocks & Textures */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Paper Stocks & Textures
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">100 GSM Royal Executive Bond</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">120 GSM Fine Linen Textured Paper</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">100 GSM Super Natural Sunshine</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">120 GSM Alabaster Laid Paper</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Recycled Eco Kraft Stationery</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Print & Finishes */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Print & Finishes
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">High-Definition Offset Printing (2400 DPI)</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Stamped Metallic Gold / Silver Foil</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Subtle Security Watermark Impression</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Full Bleed Edge-to-Edge Print</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Laser & Desktop Inkjet Guaranteed</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Corporate Stationery Sets */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Corporate Stationery Sets
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Letterhead + Matching DL Envelope Combo</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Visiting Card + Letterhead Bundle</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Presentation Folder + Stationery Pack</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Executive Desk Pad & Memo Sheets</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Company Stamp + Letterhead Startup Kit</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Ordering & Fast Delivery */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Ordering & Logistics
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Minimum Order Qty: 100 pcs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Free Digital Soft-Proof in 30 Mins</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">24-48h Bangalore Express Dispatch</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Safe Shrink-Wrap Box Packaging</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Official Corporate Invoicing with ITC</span></li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Featured Banner */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/letterhead-suite.jpg" alt="Executive Letterhead Suite" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: Executive Bond Paper Official Letterheads (A4)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">100 GSM Royal Executive Bond paper, high-resolution laser printing, and crisp watermark finish.</p>
                    </div>
                    <button
                      onClick={() => {
                        selectProductById("official-letterheads");
                        setActiveDropdown(null);
                      }}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <button onClick={() => { setActiveCatalogCategory("letterheads"); setActiveDropdown(null); }} className="font-bold text-slate-900 hover:text-emerald-700">
                      See All Letterheads
                    </button>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 3: MUGS                                                          */}
          {/* ========================================================================= */}
          {activeDropdown === "mugs" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("mugs")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
                  {/* Col 1: Ceramic Coffee Mugs */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Ceramic Coffee Mugs
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("aquabot-ceramic-coffee-mug");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-bold text-slate-900 flex items-center gap-1.5"
                        >
                          <span>Two-Tone Ceramic Mugs (350ml)</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-black">TOP</span>
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Classic White Ceramic Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Inside-Colour Coffee Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Executive Matte Black Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Heart Handle Mugs</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Magic & Photo Mugs */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Magic & Photo Mugs
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Color Changing Magic Heat Mugs</span></li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("custom-photo-mug");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Full-Wrap Panoramic Photo Mugs
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Frosted Beer & Glass Coffee Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Dual-Side Logo Print Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalized Birthday & Festive Mugs</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Executive Ceramic Collections */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Executive Ceramic Mugs
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("white-classic-ceramic-mug");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Royal White Glazed Ceramic Mug (350ml)
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("matte-black-executive-mug");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Executive Matte Black Ceramic Mug (350ml)
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Dual-Tone Corporate Ceramic Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Gold Rim Royal Ceramic Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Ceramic Mug + Wooden Coaster Combo</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Print Techniques */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Branding Techniques
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sublimation 300 DPI Photo Print</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Precision Laser Logo Engraving</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Screen Printed Corporate Logo</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Scratch-Resistant Enamel Gloss</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Microwave & Dishwasher Safe</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Corporate Bulk Desk */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Corporate Orders
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Low MOQ Starting at 25 pcs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Individual Bubble-Pack Gift Box</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Mug + Coaster Executive Gift Sets</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Free Digital Proof in 30 mins</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">48h Bangalore Express Delivery</span></li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Featured Banner */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/catalog/drinkware/aquabot-ceramic-coffee-mug.jpg" alt="AquaBot Ceramic Mug" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: AquaBot Two-Tone Ceramic Mug (350ml)</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Grade-A ceramic with gloss enamel, full-color sublimation print, and individual gift packaging.</p>
                    </div>
                    <button
                      onClick={() => {
                        selectProductById("aquabot-ceramic-coffee-mug");
                        setActiveDropdown(null);
                      }}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <button onClick={() => { setActiveCatalogCategory("mugs"); setActiveDropdown(null); }} className="font-bold text-slate-900 hover:text-emerald-700">
                      See All Mugs
                    </button>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 3: LABELS & PACKAGING                                            */}
          {/* ========================================================================= */}
          {activeDropdown === "labels" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("labels")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
                  {/* Col 1: Stickers & Decals */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Stickers & Decals
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("custom-stickers-labels");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-bold text-slate-900 flex items-center gap-1.5"
                        >
                          <span>Die-Cut Vinyl Stickers</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-black">POPULAR</span>
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Round Logo Brand Decals</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Waterproof Vinyl Laptop Stickers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Clear Transparent Stickers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Metallic Gold / Silver Foil Stickers</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Product & Roll Labels */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Product & Roll Labels
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Roll Labels for Boxes & Packaging</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Food & Beverage Packaging Labels</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cosmetics & Health Product Labels</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Barcode & QR Code Asset Labels</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Tamper-Evident Security Seals</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Envelopes & Office Packaging */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Envelopes & Packaging
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("custom-envelopes");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-bold text-slate-900"
                        >
                          Custom Printed Envelopes (DL / C5)
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Self-Seal Peel Flap Envelopes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Rigid Product Boxes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Corrugated Mailing Boxes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Kraft Paper Shopping Bags</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Stamps & Marking */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Office Rubber Stamps
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("self-inking-stamps");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Pre-Inked Corporate Stamps
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Round Company Seal Stamps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Self-Inking Rectangular Address Stamps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Heavy Duty Date & Number Stamps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Stamp Replacement Ink Refills (Black, Blue, Red)</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Materials & Services */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Material Quality
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Weatherproof & Tear-Resistant</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Gloss & Matte Protective Lamination</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Self-Adhesive Branded Packaging Tape</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">300 DPI Pre-Flight Check</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Fast Dispatch Across India</span></li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Featured Banner */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/custom-stickers-labels.jpg" alt="Custom Stickers and Labels" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: Custom Die-Cut Vinyl Stickers & Labels</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Waterproof vinyl with precision contour cutting, glossy or matte finishes, and strong adhesive.</p>
                    </div>
                    <button
                      onClick={() => {
                        selectProductById("custom-stickers-labels");
                        setActiveDropdown(null);
                      }}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <button onClick={() => { setActiveCatalogCategory("labels"); setActiveDropdown(null); }} className="font-bold text-slate-900 hover:text-emerald-700">
                      See All Labels & Packaging
                    </button>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 4: T-SHIRTS                                                      */}
          {/* ========================================================================= */}
          {activeDropdown === "tshirts" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("tshirts")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
                  {/* Col 1: Polo T-Shirts */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Corporate Polo T-Shirts
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("highline-corporate-polo-suite");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-bold text-slate-900 flex items-center gap-1.5"
                        >
                          <span>Highline 240 GSM Bio-Washed Polo</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-black">POPULAR</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("embroidered-polo-tshirt");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Embroidered Pique Knit Polo
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Men's Corporate Team Polos</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Women's Corporate Fit Polos</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Tipping Collar Dual-Tone Polos</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Round Neck & Crew Neck */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Round Neck T-Shirts
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            selectProductById("custom-cotton-tshirt");
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          100% Combed Cotton Crew Neck (180 GSM)
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Heavyweight Premium 220 GSM Tees</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Dri-Fit Sports Polyester Tees</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Oversized Streetwear Corporate Tees</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Full Sleeves Cotton T-Shirts</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Customization Techniques */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Branding Techniques
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">High-Density Logo Embroidery</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">HD Silk Screen Printing</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Full Color DTF Digital Chest Print</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sublimation Active Wear Print</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sleeve & Back Neck Brand Tagging</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Corporate Uniforms */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Corporate Uniforms
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Pantone / Hex Color Matching</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">12+ Color Shades in Stock</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Size Range: S, M, L, XL, 2XL, 3XL</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pre-Shrunk & Colorfast Guarantee</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Doorstep Sizing Kit for Bangalore</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Bulk Orders */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Bulk Orders
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Low MOQ Starting at 25 pcs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Corporate Poly-Bag Packaging</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Free 3D Digital Mockup in 30 mins</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Computerized Tax Invoicing with ITC</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bangalore Express Hub 48h Dispatch</span></li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Featured Banner */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/catalog/apparel/highline-corporate-polo-suite.jpg" alt="Corporate Polo" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: Highline Premium 240 GSM Bio-Washed Polo</span>
                      </div>
                      <p className="text-[11px] text-slate-500">100% cotton matty with high-density logo embroidery and 12+ corporate color shades.</p>
                    </div>
                    <button
                      onClick={() => {
                        selectProductById("highline-corporate-polo-suite");
                        setActiveDropdown(null);
                      }}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <button onClick={() => { setActiveCatalogCategory("tshirts"); setActiveDropdown(null); }} className="font-bold text-slate-900 hover:text-emerald-700">
                      See All T-Shirts
                    </button>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CASE 1: USER HAS NOT SELECTED A PRODUCT -> SHOW PURE PRODUCT CATALOG     */}
      {/* ========================================================================= */}
      {selectedProduct === null && (
        <main className="w-full">
          {/* ========================================================================= */}
          {/* CINEMATIC FULL-WIDTH HERO BANNER (COMPLETE ONE-PAGE EDITORIAL STYLE)      */}
          {/* ========================================================================= */}
          <section
            onMouseEnter={() => setIsBannerPaused(true)}
            onMouseLeave={() => setIsBannerPaused(false)}
            aria-label="Featured Collections"
            className="w-full relative overflow-hidden bg-black h-[calc(100vh-120px)] min-h-[540px] max-h-[860px] flex items-center justify-center group"
          >
            {/* Carousel Slides (All 5 Categories Transitioning Smoothly) */}
            {HERO_BANNERS.map((banner, idx) => {
              const isActive = idx === activeBannerIndex;
              return (
                <div
                  key={banner.id}
                  className={`absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-14 lg:px-20 transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Full-Bleed Widescreen Background Photography */}
                  <Image
                    src={banner.image}
                    alt={`${banner.title} - Incredible Treasures`}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />

                  {/* Cinematic Dark Gradient Vignette for Razor-Sharp Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/40 pointer-events-none" />

                  {/* Centered Editorial Content */}
                  <div className="relative z-20 flex flex-col items-center text-center space-y-4 sm:space-y-5 max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white tracking-wide font-normal drop-shadow-2xl">
                      {banner.title}
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 tracking-wide font-light drop-shadow-md max-w-2xl mx-auto leading-relaxed">
                      {banner.subtitle}
                    </p>

                    {/* Clean Luxury Button */}
                    <div className="pt-2 sm:pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCatalogCategory(banner.category);
                          const gridEl = document.getElementById("catalog-grid");
                          if (gridEl) gridEl.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-block border border-white/80 bg-black/40 hover:bg-white hover:text-black hover:border-white text-white text-xs sm:text-sm tracking-[0.28em] uppercase font-bold px-10 py-3.5 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shadow-2xl"
                      >
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Previous Slide Button */}
            <button
              type="button"
              onClick={() => setActiveBannerIndex((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length)}
              aria-label="Previous Slide"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-white hover:text-black text-white shadow-2xl border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-75 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Slide Button */}
            <button
              type="button"
              onClick={() => setActiveBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length)}
              aria-label="Next Slide"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-white hover:text-black text-white shadow-2xl border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-75 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bottom Luxury Category Switcher Pills */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center px-4 pointer-events-none">
              <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl max-w-full overflow-x-auto no-scrollbar">
                {HERO_BANNERS.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setActiveBannerIndex(i)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition whitespace-nowrap cursor-pointer ${
                      i === activeBannerIndex
                        ? "bg-white text-black shadow-lg font-bold"
                        : "text-white/80 hover:text-white hover:bg-white/20"
                    }`}
                  >
                    {b.category === "visiting-cards"
                      ? "Visiting Cards"
                      : b.category === "letterheads"
                      ? "Letterheads"
                      : b.category === "mugs"
                      ? "Ceramic Mugs"
                      : b.category === "labels"
                      ? "Packaging & Labels"
                      : "Apparel & Polos"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main Catalog Container Below Hero */}
          <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            {/* Breadcrumb Navigation matching Vistaprint India */}
            <div className="text-xs sm:text-sm text-slate-500 mb-6 flex items-center gap-2 flex-wrap">
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span>Corporate Printing & Stationery</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900 font-bold">{HERO_BANNERS[activeBannerIndex]?.breadcrumb || "Custom Visiting Cards"}</span>
            </div>

            {/* All Products Displayed Downwards (Full Width) */}
            <div id="catalog-grid" className="space-y-5">
              {/* 1. HORIZONTAL PRODUCT OPTIONS TABS (The 5 Core Products + All) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: "all", label: "All Products", count: ALL_PRODUCTS.length, icon: Sparkles },
                  { id: "visiting-cards", label: "Visiting Cards", count: ALL_PRODUCTS.filter((p) => p.category === "visiting-cards").length, icon: CreditCard },
                  { id: "letterheads", label: "Executive Letterheads", count: ALL_PRODUCTS.filter((p) => p.category === "letterheads").length, icon: FileText },
                  { id: "mugs", label: "Custom Mugs", count: ALL_PRODUCTS.filter((p) => p.category === "mugs").length, icon: Coffee },
                  { id: "labels", label: "Labels & Packaging", count: ALL_PRODUCTS.filter((p) => p.category === "labels").length, icon: Package },
                  { id: "tshirts", label: "Corporate T-Shirts", count: ALL_PRODUCTS.filter((p) => p.category === "tshirts").length, icon: Shirt },
                ].map((cat) => {
                  const IconComp = cat.icon;
                  const isActive = activeCatalogCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCatalogCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                          : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 hover:border-slate-300"
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                      <span>{cat.label}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-bold ml-0.5 ${
                          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 2. REFINED FILTER & SORT TOOLBAR */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                {/* Left: Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1.5">
                    Price:
                  </span>
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "budget", label: "Under ₹250" },
                    { id: "mid", label: "₹250 – ₹600" },
                    { id: "premium", label: "₹600+" },
                    { id: "low-moq", label: "Low MOQ (≤25)" },
                  ].map((chip) => {
                      const isActive = priceFilter === chip.id;
                      return (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => setPriceFilter(chip.id)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition shrink-0 cursor-pointer ${
                            isActive
                              ? "bg-[#a9782b] text-white font-semibold shadow-xs"
                              : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
                          }`}
                        >
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Sort & Count */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="moq">Lowest MOQ</option>
                      </select>
                    </div>

                    <span className="text-xs font-medium text-slate-500">
                      Showing <strong className="text-slate-900">{filteredCatalog.length}</strong> items
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {filteredCatalog.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => selectProductById(prod.id, false)}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group relative cursor-pointer"
                    >
                      <div>
                        <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                          {prod.category === "visiting-cards" ? (
                            <VisitingCardCatalogPreview product={prod} name={customerName || "Mahi Kapoor"} />
                          ) : (
                            <Image
                              src={prod.image}
                              alt={prod.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}

                          {prod.badge && (
                            <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-amber-300 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 shadow-md z-10">
                              {prod.badge}
                            </span>
                          )}

                          {prod.sourceCatalog && (
                            <span className="absolute bottom-2.5 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md z-10 flex items-center gap-1">
                              <FileText className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate max-w-[130px]">{prod.sourceCatalog}</span>
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickViewProduct(prod);
                            }}
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 p-2 rounded-xl shadow-md transition z-10 opacity-90 group-hover:opacity-100 cursor-pointer"
                            title="Quick Specs Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="p-5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                            {prod.categoryName}
                          </div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
                            {prod.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {prod.specs}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[11px] text-slate-400 block">Starting at</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg font-black text-slate-900">{prod.startingPrice}</span>
                              <span className="text-[11px] text-slate-500">/ {prod.minQty}</span>
                            </div>
                            {prod.isGstIncluded ? (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80 inline-flex items-center gap-0.5 mt-0.5">
                                ✓ Rate Incl. 18% GST
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80 inline-flex items-center gap-0.5 mt-0.5">
                                + 18% GST Extra
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuickViewProduct(prod);
                              }}
                              className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              title="Technical Specs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Specs</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                selectProductById(prod.id, false);
                              }}
                              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <span>{prod.category === "visiting-cards" && !prod.isGstIncluded ? "Customise" : "Select"}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* ========================================================================= */}
            {/* DAY 3 SECTION 1: HOW IT WORKS (SIMPLE 3-STEP PRODUCTION FLOW)              */}
            {/* ========================================================================= */}
            <div className="mt-16 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/70">
                  Seamless Web-to-Print Experience
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How It Works in 3 Simple Steps
                </h2>
                <p className="text-sm text-slate-500">
                  From digital personalization to your doorstep across Bangalore and Pan-India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Select Product or Upload Artwork",
                    desc: "Choose from 34+ luxury curated items, or drag-and-drop your ready vector PDF/AI files directly.",
                    icon: UploadCloud,
                  },
                  {
                    step: "02",
                    title: "Live 3D Customization & DPI Check",
                    desc: "Real-time 3D card tilt and subsurface laser engraving proofing with automatic print-quality check.",
                    icon: Sliders,
                  },
                  {
                    step: "03",
                    title: "Factory Press & 48h Dispatch",
                    desc: "High-resolution 300 DPI vector fabrication in Yelahanka, Bangalore with computerized GST tax invoice.",
                    icon: Truck,
                  },
                ].map((stepItem, sIdx) => {
                  const StepIcon = stepItem.icon;
                  return (
                    <div key={sIdx} className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-2xs relative group hover:border-[#a9782b] transition">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#a9782b] flex items-center justify-center font-bold">
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 transition">
                          {stepItem.step}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">{stepItem.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{stepItem.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DAY 3 SECTION 2: BRAND TRUST & ENTERPRISE VALUE PILLARS                   */}
            {/* ========================================================================= */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "100% Quality Guaranteed",
                  desc: "Factory 300 DPI vector printing with strict zero-blur preflight check.",
                  icon: ShieldCheck,
                  badge: "Zero Defect",
                },
                {
                  title: "Bangalore Express Hub",
                  desc: "48-hour delivery across tech parks: Whitefield, Manyata & Electronic City.",
                  icon: Truck,
                  badge: "48h Dispatch",
                },
                {
                  title: "18% B2B GST Invoicing",
                  desc: "Automated proforma invoice with GSTIN validation for instant Input Tax Credit.",
                  icon: FileCheck2,
                  badge: "GSTIN Ready",
                },
                {
                  title: "Doorstep Physical Samples",
                  desc: "Touch velvet cardstock, laser engraved metal pens and K9 glass before bulk order.",
                  icon: Package,
                  badge: "Sample Kit",
                },
              ].map((pillar, pIdx) => {
                const PillarIcon = pillar.icon;
                return (
                  <div key={pIdx} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                          <PillarIcon className="w-4 h-4 text-[#a9782b]" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {pillar.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{pillar.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================================================================= */}
            {/* DAY 3 SECTION 3: VERIFIED CLIENT REVIEWS & SOCIAL PROOF                   */}
            {/* ========================================================================= */}
            <div className="mt-16 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a9782b] block mb-1">
                    Client Testimonials & Feedback
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Trusted by 500+ Indian Enterprises
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <span className="text-amber-500 font-bold">★★★★★</span>
                  <span className="font-bold text-slate-800">4.9 / 5.0</span>
                  <span>(380+ Verified B2B Reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    company: "Swiggy Corporate Events",
                    location: "Bengaluru",
                    text: "The K9 optical crystal trophies with 3D subsurface laser engraving were breathtaking for our annual awards. Dispatch was prompt within 48h.",
                    author: "Pooja Hegde",
                    role: "People & Culture Lead",
                  },
                  {
                    company: "Razorpay Fintech Hub",
                    location: "Koramangala, Bengaluru",
                    text: "Raised gold foil visiting cards on 400 GSM velvet cardstock are unbeatable. The 3D live proofing matched the physical cards 100%.",
                    author: "Karan Johar",
                    role: "VP Brand & Design",
                  },
                  {
                    company: "Ather Energy",
                    location: "Indiranagar, Bengaluru",
                    text: "Our custom branded ceramic coffee mugs and Highline matty polo shirts for employee onboarding were delivered with full GST compliance.",
                    author: "Sunil Rao",
                    role: "Operations Manager",
                  },
                ].map((review, rIdx) => (
                  <div key={rIdx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between">
                    <div>
                      <div className="text-amber-500 text-xs mb-3">★★★★★</div>
                      <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{review.author}</span>
                        <span className="text-[10px] text-slate-500 block">{review.role} • {review.company}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DAY 3 SECTION 4: B2B BULK CORPORATE ASSISTANCE BANNER                     */}
            {/* ========================================================================= */}
            <div className="mt-12 rounded-3xl bg-gradient-to-r from-slate-950 via-[#261b0d] to-slate-950 border border-emerald-500/30 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="space-y-3 max-w-xl relative z-10 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold border border-white/15">
                  Direct Manufacturing Desk • Yelahanka, Bengaluru
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Planning Bulk Corporate Gifts for 50+ Team Members?
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Get a free 3D digital mockup within 30 minutes, tiered volume pricing discounts, and doorstep sample kit dispatch in Bangalore.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
                <a
                  href="https://wa.me/919945039266?text=Hi%20Incredible%20Treasures,%20I%20need%20a%20bulk%20quote%20for%2050%2B%20corporate%20items."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Bulk Desk (+91 9945039266)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  <span>Upload Your Artwork</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* CASE 2: USER SELECTED A PRODUCT -> OPEN FREE SAMPLE DESIGNS & STUDIO      */}
      {/* ========================================================================= */}
      {selectedProduct !== null && (
        <main className="py-8 bg-slate-50/50 min-h-screen">
          <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Top Navigation & Breadcrumbs */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsEditorOpen(false);
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to All Products</span>
              </button>

              <div className="text-sm text-slate-500 flex items-center gap-2 flex-wrap">
                <span>Products</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-600">{selectedProduct.categoryName}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="font-extrabold text-slate-900">{selectedProduct.title}</span>
              </div>
            </div>

            {/* Product Title Bar & Dual Mode Switcher Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {selectedProduct.categoryName}
                    </span>
                    {selectedProduct.badge && (
                      <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        {selectedProduct.badge}
                      </span>
                    )}
                    {selectedProduct.isGstIncluded && (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300">
                        ✓ Rate Includes 18% GST
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {selectedProduct.title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {selectedProduct.specs}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {/* Tab Selector: Studio vs High-Res Photo Gallery */}
                  <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setProductViewTab("studio")}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                        productViewTab === "studio"
                          ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Sliders className="w-4 h-4 text-emerald-600" />
                      <span>Live Dual Studio (Front + Back)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductViewTab("photo")}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                        productViewTab === "photo"
                          ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Eye className="w-4 h-4 text-slate-600" />
                      <span>Studio Gallery & Specs</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4 text-emerald-600" />
                    <span>Upload Ready PDF / AI</span>
                  </button>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            {productViewTab === "studio" ? (
              /* ========================================================================= */
              /* TAB 1: DUAL-SIDE LIVE STUDIO (FRONT + BACK PREVIEW IN SAME GRID EKSATH)   */
              /* ========================================================================= */
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* LEFT / CENTER (7 COLUMNS): REAL-TIME DUAL-SIDE CANVAS & UPLOAD CONTROLS (STICKY IN VIEWPORT) */}
                <div className="xl:col-span-7 xl:sticky xl:top-24 space-y-4">
                  {/* Top Bar for Canvas */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
                        Real-Time Dual-Side Proofing
                      </span>
                      <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                        Front (Side A) & Back (Side B) Displayed Together
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedProduct.category === "visiting-cards" && (
                        <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-300 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => setCardOrientation("horizontal")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                              cardOrientation === "horizontal"
                                ? "bg-white text-emerald-700 shadow-2xs font-extrabold"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span>Horizontal</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCardOrientation("vertical")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                              cardOrientation === "vertical"
                                ? "bg-white text-emerald-700 shadow-2xs font-extrabold"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span>Vertical</span>
                          </button>
                        </div>
                      )}

                      {selectedProduct.category === "visiting-cards" && (
                        <button
                          type="button"
                          onClick={() => setCornerStyle(cornerStyle === "square" ? "rounded" : "square")}
                          className="text-xs text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 font-bold transition cursor-pointer"
                        >
                          Corners: <strong className="capitalize">{cornerStyle}</strong>
                        </button>
                      )}

                      {(uploadedFrontArtwork || uploadedBackArtwork || uploadedLogo) && (
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedFrontArtwork(null);
                            setUploadedBackArtwork(null);
                            setUploadedFrontName(null);
                            setUploadedBackName(null);
                            setUploadedLogo(null);
                            setToastMessage("All custom uploaded artwork & logos reset.");
                            setTimeout(() => setToastMessage(null), 3000);
                          }}
                          className="text-xs text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Reset Proof</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* DUAL CANVAS CONTAINER: FRONT & BACK SIDE-BY-SIDE IN SAME GRID */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-300 border border-slate-300 shadow-inner">
                    <div className={`grid grid-cols-1 ${
                      cardOrientation === "vertical"
                        ? "sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
                        : "md:grid-cols-2 gap-6"
                    } items-stretch`}>
                      
                      {/* ======================================================== */}
                      {/* 1. FRONT SIDE (SIDE A) PREVIEW                           */}
                      {/* ======================================================== */}
                      <div className="space-y-3 flex flex-col">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                              FRONT SIDE (Side A)
                            </span>
                            {uploadedFrontArtwork && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Custom Artwork Active
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="file"
                              ref={frontArtworkInputRef}
                              onChange={handleFrontArtworkUpload}
                              accept="image/*,.pdf"
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => frontArtworkInputRef.current?.click()}
                              className="text-[11px] font-bold text-slate-700 hover:text-emerald-700 bg-white hover:bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-300 transition shadow-2xs flex items-center gap-1 cursor-pointer"
                            >
                              <UploadCloud className="w-3 h-3 text-emerald-600" />
                              <span>{uploadedFrontArtwork ? "Replace" : "Upload Front"}</span>
                            </button>
                            {uploadedFrontArtwork && (
                              <button
                                type="button"
                                onClick={() => {
                                  setUploadedFrontArtwork(null);
                                  setUploadedFrontName(null);
                                }}
                                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-white p-1 rounded-lg border border-slate-300 cursor-pointer"
                                title="Remove Front Artwork"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Front Canvas Body */}
                        <div className="flex-1 flex items-center justify-center p-2">
                          <div
                            className={`relative w-full ${
                              cardOrientation === "vertical"
                                ? "max-w-[270px] sm:max-w-[290px] aspect-[1/1.65] mx-auto"
                                : "aspect-[1.65/1]"
                            } ${
                              cornerStyle === "rounded" ? "rounded-2xl" : "rounded-sm"
                            } shadow-2xl transition-all duration-300 overflow-hidden border border-black/15 flex flex-col justify-between`}
                          >
                            {uploadedFrontArtwork ? (
                              <img
                                src={uploadedFrontArtwork}
                                alt="Custom Front Artwork"
                                className="w-full h-full object-cover"
                              />
                            ) : selectedProduct.id === "pvc-regular-glossy" ? (
                              /* 1. PVC Regular Glossy Front */
                              cardOrientation === "vertical" ? (
                                /* Vertical (Portrait) Layout */
                                <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
                                  {/* Top Header Banner */}
                                  <div className="h-[36%] bg-gradient-to-br from-[#A81D24] via-[#851117] to-[#1E232A] p-3.5 text-white flex items-center justify-between relative shrink-0">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-slate-950 text-sm shrink-0 shadow-2xs">
                                        {companyName ? companyName.charAt(0).toUpperCase() : "I"}
                                      </div>
                                      <div className="min-w-0">
                                        {showFront("companyName") && (
                                          <div className="text-xs font-black tracking-tight leading-tight uppercase truncate">
                                            {companyName || "INCREDIBLE TREASURES"}
                                          </div>
                                        )}
                                        <div className="text-[7.5px] text-amber-200/90 font-semibold tracking-wider uppercase">
                                          400 Micron Glossy PVC
                                        </div>
                                      </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                                  </div>

                                  {/* Bottom Body */}
                                  <div className="flex-1 p-3.5 flex flex-col justify-between bg-white">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-xs">
                                        {uploadedLogo ? (
                                          <img src={uploadedLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                                        ) : (
                                          <img src="/images/pvc/card_pvc-regular-glossy.png" alt="Profile" className="w-full h-full object-cover" />
                                        )}
                                      </div>
                                      <div className="min-w-0">
                                        {showFront("customerName") && (
                                          <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
                                            {customerName || "Mahi Kapoor"}
                                          </div>
                                        )}
                                        {showFront("customerDesignation") && (
                                          <div className="text-[10px] font-bold text-slate-500 truncate">
                                            {customerDesignation || "Managing Director"}
                                          </div>
                                        )}
                                        {!showFront("customerName") && !showFront("customerDesignation") && (
                                          <div className="text-[10px] font-bold text-emerald-700 truncate">
                                            Premium PVC Member
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Contact Details Stack */}
                                    <div className="space-y-1.5 text-[9px] text-slate-600 font-medium border-t border-slate-100 pt-2">
                                      {showFront("phone") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span>{phone || "+91 99450 39266"}</span>
                                        </div>
                                      )}
                                      {showFront("email") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <Mail className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span className="truncate">{email || "contact@incredible-treasures.com"}</span>
                                        </div>
                                      )}
                                      {showFront("website") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <ExternalLink className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span className="truncate">{website || "www.incredible-treasures.com"}</span>
                                        </div>
                                      )}
                                      {showFront("address") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span className="truncate">{address || "Bengaluru, Karnataka"}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                /* Horizontal (Landscape) Layout */
                                <div className="relative w-full h-full bg-white flex overflow-hidden">
                                  <div className="w-[58%] p-3.5 sm:p-4 flex flex-col justify-between z-10">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-xs">
                                        {uploadedLogo ? (
                                          <img src={uploadedLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                                        ) : (
                                          <img src="/images/pvc/card_pvc-regular-glossy.png" alt="Profile" className="w-full h-full object-cover" />
                                        )}
                                      </div>
                                      <div className="min-w-0">
                                        {showFront("customerName") && (
                                          <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
                                            {customerName || "Mahi Kapoor"}
                                          </div>
                                        )}
                                        {showFront("customerDesignation") && (
                                          <div className="text-[10px] font-bold text-slate-500 truncate">
                                            {customerDesignation || "Creative Director"}
                                          </div>
                                        )}
                                        {!showFront("customerName") && !showFront("customerDesignation") && (
                                          <div className="text-[10px] font-bold text-emerald-700 truncate">
                                            Premium PVC Member
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="space-y-0.5 text-[9px] sm:text-[10px] text-slate-600 font-medium">
                                      {showFront("phone") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span>{phone || "+91 9001-4546"}</span>
                                        </div>
                                      )}
                                      {showFront("email") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <Mail className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span>{email || "name@company.com"}</span>
                                        </div>
                                      )}
                                      {showFront("address") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span>{address || "Bengaluru, Karnataka"}</span>
                                        </div>
                                      )}
                                      {showFront("website") && (
                                        <div className="flex items-center gap-1.5 truncate">
                                          <ExternalLink className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                          <span>{website || "www.company.com"}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="w-[42%] bg-gradient-to-br from-[#A81D24] via-[#851117] to-[#1E232A] p-3 sm:p-4 text-white flex flex-col justify-between relative">
                                    <div className="space-y-1">
                                      {showFront("companyName") ? (
                                        <>
                                          <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xs">
                                            {companyName.charAt(0) || "S"}
                                          </div>
                                          <div className="text-xs sm:text-sm font-black tracking-tight leading-tight uppercase">
                                            {companyName || "SQUARE DESIGN"}
                                          </div>
                                        </>
                                      ) : (
                                        <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xs">
                                          IT
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-[8px] sm:text-[9px] text-amber-200/90 font-semibold tracking-widest uppercase">
                                      400 Micron Glossy PVC
                                    </div>
                                  </div>
                                  <div className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                                </div>
                              )
                            ) : selectedProduct.id === "pvc-regular-matt" ? (
                              /* 2. PVC Regular Matt Front */
                              <div className="w-full h-full bg-gradient-to-br from-[#2D124D] via-[#431B6E] to-[#1E0B36] text-white p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-fuchsia-600/30 blur-xl pointer-events-none" />
                                <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />
                                <div className="relative z-10 flex justify-between items-start">
                                  <div>
                                    {showFront("companyName") && (
                                      <div className="text-sm sm:text-base font-serif italic text-white/95">
                                        {companyName || "Discount voucher"}
                                      </div>
                                    )}
                                    <div className="text-[10px] text-fuchsia-300 font-bold uppercase tracking-wider">
                                      Corporate Privilege
                                    </div>
                                  </div>
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-8 h-8 object-contain rounded bg-white/20 p-1" />
                                  ) : (
                                    <Sparkles className="w-5 h-5 text-amber-300" />
                                  )}
                                </div>
                                <div className="relative z-10 space-y-0.5">
                                  {showFront("customerName") && (
                                    <div className="text-xs sm:text-sm font-black text-white">
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  <div className="text-[10px] text-amber-300 font-semibold flex items-center gap-1.5 flex-wrap">
                                    {showFront("customerDesignation") && <span>{customerDesignation || "VIP Cardholder"}</span>}
                                    {showFront("phone") && <span>• {phone}</span>}
                                    {showFront("email") && <span>• {email}</span>}
                                  </div>
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-brushed-silver" ? (
                              /* 3. PVC Brushed Silver Front */
                              <div className="w-full h-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 text-slate-900 p-3.5 sm:p-4 flex flex-col justify-between border border-slate-400/60 relative overflow-hidden">
                                <div className="flex items-center justify-between border-b border-slate-400/40 pb-2">
                                  <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0" />
                                    <div className="min-w-0">
                                      {showFront("companyName") && (
                                        <div className="text-[11px] sm:text-xs font-black tracking-tight uppercase leading-tight truncate">
                                          {companyName || "WISDOM OAK ENGLISH SCHOOL"}
                                        </div>
                                      )}
                                      <div className="text-[8px] text-slate-600 font-bold tracking-widest uppercase">
                                        Official Identification
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-[9px] font-black text-slate-700 bg-white/80 px-1.5 py-0.5 rounded border border-slate-300 shrink-0">
                                    RFID
                                  </span>
                                </div>
                                {cardOrientation === "vertical" ? (
                                  <div className="flex flex-col items-center text-center py-2 space-y-1.5">
                                    <div className="w-16 h-18 bg-white rounded border border-slate-400 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                                      {uploadedLogo ? (
                                        <img src={uploadedLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                                      ) : (
                                        <img src="/images/pvc/card_pvc-brushed-silver.png" alt="ID" className="w-full h-full object-cover" />
                                      )}
                                    </div>
                                    <div className="space-y-0.5 text-[9px] text-slate-800 font-semibold w-full">
                                      {showFront("customerName") && <div className="text-xs font-black text-slate-950 truncate">{customerName || "Mahi Kapoor"}</div>}
                                      {showFront("customerDesignation") && <div className="text-[9.5px] font-bold text-slate-600 truncate">{customerDesignation || "Class IX A"}</div>}
                                      <div className="pt-1.5 space-y-0.5 text-[8.5px] text-left border-t border-slate-300/80 mt-1">
                                        {showFront("phone") && <div className="truncate">Emergency: <span>{phone}</span></div>}
                                        {showFront("email") && <div className="truncate">Email: <span>{email}</span></div>}
                                        {showFront("address") && <div className="truncate">Address: <span>{address}</span></div>}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3 py-1">
                                    <div className="w-12 h-14 bg-white rounded border border-slate-400 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                                      {uploadedLogo ? (
                                        <img src={uploadedLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                                      ) : (
                                        <img src="/images/pvc/card_pvc-brushed-silver.png" alt="ID" className="w-full h-full object-cover" />
                                      )}
                                    </div>
                                    <div className="space-y-0.5 text-[9px] sm:text-[10px] text-slate-800 font-semibold">
                                      {showFront("customerName") && <div>Name: <strong className="text-slate-950 font-black">{customerName || "Mahi Kapoor"}</strong></div>}
                                      {showFront("customerDesignation") && <div>Role/Class: <span>{customerDesignation || "Class IX A"}</span></div>}
                                      {showFront("phone") && <div>Emergency: <span>{phone}</span></div>}
                                      {showFront("address") && <div className="truncate max-w-[150px]">Address: <span>{address}</span></div>}
                                      {showFront("email") && <div className="truncate max-w-[150px]">Email: <span>{email}</span></div>}
                                    </div>
                                  </div>
                                )}
                                <div className="text-[8px] text-slate-500 font-mono tracking-widest text-center sm:text-left">
                                  BRUSHED METALLIC SILVER 400 MICRON
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-rainbow" ? (
                              /* 4. PVC Rainbow Holographic Front */
                              <div className="w-full h-full bg-gradient-to-tr from-[#FFD1DC] via-[#FFE4B5] via-[#D1E8E2] to-[#E6E6FA] text-slate-900 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
                                <div className="flex items-center justify-between">
                                  <div>
                                    {showFront("customerName") && (
                                      <div className="text-xs sm:text-sm font-black text-slate-900">
                                        {customerName || "Mahi Kapoor"}
                                      </div>
                                    )}
                                    {showFront("customerDesignation") && (
                                      <div className="text-[10px] font-bold text-emerald-800">
                                        {customerDesignation || "Manager"}
                                      </div>
                                    )}
                                  </div>
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-8 h-8 object-contain rounded bg-white/40 p-1" />
                                  ) : (
                                    <Utensils className="w-5 h-5 text-amber-700" />
                                  )}
                                </div>
                                <div className="text-center py-1">
                                  {showFront("companyName") && (
                                    <div className="text-sm sm:text-base font-black tracking-wide text-slate-950 uppercase">
                                      {companyName || "NAVEEN'S DELIGHTS"}
                                    </div>
                                  )}
                                  <div className="text-[9px] font-bold text-amber-900">
                                    South Indian Pure Veg & Hospitality
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-[9px] font-semibold text-slate-700 pt-1 border-t border-slate-900/10">
                                  {showFront("phone") && <span>{phone}</span>}
                                  {showFront("website") && <span className="truncate max-w-[140px]">{website || "www.naveensdosa.com"}</span>}
                                  {showFront("email") && <span className="truncate max-w-[140px]">{email}</span>}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-transparent" ? (
                              /* 5. PVC Transparent Clear Frosted Front */
                              <div className="w-full h-full bg-white/60 backdrop-blur-md text-slate-900 p-4 sm:p-5 flex flex-col justify-between border-2 border-white/80 relative overflow-hidden shadow-inner">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 to-indigo-500" />
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-400 via-amber-400 to-red-500" />
                                <div className="pt-1">
                                  {showFront("customerName") && (
                                    <div className="text-sm sm:text-base font-black tracking-wider text-slate-950 uppercase">
                                      {customerName?.toUpperCase() || "MAHI KAPOOR"}
                                    </div>
                                  )}
                                  {showFront("customerDesignation") && (
                                    <div className="text-[10px] font-extrabold text-slate-700 tracking-wider uppercase">
                                      {customerDesignation || "DIRECTOR - OPERATIONS"}
                                    </div>
                                  )}
                                </div>
                                <div className="py-1">
                                  {showFront("companyName") && (
                                    <div className="text-xs font-black text-slate-900">
                                      {companyName || "INCREDIBLE TREASURES"}
                                    </div>
                                  )}
                                  <div className="text-[9px] text-slate-600 font-medium">
                                    400 Micron Frosted Crystal Substrate
                                  </div>
                                </div>
                                <div className="space-y-0.5 text-[9px] font-bold text-slate-800 pb-1">
                                  {showFront("phone") && <div>Cell: {phone}</div>}
                                  {showFront("email") && <div className="truncate">Email: {email}</div>}
                                  {showFront("website") && <div className="truncate">Web: {website}</div>}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-glitter" ? (
                              /* 6. PVC Glitter Front */
                              <div className="w-full h-full bg-gradient-to-tr from-[#DEBA78] via-[#F4E0A5] to-[#D5A754] text-slate-950 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
                                <div className="bg-white/95 rounded-xl p-3 shadow-md border border-amber-300">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      {showFront("companyName") && (
                                        <div className="text-xs sm:text-sm font-black text-slate-900">
                                          {companyName || "CREATIVE MIND"}
                                        </div>
                                      )}
                                      <div className="text-[10px] font-bold text-amber-800">
                                        Artist Director Suite
                                      </div>
                                    </div>
                                    {uploadedLogo ? (
                                      <img src={uploadedLogo} alt="Logo" className="w-7 h-7 object-contain" />
                                    ) : (
                                      <Sparkles className="w-4 h-4 text-amber-600" />
                                    )}
                                  </div>
                                  {showFront("customerName") && (
                                    <div className="mt-2 text-xs font-black text-slate-950">
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  {showFront("customerDesignation") && (
                                    <div className="text-[10px] font-bold text-amber-900">
                                      {customerDesignation || "Design Director"}
                                    </div>
                                  )}
                                </div>
                                <div className="text-[9px] font-bold text-slate-900 flex justify-between items-center">
                                  {showFront("phone") && <span>{phone}</span>}
                                  {showFront("email") && <span>{email}</span>}
                                  {showFront("website") && <span>{website}</span>}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-embossed" ? (
                              /* 7. PVC Embossed Characters Front */
                              <div className="w-full h-full bg-slate-50 text-slate-900 p-4 sm:p-5 flex flex-col justify-between border border-slate-300 relative shadow-inner">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-red-600 tracking-wider">IDJET</span>
                                    <span className="text-[10px] font-bold text-slate-600">RFID )))</span>
                                  </div>
                                  <span className="text-[9px] font-black text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
                                    SMART CHIP
                                  </span>
                                </div>
                                <div className="py-1">
                                  {showFront("customerName") && (
                                    <div className="text-xs sm:text-sm font-black tracking-widest uppercase text-slate-800 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
                                      {customerName?.toUpperCase() || "MAHI KAPOOR"}
                                    </div>
                                  )}
                                  {showFront("customerDesignation") && (
                                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-600 drop-shadow-[1px_1px_0px_rgba(255,255,255,0.8)]">
                                      {customerDesignation || "MANAGING DIRECTOR"}
                                    </div>
                                  )}
                                  {showFront("companyName") && (
                                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-800 mt-0.5">
                                      {companyName || "SMART ENTERPRISES"}
                                    </div>
                                  )}
                                </div>
                                <div className="text-[9px] font-mono text-slate-700 flex justify-between">
                                  {showFront("phone") && <span>{phone}</span>}
                                  {showFront("website") && <span>{website || "www.smart.com"}</span>}
                                  {showFront("email") && <span>{email}</span>}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-matt-foiling" ? (
                              /* 8. PVC Matt + Foiling Front */
                              <div className="w-full h-full bg-[#121214] text-white p-4 sm:p-5 flex flex-col justify-between border border-neutral-800 relative">
                                <div className="flex items-center justify-between">
                                  <div className="w-8 h-8 rounded-full border border-amber-300/60 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-amber-300" />
                                  </div>
                                  <span className="text-[9px] font-serif font-black tracking-widest uppercase text-amber-300">
                                    METALLIC HOT FOIL
                                  </span>
                                </div>
                                <div>
                                  {showFront("customerName") && (
                                    <div className="text-sm sm:text-base font-serif font-black tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                                      {customerName?.toUpperCase() || "MAHI KAPOOR"}
                                    </div>
                                  )}
                                  {showFront("customerDesignation") && (
                                    <div className="text-[10px] font-serif tracking-widest text-amber-200/80 uppercase">
                                      {customerDesignation || "LONDON BESPOKE DIRECT"}
                                    </div>
                                  )}
                                  {showFront("companyName") && (
                                    <div className="text-xs font-bold text-neutral-300 mt-1">
                                      {companyName || "EARNAMTH LUXURY"}
                                    </div>
                                  )}
                                </div>
                                <div className="text-[9px] text-neutral-400 font-mono flex justify-between">
                                  {showFront("phone") && <span>{phone}</span>}
                                  {showFront("email") && <span>{email}</span>}
                                  {showFront("website") && <span>{website}</span>}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-matt-spot-uv" ? (
                              /* 9. PVC Matt + Spot UV Front */
                              <div className="w-full h-full bg-[#C79A3B] text-slate-900 p-4 sm:p-5 flex flex-col justify-between border border-[#A67E28] relative">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-black uppercase tracking-widest bg-black/20 text-slate-950 px-2 py-0.5 rounded">
                                    RAISED 3D SPOT UV
                                  </span>
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-7 h-7 object-contain" />
                                  ) : (
                                    <Trophy className="w-5 h-5 text-slate-950" />
                                  )}
                                </div>
                                <div className="text-center py-1">
                                  {showFront("companyName") && (
                                    <div className="text-base sm:text-lg font-serif font-black tracking-tight text-slate-950">
                                      {companyName || "Allen Solly"}
                                    </div>
                                  )}
                                  {showFront("customerName") && (
                                    <div className="text-[10px] font-bold text-slate-900 tracking-wider">
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                </div>
                                <div className="text-[9px] font-bold text-slate-900 flex justify-between">
                                  {showFront("phone") && <span>{phone}</span>}
                                  {showFront("customerDesignation") && <span>{customerDesignation || "Official Store"}</span>}
                                  {showFront("email") && <span>{email}</span>}
                                </div>
                              </div>
                            ) : selectedProduct.category === "mugs" ? (
                              /* Mug Front Mockup */
                              <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-4 relative">
                                <div className="w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-2xl border-4 border-slate-300 shadow-xl flex flex-col items-center justify-center p-3 text-center relative">
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-10 h-10 object-contain mb-1" />
                                  ) : (
                                    <Coffee className="w-7 h-7 text-emerald-600 mb-1" />
                                  )}
                                  {showFront("companyName") && (
                                    <div className="text-[10px] font-black text-slate-900 leading-tight truncate w-full">
                                      {companyName || "Corporate Mug"}
                                    </div>
                                  )}
                                  {showFront("customerName") && (
                                    <div className="text-[8px] text-slate-500 font-bold mt-0.5">
                                      {customerName || "Full Color Print"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.category === "tshirts" ? (
                              /* T-Shirt Front Chest Mockup */
                              <div className="w-full h-full bg-slate-800 text-white flex flex-col items-center justify-center p-4 relative">
                                <div className="text-center space-y-1">
                                  <div className="text-[9px] uppercase tracking-widest text-slate-400">
                                    Left Chest Embroidery
                                  </div>
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-8 h-8 object-contain mx-auto" />
                                  ) : (
                                    <Shirt className="w-6 h-6 text-emerald-400 mx-auto" />
                                  )}
                                  {showFront("companyName") && (
                                    <div className="text-xs font-black text-white">
                                      {companyName || "Corporate Team"}
                                    </div>
                                  )}
                                  {showFront("customerName") && (
                                    <div className="text-[10px] font-semibold text-emerald-300">
                                      {customerName}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.category === "letterheads" ? (
                              /* Letterhead Front A4 Mockup */
                              <div className="w-full h-full bg-white p-3 sm:p-4 text-slate-900 flex flex-col justify-between border border-slate-200">
                                <div className="flex items-center justify-between border-b border-emerald-600 pb-1.5">
                                  {showFront("companyName") && (
                                    <div className="text-xs font-black text-emerald-800">
                                      {companyName || "Incredible Treasures"}
                                    </div>
                                  )}
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-6 h-6 object-contain" />
                                  ) : (
                                    <FileText className="w-4 h-4 text-emerald-600" />
                                  )}
                                </div>
                                <div className="space-y-1 py-1 text-[8px] text-slate-400 leading-tight">
                                  <div className="h-1 bg-slate-200 rounded w-full" />
                                  <div className="h-1 bg-slate-100 rounded w-5/6" />
                                  <div className="h-1 bg-slate-100 rounded w-4/6" />
                                </div>
                                <div className="text-[8px] text-slate-500 flex justify-between border-t border-slate-100 pt-1">
                                  {showFront("phone") && <span>{phone}</span>}
                                  {showFront("address") && <span>{address}</span>}
                                </div>
                              </div>
                            ) : selectedProduct.category === "labels" ? (
                              /* Labels Front Mockup */
                              <div className="w-full h-full bg-amber-50 p-4 text-slate-900 flex flex-col items-center justify-center text-center border-2 border-dashed border-amber-300">
                                {uploadedLogo ? (
                                  <img src={uploadedLogo} alt="Logo" className="w-8 h-8 object-contain mb-1" />
                                ) : (
                                  <Package className="w-6 h-6 text-amber-700 mb-1" />
                                )}
                                {showFront("companyName") && (
                                  <div className="text-xs font-black text-slate-900">
                                    {companyName || "Premium Product Label"}
                                  </div>
                                )}
                                <div className="text-[9px] text-slate-600 font-semibold mt-0.5">
                                  {showFront("customerName") ? customerName : "Net Wt. 250g • Batch #409"}
                                </div>
                              </div>
                            ) : (
                              /* Default / Template Visiting Card Front */
                              <div className={`w-full h-full ${currentTemplate.bgStyle} p-4 sm:p-5 flex flex-col justify-between`}>
                                <div className="flex justify-between items-start">
                                  <div>
                                    {showFront("companyName") && (
                                      <div className={`text-xs sm:text-sm font-black ${currentTemplate.textColor}`}>
                                        {companyName || "Your Company"}
                                      </div>
                                    )}
                                    <div className={`text-[9px] font-bold uppercase tracking-wider ${currentTemplate.subColor}`}>
                                      Corporate Solutions
                                    </div>
                                  </div>
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-7 h-7 object-contain" />
                                  ) : (
                                    <Leaf className={`w-5 h-5 ${currentTemplate.accentColor}`} />
                                  )}
                                </div>
                                <div>
                                  {showFront("customerName") && (
                                    <div className={`text-xs sm:text-sm font-black ${currentTemplate.textColor}`}>
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  {showFront("customerDesignation") && (
                                    <div className={`text-[10px] font-bold ${currentTemplate.accentColor}`}>
                                      {customerDesignation || "Designation"}
                                    </div>
                                  )}
                                </div>
                                <div className={`text-[8px] sm:text-[9px] space-y-0.5 ${currentTemplate.subColor} font-medium border-t border-black/10 pt-1`}>
                                  {showFront("phone") && <div>Phone: {phone}</div>}
                                  {showFront("email") && <div className="truncate">Email: {email}</div>}
                                  {showFront("website") && <div className="truncate">Web: {website}</div>}
                                  {showFront("address") && <div className="truncate">Addr: {address}</div>}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ======================================================== */}
                      {/* 2. BACK SIDE (SIDE B) PREVIEW - IN SAME GRID EKSATH     */}
                      {/* ======================================================== */}
                      <div className="space-y-3 flex flex-col">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                              BACK SIDE (Side B)
                            </span>
                            {uploadedBackArtwork && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Custom Artwork Active
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="file"
                              ref={backArtworkInputRef}
                              onChange={handleBackArtworkUpload}
                              accept="image/*,.pdf"
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => backArtworkInputRef.current?.click()}
                              className="text-[11px] font-bold text-slate-700 hover:text-emerald-700 bg-white hover:bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-300 transition shadow-2xs flex items-center gap-1 cursor-pointer"
                            >
                              <UploadCloud className="w-3 h-3 text-emerald-600" />
                              <span>{uploadedBackArtwork ? "Replace" : "Upload Back"}</span>
                            </button>
                            {uploadedBackArtwork && (
                              <button
                                type="button"
                                onClick={() => {
                                  setUploadedBackArtwork(null);
                                  setUploadedBackName(null);
                                }}
                                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-white p-1 rounded-lg border border-slate-300 cursor-pointer"
                                title="Remove Back Artwork"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Back Canvas Body */}
                        <div className="flex-1 flex items-center justify-center p-2">
                          <div
                            className={`relative w-full ${
                              cardOrientation === "vertical"
                                ? "max-w-[270px] sm:max-w-[290px] aspect-[1/1.65] mx-auto"
                                : "aspect-[1.65/1]"
                            } ${
                              cornerStyle === "rounded" ? "rounded-2xl" : "rounded-sm"
                            } shadow-2xl transition-all duration-300 overflow-hidden border border-black/15 flex flex-col justify-between`}
                          >
                            {uploadedBackArtwork ? (
                              <img
                                src={uploadedBackArtwork}
                                alt="Custom Back Artwork"
                                className="w-full h-full object-cover"
                              />
                            ) : selectedProduct.id === "pvc-regular-glossy" ? (
                              /* 1. PVC Regular Glossy Back */
                              cardOrientation === "vertical" ? (
                                /* Vertical (Portrait) Layout */
                                <div className="w-full h-full bg-gradient-to-br from-[#1E232A] via-[#851117] to-[#111317] text-white p-4 flex flex-col justify-between relative overflow-hidden">
                                  {/* Top Header */}
                                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    {showBack("companyName") && (
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xs shadow-2xs">
                                          {companyName ? companyName.charAt(0).toUpperCase() : "I"}
                                        </div>
                                        <div className="text-xs font-black tracking-wide text-white uppercase truncate">
                                          {companyName || "INCREDIBLE TREASURES"}
                                        </div>
                                      </div>
                                    )}
                                    <span className="text-[8px] font-mono text-amber-300 ml-auto">400 MICRON</span>
                                  </div>

                                  {/* Middle QR + Cardholder Details */}
                                  <div className="flex flex-col items-center justify-center py-2 text-center">
                                    <div className="w-16 h-16 bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center mb-2">
                                      <QrCodePlaceholder className="w-13 h-13 text-slate-900" />
                                    </div>
                                    {(showBack("customerName") || showBack("customerDesignation")) ? (
                                      <div>
                                        {showBack("customerName") && (
                                          <div className="text-xs sm:text-sm font-black text-amber-200 truncate">
                                            {customerName || "Mahi Kapoor"}
                                          </div>
                                        )}
                                        {showBack("customerDesignation") && (
                                          <div className="text-[9.5px] text-slate-300 font-medium truncate">
                                            {customerDesignation || "Managing Director"}
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div>
                                        <div className="text-xs font-black text-amber-200">
                                          VISUAL & IDENTITY DESIGN
                                        </div>
                                        <div className="text-[8px] text-slate-300">
                                          Scan to Save Contact (vCard)
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Bottom Stacked Contacts */}
                                  <div className="text-[9px] font-medium text-slate-300 border-t border-white/10 pt-2 space-y-1">
                                    {showBack("phone") && (
                                      <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Phone:</span>
                                        <span className="font-bold text-white">{phone}</span>
                                      </div>
                                    )}
                                    {showBack("website") && (
                                      <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Web:</span>
                                        <span className="text-amber-200 truncate ml-2">{website}</span>
                                      </div>
                                    )}
                                    {showBack("email") && (
                                      <div className="flex items-center justify-between text-[8px]">
                                        <span className="text-slate-400">Email:</span>
                                        <span className="truncate ml-2">{email}</span>
                                      </div>
                                    )}
                                    {showBack("address") && (
                                      <div className="text-[8px] text-slate-400 truncate pt-0.5 border-t border-white/5">
                                        {address}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                /* Horizontal (Landscape) Layout */
                                <div className="w-full h-full bg-gradient-to-br from-[#1E232A] via-[#851117] to-[#111317] text-white p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
                                  <div className="flex items-center justify-between">
                                    {showBack("companyName") && (
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xs">
                                          {companyName.charAt(0) || "S"}
                                        </div>
                                        <div className="text-xs font-black tracking-wide text-white uppercase">
                                          {companyName || "SQUARE DESIGN"}
                                        </div>
                                      </div>
                                    )}
                                    <span className="text-[9px] font-mono text-amber-300 ml-auto">400 MICRON</span>
                                  </div>
                                  <div className="flex items-center justify-between py-1">
                                    <div className="space-y-1 min-w-0 pr-2">
                                      {(showBack("customerName") || showBack("customerDesignation")) ? (
                                        <div>
                                          {showBack("customerName") && (
                                            <div className="text-xs sm:text-sm font-black text-amber-200 truncate">
                                              {customerName || "Mahi Kapoor"}
                                            </div>
                                          )}
                                          {showBack("customerDesignation") && (
                                            <div className="text-[9px] text-slate-300 font-medium truncate">
                                              {customerDesignation || "Creative Director"}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <>
                                          <div className="text-xs font-black text-amber-200">
                                            VISUAL & IDENTITY DESIGN
                                          </div>
                                          <div className="text-[9px] text-slate-300">
                                            Scan to Save Contact (vCard)
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className="w-12 h-12 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
                                      <QrCodePlaceholder className="w-10 h-10 text-slate-900" />
                                    </div>
                                  </div>
                                  <div className="text-[9px] font-bold text-slate-300 border-t border-white/10 pt-1 space-y-0.5">
                                    <div className="flex justify-between items-center gap-2">
                                      {showBack("website") && <span className="truncate">{website || "www.squaredesign.in"}</span>}
                                      {showBack("phone") && <span className="shrink-0">{phone}</span>}
                                    </div>
                                    {(showBack("email") || showBack("address")) && (
                                      <div className="flex justify-between items-center gap-2 text-[8px] text-slate-400">
                                        {showBack("email") && <span className="truncate">{email}</span>}
                                        {showBack("address") && <span className="truncate">{address}</span>}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            ) : selectedProduct.id === "pvc-regular-matt" ? (
                              /* 2. PVC Regular Matt Back */
                              <div className="w-full h-full bg-gradient-to-br from-[#1E0B36] via-[#331459] to-[#2D124D] text-white p-4 sm:p-5 flex flex-col justify-between relative">
                                <div className="text-center space-y-1">
                                  {showBack("companyName") && (
                                    <div className="text-xs sm:text-sm font-serif font-black text-amber-300">
                                      {companyName || "TERMS & REDEMPTION"}
                                    </div>
                                  )}
                                  {showBack("customerName") && (
                                    <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  {showBack("customerDesignation") && (
                                    <div className="text-[9px] text-fuchsia-300 font-semibold">
                                      {customerDesignation || "VIP Cardholder"}
                                    </div>
                                  )}
                                  {!showBack("customerName") && !showBack("customerDesignation") && (
                                    <div className="text-[9px] text-fuchsia-200">
                                      Valid at all participating flagship stores
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center justify-center py-1">
                                  <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                                    <QrCodePlaceholder className="w-10 h-10 text-slate-900" />
                                  </div>
                                </div>
                                <div className="text-center text-[9px] font-semibold text-white/80 border-t border-white/10 pt-1 space-y-0.5">
                                  <div className="flex justify-center items-center gap-3">
                                    {showBack("website") && <span>{website || "www.incredible-treasures.com"}</span>}
                                    {showBack("phone") && <span>• Helpline: {phone}</span>}
                                  </div>
                                  {(showBack("email") || showBack("address")) && (
                                    <div className="flex justify-center items-center gap-2 text-[8px] text-fuchsia-200/80">
                                      {showBack("email") && <span>{email}</span>}
                                      {showBack("address") && <span>• {address}</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-brushed-silver" ? (
                              /* 3. PVC Brushed Silver Back */
                              <div className="w-full h-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 text-slate-900 p-3.5 sm:p-4 flex flex-col justify-between border border-slate-400/60 relative">
                                <div className="h-4 bg-slate-900 -mx-4 -mt-4 mb-2 flex items-center px-2">
                                  <span className="text-[7px] text-slate-300 font-mono tracking-widest">
                                    MAGNETIC STRIPE HIGH-COERCIVITY
                                  </span>
                                </div>
                                <div className="space-y-0.5 text-[9px] text-slate-800 font-semibold">
                                  {showBack("customerName") && <div>Name: <strong className="text-slate-950 font-black">{customerName || "Mahi Kapoor"}</strong></div>}
                                  {showBack("customerDesignation") && <div>Role: <span>{customerDesignation || "Class IX A"}</span></div>}
                                  {showBack("companyName") && <div>1. Property of: {companyName || "the School"}.</div>}
                                  {showBack("address") && <div>2. If found, return to: {address}.</div>}
                                  {showBack("phone") && <div>3. Helpline: <strong>{phone}</strong></div>}
                                  {showBack("email") && <div>4. Email: <span>{email}</span></div>}
                                  {showBack("website") && <div>5. Web: <span>{website}</span></div>}
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-400 pt-1">
                                  <span className="text-[8px] font-mono tracking-widest text-slate-600">
                                    BARCODE: ||| | |||| | |||
                                  </span>
                                  <span className="text-[8px] font-bold text-slate-900">
                                    AUTHORIZED SIGNATORY
                                  </span>
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-rainbow" ? (
                              /* 4. PVC Rainbow Holographic Back */
                              <div className="w-full h-full bg-gradient-to-tr from-[#FFD1DC] via-[#FFE4B5] via-[#D1E8E2] to-[#E6E6FA] text-slate-900 p-4 sm:p-5 flex flex-col justify-between relative shadow-inner">
                                <div className="text-center space-y-0.5">
                                  {showBack("customerName") && (
                                    <div className="text-xs sm:text-sm font-black text-slate-950 uppercase">
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  {showBack("customerDesignation") && (
                                    <div className="text-[10px] font-bold text-emerald-900">
                                      {customerDesignation || "Manager"}
                                    </div>
                                  )}
                                  {!showBack("customerName") && (
                                    <div className="text-xs font-black text-slate-950 uppercase">
                                      {showBack("companyName") ? (companyName || "DIGITAL MENU & INSTANT BOOKINGS") : "DIGITAL MENU & INSTANT BOOKINGS"}
                                    </div>
                                  )}
                                  <div className="text-[9px] font-bold text-amber-900">
                                    Scan QR code for authentic delicacies
                                  </div>
                                </div>
                                <div className="flex justify-center py-1">
                                  <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-sm">
                                    <QrCodePlaceholder className="w-10 h-10 text-slate-900" />
                                  </div>
                                </div>
                                <div className="text-[9px] font-bold text-slate-800 text-center border-t border-slate-900/10 pt-1 space-y-0.5">
                                  <div className="flex justify-center items-center gap-3">
                                    {showBack("website") && <span>{website || "www.naveensdosa.com"}</span>}
                                    {showBack("phone") && <span>• Reservations: {phone}</span>}
                                  </div>
                                  {(showBack("email") || showBack("address")) && (
                                    <div className="flex justify-center items-center gap-2 text-[8px] text-slate-700">
                                      {showBack("email") && <span>{email}</span>}
                                      {showBack("address") && <span>• {address}</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-transparent" ? (
                              /* 5. PVC Transparent Clear Frosted Back */
                              <div className="w-full h-full bg-white/60 backdrop-blur-md text-slate-900 p-4 sm:p-5 flex flex-col justify-between border-2 border-white/80 relative shadow-inner">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 to-indigo-500" />
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-400 via-amber-400 to-red-500" />
                                <div className="text-center pt-1">
                                  {showBack("customerName") ? (
                                    <>
                                      <div className="text-xs sm:text-sm font-black tracking-wider text-slate-950 uppercase">
                                        {customerName?.toUpperCase() || "MAHI KAPOOR"}
                                      </div>
                                      {showBack("customerDesignation") && (
                                        <div className="text-[10px] font-bold text-slate-700 uppercase">
                                          {customerDesignation || "DIRECTOR - OPERATIONS"}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div className="text-xs font-black tracking-widest text-slate-900 uppercase">
                                        TAP TO CONNECT (NFC)
                                      </div>
                                      <div className="text-[9px] font-bold text-slate-600">
                                        Contactless Digital Profile
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div className="flex justify-center py-1">
                                  <div className="w-12 h-12 bg-white rounded-lg p-1 border border-slate-300">
                                    <QrCodePlaceholder className="w-10 h-10 text-slate-900" />
                                  </div>
                                </div>
                                <div className="text-center text-[9px] font-bold text-slate-800 pb-1 space-y-0.5">
                                  <div className="flex justify-center items-center gap-3">
                                    {showBack("website") && <span>{website || "www.incredible-treasures.com"}</span>}
                                    {showBack("phone") && <span>• {phone}</span>}
                                  </div>
                                  {(showBack("email") || showBack("address")) && (
                                    <div className="flex justify-center items-center gap-2 text-[8px] text-slate-600 font-medium">
                                      {showBack("email") && <span>{email}</span>}
                                      {showBack("address") && <span>• {address}</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-glitter" ? (
                              /* 6. PVC Glitter Back */
                              <div className="w-full h-full bg-gradient-to-tr from-[#DEBA78] via-[#F4E0A5] to-[#D5A754] text-slate-950 p-4 sm:p-5 flex flex-col justify-between relative">
                                <div className="text-center space-y-0.5">
                                  {showBack("companyName") && (
                                    <div className="text-xs sm:text-sm font-black text-slate-950 uppercase">
                                      {companyName || "CREATIVE MIND"}
                                    </div>
                                  )}
                                  {showBack("customerName") && (
                                    <div className="text-xs sm:text-sm font-black text-slate-950">
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  {showBack("customerDesignation") && (
                                    <div className="text-[10px] font-bold text-amber-950">
                                      {customerDesignation || "Artist Director"}
                                    </div>
                                  )}
                                  {!showBack("customerName") && (
                                    <div className="text-[9px] font-bold text-amber-950">
                                      Art Direction & Luxury Branding
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-center py-1">
                                  <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-md">
                                    <QrCodePlaceholder className="w-10 h-10 text-slate-900" />
                                  </div>
                                </div>
                                <div className="text-center text-[9px] font-bold text-slate-950 border-t border-amber-600/30 pt-1 space-y-0.5">
                                  <div className="flex justify-center items-center gap-3">
                                    {showBack("website") && <span>{website || "www.creativemind.com"}</span>}
                                    {showBack("phone") && <span>• {phone}</span>}
                                  </div>
                                  {(showBack("email") || showBack("address")) && (
                                    <div className="flex justify-center items-center gap-2 text-[8px] text-amber-900">
                                      {showBack("email") && <span>{email}</span>}
                                      {showBack("address") && <span>• {address}</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-embossed" ? (
                              /* 7. PVC Embossed Back */
                              <div className="w-full h-full bg-slate-50 text-slate-900 p-4 sm:p-5 flex flex-col justify-between border border-slate-300 relative shadow-inner">
                                <div className="h-4 bg-slate-900 -mx-5 -mt-5 mb-2 flex items-center px-2">
                                  <span className="text-[7px] text-white font-mono">
                                    MAGNETIC ENCODING TRACK 1 & 2
                                  </span>
                                </div>
                                <div className="bg-white border border-slate-300 p-1.5 rounded flex justify-between items-center">
                                  <div className="min-w-0 pr-2">
                                    <span className="text-[8px] font-mono text-slate-400 block">SIGNATURE PANEL</span>
                                    {showBack("customerName") && (
                                      <span className="text-[10px] font-serif italic font-bold text-slate-900 block truncate">
                                        {customerName || "Mahi Kapoor"}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] font-mono font-bold text-slate-800 shrink-0">CVV: 704</span>
                                </div>
                                <div className="text-[9px] font-mono text-slate-700 flex flex-wrap justify-between gap-1 pt-1">
                                  {showBack("phone") && <span>24x7: {phone}</span>}
                                  {showBack("website") && <span>{website || "www.smart.com"}</span>}
                                  {showBack("email") && <span className="w-full text-[8px] text-slate-500 truncate">{email}</span>}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-matt-foiling" ? (
                              /* 8. PVC Matt + Foiling Back */
                              <div className="w-full h-full bg-[#121214] text-white p-4 sm:p-5 flex flex-col justify-between border border-neutral-800 relative">
                                <div className="text-center space-y-0.5">
                                  <div className="text-xs font-serif font-black tracking-widest uppercase bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                                    {showBack("companyName") ? (companyName || "BESPOKE PRIVILEGE") : "BESPOKE PRIVILEGE"}
                                  </div>
                                  {showBack("customerName") && (
                                    <div className="text-xs sm:text-sm font-serif font-black text-amber-200">
                                      {customerName?.toUpperCase() || "MAHI KAPOOR"}
                                    </div>
                                  )}
                                  {showBack("customerDesignation") && (
                                    <div className="text-[9px] font-serif tracking-widest text-amber-200/80 uppercase">
                                      {customerDesignation || "LONDON BESPOKE DIRECT"}
                                    </div>
                                  )}
                                  {!showBack("customerName") && (
                                    <div className="text-[9px] text-neutral-400 font-serif">
                                      Exclusive Corporate Membership
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-center py-1">
                                  <div className="w-12 h-12 bg-neutral-900 border border-amber-300/40 rounded-lg p-1">
                                    <QrCodePlaceholder className="w-10 h-10 text-amber-300" />
                                  </div>
                                </div>
                                <div className="text-center text-[9px] text-amber-200/80 font-mono border-t border-neutral-800 pt-1 space-y-0.5">
                                  <div className="flex justify-center items-center gap-3">
                                    {showBack("phone") && <span>Concierge: {phone}</span>}
                                    {showBack("website") && <span>• {website || "www.luxury.com"}</span>}
                                  </div>
                                  {(showBack("email") || showBack("address")) && (
                                    <div className="flex justify-center items-center gap-2 text-[8px] text-neutral-400">
                                      {showBack("email") && <span>{email}</span>}
                                      {showBack("address") && <span>• {address}</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.id === "pvc-matt-spot-uv" ? (
                              /* 9. PVC Matt + Spot UV Back */
                              <div className="w-full h-full bg-[#C79A3B] text-slate-900 p-4 sm:p-5 flex flex-col justify-between border border-[#A67E28] relative">
                                <div className="text-center space-y-0.5">
                                  <div className="text-xs font-black tracking-wide text-slate-950 uppercase">
                                    {showBack("companyName") ? (companyName || "CRAFTED EXCELLENCE") : "CRAFTED EXCELLENCE"}
                                  </div>
                                  {showBack("customerName") && (
                                    <div className="text-xs sm:text-sm font-black text-slate-950">
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  {showBack("customerDesignation") && (
                                    <div className="text-[10px] font-bold text-slate-900">
                                      {customerDesignation || "Official Store"}
                                    </div>
                                  )}
                                  {!showBack("customerName") && (
                                    <div className="text-[9px] font-bold text-slate-900">
                                      100% Genuine Cotton & Tailoring
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-center py-1">
                                  <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-sm">
                                    <QrCodePlaceholder className="w-10 h-10 text-slate-900" />
                                  </div>
                                </div>
                                <div className="text-center text-[9px] font-bold text-slate-950 border-t border-slate-950/20 pt-1 space-y-0.5">
                                  <div className="flex justify-center items-center gap-3">
                                    {showBack("phone") && <span>Customer Service: {phone}</span>}
                                    {showBack("website") && <span>• {website}</span>}
                                  </div>
                                  {(showBack("email") || showBack("address")) && (
                                    <div className="flex justify-center items-center gap-2 text-[8px] text-slate-800 font-semibold">
                                      {showBack("email") && <span>{email}</span>}
                                      {showBack("address") && <span>• {address}</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.category === "mugs" ? (
                              /* Mug Back Mockup */
                              <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-4 relative">
                                <div className="w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-2xl border-4 border-slate-300 shadow-xl flex flex-col items-center justify-center p-3 text-center relative">
                                  <QrCodePlaceholder className="w-8 h-8 text-slate-800 mb-1" />
                                  {showBack("customerName") && (
                                    <div className="text-[9px] font-black text-slate-900 truncate w-full">
                                      {customerName}
                                    </div>
                                  )}
                                  <div className="text-[9px] font-bold text-slate-700">
                                    Scan For Perks
                                  </div>
                                  {showBack("website") && (
                                    <div className="text-[8px] text-slate-400 font-mono truncate w-full">
                                      {website || "www.company.com"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.category === "tshirts" ? (
                              /* T-Shirt Back Mockup */
                              <div className="w-full h-full bg-slate-800 text-white flex flex-col items-center justify-center p-4 relative">
                                <div className="text-center space-y-1 border border-white/20 p-3 rounded-xl max-w-[200px] w-full">
                                  {showBack("companyName") && (
                                    <div className="text-sm font-black text-amber-300 uppercase tracking-wider">
                                      {companyName || "TEAM INCREDIBLE"}
                                    </div>
                                  )}
                                  {showBack("customerName") && (
                                    <div className="text-xs font-bold text-white">
                                      {customerName}
                                    </div>
                                  )}
                                  {showBack("customerDesignation") && (
                                    <div className="text-[9px] text-slate-300">
                                      {customerDesignation}
                                    </div>
                                  )}
                                  {!showBack("customerName") && !showBack("customerDesignation") && (
                                    <div className="text-[9px] text-slate-300 font-bold">
                                      Leadership & Innovation 2026
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : selectedProduct.category === "letterheads" ? (
                              /* Letterhead / Corporate Envelope Back Mockup */
                              <div className="w-full h-full bg-slate-100 p-4 text-slate-900 flex flex-col justify-between border border-slate-300">
                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                  Matching Corporate Envelope Flap
                                </div>
                                <div className="flex flex-col items-center justify-center py-1">
                                  <div className="w-9 h-9 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center font-serif text-sm font-black shadow-md mb-1">
                                    {companyName.charAt(0) || "IT"}
                                  </div>
                                  {showBack("customerName") && (
                                    <div className="text-[9px] font-bold text-slate-800">
                                      {customerName} {showBack("customerDesignation") && `(${customerDesignation})`}
                                    </div>
                                  )}
                                </div>
                                <div className="text-[8px] text-slate-600 text-center border-t border-slate-200 pt-1">
                                  {showBack("address") && <div>Return Address: {address}</div>}
                                  {showBack("phone") && <div>Help: {phone}</div>}
                                </div>
                              </div>
                            ) : selectedProduct.category === "labels" ? (
                              /* Labels Back Mockup */
                              <div className="w-full h-full bg-slate-100 p-4 text-slate-900 flex flex-col justify-between border border-slate-300">
                                <div className="text-[9px] font-bold text-slate-700">
                                  Regulatory Facts & Barcode
                                </div>
                                <div className="space-y-0.5 text-[8px] text-slate-600">
                                  {showBack("customerName") && <div>Inspected By: {customerName}</div>}
                                  <div>Mfg Date: 10/2026 | Exp: 10/2028</div>
                                  {showBack("phone") && <div>Customer Care: {phone}</div>}
                                </div>
                                <div className="text-[8px] font-mono tracking-widest text-slate-800 border-t border-slate-200 pt-1">
                                  BARCODE: 8901234567890
                                </div>
                              </div>
                            ) : (
                              /* Default / Template Visiting Card Back */
                              <div className={`w-full h-full ${currentTemplate.bgStyle} p-4 sm:p-5 flex flex-col items-center justify-between text-center relative`}>
                                <div className="flex flex-col items-center">
                                  {uploadedLogo ? (
                                    <img src={uploadedLogo} alt="Logo" className="w-9 h-9 object-contain mb-1" />
                                  ) : (
                                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white mb-1 shadow-xs">
                                      <Leaf className="w-5 h-5" />
                                    </div>
                                  )}
                                  {showBack("companyName") && (
                                    <div className={`text-xs sm:text-sm font-black ${currentTemplate.textColor}`}>
                                      {companyName || "Your Company"}
                                    </div>
                                  )}
                                </div>

                                <div className="my-1 text-center">
                                  {showBack("customerName") && (
                                    <div className={`text-xs sm:text-sm font-black ${currentTemplate.textColor}`}>
                                      {customerName || "Mahi Kapoor"}
                                    </div>
                                  )}
                                  {showBack("customerDesignation") && (
                                    <div className={`text-[10px] font-bold ${currentTemplate.accentColor}`}>
                                      {customerDesignation || "Designation"}
                                    </div>
                                  )}
                                  <div className="mt-1 flex justify-center">
                                    <QrCodePlaceholder className="w-8 h-8 text-slate-800" />
                                  </div>
                                </div>

                                <div className={`text-[8px] sm:text-[9px] ${currentTemplate.subColor} font-semibold w-full border-t border-black/10 pt-1 space-y-0.5`}>
                                  <div className="flex justify-between items-center gap-2">
                                    {showBack("website") && <span className="truncate">{website || "www.yourwebsite.com"}</span>}
                                    {showBack("phone") && <span className="shrink-0">{phone}</span>}
                                  </div>
                                  {(showBack("email") || showBack("address")) && (
                                    <div className="flex justify-between items-center gap-2 text-[7px] sm:text-[8px] opacity-80">
                                      {showBack("email") && <span className="truncate">{email}</span>}
                                      {showBack("address") && <span className="truncate">{address}</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 3-TILE UPLOADER ACTION BAR DIRECTLY BELOW DUAL PREVIEWS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 1. Upload Front Artwork */}
                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 transition shadow-2xs flex items-center justify-between gap-3">
                      <div className="min-w-0 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <UploadCloud className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {uploadedFrontName ? `Front: ${uploadedFrontName}` : "Upload Front Design"}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">Side A (PDF / PNG / JPG)</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => frontArtworkInputRef.current?.click()}
                        className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                      >
                        {uploadedFrontArtwork ? "Change" : "Browse"}
                      </button>
                    </div>

                    {/* 2. Upload Back Artwork */}
                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 transition shadow-2xs flex items-center justify-between gap-3">
                      <div className="min-w-0 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                          <UploadCloud className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {uploadedBackName ? `Back: ${uploadedBackName}` : "Upload Back Design"}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">Side B (PDF / PNG / JPG)</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => backArtworkInputRef.current?.click()}
                        className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                      >
                        {uploadedBackArtwork ? "Change" : "Browse"}
                      </button>
                    </div>

                    {/* 3. Upload Brand Logo */}
                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-amber-500 transition shadow-2xs flex items-center justify-between gap-3">
                      <div className="min-w-0 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                          {uploadedLogo ? (
                            <img src={uploadedLogo} alt="Logo" className="w-6 h-6 object-contain" />
                          ) : (
                            <ImageIcon className="w-4 h-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {uploadedLogo ? "Logo Synced" : "Upload Brand Logo"}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">Transparent PNG / SVG</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-amber-600 hover:text-white transition cursor-pointer"
                        >
                          {uploadedLogo ? "Change" : "Browse"}
                        </button>
                        {uploadedLogo && (
                          <button
                            type="button"
                            onClick={() => setUploadedLogo(null)}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                            title="Remove Logo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Trust Bar in Left Column (Balanced under Canvas & Upload Controls) */}
                  <div className="grid grid-cols-3 gap-2.5 text-center bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-slate-800 block">100% Quality</span>
                      <span className="text-[9px] text-slate-500">QC Checked</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-slate-800 block">Express Dispatch</span>
                      <span className="text-[9px] text-slate-500">2-3 Days</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <Sparkles className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-slate-800 block">Both Sides Proof</span>
                      <span className="text-[9px] text-slate-500">Live Rendered</span>
                    </div>
                  </div>

                  {/* Free Templates Selector for Standard Visiting Cards */}
                  {selectedProduct.category === "visiting-cards" && !selectedProduct.isGstIncluded && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-emerald-600" />
                          <h3 className="text-sm font-bold text-slate-900">
                            Switch Background Design Template
                          </h3>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          Active: <strong>{currentTemplate.name}</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PRODUCT_TEMPLATES.filter((t) => t.productId === "visiting-cards").slice(0, 8).map((tpl) => (
                          <button
                            key={tpl.id}
                            type="button"
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                              selectedTemplateId === tpl.id
                                ? "border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className="text-xs font-bold text-slate-900 truncate">{tpl.name}</div>
                            <span className="text-[10px] text-slate-500 capitalize">{tpl.category}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT (5 COLUMNS): REAL-TIME PERSONALIZATION, PRICING & ORDER CHECKOUT (EYE-LEVEL, NO SCROLLING) */}
                <div className="xl:col-span-5 space-y-6">
                  {/* REAL-TIME PERSONALIZATION CONTROLS (PLACED AT TOP OF RIGHT COLUMN AT EYE LEVEL) */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-emerald-600" />
                        <div>
                          <h2 className="text-base font-bold text-slate-900 leading-tight">
                            Live Personalization & Contact Details
                          </h2>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Select placement for each detail: <strong>Front (Side A)</strong>, <strong>Back (Side B)</strong>, or <strong>Both Sides</strong>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
                        {selectedProduct.category === "visiting-cards" && (
                          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                            Orientation: <strong className="text-indigo-700 capitalize">{cardOrientation}</strong>
                          </span>
                        )}
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          ⚡ Dual-Side Live Sync
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div>
                        <PlacementSelector field="companyName" label="Company / Brand Name" icon={Briefcase} />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Incredible Treasures"
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <PlacementSelector field="customerName" label="Full Name" icon={User} />
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Aditya Verma"
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <PlacementSelector field="customerDesignation" label="Designation / Role" icon={FileText} />
                        <input
                          type="text"
                          value={customerDesignation}
                          onChange={(e) => setCustomerDesignation(e.target.value)}
                          placeholder="e.g. Managing Director"
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <PlacementSelector field="phone" label="Phone Number" icon={Phone} />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 99450 39266"
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <PlacementSelector field="email" label="Email Address" icon={Mail} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contact@company.com"
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <PlacementSelector field="website" label="Website URL" icon={ExternalLink} />
                        <input
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="www.company.com"
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <PlacementSelector field="address" label="Office / Dispatch Address" icon={MapPin} />
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Yelahanka, Bengaluru – 560064"
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing & MOQ Card */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
                    {/* Live Price Display */}
                    <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-md">
                      <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
                        {selectedProduct.isGstIncluded ? "Rate (Incl. 18% GST)" : "Starting Bulk Price"}
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          {selectedPvcTier ? `₹${selectedPvcTier.pricePerUnit.toFixed(2)}` : selectedProduct.startingPrice}
                        </span>
                        <span className="text-xs text-slate-300">
                          / {selectedProduct.category === "visiting-cards" ? "card" : "item"}
                        </span>
                        {selectedProduct.isGstIncluded ? (
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
                            ✓ INCL. 18% GST
                          </span>
                        ) : (
                          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full ml-1">
                            + 18% GST EXTRA
                          </span>
                        )}
                      </div>
                      {selectedPvcTier && (
                        <span className="text-xs text-amber-300 font-bold block mt-1.5">
                          Batch Total: ₹{selectedPvcTier.total.toLocaleString("en-IN")} for {selectedPvcTier.qty} cards
                        </span>
                      )}
                    </div>

                    {/* Quantity Tier Selector */}
                    {selectedProduct.pricingTiers && selectedProduct.pricingTiers.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Select Quantity Tier:
                          </label>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            ✓ Rates include 18% GST
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                          {selectedProduct.pricingTiers.map((tier) => {
                            const isSelected = selectedPvcTier?.qty === tier.qty;
                            return (
                              <button
                                key={tier.qty}
                                type="button"
                                onClick={() => setSelectedPvcTier(tier)}
                                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                                  isSelected
                                    ? "border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black text-slate-900">{tier.qty} pcs</span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                </div>
                                <span className="text-xs font-extrabold text-emerald-700 block mt-1">
                                  ₹{tier.pricePerUnit.toFixed(2)} <span className="text-[9px] font-normal text-slate-500">/ pc</span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-700 block mt-0.5">
                                  Total: ₹{tier.total.toLocaleString("en-IN")}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Select Quantity Tier:
                          </label>
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            + 18% GST Extra Added at Checkout
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                          {(() => {
                            const basePriceNum = parseFloat(selectedProduct.startingPrice.replace(/[^0-9.]/g, "")) || 250;
                            const baseMoqNum = parseInt(selectedProduct.minQty.replace(/[^0-9]/g, "")) || 50;
                            return [
                              { tier: 1, mult: 1, discRate: 1.0, label: `${baseMoqNum} pcs`, disc: "Base Rate" },
                              { tier: 2, mult: 2, discRate: 0.92, label: `${baseMoqNum * 2} pcs`, disc: "Save 8%" },
                              { tier: 5, mult: 5, discRate: 0.85, label: `${baseMoqNum * 5} pcs`, disc: "Save 15%" },
                            ].map((t) => {
                              const tierPrice = Math.round(basePriceNum * t.discRate * 100) / 100;
                              const tierTotal = Math.round(tierPrice * (baseMoqNum * t.mult) * 100) / 100;
                              const isSelected = merchTierQty === t.tier;
                              return (
                                <button
                                  key={t.tier}
                                  type="button"
                                  onClick={() => setMerchTierQty(t.tier)}
                                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                                    isSelected
                                      ? "border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs"
                                      : "border-slate-200 bg-white hover:border-slate-300"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-black text-slate-900 block truncate">{t.label}</span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                  </div>
                                  <span className="text-xs font-extrabold text-emerald-700 block mt-1">
                                    ₹{tierPrice.toFixed(2)} <span className="text-[9px] font-normal text-slate-500">/ pc</span>
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-700 block mt-0.5">
                                    Batch: ₹{tierTotal.toLocaleString("en-IN")}
                                  </span>
                                </button>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    )}

                    {/* Proofing Summary Pill */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold text-slate-800">
                          {uploadedFrontArtwork && uploadedBackArtwork
                            ? "Custom Front & Back Artwork Uploaded"
                            : uploadedFrontArtwork
                            ? "Front Custom Artwork Active"
                            : uploadedBackArtwork
                            ? "Back Custom Artwork Active"
                            : uploadedLogo
                            ? "Custom Logo Synced to Both Sides"
                            : "Live Proof Ready for Production"}
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        Verified 300 DPI
                      </span>
                    </div>

                    {/* Action Buttons: WhatsApp Instant Quote & Add to Cart */}
                    <div className="space-y-3 pt-2">
                      <a
                        href={`https://wa.me/919945039266?text=${encodeURIComponent(
                          `Hello Incredible Treasures,

I want an official quotation for:
• Product: ${selectedProduct.title}
• Category: ${selectedProduct.categoryName}
• Quantity: ${selectedPvcTier ? selectedPvcTier.qty + ' pcs' : selectedProduct.minQty}
• Rate: ${selectedPvcTier ? '₹' + selectedPvcTier.pricePerUnit.toFixed(2) + ' (Total: ₹' + selectedPvcTier.total + ' INCL. GST)' : selectedProduct.startingPrice + ' (+18% GST)'}
• Company Name: ${companyName}
• Proof Status: Dual Side Front & Back Preview Configured

Please confirm order timeline.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        <Phone className="w-5 h-5" />
                        <span>Instant WhatsApp Quote (+91 9945039266)</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          if (selectedProduct.pricingTiers && selectedPvcTier) {
                            addItemToCart({
                              productId: selectedProduct.id,
                              title: `${selectedProduct.title} (${selectedPvcTier.qty} pcs)`,
                              categoryName: selectedProduct.categoryName,
                              image: selectedProduct.image,
                              quantity: selectedPvcTier.qty,
                              unitPrice: selectedPvcTier.pricePerUnit,
                              branding: `${selectedProduct.finishType || '400 Micron'} • ${cornerStyle} Corners`,
                              specs: `Front & Back Proof Ready • Co: ${companyName} • ${selectedProduct.specs} • Rate Includes 18% GST`,
                              isGstIncluded: true,
                            });
                          } else {
                            const basePriceNum = parseFloat(selectedProduct.startingPrice.replace(/[^0-9.]/g, "")) || 250;
                            const baseMoqNum = parseInt(selectedProduct.minQty.replace(/[^0-9]/g, "")) || 50;
                            const totalOrderQty = baseMoqNum * merchTierQty;
                            const discountMultiplier = merchTierQty === 5 ? 0.85 : merchTierQty === 2 ? 0.92 : 1.0;
                            const effectiveUnitPrice = Math.round(basePriceNum * discountMultiplier * 100) / 100;
                            addItemToCart({
                              productId: selectedProduct.id,
                              title: `${selectedProduct.title} (${totalOrderQty} pcs)`,
                              categoryName: selectedProduct.categoryName,
                              image: selectedProduct.image,
                              quantity: totalOrderQty,
                              unitPrice: effectiveUnitPrice,
                              branding: `Front & Back Dual Proof • Co: ${companyName}`,
                              specs: `${selectedProduct.specs} • Logo Synced • (+18% GST Extra)`,
                              isGstIncluded: false,
                            });
                          }
                          setIsCartOpen(true);
                        }}
                        className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
                      >
                        <ShoppingBag className="w-5 h-5 text-emerald-400" />
                        <span>
                          {selectedProduct.pricingTiers && selectedPvcTier
                            ? `Add ${selectedPvcTier.qty} Cards to Cart — ₹${selectedPvcTier.total.toLocaleString("en-IN")} (Incl. GST)`
                            : `Add to Cart — ${selectedProduct.title}`}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Technical Specifications Table */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Technical Specifications
                    </h4>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-400">Model ID:</span>
                        <span className="font-bold text-slate-800">{selectedProduct.id}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-400">Category:</span>
                        <span className="font-bold text-emerald-700">{selectedProduct.categoryName}</span>
                      </div>
                      {selectedProduct.micron && (
                        <div className="flex justify-between py-1 border-b border-slate-200/60">
                          <span className="text-slate-400">Thickness:</span>
                          <span className="font-bold text-slate-800">{selectedProduct.micron} Micron Polymer</span>
                        </div>
                      )}
                      {selectedProduct.finishType && (
                        <div className="flex justify-between py-1 border-b border-slate-200/60">
                          <span className="text-slate-400">Finish:</span>
                          <span className="font-bold text-slate-800">{selectedProduct.finishType}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-400">Printed Sides:</span>
                        <span className="font-bold text-slate-800">
                          {selectedProduct.sides === 1 ? "Single Sided (Front)" : "Double Sided (Front & Back)"}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">GST Invoice:</span>
                        <span className={`font-bold ${selectedProduct.isGstIncluded ? "text-emerald-700" : "text-amber-800"}`}>
                          {selectedProduct.isGstIncluded ? "Included (18% GST)" : "+18% GST Added at Checkout"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ========================================================================= */
              /* DAY 4 COMPONENT 2: MULTI-IMAGE GALLERY WITH ZOOM & 3D ANGLE PREVIEWS       */
              /* ========================================================================= */
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs mb-10 p-6 sm:p-8">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                  {/* Left Column (7 cols): Multi-Image Gallery, Angle Thumbnails, Zoom-on-Hover & 3D Orbit */}
                  <div className="xl:col-span-7 space-y-6">
                    {/* View Angle Selector Thumbnails */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">Angle / Perspective:</span>
                        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryAngle("front");
                              setIs3dAutoSpin(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              galleryAngle === "front"
                                ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Front (0°)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setGalleryAngle("3d");
                            }}
                            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              galleryAngle === "3d"
                                ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <Box className="w-3.5 h-3.5 text-indigo-600" />
                            <span>3D Angle (45°)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setGalleryAngle("back");
                              setIs3dAutoSpin(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              galleryAngle === "back"
                                ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <RotateCw className="w-3.5 h-3.5 text-amber-600" />
                            <span>Back (180°)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setGalleryAngle("texture");
                              setIs3dAutoSpin(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              galleryAngle === "texture"
                                ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Macro Texture</span>
                          </button>
                        </div>
                      </div>

                      {galleryAngle !== "3d" && (
                        <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Hover over image to zoom 2.2x</span>
                        </div>
                      )}
                    </div>

                    {/* Main Interactive Stage Box */}
                    <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200/80 border border-slate-300 shadow-inner flex items-center justify-center p-6 sm:p-10 select-none">
                      {/* Sub-view 1: Front View with Zoom-on-Hover */}
                      {galleryAngle === "front" && (
                        <div
                          onMouseEnter={() => setIsHoverZoomActive(true)}
                          onMouseLeave={() => setIsHoverZoomActive(false)}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                            const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                            setZoomCoords({ x, y });
                          }}
                          className="relative w-full max-w-[620px] aspect-[1.75/1] rounded-xl overflow-hidden shadow-2xl border border-slate-300/80 cursor-crosshair group bg-white"
                        >
                          <div
                            className="w-full h-full relative transition-transform duration-100"
                            style={{
                              transform: isHoverZoomActive ? "scale(2.2)" : "scale(1)",
                              transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                            }}
                          >
                            <Image
                              src={selectedProduct.image}
                              alt={selectedProduct.title}
                              fill
                              priority
                              sizes="(max-width: 1200px) 100vw, 700px"
                              className="object-cover"
                            />
                          </div>

                          {/* Zoom Active Floating Lens Pill */}
                          {isHoverZoomActive && (
                            <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 pointer-events-none z-20">
                              <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                              <span>2.2x Lens Magnifier ({Math.round(zoomCoords.x)}%, {Math.round(zoomCoords.y)}%)</span>
                            </div>
                          )}

                          {/* Front View Label */}
                          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg pointer-events-none z-10 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>Front Studio View (0°) • 89×51mm Standard Trim</span>
                          </div>
                        </div>
                      )}

                      {/* Sub-view 2: 3D Perspective Angle Preview with Interactive Orbit */}
                      {galleryAngle === "3d" && (
                        <div className="w-full h-full flex flex-col items-center justify-center relative">
                          <div
                            className="w-full max-w-[560px] aspect-[1.75/1] relative flex items-center justify-center"
                            style={{ perspective: "1200px" }}
                          >
                            {/* Realistic CSS 3D Card Object */}
                            <div
                              className="relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-200"
                              style={{
                                transformStyle: "preserve-3d",
                                transform: `rotateX(${interactive3dRotX}deg) rotateY(${interactive3dRotY}deg)`,
                                boxShadow: `
                                  ${-interactive3dRotY * 0.8}px ${Math.abs(interactive3dRotX) * 1.5 + 20}px 40px -10px rgba(15, 23, 42, 0.45),
                                  0 0 0 1px rgba(255, 255, 255, 0.2) inset
                                `,
                              }}
                            >
                              <Image
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                fill
                                sizes="(max-width: 1200px) 100vw, 600px"
                                className="object-cover"
                              />

                              {/* Dynamic Specular Gleam Overlay */}
                              <div
                                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                style={{
                                  background: `linear-gradient(${120 + interactive3dRotY}deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.25) 100%)`,
                                  opacity: 0.85,
                                }}
                              />

                              {/* 3D 400 Micron Substrate Edge Thickness Bevel */}
                              <div
                                className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-white/40"
                                style={{
                                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.3)",
                                }}
                              />
                            </div>
                          </div>

                          {/* 3D Orbit Control Bar */}
                          <div className="mt-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-300 shadow-md flex flex-wrap items-center justify-center gap-2 text-xs">
                            <span className="font-bold text-slate-500 mr-1">3D Controls:</span>
                            <button
                              type="button"
                              onClick={() => setInteractive3dRotY((prev) => prev - 15)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                              title="Tilt Left"
                            >
                              ↺ Left
                            </button>
                            <button
                              type="button"
                              onClick={() => setInteractive3dRotY((prev) => prev + 15)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                              title="Tilt Right"
                            >
                              ↻ Right
                            </button>
                            <button
                              type="button"
                              onClick={() => setInteractive3dRotX((prev) => Math.max(-25, prev - 10))}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                              title="Tilt Up"
                            >
                              ⬆ Up
                            </button>
                            <button
                              type="button"
                              onClick={() => setInteractive3dRotX((prev) => Math.min(30, prev + 10))}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                              title="Tilt Down"
                            >
                              ⬇ Down
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => {
                                setInteractive3dRotX(14);
                                setInteractive3dRotY(-24);
                                setIs3dAutoSpin(false);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold cursor-pointer"
                            >
                              Isometric 45°
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setInteractive3dRotX(0);
                                setInteractive3dRotY(0);
                                setIs3dAutoSpin(false);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                            >
                              Flat 0°
                            </button>
                            <button
                              type="button"
                              onClick={() => setIs3dAutoSpin((prev) => !prev)}
                              className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition flex items-center gap-1 ${
                                is3dAutoSpin
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                              }`}
                            >
                              <RotateCw className={`w-3 h-3 ${is3dAutoSpin ? "animate-spin" : ""}`} />
                              <span>{is3dAutoSpin ? "Pause Spin" : "Auto Spin"}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Sub-view 3: Back View with Zoom-on-Hover */}
                      {galleryAngle === "back" && (
                        <div
                          onMouseEnter={() => setIsHoverZoomActive(true)}
                          onMouseLeave={() => setIsHoverZoomActive(false)}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                            const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                            setZoomCoords({ x, y });
                          }}
                          className="relative w-full max-w-[620px] aspect-[1.75/1] rounded-xl overflow-hidden shadow-2xl border border-slate-300/80 cursor-crosshair group bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between"
                        >
                          <div
                            className="w-full h-full relative transition-transform duration-100 flex flex-col justify-between"
                            style={{
                              transform: isHoverZoomActive ? "scale(2.2)" : "scale(1)",
                              transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                            }}
                          >
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs border border-emerald-500/30">
                                  IT
                                </div>
                                <div>
                                  <div className="text-xs font-bold tracking-wider uppercase text-slate-200">Incredible Treasures</div>
                                  <div className="text-[10px] text-slate-400">Executive Corporate Solutions</div>
                                </div>
                              </div>
                              <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                                <Image
                                  src="/images/logo-mark.png"
                                  alt="QR Code"
                                  width={48}
                                  height={48}
                                  className="object-contain"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300 py-2">
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Headquarters</span>
                                <span className="font-semibold text-slate-200">Yelahanka, Bengaluru 560064</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Direct Contact</span>
                                <span className="font-semibold text-slate-200">+91 99450 39266</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Web Portal</span>
                                <span className="font-semibold text-emerald-400">www.incredible-treasures.com</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">GST Registered</span>
                                <span className="font-semibold text-slate-200">29ABCDE1234F1Z5</span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                              <span>Side B (Reverse View)</span>
                              <span className="text-emerald-400 font-bold">100% CMYK Vector Crispness</span>
                            </div>
                          </div>

                          {/* Zoom Active Floating Lens Pill */}
                          {isHoverZoomActive && (
                            <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 pointer-events-none z-20">
                              <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                              <span>2.2x Lens Magnifier ({Math.round(zoomCoords.x)}%, {Math.round(zoomCoords.y)}%)</span>
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg pointer-events-none z-10 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            <span>Back View (180°) • Corporate Contact & QR Layout</span>
                          </div>
                        </div>
                      )}

                      {/* Sub-view 4: Macro Surface Texture & Finish Close-Up */}
                      {galleryAngle === "texture" && (
                        <div
                          onMouseEnter={() => setIsHoverZoomActive(true)}
                          onMouseLeave={() => setIsHoverZoomActive(false)}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                            const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                            setZoomCoords({ x, y });
                          }}
                          className="relative w-full max-w-[620px] aspect-[1.75/1] rounded-xl overflow-hidden shadow-2xl border border-slate-300/80 cursor-crosshair group bg-slate-950 p-6 flex flex-col justify-between"
                        >
                          <div
                            className="w-full h-full relative transition-transform duration-100 flex flex-col justify-between"
                            style={{
                              transform: isHoverZoomActive ? "scale(2.5)" : "scale(1)",
                              transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                            }}
                          >
                            <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 flex items-center justify-center bg-radial from-slate-800 to-slate-950">
                              <div
                                className="absolute inset-0 opacity-40"
                                style={{
                                  backgroundImage: "radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#cba768 1px, transparent 1px)",
                                  backgroundSize: "20px 20px",
                                  backgroundPosition: "0 0, 10px 10px",
                                }}
                              />
                              <div className="relative z-10 text-center p-4">
                                <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-pulse" />
                                <div className="text-sm font-black text-white">400 Micron Heavy Polymer Substrate</div>
                                <div className="text-xs text-slate-300 mt-1 max-w-md">
                                  {selectedProduct.finishType || "Silk Matt"} finish • Cured with instant-dry UV LED photo-initiator inks • Resists permanent creasing and 100% impervious to moisture
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Zoom Active Floating Lens Pill */}
                          {isHoverZoomActive && (
                            <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 pointer-events-none z-20">
                              <ZoomIn className="w-3.5 h-3.5 text-purple-400" />
                              <span>2.5x Micro Texture Inspection ({Math.round(zoomCoords.x)}%, {Math.round(zoomCoords.y)}%)</span>
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg pointer-events-none z-10 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            <span>Macro Substrate Grain • 300+ DPI Optical Inspection</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Substrate Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Thickness</span>
                        <span className="font-extrabold text-slate-800">{selectedProduct.micron ? `${selectedProduct.micron} Micron Rigid PVC` : "350 GSM Artboard"}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Corners</span>
                        <span className="font-extrabold text-slate-800">3mm Precision Rounded</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Durability</span>
                        <span className="font-extrabold text-emerald-700">100% Tear & Waterproof</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Packaging</span>
                        <span className="font-extrabold text-slate-800">Free Acrylic Dispenser</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (5 cols): Specs & Fast Actions */}
                  <div className="xl:col-span-5 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {selectedProduct.categoryName}
                        </span>
                        {selectedProduct.badge && (
                          <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                            {selectedProduct.badge}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{selectedProduct.title}</h2>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{selectedProduct.specs}</p>
                    </div>

                    {/* Price & Commercial GST Badge */}
                    <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl border border-slate-700 shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 block">Starting Commercial Rate</span>
                          <span className="text-3xl font-black tracking-tight">{selectedProduct.startingPrice}</span>
                          <span className="text-xs text-slate-400 font-semibold ml-1">/ unit</span>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block text-xs font-black px-3 py-1 rounded-full ${
                            selectedProduct.isGstIncluded
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          }`}>
                            {selectedProduct.isGstIncluded ? "✓ Rate Includes 18% GST" : "+18% GST Extra At Checkout"}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-1">Min Order: {selectedProduct.minQty}</span>
                        </div>
                      </div>
                    </div>

                    {/* Core Specifications Table */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Material Substrate:</span>
                        <span className="font-extrabold text-slate-800">{selectedProduct.cardMaterial || "Solid PVC Polymer"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Caliper / Thickness:</span>
                        <span className="font-extrabold text-slate-800">{selectedProduct.micron ? `${selectedProduct.micron} Micron (0.40mm)` : "350 GSM Artboard"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Surface Finish:</span>
                        <span className="font-extrabold text-slate-800">{selectedProduct.finishType || "Silk Matt"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Printed Sides:</span>
                        <span className="font-extrabold text-slate-800">{selectedProduct.sides === 1 ? "1-Sided" : "2-Sided (Front + Back)"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Finished Trim Size:</span>
                        <span className="font-extrabold text-slate-800">89 mm × 51 mm (Standard)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Dispatch Speed:</span>
                        <span className="font-extrabold text-emerald-700">{selectedProduct.leadTime || "2 Days Dispatch"} (Pan-India Air)</span>
                      </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="space-y-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setProductViewTab("studio")}
                        className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                      >
                        <Sliders className="w-4 h-4 text-emerald-400" />
                        <span>Customize Front & Back in Live Studio</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowUploadModal(true)}
                        className="w-full py-3.5 px-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <UploadCloud className="w-4 h-4 text-emerald-700" />
                        <span>Upload Print-Ready Artwork File (PDF/AI)</span>
                      </button>
                    </div>

                    {/* Guarantee Seals */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>100% Quality & Proof Guarantee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>BlueDart Air Pan-India Dispatch</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* DAY 4 COMPONENT 3: DETAILED PRODUCT SPECIFICATION TABS                    */}
            {/* ========================================================================= */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-10 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Technical Production Guide</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Detailed Product Specifications
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Complete material composition, finishing parameters, bleed safety tolerances, and logistics compliance.
                  </p>
                </div>

                {/* Tabs Selector Bar */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setSpecActiveTab("substrate")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      specActiveTab === "substrate"
                        ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Paper & Substrate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecActiveTab("finish")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      specActiveTab === "finish"
                        ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Surface & Finish</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecActiveTab("dimensions")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      specActiveTab === "dimensions"
                        ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dimensions & Bleed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecActiveTab("packaging")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      specActiveTab === "packaging"
                        ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Package className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Packaging & Courier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecActiveTab("tax")}
                    className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      specActiveTab === "tax"
                        ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>GST & Invoicing</span>
                  </button>
                </div>
              </div>

              {/* Specification Tab Contents */}
              <div className="mt-4">
                {/* TAB 1: PAPER & SUBSTRATE THICKNESS */}
                {specActiveTab === "substrate" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Caliper & Thickness</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {selectedProduct.micron
                          ? `Heavy-duty ${selectedProduct.micron} Micron (0.40 mm) solid rigid polymer. Identical in stiffness and tactile weight to a banking smart card.`
                          : "350 GSM premium European art card with ultra-dense multi-layer pulp core."}
                      </p>
                      <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                        High Tensile Rigidity • Zero Crease
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Impervious To Moisture & Grease</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        100% waterproof and tearproof construction. Can be wiped clean with alcohol rubs or sanitizers without bleeding, discoloration, or edge fraying.
                      </p>
                      <div className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                        Tested with Hand Sanitizers & Coffee
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Hydraulic Die-Cut Corners</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Smooth 3mm precision radius corner profiling. Eliminates sharp card edges, preventing pocket snagging and cardholder tearing.
                      </p>
                      <div className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                        Precision R3 Curved Profile
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: SURFACE & FINISH */}
                {specActiveTab === "finish" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Silk Matt Anti-Glare Coating</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Ultra-smooth satin lamination eliminates light glare under fluorescent office lighting while maintaining rich deep blacks and micro-text readability.
                      </p>
                      <div className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md inline-block">
                        Zero Glare • Anti-Fingerprint
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">3D Raised Spot UV & Metallic Foil</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Targeted clear polymer gloss raised 50 microns above matte card surface, combined with hot-stamped real metallic gold or silver foil for tactile brand prestige.
                      </p>
                      <div className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                        100% In-Register Precision
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Printer className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">UV LED Cured Polymer Inks</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Printed on industrial high-resolution digital offset presses with immediate ultraviolet LED polymerization. Colors are dry instantly with a 5-year anti-fade guarantee.
                      </p>
                      <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                        CMYK 300+ DPI Industrial Offset
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: DIMENSIONS & BLEED */}
                {specActiveTab === "dimensions" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                          <div>
                            <span className="text-xs font-black text-slate-900">Finished Trim Cut Size: 89 mm × 51 mm (3.5″ × 2.0″)</span>
                            <p className="text-[11px] text-slate-500 mt-0.5">The exact final card dimension after hydraulic precision blade cutting.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                          <div>
                            <span className="text-xs font-black text-rose-800">Artwork Full Bleed Size: 92 mm × 54 mm (3.62″ × 2.12″)</span>
                            <p className="text-[11px] text-slate-500 mt-0.5">Includes a mandatory +1.5 mm bleed margin on all four borders so background colors print cleanly edge-to-edge.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                          <div>
                            <span className="text-xs font-black text-emerald-800">Safe Margin Zone: 83 mm × 45 mm (3.25″ × 1.75″)</span>
                            <p className="text-[11px] text-slate-500 mt-0.5">Keep all essential text, contact numbers, and QR codes at least 3 mm inside the trim line to prevent edge trimming.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Bleed Box SVG Diagram */}
                    <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl text-white flex flex-col items-center justify-center border border-slate-800">
                      <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <span>Visual Pre-Flight Bleed & Margin Map</span>
                      </div>
                      <div className="w-full max-w-[420px] aspect-[1.75/1] relative border-2 border-dashed border-rose-500/80 rounded-xl p-3 flex items-center justify-center">
                        <span className="absolute top-1 left-2 text-[9px] font-mono text-rose-400">Bleed Boundary (92×54 mm)</span>
                        <div className="w-full h-full border-2 border-slate-400 rounded-lg p-3 relative flex items-center justify-center bg-slate-900/60">
                          <span className="absolute top-1 left-2 text-[9px] font-mono text-slate-300">Trim Cut Line (89×51 mm)</span>
                          <div className="w-full h-full border-2 border-dashed border-emerald-400/80 rounded-md flex items-center justify-center bg-emerald-950/20">
                            <span className="text-[10px] font-black text-emerald-300 font-mono text-center">
                              Safe Zone (83×45 mm)<br />
                              <span className="text-[8px] font-normal text-slate-300">Logos, Text & QR Code Kept Here</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-rose-500 rounded-xs" /> Bleed +1.5mm</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-slate-400 rounded-xs" /> Trim Cut</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-400 rounded-xs" /> Safe Area</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: PACKAGING & COURIER */}
                {specActiveTab === "packaging" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                        <Package className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Crystal Acrylic Dispenser Box</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Every 100 cards are dispatched in a heavy-duty, reusable crystal acrylic desk dispenser case. Protects cards from humidity, dust, and corner friction.
                      </p>
                      <div className="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md inline-block">
                        Included Free With Every Order
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Truck className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">24-48 Hours Express Dispatch</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Orders confirmed before 1:00 PM IST enter print queueing immediately. Dispatched from Bangalore printing hub via BlueDart Air, Delhivery, or DTDC Express.
                      </p>
                      <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                        Pan-India Air Courier Tracking
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Reinforced 5-Ply Shipping</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Outer packaging uses heavy 5-ply corrugated cardboard with bubble cushioning and tamper-evident security tape to ensure zero transit damage.
                      </p>
                      <div className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                        Tamper-Evident Safety Tape
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: GST & INVOICING */}
                {specActiveTab === "tax" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">HSN Code 4911 Compliance</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Classified under HSN 4911 (Commercial Printed Trade Stationery). Official B2B GST tax invoice generated automatically upon order fulfillment.
                      </p>
                      <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                        Standard 18% GST Bracket
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">100% Input Tax Credit (ITC)</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Enter your company GSTIN during checkout to claim the full 18% Input Tax Credit on your GSTR-2B. Invoices include complete tax breakdown and HSN codes.
                      </p>
                      <div className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                        Instant GST Invoicing with GSTIN
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900">Transparent Pricing Rule</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {selectedProduct.isGstIncluded
                          ? "This PVC product rate is strictly inclusive of 18% GST. No unexpected tax will be added to this item during checkout."
                          : "Standard corporate stationery rates have +18% GST calculated transparently at checkout with an itemized tax breakdown."}
                      </p>
                      <div className={`text-[11px] font-bold px-2.5 py-1 rounded-md inline-block ${
                        selectedProduct.isGstIncluded ? "text-emerald-700 bg-emerald-50" : "text-amber-800 bg-amber-50"
                      }`}>
                        {selectedProduct.isGstIncluded ? "Rate Includes 18% GST" : "+18% GST Added at Checkout"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* ========================================================================= */}
            {/* REFERENCE CARDS & PHYSICAL SUBSTRATE VIEWING GALLERY                     */}
            {/* ========================================================================= */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-10 shadow-xs">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Card Material & Reference Showcase</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Explore Different Types of Visiting Cards & Finishes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Compare physical substrates, surface lamination, tactile embossing, and holographic treatments before ordering. Click any card to instantly load and edit in the Live 3D Studio.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "all", label: "All Card Types (12)" },
                    { id: "pvc-basic", label: "Gloss & Matt PVC" },
                    { id: "metallic", label: "Metallic & Rainbow" },
                    { id: "luxury", label: "Foil Stamp & Spot UV" },
                    { id: "frosted", label: "Clear & Frosted" },
                    { id: "smart", label: "Embossed & Smart" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCardReferenceFilter(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        cardReferenceFilter === tab.id
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reference Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
                {ALL_PRODUCTS.filter((p) => p.category === "visiting-cards")
                  .filter((p) => {
                    if (cardReferenceFilter === "all") return true;
                    if (cardReferenceFilter === "pvc-basic") return p.id.includes("glossy") || (p.id.includes("matt") && !p.id.includes("foiling") && !p.id.includes("spot-uv"));
                    if (cardReferenceFilter === "metallic") return p.id.includes("silver") || p.id.includes("rainbow") || p.id.includes("glitter");
                    if (cardReferenceFilter === "luxury") return p.id.includes("foiling") || p.id.includes("spot-uv") || p.id.includes("gold-foil");
                    if (cardReferenceFilter === "frosted") return p.id.includes("transparent");
                    if (cardReferenceFilter === "smart") return p.id.includes("embossed") || p.id.includes("royal") || p.id.includes("classic");
                    return true;
                  })
                  .map((card) => {
                    const isCurrent = selectedProduct?.id === card.id;
                    return (
                      <div
                        key={card.id}
                        className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                          isCurrent
                            ? "border-emerald-600 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/20"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                        }`}
                      >
                        {/* Card Image Preview with Badge */}
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden border-b border-slate-100">
                          {card.image ? (
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                              {card.title}
                            </div>
                          )}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            {card.badge && (
                              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-full shadow-xs">
                                {card.badge}
                              </span>
                            )}
                            {card.isGstIncluded && (
                              <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50/90 border border-emerald-200 px-1.5 py-0.5 rounded">
                                GST Included
                              </span>
                            )}
                          </div>
                          {isCurrent && (
                            <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Active in Studio
                            </div>
                          )}
                        </div>

                        {/* Card Details */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                              {card.categoryName} • {card.cardMaterial || "400 Micron Polymer"}
                            </span>
                            <h4 className="text-sm font-black text-slate-900 leading-snug group-hover:text-emerald-700 transition">
                              {card.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {card.specs}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2 border-t border-slate-100">
                            {/* Features list */}
                            <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-600 font-semibold">
                              <span className="bg-slate-100 px-2 py-0.5 rounded">Waterproof</span>
                              <span className="bg-slate-100 px-2 py-0.5 rounded">300 DPI Vector</span>
                              <span className="bg-slate-100 px-2 py-0.5 rounded">2-Day Hub Dispatch</span>
                            </div>

                            {/* Price & Action */}
                            <div className="flex items-center justify-between pt-1">
                              <div>
                                <span className="text-[10px] text-slate-400 block font-medium">Starting at</span>
                                <span className="text-base font-black text-slate-900">
                                  {card.startingPrice}{" "}
                                  <span className="text-[10px] font-normal text-slate-500">/ pc</span>
                                </span>
                              </div>

                              {isCurrent ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (typeof window !== "undefined") {
                                      window.scrollTo({ top: 350, behavior: "smooth" });
                                    }
                                  }}
                                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Editing in Studio ↑</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => selectProductById(card.id, true)}
                                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1 shadow-xs hover:shadow cursor-pointer"
                                >
                                  <span>Customise →</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Interactive Substrate Comparison Matrix Table */}
              <div className="mt-12 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      Physical Substrate & Material Comparison Guide
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Technical specifications for all Bangalore manufacturing press substrates.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919945039266?text=Hi%20Incredible%20Treasures,%20please%20send%20me%20the%20physical%20visiting%20card%20sample%20kit%20to%20feel%20all%20materials."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-bold transition shadow-2xs"
                  >
                    <Package className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Order Physical Sample Kit (+91 9945039266)</span>
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-900 font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Card Type / Substrate</th>
                        <th className="py-2.5 px-3">Thickness</th>
                        <th className="py-2.5 px-3">Surface Finish & Tactile Feel</th>
                        <th className="py-2.5 px-3">Durability</th>
                        <th className="py-2.5 px-3">Best Corporate Use</th>
                        <th className="py-2.5 px-3">Starting Rate</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 font-medium">
                      {[
                        {
                          id: "pvc-regular-glossy",
                          name: "Regular Glossy PVC",
                          thick: "400 Micron Polymer",
                          finish: "Mirror-smooth Ultra Gloss",
                          durable: "100% Waterproof & Tearproof",
                          use: "Corporate IDs, High-Impact Color",
                          rate: "₹9.75 / pc",
                        },
                        {
                          id: "pvc-regular-matt",
                          name: "Regular Matt PVC",
                          thick: "400 Micron Polymer",
                          finish: "Silk Matt Anti-Glare Touch",
                          durable: "100% Waterproof, Fingerprint-Resistant",
                          use: "Law Firms, Medical, Architecture",
                          rate: "₹9.75 / pc",
                        },
                        {
                          id: "pvc-brushed-silver",
                          name: "Brushed Silver Metallic",
                          thick: "400 Micron Metallic",
                          finish: "Horizontal Hairline Grain Sheen",
                          durable: "100% Waterproof, Executive Grade",
                          use: "C-Suite, Tech Founders, Finance",
                          rate: "₹12.50 / pc",
                        },
                        {
                          id: "pvc-rainbow",
                          name: "Rainbow Holographic",
                          thick: "400 Micron Iridescent",
                          finish: "Prismatic Multi-Angle Shimmer",
                          durable: "100% Waterproof & UV Proof",
                          use: "Creative Agencies, Media, Fashion",
                          rate: "₹12.50 / pc",
                        },
                        {
                          id: "pvc-transparent",
                          name: "Clear Frosted PVC",
                          thick: "400 Micron Translucent",
                          finish: "Matte Frosted Transparency",
                          durable: "100% Waterproof, Ultra-Durable",
                          use: "Modern Boutiques, Design Studios",
                          rate: "₹11.75 / pc",
                        },
                        {
                          id: "pvc-glitter",
                          name: "Gold / Silver Glitter",
                          thick: "400 Micron Resin",
                          finish: "Embedded Sparkling Flakes",
                          durable: "100% Waterproof, Solid Core",
                          use: "Luxury Events, VIP Memberships",
                          rate: "₹15.00 / pc",
                        },
                        {
                          id: "pvc-embossed",
                          name: "Embossed Characters PVC",
                          thick: "400 Micron White PVC",
                          finish: "Raised 3D Physical Relief",
                          durable: "Permanent Tactile Texture",
                          use: "Exclusive VIP Cards, Club Members",
                          rate: "₹15.25 / pc",
                        },
                        {
                          id: "pvc-matt-foiling",
                          name: "Gold Foil Stamped PVC",
                          thick: "400 Micron Matt PVC",
                          finish: "Hot Stamped Metallic Mirror Foil",
                          durable: "Scratch-Resistant Foil Layer",
                          use: "High Jewelry, Luxury Real Estate",
                          rate: "₹16.50 / pc",
                        },
                        {
                          id: "pvc-matt-spot-uv",
                          name: "Spot UV Gloss Accent",
                          thick: "400 Micron Matt Base",
                          finish: "Raised Clear Gloss Varnish",
                          durable: "High-Contrast Tactile Depth",
                          use: "Brand Agencies, Technology Suites",
                          rate: "₹14.00 / pc",
                        },
                      ].map((sub, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-100/70 transition">
                          <td className="py-3 px-3 font-bold text-slate-900">{sub.name}</td>
                          <td className="py-3 px-3 text-slate-600">{sub.thick}</td>
                          <td className="py-3 px-3 text-slate-700">{sub.finish}</td>
                          <td className="py-3 px-3 text-emerald-800 font-semibold">{sub.durable}</td>
                          <td className="py-3 px-3 text-slate-500">{sub.use}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{sub.rate}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => selectProductById(sub.id, true)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition cursor-pointer"
                            >
                              Load in Studio →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* 4. Official Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-sm text-slate-600 mt-16">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="relative h-11 w-48 mb-2">
                  <Image
                    src="/images/logo-transparent.png"
                    alt="Incredible Treasures"
                    fill
                    sizes="192px"
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct Web-to-Print Platform & Corporate Printing Solutions. High-definition offset & digital printing dispatched across India.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Core Products
              </h4>
              <ul className="space-y-2 text-xs">
                <li>Visiting Cards (50+ Design Templates)</li>
                <li>Custom Printed Envelopes (DL & C5)</li>
                <li>Executive Bond Letterheads</li>
                <li>Self-Inking Company Rubber Stamps</li>
                <li>Branded Corporate Polo T-Shirts</li>
                <li>Ceramic Coffee Mugs (Sublimation & Logo Print)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Contact & Support
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="tel:+919945039266" className="hover:text-emerald-700">+91 9945039266</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="mailto:contact@incredible-treasures.com" className="hover:text-emerald-700">
                    contact@incredible-treasures.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Yelahanka, Bengaluru – 560064</span>
                </li>
                <li className="text-slate-400 pt-1">
                  Working Hours: Mon – Sat, 9:30 AM to 7:00 PM IST
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                B2B Invoicing & Logistics
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                All business purchases include official GST tax invoices for claiming 18% Input Tax Credit (ITC). Local Bangalore dispatches handled via BlueDart / Express couriers.
              </p>
              <div className="text-xs text-slate-500">
                <span>Accepted: </span>
                <span className="font-semibold text-slate-700">UPI, NetBanking, Cards, Razorpay</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 M/s Incredible Treasures. All rights reserved.
            </div>
            <div>
              Bangalore Web-to-Print Platform
            </div>
          </div>
        </div>
      </footer>

      {/* 4.5. Instant Quick Specs Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs flex items-center justify-center">
                {quickViewProduct.category === "visiting-cards" ? (
                  <VisitingCardCatalogPreview product={quickViewProduct} name={customerName || "Mahi Kapoor"} />
                ) : (
                  <Image
                    src={quickViewProduct.image}
                    alt={quickViewProduct.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover"
                  />
                )}
                {quickViewProduct.badge && (
                  <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                    {quickViewProduct.categoryName}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1 leading-snug">
                    {quickViewProduct.title}
                  </h3>
                  {quickViewProduct.sourceCatalog && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{quickViewProduct.sourceCatalog}</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 font-medium">Starting Bulk Price:</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-slate-900">{quickViewProduct.startingPrice}</span>
                      {quickViewProduct.isGstIncluded ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80 block mt-0.5">
                          ✓ Price Incl. 18% GST
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80 block mt-0.5">
                          + 18% GST Extra at Checkout
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Minimum Quantity:</span>
                    <span className="font-bold text-slate-800">{quickViewProduct.minQty}</span>
                  </div>
                </div>

                {quickViewProduct.pricingTiers && quickViewProduct.pricingTiers.length > 0 && (
                  <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/70 space-y-1 text-xs">
                    <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
                      Official Tier Rates (Incl. 18% GST):
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-center pt-1">
                      {quickViewProduct.pricingTiers.map((t) => (
                        <div key={t.qty} className="bg-white p-1.5 rounded-lg border border-emerald-100 shadow-2xs">
                          <span className="font-extrabold text-slate-900 block text-[11px]">{t.qty} pcs</span>
                          <span className="font-black text-emerald-700 block text-xs">₹{t.pricePerUnit.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-500 block">Tot: ₹{t.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-slate-600 space-y-1.5 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  <div className="font-bold text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Specifications:
                  </div>
                  <p className="leading-relaxed">{quickViewProduct.specs}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/919945039266?text=${encodeURIComponent(
                      `Hello Incredible Treasures, I would like an urgent quote for: ${quickViewProduct.title} (${quickViewProduct.startingPrice}, MOQ: ${quickViewProduct.minQty}) from catalog: ${quickViewProduct.sourceCatalog || 'Catalog'}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Inquire on WhatsApp (+91 9945039266)</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const prod = quickViewProduct;
                        setQuickViewProduct(null);
                        selectProductById(prod.id, false);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-xs font-bold transition text-center cursor-pointer"
                    >
                      View Full Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const prod = quickViewProduct;
                        if (prod.pricingTiers && prod.pricingTiers.length > 0) {
                          const baseTier = prod.pricingTiers[0];
                          addItemToCart({
                            productId: prod.id,
                            title: `${prod.title} (${baseTier.qty} pcs)`,
                            categoryName: prod.categoryName,
                            image: prod.image,
                            quantity: baseTier.qty,
                            unitPrice: baseTier.pricePerUnit,
                            branding: prod.finishType || "400 Micron Polymer",
                            specs: `400 Micron • ${prod.sides}-Sided • Price Includes 18% GST`,
                            isGstIncluded: true,
                          });
                        } else {
                          const priceNum = parseFloat(prod.startingPrice.replace(/[^0-9.]/g, "")) || 250;
                          addItemToCart({
                            productId: prod.id,
                            title: `${prod.title} (Evaluation Sample)`,
                            categoryName: prod.categoryName,
                            image: prod.image,
                            quantity: 1,
                            unitPrice: priceNum,
                            branding: "Standard Evaluation",
                            specs: `${prod.specs} • (+18% GST Extra)`,
                            isGstIncluded: false,
                          });
                        }
                        setQuickViewProduct(null);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition text-center cursor-pointer"
                    >
                      {quickViewProduct.pricingTiers && quickViewProduct.pricingTiers.length > 0
                        ? `Add ${quickViewProduct.pricingTiers[0].qty} Pcs`
                        : "Add Sample"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Direct Print File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <UploadCloud className="w-6 h-6 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Upload Ready Artwork File</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6 border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-emerald-50/20 hover:border-emerald-500 transition cursor-pointer">
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-800">
                Click or drag & drop print file here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF, AI, PSD, CDR, EPS, high-res PNG (Max 50MB)
              </p>
              <div className="mt-4 inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                300 DPI Pre-Flight Check
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>• Standard Visiting Card: 89 x 54 mm (2mm bleed)</div>
              <div>• Standard DL Envelope: 220 x 110 mm</div>
              <div>• Color Format: CMYK recommended for offset print</div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  addItemToCart({
                    productId: "custom-print-artwork",
                    title: "Ready Print Artwork Pre-Flight Job",
                    categoryName: "Custom Print",
                    image: "/images/gold-foil-card.jpg",
                    quantity: 1,
                    unitPrice: 450,
                    branding: "300 DPI Pre-Flight Check",
                    specs: "Direct PDF/AI Print File Verification",
                  });
                }}
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
              >
                Confirm & Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DAY 4: WRITE A REVIEW MODAL                                               */}
      {/* ========================================================================= */}
      {showWriteReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Write a Corporate Review</h3>
                  <p className="text-xs text-slate-500">{selectedProduct?.title || "Custom Visiting Cards"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWriteReviewModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 pt-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setNewReviewRating(st)}
                      className="p-1 hover:scale-110 transition cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          st <= newReviewRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200 hover:text-amber-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-extrabold text-slate-700 ml-2">
                    {newReviewRating === 5 && "5.0 - Exceptional Quality"}
                    {newReviewRating === 4 && "4.0 - Very Good"}
                    {newReviewRating === 3 && "3.0 - Average"}
                    {newReviewRating === 2 && "2.0 - Below Expectation"}
                    {newReviewRating === 1 && "1.0 - Poor"}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Designation
                  </label>
                  <input
                    type="text"
                    value={newReviewRole}
                    onChange={(e) => setNewReviewRole(e.target.value)}
                    placeholder="e.g. Director / Founder"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Company & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newReviewCompany}
                    onChange={(e) => setNewReviewCompany(e.target.value)}
                    placeholder="e.g. Apex Global Logistics"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Order Quantity
                  </label>
                  <select
                    value={newReviewQty}
                    onChange={(e) => setNewReviewQty(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="200 pcs">200 pcs</option>
                    <option value="500 pcs">500 pcs</option>
                    <option value="1000 pcs">1000 pcs</option>
                    <option value="2500 pcs">2500 pcs</option>
                    <option value="5000 pcs">5000 pcs</option>
                  </select>
                </div>
              </div>

              {/* Review Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Substantial 400 Micron thickness. Zero bend."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Review Comments */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details on print sharpness, cardstock rigidity, finish quality, and dispatch speed..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowWriteReviewModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition cursor-pointer shadow-md"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SLIDE-OVER CORPORATE SHOPPING CART DRAWER                              */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-[92%] sm:w-full max-w-md bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Corporate Order Cart</h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {cartItems.length} product{cartItems.length !== 1 ? "s" : ""} • Ready for order review
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Your cart is currently empty</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Explore our corporate stationery, ceramic mugs, apparel, and 3D visiting card studio.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      window.scrollTo({ top: 350, behavior: "smooth" });
                    }}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-xs hover:bg-emerald-700 transition"
                  >
                    Browse Catalog Now
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition space-y-3"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 relative overflow-hidden shrink-0 shadow-xs">
                        <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                              {item.title}
                            </h4>
                            {item.isGstIncluded ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded mt-0.5">
                                ✓ Rate Includes 18% GST (Zero Extra Tax)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[9px] font-extrabold px-1.5 py-0.5 rounded mt-0.5 border border-amber-300/60">
                                + 18% GST Extra Added at Checkout
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeCartItem(item.id)}
                            className="text-slate-400 hover:text-red-600 transition p-1 shrink-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] text-emerald-800 font-semibold block mt-0.5">
                          {item.branding || item.categoryName}
                        </span>
                        {item.specs && (
                          <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                            {item.specs}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-slate-900 px-2 min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">
                          @ ₹{item.unitPrice.toFixed(2)}/pc {item.isGstIncluded ? "(Incl. 18% GST)" : "(+ 18% GST)"}
                        </span>
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Financial Summary & Actions */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Subtotal:</span>
                    <span className="font-semibold text-slate-900">₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  {cartGst > 0 && (
                    <>
                      <div className="flex justify-between text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-amber-200">
                        <span>GST (18%) on Regular Products:</span>
                        <span className="font-bold">₹{cartGst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 pl-2">
                        <span>• CGST (9%): ₹{(cartGst / 2).toFixed(2)}</span>
                        <span>• SGST (9%): ₹{(cartGst / 2).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  {cartIncludedGst > 0 && (
                    <div className="flex justify-between text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-emerald-200/80">
                      <span>PVC Cards 18% GST:</span>
                      <span className="font-bold">₹{cartIncludedGst.toFixed(2)} (Already in Price)</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="text-emerald-700 text-base font-black">₹{cartGrandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/919945039266?text=${encodeURIComponent(
                      `Hello Incredible Treasures,\n\nI would like to place a corporate order with the following items:\n\n` +
                        cartItems
                          .map(
                            (it, i) =>
                              `${i + 1}. ${it.title}\n   • Qty: ${it.quantity} units\n   • Rate: ₹${it.unitPrice}${it.isGstIncluded ? ' (Incl. 18% GST)' : ''}\n   • Customization: ${it.branding || 'Standard'}\n   • Total: ₹${(it.unitPrice * it.quantity).toFixed(2)}`
                          )
                          .join("\n\n") +
                        `\n\n--------------------------\n• Subtotal: ₹${cartSubtotal.toFixed(2)}${cartIncludedGst > 0 ? `\n• Embedded GST (Already Included): ₹${cartIncludedGst.toFixed(2)}` : ''}\n• Additional GST (18%): ₹${cartGst.toFixed(2)}\n• Grand Total: ₹${cartGrandTotal.toFixed(2)}\n\nPlease send bank proforma invoice & delivery timeline.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Checkout Entire Order on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setShowInvoiceModal(true)}
                    className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Generate Proforma Tax Invoice (PDF / Print)</span>
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 text-center">
                  Official GST Invoicing • Bangalore Manufacturing Hub • Doorstep Delivery
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. OFFICIAL PROFORMA TAX INVOICE PRINTABLE MODAL                          */}
      {/* ========================================================================= */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 my-8">
            {/* Top Toolbar (Non-printable) */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900">Official GST Proforma Quotation</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Print Document Content */}
            <div className="pt-6 space-y-6 text-xs text-slate-700">
              {/* Letterhead Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-slate-900">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="relative h-12 w-52">
                      <Image
                        src="/images/logo.png"
                        alt="Incredible Treasures"
                        fill
                        sizes="208px"
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    Direct Web-To-Print, Corporate Stationery & Luxury Merchandise Hub
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Yelahanka, Bengaluru – 560064, Karnataka, India<br />
                    Web: www.incredible-treasures.com
                  </p>
                </div>

                <div className="sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Document Type</span>
                  <span className="text-base font-black text-slate-900 block">PROFORMA INVOICE</span>
                  <span className="text-[11px] text-slate-600 block mt-1">Doc No: <strong>IT-EST-2026-0842</strong></span>
                  <span className="text-[11px] text-slate-600 block">Date: <strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">Valid For: 15 Days</span>
                </div>
              </div>

              {/* Bill To Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Billed / Quoted To:
                  </span>
                  <span className="font-bold text-slate-900 text-xs block">{companyName}</span>
                  <span className="text-slate-600 block">Attn: {customerName} ({customerDesignation})</span>
                  <span className="text-slate-600 block">{address}</span>
                  <span className="text-slate-600 block">Contact: {phone} • {email}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Supply Details:
                  </span>
                  <span className="text-slate-600 block">Place of Supply: <strong>Karnataka (29)</strong></span>
                  <span className="text-slate-600 block">Dispatch Mode: <strong>Bangalore Direct Hub / Bluedart Air</strong></span>
                  <span className="text-slate-600 block">Payment Terms: <strong>100% Advance Against Proforma</strong></span>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3">Branding / Specs</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Rate</th>
                      <th className="py-2.5 px-3 text-right">Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cartItems.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-400">{idx + 1}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {item.title}
                          {item.isGstIncluded ? (
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded ml-1.5">
                              Rate Incl. 18% GST
                            </span>
                          ) : (
                            <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded ml-1.5">
                              + 18% GST Extra
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">{item.branding || item.specs || "Standard"}</td>
                        <td className="py-2.5 px-3 text-center font-bold">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-right">₹{item.unitPrice.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-slate-900">
                          ₹{(item.unitPrice * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Totals Calculation */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
                <div className="text-[11px] text-slate-500 max-w-sm space-y-1">
                  <p className="font-bold text-slate-800">Terms & Conditions:</p>
                  <p>1. Proof approval required before mass fabrication.</p>
                  <p>2. PVC Visiting Cards rates are inclusive of 18% GST. All other products are subject to 18% GST (+9% CGST, +9% SGST).</p>
                  <p>3. Subject to Bengaluru Jurisdiction.</p>
                </div>

                <div className="w-full sm:w-64 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs">
                    <span>Base Amount:</span>
                    <span className="font-bold text-slate-900">₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  {cartIncludedGst > 0 && (
                    <div className="flex justify-between text-[11px] text-emerald-800">
                      <span>Included GST (18%):</span>
                      <span className="font-semibold">₹{cartIncludedGst.toFixed(2)}</span>
                    </div>
                  )}
                  {cartGst > 0 && (
                    <>
                      <div className="flex justify-between text-xs">
                        <span>Additional CGST (9%):</span>
                        <span className="font-semibold text-slate-900">₹{(cartGst / 2).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Additional SGST (9%):</span>
                        <span className="font-semibold text-slate-900">₹{(cartGst / 2).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-300">
                    <span>Grand Total:</span>
                    <span className="text-emerald-700 text-base">₹{cartGrandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Authorized Signatory */}
              <div className="pt-8 border-t border-slate-200 flex justify-between items-end">
                <div className="text-[10px] text-slate-400">
                  This is a computer-generated proforma tax invoice.
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 text-xs">For INCREDIBLE TREASURES</div>
                  <div className="mt-8 text-[11px] text-slate-500 border-t border-slate-300 pt-1">
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7.5 VISUAL SEARCH (GOOGLE LENS & INDIAMART STYLE) MODAL                   */}
      {/* ========================================================================= */}
      {showVisualSearchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Modal Top Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">Visual Search Lens</h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                      Instant Match
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                    Upload an image or PDF to instantly identify matching corporate printing products.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowVisualSearchModal(false);
                  setVisualSearchFile(null);
                  setVisualSearchResults([]);
                  setIsAnalyzingVisual(false);
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close Visual Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              {/* Hidden File Input */}
              <input
                ref={visualSearchInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,.pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleVisualSearchFileUpload(e.target.files[0]);
                  }
                }}
              />

              {/* State 1: Dropzone (No File Uploaded Yet) */}
              {!visualSearchFile && (
                <div className="space-y-4">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleVisualSearchFileUpload(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => visualSearchInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center mx-auto mb-3 shadow-xs group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                      Drag and drop your product photo or PDF design here
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Supports JPG, PNG, WebP, or vector PDF artwork up to 15MB. Our visual lens scans typography, dimensions & substrate finishes.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-xs transition">
                      <FileUp className="w-3.5 h-3.5" />
                      <span>Browse Local Files</span>
                    </div>
                  </div>

                  {/* Quick 1-Click Samples */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Or test instant visual search with a sample:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {VISUAL_SEARCH_SAMPLES.map((sample, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            runVisualSearchAnalysis(
                              sample.name,
                              sample.previewUrl,
                              sample.type,
                              sample.sizeStr,
                              sample.category
                            );
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-full transition cursor-pointer"
                        >
                          <span>{sample.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* State 2: File Uploaded & Scanning / Results */}
              {visualSearchFile && (
                <div className="space-y-4">
                  {/* Visual Preview Box with Scanning Laser Line */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    {/* Preview Canvas */}
                    <div className="w-36 h-28 relative rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-300 flex items-center justify-center shadow-inner">
                      {visualSearchFile.type === "image" && visualSearchFile.previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={visualSearchFile.previewUrl}
                          alt={visualSearchFile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2 text-center text-white">
                          <FileText className="w-8 h-8 text-rose-400 mb-1" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200">PDF Document</span>
                        </div>
                      )}

                      {/* High-Tech Glowing Laser Scan Line (Traverses Vertically) */}
                      {isAnalyzingVisual && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#a9782b] animate-laser-scan" />
                        </div>
                      )}
                    </div>

                    {/* File Info & Status */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[220px]">
                          {visualSearchFile.name}
                        </span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded-full shrink-0">
                          {visualSearchFile.sizeStr}
                        </span>
                      </div>

                      {isAnalyzingVisual ? (
                        <div className="mt-2 space-y-1">
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <ScanLine className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                            <span>Scanning visual patterns & substrate dimensions...</span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Extracting aspect ratio, finish characteristics, and matching against catalog specs.
                          </p>
                        </div>
                      ) : (
                        <div className="mt-1.5 space-y-1">
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{visualSearchCategoryDetected}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Visual analysis complete. Found {visualSearchResults.length} direct catalog product matches.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Try Another Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setVisualSearchFile(null);
                        setVisualSearchResults([]);
                        setIsAnalyzingVisual(false);
                      }}
                      className="shrink-0 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white transition"
                    >
                      Upload Different File
                    </button>
                  </div>

                  {/* Results Section */}
                  {!isAnalyzingVisual && visualSearchResults.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                        <span>Top Visual Matches in Catalog</span>
                        <span className="text-emerald-700">{visualSearchResults.length} Verified Options</span>
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {visualSearchResults.map((item, resIdx) => (
                          <div
                            key={item.product.id || resIdx}
                            className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-12 h-12 relative rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.title}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 truncate">
                                    {item.product.title}
                                  </h5>
                                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                                    {item.matchBadge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                  {item.reason}
                                </p>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                  <span className="font-bold text-slate-800">From {item.product.startingPrice}</span>
                                  <span>•</span>
                                  <span>MOQ: {item.product.minQty}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  setQuickViewProduct(item.product);
                                  setShowVisualSearchModal(false);
                                }}
                                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition"
                              >
                                Quick Specs
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleApplyVisualMatchToStudio(
                                    item.product,
                                    visualSearchFile.type === "image" ? visualSearchFile.previewUrl : undefined
                                  )
                                }
                                className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs hover:shadow transition"
                              >
                                <span>Customise in Studio</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>IndiaMART & Google Lens Visual Recognition for Print Media</span>
              </span>
              <button
                onClick={() => {
                  setShowVisualSearchModal(false);
                  setVisualSearchFile(null);
                  setVisualSearchResults([]);
                  setIsAnalyzingVisual(false);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7.6 VOICE SEARCH MODAL (GOOGLE & INDIAMART STYLE)                         */}
      {/* ========================================================================= */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Top Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">Voice Search</h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Audio
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                    Speak any product name or request (e.g. &quot;I want to see visiting cards&quot;, &quot;Show mugs&quot;).
                  </p>
                </div>
              </div>
              <button
                onClick={stopVoiceSearch}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Close Voice Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 text-center space-y-6">
              {/* Pulsing Animated Microphone / Audio Wave Listener */}
              <div className="relative inline-flex items-center justify-center mx-auto">
                {/* Animated ripple rings */}
                {isVoiceListening && (
                  <>
                    <div className="absolute w-28 h-28 rounded-full bg-emerald-500/10 animate-ping pointer-events-none" />
                    <div className="absolute w-24 h-24 rounded-full bg-emerald-500/20 animate-pulse pointer-events-none" />
                  </>
                )}

                <button
                  type="button"
                  onClick={isVoiceListening ? stopVoiceSearch : startVoiceSearch}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer relative z-10 ${
                    isVoiceListening
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white scale-105 shadow-emerald-500/30 ring-4 ring-emerald-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:scale-105"
                  }`}
                  title={isVoiceListening ? "Tap to stop listening" : "Tap to speak"}
                >
                  <Mic className={`w-8 h-8 ${isVoiceListening ? "animate-pulse" : ""}`} />
                </button>
              </div>

              {/* Audio Wave Visualizer Bars */}
              {isVoiceListening && (
                <div className="flex items-center justify-center gap-1.5 h-10">
                  <span className="w-1 bg-emerald-500 rounded-full animate-voice-wave-1" />
                  <span className="w-1 bg-emerald-600 rounded-full animate-voice-wave-2" />
                  <span className="w-1.5 bg-emerald-500 rounded-full animate-voice-wave-3" />
                  <span className="w-1 bg-emerald-600 rounded-full animate-voice-wave-4" />
                  <span className="w-1 bg-emerald-500 rounded-full animate-voice-wave-5" />
                </div>
              )}

              {/* Status Text & Live Transcript */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {voiceStatusText}
                </p>
                {voiceTranscript ? (
                  <div className="text-base sm:text-lg font-bold text-slate-900 bg-emerald-50 text-emerald-800 px-4 py-2.5 rounded-2xl border border-emerald-200 inline-block shadow-2xs">
                    &ldquo;{voiceTranscript}&rdquo;
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Try saying: &quot;I want to see visiting cards&quot; or &quot;Show mugs&quot;
                  </p>
                )}
              </div>

              {/* 1-Click Voice Test Prompts */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Or test instant voice command with a sample:</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { label: "Visiting Cards", query: "I want to see the visiting card" },
                    { label: "Custom Mugs", query: "Show me the mugs" },
                    { label: "Executive Letterheads", query: "Open executive letterheads" },
                    { label: "Corporate T-Shirts", query: "Show corporate t-shirts" },
                    { label: "Packaging Labels", query: "Show packaging labels" },
                    { label: "Regular Glossy PVC", query: "Regular Glossy PVC Visiting Card" },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleVoiceQuery(p.query)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex items-center gap-1"
                    >
                      <span>💬 {p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>IndiaMART & Google Voice Search for Corporate Printing</span>
              </span>
              <button
                onClick={stopVoiceSearch}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. FLOATING WHATSAPP ASSISTANCE WIDGET                                    */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        {isWhatsAppWidgetOpen && (
          <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">Incredible Treasures B2B Desk</h4>
                  <span className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    Online • Typically replies in 5m
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsWhatsAppWidgetOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2.5 text-xs">
              <p className="text-slate-600 font-medium leading-relaxed">
                Need quick bulk assistance, sample dispatch, or custom GST billing? Tap an option below:
              </p>

              {[
                {
                  label: "Request Bulk Quote (100+ pcs)",
                  msg: "Hi Incredible Treasures, I need a bulk quote for 100+ corporate items.",
                },
                {
                  label: "Submit Artwork for Free 3D Proof",
                  msg: "Hi, I have a vector logo and would like a digital preview mock-up.",
                },
                {
                  label: "Bangalore 48h Express Dispatch",
                  msg: "Hi, I have an urgent corporate printing requirement in Bangalore.",
                },
              ].map((query, qIdx) => (
                <a
                  key={qIdx}
                  href={`https://wa.me/919945039266?text=${encodeURIComponent(query.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl border border-slate-200 text-slate-700 font-semibold transition"
                >
                  💬 {query.label}
                </a>
              ))}

              <a
                href="https://wa.me/919945039266?text=Hi%20Incredible%20Treasures,%20I%20am%20browsing%20your%20website%20and%20need%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Open Direct WhatsApp (+91 9945039266)</span>
              </a>
            </div>
          </div>
        )}

        {/* Floating trigger button */}
        <button
          onClick={() => setIsWhatsAppWidgetOpen((v) => !v)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl transition hover:scale-105 group border-2 border-white relative"
          aria-label="Contact on WhatsApp"
        >
          <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Help</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping absolute -top-1 -right-1" />
        </button>
      </div>
    </div>
  );
}
