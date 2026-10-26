"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Check,
  Plane,
  Clock,
  ArrowRight,
  PackageCheck,
  ExternalLink,
  ShoppingBag,
  CreditCard,
  QrCode,
  FileText,
  Truck,
  Sparkles,
} from "lucide-react";
import { lookupIndianPincode } from "@/lib/pincodeEngine";
import { calculateDeliverySla, DeliverySlaResult } from "@/lib/deliverySla";
import { createRealOrder, OrderItem, PlacedOrder } from "@/lib/orderStore";
import { getCustomerSession } from "@/lib/customerSession";
import { OrderLiveTrackingModal } from "@/components/OrderLiveTrackingModal";
import { OfficialTaxInvoiceModal } from "@/components/OfficialTaxInvoiceModal";

export interface CheckoutCartItem {
  id: string;
  productId?: string;
  title: string;
  categoryName?: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  branding?: string;
  specs?: string;
  isGstIncluded?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutCartItem[];
  onOrderSuccess?: (order: PlacedOrder) => void;
  onClearCart?: () => void;
}

const SAVED_BRANCHES = [
  {
    id: "hq",
    label: "🏢 Bangalore Head Office",
    address: "42, Commercial Street, Tasker Town",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
  },
  {
    id: "mumbai",
    label: "🏙️ Mumbai BKC Suite",
    address: "Level 8, Platina Tower, G-Block, Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
  },
  {
    id: "delhi",
    label: "🏛️ Delhi Corporate Suite",
    address: "14, Barakhamba Road, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
  },
];

