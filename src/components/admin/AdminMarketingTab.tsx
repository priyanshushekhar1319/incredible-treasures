"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Megaphone,
  Tag,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Percent,
  IndianRupee,
  Truck,
  ArrowRight,
  ShieldCheck,
  Copy,
  ExternalLink,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import {
  getAllHeroBanners,
  saveHeroBanner,
  deleteHeroBanner,
  syncBannersFromServer,
  resetHeroBannersToDefault,
  getAnnouncementConfig,
  saveAnnouncementConfig,
  getAdminCoupons,
  saveAdminCoupon,
  deleteAdminCoupon,
  toggleAdminCoupon,
  HeroBannerItem,
  AnnouncementBarConfig,
  AdminCouponRule,
} from "@/lib/marketingStore";

export const AdminMarketingTab: React.FC = () => {
  const [subTab, setSubTab] = useState<"banners" | "ticker" | "coupons">("banners");

  // State
  const [banners, setBanners] = useState<HeroBannerItem[]>([]);
  const [announcement, setAnnouncement] = useState<AnnouncementBarConfig>(getAnnouncementConfig());
  const [coupons, setCoupons] = useState<AdminCouponRule[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Banner Modal State
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBannerItem | null>(null);
  const [bannerForm, setBannerForm] = useState<Partial<HeroBannerItem>>({
    title: "",
    subtitle: "",
    eyebrow: "FESTIVE EDITION",
    badge: "FESTIVE SPECIAL",
    category: "festive",
    image: "/images/custom-visiting-cards-banner.jpg",
    primaryCtaText: "Claim Festive Offer",
    ctaLabel: "EXPLORE NOW",
    targetUrl: "/#visiting-cards",
    isActive: true,
    features: ["24K Gold Foil", "400 Micron Polymer", "48-Hour Dispatch"],
  });

  // Coupon Modal State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState<Partial<AdminCouponRule>>({
    code: "",
    description: "",
    type: "percent",
    value: 20,
    minOrder: 2000,
    isActive: true,
    expiryDate: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setBannerForm((prev) => ({ ...prev, image: data.url }));
        showToast("Banner creative uploaded and saved to server!");
      } else {
        showToast("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      showToast("Upload failed: " + err.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const reloadData = async () => {
    setBanners(getAllHeroBanners());
    setAnnouncement(getAnnouncementConfig());
    setCoupons(getAdminCoupons());
    try {
      const serverBanners = await syncBannersFromServer();
      if (serverBanners && serverBanners.length > 0) {
        setBanners(serverBanners);
      }
    } catch {}
  };

  useEffect(() => {
    reloadData();
    const handleMarketing = () => reloadData();
    const handleCoupons = () => reloadData();
    window.addEventListener("it_marketing_updated", handleMarketing);
    window.addEventListener("it_coupons_updated", handleCoupons);
    return () => {
      window.removeEventListener("it_marketing_updated", handleMarketing);
      window.removeEventListener("it_coupons_updated", handleCoupons);
    };
  }, []);

  // Copy code helper
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Save Announcement Ticker
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    saveAnnouncementConfig(announcement);
    showToast("Announcement Ticker updated and live on Storefront!");
  };

  // Open Create/Edit Banner
  const handleOpenBannerModal = (banner?: HeroBannerItem) => {
    if (banner) {
      setEditingBanner(banner);
      setBannerForm(banner);
    } else {
      setEditingBanner(null);
      setBannerForm({
        id: `banner-${Date.now()}`,
        title: "Diwali Mahotsav Luxury Gold Foil Cards",
        subtitle: "Architectural 400 micron PVC with 24K mirror gold hot foil",
        eyebrow: "DIWALI MAHOTSAV EDITION",
        badge: "FESTIVE SPECIAL • 20% OFF",
        category: "festive",
        image: "/images/custom-visiting-cards-banner.jpg",
        primaryCtaText: "Claim 20% Off with Code DIWALI20",
        ctaLabel: "EXPLORE DIWALI FOIL",
        targetUrl: "/#visiting-cards",
        isActive: true,
        expiryDate: "2026-11-20T23:59:59Z",
        features: ["24K Mirror Gold Foil", "400 Micron Polymer", "48-Hour BlueDart Dispatch"],
        isFestiveCampaign: true,
      });
    }
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerForm.title) return;

    const bannerData: HeroBannerItem = {
      id: editingBanner ? editingBanner.id : (bannerForm.id || `banner-${Date.now()}`),
      category: (bannerForm.category as any) || "visiting-cards",
      breadcrumb: bannerForm.breadcrumb || bannerForm.title || "Custom Products",
      badge: bannerForm.badge || "Featured",
      eyebrow: bannerForm.eyebrow || "EXCLUSIVE",
      title: bannerForm.title || "Luxury Prints",
      subtitle: bannerForm.subtitle || "",
      description: bannerForm.description || bannerForm.subtitle || "",
      image: bannerForm.image || "/images/custom-visiting-cards-banner.jpg",
      primaryCtaText: bannerForm.primaryCtaText || "Shop Now",
      ctaLabel: bannerForm.ctaLabel || "SHOP NOW",
      features: bannerForm.features || ["Premium Quality", "Express Dispatch"],
      targetUrl: bannerForm.targetUrl || "/#visiting-cards",
      isActive: bannerForm.isActive !== undefined ? bannerForm.isActive : true,
      expiryDate: bannerForm.expiryDate || undefined,
      isFestiveCampaign: Boolean(bannerForm.isFestiveCampaign),
      enableCrackersEffect: Boolean(bannerForm.enableCrackersEffect || bannerForm.isFestiveCampaign),
      videoUrl: bannerForm.videoUrl?.trim() || undefined,
    };

    saveHeroBanner(bannerData);
    setIsBannerModalOpen(false);
    reloadData();
    showToast(editingBanner ? "Hero banner updated!" : "New Hero banner published live!");
  };

  const handleResetBanners = () => {
    if (confirm("Reset all hero banners to default unique set? This eliminates any duplicate visiting cards or polos.")) {
      const reset = resetHeroBannersToDefault();
      setBanners(reset);
      showToast("Reset all hero banners to default unique set!");
    }
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm("Are you sure you want to remove this hero banner?")) {
      deleteHeroBanner(id);
      showToast("Hero banner deleted.");
    }
  };

  // Open Create Coupon
  const handleOpenCouponModal = () => {
    setCouponForm({
      code: "",
      description: "",
      type: "percent",
      value: 20,
      minOrder: 2500,
      isActive: true,
      expiryDate: "2026-11-20T23:59:59Z",
    });
    setIsCouponModalOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.value) return;

    const newCoupon: AdminCouponRule = {
      code: couponForm.code.toUpperCase().trim(),
      description: couponForm.description || `Special Promotion ${couponForm.code.toUpperCase()}`,
      type: couponForm.type || "percent",
      value: Number(couponForm.value),
      minOrder: Number(couponForm.minOrder || 0),
      isActive: couponForm.isActive !== undefined ? couponForm.isActive : true,
      expiryDate: couponForm.expiryDate || undefined,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    };

    saveAdminCoupon(newCoupon);
    setIsCouponModalOpen(false);
    showToast(`Coupon ${newCoupon.code} created and live at checkout!`);
  };

  const handleDeleteCoupon = (code: string) => {
    if (confirm(`Delete coupon code ${code}?`)) {
      deleteAdminCoupon(code);
      showToast(`Coupon ${code} removed.`);
    }
  };

  const activeCouponCount = coupons.filter((c) => c.isActive).length;
  const activeBannerCount = banners.filter((b) => b.isActive).length;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-[#A9782B] text-amber-200 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Key Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-[#261b0d] to-slate-950 border border-[#EAD5B3]/40 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3]">
              ✦ Module I • Dynamic Marketing ERP ✦
            </span>
            <span className="text-xs text-amber-200/80 font-serif">Owner Command Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#CBA768]" />
            Dynamic Banners & Festive Offers Engine
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-sans">
            Control homepage hero carousel slides, top marquee announcement tickers, and promotional coupon codes with scheduled auto-expiry without touching any code.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <div className="px-4 py-2.5 rounded-2xl bg-black/60 border border-[#EAD5B3]/30 text-center backdrop-blur-xs">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Active Banners</p>
            <p className="text-lg font-black text-amber-300 font-mono">{activeBannerCount} / {banners.length}</p>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-black/60 border border-[#EAD5B3]/30 text-center backdrop-blur-xs">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Top Ticker</p>
            <p className="text-lg font-black font-mono">
              {announcement.enabled ? (
                <span className="text-emerald-400">LIVE</span>
              ) : (
                <span className="text-slate-500">OFF</span>
              )}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-black/60 border border-[#EAD5B3]/30 text-center backdrop-blur-xs">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Live Coupons</p>
            <p className="text-lg font-black text-[#CBA768] font-mono">{activeCouponCount}</p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAD5B3] pb-2">
        <button
          type="button"
          onClick={() => setSubTab("banners")}
          className={`px-4 py-2 rounded-xl text-xs font-serif tracking-wide transition flex items-center gap-2 cursor-pointer ${
            subTab === "banners"
              ? "bg-[#A9782B] text-white shadow-md font-bold"
              : "bg-white text-slate-700 hover:bg-[#FAF6EE] border border-[#EAD5B3] font-medium"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Homepage Hero Banners ({banners.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("ticker")}
          className={`px-4 py-2 rounded-xl text-xs font-serif tracking-wide transition flex items-center gap-2 cursor-pointer ${
            subTab === "ticker"
              ? "bg-[#A9782B] text-white shadow-md font-bold"
              : "bg-white text-slate-700 hover:bg-[#FAF6EE] border border-[#EAD5B3] font-medium"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Top Announcement Ticker</span>
          {announcement.enabled && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
        </button>

        <button
          type="button"
          onClick={() => setSubTab("coupons")}
          className={`px-4 py-2 rounded-xl text-xs font-serif tracking-wide transition flex items-center gap-2 cursor-pointer ${
            subTab === "coupons"
              ? "bg-[#A9782B] text-white shadow-md font-bold"
              : "bg-white text-slate-700 hover:bg-[#FAF6EE] border border-[#EAD5B3] font-medium"
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Promotional Coupons & Auto-Expiry ({coupons.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: HOMEPAGE HERO BANNERS                                          */}
      {/* ========================================================================= */}
      {subTab === "banners" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Active Hero Carousel Slides
              </h2>
              <p className="text-xs text-slate-500">
                These slides auto-rotate smoothly on the main customer storefront.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetBanners}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                title="Wipe duplicates and restore the 6 clean unique category slides"
              >
                Reset Default Unique Banners
              </button>
              <button
                type="button"
                onClick={() => handleOpenBannerModal()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-[#CBA768] font-black text-xs transition flex items-center gap-2 border border-[#A9782B]/40 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Festive / Custom Banner</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {banners.map((banner) => {
              const isExpired = banner.expiryDate && new Date() > new Date(banner.expiryDate);

              return (
                <div
                  key={banner.id}
                  className={`bg-white rounded-2xl border transition overflow-hidden shadow-sm flex flex-col justify-between ${banner.isFestiveCampaign
                    ? "border-amber-400/80 ring-2 ring-amber-400/20"
                    : "border-slate-200"
                    }`}
                >
                  {/* Banner Image Preview */}
                  <div className="relative h-44 bg-slate-900 overflow-hidden group">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#A9782B] text-white shadow-xs">
                        {banner.badge}
                      </span>
                      {banner.isFestiveCampaign && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white animate-pulse">
                          Festive Special
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${banner.isActive && !isExpired
                          ? "bg-emerald-500/90 text-white"
                          : "bg-slate-700 text-slate-300"
                          }`}
                      >
                        {isExpired ? "EXPIRED" : banner.isActive ? "ACTIVE" : "PAUSED"}
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[10px] text-amber-300 font-mono tracking-widest uppercase">
                        {banner.eyebrow}
                      </p>
                      <h3 className="font-serif font-bold text-sm line-clamp-1 text-white">
                        {banner.title}
                      </h3>
                      <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                        {banner.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body & Meta */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span className="font-mono">Category:</span>
                        <span className="font-bold uppercase text-slate-800">{banner.category}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span className="font-mono">Target URL:</span>
                        <span className="font-mono text-slate-800 text-[10px] truncate max-w-[160px]">
                          {banner.targetUrl || "/"}
                        </span>
                      </div>

                      {banner.expiryDate && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-600 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" /> Auto-Expiry:
                          </span>
                          <span className={`font-mono font-bold text-[10px] ${isExpired ? "text-rose-600" : "text-amber-700"}`}>
                            {new Date(banner.expiryDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}

                      {/* Feature Chips */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {banner.features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono"
                          >
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...banner, isActive: !banner.isActive };
                          saveHeroBanner(updated);
                          showToast(`Banner ${banner.isActive ? "paused" : "activated"}.`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${banner.isActive
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                      >
                        {banner.isActive ? "Pause" : "Activate"}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenBannerModal(banner)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                          title="Edit Banner"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: TOP ANNOUNCEMENT MARQUEE TICKER                                */}
      {/* ========================================================================= */}
      {subTab === "ticker" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#A9782B]" />
                Top Announcement Bar Controller
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Displays a sticky announcement ticker at the very top of the customer storefront with a 1-click coupon code copy button.
              </p>
            </div>

            {/* Master Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-600">
                Status: {announcement.enabled ? "ENABLED" : "DISABLED"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const updated = { ...announcement, enabled: !announcement.enabled };
                  setAnnouncement(updated);
                  saveAnnouncementConfig(updated);
                  showToast(`Top announcement bar ${updated.enabled ? "Enabled" : "Disabled"}.`);
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${announcement.enabled ? "bg-[#A9782B]" : "bg-slate-300"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${announcement.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Live Preview Bar */}
          <div className="space-y-2">
            <p className="text-xs font-black uppercase text-slate-600 tracking-wider font-mono">
              Live Customer Preview on Storefront:
            </p>
            <div
              className={`p-2.5 rounded-xl border text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner ${announcement.accentTheme === "gold"
                ? "bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 text-amber-200 border-amber-600/30"
                : announcement.accentTheme === "crimson"
                  ? "bg-gradient-to-r from-rose-950 via-slate-950 to-rose-950 text-rose-200 border-rose-600/30"
                  : announcement.accentTheme === "emerald"
                    ? "bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-emerald-200 border-emerald-600/30"
                    : "bg-slate-950 text-slate-200 border-slate-800"
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#A9782B] text-slate-950">
                  {announcement.badgeText || "OFFER"}
                </span>
                <span className="font-bold">{announcement.message}</span>
              </div>

              {announcement.couponCode && (
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[11px] font-mono">
                  <span>Code: <strong>{announcement.couponCode}</strong></span>
                  <span className="text-[10px] bg-white/20 px-1 rounded text-white cursor-pointer">
                    Copy
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveAnnouncement} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Announcement Headline Text</label>
                <input
                  type="text"
                  value={announcement.message}
                  onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                  placeholder="e.g. Diwali Dhamaka: Flat 20% Off on 500+ Luxury PVC Visiting Cards | Code: DIWALI20"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#A9782B] outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Attached Coupon Code (1-Click Copy)</label>
                <input
                  type="text"
                  value={announcement.couponCode || ""}
                  onChange={(e) => setAnnouncement({ ...announcement, couponCode: e.target.value.toUpperCase().trim() })}
                  placeholder="e.g. DIWALI20"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs uppercase font-mono font-bold focus:ring-2 focus:ring-[#A9782B] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Badge Text</label>
                <input
                  type="text"
                  value={announcement.badgeText || ""}
                  onChange={(e) => setAnnouncement({ ...announcement, badgeText: e.target.value })}
                  placeholder="e.g. FESTIVE SALE"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#A9782B] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Accent Theme</label>
                <select
                  value={announcement.accentTheme}
                  onChange={(e) => setAnnouncement({ ...announcement, accentTheme: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#A9782B] outline-none"
                >
                  <option value="gold">Royal Gold Gradient</option>
                  <option value="crimson">Festive Crimson / Red</option>
                  <option value="emerald">Emerald Forest</option>
                  <option value="dark">Executive Obsidian Slate</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Scheduled Cutoff / Auto-Expiry Date</label>
                <input
                  type="date"
                  value={announcement.expiryDate ? announcement.expiryDate.slice(0, 10) : ""}
                  onChange={(e) => setAnnouncement({ ...announcement, expiryDate: e.target.value ? `${e.target.value}T23:59:59Z` : undefined })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#A9782B] outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#A9782B] hover:bg-[#8E621E] text-white font-black text-xs transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Publish Live Ticker</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: PROMOTIONAL COUPONS & AUTO-EXPIRY                              */}
      {/* ========================================================================= */}
      {subTab === "coupons" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#A9782B]" />
                Promotional Coupon Engine & Discount Rules
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Customers enter these discount codes at checkout. Auto-recalculates subtotal, 18% GST, and grand total in real time.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenCouponModal}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-[#CBA768] font-black text-xs transition flex items-center gap-2 border border-[#A9782B]/40 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Coupon</span>
            </button>
          </div>

          {/* Coupons Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4 font-bold">Coupon Code</th>
                  <th className="py-3 px-4 font-bold">Campaign Description</th>
                  <th className="py-3 px-4 font-bold">Discount Value</th>
                  <th className="py-3 px-4 font-bold">Min Cart Value</th>
                  <th className="py-3 px-4 font-bold">Scheduled Expiry</th>
                  <th className="py-3 px-4 font-bold">Usage Count</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map((coupon) => {
                  const isExpired = coupon.expiryDate && new Date() > new Date(coupon.expiryDate);

                  return (
                    <tr key={coupon.code} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                            {coupon.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(coupon.code)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 transition cursor-pointer"
                            title="Copy Code"
                          >
                            {copiedCode === coupon.code ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-700 max-w-[240px]">
                        {coupon.description}
                      </td>

                      <td className="py-3 px-4">
                        {coupon.type === "percent" ? (
                          <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            <Percent className="w-3 h-3" /> {coupon.value}% OFF
                          </span>
                        ) : coupon.type === "flat" ? (
                          <span className="inline-flex items-center gap-0.5 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <IndianRupee className="w-3 h-3" /> {coupon.value} Flat Off
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                            <Truck className="w-3 h-3" /> Free Express Air
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600">
                        {coupon.minOrder ? `₹${coupon.minOrder.toLocaleString("en-IN")}` : "No Minimum"}
                      </td>

                      <td className="py-3 px-4">
                        {coupon.expiryDate ? (
                          <div className="space-y-0.5">
                            <span className={`font-mono text-[11px] font-bold ${isExpired ? "text-rose-600" : "text-slate-700"}`}>
                              {new Date(coupon.expiryDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                            {isExpired && (
                              <span className="block text-[9px] font-black uppercase text-rose-600">
                                Auto-Expired
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">Never (Permanent)</span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-slate-700">
                        {coupon.usageCount} orders
                      </td>

                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => toggleAdminCoupon(coupon.code)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black font-mono cursor-pointer transition ${isExpired
                            ? "bg-rose-100 text-rose-700 cursor-not-allowed"
                            : coupon.isActive
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                            }`}
                        >
                          {isExpired ? "EXPIRED" : coupon.isActive ? "ACTIVE" : "PAUSED"}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteCoupon(coupon.code)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT HERO BANNER                                             */}
      {/* ========================================================================= */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  {editingBanner ? "Edit Hero Banner" : "Create Festive / Promotional Banner"}
                </h3>
                <p className="text-xs text-slate-500">Live reflection on homepage carousel.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBannerModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Banner Title (Serif Headline)</label>
                  <input
                    type="text"
                    value={bannerForm.title || ""}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={bannerForm.subtitle || ""}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Top Pill Badge Text</label>
                  <input
                    type="text"
                    value={bannerForm.badge || ""}
                    onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                    placeholder="e.g. FESTIVE SPECIAL • 20% OFF"
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category Tag</label>
                  <select
                    value={bannerForm.category || "festive"}
                    onChange={(e) => setBannerForm({ ...bannerForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  >
                    <option value="festive">Festive / Diwali Specials</option>
                    <option value="visiting-cards">Visiting Cards</option>
                    <option value="letterheads">Letterheads</option>
                    <option value="mugs">Ceramic Mugs</option>
                    <option value="labels">Labels & Packaging</option>
                    <option value="tshirts">Corporate Apparel</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAD5B3]">
                  <label className="font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#A9782B]" />
                      Banner Image / Creative Creative File Upload
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Recommended: 1920×700 or 16:9 ratio
                    </span>
                  </label>

                  {/* Visual Dropzone / File Picker */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="flex-1 w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#A9782B]/40 hover:border-[#A9782B] rounded-2xl bg-white hover:bg-[#FAF6EE] cursor-pointer transition text-center group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="hidden"
                      />
                      {isUploadingImage ? (
                        <div className="flex items-center gap-2 text-slate-600 font-bold text-xs py-2">
                          <Loader2 className="w-5 h-5 text-[#A9782B] animate-spin" />
                          <span>Uploading image to server...</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <UploadCloud className="w-6 h-6 text-[#A9782B] mx-auto group-hover:scale-110 transition" />
                          <div className="text-xs font-bold text-slate-800">
                            Click to Browse or Drag & Drop Banner Creative
                          </div>
                          <p className="text-[10px] text-slate-500">
                            JPG, PNG, WEBP, GIF (Saved automatically to server)
                          </p>
                        </div>
                      )}
                    </label>

                    {/* Or URL input */}
                    <div className="w-full sm:w-1/2 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Or enter direct image URL / path:
                      </span>
                      <input
                        type="text"
                        value={bannerForm.image || ""}
                        onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B] bg-white text-xs"
                        placeholder="/images/custom-visiting-cards-banner.jpg"
                      />
                    </div>
                  </div>

                  {/* Instant Live Image Preview */}
                  {bannerForm.image && (
                    <div className="relative mt-2 rounded-xl overflow-hidden border border-[#EAD5B3] bg-slate-900 h-28 w-full group">
                      <img
                        src={bannerForm.image}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-4">
                        <div className="text-white max-w-sm space-y-0.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#A9782B] text-white text-[9px] font-bold uppercase">
                            {bannerForm.badge || "Live Preview"}
                          </span>
                          <div className="font-serif font-bold text-xs truncate">
                            {bannerForm.title || "Banner Headline"}
                          </div>
                          <p className="text-[10px] text-slate-300 truncate">
                            {bannerForm.subtitle || "Subtitle tagline"}
                          </p>
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-2 text-[9px] text-white/70 font-mono">
                        ✦ Instant Storefront Sync Ready
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">CTA Button Text</label>
                  <input
                    type="text"
                    value={bannerForm.ctaLabel || ""}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaLabel: e.target.value })}
                    placeholder="SHOP NOW / CLAIM OFFER"
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Collection Link</label>
                  <input
                    type="text"
                    value={bannerForm.targetUrl || ""}
                    onChange={(e) => setBannerForm({ ...bannerForm, targetUrl: e.target.value })}
                    placeholder="/#visiting-cards"
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Scheduled Cutoff / Auto-Expiry</label>
                  <input
                    type="date"
                    value={bannerForm.expiryDate ? bannerForm.expiryDate.slice(0, 10) : ""}
                    onChange={(e) =>
                      setBannerForm({
                        ...bannerForm,
                        expiryDate: e.target.value ? `${e.target.value}T23:59:59Z` : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="space-y-1 flex items-center gap-2 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={Boolean(bannerForm.isFestiveCampaign)}
                      onChange={(e) =>
                        setBannerForm({
                          ...bannerForm,
                          isFestiveCampaign: e.target.checked,
                          enableCrackersEffect: e.target.checked ? true : bannerForm.enableCrackersEffect,
                        })
                      }
                      className="w-4 h-4 accent-[#A9782B]"
                    />
                    Mark as Festive Campaign (Diwali / New Year)
                  </label>
                </div>

                {/* Diwali Firecrackers / Fireworks Animation Toggle */}
                <div className="md:col-span-2 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-950 text-xs">
                      <input
                        type="checkbox"
                        checked={Boolean(bannerForm.enableCrackersEffect ?? bannerForm.isFestiveCampaign)}
                        onChange={(e) =>
                          setBannerForm({
                            ...bannerForm,
                            enableCrackersEffect: e.target.checked,
                            isFestiveCampaign: e.target.checked ? true : bannerForm.isFestiveCampaign,
                          })
                        }
                        className="w-4 h-4 accent-[#A9782B]"
                      />
                      <span>✦ Enable Diwali Bursting Crackers & Fireworks Animation FX ✦</span>
                    </label>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-mono font-bold">
                      Auto-Bursting High-FPS Canvas
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed pl-6">
                    Displays high-definition rockets, golden sparklers (phooljhadi), and colorful celebratory firecrackers bursting across the banner background on the customer storefront.
                  </p>
                </div>

                {/* Optional Video Background URL */}
                <div className="md:col-span-2 space-y-1">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span>Optional Video URL (Firecrackers / Festive Video MP4)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Plays auto-looping without sound behind banner</span>
                  </label>
                  <input
                    type="text"
                    value={bannerForm.videoUrl || ""}
                    onChange={(e) => setBannerForm({ ...bannerForm, videoUrl: e.target.value })}
                    placeholder="https://.../crackers.mp4 or /videos/diwali-fireworks.mp4"
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B] font-mono text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#A9782B] hover:bg-[#8E621E] text-white font-black"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW COUPON                                                     */}
      {/* ========================================================================= */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl font-sans">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Create Promotional Coupon Code</h3>
                <p className="text-xs text-slate-500">Live validation during checkout.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCouponModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Coupon Code (e.g. DIWALI25, FESTIVE500)</label>
                <input
                  type="text"
                  value={couponForm.code || ""}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase().trim() })}
                  className="w-full px-3 py-2 border rounded-xl outline-none font-mono font-bold uppercase focus:ring-2 focus:ring-[#A9782B]"
                  placeholder="DIWALI25"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <input
                  type="text"
                  value={couponForm.description || ""}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  placeholder="25% Off on Orders above ₹2,500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Discount Type</label>
                  <select
                    value={couponForm.type || "percent"}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Cash Discount (₹)</option>
                    <option value="free_shipping">Free Express Shipping</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Value (% or ₹)</label>
                  <input
                    type="number"
                    value={couponForm.value || ""}
                    onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none font-mono focus:ring-2 focus:ring-[#A9782B]"
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Min Cart Total (₹)</label>
                  <input
                    type="number"
                    value={couponForm.minOrder || ""}
                    onChange={(e) => setCouponForm({ ...couponForm, minOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none font-mono focus:ring-2 focus:ring-[#A9782B]"
                    placeholder="2500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Scheduled Cutoff Date</label>
                  <input
                    type="date"
                    value={couponForm.expiryDate ? couponForm.expiryDate.slice(0, 10) : ""}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        expiryDate: e.target.value ? `${e.target.value}T23:59:59Z` : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#A9782B] hover:bg-[#8E621E] text-white font-black"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

