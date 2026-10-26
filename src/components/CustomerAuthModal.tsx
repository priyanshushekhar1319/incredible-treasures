"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Building,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  ShieldCheck,
  FolderHeart,
  Sparkles,
  ArrowRight,
  LogOut,
  Loader2,
  Navigation,
  FileCheck2,
  Download,
} from "lucide-react";
import {
  CustomerUser,
  getCustomerSession,
  setCustomerSession,
  clearCustomerSession,
} from "@/lib/customerSession";
import { getStoredOrders, PlacedOrder } from "@/lib/orderStore";
import { OfficialTaxInvoiceModal } from "@/components/OfficialTaxInvoiceModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenSavedDesigns?: () => void;
  onOpenLiveTracking?: () => void;
  onUserChange?: (user: CustomerUser | null) => void;
}

export const CustomerAuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenSavedDesigns,
  onOpenLiveTracking,
  onUserChange,
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "gstin" | "invoices">("profile");
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<PlacedOrder | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [ordersList, setOrdersList] = useState<PlacedOrder[]>([]);

  // Form State
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [gstin, setGstin] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const user = getCustomerSession();
      setCurrentUser(user);
      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setCompanyName(user.companyName || "");
        setGstin(user.gstin || "");
      }
      setOrdersList(getStoredOrders());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid business email");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          phone,
          companyName,
          gstin,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        const updated: CustomerUser = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name || name,
          phone: data.user.phone || phone,
          companyName: data.user.companyName || companyName,
          gstin: data.user.gstin || gstin,
          role: data.user.role,
        };
        setCustomerSession(updated);
        setCurrentUser(updated);
        if (onUserChange) onUserChange(updated);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile save error:", err);
      // Fallback local persistence
      const updated: CustomerUser = { email, name, phone, companyName, gstin };
      setCustomerSession(updated);
      setCurrentUser(updated);
      if (onUserChange) onUserChange(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadDemoUser = () => {
    setName("Mahi Kapoor");
    setEmail("mahi.kapoor@incredibletreasures.com");
    setPhone("+91 99450 39266");
    setCompanyName("Incredible Treasures Luxury Studio");
    setGstin("29AAKFI2392F1Z5");
  };

  const handleSignOut = () => {
    clearCustomerSession();
    setCurrentUser(null);
    setName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setGstin("");
    if (onUserChange) onUserChange(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col font-sans">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#FAF8F5] to-white border-b border-[#E5E0D8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#EAD5B3] border border-[#EAD5B3] flex items-center justify-center shadow-2xs">
              <User className="w-5 h-5 text-[#734D15]" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                Customer Account Portal
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3] px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Manage saved card designs, corporate invoicing, and GST credentials.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 bg-white border-b border-slate-100 flex items-center gap-4 text-xs font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`pb-2.5 transition border-b-2 cursor-pointer shrink-0 ${
              activeTab === "profile"
                ? "border-[#A9782B] text-[#A9782B] font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Executive Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gstin")}
            className={`pb-2.5 transition border-b-2 cursor-pointer shrink-0 ${
              activeTab === "gstin"
                ? "border-[#A9782B] text-[#A9782B] font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Corporate GSTIN & Invoicing
          </button>
          <button
            type="button"
            onClick={() => {
              setOrdersList(getStoredOrders());
              setActiveTab("invoices");
            }}
            className={`pb-2.5 transition border-b-2 cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === "invoices"
                ? "border-[#A9782B] text-[#A9782B] font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#A9782B]" />
            <span>Tax Invoices & Receipts</span>
            <span className="text-[10px] font-black bg-[#FAF6EE] text-[#734D15] px-1.5 py-0.2 rounded-full border border-[#EAD5B3]">
              {ordersList.length}
            </span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
          {activeTab === "profile" && (
            <>
              {/* Quick Demo Account Banner */}
              <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#EAD5B3] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#734D15] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#A9782B]" />
                  <span>Executive Preset: Mahi Kapoor</span>
                </div>
                <button
                  type="button"
                  onClick={handleLoadDemoUser}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#EAD5B3] text-[#734D15] font-bold text-[11px] hover:bg-[#FAF8F5] transition cursor-pointer shadow-2xs"
                >
                  Load Preset
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name & Designation
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mahi Kapoor"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mahi.kapoor@incredibletreasures.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 99450 39266"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Incredible Treasures"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "gstin" && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registered GSTIN (15 Digits)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={15}
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="29AAKFI2392F1Z5"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-bold font-mono tracking-wider text-slate-800 outline-none uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Karnataka state code 29. Auto-applies 18% GST (CGST 9% + SGST 9%) or inter-state IGST.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Official B2B tax invoice with input tax credit (ITC) eligibility will be auto-generated for all corporate print runs.
                </span>
              </div>
            </>
          )}

          {activeTab === "invoices" && (
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#EAD5B3] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#734D15] font-semibold">
                  <FileCheck2 className="w-4 h-4 text-[#A9782B]" />
                  <span>Official MCA & GST Invoices for Corporate Audits</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {ordersList.length} Invoices Available
                </span>
              </div>

              {ordersList.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400">
                  No corporate order invoices generated yet.
                </div>
              ) : (
                ordersList.map((ord) => {
                  const invNo = `INV-IT-${new Date(ord.createdAt).getFullYear()}-${(
                    ord.id.replace(/\D/g, "") || "017378"
                  ).slice(-6)}`;

                  const invDate = new Date(ord.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={ord.id}
                      className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#A9782B]/60 transition text-xs space-y-2.5 shadow-2xs group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="font-mono font-black text-slate-900 text-xs">
                              {invNo}
                            </strong>
                            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                              #{ord.id}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            Issued: {invDate} • {ord.customer.companyName || "Executive Corporate Client"}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <strong className="font-mono font-black text-slate-900 text-sm block">
                            ₹{ord.pricing.grandTotal.toLocaleString("en-IN")}
                          </strong>
                          <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            18% GST INCL.
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 truncate border-t border-slate-200/60 pt-2 flex items-center justify-between">
                        <span className="truncate max-w-[240px]">
                          {ord.items.map((i) => i.title).join(", ")}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedInvoiceOrder(ord);
                            setIsInvoiceModalOpen(true);
                          }}
                          className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
                        >
                          <FileCheck2 className="w-3 h-3 text-amber-300" />
                          <span>View & Print PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Quick link to Saved Designs Library */}
          {activeTab !== "invoices" && onOpenSavedDesigns && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSavedDesigns();
                }}
                className="w-full p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-[#E5E0D8] hover:border-[#EAD5B3] transition flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center gap-2.5">
                  <FolderHeart className="w-4 h-4 text-[#A9782B]" />
                  <span>Browse My Saved Designs Cloud Library</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A9782B] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          )}

          {/* Live Location & Air Transit Tracker */}
          {activeTab !== "invoices" && onOpenLiveTracking && (
            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLiveTracking();
                }}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#FAF6EE] to-[#FAF8F5] hover:from-[#FAF8F5] hover:to-[#FAF6EE] border border-[#EAD5B3] hover:border-[#A9782B] transition flex items-center justify-between text-xs font-bold text-[#734D15] cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-[#A9782B] animate-pulse" />
                  <span>Track Live Product Location & Air Dispatch</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A9782B] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          )}

          {/* Save Profile Button */}
          {activeTab !== "invoices" ? (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {currentUser ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400">Guest session</span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl font-black text-xs text-white bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Profile Saved!</span>
                  </>
                ) : (
                  <span>Save Profile & Invoicing</span>
                )}
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Official MCA Invoices with 18% ITC credit.
              </span>
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className="px-4 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                ← Back to Profile
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Official Tax Invoice Viewer / PDF Generator */}
      <OfficialTaxInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        orderData={selectedInvoiceOrder}
        orderId={selectedInvoiceOrder?.id}
      />
    </div>
  );
};
