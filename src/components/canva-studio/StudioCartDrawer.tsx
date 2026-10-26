"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  X,
  Trash2,
  CheckCircle2,
  CreditCard,
  Building,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Printer,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Check,
  Tag,
  Plus,
  Truck,
  Package,
  Layers,
  Plane,
  Clock,
  Building2,
  Navigation,
  Compass,
  Radio,
} from "lucide-react";
import {
  CartCardItem,
  LuxuryUpsell,
  LUXURY_UPSELLS,
  VALID_COUPONS,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
  saveStoredCart,
} from "@/lib/cartStore";
import { getCustomerSession } from "@/lib/customerSession";
import { calculateDeliverySla, DeliverySlaResult } from "@/lib/deliverySla";
import { lookupIndianPincode } from "@/lib/pincodeEngine";
import { OrderLiveTrackingModal } from "@/components/OrderLiveTrackingModal";

export type StudioCartItem = CartCardItem;

export interface OrderCustomerDetails {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  gstin?: string;
  paymentMethod: "upi" | "card" | "po";
  shippingTier: "standard" | "priority_vip";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: StudioCartItem[];
  onRemoveItem: (id: string) => void;
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

export const StudioCartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);

  // Luxury Upsells Selected
  const [selectedUpsellIds, setSelectedUpsellIds] = useState<string[]>([]);

  // Coupon Engine State
  const [couponInput, setCouponInput] = useState<string>("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Shipping Tier Selection
  const [shippingTier, setShippingTier] = useState<"standard" | "priority_vip">("standard");

  // Customer Delivery & Invoicing Details
  const [fullName, setFullName] = useState<string>("Mahi Kapoor");
  const [companyName, setCompanyName] = useState<string>("Incredible Treasures Luxury Studio");
  const [phone, setPhone] = useState<string>("+91 99450 39266");
  const [email, setEmail] = useState<string>("mahi.kapoor@incredibletreasures.com");
  const [address, setAddress] = useState<string>("42, Commercial Street, Tasker Town");
  const [pincode, setPincode] = useState<string>("560001");
  const [city, setCity] = useState<string>("Bengaluru");
  const [state, setState] = useState<string>("Karnataka");
  const [gstin, setGstin] = useState<string>("29AAKFI2392F1Z5");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "po">("upi");
  const [activeBranchId, setActiveBranchId] = useState<string>("hq");

  // Load customer profile when opened
  useEffect(() => {
    if (isOpen) {
      const sessionUser = getCustomerSession();
      if (sessionUser) {
        if (sessionUser.name) setFullName(sessionUser.name);
        if (sessionUser.companyName) setCompanyName(sessionUser.companyName);
        if (sessionUser.email) setEmail(sessionUser.email);
        if (sessionUser.phone) setPhone(sessionUser.phone);
        if (sessionUser.gstin) setGstin(sessionUser.gstin);
      }
    }
  }, [isOpen]);

  // Sync items to localStorage whenever cart items change
  useEffect(() => {
    if (items.length > 0) {
      saveStoredCart(items);
    }
  }, [items]);

  if (!isOpen) return null;

  // 1. Calculations
  const printSubtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const selectedUpsells = LUXURY_UPSELLS.filter((u) => selectedUpsellIds.includes(u.id));
  const upsellsTotal = selectedUpsells.reduce((sum, u) => sum + u.price, 0);

  const grossSubtotal = printSubtotal + upsellsTotal;

  // Coupon discount calculation
  let couponDiscount = 0;
  let activeCoupon = appliedCouponCode ? VALID_COUPONS[appliedCouponCode] : null;

  if (activeCoupon) {
    if (activeCoupon.type === "flat") {
      couponDiscount = Math.min(grossSubtotal, activeCoupon.value);
    } else if (activeCoupon.type === "percent") {
      couponDiscount = Math.round((grossSubtotal * activeCoupon.value) / 100);
    } else if (activeCoupon.type === "free_shipping") {
      couponDiscount = 0;
    }
  }

  const taxableTotal = Math.max(0, grossSubtotal - couponDiscount);
  const gstAmount = Math.round(taxableTotal * 0.18 * 100) / 100;

  // Shipping calculation
  const isEligibleForFreeStandard =
    grossSubtotal >= FREE_SHIPPING_THRESHOLD || appliedCouponCode === "FREESHIP";

  let shippingFee = 0;
  if (items.length > 0) {
    if (shippingTier === "priority_vip") {
      shippingFee = 299; // VIP Next-Flight-Out dispatch
    } else {
      shippingFee = isEligibleForFreeStandard ? 0 : STANDARD_SHIPPING_FEE;
    }
  }

  const grandTotal = Math.round((taxableTotal + gstAmount + shippingFee) * 100) / 100;

  // Free shipping progress math
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - grossSubtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((grossSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  // Dynamic SLA & Logistics Intelligence
  const slaResult: DeliverySlaResult = calculateDeliverySla(pincode, shippingTier);

  // Toggle Upsell Item
  const handleToggleUpsell = (upsellId: string) => {
    setSelectedUpsellIds((prev) =>
      prev.includes(upsellId) ? prev.filter((id) => id !== upsellId) : [...prev, upsellId]
    );
  };

  // Apply Coupon
  const handleApplyCoupon = (codeToApply?: string) => {
    const rawCode = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError(null);

    if (!rawCode) {
      setCouponError("Please enter a corporate coupon code.");
      return;
    }

    const coupon = VALID_COUPONS[rawCode];
    if (!coupon) {
      setCouponError(`Invalid code "${rawCode}". Try FIRST500 or MAHI20.`);
      return;
    }

    if (coupon.minOrder && grossSubtotal < coupon.minOrder) {
      setCouponError(
        `Code ${rawCode} requires a minimum order of ₹${coupon.minOrder.toLocaleString("en-IN")}.`
      );
      return;
    }

    setAppliedCouponCode(rawCode);
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCouponCode(null);
    setCouponError(null);
  };

  // Indian Pincode Auto-Fill
  const handlePincodeChange = (val: string) => {
    setPincode(val);
    const clean = val.replace(/\D/g, "").slice(0, 6);
    if (clean.length >= 3) {
      const pinData = lookupIndianPincode(clean);
      setCity(pinData.city);
      setState(pinData.state);
    }
  };

  // Branch Switcher
  const handleSelectBranch = (branch: typeof SAVED_BRANCHES[0]) => {
    setActiveBranchId(branch.id);
    setAddress(branch.address);
    setCity(branch.city);
    setState(branch.state);
    setPincode(branch.pincode);
  };

  const handlePlaceOrder = () => {
    const newOrderId = `IT-PRINT-${Date.now().toString().slice(-6)}`;
    setOrderSuccessId(newOrderId);
    if (onClearCart) onClearCart();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-Over Drawer Panel */}
        <div className="fixed inset-y-0 right-0 w-[95%] sm:w-full max-w-lg bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#E5E0D8]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5E0D8] bg-gradient-to-r from-[#FAF8F5] to-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base tracking-tight flex items-center gap-2">
                  Corporate Print Cart
                  <span className="text-[10px] font-bold text-[#734D15] bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-[#EAD5B3]">
                    {items.length} {items.length === 1 ? "Job" : "Jobs"}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  600+ DPI Pre-Flight verified • Ready for press production
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Express Shipping Progress Bar */}
          {items.length > 0 && !orderSuccessId && (
            <div className="px-5 py-3 bg-[#FAF8F5] border-b border-[#E5E0D8] shrink-0">
              <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Truck className="w-4 h-4 text-[#A9782B]" />
                  {isEligibleForFreeStandard ? (
                    <span className="text-emerald-700 font-black flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#A9782B]" />
                      FREE Insured Air Dispatch Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add{" "}
                      <strong className="text-[#A9782B]">
                        ₹{remainingForFreeShipping.toLocaleString("en-IN")}
                      </strong>{" "}
                      more for Free Insured Air Dispatch
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-slate-500">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#CBA768] via-[#A9782B] to-[#8E621E] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 1: ORDER SUCCESS SCREEN                              */}
          {/* ========================================================= */}
          {orderSuccessId ? (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Order Confirmed & Transmitted to Press
                </span>
                <h3 className="text-lg font-black text-slate-900 pt-1">
                  Thank you, {fullName}!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Your print job <strong className="text-slate-900 font-mono">#{orderSuccessId}</strong> has been transmitted to our Bangalore offset facility with certified 600+ DPI plates.
                </p>
              </div>

              {/* Order Specs Ticket */}
              <div className="w-full p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] text-xs text-left space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Company:</span>
                  <strong className="text-slate-900">{companyName}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Destination:</span>
                  <strong className="text-slate-900">{city}, {pincode} ({state})</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Courier & AWB:</span>
                  <strong className="text-slate-900 font-mono">
                    {slaResult.pincodeInfo.courierPartner} (AWB #BD-{(orderSuccessId.replace(/\D/g, "") || "994503").slice(-6)}{pincode.slice(0, 3)})
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Guaranteed Delivery:</span>
                  <strong className="text-emerald-700 font-bold">
                    {slaResult.guaranteedDeliveryFormatted}
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Registered GSTIN:</span>
                  <strong className="text-slate-900 font-mono">{gstin || "B2C Consumer"}</strong>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2 font-bold">
                  <span className="text-slate-900 font-black">Total Paid:</span>
                  <span className="text-[#A9782B] font-black text-sm">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* ACTION 1: LIVE PRODUCT LOCATION TRACKER (User Requested Add-on) */}
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A9782B] via-[#8E621E] to-[#734D15] hover:opacity-95 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-101"
              >
                <Navigation className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Track Live Product Location & Air Dispatch</span>
              </button>

              {/* ACTION 2: WhatsApp Dispatch Ticket */}
              <a
                href={`https://wa.me/919945039266?text=${encodeURIComponent(
                  `Hi Incredible Treasures, I placed corporate order #${orderSuccessId} for ${items.length} print item(s) totalling ₹${grandTotal.toLocaleString("en-IN")}. Please confirm BlueDart Air dispatch status.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Track via WhatsApp Helpdesk</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setOrderSuccessId(null);
                  setIsCheckoutOpen(false);
                  onClose();
                }}
                className="text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer pt-1"
              >
                Close & Return to Studio
              </button>
            </div>
          ) : isCheckoutOpen ? (
            /* ========================================================= */
            /* VIEW 2: CHECKOUT & DELIVERY DETAILS FORM                  */
            /* ========================================================= */
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="font-black text-slate-900 text-sm block">
                    Corporate Delivery & Invoicing
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Live logistics & BlueDart Air serviceability engine
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-slate-500 hover:text-[#A9782B] font-bold text-xs cursor-pointer"
                >
                  ← Back to Cart
                </button>
              </div>

              {/* Corporate Branch Address Book Selector */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
                  <span>Select Corporate Delivery Hub:</span>
                  <span className="text-[10px] text-[#A9782B] font-semibold">Saved Branch Offices</span>
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

              {/* Form Fields */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company / Brand Name:</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone (WhatsApp):</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address:</label>
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

                {/* Smart Pincode SLA Intelligence Badge */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FAF6EE] to-[#FAF8F5] border border-[#EAD5B3] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#734D15] flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-[#A9782B]" />
                      <span>{slaResult.pincodeInfo.courierPartner} Serviceable</span>
                    </span>
                    <span className="text-emerald-700 font-black">
                      ✓ Guaranteed Delivery
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-800">
                    <span>Expected Doorstep Date:</span>
                    <strong className="text-slate-900 font-black">
                      {slaResult.guaranteedDeliveryFormatted}
                    </strong>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-0.5">
                    <Clock className="w-3 h-3 text-[#A9782B]" />
                    <span>{slaResult.cutoffCountdownText}</span>
                  </div>
                </div>

                {/* Shipping Tier Selection */}
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
                          ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] shadow-xs"
                          : "bg-white border-[#E5E0D8] text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">Standard Insured Air</span>
                        <span className="font-black text-xs">
                          {isEligibleForFreeStandard ? "FREE" : "₹150"}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {slaResult.pincodeInfo.standardTransitDays + 2} Business Days Transit
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingTier("priority_vip")}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        shippingTier === "priority_vip"
                          ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] shadow-xs"
                          : "bg-white border-[#E5E0D8] text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-amber-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#A9782B]" />
                          Priority VIP
                        </span>
                        <span className="font-black text-xs text-[#A9782B]">+₹299</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Same-Day Print + Next-Flight Out
                      </span>
                    </button>
                  </div>
                </div>

                {/* GSTIN Input */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Corporate GSTIN (For 18% Input Tax Credit):
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-mono font-semibold focus:outline-none focus:border-[#A9782B]"
                    placeholder="29AAKFI2392F1Z5"
                  />
                </div>

                {/* Payment Method Switcher */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Method:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "upi", label: "⚡ Instant UPI" },
                      { id: "card", label: "💳 Corporate Card" },
                      { id: "po", label: "🏢 B2B PO Invoice" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-2.5 rounded-xl text-center border font-bold text-[11px] cursor-pointer transition ${
                          paymentMethod === m.id
                            ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15] shadow-xs"
                            : "bg-[#FAF8F5] border-[#E5E0D8] text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Summary Ticket in Checkout */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Card Print Runs ({items.length}):</span>
                  <span>₹{printSubtotal.toLocaleString("en-IN")}</span>
                </div>
                {upsellsTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Luxury Accessories ({selectedUpsells.length}):</span>
                    <span>₹{upsellsTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount ({appliedCouponCode}):</span>
                    <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>18% GST (Tax Invoice & ITC):</span>
                  <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>
                    {shippingTier === "priority_vip" ? "Priority VIP Express Air:" : "Insured Air Shipping:"}
                  </span>
                  <span className={shippingFee === 0 ? "text-emerald-700 font-black" : "text-slate-900 font-bold"}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-black border-t border-slate-200 pt-1.5 text-sm">
                  <span>Total Payable:</span>
                  <span className="text-[#A9782B] text-base">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-101"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Order & Send to Print (₹{grandTotal.toLocaleString("en-IN")})</span>
              </button>
            </div>
          ) : (
            /* ========================================================= */
            /* VIEW 3: CART ITEMS LIST + LUXURY UPSELLS + COUPONS        */
            /* ========================================================= */
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">Your print cart is empty</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Design your card and click "Print Order" to customize your run.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Cart Item Cards */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                        Customized Print Jobs
                      </span>

                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] space-y-2.5 text-xs hover:border-[#A9782B]/60 transition group shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="w-14 h-14 rounded-xl bg-white border border-[#E5E0D8] flex flex-col items-center justify-center font-bold text-[#A9782B] shrink-0 shadow-2xs overflow-hidden p-1">
                                {item.frontPreviewBg ? (
                                  <img
                                    src={item.frontPreviewBg}
                                    alt="Front Face"
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                ) : (
                                  <Printer className="w-6 h-6 text-[#A9782B]" />
                                )}
                              </div>
                              <div>
                                <strong className="text-slate-900 font-bold block text-xs">
                                  {item.title}
                                </strong>
                                <span className="text-[10px] text-slate-500 block mt-0.5">
                                  {item.specs}
                                </span>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <span className="text-[9px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                                    600+ DPI Approved
                                  </span>
                                  {item.gildedEdge && (
                                    <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                      24K Gilded
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                              title="Remove job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-bold">
                            <span className="text-slate-600">
                              Quantity: <strong className="text-slate-900">{item.quantity} cards</strong>
                            </span>
                            <span className="text-[#A9782B] font-black text-sm">
                              ₹{item.totalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* High-Converting Luxury Upsells Section */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#A9782B]" />
                          Pair with Luxury Accessories
                        </span>
                        <span className="text-[10px] font-bold text-[#734D15] bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-[#EAD5B3]">
                          SPECIAL PRESS RATES
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {LUXURY_UPSELLS.map((upsell) => {
                          const isAdded = selectedUpsellIds.includes(upsell.id);
                          return (
                            <div
                              key={upsell.id}
                              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                isAdded
                                  ? "bg-[#FAF6EE] border-[#A9782B] shadow-xs"
                                  : "bg-white border-[#E5E0D8] hover:border-[#A9782B]/50"
                              }`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                                    isAdded
                                      ? "bg-[#A9782B] text-white border-[#A9782B]"
                                      : "bg-[#FAF8F5] text-slate-600 border-[#E5E0D8]"
                                  }`}
                                >
                                  {upsell.category === "case" && <Package className="w-4 h-4" />}
                                  {upsell.category === "envelope" && <Mail className="w-4 h-4" />}
                                  {upsell.category === "swatch" && <Layers className="w-4 h-4" />}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <h5 className="font-bold text-slate-900 text-xs truncate">
                                      {upsell.name}
                                    </h5>
                                    {upsell.badge && (
                                      <span className="text-[9px] font-extrabold text-[#734D15] bg-amber-100/60 px-1.5 py-0.2 rounded">
                                        {upsell.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                    {upsell.subtitle}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="font-black text-[#A9782B] text-xs">
                                      +₹{upsell.price}
                                    </span>
                                    <span className="line-through text-slate-400 text-[10px]">
                                      ₹{upsell.originalPrice}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleToggleUpsell(upsell.id)}
                                className={`shrink-0 px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1 ${
                                  isAdded
                                    ? "bg-slate-900 text-white"
                                    : "bg-[#FAF8F5] hover:bg-[#FAF6EE] text-[#734D15] border border-[#EAD5B3]"
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Corporate Promo Code Engine */}
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                        Corporate Coupon Code
                      </span>

                      {appliedCouponCode ? (
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-emerald-600" />
                            <div>
                              <span className="font-mono font-black text-emerald-900 block">
                                {appliedCouponCode} APPLIED
                              </span>
                              <span className="text-[10px] text-emerald-700 font-medium">
                                {activeCoupon?.description}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              placeholder="e.g. FIRST500 or MAHI20"
                              className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5E0D8] focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 text-xs font-mono font-bold uppercase text-slate-800 outline-none bg-[#FAF8F5]"
                            />
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon()}
                              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>

                          {/* Quick 1-Click Coupon Test Chips */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-slate-400 font-medium">Try:</span>
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon("FIRST500")}
                              className="px-2 py-0.5 rounded-lg bg-[#FAF6EE] text-[#734D15] text-[10px] font-bold border border-[#EAD5B3] hover:bg-[#EAD5B3]/40 transition cursor-pointer"
                            >
                              FIRST500 (₹500 Off)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon("MAHI20")}
                              className="px-2 py-0.5 rounded-lg bg-[#FAF6EE] text-[#734D15] text-[10px] font-bold border border-[#EAD5B3] hover:bg-[#EAD5B3]/40 transition cursor-pointer"
                            >
                              MAHI20 (20% Off)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon("FREESHIP")}
                              className="px-2 py-0.5 rounded-lg bg-[#FAF6EE] text-[#734D15] text-[10px] font-bold border border-[#EAD5B3] hover:bg-[#EAD5B3]/40 transition cursor-pointer"
                            >
                              FREESHIP
                            </button>
                          </div>

                          {couponError && (
                            <p className="text-[11px] font-bold text-rose-600">{couponError}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Cart Footer Summary & Proceed CTA */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-[#E5E0D8] bg-[#FAF8F5] space-y-3 shrink-0">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Card Print Runs:</span>
                      <strong className="text-slate-900">₹{printSubtotal.toLocaleString("en-IN")}</strong>
                    </div>

                    {upsellsTotal > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Luxury Accessories ({selectedUpsells.length}):</span>
                        <strong className="text-slate-900">+₹{upsellsTotal.toLocaleString("en-IN")}</strong>
                      </div>
                    )}

                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Coupon Savings ({appliedCouponCode}):</span>
                        <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>18% GST (Input Tax Credit Eligible):</span>
                      <strong className="text-slate-900">₹{gstAmount.toLocaleString("en-IN")}</strong>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>
                        {shippingTier === "priority_vip" ? "Priority VIP Express Air:" : "Insured Air Dispatch:"}
                      </span>
                      <strong className={shippingFee === 0 ? "text-emerald-700 font-black" : "text-slate-900"}>
                        {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                      </strong>
                    </div>

                    <div className="flex justify-between text-slate-900 font-black text-sm border-t border-slate-200 pt-2">
                      <span>Grand Total:</span>
                      <span className="text-[#A9782B] text-base">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-101"
                  >
                    <span>Proceed to Corporate Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Embedded Live Location Tracker Modal */}
      <OrderLiveTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        initialOrderId={orderSuccessId || "IT-PRINT-017378"}
        initialPincode={pincode}
        customerName={fullName}
        companyName={companyName}
      />
    </>
  );
};
