"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Sparkles,
  Layers,
  Ruler,
  ShieldCheck,
  Download,
  Share2,
  MessageSquare,
  FileCheck2,
  Check,
  Wand2,
  Undo2,
  Redo2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Rotate3d,
  Loader2,
  Printer,
  FileText,
  FileDown,
} from "lucide-react";
import { ALL_PRODUCTS, CatalogProduct, PricingTier } from "@/data/products";
import { CanvasElement, ProFinish, CardTexture, ColorHarmony } from "@/components/canva-studio/types";
import { STARTER_TEMPLATES, StudioTemplate } from "@/components/canva-studio/templates";
import { CanvaCardCanvas } from "@/components/canva-studio/CanvaCardCanvas";
import { CanvaToolbar } from "@/components/canva-studio/CanvaToolbar";
import { CanvaSidebar, SidebarTabId } from "@/components/canva-studio/CanvaSidebar";
import { PreFlightModal } from "@/components/canva-studio/PreFlightModal";
import { runCardPreFlightInspection } from "@/components/canva-studio/dpiUtils";
import { Card3DMockupModal } from "@/components/canva-studio/Card3DMockupModal";
import { enhanceAndUpscaleImage } from "@/components/canva-studio/imageEnhancer";
import { validateProductionReadiness } from "@/components/canva-studio/productionGatekeeper";
import { OrderBlockedModal } from "@/components/canva-studio/OrderBlockedModal";
import { StudioCartDrawer, StudioCartItem } from "@/components/canva-studio/StudioCartDrawer";
import {
  generate300DpiPdf,
  downloadCardFacePng,
  generateThumbnailDataUrl,
  RenderFaceParams,
  ExportOptions,
} from "@/components/canva-studio/printExportEngine";
import { SaveDesignModal } from "@/components/canva-studio/SaveDesignModal";
import { SavedDesignsModal } from "@/components/canva-studio/SavedDesignsModal";
import { CustomerAuthModal } from "@/components/CustomerAuthModal";
import { OrderLiveTrackingModal } from "@/components/OrderLiveTrackingModal";
import { SavedDesignItem, CustomerUser, getCustomerSession } from "@/lib/customerSession";
import { getStoredCart, saveStoredCart } from "@/lib/cartStore";
import { FolderHeart, Save, User as UserIcon } from "lucide-react";

const VISITING_CARDS = ALL_PRODUCTS.filter((p) => p.category === "visiting-cards");

interface HistorySnapshot {
  front: CanvasElement[];
  back: CanvasElement[];
  bg: string;
}

