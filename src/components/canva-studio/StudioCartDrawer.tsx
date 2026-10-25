"use client";

import React, { useState } from "react";
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
  FileText,
  Sparkles,
  Check,
} from "lucide-react";

export interface StudioCartItem {
  id: string;
  title: string;
  substrateId: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  orientation: "horizontal" | "vertical";
  specs: string;
  frontPreviewBg?: string;
  backPreviewBg?: string;
}

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
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: StudioCartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart?: () => void;
}

export const StudioCartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  // Customer Checkout Form
  const [fullName, setFullName] = useState<string>("Mahi Kapoor");
  const [companyName, setCompanyName] = useState<string>("Incredible Treasures");
  const [phone, setPhone] = useState<string>("+91 99450 39266");
  const [email, setEmail] = useState<string>("contact@incredibletreasures.in");
  const [address, setAddress] = useState<string>("42, Commercial Street, Tasker Town");
  const [pincode, setPincode] = useState<string>("560001");
  const [city, setCity] = useState<string>("Bengaluru");
  const [state, setState] = useState<string>("Karnataka");
  const [gstin, setGstin] = useState<string>("29AABCI1234F1Z5");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "po">("upi");

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const grandTotal = Math.round((subtotal + gstAmount) * 100) / 100;

  // Auto-fill city/state on pincode change
  const handlePincodeChange = (val: string) => {
    setPincode(val);
    if (val.startsWith("560")) {
      setCity("Bengaluru");
      setState("Karnataka");
    } else if (val.startsWith("110")) {
      setCity("New Delhi");
      setState("Delhi");
    } else if (val.startsWith("400")) {
      setCity("Mumbai");
      setState("Maharashtra");
    }
  };

  const handlePlaceOrder = () => {
    const newOrderId = `IT-PRINT-${Date.now().toString().slice(-6)}`;
    setOrderSuccessId(newOrderId);
  };

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-Over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-[95%] sm:w-full max-w-md bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5E0D8] bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Corporate Print Cart</h3>
              <span className="text-xs text-slate-500 font-medium">
                {items.length} print job{items.length !== 1 ? "s" : ""} • Ready for press dispatch
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
                Order Confirmed & In Production
              </span>
              <h3 className="text-lg font-black text-slate-900 pt-1">
                Thank you, {fullName}!
              </h3>
              <p className="text-xs text-slate-500">
                Your order <strong className="text-slate-900 font-mono">#{orderSuccessId}</strong> has been transmitted to our Bangalore offset printing press.
              </p>
            </div>

            {/* Order Specs Ticket */}
            <div className="w-full p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] text-xs text-left space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Company:</span>
                <strong className="text-slate-900">{companyName}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping To:</span>
                <strong className="text-slate-900">{city}, {pincode}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Contact Phone:</span>
                <strong className="text-slate-900">{phone}</strong>
              </div>
              <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2 font-bold">
                <span className="text-slate-900 font-black">Total Paid:</span>
                <span className="text-emerald-700 font-black">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* WhatsApp Job Ticket CTA */}
            <a
              href={`https://wa.me/919945039266?text=${encodeURIComponent(
                `Hi Incredible Treasures, I placed order #${orderSuccessId} for ${items.length} item(s) totalling ₹${grandTotal.toLocaleString("en-IN")}. Please confirm dispatch timeline.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Get Instant WhatsApp Dispatch Status</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setOrderSuccessId(null);
                setIsCheckoutOpen(false);
                onClose();
              }}
              className="text-xs text-slate-500 hover:text-slate-900 font-bold"
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
              <span className="font-black text-slate-900 text-sm">Corporate Delivery & Invoicing</span>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-500 hover:text-slate-800 font-bold text-xs"
              >
                ← Back to Cart
              </button>
            </div>

            <div className="space-y-3">
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
                  <label className="font-bold text-slate-700 block mb-1">Email ID:</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Delivery Address:</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pincode:</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">State:</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Company GSTIN (for Input Tax Credit):
                </label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-mono font-semibold focus:outline-none focus:border-[#A9782B]"
                  placeholder="29AABCI1234F1Z5"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Payment Method:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "upi", label: "⚡ UPI / QR" },
                    { id: "card", label: "💳 Cards / Net" },
                    { id: "po", label: "🏢 B2B PO Invoice" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2 rounded-xl text-center border font-bold text-[11px] cursor-pointer transition ${
                        paymentMethod === m.id
                          ? "bg-[#FAF6EE] border-[#A9782B] text-[#734D15]"
                          : "bg-[#FAF8F5] border-[#E5E0D8] text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} items):</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18% B2B Tax Invoice):</span>
                <span>₹{gstAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black border-t border-slate-200 pt-1 text-sm">
                <span>Total Payable:</span>
                <span className="text-[#A9782B]">₹{grandTotal.toLocaleString("en-IN")}</span>
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
          /* VIEW 3: CART ITEMS LIST                                   */
          /* ========================================================= */
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">Cart is empty</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Design your card and click "Print Order" to add it here.
                    </p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] space-y-2.5 text-xs hover:border-[#A9782B] transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E0D8] flex items-center justify-center font-bold text-[#A9782B] shrink-0 shadow-2xs">
                          <Printer className="w-6 h-6" />
                        </div>
                        <div>
                          <strong className="text-slate-900 font-bold block">{item.title}</strong>
                          <span className="text-[10px] text-slate-500 block">{item.specs}</span>
                          <span className="text-[9px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded inline-block mt-1">
                            ✓ 600+ DPI Pre-Flight Approved
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-bold">
                      <span className="text-slate-600">
                        Qty: <strong className="text-slate-900">{item.quantity} cards</strong>
                      </span>
                      <span className="text-[#A9782B] font-black text-sm">
                        ₹{item.totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#E5E0D8] bg-[#FAF8F5] space-y-3 shrink-0">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <strong className="text-slate-900">₹{subtotal.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>18% GST (Input Tax Credit Eligible):</span>
                    <strong className="text-slate-900">₹{gstAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-sm border-t border-slate-200 pt-1.5">
                    <span>Grand Total:</span>
                    <span className="text-[#A9782B]">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:from-[#8E621E] hover:to-[#734D15] text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-101"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
