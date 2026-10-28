"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Sparkles,
  Tag,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { CatalogProduct } from "@/data/products";
import { getAdminCatalog, saveAdminProduct, deleteAdminProduct } from "@/lib/adminStore";

export const AdminCatalogTab: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<CatalogProduct["category"]>("visiting-cards");
  const [formCategoryName, setFormCategoryName] = useState("Visiting Cards");
  const [formStartingPrice, setFormStartingPrice] = useState("₹9.75");
  const [formUnitPrice, setFormUnitPrice] = useState<number>(10.0);
  const [formMinQty, setFormMinQty] = useState("100 pcs");
  const [formSpecs, setFormSpecs] = useState("");
  const [formImage, setFormImage] = useState("/images/pvc/card_pvc-regular-glossy.png");
  const [formBadge, setFormBadge] = useState("400 Micron");
  const [formIsGstIncluded, setFormIsGstIncluded] = useState<boolean>(true);

  const reloadCatalog = () => {
    setCatalog(getAdminCatalog());
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
    setFormCategoryName("Visiting Cards");
    setFormStartingPrice("₹9.75");
    setFormUnitPrice(10.0);
    setFormMinQty("100 pcs");
    setFormSpecs("400 Micron White PVC • High Gloss Finish • 2-Sided Printing");
    setFormImage("/images/pvc/card_pvc-regular-glossy.png");
    setFormBadge("New Arrival");
    setFormIsGstIncluded(true);
  };

  const handleOpenEdit = (prod: CatalogProduct) => {
    setEditingProduct(prod);
    setIsCreatingNew(false);
    setFormTitle(prod.title);
    setFormCategory(prod.category);
    setFormCategoryName(prod.categoryName);
    setFormStartingPrice(prod.startingPrice);
    setFormUnitPrice(prod.unitPrice || 10.0);
    setFormMinQty(prod.minQty);
    setFormSpecs(prod.specs);
    setFormImage(prod.image);
    setFormBadge(prod.badge || "");
    setFormIsGstIncluded(Boolean(prod.isGstIncluded));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const prodId = editingProduct ? editingProduct.id : `prod-${Date.now()}`;
    const productData: CatalogProduct = {
      id: prodId,
      category: formCategory,
      categoryName: formCategoryName,
      title: formTitle,
      startingPrice: formStartingPrice,
      unitPrice: formUnitPrice,
      minQty: formMinQty,
      specs: formSpecs,
      image: formImage,
      badge: formBadge.trim() || undefined,
      isGstIncluded: formIsGstIncluded,
    };

    saveAdminProduct(productData);
    setIsCreatingNew(false);
    setEditingProduct(null);
    reloadCatalog();
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the catalog?`)) {
      deleteAdminProduct(id);
      reloadCatalog();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span>Product Catalog Master</span>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              {catalog.length} Products Live
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Control items, specifications, pricing tags, and GST inclusive rules across the customer storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:opacity-95 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {catalog.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs hover:border-[#A9782B]/60 transition flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block truncate">
                    {prod.categoryName}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs truncate" title={prod.title}>
                    {prod.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-black text-slate-900 font-mono">
                      {prod.startingPrice}
                    </span>
                    <span className="text-[10px] text-slate-400">({prod.minQty})</span>
                  </div>
                </div>
              </div>

              {/* Badges & GST Classification */}
              <div className="flex flex-wrap items-center gap-1.5">
                {prod.isGstIncluded ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-black">
                    ✓ Incl. CGST 9% + SGST 9%
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[9px] font-black">
                    + 18% GST Extra
                  </span>
                )}
                {prod.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[9px] font-bold">
                    {prod.badge}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {prod.specs}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-slate-400 truncate">ID: {prod.id}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(prod)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                  title="Edit Product"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(prod.id, prod.title)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Product Modal */}
      {(isCreatingNew || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
          <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#A9782B]" />
                <h4 className="text-sm font-black text-slate-900">
                  {isCreatingNew ? "Add New Product to Store" : `Edit Product: ${editingProduct?.title}`}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title:</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Royal 400-Micron Matt PVC Cards"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category Slug:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      const val = e.target.value as CatalogProduct["category"];
                      setFormCategory(val);
                      if (val === "visiting-cards") setFormCategoryName("Visiting Cards");
                      else if (val === "mugs") setFormCategoryName("Ceramic Mugs");
                      else if (val === "letterheads") setFormCategoryName("Letterheads & Stationery");
                      else if (val === "labels") setFormCategoryName("Stickers & Labels");
                      else setFormCategoryName("Corporate Merchandise");
                    }}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  >
                    <option value="visiting-cards">visiting-cards</option>
                    <option value="mugs">mugs</option>
                    <option value="letterheads">letterheads</option>
                    <option value="labels">labels</option>
                    <option value="tshirts">tshirts</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Category:</label>
                  <input
                    type="text"
                    value={formCategoryName}
                    onChange={(e) => setFormCategoryName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Starting Tag:</label>
                  <input
                    type="text"
                    value={formStartingPrice}
                    onChange={(e) => setFormStartingPrice(e.target.value)}
                    placeholder="e.g. ₹9.75"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Base Unit Price (₹):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formUnitPrice}
                    onChange={(e) => setFormUnitPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min Batch Qty:</label>
                  <input
                    type="text"
                    value={formMinQty}
                    onChange={(e) => setFormMinQty(e.target.value)}
                    placeholder="e.g. 100 pcs"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              {/* GST Inclusive vs Exclusive Switcher */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
                <span className="font-bold text-slate-800 block">GST Tax Compliance Classification:</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gstIncluded"
                      checked={formIsGstIncluded === true}
                      onChange={() => setFormIsGstIncluded(true)}
                      className="accent-[#A9782B]"
                    />
                    <span className="text-slate-800 font-semibold">
                      <strong>Tax Inclusive</strong> (CGST 9% + SGST 9% embedded in rate)
                    </span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gstIncluded"
                      checked={formIsGstIncluded === false}
                      onChange={() => setFormIsGstIncluded(false)}
                      className="accent-[#A9782B]"
                    />
                    <span className="text-slate-800 font-semibold">
                      <strong>Tax Exclusive</strong> (+18% CGST 9% + SGST 9% Extra at Checkout)
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Specifications & Finishes:</label>
                <textarea
                  rows={2}
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  placeholder="e.g. 400 Micron White PVC • High Gloss Finish • 2-Sided Printing"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Image URL / Path:</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-mono text-[11px] focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge (Optional):</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. 400 Micron PVC"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] text-white font-bold hover:opacity-95 transition cursor-pointer shadow-sm"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