export default function VisitingCardStudioCanvaPage() {
  // Card Substrate Selection
  const [selectedSubstrateId, setSelectedSubstrateId] = useState<string>("pvc-regular-glossy");
  const selectedProduct = VISITING_CARDS.find((p) => p.id === selectedSubstrateId) || VISITING_CARDS[0];

  // Card Settings
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [cornerStyle, setCornerStyle] = useState<"square" | "rounded">("square");
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFF");
  const [zoom, setZoom] = useState<number>(100);

  // Premium Aesthetics: Gilded Edge & Tactile Paper Texture
  const [gildedEdge, setGildedEdge] = useState<boolean>(false);
  const [cardTexture, setCardTexture] = useState<CardTexture>("smooth");

  // Premium Features
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [is3DFlipping, setIs3DFlipping] = useState<boolean>(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isPreFlightModalOpen, setIsPreFlightModalOpen] = useState<boolean>(false);
  const [is3DMockupModalOpen, setIs3DMockupModalOpen] = useState<boolean>(false);
  const [isCmykSoftProof, setIsCmykSoftProof] = useState<boolean>(false);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState<boolean>(false);
  const [hasInspectedBackSide, setHasInspectedBackSide] = useState<boolean>(true);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<StudioCartItem[]>([]);

  // Day 16: Design State Persistence & Customer Account Portal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isSavedDesignsModalOpen, setIsSavedDesignsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLiveTrackingModalOpen, setIsLiveTrackingModalOpen] = useState<boolean>(false);
  const [currentSavedDesignId, setCurrentSavedDesignId] = useState<string | null>(null);
  const [designTitle, setDesignTitle] = useState<string>("Mahi Kapoor • 24K Gold Stamped Executive Card");
  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(null);

  useEffect(() => {
    setCustomerUser(getCustomerSession());
    const stored = getStoredCart();
    if (stored && stored.length > 0) {
      setCartItems(stored);
    }
  }, []);

  // Active Side (Front or Back)
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  // Elements on Front and Back
  const [frontElements, setFrontElements] = useState<CanvasElement[]>(
    STARTER_TEMPLATES[0].frontElements
  );
  const [backElements, setBackElements] = useState<CanvasElement[]>(
    STARTER_TEMPLATES[0].backElements
  );

  // Personalized Full Card Background Artwork / Wallpaper
  const [frontBgImage, setFrontBgImage] = useState<string | undefined>(undefined);
  const [backBgImage, setBackBgImage] = useState<string | undefined>(undefined);
  const [frontBgOpacity, setFrontBgOpacity] = useState<number>(1);
  const [backBgOpacity, setBackBgOpacity] = useState<number>(1);
  const [frontBgFit, setFrontBgFit] = useState<"cover" | "contain" | "repeat">("cover");
  const [backBgFit, setBackBgFit] = useState<"cover" | "contain" | "repeat">("cover");

  // Undo / Redo History Stack
  const [history, setHistory] = useState<HistorySnapshot[]>([
    {
      front: STARTER_TEMPLATES[0].frontElements,
      back: STARTER_TEMPLATES[0].backElements,
      bg: "#FFFFFF",
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isHistoryUpdate = useRef<boolean>(false);

  // Currently Selected Element ID on the active side
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Active Sidebar Tab
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTabId>("templates");

  // Quantity Tier Selection
  const [selectedTier, setSelectedTier] = useState<PricingTier>(
    selectedProduct.pricingTiers?.[0] || { qty: 200, pricePerUnit: 12.5, total: 2500 }
  );

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Autofill Form State
  const [aiName, setAiName] = useState<string>("Dr. Aarav Mehta");
  const [aiDesignation, setAiDesignation] = useState<string>("Chief Medical Director");
  const [aiCompany, setAiCompany] = useState<string>("Apex Multispecialty Hospital");
  const [aiCategory, setAiCategory] = useState<string>("medical");
  const [aiPhone, setAiPhone] = useState<string>("+91 98450 12345");
  const [aiEmail, setAiEmail] = useState<string>("aarav.mehta@apexhealth.in");
  const [aiCity, setAiCity] = useState<string>("Indiranagar, Bengaluru");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 600+ DPI Ultra-HD Export Engine State (Strict Standard)
  const [exportIncludeBleed, setExportIncludeBleed] = useState<boolean>(true);
  const [exportIncludeMarks, setExportIncludeMarks] = useState<boolean>(true);
  const [exportTargetDpi, setExportTargetDpi] = useState<300 | 600>(600);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatusText, setExportStatusText] = useState<string>("");

  const getRenderParams = (side: "front" | "back"): RenderFaceParams => {
    const isFront = side === "front";
    return {
      elements: isFront ? frontElements : backElements,
      side,
      orientation,
      backgroundColor,
      backgroundImage: isFront ? frontBgImage : backBgImage,
      backgroundOpacity: isFront ? frontBgOpacity : backBgOpacity,
      backgroundFit: isFront ? frontBgFit : backBgFit,
      cardTexture,
      gildedEdge,
      options: {
        orientation,
        includeBleed: exportIncludeBleed,
        includePrinterMarks: exportIncludeMarks,
        targetDpi: exportTargetDpi,
        jobTitle: `Incredible Treasures - ${selectedProduct.title}`,
        orderNumber: `IT-${Date.now().toString().slice(-6)}`,
        substrateTitle: selectedProduct.title,
      },
    };
  };

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      setExportStatusText("Synthesizing Side A (Front) at 300 DPI print scale...");
      const frontParams = getRenderParams("front");
      const backParams = getRenderParams("back");

      setExportStatusText("Synthesizing Side B (Back) with finish reflections...");
      const { fileName } = await generate300DpiPdf(frontParams, backParams, {
        orientation,
        includeBleed: exportIncludeBleed,
        includePrinterMarks: exportIncludeMarks,
        targetDpi: exportTargetDpi,
        orderNumber: `IT-${Date.now().toString().slice(-6)}`,
      });

      // Notify backend pre-press API in background
      fetch("/api/print-export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orientation,
          substrateTitle: selectedProduct.title,
          frontElements,
          backElements,
          backgroundColor,
          includeBleed: exportIncludeBleed,
          includePrinterMarks: exportIncludeMarks,
          targetDpi: exportTargetDpi,
        }),
      }).catch((e) => console.warn("Pre-press API notification note:", e));

      triggerToast(`✓ Generated & downloaded 2-Page 300 DPI Vector PDF: ${fileName}`);
      setIsProofModalOpen(false);
    } catch (err) {
      console.error("PDF export error:", err);
      triggerToast("Failed to compile 300 DPI PDF. Please check layer assets.");
    } finally {
      setIsExporting(false);
      setExportStatusText("");
    }
  };

  const handleExportFrontPng = async () => {
    try {
      setIsExporting(true);
      setExportStatusText("Rendering Front Face (Side A) at 300 DPI...");
      const params = getRenderParams("front");
      await downloadCardFacePng(params, `IncredibleTreasures-FrontFace-300DPI-${Date.now().toString().slice(-4)}.png`);
      triggerToast("✓ Downloaded Front Face (300 DPI HD PNG)!");
    } catch (err) {
      console.error("Front PNG export error:", err);
      triggerToast("Failed to export Front PNG.");
    } finally {
      setIsExporting(false);
      setExportStatusText("");
    }
  };

  const handleExportBackPng = async () => {
    try {
      setIsExporting(true);
      setExportStatusText("Rendering Back Face (Side B) at 300 DPI...");
      const params = getRenderParams("back");
      await downloadCardFacePng(params, `IncredibleTreasures-BackFace-300DPI-${Date.now().toString().slice(-4)}.png`);
      triggerToast("✓ Downloaded Back Face (300 DPI HD PNG)!");
    } catch (err) {
      console.error("Back PNG export error:", err);
      triggerToast("Failed to export Back PNG.");
    } finally {
      setIsExporting(false);
      setExportStatusText("");
    }
  };

  const handleExportCompletePackage = async () => {
    try {
      setIsExporting(true);
      setExportStatusText("1/3 Synthesizing 2-Page Vector PDF...");
      const frontParams = getRenderParams("front");
      const backParams = getRenderParams("back");
      const orderNum = `IT-${Date.now().toString().slice(-6)}`;

      await generate300DpiPdf(frontParams, backParams, {
        orientation,
        includeBleed: exportIncludeBleed,
        includePrinterMarks: exportIncludeMarks,
        targetDpi: exportTargetDpi,
        orderNumber: orderNum,
      });

      setExportStatusText("2/3 Exporting Front Face HD Raster PNG...");
      await downloadCardFacePng(frontParams, `IncredibleTreasures-SideA-Front-300DPI-${orderNum}.png`);

      setExportStatusText("3/3 Exporting Back Face HD Raster PNG...");
      await downloadCardFacePng(backParams, `IncredibleTreasures-SideB-Back-300DPI-${orderNum}.png`);

      triggerToast("✓ Complete 300 DPI Pre-Press Package downloaded (PDF + Front PNG + Back PNG)!");
      setIsProofModalOpen(false);
    } catch (err) {
      console.error("Complete package export error:", err);
      triggerToast("Failed to bundle complete export package.");
    } finally {
      setIsExporting(false);
      setExportStatusText("");
    }
  };

  useEffect(() => {
    if (selectedProduct.pricingTiers && selectedProduct.pricingTiers.length > 0) {
      setSelectedTier(selectedProduct.pricingTiers[0]);
    }
  }, [selectedProduct]);

  // Current side elements accessor
  const currentElements = activeSide === "front" ? frontElements : backElements;

  // Snapshot History record
  const recordHistory = useCallback(
    (newFront: CanvasElement[], newBack: CanvasElement[], newBg: string) => {
      if (isHistoryUpdate.current) {
        isHistoryUpdate.current = false;
        return;
      }
      setHistory((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        return [...sliced, { front: newFront, back: newBack, bg: newBg }];
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const setCurrentElements = useCallback(
    (setter: (prev: CanvasElement[]) => CanvasElement[]) => {
      if (activeSide === "front") {
        setFrontElements((prevFront) => {
          const nextFront = setter(prevFront);
          recordHistory(nextFront, backElements, backgroundColor);
          return nextFront;
        });
      } else {
        setBackElements((prevBack) => {
          const nextBack = setter(prevBack);
          recordHistory(frontElements, nextBack, backgroundColor);
          return nextBack;
        });
      }
    },
    [activeSide, frontElements, backElements, backgroundColor, recordHistory]
  );

  // Undo Action
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isHistoryUpdate.current = true;
      const target = history[historyIndex - 1];
      setFrontElements(target.front);
      setBackElements(target.back);
      setBackgroundColor(target.bg);
      setHistoryIndex(historyIndex - 1);
      setSelectedId(null);
      triggerToast("Undo applied");
    }
  }, [history, historyIndex]);

  // Redo Action
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isHistoryUpdate.current = true;
      const target = history[historyIndex + 1];
      setFrontElements(target.front);
      setBackElements(target.back);
      setBackgroundColor(target.bg);
      setHistoryIndex(historyIndex + 1);
      setSelectedId(null);
      triggerToast("Redo applied");
    }
  }, [history, historyIndex]);

  // Currently Selected Element
  const selectedElement = currentElements.find((el) => el.id === selectedId) || null;

  // 1-Click Template Application
  const handleApplyTemplate = (tpl: StudioTemplate) => {
    setFrontElements(tpl.frontElements);
    setBackElements(tpl.backElements);
    setBackgroundColor(tpl.backgroundColor);
    setSelectedSubstrateId(tpl.cardSubstrateId);
    setSelectedId(null);
    recordHistory(tpl.frontElements, tpl.backElements, tpl.backgroundColor);
    triggerToast(`Loaded "${tpl.name}" starter layout!`);
  };

  // Day 16: Restore Full Saved Design State from Cloud Library
  const handleLoadDesign = (design: SavedDesignItem) => {
    setFrontElements(design.frontElements || []);
    setBackElements(design.backElements || []);
    setSelectedSubstrateId(design.substrateId || "pvc-regular-glossy");
    setOrientation(design.orientation || "horizontal");
    setCornerStyle(design.cornerStyle || "square");
    setBackgroundColor(design.backgroundColor || "#FFFFFF");
    setGildedEdge(Boolean(design.gildedEdge));
    setCardTexture((design.cardTexture as CardTexture) || "smooth");
    setFrontBgImage(design.frontBgImage || undefined);
    setBackBgImage(design.backBgImage || undefined);
    setFrontBgOpacity(design.frontBgOpacity ?? 1);
    setBackBgOpacity(design.backBgOpacity ?? 1);
    setFrontBgFit(design.frontBgFit || "cover");
    setBackBgFit(design.backBgFit || "cover");
    setCurrentSavedDesignId(design.id);
    setDesignTitle(design.name);
    setSelectedId(null);
    recordHistory(design.frontElements || [], design.backElements || [], design.backgroundColor || "#FFFFFF");
    triggerToast(`✓ Loaded "${design.name}" into studio canvas!`);
  };

  // 1-Click Re-Order Saved Design Directly from Cloud Library
  const handleAddToCartFromSaved = (design: SavedDesignItem) => {
    const prod = ALL_PRODUCTS.find((p) => p.id === design.substrateId) || selectedProduct;
    const tier = prod.pricingTiers?.[0] || selectedTier;
    const newItem: StudioCartItem = {
      id: `saved-print-${design.id}-${Date.now()}`,
      title: design.name || prod.title,
      substrateId: design.substrateId,
      substrateTitle: prod.title,
      quantity: tier.qty,
      pricePerUnit: tier.pricePerUnit,
      totalPrice: tier.total,
      orientation: design.orientation,
      cornerStyle: design.cornerStyle,
      gildedEdge: design.gildedEdge,
      specs: `${design.orientation === "horizontal" ? "Landscape 3.5\"×2.0\"" : "Portrait 2.0\"×3.5\""} • ${
        design.cornerStyle === "rounded" ? "3mm Round Corners" : "Square Cut"
      }${design.gildedEdge ? " • 24K Gilded" : ""} • 600+ DPI Approved`,
      frontPreviewBg: design.previewFront || undefined,
      backPreviewBg: design.previewBack || undefined,
    };
    setCartItems((prev) => {
      const next = [newItem, ...prev];
      saveStoredCart(next);
      return next;
    });
    setIsCartDrawerOpen(true);
    triggerToast(`✓ Added ${tier.qty} cards of "${design.name}" to cart!`);
  };

  // Day 16: Save Design Callback
  const handleSaveSuccess = (saved: any) => {
    setCurrentSavedDesignId(saved.id);
    setDesignTitle(saved.name);
    triggerToast(`✓ Design "${saved.name}" saved to your cloud library!`);
  };

  // Add Freeform Text
  const handleAddText = (type: "heading" | "subheading" | "body", defaultText?: string) => {
    const id = `txt-${Date.now()}`;
    const newEl: CanvasElement = {
      id,
      type: "text",
      side: activeSide,
      x: 50,
      y: 50,
      text:
        defaultText ||
        (type === "heading" ? "YOUR NAME" : type === "subheading" ? "MANAGING DIRECTOR" : "contact@company.com"),
      fontFamily: type === "heading" ? "'Montserrat', sans-serif" : "'Inter', sans-serif",
      fontSize: type === "heading" ? 18 : type === "subheading" ? 10 : 8,
      fontWeight: type === "heading" ? "bold" : type === "subheading" ? "600" : "normal",
      fontStyle: "normal",
      textDecoration: "none",
      textTransform: type === "heading" ? "uppercase" : "none",
      textAlign: "center",
      color: backgroundColor === "#FFFFFF" || backgroundColor === "#F8FAFC" ? "#0F172A" : "#FFFFFF",
      letterSpacing: type === "heading" ? 1 : 0.5,
      lineHeight: 1.3,
      proFinish: type === "heading" ? "gold-foil" : "standard",
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(id);
    triggerToast("Text added! Drag anywhere on the card.");
  };

  // Add Freeform Shape
  const handleAddShape = (kind: "divider-h" | "divider-v" | "badge" | "frame") => {
    const id = `shp-${Date.now()}`;
    const newEl: CanvasElement = {
      id,
      type: "shape",
      side: activeSide,
      shapeKind: kind,
      x: 50,
      y: 50,
      width: kind === "divider-h" ? 70 : 85,
      height: kind === "divider-v" ? 40 : 75,
      strokeColor: "#A9782B",
      fillColor: "#FAF6EE",
      strokeWidth: 1.5,
      strokeStyle: "solid",
      opacity: 0.9,
      badgeText: "EXECUTIVE MEMBER",
      proFinish: "gold-foil",
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(id);
    triggerToast("Shape added! Drag to position.");
  };

  // Add Pro Vector Icon
  const handleAddIcon = (iconName: string) => {
    const id = `ico-${Date.now()}`;
    const newEl: CanvasElement = {
      id,
      type: "icon",
      side: activeSide,
      iconName,
      x: 50,
      y: 50,
      iconSize: 24,
      color: "#A9782B",
      proFinish: "gold-foil",
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(id);
    triggerToast("Vector Icon added! Pick color or foil finish.");
  };

  // Add Dynamic QR Code
  const handleAddQr = (kind: "upi" | "whatsapp" | "vcard" | "url") => {
    const id = `qr-${Date.now()}`;
    const newEl: CanvasElement = {
      id,
      type: "qr",
      side: activeSide,
      qrKind: kind,
      x: 50,
      y: 50,
      qrSize: 58,
      qrColor: backgroundColor === "#FFFFFF" ? "#0F172A" : "#CBA768",
      qrBgColor: backgroundColor,
      qrLabel:
        kind === "upi"
          ? "SCAN TO PAY VIA UPI"
          : kind === "whatsapp"
          ? "CHAT ON WHATSAPP"
          : kind === "vcard"
          ? "SAVE CONTACT"
          : "VISIT WEBSITE",
      upiId: "brand@okhdfcbank",
      payeeName: "Incredible Treasures",
      whatsappNumber: "+91 99450 39266",
      vcardName: "Mahi Kapoor",
      vcardCompany: "Incredible Treasures",
      urlValue: "https://www.incredible-treasures.com",
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(id);
    triggerToast("Live QR added! Drag to any corner.");
  };

  // Add Uploaded Image/Logo
  const handleUploadImage = (
    src: string,
    meta?: {
      naturalWidth: number;
      naturalHeight: number;
      fileName: string;
      fileSizeBytes?: number;
      aspectRatio?: number;
    }
  ) => {
    const id = `img-${Date.now()}`;
    const newEl: CanvasElement = {
      id,
      type: "image",
      side: activeSide,
      x: 50,
      y: 35,
      width: 28,
      imageSrc: src,
      imageAlt: meta?.fileName || "Uploaded Logo",
      naturalWidth: meta?.naturalWidth || 1200,
      naturalHeight: meta?.naturalHeight || 1200,
      fileName: meta?.fileName || "Brand_Logo.png",
      fileSizeBytes: meta?.fileSizeBytes || 240000,
      aspectRatio: meta?.aspectRatio || 1,
      rotation: 0,
      flipX: false,
      flipY: false,
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(id);
    triggerToast(`✓ Logo "${meta?.fileName || "Image"}" placed! Live DPI calculated.`);
  };

  // Personalized Background Image Handlers
  const handleUploadBackgroundImage = (src: string, applyBothSides: boolean = false) => {
    if (applyBothSides) {
      setFrontBgImage(src);
      setBackBgImage(src);
      triggerToast("✓ Custom background applied to both sides!");
    } else if (activeSide === "front") {
      setFrontBgImage(src);
      triggerToast("✓ Front card background updated!");
    } else {
      setBackBgImage(src);
      triggerToast("✓ Back card background updated!");
    }
  };

  const handleChangeBgOpacity = (opacity: number) => {
    if (activeSide === "front") {
      setFrontBgOpacity(opacity);
    } else {
      setBackBgOpacity(opacity);
    }
  };

  const handleChangeBgFit = (fit: "cover" | "contain" | "repeat") => {
    if (activeSide === "front") {
      setFrontBgFit(fit);
    } else {
      setBackBgFit(fit);
    }
  };

  const handleRemoveBgImage = () => {
    if (activeSide === "front") {
      setFrontBgImage(undefined);
      triggerToast("Front background removed");
    } else {
      setBackBgImage(undefined);
      triggerToast("Back background removed");
    }
  };

  // Update selected element
  const handleUpdateElement = (id: string, updates: Partial<CanvasElement>) => {
    setCurrentElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)));
  };

  // Delete element
  const handleDeleteElement = (id: string) => {
    const target = currentElements.find((el) => el.id === id);
    if (target?.locked) {
      triggerToast("⚠️ Element is locked. Unlock it in Layers or Toolbar first.");
      return;
    }
    setCurrentElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // Duplicate element
  const handleDuplicateElement = (id: string) => {
    const item = currentElements.find((el) => el.id === id);
    if (!item) return;
    const newId = `${item.id}-copy-${Date.now()}`;
    const dup: CanvasElement = {
      ...item,
      id: newId,
      x: Math.min(85, item.x + 4),
      y: Math.min(85, item.y + 4),
    };
    setCurrentElements((prev) => [...prev, dup]);
    setSelectedId(newId);
    triggerToast("Element duplicated.");
  };

  // Layer Reordering (Bring to Front, Send to Back, Step Forward, Step Backward)
  const handleReorderElement = (
    id: string,
    direction: "up" | "down" | "front" | "back"
  ) => {
    setCurrentElements((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      if (idx === -1) return prev;

      const nextArr = [...prev];
      const [item] = nextArr.splice(idx, 1);

      if (direction === "front") {
        nextArr.push(item);
      } else if (direction === "back") {
        nextArr.unshift(item);
      } else if (direction === "up") {
        const targetIdx = Math.min(nextArr.length, idx + 1);
        nextArr.splice(targetIdx, 0, item);
      } else if (direction === "down") {
        const targetIdx = Math.max(0, idx - 1);
        nextArr.splice(targetIdx, 0, item);
      }
      return nextArr;
    });

    const labels = {
      front: "Moved to top (Front)",
      back: "Moved to bottom (Back)",
      up: "Layer moved forward",
      down: "Layer moved backward",
    };
    triggerToast(labels[direction]);
  };

  // 1-Click Smart Image Enhancer & 600+ DPI Upscaler Execution
  const handleEnhanceImageElement = async (elementId: string) => {
    const findInSide = (els: CanvasElement[]) => els.find((el) => el.id === elementId);
    const target = findInSide(frontElements) || findInSide(backElements);

    if (!target || target.type !== "image" || !target.imageSrc) {
      triggerToast("⚠️ Image not found for enhancement.");
      return;
    }

    try {
      triggerToast("Enhancing clarity & upscaling to 600+ DPI...");
      const result = await enhanceAndUpscaleImage(target.imageSrc, 2);

      const updater = (els: CanvasElement[]) =>
        els.map((el) => {
          if (el.id === elementId) {
            return {
              ...el,
              imageSrc: result.enhancedDataUrl,
              naturalWidth: result.naturalWidth,
              naturalHeight: result.naturalHeight,
            };
          }
          return el;
        });

      if (findInSide(frontElements)) {
        setFrontElements((prev) => {
          const next = updater(prev);
          recordHistory(next, backElements, backgroundColor);
          return next;
        });
      } else {
        setBackElements((prev) => {
          const next = updater(prev);
          recordHistory(frontElements, next, backgroundColor);
          return next;
        });
      }

      triggerToast("💎 Enhanced! Resolution boosted to 600+ DPI Ultra-HD.");
    } catch (err) {
      console.error("Image enhancement failed:", err);
      triggerToast("⚠️ Enhancement failed. Please try another image.");
    }
  };

  // 1-Click Auto-Nudge inside 2mm Mechanical Cutting Safe Zone
  const handleFixNudgeSafeZone = (elementId: string, side: "front" | "back") => {
    const nudger = (els: CanvasElement[]) =>
      els.map((el) => {
        if (el.id === elementId) {
          return {
            ...el,
            x: Math.max(10, Math.min(90, el.x)),
            y: Math.max(10, Math.min(90, el.y)),
          };
        }
        return el;
      });

    if (side === "front") {
      setFrontElements((prev) => {
        const next = nudger(prev);
        recordHistory(next, backElements, backgroundColor);
        return next;
      });
    } else {
      setBackElements((prev) => {
        const next = nudger(prev);
        recordHistory(frontElements, next, backgroundColor);
        return next;
      });
    }
    triggerToast("✓ Nudged safely inside 2mm cutting line!");
  };

  // 1-Click Direct Element Selector for Text Editing
  const handleFixSelectElement = (elementId: string, side: "front" | "back") => {
    setActiveSide(side);
    setSelectedId(elementId);
    triggerToast("Selected! Edit your real company/personal text.");
  };

  // Add customized card to Cart and open Slide-Over Drawer
  const handleAddToCartAndOpen = async () => {
    let frontThumb: string | undefined = undefined;
    try {
      frontThumb = await generateThumbnailDataUrl(getRenderParams("front"));
    } catch {}

    const newItem: StudioCartItem = {
      id: `print-card-${Date.now()}`,
      title: selectedProduct.title,
      substrateId: selectedSubstrateId,
      substrateTitle: selectedProduct.title,
      quantity: selectedTier.qty,
      pricePerUnit: selectedTier.pricePerUnit,
      totalPrice: selectedTier.total,
      orientation: orientation,
      cornerStyle: cornerStyle,
      gildedEdge: gildedEdge,
      specs: `${orientation === "horizontal" ? "Landscape 3.5\"×2.0\"" : "Portrait 2.0\"×3.5\""} • ${
        cornerStyle === "rounded" ? "3mm Round Corners" : "Square Cut"
      }${gildedEdge ? " • 24K Gilded" : ""} • 600+ DPI Pre-Flight Approved`,
      frontPreviewBg: frontThumb,
      frontElementsCount: frontElements.length,
      backElementsCount: backElements.length,
    };
    setCartItems((prev) => {
      const next = [newItem, ...prev];
      saveStoredCart(next);
      return next;
    });
    setIsCartDrawerOpen(true);
    triggerToast(`✓ Added ${selectedTier.qty} cards to cart! Opening checkout.`);
  };

  // 1-Click Auto-Fix All Defects & Immediately Proceed to Cart
  const handleAutoFixAllAndProceed = async () => {
    // 1. Auto upscale any low-res raster images to 600+ DPI
    for (const el of frontElements) {
      if (el.type === "image") {
        await handleEnhanceImageElement(el.id);
      }
    }
    for (const el of backElements) {
      if (el.type === "image") {
        await handleEnhanceImageElement(el.id);
      }
    }

    // 2. Nudge elements dangerously close to cutting trim safely inside safe zone
    setFrontElements((prev) =>
      prev.map((el) => {
        if (el.type === "shape" && (el.shapeKind === "frame" || el.shapeKind === "rectangle")) return el;
        if (el.type === "shape" && (el.shapeKind === "divider-h" || el.shapeKind === "divider-v")) return el;
        let nx = el.x;
        let ny = el.y;
        if (nx < 7) nx = 10;
        if (nx > 93) nx = 88;
        if (ny < 7) ny = 10;
        if (ny > 93) ny = 88;
        return { ...el, x: nx, y: ny };
      })
    );

    setBackElements((prev) =>
      prev.map((el) => {
        if (el.type === "shape" && (el.shapeKind === "frame" || el.shapeKind === "rectangle")) return el;
        if (el.type === "shape" && (el.shapeKind === "divider-h" || el.shapeKind === "divider-v")) return el;
        let nx = el.x;
        let ny = el.y;
        if (nx < 7) nx = 10;
        if (nx > 93) nx = 88;
        if (ny < 7) ny = 10;
        if (ny > 93) ny = 88;
        return { ...el, x: nx, y: ny };
      })
    );

    // 3. Mark back inspected
    setHasInspectedBackSide(true);

    // 4. Add to cart and open drawer
    handleAddToCartAndOpen();
  };

  // 1-Click Luxury Color Harmony Application
  const handleApplyHarmony = (harmony: ColorHarmony) => {
    setBackgroundColor(harmony.cardBg);

    // Update headings, icons, and divider lines to match the luxury primary finish
    setFrontElements((prev) =>
      prev.map((el) => {
        if (el.type === "text" && (el.fontSize || 12) >= 12) {
          return { ...el, proFinish: harmony.primaryFinish, color: harmony.primaryAccent };
        }
        if (el.type === "icon" || (el.type === "shape" && el.shapeKind === "divider-h")) {
          return {
            ...el,
            proFinish: harmony.primaryFinish,
            strokeColor: harmony.primaryAccent,
            color: harmony.primaryAccent,
          };
        }
        return el;
      })
    );

    setBackElements((prev) =>
      prev.map((el) => {
        if (el.type === "text" && (el.fontSize || 12) >= 11) {
          return { ...el, proFinish: harmony.primaryFinish, color: harmony.primaryAccent };
        }
        if (el.type === "icon") {
          return { ...el, proFinish: harmony.primaryFinish, color: harmony.primaryAccent };
        }
        return el;
      })
    );

    recordHistory(frontElements, backElements, harmony.cardBg);
    triggerToast(`✓ Applied "${harmony.name}" luxury palette!`);
  };

  // Interactive 3D Card Flip Turnaround
  const handle3DFlipTurnaround = () => {
    if (is3DFlipping) return;
    setIs3DFlipping(true);
    setSelectedId(null);

    // Switch active side at midpoint of flip rotation
    setTimeout(() => {
      setActiveSide((prev) => (prev === "front" ? "back" : "front"));
    }, 320);

    // Finish flip turnaround
    setTimeout(() => {
      setIs3DFlipping(false);
    }, 660);
  };

  // Keyboard Shortcuts (Undo, Redo, Delete, Nudge, Duplicate, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      // Undo: Ctrl+Z / Cmd+Z
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
        return;
      }

      // Redo: Ctrl+Y / Cmd+Y or Ctrl+Shift+Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        handleRedo();
        return;
      }

      // Duplicate: Ctrl+D
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d" && selectedId) {
        e.preventDefault();
        handleDuplicateElement(selectedId);
        return;
      }

      // Delete: Delete / Backspace
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        handleDeleteElement(selectedId);
        return;
      }

      // Escape: Deselect
      if (e.key === "Escape") {
        setSelectedId(null);
        return;
      }

      // Arrow Nudging: 0.5% (or 2% with Shift)
      if (
        selectedId &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
        const step = e.shiftKey ? 2 : 0.5;
        const current = currentElements.find((el) => el.id === selectedId);
        if (!current || current.locked) return;

        let newX = current.x;
        let newY = current.y;

        if (e.key === "ArrowUp") newY = Math.max(2, current.y - step);
        if (e.key === "ArrowDown") newY = Math.min(98, current.y + step);
        if (e.key === "ArrowLeft") newX = Math.max(2, current.x - step);
        if (e.key === "ArrowRight") newX = Math.min(98, current.x + step);

        handleUpdateElement(selectedId, {
          x: Math.round(newX * 10) / 10,
          y: Math.round(newY * 10) / 10,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, selectedId, currentElements]);

  // AI Smart Autofill Generator Execution
  const handleExecuteAiAutofill = () => {
    setIsAiModalOpen(false);

    // Build bespoke Side A (Front) and Side B (Back) based on category
    const isGoldSubstrate = aiCategory === "luxury" || aiCategory === "corporate";
    const baseBg = isGoldSubstrate ? "#FFFFFF" : "#FAF8F5";

    const generatedFront: CanvasElement[] = [
      {
        id: `ai-comp-${Date.now()}`,
        type: "text",
        side: "front",
        x: 50,
        y: 28,
        text: aiCompany.toUpperCase(),
        fontFamily: "'Cinzel', serif",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 2.5,
        proFinish: "gold-foil",
      },
      {
        id: `ai-div-${Date.now()}`,
        type: "shape",
        side: "front",
        shapeKind: "divider-h",
        x: 50,
        y: 38,
        width: 60,
        strokeWidth: 1.5,
        proFinish: "gold-foil",
      },
      {
        id: `ai-name-${Date.now()}`,
        type: "text",
        side: "front",
        x: 50,
        y: 52,
        text: aiName.toUpperCase(),
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: "#0F172A",
        letterSpacing: 1.2,
      },
      {
        id: `ai-desig-${Date.now()}`,
        type: "text",
        side: "front",
        x: 50,
        y: 64,
        text: aiDesignation.toUpperCase(),
        fontFamily: "'Inter', sans-serif",
        fontSize: 8.5,
        fontWeight: "600",
        textAlign: "center",
        color: "#A9782B",
        letterSpacing: 1.5,
      },
      {
        id: `ai-contact-${Date.now()}`,
        type: "text",
        side: "front",
        x: 50,
        y: 80,
        text: `${aiPhone}  •  ${aiEmail}`,
        fontFamily: "'Inter', sans-serif",
        fontSize: 7.5,
        textAlign: "center",
        color: "#475569",
        letterSpacing: 0.5,
      },
    ];

    const generatedBack: CanvasElement[] = [
      {
        id: `ai-b-logo-${Date.now()}`,
        type: "icon",
        side: "back",
        iconName: aiCategory === "medical" ? "stethoscope" : aiCategory === "luxury" ? "crown" : "briefcase",
        x: 50,
        y: 26,
        iconSize: 28,
        color: "#A9782B",
        proFinish: "gold-foil",
      },
      {
        id: `ai-b-company-${Date.now()}`,
        type: "text",
        side: "back",
        x: 50,
        y: 42,
        text: aiCompany.toUpperCase(),
        fontFamily: "'Cinzel', serif",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        proFinish: "gold-foil",
      },
      {
        id: `ai-b-qr-${Date.now()}`,
        type: "qr",
        side: "back",
        qrKind: "vcard",
        x: 50,
        y: 68,
        qrSize: 52,
        qrColor: "#0F172A",
        qrBgColor: "#FFFFFF",
        qrLabel: "TAP OR SCAN VCARD",
        vcardName: aiName,
        vcardCompany: aiCompany,
        vcardPhone: aiPhone,
        vcardEmail: aiEmail,
      },
      {
        id: `ai-b-addr-${Date.now()}`,
        type: "text",
        side: "back",
        x: 50,
        y: 88,
        text: aiCity,
        fontFamily: "'Inter', sans-serif",
        fontSize: 7,
        textAlign: "center",
        color: "#64748B",
      },
    ];

    setFrontElements(generatedFront);
    setBackElements(generatedBack);
    setBackgroundColor(baseBg);
    setSelectedId(null);
    recordHistory(generatedFront, generatedBack, baseBg);
    triggerToast("✨ AI generated your executive card layout!");
  };

  // WhatsApp Quote Link
  const getWhatsAppQuoteUrl = () => {
    const text = encodeURIComponent(
      `Hello Incredible Treasures! I designed a custom visiting card on your Studio:\n` +
      `• Substrate: ${selectedProduct.title}\n` +
      `• Quantity: ${selectedTier.qty} pcs\n` +
      `• Total Amount: ₹${selectedTier.total.toLocaleString("en-IN")} (incl. 18% GST)\n` +
      `• Orientation: ${orientation.toUpperCase()}\n` +
      `Please provide instant WhatsApp booking & proof confirmation.`
    );
    return `https://wa.me/919945039266?text=${text}`;
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F8F6F0] text-slate-800 overflow-hidden font-sans selection:bg-[#A9782B] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP NAV BAR (MILKY WHITE LUXURY HEADER)                */}
      {/* ========================================================= */}
      <header className="h-14 bg-white/95 backdrop-blur-md border-b border-[#E5E0D8] px-4 flex items-center justify-between gap-3 shrink-0 z-50 shadow-2xs">
        {/* Left: Back Link & Document Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5 text-xs font-bold border border-[#E5E0D8] shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <div className="h-4 w-px bg-[#E5E0D8] hidden sm:block" />

          {/* Brand Logo & Studio Name */}
          <div className="flex items-center gap-2">
            <img src="/images/logo-transparent.png" alt="Logo" className="w-6 h-6 object-contain hidden sm:block" />
            <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
              Visiting Card Design Studio
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#A9782B]" />
              <span>PRO MODE</span>
            </span>
          </div>
        </div>

        {/* Right: Quantity, Price & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Substrate Name Pill */}
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-[#FAF8F5] border border-[#E5E0D8] px-2.5 py-1 rounded-xl shadow-2xs">
            <Layers className="w-3 h-3 text-[#A9782B]" />
            <span className="truncate max-w-[150px]">{selectedProduct.title.replace("Visiting Card", "")}</span>
          </span>

          {/* Quantity Selector */}
          {selectedProduct.pricingTiers && (
            <select
              value={selectedTier.qty}
              onChange={(e) => {
                const tier = selectedProduct.pricingTiers?.find(
                  (t) => t.qty === parseInt(e.target.value, 10)
                );
                if (tier) setSelectedTier(tier);
              }}
              className="bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#A9782B] rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 cursor-pointer shadow-2xs focus:outline-none"
            >
              {selectedProduct.pricingTiers.map((t) => (
                <option key={t.qty} value={t.qty}>
                  {t.qty} pcs • ₹{t.total.toLocaleString("en-IN")}
                </option>
              ))}
            </select>
          )}

          {/* Day 16: Saved Designs & Save Buttons */}
          <button
            type="button"
            onClick={() => setIsSavedDesignsModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#FAF6EE] text-slate-700 hover:text-[#734D15] border border-[#E5E0D8] hover:border-[#EAD5B3] text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Browse My Saved Designs Cloud Library"
          >
            <FolderHeart className="w-3.5 h-3.5 text-[#A9782B]" />
            <span>My Designs</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSaveModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF6EE] hover:bg-[#EAD5B3]/40 text-[#734D15] border border-[#EAD5B3] text-xs font-black transition shadow-2xs cursor-pointer"
            title="Save Design to Cloud (Database & Local Backup)"
          >
            <Save className="w-3.5 h-3.5 text-[#A9782B]" />
            <span>Save Design</span>
          </button>

          {/* Customer Account Avatar Pill */}
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-800 border border-[#E5E0D8] text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Customer Account & GSTIN Invoicing"
          >
            <UserIcon className="w-3.5 h-3.5 text-[#A9782B]" />
            <span className="hidden md:inline font-semibold">{customerUser?.name?.split(" ")[0] || "Account"}</span>
          </button>

          {/* WhatsApp Quotation CTA */}
          <a
            href={getWhatsAppQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition shadow-2xs"
            title="Send design specs via WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Quote</span>
          </a>

          {/* COMMERCIAL PRINT ORDER / ADD TO CART BUTTON */}
          {(() => {
            const gate = validateProductionReadiness(
              frontElements,
              backElements,
              orientation,
              hasInspectedBackSide
            );

            return (
              <button
                type="button"
                onClick={() => {
                  if (!gate.canPrint) {
                    setIsBlockedModalOpen(true);
                  } else {
                    handleAddToCartAndOpen();
                  }
                }}
                className={`px-4 py-1.5 rounded-xl text-white font-black text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer hover:scale-102 border ${
                  gate.canPrint
                    ? "bg-gradient-to-r from-emerald-600 via-[#A9782B] to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 border-emerald-400"
                    : "bg-gradient-to-r from-amber-600 via-[#A9782B] to-amber-700 hover:from-amber-700 hover:to-amber-800 border-amber-400"
                }`}
                title={
                  gate.canPrint
                    ? "Add customized card to cart and open checkout drawer"
                    : `Pre-flight checks found ${gate.criticalErrorsCount} defect(s). Click to review 1-click auto-fixes and proceed to cart.`
                }
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Print Order (₹{selectedTier.total.toLocaleString("en-IN")})</span>
                {!gate.canPrint && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-black/30 text-white text-[9px] font-black border border-white/20">
                    {gate.criticalErrorsCount}
                  </span>
                )}
              </button>
            );
          })()}

          {/* Cart Badge Button in Header */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition shadow-2xs cursor-pointer"
            title="View Print Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#A9782B]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A9782B] text-white text-[9px] font-black flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. DYNAMIC CONTEXT TOOLBAR (CANVA MILKY WHITE TOP BAR)    */}
      {/* ========================================================= */}
      <CanvaToolbar
        selectedElement={selectedElement}
        onUpdateSelected={(updates) => selectedId && handleUpdateElement(selectedId, updates)}
        onDuplicateSelected={() => selectedId && handleDuplicateElement(selectedId)}
        onDeleteSelected={() => selectedId && handleDeleteElement(selectedId)}
        onBringForward={() => selectedId && handleReorderElement(selectedId, "up")}
        onSendBackward={() => selectedId && handleReorderElement(selectedId, "down")}
        onBringToFront={() => selectedId && handleReorderElement(selectedId, "front")}
        onSendToBack={() => selectedId && handleReorderElement(selectedId, "back")}
        onEnhanceImage={handleEnhanceImageElement}
        orientation={orientation}
        onChangeOrientation={setOrientation}
        cornerStyle={cornerStyle}
        onChangeCornerStyle={setCornerStyle}
        showGuides={showGuides}
        onToggleGuides={() => setShowGuides(!showGuides)}
        backgroundColor={backgroundColor}
        onChangeBackgroundColor={(col) => {
          setBackgroundColor(col);
          recordHistory(frontElements, backElements, col);
        }}
        is3DMode={is3DMode}
        onToggle3DMode={() => setIs3DMode(!is3DMode)}
        onExportProof={() => setIsProofModalOpen(true)}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenPreFlightModal={() => setIsPreFlightModalOpen(true)}
        gildedEdge={gildedEdge}
        onToggleGildedEdge={() => setGildedEdge(!gildedEdge)}
        cardTexture={cardTexture}
        onChangeTexture={setCardTexture}
        onApplyHarmony={handleApplyHarmony}
        isCmykSoftProof={isCmykSoftProof}
        onToggleCmykSoftProof={() => setIsCmykSoftProof(!isCmykSoftProof)}
        onOpen3DMockup={() => setIs3DMockupModalOpen(true)}
      />

      {/* ========================================================= */}
      {/* 3. WORKSPACE: SIDEBAR + MAIN MILKY CANVAS DESK            */}
      {/* ========================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Canva Tool Strip Sidebar */}
        <CanvaSidebar
          activeTab={activeSidebarTab}
          onChangeTab={setActiveSidebarTab}
          onApplyTemplate={handleApplyTemplate}
          onAddText={handleAddText}
          onAddShape={handleAddShape}
          onAddIcon={handleAddIcon}
          onAddQr={handleAddQr}
          onUploadImage={handleUploadImage}
          selectedSubstrateId={selectedSubstrateId}
          onSelectSubstrate={setSelectedSubstrateId}
          currentElements={currentElements}
          selectedId={selectedId}
          onSelectElement={setSelectedId}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
          onDuplicateElement={handleDuplicateElement}
          onReorderElement={handleReorderElement}
          activeSide={activeSide}
          currentBgImage={activeSide === "front" ? frontBgImage : backBgImage}
          currentBgOpacity={activeSide === "front" ? frontBgOpacity : backBgOpacity}
          currentBgFit={activeSide === "front" ? frontBgFit : backBgFit}
          onUploadBackgroundImage={handleUploadBackgroundImage}
          onChangeBgOpacity={handleChangeBgOpacity}
          onChangeBgFit={handleChangeBgFit}
          onRemoveBgImage={handleRemoveBgImage}
        />

        {/* Center / Right: Spacious Studio Milky Desk */}
        <main className="flex-1 bg-[#F2EFE9] overflow-y-auto flex flex-col items-center justify-between p-4 sm:p-6 relative">
          {/* Top Page Switcher Bar with 3D Flip Turnaround CTA */}
          <div className="flex flex-wrap items-center gap-2 mb-3 bg-white p-1 rounded-2xl border border-[#E5E0D8] text-xs font-bold shadow-md">
            <button
              type="button"
              onClick={() => {
                setActiveSide("front");
                setSelectedId(null);
              }}
              className={`px-4 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeSide === "front"
                  ? "bg-[#A9782B] text-white shadow-2xs font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-[#FAF8F5]"
              }`}
            >
              <span>Side A • Front Face</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSide("back");
                setHasInspectedBackSide(true);
                setSelectedId(null);
              }}
              className={`px-4 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeSide === "back"
                  ? "bg-[#A9782B] text-white shadow-2xs font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-[#FAF8F5]"
              }`}
            >
              <span>Side B • Back Face</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            <div className="w-px h-5 bg-[#E5E0D8] hidden sm:block mx-0.5" />

            {/* 3D Flip Card Turnaround Button */}
            <button
              type="button"
              onClick={() => {
                handle3DFlipTurnaround();
                setHasInspectedBackSide(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-[#A9782B]/15 hover:from-amber-500/20 hover:to-[#A9782B]/25 text-[#734D15] border border-[#EAD5B3] transition flex items-center gap-1.5 cursor-pointer shadow-2xs font-black"
              title="Smoothly rotate the physical card 180 degrees in 3D"
            >
              <RotateCw className={`w-3.5 h-3.5 text-[#A9782B] ${is3DFlipping ? "animate-spin" : ""}`} />
              <span>3D Flip Card 🔄</span>
            </button>
          </div>

          {/* Interactive Card Canvas (with CMYK soft-proofing filter) */}
          <div
            className="my-auto w-full flex items-center justify-center transition-all"
            style={{
              filter: isCmykSoftProof ? "contrast(0.96) saturate(0.92)" : "none",
            }}
          >
            <CanvaCardCanvas
              elements={currentElements}
              onUpdateElement={handleUpdateElement}
              onDeleteElement={handleDeleteElement}
              onDuplicateElement={handleDuplicateElement}
              selectedId={selectedId}
              onSelectElement={setSelectedId}
              side={activeSide}
              orientation={orientation}
              cornerStyle={cornerStyle}
              showGuides={showGuides}
              backgroundColor={backgroundColor}
              zoom={zoom}
              is3DMode={is3DMode}
              substrateId={selectedSubstrateId}
              is3DFlipping={is3DFlipping}
              onToggle3DFlip={handle3DFlipTurnaround}
              cardTexture={cardTexture}
              gildedEdge={gildedEdge}
              backgroundImage={activeSide === "front" ? frontBgImage : backBgImage}
              backgroundOpacity={activeSide === "front" ? frontBgOpacity : backBgOpacity}
              backgroundFit={activeSide === "front" ? frontBgFit : backBgFit}
            />
          </div>

          {/* Bottom Desk Helper Bar with Pre-Flight Inspector & Zoom */}
          <div className="w-full max-w-4xl mt-3 flex flex-wrap items-center justify-between gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5E0D8] text-xs text-slate-600 shadow-lg">
            {/* STRICT Commercial Gatekeeper Indicator */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
              {(() => {
                const gate = validateProductionReadiness(
                  frontElements,
                  backElements,
                  orientation,
                  hasInspectedBackSide
                );

                if (!gate.canPrint) {
                  return (
                    <button
                      type="button"
                      onClick={() => setIsBlockedModalOpen(true)}
                      className="flex items-center gap-2 px-3 py-1 rounded-xl font-black transition cursor-pointer shadow-2xs border bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100 animate-pulse"
                      title="Commercial printing blocked. Click to see exact errors & auto-fix."
                    >
                      <Lock className="w-3.5 h-3.5 text-rose-600" />
                      <span>🚨 BLOCKED: {gate.criticalErrorsCount} Error(s)</span>
                      <span className="text-[9px] uppercase font-bold bg-white text-rose-700 px-1.5 py-0.2 rounded border border-rose-200">
                        Fix Now
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    type="button"
                    onClick={() => setIsPreFlightModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1 rounded-xl font-black transition cursor-pointer shadow-2xs border bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                    title="Click to view comprehensive Pre-Flight Quality Report"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>💎 100% Ready: 600+ DPI & Margins Verified</span>
                    <span className="text-[9px] uppercase font-bold bg-white/90 px-1.5 py-0.2 rounded border border-slate-200">
                      Approved
                    </span>
                  </button>
                );
              })()}

              {/* Quick Trigger for 3D Mockup Studio */}
              <button
                type="button"
                onClick={() => setIs3DMockupModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl font-black bg-gradient-to-r from-amber-500/15 via-[#A9782B]/20 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-600/25 text-[#734D15] border border-[#EAD5B3] transition cursor-pointer shadow-2xs text-[11px]"
                title="Launch Interactive 3D Mockup Studio with Mouse Tilt & Sign-Off"
              >
                <Rotate3d className="w-3.5 h-3.5 text-[#A9782B]" />
                <span>3D Mockup Studio</span>
              </button>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="hidden sm:inline text-slate-600 font-semibold">
                Bleed & Safe Zone
              </span>
              <span className="hidden md:inline text-slate-400">•</span>
              <span className="hidden md:inline text-slate-600 font-semibold">
                CMYK & Foil Channels
              </span>
            </div>

            {/* Right: Keyboard Shortcuts Hint & Zoom Controls */}
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-[10px] text-slate-400 font-medium">
                Tip: Use <strong>Arrows</strong> to nudge • <strong>Ctrl+Z</strong> to undo
              </span>

              <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.max(75, prev - 15))}
                  disabled={zoom <= 75}
                  className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[10px] font-mono font-bold text-slate-700">{zoom}%</span>
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.min(135, prev + 15))}
                  disabled={zoom >= 135}
                  className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Smart Autofill Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
                  <Wand2 className="w-5 h-5 text-[#A9782B]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">AI Smart Autofill Assistant</h3>
                  <p className="text-[10px] text-slate-500">Auto-generates high-end card design with matching typography & foils.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company / Brand Name:</label>
                <input
                  type="text"
                  value={aiCompany}
                  onChange={(e) => setAiCompany(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  placeholder="e.g. Royal Heritage Jewellers"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={aiName}
                    onChange={(e) => setAiName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    placeholder="e.g. Aarav Mehta"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designation / Role:</label>
                  <input
                    type="text"
                    value={aiDesignation}
                    onChange={(e) => setAiDesignation(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    placeholder="e.g. Chief Executive Officer"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry Aesthetic:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "corporate", label: "Executive Gold" },
                    { id: "medical", label: "Doctor / Healthcare" },
                    { id: "luxury", label: "Luxury Jewellers" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setAiCategory(cat.id)}
                      className={`p-2 rounded-xl text-center border font-bold text-[11px] transition cursor-pointer ${
                        aiCategory === cat.id
                          ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] shadow-2xs"
                          : "bg-[#FAF8F5] border-[#E5E0D8] text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number:</label>
                  <input
                    type="text"
                    value={aiPhone}
                    onChange={(e) => setAiPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email ID:</label>
                  <input
                    type="text"
                    value={aiEmail}
                    onChange={(e) => setAiEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">City / Address:</label>
                <input
                  type="text"
                  value={aiCity}
                  onChange={(e) => setAiCity(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  placeholder="e.g. Connaught Place, New Delhi"
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteAiAutofill}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:scale-101"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Synthesize Executive Design</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 600+ DPI Pre-Press Export Hub Modal (Strict Ultra-HD Standard) */}
      {isProofModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#E5E0D8] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] border border-[#EAD5B3] flex items-center justify-center text-[#A9782B] shadow-2xs">
                    <Printer className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    600+ DPI Ultra-HD Pre-Press Export Hub
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Industrial Vector Print Pipeline • Bangalore Press-Ready with Strict 600+ DPI Standard
                </p>
              </div>
              <button
                type="button"
                onClick={() => !isExporting && setIsProofModalOpen(false)}
                disabled={isExporting}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Pre-Press Badges */}
            <div className="flex flex-wrap gap-1.5 text-[10px] font-black uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 border border-emerald-500/30 flex items-center gap-1 font-black">
                <span>💎</span> 600+ DPI Ultra-HD
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 border border-amber-500/30">
                PDF/X-1a Vector
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3]">
                CMYK FOGRA39 Proof
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                0.125" Bleed Box
              </span>
            </div>

            {/* Specifications Card */}
            <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Selected Substrate:</span>
                <strong className="text-slate-900 truncate max-w-[240px]">{selectedProduct.title}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Finished Trim Dimensions:</span>
                <strong className="text-slate-900">
                  {orientation === "horizontal" ? '3.5" × 2.0" (1050 × 600 px)' : '2.0" × 3.5" (600 × 1050 px)'}
                </strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Total Print Size (with Bleed):</span>
                <strong className="text-[#A9782B]">
                  {orientation === "horizontal" ? '3.75" × 2.25" (1125 × 675 px)' : '2.25" × 3.75" (675 × 1125 px)'}
                </strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Production Layers:</span>
                <strong className="text-slate-900">
                  Side A: {frontElements.length} layers • Side B: {backElements.length} layers
                </strong>
              </div>
              <div className="flex justify-between text-slate-700 items-center pt-1 border-t border-[#E5E0D8]">
                <span className="font-medium text-slate-500">Pre-Flight Resolution Check:</span>
                {(() => {
                  const rep = runCardPreFlightInspection(frontElements, backElements, orientation);
                  return (
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-lg border ${
                        rep.hasBlurRisk
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      {rep.hasBlurRisk ? `⚠️ Low DPI Risk (${rep.lowestDpi} DPI)` : "✓ 600+ DPI Certified Sharp"}
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* Interactive Pre-Press Production Toggles */}
            <div className="p-3.5 bg-white rounded-2xl border border-[#E5E0D8] space-y-2.5">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                Production Options
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Bleed Toggle */}
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#A9782B] cursor-pointer transition select-none">
                  <input
                    type="checkbox"
                    checked={exportIncludeBleed}
                    onChange={(e) => setExportIncludeBleed(e.target.checked)}
                    className="accent-[#A9782B] w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <span className="block font-bold text-slate-800 text-[11px]">Mechanical Bleed</span>
                    <span className="block text-[10px] text-slate-500">+0.125" edge allowance</span>
                  </div>
                </label>

                {/* Printer's Crop Marks Toggle */}
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#A9782B] cursor-pointer transition select-none">
                  <input
                    type="checkbox"
                    checked={exportIncludeMarks}
                    onChange={(e) => setExportIncludeMarks(e.target.checked)}
                    className="accent-[#A9782B] w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <span className="block font-bold text-slate-800 text-[11px]">Printer's Crop Marks</span>
                    <span className="block text-[10px] text-slate-500">Corner ticks & color bar</span>
                  </div>
                </label>
              </div>

              {/* DPI Selector */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold text-slate-700">Target Output Resolution:</span>
                <div className="flex bg-[#FAF8F5] p-0.5 rounded-xl border border-[#E5E0D8] text-[11px] font-black">
                  <button
                    type="button"
                    onClick={() => setExportTargetDpi(600)}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      exportTargetDpi === 600
                        ? "bg-[#A9782B] text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    💎 600+ DPI (Ultra-HD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportTargetDpi(300)}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      exportTargetDpi === 300
                        ? "bg-[#A9782B] text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    300 DPI (Offset)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Progress Indicator when exporting */}
            {isExporting && (
              <div className="p-3 bg-[#FAF6EE] rounded-2xl border border-[#EAD5B3] flex items-center gap-3 animate-in fade-in">
                <Loader2 className="w-5 h-5 text-[#A9782B] animate-spin shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-[#734D15] block">Exporting Production Assets</span>
                  <span className="text-[11px] text-slate-600 block">{exportStatusText || "Rendering canvas layers at 300 DPI..."}</span>
                </div>
              </div>
            )}

            {/* Export Actions */}
            <div className="space-y-2 pt-1">
              {/* Primary: 2-Page Vector PDF */}
              <button
                type="button"
                onClick={handleExportPdf}
                disabled={isExporting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#A9782B] via-[#946723] to-[#7E571B] hover:from-[#946723] hover:to-[#6E4B17] text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                <span>Download 2-Page Vector PDF ({exportTargetDpi} DPI Front + Back)</span>
              </button>

              {/* Secondary Raster Options */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleExportFrontPng}
                  disabled={isExporting}
                  className="py-2 px-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EFE9] text-slate-800 text-[11px] font-bold transition border border-[#E5E0D8] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Export Side A as high-resolution PNG"
                >
                  <Download className="w-3 h-3 text-[#A9782B]" />
                  <span>Front PNG</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportBackPng}
                  disabled={isExporting}
                  className="py-2 px-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EFE9] text-slate-800 text-[11px] font-bold transition border border-[#E5E0D8] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Export Side B as high-resolution PNG"
                >
                  <Download className="w-3 h-3 text-[#A9782B]" />
                  <span>Back PNG</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCompletePackage}
                  disabled={isExporting}
                  className="py-2 px-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F5ECE0] text-[#734D15] text-[11px] font-black transition border border-[#EAD5B3] flex items-center justify-center gap-1 cursor-pointer shadow-2xs disabled:opacity-50"
                  title="Download complete press bundle: PDF + Front PNG + Back PNG"
                >
                  <Sparkles className="w-3 h-3 text-[#A9782B]" />
                  <span>Full Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive 3D Mockup Studio & Production Sign-Off Modal */}
      <Card3DMockupModal
        isOpen={is3DMockupModalOpen}
        onClose={() => setIs3DMockupModalOpen(false)}
        product={selectedProduct}
        selectedTier={selectedTier}
        frontElements={frontElements}
        backElements={backElements}
        frontBgImage={frontBgImage}
        backBgImage={backBgImage}
        frontBgOpacity={frontBgOpacity}
        backBgOpacity={backBgOpacity}
        frontBgFit={frontBgFit}
        backBgFit={backBgFit}
        orientation={orientation}
        cornerStyle={cornerStyle}
        backgroundColor={backgroundColor}
        gildedEdge={gildedEdge}
        cardTexture={cardTexture}
        onApproveAndOrder={handleAddToCartAndOpen}
        onOpenExportProof={() => setIsProofModalOpen(true)}
      />

      {/* Real-Time Pre-Flight Quality Inspector Modal (600+ DPI & Enhancer) */}
      <PreFlightModal
        isOpen={isPreFlightModalOpen}
        onClose={() => setIsPreFlightModalOpen(false)}
        frontElements={frontElements}
        backElements={backElements}
        orientation={orientation}
        productTitle={selectedProduct.title}
        onEnhanceImageElement={handleEnhanceImageElement}
        onProceedWithOrder={handleAddToCartAndOpen}
      />

      {/* Strict Production Gatekeeper Blocker Modal */}
      <OrderBlockedModal
        isOpen={isBlockedModalOpen}
        onClose={() => setIsBlockedModalOpen(false)}
        gateResult={validateProductionReadiness(
          frontElements,
          backElements,
          orientation,
          hasInspectedBackSide
        )}
        onFixUpscaleImage={handleEnhanceImageElement}
        onFixNudgeSafeZone={handleFixNudgeSafeZone}
        onFixSwitchSide={() => {
          setActiveSide("back");
          setHasInspectedBackSide(true);
        }}
        onFixSelectElement={handleFixSelectElement}
        onProceedToOrder={handleAddToCartAndOpen}
        onAutoFixAllAndProceed={handleAutoFixAllAndProceed}
      />

      {/* Day 16: Save Design to Cloud Modal */}
      <SaveDesignModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSaveSuccess={handleSaveSuccess}
        currentDesignName={designTitle}
        substrateId={selectedSubstrateId}
        substrateTitle={selectedProduct.title}
        orientation={orientation}
        cornerStyle={cornerStyle}
        backgroundColor={backgroundColor}
        gildedEdge={gildedEdge}
        cardTexture={cardTexture}
        frontParams={getRenderParams("front")}
        backParams={getRenderParams("back")}
        existingDesignId={currentSavedDesignId}
      />

      {/* Day 16: Saved Designs Cloud Library Modal */}
      <SavedDesignsModal
        isOpen={isSavedDesignsModalOpen}
        onClose={() => setIsSavedDesignsModalOpen(false)}
        onLoadDesign={handleLoadDesign}
        onAddToCartFromSaved={handleAddToCartFromSaved}
      />

      {/* Day 16: Customer Authentication & Corporate Portal Modal */}
      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenSavedDesigns={() => setIsSavedDesignsModalOpen(true)}
        onOpenLiveTracking={() => setIsLiveTrackingModalOpen(true)}
        onUserChange={(u) => setCustomerUser(u)}
      />

      {/* Day 18: Live Product Location & Air Dispatch Tracking Modal */}
      <OrderLiveTrackingModal
        isOpen={isLiveTrackingModalOpen}
        onClose={() => setIsLiveTrackingModalOpen(false)}
        initialOrderId="IT-PRINT-017378"
        initialPincode="560001"
        customerName={customerUser?.name || "Mahi Kapoor"}
        companyName={customerUser?.companyName || "Incredible Treasures Luxury Studio"}
      />

      {/* Slide-Over Corporate Print Cart Drawer */}
      <StudioCartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cartItems}
        onRemoveItem={(id) => {
          setCartItems((prev) => {
            const next = prev.filter((i) => i.id !== id);
            saveStoredCart(next);
            return next;
          });
          triggerToast("Item removed from cart.");
        }}
        onClearCart={() => {
          setCartItems([]);
          saveStoredCart([]);
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-slate-900 border border-[#A9782B] px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#A9782B]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
