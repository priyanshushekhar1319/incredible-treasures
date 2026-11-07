"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  Sparkles,
  Tag,
  Layers,
  Image as ImageIcon,
  Video,
  Play,
  UploadCloud,
  Loader2,
  Search,
  ExternalLink,
  Percent,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CatalogProduct } from "@/data/products";
import {
  getAdminCatalog,
  saveAdminProduct,
  deleteAdminProduct,
  syncCatalogFromServer,
} from "@/lib/adminStore";

export const AdminCatalogTab: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<CatalogProduct["category"]>("visiting-cards");
  const [formCategoryName, setFormCategoryName] = useState("Visiting Cards");
  const [formStartingPrice, setFormStartingPrice] = useState("₹9.75");
  const [formComparePrice, setFormComparePrice] = useState("₹14.00");
  const [formUnitPrice, setFormUnitPrice] = useState<number>(10.0);
  const [formMinQty, setFormMinQty] = useState("200 pcs");
  const [formSpecs, setFormSpecs] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("/images/pvc/card_pvc-regular-glossy.png");
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formBadge, setFormBadge] = useState("400 Micron PVC");
  const [formLeadTime, setFormLeadTime] = useState("2 Business Days");
  const [formFinishType, setFormFinishType] = useState("High Gloss Silk");
  const [formIsGstIncluded, setFormIsGstIncluded] = useState<boolean>(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const reloadCatalog = async () => {
    setCatalog(getAdminCatalog());
    try {
      const serverProducts = await syncCatalogFromServer();
      if (serverProducts && serverProducts.length > 0) {
        setCatalog(serverProducts);
      }
    } catch {}
  };

  useEffect(() => {
    reloadCatalog();
    const handleUpdate = () => reloadCatalog();
    window.addEventListener("it_catalog_updated", handleUpdate);
    return () => window.removeEventListener("it_catalog_updated", handleUpdate);
  }, []);

  const handleOpenCreate = () => {
    setIsCreatingNew(true);
    setEditingProduct(null);
    setFormTitle("");
    setFormCategory("visiting-cards");
    setFormCategoryName("PVC Visiting Cards");
    setFormStartingPrice("₹9.75");
    setFormComparePrice("₹14.00");
    setFormUnitPrice(10.0);
    setFormMinQty("200 pcs");
    setFormSpecs("400 Micron White PVC • High Gloss Finish • 2-Sided Printing • Waterproof");
    setFormDescription("Crafted with architectural-grade 400-micron polymer substrate, certified tear-resistant and waterproof. Precision digital offset printing with vibrant color fidelity.");
    setFormImage("/images/pvc/card_pvc-regular-glossy.png");
    setFormVideoUrl("");
    setFormBadge("New Arrival");
    setFormLeadTime("2 Business Days");
    setFormFinishType("Glossy Polymer");
    setFormIsGstIncluded(true);
  };

  const handleOpenEdit = (prod: CatalogProduct) => {
    setEditingProduct(prod);
    setIsCreatingNew(false);
    setFormTitle(prod.title);
    setFormCategory(prod.category);
    setFormCategoryName(prod.categoryName);
    setFormStartingPrice(prod.startingPrice);
    setFormComparePrice(prod.comparePrice || "");
    setFormUnitPrice(prod.unitPrice || 10.0);
    setFormMinQty(prod.minQty);
    setFormSpecs(prod.specs);
    setFormDescription(prod.description || prod.specs);
    setFormImage(prod.image);
    setFormVideoUrl(prod.videoUrl || "");
    setFormBadge(prod.badge || "");
    setFormLeadTime(prod.leadTime || "2 Business Days");
    setFormFinishType(prod.finishType || "Standard");
    setFormIsGstIncluded(Boolean(prod.isGstIncluded));
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormImage(data.url);
        showToast("Product photo uploaded successfully!");
      } else {
        showToast("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      showToast("Upload error: " + err.message);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast("Please enter a product title.");
      return;
    }

    const prodId = editingProduct ? editingProduct.id : `prod-${Date.now()}`;
    const productData: CatalogProduct = {
      id: prodId,
      category: formCategory,
      categoryName: formCategoryName,
      title: formTitle,
      startingPrice: formStartingPrice,
      comparePrice: formComparePrice.trim() || undefined,
      unitPrice: formUnitPrice,
      minQty: formMinQty,
      specs: formSpecs,
      description: formDescription,
      image: formImage,
      videoUrl: formVideoUrl.trim() || undefined,
      badge: formBadge.trim() || undefined,
      leadTime: formLeadTime,
      finishType: formFinishType,
      isGstIncluded: formIsGstIncluded,
      isActive: true,
    };

    saveAdminProduct(productData);
    setIsCreatingNew(false);
    setEditingProduct(null);
    reloadCatalog();
    showToast(`Product "${formTitle}" saved & synchronized live with storefront!`);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the catalog? This will remove it from the website.`)) {
      deleteAdminProduct(id);
      reloadCatalog();
      showToast(`Deleted "${title}" from catalog.`);
    }
  };

  // Filtered Products
  const filteredCatalog = catalog.filter((p) => {
    const matchesCategory =
      selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.specs.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      p.id.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const categoriesCount = new Set(catalog.map((p) => p.category)).size;

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-300 border border-[#A9782B] px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-[#A9782B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar & Live Stats */}
      <div className="bg-white p-6 rounded-3xl border border-[#EAD5B3] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#FAF6EE] border border-[#EAD5B3] text-[#734D15]">
                <ShoppingBag className="w-5 h-5 text-[#A9782B]" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span>Product Catalog & Storefront Manager</span>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                    ● Real-Time Sync Active
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload photos, videos, pricing, and descriptions. Any change here immediately reflects on your customer storefront.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#A9782B] via-[#8E621E] to-[#734D15] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md cursor-pointer hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Product</span>
            </button>

            <a
              href="/#all-products"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1.5 border border-slate-200"
              title="View how products appear to customers on the live storefront"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3]/60">
            <span className="text-[11px] text-slate-500 block">Total Live Products</span>
            <strong className="text-base font-serif font-bold text-slate-900">{catalog.length}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3]/60">
            <span className="text-[11px] text-slate-500 block">Active Categories</span>
            <strong className="text-base font-serif font-bold text-slate-900">{categoriesCount} Categories</strong>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3]/60">
            <span className="text-[11px] text-slate-500 block">With Video Previews</span>
            <strong className="text-base font-serif font-bold text-slate-900">
              {catalog.filter((p) => p.videoUrl).length} Products
            </strong>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3]/60">
            <span className="text-[11px] text-slate-500 block">Tax Status</span>
            <strong className="text-base font-serif font-bold text-emerald-700">18% GST Compliant</strong>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {[
              { id: "all", label: "All Items", count: catalog.length },
              { id: "visiting-cards", label: "Visiting Cards", count: catalog.filter((p) => p.category === "visiting-cards").length },
              { id: "letterheads", label: "Letterheads", count: catalog.filter((p) => p.category === "letterheads").length },
              { id: "mugs", label: "Ceramic Mugs", count: catalog.filter((p) => p.category === "mugs").length },
              { id: "labels", label: "Labels & Stickers", count: catalog.filter((p) => p.category === "labels").length },
              { id: "tshirts", label: "Corporate Apparel", count: catalog.filter((p) => p.category === "tshirts").length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  selectedCategoryFilter === tab.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-[#FAF8F5] text-slate-700 hover:bg-[#FAF6EE] border border-[#EAD5B3]"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategoryFilter === tab.id ? "bg-[#A9782B] text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product title, specs, SKU..."
              className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
            />
          </div>
        </div>
      </div>

      {/* Visual Luxury Product Grid */}
      {filteredCatalog.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EAD5B3] space-y-3">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-serif font-bold text-base text-slate-800">No Products Matching Criteria</h4>
          <p className="text-xs text-slate-400">Try changing your search query or category filter, or add a new product.</p>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-[#A9782B] hover:bg-[#8E621E] text-white font-bold text-xs cursor-pointer shadow-xs inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCatalog.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-[#EAD5B3] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#A9782B] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Media Image / Video Thumbnail */}
                <div className="relative aspect-[4/3] w-full bg-[#FAF8F5] overflow-hidden border-b border-slate-100">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}

                  {/* Top Badge */}
                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 shadow-sm">
                      {prod.badge}
                    </span>
                  )}

                  {/* Video Indicator */}
                  {prod.videoUrl && (
                    <span className="absolute bottom-3 left-3 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Video Available</span>
                    </span>
                  )}

                  {/* Quick Edit Overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(prod)}
                      className="p-2 rounded-xl bg-white/95 hover:bg-white text-slate-800 hover:text-[#A9782B] shadow-md transition cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(prod.id, prod.title)}
                      className="p-2 rounded-xl bg-white/95 hover:bg-white text-slate-400 hover:text-rose-600 shadow-md transition cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#734D15]">
                    <span className="bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#EAD5B3] truncate max-w-[150px]">
                      {prod.categoryName}
                    </span>
                    <span className="text-slate-400">MOQ: {prod.minQty}</span>
                  </div>

                  <h4 className="font-serif font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-[#A9782B] transition">
                    {prod.title}
                  </h4>

                  {/* Price Tag with Optional Compare Price */}
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {prod.startingPrice}
                    </span>
                    {prod.comparePrice && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {prod.comparePrice}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-medium">/ unit</span>
                  </div>

                  {/* GST Compliance Pill */}
                  <div>
                    {prod.isGstIncluded ? (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                        ✓ Incl. 18% GST (CGST 9% + SGST 9%)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 inline-flex items-center gap-1">
                        + 18% GST Extra at Checkout
                      </span>
                    )}
                  </div>

                  {/* Specs / Description */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {prod.description || prod.specs}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#EAD5B3]/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#A9782B]" />
                  <span>{prod.leadTime || "2 Days Dispatch"}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(prod)}
                  className="text-xs font-bold text-[#A9782B] hover:text-[#8E621E] flex items-center gap-1 cursor-pointer"
                >
                  <span>Edit Product</span>
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT STUDIO                                         */}
      {/* ========================================================================= */}
      {(isCreatingNew || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden font-sans">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] via-[#FAF6EE] to-[#FAF8F5] border-b border-[#EAD5B3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white border border-[#EAD5B3] text-[#734D15]">
                  <ShoppingBag className="w-5 h-5 text-[#A9782B]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    {isCreatingNew ? "Add New Product to Storefront" : `Edit Product: ${editingProduct?.title}`}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Saves directly to server catalog & reflects on live storefront in real time.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveForm} className="p-6 space-y-5 overflow-y-auto text-xs">
              {/* 1. Basic Details */}
              <div className="space-y-3">
                <h5 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-100 pb-1">
                  1. Title & Classification
                </h5>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Product Title / Headline *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Royal 400-Micron Matt PVC Cards with 24K Mirror Gold Foil"
                    className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Category Key</label>
                    <select
                      value={formCategory}
                      onChange={(e) => {
                        const val = e.target.value as CatalogProduct["category"];
                        setFormCategory(val);
                        if (val === "visiting-cards") setFormCategoryName("PVC Visiting Cards");
                        else if (val === "mugs") setFormCategoryName("Ceramic Mugs");
                        else if (val === "letterheads") setFormCategoryName("Letterheads & Stationery");
                        else if (val === "labels") setFormCategoryName("Stickers & Packaging Labels");
                        else setFormCategoryName("Corporate T-Shirts & Apparel");
                      }}
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    >
                      <option value="visiting-cards">visiting-cards</option>
                      <option value="letterheads">letterheads</option>
                      <option value="mugs">mugs</option>
                      <option value="labels">labels</option>
                      <option value="tshirts">tshirts</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Display Category</label>
                    <input
                      type="text"
                      value={formCategoryName}
                      onChange={(e) => setFormCategoryName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Badge / Pill Text</label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      placeholder="e.g. 400 Micron PVC"
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Media Upload: Photos & Videos */}
              <div className="space-y-3 pt-2">
                <h5 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-100 pb-1 flex items-center justify-between">
                  <span>2. Product Photos & Video</span>
                  <span className="text-[11px] font-sans font-normal text-slate-500">
                    Upload image creative or embed product showcase video
                  </span>
                </h5>

                {/* Photo Upload Zone */}
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAD5B3] space-y-3">
                  <label className="font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#A9782B]" />
                      Product Photo (Drag & Drop or Browse)
                    </span>
                    <span className="text-[10px] text-slate-500">JPG, PNG, WEBP (Max 10MB)</span>
                  </label>

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
                      {isUploadingPhoto ? (
                        <div className="flex items-center gap-2 text-slate-600 font-bold py-2">
                          <Loader2 className="w-5 h-5 text-[#A9782B] animate-spin" />
                          <span>Uploading image to server...</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <UploadCloud className="w-6 h-6 text-[#A9782B] mx-auto group-hover:scale-110 transition" />
                          <div className="text-xs font-bold text-slate-800">
                            Click to Browse or Drag Photo
                          </div>
                          <p className="text-[10px] text-slate-500">Auto-saved to server storage</p>
                        </div>
                      )}
                    </label>

                    {/* Or URL input */}
                    <div className="w-full sm:w-1/2 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Or enter direct image path / URL:
                      </span>
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        className="w-full px-3 py-2 border border-[#EAD5B3] rounded-xl outline-none focus:ring-2 focus:ring-[#A9782B] bg-white text-xs font-mono"
                        placeholder="/images/pvc/card_pvc-regular-glossy.png"
                      />
                    </div>
                  </div>

                  {/* Photo Preview */}
                  {formImage && (
                    <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-[#EAD5B3]">
                      <img
                        src={formImage}
                        alt="Preview"
                        className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-slate-800 block truncate">
                          Photo Loaded & Ready
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block truncate">
                          {formImage}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video URL & Video Player */}
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAD5B3] space-y-2">
                  <label className="font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-red-600" />
                      Product Showcase Video URL (Optional)
                    </span>
                    <span className="text-[10px] text-slate-500">MP4 URL, YouTube, or Vimeo</span>
                  </label>

                  <input
                    type="text"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or /videos/pvc-card-demo.mp4"
                    className="w-full bg-white border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />

                  {formVideoUrl && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                        <Play className="w-3 h-3 text-red-600 fill-current" />
                        Video Preview Enabled
                      </span>
                      <p className="text-[11px] text-slate-500">
                        A "Watch Product Video" trigger button will be rendered on the customer product card.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Pricing & Minimum Quantities */}
              <div className="space-y-3 pt-2">
                <h5 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-100 pb-1">
                  3. Pricing & Batch MOQ
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Starting Price Tag *</label>
                    <input
                      type="text"
                      required
                      value={formStartingPrice}
                      onChange={(e) => setFormStartingPrice(e.target.value)}
                      placeholder="e.g. ₹9.75"
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Original Price (Strike)</label>
                    <input
                      type="text"
                      value={formComparePrice}
                      onChange={(e) => setFormComparePrice(e.target.value)}
                      placeholder="e.g. ₹14.00"
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Unit Calculation Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formUnitPrice}
                      onChange={(e) => setFormUnitPrice(parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Min Batch Qty (MOQ)</label>
                    <input
                      type="text"
                      value={formMinQty}
                      onChange={(e) => setFormMinQty(e.target.value)}
                      placeholder="e.g. 200 pcs"
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>
                </div>

                {/* GST Classification */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAD5B3] space-y-2">
                  <span className="font-bold text-slate-800 block">GST Tax Compliance Rule:</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gstIncluded"
                        checked={formIsGstIncluded === true}
                        onChange={() => setFormIsGstIncluded(true)}
                        className="accent-[#A9782B] w-4 h-4"
                      />
                      <span className="text-slate-800 font-semibold">
                        <strong>Tax Inclusive</strong> (18% CGST 9% + SGST 9% included in rate)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gstIncluded"
                        checked={formIsGstIncluded === false}
                        onChange={() => setFormIsGstIncluded(false)}
                        className="accent-[#A9782B] w-4 h-4"
                      />
                      <span className="text-slate-800 font-semibold">
                        <strong>Tax Exclusive</strong> (+18% calculated extra at checkout)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 4. Description & Specifications */}
              <div className="space-y-3 pt-2">
                <h5 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-100 pb-1">
                  4. Description & Technical Specs
                </h5>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Product Story / Detailed Description</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe what makes this luxury item stand out to customers..."
                    className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Short Technical Specifications (Bullets / Bullets)</label>
                  <textarea
                    rows={2}
                    value={formSpecs}
                    onChange={(e) => setFormSpecs(e.target.value)}
                    placeholder="e.g. 400 Micron White PVC • High Gloss Finish • 2-Sided Printing • 2 Days Dispatch"
                    className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Dispatch SLA / Lead Time</label>
                    <input
                      type="text"
                      value={formLeadTime}
                      onChange={(e) => setFormLeadTime(e.target.value)}
                      placeholder="e.g. 2 Business Days"
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Finish Type / Substrate</label>
                    <input
                      type="text"
                      value={formFinishType}
                      onChange={(e) => setFormFinishType(e.target.value)}
                      placeholder="e.g. Silk Matt / 24K Gold Stamping"
                      className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A9782B]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#A9782B] via-[#8E621E] to-[#734D15] hover:opacity-95 text-white font-bold transition cursor-pointer shadow-md hover:scale-102 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Save & Sync to Live Website</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