export const CorporateDirectCheckoutModal: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  onClearCart,
}) => {
  // Customer & Delivery Address Form State
  const [fullName, setFullName] = useState<string>("Mahi Kapoor");
  const [companyName, setCompanyName] = useState<string>("Incredible Treasures Luxury Studio");
  const [phone, setPhone] = useState<string>("+91 99450 39266");
  const [email, setEmail] = useState<string>("mahi.kapoor@incredibletreasures.com");
  const [address, setAddress] = useState<string>("42, Commercial Street, Tasker Town");
  const [pincode, setPincode] = useState<string>("560001");
  const [city, setCity] = useState<string>("Bengaluru");
  const [state, setState] = useState<string>("Karnataka");
  const [gstin, setGstin] = useState<string>("29AAKFI2392F1Z5");
  const [activeBranchId, setActiveBranchId] = useState<string>("hq");

  // Shipping & Payment Options
  const [shippingTier, setShippingTier] = useState<"standard" | "priority_vip">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "po">("upi");

  // Order Placement Result
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);

  // Sync profile from customer session on open
  useEffect(() => {
    if (isOpen) {
      const session = getCustomerSession();
      if (session) {
        if (session.name) setFullName(session.name);
        if (session.companyName) setCompanyName(session.companyName);
        if (session.phone) setPhone(session.phone);
        if (session.email) setEmail(session.email);
        if (session.gstin) setGstin(session.gstin);
      }
      setConfirmedOrder(null);
    }
  }, [isOpen]);

  // Handle Pincode Auto-Resolution
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 6);
    setPincode(clean);
    if (clean.length === 6) {
      const resolved = lookupIndianPincode(clean);
      setCity(resolved.city);
      setState(resolved.state);
    }
  };

  const handleSelectBranch = (b: typeof SAVED_BRANCHES[0]) => {
    setActiveBranchId(b.id);
    setAddress(b.address);
    setCity(b.city);
    setState(b.state);
    setPincode(b.pincode);
  };

  if (!isOpen) return null;

  // Calculate Real Financial Totals
  const baseSubtotal = items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  const extraGstSubtotal = items
    .filter((it) => !it.isGstIncluded)
    .reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  const includedGstSubtotal = items
    .filter((it) => it.isGstIncluded)
    .reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  const gstAmount = Math.round(extraGstSubtotal * 0.18);

  const isFreeShipping = baseSubtotal >= 3000;
  const standardShippingFee = isFreeShipping ? 0 : 150;
  const shippingFee = shippingTier === "priority_vip" ? 299 : standardShippingFee;

  const grandTotal = Math.round(baseSubtotal + gstAmount + shippingFee);

  // SLA Calculation
  const slaResult: DeliverySlaResult = calculateDeliverySla(
    pincode.length === 6 ? pincode : "560001",
    shippingTier,
    new Date()
  );

  const handleConfirmOrder = () => {
    if (!fullName || !phone || !address || pincode.length !== 6) {
      alert("Please fill in complete delivery details (Name, Phone, Address, 6-digit Pincode).");
      return;
    }

    const orderItems: OrderItem[] = items.map((it) => ({
      id: it.id,
      productId: it.productId,
      title: it.title,
      categoryName: it.categoryName,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      totalPrice: it.unitPrice * it.quantity,
      image: it.image,
      branding: it.branding,
      specs: it.specs,
      isGstIncluded: it.isGstIncluded,
    }));

    const realOrder = createRealOrder({
      source: "ready_made_storefront",
      items: orderItems,
      customer: {
        fullName,
        companyName,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        gstin: gstin.trim() || undefined,
      },
      pricing: {
        subtotal: baseSubtotal,
        gstAmount,
        shippingFee,
        shippingTier,
        couponDiscount: 0,
        grandTotal,
      },
      paymentMethod,
    });

    setConfirmedOrder(realOrder);
    if (onOrderSuccess) onOrderSuccess(realOrder);
    if (onClearCart) onClearCart();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col font-sans overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF6EE] border-b border-[#E5E0D8] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {confirmedOrder ? "Order Confirmed & Sent to Press" : "Corporate Direct Online Checkout"}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#734D15] text-[10px] font-black uppercase border border-[#EAD5B3]">
                    {confirmedOrder ? "VERIFIED" : "REAL ONLINE ORDER"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {confirmedOrder
                    ? "Your order has been recorded and scheduled for press production."
                    : "Direct order for ready-made designs & corporate merchandise."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {confirmedOrder ? (
              /* ========================================================================= */
              /* VIEW 1: ORDER CONFIRMED RECEIPT & TRACKING CTA                           */
              /* ========================================================================= */
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                    Official Order Transmitted to Heidelberg Press
                  </span>
                  <h4 className="text-xl font-black text-slate-900 pt-1">
                    Thank You, {confirmedOrder.customer.fullName}!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Your corporate order <strong className="font-mono text-slate-900">#{confirmedOrder.id}</strong> has been successfully booked with 18% GST tax invoice compliance.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] text-xs text-left space-y-2.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Order Reference ID:</span>
                    <strong className="text-slate-900 font-mono font-black">{confirmedOrder.id}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Master BlueDart AWB:</span>
                    <strong className="text-slate-900 font-mono">{confirmedOrder.logistics.awbNumber}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Destination:</span>
                    <strong className="text-slate-900">
                      {confirmedOrder.customer.city}, {confirmedOrder.customer.pincode}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Guaranteed Delivery Date:</span>
                    <strong className="text-emerald-700 font-bold">
                      {confirmedOrder.logistics.guaranteedDeliveryFormatted}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Items Booked:</span>
                    <strong className="text-slate-900">
                      {confirmedOrder.items.length} product line(s)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2 font-bold">
                    <span className="text-slate-900 font-black">Total Paid:</span>
                    <span className="text-[#A9782B] font-black text-sm">
                      ₹{confirmedOrder.pricing.grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Action 1: TRACK ORDER & PRODUCTION LIFECYCLE */}
                <button
                  type="button"
                  onClick={() => setIsTrackingModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#A9782B] via-[#8E621E] to-[#734D15] hover:opacity-95 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-101"
                >
                  <PackageCheck className="w-4 h-4 text-amber-300" />
                  <span>Track Order & Live Production Lifecycle</span>
                </button>

                {/* Action 2: OFFICIAL MCA & GST TAX INVOICE */}
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>View & Print Official GST Tax Invoice (PDF)</span>
                </button>

                {/* Action 2: WhatsApp Desk */}
                <a
                  href={`https://wa.me/919945039266?text=${encodeURIComponent(
                    `Hi Incredible Treasures, I placed corporate order #${confirmedOrder.id} for ${confirmedOrder.items.length} items (Total: ₹${confirmedOrder.pricing.grandTotal.toLocaleString("en-IN")}). Please confirm production schedule.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Connect with Production Desk on WhatsApp</span>
                </a>
              </div>
            ) : (
              /* ========================================================================= */
              /* VIEW 2: REAL CHECKOUT DETAILS FORM                                        */
              /* ========================================================================= */
              <div className="space-y-4 text-xs">
                {/* Items Summary Strip */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
                  <div className="flex items-center justify-between text-slate-700 font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#A9782B]" />
                      <span>Review Selected Products ({items.length})</span>
                    </span>
                    <span className="text-[#A9782B]">₹{baseSubtotal.toLocaleString("en-IN")} Subtotal</span>
                  </div>

                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 text-[11px]"
                      >
                        <span className="font-semibold text-slate-800 truncate max-w-[320px]">
                          {it.title}
                        </span>
                        <span className="font-bold text-slate-900 shrink-0">
                          {it.quantity} units • ₹{(it.unitPrice * it.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corporate Saved Hub Address Book */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
                    <span>Corporate Delivery Destination Hub:</span>
                    <span className="text-[10px] text-[#A9782B] font-semibold">Saved Branch Presets</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SAVED_BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleSelectBranch(b)}
                        className={`p-2 rounded-xl text-left border transition text-xs cursor-pointer ${
                          activeBranchId === b.id
                            ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] shadow-xs font-bold"
                            : "bg-[#FAF8F5] border-[#E5E0D8] text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span className="block truncate font-bold text-[11px]">{b.label}</span>
                        <span className="block text-[10px] text-slate-400 truncate mt-0.5">
                          {b.city} • {b.pincode}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact & Company Inputs */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Executive Name:</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company Name:</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone (WhatsApp Delivery Updates):</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Corporate Email Address:</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Office / Factory Delivery Address:</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>

                {/* Indian Pincode Auto-Detection */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pincode:</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                      placeholder="e.g. 560001"
                      maxLength={6}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">City (Auto):</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">State (Auto):</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    />
                  </div>
                </div>

                {/* Smart Delivery Intelligence & Guaranteed SLA Badge */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FAF6EE] to-[#FAF8F5] border border-[#EAD5B3] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#734D15] flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-[#A9782B]" />
                      <span>{slaResult.pincodeInfo.courierPartner} Serviceable</span>
                    </span>
                    <span className="text-emerald-700 font-black">
                      ✓ Guaranteed Doorstep SLA
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-800">
                    <span>Expected Delivery Date:</span>
                    <strong className="text-slate-900 font-black">
                      {slaResult.guaranteedDeliveryFormatted}
                    </strong>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-0.5">
                    <Clock className="w-3 h-3 text-[#A9782B]" />
                    <span>{slaResult.cutoffCountdownText}</span>
                  </div>
                </div>

                {/* Shipping Tier Selector */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Select Air Dispatch Priority:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setShippingTier("standard")}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        shippingTier === "standard"
                          ? "bg-[#FAF6EE] border-[#A9782B] shadow-xs"
                          : "bg-white border-[#E5E0D8] hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <strong className="text-slate-900 font-bold">Standard Insured Air</strong>
                        <span className="text-xs font-black text-slate-800">
                          {isFreeShipping ? "FREE" : "₹150"}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        4 Business Days Transit
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingTier("priority_vip")}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        shippingTier === "priority_vip"
                          ? "bg-[#FAF6EE] border-[#A9782B] shadow-xs"
                          : "bg-white border-[#E5E0D8] hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <strong className="text-slate-900 font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#A9782B]" />
                          Priority VIP
                        </strong>
                        <span className="text-xs font-black text-[#A9782B]">+₹299</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        Same-Day Print + Next-Flight Out
                      </span>
                    </button>
                  </div>
                </div>

                {/* Corporate GSTIN */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Corporate GSTIN (For CGST 9% + SGST 9% Input Tax Credit):
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    maxLength={15}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="29AAKFI2392F1Z5"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#A9782B] uppercase"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Advance Payment Method (Razorpay Ready for Day 20):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        paymentMethod === "upi"
                          ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] font-bold shadow-xs"
                          : "bg-white border-[#E5E0D8] text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <QrCode className="w-4 h-4 mx-auto mb-1 text-[#A9782B]" />
                      <span className="block text-[11px] font-bold">Instant UPI QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] font-bold shadow-xs"
                          : "bg-white border-[#E5E0D8] text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#A9782B]" />
                      <span className="block text-[11px] font-bold">Corporate Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("po")}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        paymentMethod === "po"
                          ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] font-bold shadow-xs"
                          : "bg-white border-[#E5E0D8] text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <FileText className="w-4 h-4 mx-auto mb-1 text-[#A9782B]" />
                      <span className="block text-[11px] font-bold">B2B PO Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Final Cost Summary */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Products Subtotal:</span>
                    <strong className="text-slate-900">₹{baseSubtotal.toLocaleString("en-IN")}</strong>
                  </div>

                  {extraGstSubtotal > 0 && includedGstSubtotal > 0 && (
                    <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D8] space-y-1 text-[11px]">
                      <div className="flex justify-between text-slate-700">
                        <span>• Exclusive Items (Tax Extra):</span>
                        <strong className="text-slate-900 font-mono">₹{extraGstSubtotal.toLocaleString("en-IN")}</strong>
                      </div>
                      <div className="flex justify-between text-emerald-800">
                        <span>• Inclusive Items (CGST 9% + SGST 9% in Rate):</span>
                        <strong className="text-emerald-700 font-mono">₹{includedGstSubtotal.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  )}

                  {gstAmount > 0 && (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>Central GST (CGST 9%{includedGstSubtotal > 0 ? ` on ₹${extraGstSubtotal.toLocaleString("en-IN")}` : ""}):</span>
                        <strong className="text-slate-900 font-mono">₹{Math.round(gstAmount / 2).toLocaleString("en-IN")}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>State GST (SGST 9%{includedGstSubtotal > 0 ? ` on ₹${extraGstSubtotal.toLocaleString("en-IN")}` : ""}):</span>
                        <strong className="text-slate-900 font-mono">₹{Math.round(gstAmount / 2).toLocaleString("en-IN")}</strong>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>
                      {shippingTier === "priority_vip" ? "Priority VIP Express Air:" : "Insured Air Shipping:"}
                    </span>
                    <strong className={shippingFee === 0 ? "text-emerald-700 font-black" : "text-slate-900"}>
                      {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-sm border-t border-slate-200 pt-2">
                    <span>Total Payable:</span>
                    <span className="text-[#A9782B] text-base font-black">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#A9782B] via-[#8E621E] to-[#734D15] hover:opacity-95 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-xl cursor-pointer hover:scale-101"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Real Order & Pay (₹{grandTotal.toLocaleString("en-IN")})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Live Order Tracker Modal */}
      {confirmedOrder && (
        <OrderLiveTrackingModal
          isOpen={isTrackingModalOpen}
          onClose={() => setIsTrackingModalOpen(false)}
          initialOrderId={confirmedOrder.id}
          initialPincode={confirmedOrder.customer.pincode}
          customerName={confirmedOrder.customer.fullName}
          companyName={confirmedOrder.customer.companyName}
        />
      )}

      {/* Embedded Official Tax Invoice Modal */}
      {confirmedOrder && (
        <OfficialTaxInvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          orderData={confirmedOrder}
          orderId={confirmedOrder.id}
        />
      )}
    </>
  );
};
