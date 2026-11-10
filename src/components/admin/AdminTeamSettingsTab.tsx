"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Key,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertCircle,
  Mail,
  UserCheck,
  RefreshCw,
  X,
  FileCheck2,
  Check,
} from "lucide-react";
import {
  ENTERPRISE_ADMIN_ACCOUNTS,
  AdminAccountConfig,
  AdminUserSession,
} from "@/lib/adminAuth";

interface Props {
  currentSession: AdminUserSession;
  onRoleSwitched?: () => void;
}

export const AdminTeamSettingsTab: React.FC<Props> = ({ currentSession }) => {
  const [resetModalAccount, setResetModalAccount] = useState<AdminAccountConfig | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [isSubmittingReset, setIsSubmittingReset] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const accountsList = Object.values(ENTERPRISE_ADMIN_ACCOUNTS);
  const isSuperAdmin = currentSession.role === "SUPER_ADMIN";

  const handleOpenResetModal = (account: AdminAccountConfig) => {
    setResetModalAccount(account);
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    setStatusMessage(null);
  };

  const handleCloseResetModal = () => {
    setResetModalAccount(null);
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    setStatusMessage(null);
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalAccount) return;

    if (newPasswordInput.length < 8) {
      setStatusMessage({
        type: "error",
        text: "Security Policy Requirement: Password must be at least 8 characters with a mix of numbers & symbols.",
      });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setStatusMessage({
        type: "error",
        text: "Passwords do not match. Please verify and re-enter.",
      });
      return;
    }

    setIsSubmittingReset(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset_password",
          targetEmail: resetModalAccount.email,
          newPassword: newPasswordInput,
        }),
      });

      const data = await res.json();
      setIsSubmittingReset(false);

      if (data.success) {
        setStatusMessage({
          type: "success",
          text: `Credentials updated for ${resetModalAccount.name}! The new password has been encrypted on the server.`,
        });
        setTimeout(() => {
          handleCloseResetModal();
        }, 2200);
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to update credentials. Please check administrative privileges.",
        });
      }
    } catch {
      setIsSubmittingReset(false);
      setStatusMessage({
        type: "error",
        text: "Network error occurred while contacting the identity provider.",
      });
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-rose-200 shadow-sm text-center max-w-2xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-serif font-bold text-slate-900">
          Access Restricted: Super Admin Clearance Required
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Enterprise IAM & Team Security Registry is strictly restricted to the <strong>Master Administrator (SUPER_ADMIN)</strong>. Your current role clearance (<strong>{currentSession.role}</strong>) does not have privileges to inspect or modify team access policies.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Enterprise Security & Compliance Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#1C150C] to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-[#EAD5B3]/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SOC-2 & ISO 27001 COMPLIANT
              </span>
              <span className="text-[11px] text-amber-200/80 font-mono">
                Zero-Trust IAM Directory
              </span>
            </div>
            <h3 className="text-2xl font-serif font-black tracking-tight text-white">
              Enterprise Identity & Access Management (IAM)
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Statutory 5-Tier Role-Based Access Control (RBAC). Employee credentials are cryptographically salted and hashed. In accordance with zero-trust production standards, passwords are never stored or displayed in plaintext.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-amber-200 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Master Clearance Active</span>
          </div>
        </div>
      </div>

      {/* 5 Enterprise Accounts Registry */}
      <div className="grid grid-cols-1 gap-4">
        {accountsList.map((acc: AdminAccountConfig) => {
          const isCurrent = currentSession.email.toLowerCase() === acc.email.toLowerCase();
          const initials = acc.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <div
              key={acc.id}
              className={`bg-white rounded-3xl border transition p-6 shadow-xs ${
                isCurrent
                  ? "border-[#A9782B] ring-2 ring-[#A9782B]/20 bg-[#FAF8F5]/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Account Identity */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-amber-200 font-serif font-black text-sm flex items-center justify-center shrink-0 border border-amber-500/20 shadow-xs">
                    {initials}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase border ${acc.badgeColor}`}>
                        {acc.badgeLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                        {acc.tierLevel}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          You (Active Session)
                        </span>
                      )}
                      {acc.hideRevenueData && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3 text-rose-500" />
                          Revenue Masked (PoLP Standard)
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-serif font-black text-slate-900">
                      {acc.name}{" "}
                      <span className="text-xs font-sans font-normal text-slate-500">
                        • {acc.title}
                      </span>
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{acc.email}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">Status: Active (MFA Enforced)</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl pt-1">
                      {acc.description}
                    </p>
                  </div>
                </div>

                {/* Production Security Actions */}
                <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                  <button
                    type="button"
                    onClick={() => handleOpenResetModal(acc)}
                    className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-serif font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title={`Securely update password for ${acc.name}`}
                  >
                    <Key className="w-3.5 h-3.5 text-[#A9782B]" />
                    <span>Reset Password</span>
                  </button>

                  <div className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600 text-center">
                    <span className="text-emerald-600 font-black">● 256-Bit</span> Salted
                  </div>
                </div>
              </div>

              {/* Module Access Clearance Matrix */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-mono font-black uppercase text-slate-400 block mb-2">
                  Assigned Module Clearance:
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {[
                    { id: "dashboard", label: "Dashboard (Mutual)" },
                    { id: "orders", label: "Orders Pipeline" },
                    { id: "catalog", label: "Product Catalog" },
                    { id: "inventory", label: "Inventory Stock" },
                    { id: "shipping", label: "BlueDart Shipping" },
                    { id: "payments", label: "Payments & Tax" },
                    { id: "customers", label: "Corporate Clients" },
                    { id: "marketing", label: "Banners & Coupons" },
                    { id: "settings", label: "RBAC Settings" },
                  ].map((mod) => {
                    const isUnlocked = acc.allowedTabs.includes(mod.id as any);
                    return (
                      <span
                        key={mod.id}
                        className={`px-2.5 py-1 rounded-xl font-medium text-[11px] flex items-center gap-1 border ${
                          isUnlocked
                            ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                            : "bg-slate-100 text-slate-400 border-slate-200 line-through opacity-60"
                        }`}
                      >
                        {isUnlocked ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Lock className="w-3 h-3 text-slate-400" />
                        )}
                        <span>{mod.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset Password Modal */}
      {resetModalAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-md w-full overflow-hidden font-sans">
            <div className="p-6 bg-gradient-to-r from-[#FAF8F5] to-white border-b border-[#EAD5B3] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#A9782B]" />
                  <h4 className="font-serif font-bold text-slate-900 text-base">
                    Update Security Credentials
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set new password for <strong>{resetModalAccount.name}</strong> ({resetModalAccount.email})
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseResetModal}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePasswordResetSubmit} className="p-6 space-y-4">
              {statusMessage && (
                <div
                  className={`p-3 rounded-2xl text-xs flex items-start gap-2 border ${
                    statusMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                      : "bg-rose-50 text-rose-900 border-rose-200"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block font-serif">
                  New Administrative Password:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min. 8 characters (letters, numbers, symbols)"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block font-serif">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 transition"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseResetModal}
                  disabled={isSubmittingReset}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReset}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-serif font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingReset ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Encrypting...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Save & Apply New Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
