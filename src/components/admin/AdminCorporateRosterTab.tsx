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
  Trash2,
} from "lucide-react";
import {
  getCorporateRoster,
  addEmployeeToCorporateRoster,
  saveCorporateClient,
  deleteCorporateClient,
  CorporateClientProfile,
} from "@/lib/adminStore";
import { createRealOrder } from "@/lib/orderStore";

export const AdminCorporateRosterTab: React.FC = () => {
  const [roster, setRoster] = useState<CorporateClientProfile[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState<boolean>(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);

  // New Client Form State
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("+91 ");
  const [contactEmail, setContactEmail] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560001");
  const [savedSubstrate, setSavedSubstrate] = useState("400-Micron Luxury Glossy PVC");
  const [savedCornerStyle, setSavedCornerStyle] = useState("Standard Square 90°");
  const [brandHex, setBrandHex] = useState("#A9782B, #1E293B, #FFFFFF");

  // New Employee Form State
  const [empName, setEmpName] = useState("");
  const [empDesignation, setEmpDesignation] = useState("");
  const [empPhone, setEmpPhone] = useState("+91 ");
  const [empEmail, setEmpEmail] = useState("");
  const [quantityToPrint, setQuantityToPrint] = useState(500);

  const reloadRoster = () => {
    const list = getCorporateRoster();
    setRoster(list);
    if (list.length > 0 && (!selectedClientId || !list.some((c) => c.id === selectedClientId))) {
      setSelectedClientId(list[0].id);
    }
  };

  useEffect(() => {
    reloadRoster();
    const handleUpdate = () => reloadRoster();
    window.addEventListener("it_roster_updated", handleUpdate);
    return () => window.removeEventListener("it_roster_updated", handleUpdate);
  }, []);

  const activeClient = roster.find((c) => c.id === selectedClientId) || roster[0];

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    const colors = brandHex
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.startsWith("#") || c.length === 7);

    const newClient: CorporateClientProfile = {
      id: `corp-${Date.now()}`,
      companyName: companyName.trim(),
      gstin: gstin.trim().toUpperCase(),
      primaryContactName: contactName.trim(),
      phone: contactPhone.trim(),
      email: contactEmail.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      brandHexColors: colors.length > 0 ? colors : ["#A9782B", "#0B1B3D", "#FFFFFF"],
      savedSubstrate,
      savedCornerStyle,
      totalOrdersRun: 0,
      employees: [],
    };

    saveCorporateClient(newClient);
    setIsAddClientOpen(false);
    setCompanyName("");
    setGstin("");
    setContactName("");
    setContactPhone("+91 ");
    setContactEmail("");
    setSelectedClientId(newClient.id);
    reloadRoster();
  };

  const handleDeleteClient = (clientId: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from corporate roster?`)) {
      deleteCorporateClient(clientId);
      reloadRoster();
    }
  };

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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddClientOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#CBA768]" />
            <span>Enroll Corporate Client</span>
          </button>

          {roster.length > 0 && (
            <button
              type="button"
              onClick={() => setIsAddEmployeeOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] hover:opacity-95 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Employee Batch</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Layout */}
      {roster.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EAD5B3] space-y-4 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAD5B3] text-[#A9782B] flex items-center justify-center mx-auto shadow-xs">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-slate-900">0 Corporate Accounts Enrolled</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              All demo clients have been purged. Click below to enroll your genuine corporate clients with verified GSTIN, brand guidelines, and approved substrates.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsAddClientOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] text-white font-bold text-xs hover:opacity-95 transition flex items-center gap-1.5 mx-auto cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll First Corporate Client</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          {/* Left Column: Companies List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Enterprise Accounts
            </span>

            {roster.map((corp) => {
              const isSelected = selectedClientId === corp.id;
              return (
                <div
                  key={corp.id}
                  className={`w-full p-4 rounded-2xl border transition space-y-2 shadow-xs ${
                    isSelected
                      ? "bg-white border-[#A9782B] ring-2 ring-[#A9782B]/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <button
                      type="button"
                      onClick={() => setSelectedClientId(corp.id)}
                      className="text-left font-bold text-slate-900 text-xs truncate max-w-[200px] hover:text-[#A9782B] cursor-pointer"
                      title={corp.companyName}
                    >
                      {corp.companyName}
                    </button>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                        {corp.totalOrdersRun} Runs
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteClient(corp.id, corp.companyName)}
                        className="text-slate-400 hover:text-rose-600 transition p-1"
                        title="Delete Client"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{corp.city}, {corp.state}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-mono text-emerald-800 font-bold">GSTIN: {corp.gstin || "N/A"}</span>
                    <span>{corp.employees.length} Saved Profiles</span>
                  </div>
                </div>
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
                    <span className="text-slate-500 text-[11px]">
                      Primary Contact: {activeClient.primaryContactName} ({activeClient.phone})
                    </span>
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
                  <button
                    type="button"
                    onClick={() => setIsAddEmployeeOpen(true)}
                    className="text-[11px] font-bold text-[#A9782B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Employee to Roster</span>
                  </button>
                </div>

                {activeClient.employees.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No employees added yet for {activeClient.companyName}. Click &apos;Add Employee to Roster&apos; to schedule a 1-click card print run.
                  </div>
                ) : (
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
                                <span>Last Run: {emp.lastCardRunDate}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setEmpName(emp.fullName);
                            setEmpDesignation(emp.designation);
                            setEmpPhone(emp.phone);
                            setEmpEmail(emp.email);
                            setIsAddEmployeeOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#FAF6EE] text-[#734D15] border border-slate-200 hover:border-[#EAD5B3] font-bold text-[11px] transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#A9782B]" />
                          <span>Re-Order Cards</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal: Enroll Corporate Client */}
      {isAddClientOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#A9782B]" />
                <h4 className="font-serif font-bold text-base text-slate-900">
                  Enroll Enterprise Client Account
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsAddClientOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Reliance Retail Ventures Ltd."
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Corporate GSTIN</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="29AAAKR1234F1Z5"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Contact Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-2.5 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#A9782B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Approved Substrate</label>
                  <select
                    value={savedSubstrate}
                    onChange={(e) => setSavedSubstrate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  >
                    <option value="400-Micron Luxury Glossy PVC">400-Micron Luxury Glossy PVC</option>
                    <option value="400 GSM Velvet Touch Board">400 GSM Velvet Touch Board</option>
                    <option value="350 GSM Royal Matte Art Board">350 GSM Royal Matte Art Board</option>
                    <option value="Executive Ceramic Mugs & Bond">Executive Ceramic Mugs & Bond</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Corner Finish</label>
                  <select
                    value={savedCornerStyle}
                    onChange={(e) => setSavedCornerStyle(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-[#A9782B]"
                  >
                    <option value="Standard Square 90°">Standard Square 90°</option>
                    <option value="6mm Rounded Corners">6mm Rounded Corners</option>
                    <option value="Gold Foil Stamped Edges">Gold Foil Stamped Edges</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Corporate Palette Hex Codes</label>
                <input
                  type="text"
                  value={brandHex}
                  onChange={(e) => setBrandHex(e.target.value)}
                  placeholder="#A9782B, #0B1B3D, #FFFFFF"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#A9782B]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#A9782B] to-[#8E621E] text-white font-bold hover:opacity-95 transition cursor-pointer shadow-sm"
                >
                  Save Corporate Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Spawn Employee Card Batch */}
      {isAddEmployeeOpen && activeClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#A9782B]" />
                <h4 className="font-serif font-bold text-base text-slate-900">
                  New Employee Card Run
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsAddEmployeeOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployeeRun} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Corporate Client:</label>
                <span className="font-serif font-black text-slate-900 text-sm block">
                  {activeClient.companyName}
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Employee Full Name:</label>
                <input
                  type="text"
                  required
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  placeholder="e.g. Varun Agarwal"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B]"
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
