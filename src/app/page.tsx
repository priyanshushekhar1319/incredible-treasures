"use client";

import React, { useState, useRef } from "react";
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
} from "lucide-react";
import { ALL_PRODUCTS, CatalogProduct } from "@/data/products";

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

  // ================= 7. CERAMIC MUGS & VACUUM BOTTLES =================
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
    name: "Executive Matte Black & Gloss White Logo",
    category: "corporate",
    bgStyle: "bg-gradient-to-br from-[#18181B] to-[#0D0D0F]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#E2E8F0]",
    subColor: "text-[#94A3B8]",
    fontFamily: "font-sans",
    motifType: "clean",
    tag: "Corporate Gift",
  },
  {
    id: "flask-steel-laser",
    productId: "coffee-mugs",
    name: "750ml Vacuum Insulated Steel Sipper",
    category: "luxury",
    bgStyle: "bg-gradient-to-br from-[#0F172A] to-[#020617]",
    textColor: "text-[#FFFFFF]",
    accentColor: "text-[#FBBF24]",
    subColor: "text-[#D4AF37]",
    fontFamily: "font-sans",
    motifType: "wreath",
    tag: "Thermal Flask",
  },
];

// ALL_PRODUCTS and CatalogProduct are imported from @/data/products

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
}

export default function VistaprintStorePage() {
  // Navigation & Product Selection state
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  // Global Omnibar Search & Quick View state
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogProduct | null>(null);

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
    setIsEditorOpen(openEditor);
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

  // Template browser state
  const [templateFilter, setTemplateFilter] = useState<string>("all");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("vc-leaf-sage");
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  // Neutral Corporate Placeholder Data (No Personal Names)
  const [customerName, setCustomerName] = useState("Aditya Verma");
  const [customerDesignation, setCustomerDesignation] = useState("Managing Director");
  const [companyName, setCompanyName] = useState("Incredible Treasures");
  const [phone, setPhone] = useState("+91 99450 39266");
  const [email, setEmail] = useState("contact@incredible-treasures.com");
  const [address, setAddress] = useState("Century Saras, Yelahanka, Bengaluru – 560064");
  const [website, setWebsite] = useState("www.incredible-treasures.com");
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  // Card finish & quantity specifications
  const [selectedStock, setSelectedStock] = useState<"matte" | "glossy" | "goldFoil" | "linen">("matte");
  const [cornerStyle, setCornerStyle] = useState<"square" | "rounded">("square");
  const [quantity, setQuantity] = useState<number>(500);

  // Cart & UI feedback states
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart-sample-item-1",
      productId: "gold-foil-cards",
      title: "Gold Foil Business Cards (Sample Pack)",
      categoryName: "Visiting Cards",
      image: "/images/gold-foil-card.jpg",
      quantity: 100,
      unitPrice: 4.49,
      branding: "3D Raised Foil",
      specs: "400 GSM Velvet • Metallic Gold Finish",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [isWhatsAppWidgetOpen, setIsWhatsAppWidgetOpen] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cart financial calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartGst = Math.round(cartSubtotal * 0.18 * 100) / 100;
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
    addItemToCart({
      productId: selectedProduct?.id || "visiting-cards",
      title: `${selectedProduct?.title || "Custom Visiting Cards"} (${quantity} pcs)`,
      categoryName: "Visiting Cards",
      image: selectedProduct?.image || "/images/gold-foil-card.jpg",
      quantity: quantity,
      unitPrice: Number(perCardCost),
      branding: `${selectedStock.toUpperCase()} • ${cornerStyle} corners`,
      specs: `${pricingData[selectedStock].name} • Name: ${customerName}`,
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

  // Filter catalog products for sidebar & price filter
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
  });

  const categoryHeroInfo: Record<string, { title: string; subtitle: string; tag: string; image: string }> = {
    all: {
      tag: "Bangalore Web-to-Print & Corporate Suite",
      title: "View All 34+ Curated Products",
      subtitle: "Explore authentic manufacturing catalogs for crystal awards, drinkware, pens, gift hampers, apparel and tech gadgets.",
      image: "/images/catalog/awards/crystal-round-bevel.jpg",
    },
    awards: {
      tag: "Official Crystal & Trophy Catalog 2026",
      title: "Executive Crystal Awards & Trophies",
      subtitle: "Optical K9 glass, faceted star prisms, diamond peaks, and flame pillars with precision 3D subsurface & surface laser engraving.",
      image: "/images/catalog/awards/crystal-diamond-peak.jpg",
    },
    drinkware: {
      tag: "Aquabot 2025-2026 Collection",
      title: "Aquabot Bottles, Sippers & Ceramic Mugs",
      subtitle: "SUS 304 food-grade stainless steel, vacuum flasks, insulated travel tumblers, and dual-tone ceramic coffee mugs.",
      image: "/images/catalog/drinkware/aquabot-matte-steel-750.jpg",
    },
    pens: {
      tag: "Executive & Metal Pen Catalog 2026",
      title: "Luxury Metal & Eco-Friendly Pens",
      subtitle: "Korby gold-plated rollerballs, SCA Titan stylus multitools, and handcrafted wooden gift sets with custom laser engraving.",
      image: "/images/catalog/pens/korby-matt-gold-pen.jpg",
    },
    stationery: {
      tag: "iScape IA-Series & Conference Folios",
      title: "Executive Diaries, Notebooks & Folios",
      subtitle: "Sage green & navy PU leather journals, 80 GSM natural shade paper, classic folio binders, and zipper conference portfolios.",
      image: "/images/catalog/stationery/iscape-sage-hardcover-diary.jpg",
    },
    gifting: {
      tag: "Brillare Personal Care & AOP Diwali Suites",
      title: "Luxury Gift Sets & Corporate Hampers",
      subtitle: "Brillare wellness & grooming gift boxes, royal festive brass diya dry fruit hampers, and custom branded magnetic closure boxes.",
      image: "/images/catalog/gifting/brillare-minty-luxury-box.jpg",
    },
    apparel: {
      tag: "Highline & Backbencher Collections",
      title: "Corporate Apparel & Leatherite Tech Kits",
      subtitle: "Highline 240 GSM bio-washed matty polo shirts in 12 corporate shades, and The Backbencher Steven tech cord organizer kits.",
      image: "/images/catalog/apparel/steven-leatherite-tech-kit.jpg",
    },
    tech: {
      tag: "BrandCharger Exclusive European Brand",
      title: "BrandCharger Smart Gadgets & Drinkware",
      subtitle: "Horizon 360° Bluetooth speakers and Nomad intelligent touch LED temperature vacuum flasks with company branding.",
      image: "/images/catalog/tech/brandcharger-horizon-speaker.jpg",
    },
    "visiting-cards": {
      tag: "Incredible Treasures Signature Studio",
      title: "Luxury Visiting Cards & Stationery",
      subtitle: "Raised metallic gold foil, 350-400 GSM silk velvet finishes, self-inking stamps, and custom printed corporate envelopes.",
      image: "/images/gold-foil-card.jpg",
    },
  };

  const activeHero = categoryHeroInfo[activeCatalogCategory] || categoryHeroInfo.all;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased text-base">
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
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black tracking-tight text-slate-900 leading-none block">
                    Incredible<span className="text-emerald-600">Treasures</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">
                    Corporate Printing Hub
                  </span>
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
                  placeholder="Search 34+ products, pens, trophies..."
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
                { id: "all", label: "All Products (34 Items)", icon: Layers, badge: "Catalog" },
                { id: "visiting-cards", label: "Visiting Cards & Studio", icon: CreditCard, badge: "Interactive" },
                { id: "awards", label: "Crystal Trophies & Awards", icon: Trophy, badge: "K9 Crystal" },
                { id: "drinkware", label: "Drinkware, Mugs & Flasks", icon: Coffee, badge: "AquaBot" },
                { id: "pens", label: "Luxury Metal & Stylus Pens", icon: PenTool, badge: "Laser Engraved" },
                { id: "stationery", label: "Executive Diaries & Folios", icon: BookOpen, badge: "iScape" },
                { id: "gifting", label: "Luxury Gift Sets & Hampers", icon: Gift, badge: "Festive" },
                { id: "apparel", label: "Corporate Apparel & Tech Kits", icon: Shirt, badge: "Highline" },
                { id: "tech", label: "BrandCharger Smart Tech", icon: Smartphone, badge: "European" },
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
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-md"
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
              <div className="text-[10px] text-slate-500 text-center">
                GST: 29AAKFI2392F1Z5 • Yelahanka, Bengaluru
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Vistaprint Top Utility Bar (Clean Standard Web Proportions) */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 text-sm text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Customer Support: <strong>+91 9945039266</strong></span>
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-500">
              Yelahanka, Bengaluru – 560064 • GST: <strong>29AAKFI2392F1Z5</strong>
            </span>
          </div>

          <div className="flex items-center gap-5 text-sm">
            <button
              onClick={() => setShowUploadModal(true)}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Ready Design</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="hover:text-slate-900 cursor-pointer hidden sm:inline">Track Order</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hover:text-slate-900 cursor-pointer font-semibold">Sign In</span>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header with Omnibar & Cart */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 lg:gap-8">
          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-1 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition focus:outline-none"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo (Clicking returns to Catalog) */}
          <div
            onClick={() => {
              setSelectedProduct(null);
              setIsEditorOpen(false);
              setActiveDropdown(null);
            }}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none block">
                Incredible<span className="text-emerald-600">Treasures</span>
              </span>
              <span className="text-xs tracking-wider text-slate-400 uppercase font-bold block mt-1">
                Print & Corporate Solutions
              </span>
            </div>
          </div>

          {/* Centered Omnibar Search with Instant Live Typeahead */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search visiting cards, trophies, bottles, pens, gift boxes, diaries, speakers..."
              className="w-full pl-11 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3" />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Live Search Suggestions Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Matching Catalog Products ({searchResults.length})</span>
                  <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-700">Close</button>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No products matching &quot;{searchQuery}&quot;. Try searching &quot;crystal&quot;, &quot;pen&quot;, &quot;bottle&quot;, or &quot;gift&quot;.
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

          {/* Cart Pill & Mobile Search Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition"
            >
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>Upload Ready PDF</span>
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
        {/* AUTOMATIC HOVER MEGA-DROPDOWNS BAR (Triggers instantly on cursor hover!)  */}
        {/* ========================================================================= */}
        <div
          className="border-t border-slate-100 bg-[#FAFAFA] relative"
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-7 text-sm font-medium text-slate-700 py-3 whitespace-nowrap overflow-x-auto no-scrollbar">
            {/* View All (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("view-all")}
              onClick={() => setActiveDropdown(activeDropdown === "view-all" ? null : "view-all")}
              className={`flex items-center gap-1 cursor-pointer py-1 font-bold transition select-none ${
                activeDropdown === "view-all" ? "text-emerald-700 border-b-2 border-emerald-600" : "hover:text-emerald-700"
              }`}
            >
              <span>View All</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "view-all" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Visiting Cards (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("visiting-cards")}
              onClick={() => setActiveDropdown(activeDropdown === "visiting-cards" ? null : "visiting-cards")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "visiting-cards" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Visiting Cards</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "visiting-cards" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Stationery, Letterheads & Notebooks (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("stationery")}
              onClick={() => setActiveDropdown(activeDropdown === "stationery" ? null : "stationery")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "stationery" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Stationery, Letterheads & Notebooks</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "stationery" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Stamps and Ink (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("stamps")}
              onClick={() => setActiveDropdown(activeDropdown === "stamps" ? null : "stamps")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "stamps" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Stamps and Ink</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "stamps" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Signs, Posters & Marketing Materials (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("signs")}
              onClick={() => setActiveDropdown(activeDropdown === "signs" ? null : "signs")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "signs" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Signs, Posters & Marketing</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "signs" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Labels, Stickers & Packaging (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("labels")}
              onClick={() => setActiveDropdown(activeDropdown === "labels" ? null : "labels")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "labels" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Labels & Packaging</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "labels" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Clothing, Caps & Bags (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("clothing")}
              onClick={() => setActiveDropdown(activeDropdown === "clothing" ? null : "clothing")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "clothing" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Clothing, Caps & Bags</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "clothing" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Mugs, Albums & Gifts (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("mugs-gifts")}
              onClick={() => setActiveDropdown(activeDropdown === "mugs-gifts" ? null : "mugs-gifts")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "mugs-gifts" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Mugs, Albums & Gifts</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "mugs-gifts" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Pens (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("pens")}
              onClick={() => setActiveDropdown(activeDropdown === "pens" ? null : "pens")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "pens" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Pens</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "pens" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Drinkware (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("drinkware")}
              onClick={() => setActiveDropdown(activeDropdown === "drinkware" ? null : "drinkware")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "drinkware" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Drinkware</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "drinkware" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Custom Polo T-shirts (Hover & Click activated) */}
            <div
              onMouseEnter={() => handleMenuMouseEnter("polos")}
              onClick={() => setActiveDropdown(activeDropdown === "polos" ? null : "polos")}
              className={`flex items-center gap-1 cursor-pointer py-1 transition select-none ${
                activeDropdown === "polos" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "hover:text-emerald-700"
              }`}
            >
              <span>Custom Polo T-shirts</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "polos" ? "rotate-180 text-emerald-700" : ""}`} />
            </div>

            {/* Executive Tech & Kits */}
            <div
              onClick={() => selectProductById("steven-leatherite-tech-kit")}
              className="cursor-pointer py-1 hover:text-emerald-700 transition"
            >
              <span>Tech Kits & Folios</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DROPDOWN 1: VIEW ALL MEGA-MENU (Exact Match to User Screenshot 2)         */}
          {/* ========================================================================= */}
          {activeDropdown === "view-all" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("view-all")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Business Essentials
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("visiting-cards")}
                          className="hover:text-emerald-700 font-medium text-left"
                        >
                          Visiting Cards
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("gold-foil-cards")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Gold Foil Business Cards
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("iscape-sage-hardcover-diary")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Stationery & Diaries
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("custom-envelopes")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Office Envelopes
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("self-inking-stamps")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Stamps & Ink
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Corporate Apparel
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("highline-corporate-polo-suite")}
                          className="hover:text-emerald-700 font-medium text-left"
                        >
                          Custom Polo T-Shirts
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("highline-corporate-polo-suite")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Matty Bio-Washed Polos
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("steven-leatherite-tech-kit")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Backbencher Tech Kits
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Office & Writing
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("korby-matt-gold-pen")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Personalised Metal Pens
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("sca-180-titan-multitool")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Multi-Tool Stylus Pens
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("iscape-sage-hardcover-diary")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Notebooks & Diaries
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("deluxe-zipper-conference-folder")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Conference Folios
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Drinkware & Mugs
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("aquabot-ceramic-coffee-mug")}
                          className="hover:text-emerald-700 font-medium text-left"
                        >
                          Ceramic Coffee Mugs
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("aquabot-matte-steel-750")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Vacuum Steel Drinkware
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("aquabot-hot-cold-500")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Insulated Travel Tumblers
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Luxury Gifting & Awards
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("crystal-round-bevel")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          K9 Crystal Trophies
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("brillare-minty-luxury-box")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Brillare Luxury Gift Boxes
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("brandcharger-horizon-speaker")}
                          className="hover:text-emerald-700 text-left"
                        >
                          BrandCharger Bluetooth Tech
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Design & Studio
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("gold-foil-cards", true)}
                          className="hover:text-emerald-700 font-medium text-left text-emerald-700"
                        >
                          Free 50+ Template Studio
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setShowUploadModal(true);
                            setActiveDropdown(null);
                          }}
                          className="hover:text-emerald-700 text-left"
                        >
                          Upload Ready PDF/AI
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Corporate & Bulk
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">B2B GST Billing</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bulk Volume Rates</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bangalore 48h Express</span></li>
                    </ul>
                  </div>
                </div>

                {/* Category Thumbnail Visual Previews on Hover */}
                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      id: "gold-foil-cards",
                      name: "Visiting Cards Studio",
                      specs: "400 GSM Gold Foil • 3D Tilt",
                      image: "/images/gold-foil-card.jpg",
                      badge: "Best Seller",
                      openStudio: true,
                    },
                    {
                      id: "highline-corporate-polo-suite",
                      name: "Corporate Polos",
                      specs: "240 GSM Matty • 12 Colors",
                      image: "/images/catalog/apparel/highline-polo-navy.jpg",
                      badge: "Apparel",
                    },
                    {
                      id: "aquabot-matte-steel-750",
                      name: "AquaBot Steel Flasks",
                      specs: "Vacuum Insulated • Laser Mark",
                      image: "/images/catalog/drinkware/aquabot-matte-steel-bottle.jpg",
                      badge: "Drinkware",
                    },
                    {
                      id: "brillare-minty-luxury-box",
                      name: "Brillare Gift Hampers",
                      specs: "Festive Wellness Box",
                      image: "/images/catalog/gifting/brillare-minty-luxury-box.jpg",
                      badge: "Luxury Gifting",
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => selectProductById(item.id, item.openStudio)}
                      className="group/card p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 hover:shadow-md transition cursor-pointer flex items-center gap-3.5"
                    >
                      <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 group-hover/card:scale-105 transition-transform">
                        <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full inline-block mb-0.5">
                          {item.badge}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 truncate group-hover/card:text-emerald-700">
                          {item.name}
                        </h5>
                        <p className="text-[11px] text-slate-400 truncate">{item.specs}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 2: VISITING CARDS MEGA-MENU (Exact Match to User Screenshot 1)   */}
          {/* ========================================================================= */}
          {activeDropdown === "visiting-cards" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("visiting-cards")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  {/* Col 1: Visiting Cards */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Visiting Cards
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("visiting-cards")}
                          className="hover:text-emerald-700 font-medium text-left"
                        >
                          Standard Visiting Cards
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Classic Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Rounded Corner Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Square Visiting Cards</span></li>
                      <li className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            selectProductById("visiting-cards");
                            setTemplateFilter("leaf");
                          }}
                          className="hover:text-emerald-700 text-left font-bold text-emerald-800"
                        >
                          Leaf Visiting Cards
                        </button>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Oval Visiting Cards</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Circle Visiting Cards</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">QR Code Visiting Cards</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Brilliant Finishes & Papers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Brilliant Finishes
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Spot UV Visiting Cards</span></li>
                      <li>
                        <button
                          onClick={() => selectProductById("gold-foil-cards")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Raised Foil Visiting Cards
                        </button>
                      </li>
                      <li className="pt-2 font-bold text-slate-900 border-t border-slate-100">Standard Papers</li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Glossy Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Matte Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bulk Visiting Cards</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Specialty Cards */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Specialty Cards
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Magnetic Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Transparent Visiting Cards</span></li>
                      <li className="pt-3"><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Reorder Visiting Cards</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Premium Papers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Premium Papers
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Plus Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Non-Tearable Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Velvet Touch Visiting Cards</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pearl Visiting Cards</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Kraft Visiting Cards</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Diamond Visiting Cards</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Design and Logo */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Design and Logo
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("gold-foil-cards", true)}
                          className="hover:text-emerald-700 text-left font-bold text-emerald-700"
                        >
                          Browse 50+ Templates
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Design Services</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Logo Maker</span></li>
                    </ul>
                  </div>

                  {/* Col 6: Visiting Cards Holder */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Card Holders
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Engraved Metal Card Holders</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Metal Visiting Card Holder</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Leatherite Card Holder</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Premium Metal Holders</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/gold-foil-card.jpg" alt="Visiting Card Preview" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: 400 GSM Gold Foil Cards</span>
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">POPULAR</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Tactile raised gold foil stamping on premium matte velvet.</p>
                    </div>
                    <button
                      onClick={() => selectProductById("gold-foil-cards", true)}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      Customize in 3D →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <span className="font-bold text-slate-900">See All Visiting Cards</span>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 3: STATIONERY & LETTERHEADS MEGA-MENU (Matches User Screenshot 2)*/}
          {/* ========================================================================= */}
          {activeDropdown === "stationery" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("stationery")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  {/* Col 1: Custom Stationery */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Stationery
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("iscape-sage-hardcover-diary")}
                          className="hover:text-emerald-700 font-bold text-left text-slate-900"
                        >
                          Letterheads & Diaries
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => selectProductById("custom-envelopes")}
                          className="hover:text-emerald-700 font-bold text-left text-slate-900"
                        >
                          Envelopes
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Letterhead Pads</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bill Books</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Mouse Pads</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Envelope Seals</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bulk Letterheads</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Office Supplies */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Office Supplies
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Lanyards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">ID Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Invoice Books</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Note Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Certificates</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Employee Welcome Kit</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Custom Notebooks & Diaries */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Notebooks & Diaries
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("iscape-navy-cognac-journal")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Personalised Notebooks
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Diary with Pen Holder</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalised A5 Diary</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Diary with Magnetic Lock</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Custom Notepads</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 4: Custom Keychains */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Keychains & Wedding
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Keychain with Light</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic Keychains</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Wedding Invitations</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Save The Date Cards</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Invitations */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Invitations & Cards
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Thank You Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Birthday Invitations</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Gift Tags</span></li>
                    </ul>
                  </div>

                  {/* Col 6: Files and Folders */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Files and Folders
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Presentation Folders</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Ring Binder File</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pocket Presentation File</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/catalog/stationery/iscape-sage-hardcover-diary.jpg" alt="Stationery Preview" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: iScape Sage Green Hardcover Diary</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">EXECUTIVE</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Premium PU leather with pen loop & 80 GSM natural shade paper.</p>
                    </div>
                    <button
                      onClick={() => selectProductById("iscape-sage-hardcover-diary")}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <span className="font-bold text-slate-900">See All Stationery & Letterheads</span>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 4: STAMPS AND INK VISUAL CARDS (Matches User Screenshot 3)       */}
          {/* ========================================================================= */}
          {activeDropdown === "stamps" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("stamps")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                  {[
                    { title: "Self Inking Stamps", subtitle: "Same Day Dispatch • Bangalore & Mumbai", image: "/images/rubber-stamps.jpg" },
                    { title: "Basic Rubber Stamps", subtitle: "Classic Wooden Handle & Pad", image: "/images/rubber-stamps.jpg" },
                    { title: "Pocket Stamps", subtitle: "Compact Foldable Stamp", image: "/images/rubber-stamps.jpg" },
                    { title: "Name Stamps", subtitle: "Signature & Title Stamp", image: "/images/rubber-stamps.jpg" },
                    { title: "Paper Embosser", subtitle: "Handheld Metallic Press Seal", image: "/images/rubber-stamps.jpg" },
                  ].map((stampItem, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => selectProductById("self-inking-stamps")}
                      className="cursor-pointer group bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-square w-full rounded-xl bg-white overflow-hidden mb-3 border border-slate-100">
                        <Image src={stampItem.image} alt={stampItem.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm transition">
                        {stampItem.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{stampItem.subtitle}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">See All Stamps and Ink</span>
                  <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                    Close ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 5: SIGNS & MARKETING (Matches User Screenshot 4)                  */}
          {/* ========================================================================= */}
          {activeDropdown === "signs" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("signs")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Signs & Posters</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Standees</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Posters</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Vinyl Banners</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Tabletop Standees</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Foam Boards</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Marketing Materials</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Flyers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Presentation Folders</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Brochures</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Booklets</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Postcards</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">More in Signs</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic signs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Outdoor Signs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Plastic Signboards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">LED Translite Boards</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">More in Marketing</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Car Door Decals</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Promo Tables</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Logo Flags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Menu Cards</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Table Coverings</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Tablecloths</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Table Runners</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Stretch Table Covers</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">New Arrivals</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Full-Print Paper Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Elegant Fabric Standees</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">QR Code Stands</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">See All Signs, Posters & Marketing Materials</span>
                  <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                    Close ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 6: LABELS & PACKAGING (Matches User Screenshot 5)                 */}
          {/* ========================================================================= */}
          {activeDropdown === "labels" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("labels")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Custom Packaging</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Self Adhesive Tapes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Paper Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Printed Carry Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Corrugated Boxes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Flat Mailer Boxes</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Custom Stickers</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Sheet Stickers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Shape Stickers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sticker Singles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Window Stickers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Holographic Stickers</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Custom Labels</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Product Labels</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Return Address Labels</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Transparent Labels</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Shipping Labels</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Tags</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Hang Tags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Folded Hang Tags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Baggage Tags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Raised Foil Hang Tags</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Packaging Boxes</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Product Boxes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Tuck Top Boxes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Lock Bottom Boxes</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pull Out Boxes</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">Newly Launched</h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Metal Stickers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Frosted Slider Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Roll Label Stickers</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">See All Labels, Stickers & Packaging</span>
                  <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                    Close ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 7: CLOTHING, CAPS & BAGS (Exact Match to User Screenshot 2)      */}
          {/* ========================================================================= */}
          {activeDropdown === "clothing" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("clothing")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  {/* Col 1: Custom T-Shirts */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom T-Shirts
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("highline-corporate-polo-suite")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Men's T-Shirts
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Polyester T shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Men's Cotton T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Women's T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Full Sleeves T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Limited Edition Cotton T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Jack and Jones Printed T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Kid's T-shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Basic Polyester T-shirts - Colours</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Mark & Spencer Round Neck T-Shirts</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: Custom Polo T-Shirts */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Polo T-Shirts
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("highline-corporate-polo-suite")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Men's Polo T-Shirts
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Men's Scott Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Puma Polo T-shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Women's Polo T-shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Women's Scott Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Parx Premium Polo T-Shirts</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Printed Polos - Multi Location</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Mark & Spencer Polo T-Shirts</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Skechers Tipping Polo T-Shirts</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Custom Dress Shirts */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Dress Shirts
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Men's Dress Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Women's Embroidered Dress Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cambridge Dress Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Men's Dress Shirts - Half Sleeves</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Fil-A-Fil Shirts</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Mark & Spencer Office Shirts</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Men's Arrow Dress Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Park Avenue Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cambridge Oxford Dress Shirt</span></li>
                      <li className="pt-2"><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Shop all Custom Dress Shirts</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Custom Bags */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Bags
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Embroidered Laptop Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Harissons Embroidered Laptop Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">American Tourister Laptop Bags</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Harissons Nemesis Office Laptop Bags</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">American Tourister Backpacks</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Targus Intellect Advanced Laptop Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Adidas Duffle Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Waterproof Bag Covers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Harissons Dexter Laptop Backpacks</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Lavie Sport Duke Laptop Backpacks</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 5: Tote Bags & Custom Activewear */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Tote Bags
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cotton Tote Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Jute Bags</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Colored Canvas Tote Bags</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pocket Tote Bags</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Premium Jute Bags</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>

                    <h4 className="font-bold text-slate-900 mt-5 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Activewear
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sports Jersey</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Polo Jerseys</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">India T20 Cricket Fan Jersey</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Personalised Adidas Track Suit</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Personalised U.S. Polo Track Suit</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 6: Custom Caps */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Caps
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Embroidered Caps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Printed Caps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cotton Caps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Puma Caps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Embroidered Denim Caps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Promotional Plain Caps</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Woodland Caps</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Chef Caps</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Cotton Caps</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Freedom Rain Caps</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/catalog/apparel/highline-polo-navy.jpg" alt="Corporate Polo Preview" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: Highline Bio-Washed Matty Polo</span>
                        <span className="bg-sky-100 text-sky-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">240 GSM</span>
                      </div>
                      <p className="text-[11px] text-slate-500">12 corporate shades with custom logo embroidery or HD screen printing.</p>
                    </div>
                    <button
                      onClick={() => selectProductById("highline-corporate-polo-suite")}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <span className="font-bold text-slate-900">See All Clothing, Caps & Bags</span>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 8: MUGS, ALBUMS & GIFTS (Exact Match to User Screenshot 1)       */}
          {/* ========================================================================= */}
          {activeDropdown === "mugs-gifts" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("mugs-gifts")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  {/* Col 1: Bestsellers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Bestsellers
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Photo Albums</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Layflat Photo Albums</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Mouse Pads</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Canvas Prints</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Photo With Frame</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Employee Welcome Kit</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Photo with Frame</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Pen Drive</span></li>
                      <li>
                        <button
                          onClick={() => selectProductById("brandcharger-smart-tumbler")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Customised Tumblers
                        </button>
                      </li>
                      <li className="pt-3">
                        <span className="font-bold text-slate-900 hover:text-emerald-700 cursor-pointer">Corporate Gifts</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: Mugs & Gift Hampers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Mugs
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("aquabot-ceramic-coffee-mug")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Personalised Mugs
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Colour Changing Magic Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Mugs Black</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Custom Decorative Mugs</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="pt-1"><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Shop all Mugs</span></li>
                    </ul>

                    <h4 className="font-bold text-slate-900 mt-5 mb-3.5 pb-1 border-b border-slate-100">
                      Gift Hampers
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Travel Accessories Hampers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer text-xs leading-snug">Welcome Kit (Polo T Shirt, Water Bottle, Coffee Mug, Diary, Pen)</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer text-xs leading-snug">Hamper with Stainless Steel Bottle, Tea Coaster, White Mug & more</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Custom Magnets & Coasters */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Magnets
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Fridge Magnets</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Photo Magnets</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Magnetic Visiting Cards</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic Photo Magnets</span></li>
                      <li className="pt-1"><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Shop all Custom Magnets</span></li>
                    </ul>

                    <h4 className="font-bold text-slate-900 mt-5 mb-3.5 pb-1 border-b border-slate-100">
                      Coasters
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Customized Coasters</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Printed Acrylic Coasters</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Soft Coasters</span></li>
                      <li className="pt-1"><span className="hover:text-emerald-700 cursor-pointer font-bold text-slate-900">Shop all Coasters</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Custom Pens */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Pens
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-medium">Customized Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalised Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Magnetic Metal Roller Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Wooden Finish Metal Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Matte Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Brass Metal Golden Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Triangle Wire Clip Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Sleek Metal Roller Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Artistic Plastic Pens with Round Ring</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Brush Stone Black Ballpoint Pens</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Looking for more? & Custom Photo Frame */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Looking for more?
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic Photo Blocks</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Laptop Skins</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic Display Stands</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic Photo Magnets</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic Photo Prints</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Customized Daily Journal LED Lamp</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Personalized Wall Clocks</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Round Photo Mouse Pads</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>

                    <h4 className="font-bold text-slate-900 mt-5 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Photo Frame
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">LED Photo Frames</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Acrylic Photo Frame</span></li>
                    </ul>
                  </div>

                  {/* Col 6: Custom Calendars */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Custom Calendars
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Desk Calendars</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Wall Calendars</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Desk Calendar - New Size</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Wall Calendar - New Size</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Magnet Calendars</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Flip Desk Calendars</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Poster Calendars</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Perpetual Calendars</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Desk Calendar with Photo Frame</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Four Sheeter Wall Calendars</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/catalog/gifting/brillare-minty-luxury-box.jpg" alt="Gift Hamper Preview" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: Brillare Minty Luxury Gift Box</span>
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">FESTIVE HAMPER</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Curated organic grooming, aroma mist & custom foil branded gift packaging.</p>
                    </div>
                    <button
                      onClick={() => selectProductById("brillare-minty-luxury-box")}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <span className="font-bold text-slate-900">See All Mugs, Albums & Gifts</span>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 9: PENS (Exact Match to User Screenshot 3)                       */}
          {/* ========================================================================= */}
          {activeDropdown === "pens" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("pens")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  {/* Col 1: Bestsellers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Bestsellers
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer font-medium">Customized Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalised Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Magnetic Metal Roller Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Sleek Metal Roller Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Plastic Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sleek Metal Ballpoint Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Brass Metal Golden Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Black Matte Ball Pens</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Value Pens */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Value Pens
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Triangle Wire Clip Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Grand Opaque Ballpoint Pen</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">New Getz Cap-Type Ballpoint Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Twist Plastic Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">New Cap Plastic Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Getz Opaque Push Type Ballpoint Pen</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Custom Full White Ball Pens</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">White Opaque Assorted Color Pens</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Executive Pens */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Executive Pens
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Sleek Metal Roller Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Artistic Plastic Pens with Round Ring</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Mini Flat Clip Rose Gold Tip Metal Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Executive Metal Ball Pen</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Black Matte Roller Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Premium Xylo Steel Finish Roller Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Gold Plated Ball Pens</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Premium Pens */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Premium Pens
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Matte Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Black Matte Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Brush Stone Black Ballpoint Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Roller Pens with Swarovski Crystal</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Marble Design Metal Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Fountain Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Submarine Liberty Watermark Ball Pens</span></li>
                    </ul>
                  </div>

                  {/* Col 5: Luxury Pens */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Luxury Pens
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Parker Odyssey Laque Black Gold Trim Roller Ball Pen</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Parker Odyssey Laque Black Chrome Trim Ball Pen</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">SwissBrand® Legacy Trim Roller Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">SwissBrand® Eternia Fountain Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">SwissBrand® Zenith Trim Roller Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Parker Aster Deluxe Roller Ball Pens</span></li>
                    </ul>
                  </div>

                  {/* Col 6: Newly Launched */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Newly Launched
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Promotional Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Gold Click Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bulk Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Green with Silver Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">SwissBrand® Legacy Trim Roller Ball Pens</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">SwissBrand® Eternia Fountain Pens</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Gold Click Pens</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Multicolor Ball Pens</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/catalog/pens/korby-matt-gold-pen.jpg" alt="Metal Pen Preview" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: Korby Matt Gold Rollerball Pen</span>
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">GOLD TRIM</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Brass casing with precision laser logo engraving & smooth German ink refill.</p>
                    </div>
                    <button
                      onClick={() => selectProductById("korby-matt-gold-pen")}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <span className="font-bold text-slate-900">See All Pens</span>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 10: DRINKWARE (Exact Match to User Screenshot 4)                 */}
          {/* ========================================================================= */}
          {activeDropdown === "drinkware" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("drinkware")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
                  {/* Col 1: BestSellers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      BestSellers
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("aquabot-matte-steel-750")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Custom Water Bottles
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Customised Tumblers</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cello Duro Kent Water Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Temperature Display Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Stainless Steel Sipper Bottles</span></li>
                    </ul>
                  </div>

                  {/* Col 2: Water Bottles */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Water Bottles
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("aquabot-alu-sipper-750")}
                          className="hover:text-emerald-700 text-left"
                        >
                          Custom Sipper Bottles
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Vacuum Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cello Swift Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Inox Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Gym Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Thermal Suction Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pexpo Flamingo Vacuum Bottles</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Sippers & Tumblers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Sippers & Tumblers
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalised Skinny Tumbler 600ml</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Aluminium Water Bottles</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Wine Tumbler</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalized Travel Tumbler</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pexpo Cocoa Vacuum Steel Tumblers</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pexpo Stanzy Tumblers</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Looking for more? */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Looking for more?
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Vacuum Insulation Cup</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Water Bottle with Wireless Speaker</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Cello Flip Style Water Flasks</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Insulated Vacuum Coffee Flasks</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Frosted Beer Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Hip Flask - 7 OZ - Black</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Printed Cola Bottles 600ml</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Custom Matt Vacuum Bottles</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Vacuum Coffee Mugs</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 5: New in Drinkware */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      New in Drinkware
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Temperature Display Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Customised Beer Mugs</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalised Champagne Glasses</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalised Wine Glasses</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Personalised Vacuum Insulated Tumbler</span></li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pexpo Austin Steel Water Bottles</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pexpo Cameo Compact Steel Bottles</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pexpo Morocco Thermo Steel Bottles</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pexpo Orio Thermo Steel Bottles</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="hover:text-emerald-700 cursor-pointer">Pexpo Bravo Vacuum Bottles</span>
                        <span className="bg-sky-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black">NEW</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 w-full sm:w-auto">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image src="/images/catalog/drinkware/aquabot-matte-steel-bottle.jpg" alt="Drinkware Preview" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Featured: AquaBot Matte 750ml Vacuum Flask</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">24H HOT/COLD</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Double-wall 304 food-grade stainless steel with laser branding & leakproof spout.</p>
                    </div>
                    <button
                      onClick={() => selectProductById("aquabot-matte-steel-750")}
                      className="ml-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
                    >
                      View Specs →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <span className="font-bold text-slate-900">See All Drinkware</span>
                    <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DROPDOWN 11: CUSTOM POLO T-SHIRTS (Exact Match to User Screenshot 5)      */}
          {/* ========================================================================= */}
          {activeDropdown === "polos" && (
            <div
              onMouseEnter={() => handleMenuMouseEnter("polos")}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
                  {/* Col 1: Bestsellers */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Bestsellers
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li>
                        <button
                          onClick={() => selectProductById("highline-corporate-polo-suite")}
                          className="hover:text-emerald-700 text-left font-medium"
                        >
                          Men's Polo T-Shirts
                        </button>
                      </li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Women's Polo T-shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Premium Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Printed Polos - Multi Location</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Men's Scott Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Embroidered Polos - Multi Location</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Polyester Polo T-Shirts</span></li>
                      <li className="pt-4">
                        <span className="font-bold text-slate-900 hover:text-emerald-700 cursor-pointer">Reorder Custom Polo T-shirts</span>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: Branded Polos */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Branded Polos
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Women's Scott Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Mark & Spencer Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Parx Premium Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Levi's Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Arrow Tipping Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Monte Carlo Polo T-Shirt</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">US POLO ASSN. Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Woodland Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Arrow Mercerized Polo T-Shirts</span></li>
                    </ul>
                  </div>

                  {/* Col 3: Multi-location Polos & Puma/Adidas */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Multi-location Polos
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Polyester Polos - Multi Location</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Full Custom Polo T-Shirts</span></li>
                    </ul>

                    <h4 className="font-bold text-slate-900 mt-5 mb-3.5 pb-1 border-b border-slate-100">
                      Puma & Adidas
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Puma Polo T-shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Adidas 3 stripe Polo T-shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Adidas Polycotton T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Adidas Climalite Dryfit Polo T shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Adidas Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Adidas Men's Polo T-Shirts</span></li>
                    </ul>
                  </div>

                  {/* Col 4: Sports Polos */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      Sports Polos
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sports Republic Acti-Play Dryfit Polo T-Shirts - Men</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">6 Degree Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Golfer Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Flying Machine Dry Fit Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sports Republic ACTI - PLAY Dry-Fit POLO Neck-Front</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Dry Fit Golf Polo T Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Sports Republic ACTI - PLAY Dry-Fit POLO Neck-Back</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pocket Polo T-Shirts</span></li>
                    </ul>
                  </div>

                  {/* Col 5: More in Polos */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3.5 pb-1 border-b border-slate-100">
                      More in Polos
                    </h4>
                    <ul className="space-y-2.5 text-slate-600">
                      <li><span className="hover:text-emerald-700 cursor-pointer leading-snug">Pikmee Tipline Double tipped Polo T-shirts - Men (Back Side)</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pikmee Highline Polo T Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer leading-snug">Pikmee Fastees Polo T-shirts - Men (Back & Left) old</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Pikmee Promo Tees Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer leading-snug">Pikmee Titlis Climate Control Polo T-Shirts - Men</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">TURMS Anti Stain Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Bulk Polo T-Shirts</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Safety Reflector Polos</span></li>
                      <li><span className="hover:text-emerald-700 cursor-pointer">Two Tone Polo T-Shirts</span></li>
                    </ul>
                  </div>

                  {/* Col 6: Visual Image Card (Exact Match to Screenshot 5 Right Card) */}
                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={() => selectProductById("highline-corporate-polo-suite")}
                      className="cursor-pointer group block text-center"
                    >
                      <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all border border-slate-200 mb-3 bg-slate-50">
                        <Image
                          src="/images/apparel-polo.jpg"
                          alt="See All Polo T-Shirts"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition flex items-center justify-center gap-1">
                        See All Polo T-Shirts
                        <ChevronRight className="w-4 h-4 text-emerald-600 inline" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">See All Custom Polo T-Shirts</span>
                  <button onClick={() => setActiveDropdown(null)} className="font-bold hover:text-red-600">
                    Close ✕
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Promo Ribbon */}
        <div className="bg-[#0F172A] text-white text-xs sm:text-sm py-2 px-4 text-center">
          <span className="font-bold text-emerald-400">Buy More, Save More!</span>
          <span className="mx-2 text-slate-500">|</span>
          <span className="text-slate-200">Flat 5% OFF on Orders ₹10,000+ • Code: <strong>SAVE5</strong></span>
          <span className="mx-2 text-slate-500">|</span>
          <span className="text-slate-300">GST Invoice for 100% Tax Credit on all B2B orders</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CASE 1: USER HAS NOT SELECTED A PRODUCT -> SHOW PURE PRODUCT CATALOG     */}
      {/* ========================================================================= */}
      {selectedProduct === null && (
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900 font-bold">View All Categories</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Sidebar */}
              <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Product Categories
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {ALL_PRODUCTS.length} Items
                  </span>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {[
                    { id: "all", label: "View All Products", count: ALL_PRODUCTS.length, icon: Sparkles },
                    { id: "awards", label: "Awards & Trophies", count: ALL_PRODUCTS.filter((p) => p.category === "awards").length, icon: Trophy },
                    { id: "drinkware", label: "Bottles & Mugs", count: ALL_PRODUCTS.filter((p) => p.category === "drinkware").length, icon: Coffee },
                    { id: "pens", label: "Metal & Eco Pens", count: ALL_PRODUCTS.filter((p) => p.category === "pens").length, icon: PenTool },
                    { id: "stationery", label: "Diaries & Folios", count: ALL_PRODUCTS.filter((p) => p.category === "stationery").length, icon: BookOpen },
                    { id: "gifting", label: "Luxury Gift Sets", count: ALL_PRODUCTS.filter((p) => p.category === "gifting").length, icon: Gift },
                    { id: "apparel", label: "Apparel & Tech Kits", count: ALL_PRODUCTS.filter((p) => p.category === "apparel").length, icon: Shirt },
                    { id: "tech", label: "BrandCharger Tech", count: ALL_PRODUCTS.filter((p) => p.category === "tech").length, icon: Smartphone },
                    { id: "visiting-cards", label: "Visiting Cards & Print", count: ALL_PRODUCTS.filter((p) => p.category === "visiting-cards").length, icon: CreditCard },
                  ].map((cat) => {
                    const IconComp = cat.icon;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => setActiveCatalogCategory(cat.id)}
                          className={`w-full text-left py-2.5 px-3 rounded-xl transition font-medium flex items-center justify-between text-xs sm:text-sm ${
                            activeCatalogCategory === cat.id
                              ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/70"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="flex items-center gap-2.5 truncate">
                            <IconComp className={`w-4 h-4 shrink-0 ${activeCatalogCategory === cat.id ? "text-emerald-700" : "text-slate-400"}`} />
                            <span className="truncate">{cat.label}</span>
                          </span>
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ml-1.5 shrink-0 ${
                            activeCatalogCategory === cat.id ? "bg-emerald-200/80 text-emerald-900" : "bg-slate-100 text-slate-500"
                          }`}>
                            {cat.count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="font-bold text-slate-900 text-sm block">Have ready artwork?</span>
                    <span className="text-slate-500 text-xs block mt-1 leading-relaxed">
                      Upload your PDF/AI file directly for 300 DPI pre-flight check.
                    </span>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="mt-4 w-full py-2 bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-xs font-bold rounded-xl transition shadow-xs"
                    >
                      Upload Artwork File
                    </button>
                  </div>
                </div>
              </aside>

              {/* Right Column */}
              <div className="lg:col-span-9 space-y-8">
                <div className="rounded-3xl bg-gradient-to-r from-[#0C4A6E] via-[#0369A1] to-[#0284C7] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-lg overflow-hidden relative">
                  <div className="space-y-3 max-w-lg relative z-10">
                    <span className="text-xs uppercase tracking-widest font-black text-emerald-300">
                      {activeHero.tag}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                      {activeHero.title}
                    </h1>
                    <p className="text-sm sm:text-base text-sky-100 leading-relaxed">
                      {activeHero.subtitle}
                    </p>
                  </div>

                  <div className="relative w-56 sm:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0">
                    <Image
                      src={activeHero.image}
                      alt={activeHero.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Catalog Controls: Filter Chips Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-emerald-600" />
                      Filter:
                    </span>
                    {[
                      { id: "all", label: "All Items" },
                      { id: "budget", label: "Under ₹250" },
                      { id: "mid", label: "₹250 - ₹600" },
                      { id: "premium", label: "₹600+" },
                      { id: "low-moq", label: "Low MOQ (≤25 pcs)" },
                    ].map((chip) => (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => setPriceFilter(chip.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                          priceFilter === chip.id
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-semibold text-slate-500 shrink-0">
                    Showing <strong className="text-slate-900">{filteredCatalog.length}</strong> products
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredCatalog.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group relative"
                    >
                      <div>
                        <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                          <Image
                            src={prod.image}
                            alt={prod.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />

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
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 p-2 rounded-xl shadow-md transition z-10 opacity-90 group-hover:opacity-100"
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
                            <span className="text-lg font-black text-slate-900">{prod.startingPrice}</span>
                            <span className="text-[11px] text-slate-500 ml-1">/ {prod.minQty}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setQuickViewProduct(prod)}
                              className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
                              title="Technical Specs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Specs</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedProduct(prod);
                                setIsEditorOpen(false);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                            >
                              <span>{prod.category === "visiting-cards" ? "Customise" : "Select"}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* CASE 2: USER SELECTED A PRODUCT -> OPEN FREE SAMPLE DESIGNS & STUDIO      */}
      {/* ========================================================================= */}
      {selectedProduct !== null && (
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsEditorOpen(false);
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to All Products</span>
              </button>

              <div className="text-sm text-slate-500 flex items-center gap-2">
                <span>Products</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-800">{selectedProduct.title}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="text-emerald-700 font-extrabold">
                  {selectedProduct.category === "visiting-cards"
                    ? (isEditorOpen ? "Personalize & Order" : "Free Design Templates")
                    : "Corporate Specifications & Pricing"}
                </span>
              </div>
            </div>

            {selectedProduct.category === "visiting-cards" ? (
              <>
                {/* Product Header */}
                <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
                    Selected Product Catalog
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                    {selectedProduct.title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 mt-1">
                    Choose from free design templates below, or upload your own complete print-ready file.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-bold transition flex items-center gap-2 shadow-xs"
                  >
                    <UploadCloud className="w-4 h-4 text-emerald-600" />
                    <span>Upload Print File (PDF/AI)</span>
                  </button>

                  <button
                    onClick={() => setIsEditorOpen(!isEditorOpen)}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition flex items-center gap-2 shadow-sm"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>{isEditorOpen ? "Browse All Designs" : "Open Live Studio"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SUB-VIEW A: BIG RATIO SAMPLE DESIGN GALLERY                   */}
            {/* ------------------------------------------------------------- */}
            {!isEditorOpen && (
              <div className="space-y-8">
                {/* Category Filter Pills */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5 overflow-x-auto no-scrollbar text-sm">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-xs mr-1">
                    Category:
                  </span>
                  {[
                    { id: "all", label: "All Designs" },
                    { id: "leaf", label: "🌿 Leaf & Botanical" },
                    { id: "corporate", label: "👔 Corporate & Executive" },
                    { id: "tech", label: "💻 Tech & Startups" },
                    { id: "luxury", label: "✨ Gold & Luxury" },
                    { id: "medical", label: "🏥 Medical & Health" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setTemplateFilter(cat.id)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition font-semibold text-sm ${
                        templateFilter === cat.id
                          ? "bg-emerald-600 text-white font-bold shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* BIG-RATIO TEMPLATE GRID WITH DETAILED BOTANICAL SVGS & GOLD FOIL */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeProductTemplates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* BIG PHYSICAL CARD RATIO PREVIEW */}
                      <div
                        className={`relative w-full aspect-[1.75/1] min-h-[220px] ${tpl.bgStyle} rounded-2xl p-6 shadow-md border border-black/10 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:scale-[1.02]`}
                      >
                        {/* Intricate Botanical SVG Artworks */}
                        {tpl.motifType === "botanical" && (
                          <div className="absolute top-1 right-1 opacity-35 pointer-events-none">
                            <BotanicalBranchSVG className={`w-36 h-36 ${tpl.accentColor}`} />
                          </div>
                        )}
                        {tpl.motifType === "monstera" && (
                          <div className="absolute top-1 right-1 opacity-25 pointer-events-none">
                            <MonsteraLeafSVG className={`w-32 h-32 ${tpl.accentColor}`} />
                          </div>
                        )}
                        {tpl.motifType === "wreath" && (
                          <div className="absolute top-2 right-2 opacity-35 pointer-events-none">
                            <GoldenWreathSVG className={`w-28 h-28 ${tpl.accentColor}`} />
                          </div>
                        )}
                        {tpl.motifType === "gold-strip" && (
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600" />
                        )}
                        {tpl.motifType === "tech-glow" && (
                          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500" />
                        )}

                        {/* Top: Brand & Icon */}
                        <div className="flex items-start justify-between relative z-10">
                          <div>
                            <div className={`text-base font-black tracking-tight ${tpl.textColor} ${tpl.fontFamily}`}>
                              Acme Enterprises
                            </div>
                            <div className={`text-xs uppercase tracking-wider font-bold ${tpl.subColor}`}>
                              Corporate Solutions
                            </div>
                          </div>
                          <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center">
                            {tpl.category === "leaf" ? (
                              <Leaf className={`w-5 h-5 ${tpl.accentColor}`} />
                            ) : (
                              <Printer className={`w-5 h-5 ${tpl.textColor}`} />
                            )}
                          </div>
                        </div>

                        {/* Bottom: Sample Name & Contact Details */}
                        <div className="relative z-10 pt-3 border-t border-black/10">
                          <div className={`text-base font-extrabold ${tpl.textColor}`}>
                            Aditya Verma
                          </div>
                          <div className={`text-xs font-bold ${tpl.accentColor}`}>
                            Managing Director
                          </div>
                          <div className={`text-[11px] mt-1.5 space-y-0.5 ${tpl.subColor} font-medium`}>
                            <div>+91 99450 39266 • contact@acme.com</div>
                            <div>Bengaluru, Karnataka – 560064</div>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Meta & Actions */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">{tpl.name}</span>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                            {tpl.tag}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTemplateId(tpl.id);
                            setIsEditorOpen(true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Customise</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUB-VIEW B: LIVE INTERACTIVE CANVAS STUDIO                    */}
            {/* ------------------------------------------------------------- */}
            {isEditorOpen && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT 6 COLUMNS: REAL-TIME PHYSICAL CANVAS */}
                <div className="lg:col-span-6 space-y-6 sticky top-28">
                  {/* Canvas Controls */}
                  <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-800">Preview:</span>
                      <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setActiveSide("front")}
                          className={`px-4 py-1.5 rounded-lg transition ${
                            activeSide === "front" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                          }`}
                        >
                          Front Side
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSide("back")}
                          className={`px-4 py-1.5 rounded-lg transition ${
                            activeSide === "back" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                          }`}
                        >
                          Back Side
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCornerStyle(cornerStyle === "square" ? "rounded" : "square")}
                      className="text-xs text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 font-medium"
                    >
                      Corners: <strong className="capitalize">{cornerStyle}</strong>
                    </button>
                  </div>

                  {/* Physical Card Canvas in Big Ratio */}
                  <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-300 border border-slate-300 shadow-inner flex items-center justify-center">
                    <div
                      className={`relative w-full max-w-[500px] aspect-[1.75/1] ${currentTemplate.bgStyle} ${
                        cornerStyle === "rounded" ? "rounded-3xl" : "rounded-sm"
                      } p-7 sm:p-8 shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden border border-black/10`}
                    >
                      {/* Botanical Motif Watermark */}
                      {currentTemplate.motifType === "botanical" && (
                        <div className="absolute top-1 right-1 opacity-35 pointer-events-none">
                          <BotanicalBranchSVG className={`w-40 h-40 ${currentTemplate.accentColor}`} />
                        </div>
                      )}
                      {currentTemplate.motifType === "monstera" && (
                        <div className="absolute top-1 right-1 opacity-25 pointer-events-none">
                          <MonsteraLeafSVG className={`w-36 h-36 ${currentTemplate.accentColor}`} />
                        </div>
                      )}

                      {/* FRONT PREVIEW */}
                      {activeSide === "front" ? (
                        <>
                          <div className="flex items-start justify-between relative z-10">
                            <div>
                              <div className={`text-lg sm:text-xl font-black tracking-tight ${currentTemplate.textColor} ${currentTemplate.fontFamily}`}>
                                {companyName || "Your Company"}
                              </div>
                              <div className={`text-xs tracking-wider uppercase font-bold ${currentTemplate.subColor}`}>
                                Corporate Solutions
                              </div>
                            </div>

                            <div className="shrink-0">
                              {uploadedLogo ? (
                                <div className="relative w-14 h-14 rounded-xl bg-white/95 p-1 shadow-sm border border-slate-200 overflow-hidden">
                                  <img src={uploadedLogo} alt="Logo" className="w-full h-full object-contain" />
                                </div>
                              ) : (
                                <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center">
                                  {currentTemplate.category === "leaf" ? (
                                    <Leaf className="w-6 h-6 text-emerald-600" />
                                  ) : (
                                    <Printer className="w-6 h-6 text-slate-700" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="relative z-10 pt-4 flex flex-col justify-end">
                            <div className="mb-2">
                              <div className={`text-lg sm:text-xl font-black leading-tight ${currentTemplate.textColor}`}>
                                {customerName || "Full Name"}
                              </div>
                              <div className={`text-xs sm:text-sm font-bold ${currentTemplate.accentColor}`}>
                                {customerDesignation || "Designation"}
                              </div>
                            </div>

                            <div className={`pt-2.5 border-t border-black/10 space-y-1 text-xs ${currentTemplate.subColor} font-medium`}>
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 shrink-0" />
                                <span>{phone || "+91 Mobile Number"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{email || "email@company.com"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{address || "Bengaluru, Karnataka"}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* BACK PREVIEW */
                        <div className="h-full flex flex-col items-center justify-center text-center relative z-10 space-y-3">
                          {uploadedLogo ? (
                            <div className="w-20 h-20 rounded-2xl bg-white/95 p-2 shadow-sm border border-slate-200 mx-auto overflow-hidden">
                              <img src={uploadedLogo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-md">
                              <Leaf className="w-7 h-7" />
                            </div>
                          )}
                          <div>
                            <div className={`text-xl font-black ${currentTemplate.textColor}`}>
                              {companyName || "Your Company"}
                            </div>
                            <div className={`text-xs font-semibold mt-1 ${currentTemplate.accentColor}`}>
                              {website || "www.yourwebsite.com"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-800">
                      Active: <strong>{currentTemplate.name}</strong>
                    </span>
                    <button
                      onClick={() => setIsEditorOpen(false)}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      ← Switch Design
                    </button>
                  </div>
                </div>

                {/* RIGHT 6 COLUMNS: CUSTOMIZATION FORM */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Step 1: Text & Logo Personalization */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                      <h2 className="text-base font-bold text-slate-900">
                        1. Personalize Details & Logo
                      </h2>
                      <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                        Live Preview
                      </span>
                    </div>

                    {/* Logo Uploader */}
                    <div className="mb-5 p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                          {uploadedLogo ? (
                            <img src={uploadedLogo} alt="Logo" className="w-10 h-10 object-contain" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">Upload Company Logo</div>
                          <div className="text-xs text-slate-500">PNG, JPG, or SVG (Transparent recommended)</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleLogoUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          {uploadedLogo ? "Change" : "Browse"}
                        </button>
                        {uploadedLogo && (
                          <button
                            type="button"
                            onClick={() => setUploadedLogo(null)}
                            className="p-2 text-slate-400 hover:text-red-600"
                            title="Remove Logo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Input Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Aditya Verma"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Designation / Role</label>
                        <input
                          type="text"
                          value={customerDesignation}
                          onChange={(e) => setCustomerDesignation(e.target.value)}
                          placeholder="e.g. Managing Director"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Incredible Treasures"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 99450 39266"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contact@company.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Office Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Yelahanka, Bengaluru"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Paper Stock, Quantity & Order */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs">
                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                      2. Paper Finish & Quantity
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      {(Object.keys(pricingData) as Array<keyof typeof pricingData>).map((key) => {
                        const item = pricingData[key];
                        const isSelected = selectedStock === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedStock(key)}
                            className={`p-3 rounded-xl border text-center transition ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs"
                                : "border-slate-200 text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            <div className="text-xs font-semibold">{item.name}</div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-5 gap-2.5 mb-6">
                      {[100, 250, 500, 1000, 2000].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setQuantity(qty)}
                          className={`p-3 rounded-xl border text-center transition ${
                            quantity === qty
                              ? "border-emerald-600 bg-emerald-600 text-white font-bold shadow-xs"
                              : "border-slate-200 text-slate-800 hover:border-slate-300"
                          }`}
                        >
                          <span className="block text-sm font-bold">{qty}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block">Total for {quantity} items:</span>
                        <span className="text-3xl font-black text-slate-900">₹{finalTotal.toFixed(2)}</span>
                        <span className="text-xs text-emerald-700 font-bold ml-2">
                          (₹{perCardCost}/each incl. 18% GST)
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition flex items-center gap-2 shadow-md shadow-emerald-700/20"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* LUXURY CORPORATE MERCHANDISE SHOWCASE & BULK SPECIFICATIONS */
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
              {/* Left Column: High-Resolution Client Photography & Badges */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm group">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Luxury Status Badge */}
                  {selectedProduct.badge && (
                    <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-amber-300 border border-amber-400/40 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {selectedProduct.badge}
                    </span>
                  )}

                  {/* Official Catalog Pill */}
                  {selectedProduct.sourceCatalog && (
                    <span className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 shadow-md flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Catalog: {selectedProduct.sourceCatalog}</span>
                    </span>
                  )}
                </div>

                {/* Trust & Guarantee Micro-Bar */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-slate-800 block">100% Quality</span>
                    <span className="text-[10px] text-slate-500">QC Tested</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-slate-800 block">Bangalore Hub</span>
                    <span className="text-[10px] text-slate-500">Express Delivery</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <Sparkles className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-slate-800 block">Custom Brand</span>
                    <span className="text-[10px] text-slate-500">Laser & UV Print</span>
                  </div>
                </div>

                {/* Other Products in this Collection */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    More From This Collection
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {ALL_PRODUCTS.filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                      .slice(0, 4)
                      .map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => {
                            setSelectedProduct(rel);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="aspect-square relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer hover:border-emerald-600 hover:shadow-md transition group"
                          title={rel.title}
                        >
                          <Image src={rel.image} alt={rel.title} fill sizes="(max-width: 768px) 25vw, 120px" className="object-cover group-hover:scale-110 transition duration-300" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing, Specs & Ordering Engine */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      {selectedProduct.categoryName}
                    </span>
                    {selectedProduct.sourceCatalog && (
                      <span className="text-xs text-slate-500 font-medium truncate max-w-xs">
                        • {selectedProduct.sourceCatalog}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {selectedProduct.specs}
                  </p>
                </div>

                {/* Live Starting Price & MOQ Display */}
                <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Starting Bulk Price</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-black text-white">{selectedProduct.startingPrice}</span>
                      <span className="text-xs text-emerald-400 font-semibold">+ 18% GST</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Minimum Order (MOQ)</span>
                    <span className="text-base font-extrabold text-amber-300 mt-0.5 block">{selectedProduct.minQty}</span>
                  </div>
                </div>

                {/* Tiered Quantity Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Select Quantity Tier:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { tier: 1, label: selectedProduct.minQty, disc: "Base Rate" },
                      { tier: 2, label: "2x Bulk Tier", disc: "Save 8%" },
                      { tier: 5, label: "5x Enterprise", disc: "Save 15% Bulk" },
                    ].map((t) => (
                      <button
                        key={t.tier}
                        type="button"
                        onClick={() => setMerchTierQty(t.tier)}
                        className={`p-3 rounded-2xl border text-left transition ${
                          merchTierQty === t.tier
                            ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xs font-extrabold text-slate-900 block truncate">{t.label}</span>
                        <span className={`text-[10px] font-bold block mt-0.5 ${merchTierQty === t.tier ? "text-emerald-700" : "text-slate-400"}`}>
                          {t.disc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Branding / Personalization Technique */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Corporate Branding Method:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    {[
                      "Laser Precision Engraving",
                      "UV Full-Color Printing",
                      "Screen Printing / Tampo",
                      "Blind Debossing / Foil",
                    ].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setMerchBranding(method)}
                        className={`p-2.5 rounded-xl border text-left font-semibold transition ${
                          merchBranding === method
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>{method}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Artwork / Logo Upload Box */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-500 transition bg-slate-50/50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 block truncate">
                        {merchLogoName ? `Attached: ${merchLogoName}` : "Upload Logo for Digital Proof"}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        AI, EPS, CDR, high-res PDF or PNG
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const fakeName = `${companyName.replace(/\s+/g, "_")}_Vector_Logo.ai`;
                      setMerchLogoName(fakeName);
                      setToastMessage(`Logo "${fakeName}" attached for proofing!`);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-xs font-bold shrink-0 transition shadow-xs"
                  >
                    {merchLogoName ? "Change" : "Browse"}
                  </button>
                </div>

                {/* Action Buttons: WhatsApp Instant Quote & Add to Cart */}
                <div className="space-y-3 pt-2">
                  <a
                    href={`https://wa.me/919945039266?text=${encodeURIComponent(
                      `Hello Incredible Treasures, I would like an official quotation for:\n\n• Product: ${selectedProduct.title}\n• Category: ${selectedProduct.categoryName}\n• Catalog: ${selectedProduct.sourceCatalog || 'Catalog'}\n• Quantity Tier: ${merchTierQty}x (Base MOQ: ${selectedProduct.minQty})\n• Branding: ${merchBranding}\n• Delivery: Bengaluru\n\nPlease share official GST proforma invoice.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Instant WhatsApp Quote (+91 9945039266)</span>
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const priceNum = parseFloat(selectedProduct.startingPrice.replace(/[^0-9.]/g, "")) || 250;
                        addItemToCart({
                          productId: selectedProduct.id,
                          title: `${selectedProduct.title} (Sample)`,
                          categoryName: selectedProduct.categoryName,
                          image: selectedProduct.image,
                          quantity: 1,
                          unitPrice: priceNum,
                          branding: merchBranding,
                          specs: selectedProduct.specs,
                        });
                      }}
                      className="py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span>Order Sample (1 pc)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const priceNum = parseFloat(selectedProduct.startingPrice.replace(/[^0-9.]/g, "")) || 250;
                        const moqNum = parseInt(selectedProduct.minQty.replace(/[^0-9]/g, "")) || 50;
                        const totalOrderQty = moqNum * merchTierQty;
                        const discountMultiplier = merchTierQty === 5 ? 0.85 : merchTierQty === 2 ? 0.92 : 1.0;
                        const effectiveUnitPrice = Math.round(priceNum * discountMultiplier * 100) / 100;

                        addItemToCart({
                          productId: selectedProduct.id,
                          title: `${selectedProduct.title} (Bulk Tier ${merchTierQty}x)`,
                          categoryName: selectedProduct.categoryName,
                          image: selectedProduct.image,
                          quantity: totalOrderQty,
                          unitPrice: effectiveUnitPrice,
                          branding: merchBranding,
                          specs: `${selectedProduct.specs} • Logo: ${merchLogoName || "Company Standard"}`,
                        });
                      }}
                      className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                      <span>Add Bulk to Cart</span>
                    </button>
                  </div>
                </div>

                {/* Detailed Specs Table */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Product Technical Specifications
                  </h4>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-400">Manufacturer Model ID:</span>
                      <span className="font-bold text-slate-800">{selectedProduct.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-400">Official Catalog Reference:</span>
                      <span className="font-bold text-emerald-700">{selectedProduct.sourceCatalog}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-400">Material & Build:</span>
                      <span className="font-bold text-slate-800 text-right max-w-xs">{selectedProduct.specs}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-400">Minimum Order Qty:</span>
                      <span className="font-bold text-slate-800">{selectedProduct.minQty}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Dispatch Location:</span>
                      <span className="font-bold text-slate-800">Yelahanka, Bengaluru (GST: 29AAKFI2392F1Z5)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>
        </main>
      )}

      {/* 4. Official Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-sm text-slate-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <Printer className="w-4 h-4" />
                </div>
                <span className="text-base font-bold text-slate-900">M/s Incredible Treasures</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Partnership Firm • Production Web-to-Print Platform
              </p>
              <div className="text-xs text-slate-700 space-y-1.5 pt-1">
                <div><strong>GSTIN:</strong> 29AAKFI2392F1Z5</div>
                <div><strong>UDYAM:</strong> UDYAM-KR-03-0309999</div>
                <div>
                  <strong>Address:</strong> B405, Century Saras, Off Ananthapura Road, Yelahanka, Bengaluru, Karnataka – 560064
                </div>
              </div>
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
                <li>Ceramic Coffee Mugs & Steel Bottles</li>
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
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover"
                />
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
                    <span className="text-xl font-black text-slate-900">{quickViewProduct.startingPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Minimum Quantity:</span>
                    <span className="font-bold text-slate-800">{quickViewProduct.minQty}</span>
                  </div>
                </div>

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
                        setSelectedProduct(prod);
                        setIsEditorOpen(false);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-xs font-bold transition text-center"
                    >
                      View Full Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const prod = quickViewProduct;
                        const priceNum = parseFloat(prod.startingPrice.replace(/[^0-9.]/g, "")) || 250;
                        addItemToCart({
                          productId: prod.id,
                          title: `${prod.title} (Evaluation Sample)`,
                          categoryName: prod.categoryName,
                          image: prod.image,
                          quantity: 1,
                          unitPrice: priceNum,
                          branding: "Standard Evaluation",
                          specs: prod.specs,
                        });
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition text-center"
                    >
                      Add Sample
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
                    {cartItems.length} product{cartItems.length !== 1 ? "s" : ""} • GSTIN: 29AAKFI2392F1Z5
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
                      Explore our 34+ corporate items, pens, drinkware, and 3D visiting card studio.
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
                          <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                            {item.title}
                          </h4>
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
                        <span className="text-[10px] text-slate-400 block">@ ₹{item.unitPrice.toFixed(2)}/pc</span>
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
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-900">₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST (9%):</span>
                    <span className="font-semibold text-slate-900">₹{(cartGst / 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST (9%):</span>
                    <span className="font-semibold text-slate-900">₹{(cartGst / 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Estimated Total (incl. 18% GST):</span>
                    <span className="text-emerald-700 text-base">₹{cartGrandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/919945039266?text=${encodeURIComponent(
                      `Hello Incredible Treasures,\n\nI would like to place a corporate order with the following items:\n\n` +
                        cartItems
                          .map(
                            (it, i) =>
                              `${i + 1}. ${it.title}\n   • Qty: ${it.quantity} units\n   • Rate: ₹${it.unitPrice}\n   • Customization: ${it.branding || 'Standard'}\n   • Total: ₹${(it.unitPrice * it.quantity).toFixed(2)}`
                          )
                          .join("\n\n") +
                        `\n\n--------------------------\n• Subtotal: ₹${cartSubtotal.toFixed(2)}\n• GST (18%): ₹${cartGst.toFixed(2)}\n• Grand Total: ₹${cartGrandTotal.toFixed(2)}\n\nPlease send bank proforma invoice & delivery timeline.`
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
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                      IT
                    </div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      INCREDIBLE TREASURES
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    Direct Web-To-Print, Corporate Stationery & Luxury Merchandise Hub
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Century Saras, Yelahanka, Bengaluru – 560064, Karnataka, India<br />
                    Phone: +91 9945039266 • Web: www.incredible-treasures.com
                  </p>
                  <p className="text-[11px] font-bold text-slate-900 mt-1">
                    GSTIN: 29AAKFI2392F1Z5
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
                        <td className="py-2.5 px-3 font-bold text-slate-900">{item.title}</td>
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
                  <p>2. Prices inclusive of laser engraving / screen branding as specified.</p>
                  <p>3. Subject to Bengaluru Jurisdiction.</p>
                </div>

                <div className="w-full sm:w-64 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs">
                    <span>Taxable Amount:</span>
                    <span className="font-bold text-slate-900">₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>CGST (9%):</span>
                    <span className="font-semibold text-slate-900">₹{(cartGst / 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>SGST (9%):</span>
                    <span className="font-semibold text-slate-900">₹{(cartGst / 2).toFixed(2)}</span>
                  </div>
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
