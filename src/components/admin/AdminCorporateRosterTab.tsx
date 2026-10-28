"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  Plus,
  Printer,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  X,
  Send,
} from "lucide-react";
import {
  getCorporateRoster,
  addEmployeeToCorporateRoster,
  CorporateClientProfile,
} from "@/lib/adminStore";
import { createRealOrder } from "@/lib/orderStore";

export const AdminCorporateRosterTab: React.FC = () => {
  const [roster, setRoster] = useState<CorporateClientProfile[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("corp-singhania");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState<boolean>(false);

  // Form State
  const [empName, setEmpName] = useState("");
  const [empDesignation, setEmpDesignation] = useState("");
  const [empPhone, setEmpPhone] = useState("+91 98201 00000");
  const [empEmail, setEmpEmail] = useState("");
  const [quantityToPrint, setQuantityToPrint] = useState(500);

  const reloadRoster = () => {
    setRoster(getCorporateRoster());
  };

  useEffect(() => {
    reloadRoster();
    const handleUpdate = () => reloadRoster();
    window.addEventListener("it_roster_updated", handleUpdate);
    return () => window.removeEventListener("it_roster_updated", handleUpdate);
  }, []);

  const activeClient = roster.find((c) => c.id === selectedClientId) || roster[0];

  const handleCreateEmployeeRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName.trim() || !activeClient) return;

    // 1. Add to Roster
    addEmployeeToCorporateRoster(activeClient.id, {
      fullName: empName,
      designation: empDesignation,
      phone: empPhone,
      email: empEmail,
    });

    // 2. Automatically spawn official production order
    createRealOrder({
      source: "ready_made_storefront",
      items: [
        {
          id: `item-${Date.now()}`,
          title: `Corporate Visiting Cards (${quantityToPrint} pcs) • ${empName}`,
          categoryName: "Visiting Cards",
          quantity: quantityToPrint,
          unitPrice: 5.0,
          totalPrice: quantityToPrint * 5.0,
          branding: `${activeClient.savedSubstrate} • ${activeClient.savedCornerStyle}`,
          specs: `Employee: ${empName} (${empDesignation}) • Phone: ${empPhone} • Corporate Brand Palette: ${activeClient.brandHexColors.join(", ")}`,
          isGstIncluded: true,
        },
      ],
      customer: {
        fullName: empName,
        companyName: activeClient.companyName,
        phone: empPhone,
        email: empEmail || activeClient.email,
        address: `Corporate Headquarters, ${activeClient.city}`,
        city: activeClient.city,
        state: activeClient.state,
        pincode: activeClient.pincode,
        gstin: activeClient.gstin,
      },
      pricing: {
        subtotal: quantityToPrint * 5.0,
        gstAmount: Math.round(((quantityToPrint * 5.0) * 18) / 118),
        shippingFee: 0,
        shippingTier: "standard",
        couponDiscount: 0,
        grandTotal: quantityToPrint * 5.0,
      },
      paymentMethod: "po",
    });

    alert(`1-Click Batching Successful! Official Print Run scheduled for ${empName} (${activeClient.companyName}). Job transmitted to Press Queue.`);

    setIsAddEmployeeOpen(false);
    setEmpName("");
    setEmpDesignation("");
    reloadRoster();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span>Corporate Account Roster & 1-Click Re-Order Desk</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono font-bold">
              {roster.length} Enterprise Clients
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Maintain pre-approved corporate brand guidelines, color palettes, and spawn new employee visiting cards in 1-click.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddEmployeeOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:opacity-95 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Employee 1-Click Batch</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left Column: Companies List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Enterprise Accounts
          </span>

          {roster.map((corp) => {
            const isSelected = selectedClientId === corp.id;
            return (
              <button
                key={corp.id}
                type="button"
                onClick={() => setSelectedClientId(corp.id)}
                className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer space-y-2 shadow-xs ${
                  isSelected
                    ? "bg-white border-[#A9782B] ring-2 ring-[#A9782B]/20"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <strong className="text-slate-900 font-bold text-xs truncate max-w-[200px]" title={corp.companyName}>
                    {corp.companyName}
                  </strong>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                    {corp.totalOrdersRun} Runs
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{corp.city}, {corp.state}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="font-mono text-emerald-800 font-bold">GSTIN: {corp.gstin}</span>
                  <span>{corp.employees.length} Saved Profiles</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Company Guidelines & Employee Directory (8 cols) */}
        {activeClient && (
          <div className="lg:col-span-8 space-y-4">
            {/* Brand Specifications Vault */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{activeClient.companyName}</h4>
                  <span className="text-slate-500 text-[11px]">Primary Contact: {activeClient.primaryContactName} ({activeClient.phone})</span>
                </div>

                {/* Brand Colors Swatches */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Palette:</span>
                  {activeClient.brandHexColors.map((hex) => (
                    <span
                      key={hex}
                      className="w-5 h-5 rounded-md border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Saved Substrate:</span>
                  <strong className="text-slate-800">{activeClient.savedSubstrate}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Cutting & Finish:</span>
                  <strong className="text-slate-800">{activeClient.savedCornerStyle}</strong>
                </div>
              </div>
            </div>

            {/* Employee Cards Directory */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <span className="text-xs font-black text-slate-900">
                  Approved Employee Directory ({activeClient.employees.length})
                </span>
                <span className="text-[11px] text-slate-500">1-Click Press Dispatch Active</span>
              </div>

              <div className="divide-y divide-slate-100">
                {activeClient.employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition"
                  >
                    <div className="space-y-0.5">
                      <strong className="text-slate-900 font-bold text-xs block">{emp.fullName}</strong>
                      <span className="text-slate-600 text-[11px] font-semibold block">{emp.designation}</span>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                        <span>{emp.phone}</span>
                        <span>•</span>
                        <span>{emp.email}</span>
                        {emp.lastCardRunDate && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-500">
                              <Calendar className="w-3 h-3 text-[#A9782B]" />
                              Last Run: {emp.lastCardRunDate}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        createRealOrder({
                          source: "ready_made_storefront",
                          items: [
                            {
                              id: `item-${Date.now()}`,
                              title: `Corporate Re-Order (500 pcs) • ${emp.fullName}`,
                              categoryName: "Visiting Cards",
                              quantity: 500,
                              unitPrice: 5.0,
                              totalPrice: 2500,
                              branding: activeClient.savedSubstrate,
                              specs: `Re-run for ${emp.fullName} (${emp.designation})`,
                              isGstIncluded: true,
                            },
                          ],
                          customer: {
                            fullName: emp.fullName,
                            companyName: activeClient.companyName,
                            phone: emp.phone,
                            email: emp.email,
                            address: `Corporate Headquarters, ${activeClient.city}`,
                            city: activeClient.city,
                            state: activeClient.state,
                            pincode: activeClient.pincode,
                            gstin: activeClient.gstin,
                          },
                          pricing: {
                            subtotal: 2500,
                            gstAmount: 381.36,
                            shippingFee: 0,
                            shippingTier: "standard",
                            couponDiscount: 0,
                            grandTotal: 2500,
                          },
                          paymentMethod: "po",
                        });
                        alert(`Re-Order Confirmed for ${emp.fullName}! Scheduled for press fabrication.`);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#CBA768]" />
                      <span>Re-Run 500 Cards</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Employee Modal */}
      {isAddEmployeeOpen && activeClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#A9782B]" />
                <h4 className="text-sm font-black text-slate-900">
                  New Employee Batch for {activeClient.companyName}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsAddEmployeeOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployeeRun} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Employee Full Name:</label>
                <input
                  type="text"
                  required
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  placeholder="e.g. Varun Aggarwal"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Corporate Designation:</label>
                <input
                  type="text"
                  required
                  value={empDesignation}
                  onChange={(e) => setEmpDesignation(e.target.value)}
                  placeholder="e.g. Senior Director • Investment Banking"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Mobile:</label>
                  <input
                    type="text"
                    value={empPhone}
                    onChange={(e) => setEmpPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Run Quantity:</label>
                  <select
                    value={quantityToPrint}
                    onChange={(e) => setQuantityToPrint(parseInt(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  >
                    <option value={200}>200 Cards</option>
                    <option value={500}>500 Cards (Standard)</option>
                    <option value={1000}>1,000 Cards (Bulk)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address:</label>
                <input
                  type="email"
                  value={empEmail}
                  onChange={(e) => setEmpEmail(e.target.value)}
                  placeholder="e.g. varun.a@company.com"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-[11px] leading-relaxed">
                ✓ Will automatically apply <strong>{activeClient.savedSubstrate}</strong> and <strong>{activeClient.savedCornerStyle}</strong> from corporate guidelines.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEmployeeOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] text-white font-bold hover:opacity-95 transition cursor-pointer shadow-sm"
                >
                  Spawn Print Job & Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
