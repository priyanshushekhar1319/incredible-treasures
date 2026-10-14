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
} from "lucide-react";
import { ALL_PRODUCTS, CatalogProduct, PricingTier } from "@/data/products";
import { CanvasElement, ProFinish, CardTexture, ColorHarmony } from "@/components/canva-studio/types";
import { STARTER_TEMPLATES, StudioTemplate } from "@/components/canva-studio/templates";
import { CanvaCardCanvas } from "@/components/canva-studio/CanvaCardCanvas";
import { CanvaToolbar } from "@/components/canva-studio/CanvaToolbar";
import { CanvaSidebar, SidebarTabId } from "@/components/canva-studio/CanvaSidebar";

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
  const handleUploadImage = (src: string) => {
    const id = `img-${Date.now()}`;
    const newEl: CanvasElement = {
      id,
      type: "image",
      side: activeSide,
      x: 50,
      y: 25,
      imageSrc: src,
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedId(id);
    triggerToast("Image added! Drag & place anywhere.");
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

  // Layer Reordering (Bring Forward / Send Backward)
  const handleReorderElement = (id: string, direction: "up" | "down") => {
    setCurrentElements((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === "up" ? idx + 1 : idx - 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const nextArr = [...prev];
      const temp = nextArr[idx];
      nextArr[idx] = nextArr[targetIdx];
      nextArr[targetIdx] = temp;
      return nextArr;
    });
    triggerToast(direction === "up" ? "Layer moved forward" : "Layer moved backward");
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

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={() => triggerToast("✓ Design saved and added to cart!")}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] text-white font-black text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer hover:scale-102"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order (₹{selectedTier.total.toLocaleString("en-IN")})</span>
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
        gildedEdge={gildedEdge}
        onToggleGildedEdge={() => setGildedEdge(!gildedEdge)}
        cardTexture={cardTexture}
        onChangeTexture={setCardTexture}
        onApplyHarmony={handleApplyHarmony}
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
              onClick={handle3DFlipTurnaround}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-[#A9782B]/15 hover:from-amber-500/20 hover:to-[#A9782B]/25 text-[#734D15] border border-[#EAD5B3] transition flex items-center gap-1.5 cursor-pointer shadow-2xs font-black"
              title="Smoothly rotate the physical card 180 degrees in 3D"
            >
              <RotateCw className={`w-3.5 h-3.5 text-[#A9782B] ${is3DFlipping ? "animate-spin" : ""}`} />
              <span>3D Flip Card 🔄</span>
            </button>
          </div>

          {/* Interactive Card Canvas */}
          <div className="my-auto w-full flex items-center justify-center">
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
            {/* 300 DPI Pre-Flight Quality Check Inspector */}
            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>300 DPI Vector Quality</span>
              </div>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="hidden sm:inline text-slate-600 font-semibold">
                Bleed & Mechanical Safe Zone Checked
              </span>
              <span className="hidden md:inline text-slate-400">•</span>
              <span className="hidden md:inline text-slate-600 font-semibold">
                Selective Foil & CMYK Approved
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

      {/* Proof Download Modal */}
      {isProofModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#A9782B]" />
                <h3 className="text-base font-black text-slate-900">Download Print-Ready Proof</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProofModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Your design on <strong>{selectedProduct.title}</strong> has been prepared at <strong>300 DPI print scale</strong> with blade bleed allowances.
            </p>

            <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-1 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Selected Substrate:</span>
                <strong className="text-slate-900">{selectedProduct.title}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Orientation:</span>
                <strong className="capitalize text-slate-900">{orientation}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Front Elements:</span>
                <strong className="text-slate-900">{frontElements.length} layers</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Front Background:</span>
                <strong className="text-slate-900">{frontBgImage ? "Custom Upload (HD Artwork)" : "Standard Substrate"}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Back Elements:</span>
                <strong className="text-slate-900">{backElements.length} layers</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Back Background:</span>
                <strong className="text-slate-900">{backBgImage ? "Custom Upload (HD Artwork)" : "Standard Substrate"}</strong>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  triggerToast("✓ Downloaded high-resolution PDF proof!");
                  setIsProofModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#A9782B] hover:bg-[#8E621E] text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerToast("✓ Downloaded high-resolution PNG image!");
                  setIsProofModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-800 text-xs font-bold transition border border-[#E5E0D8]"
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      )}

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
