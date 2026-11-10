"use client";

import React, { useState } from "react";
import {
  Users,
  ShieldCheck,
  Key,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import {
  ENTERPRISE_ADMIN_ACCOUNTS,
  AdminAccountConfig,
  AdminUserSession,
  switchAdminRole,
} from "@/lib/adminAuth";

interface Props {
  currentSession: AdminUserSession;
  onRoleSwitched: () => void;
}

export const AdminTeamSettingsTab: React.FC<Props> = ({ currentSession, onRoleSwitched }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<boolean>(true);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleTestSwitch = (email: string) => {
    const updated = switchAdminRole(email);
    if (updated) {
      onRoleSwitched();
    }
  };

  const accountsList = Object.values(ENTERPRISE_ADMIN_ACCOUNTS);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-[#EAD5B3] flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#A9782B]" />
            <h3 className="text-base font-serif font-bold text-slate-900">
              Enterprise Role-Based Access Control (RBAC) & Team Registry
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            5 Dedicated Admin Credentials according to Master Blueprint (PDF Page 4 & 5). Unrestricted users cannot access unauthorized modules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPasswords(!showPasswords)}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showPasswords ? "Hide Passwords" : "Show Passwords"}</span>
        </button>
      </div>

      {/* 5 Enterprise Accounts Table */}
      <div className="grid grid-cols-1 gap-4">
        {accountsList.map((acc: AdminAccountConfig) => {
          const isCurrent = currentSession.email.toLowerCase() === acc.email.toLowerCase();

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
                {/* Account Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase border ${acc.badgeColor}`}>
                      {acc.badgeLabel}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Active Session
                      </span>
                    )}
                    {acc.hideRevenueData && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-rose-500" />
                        No Revenue Data (PDF Spec)
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-serif font-black text-slate-900">
                    {acc.name} <span className="text-xs font-sans font-normal text-slate-500">• {acc.title}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {acc.description}
                  </p>
                </div>

                {/* Credentials & Role Switch Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Login Email:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.email, `email-${acc.id}`)}
                        className="text-slate-500 hover:text-slate-800 font-mono font-bold flex items-center gap-1 cursor-pointer"
                        title="Copy Email"
                      >
                        <span>{acc.email}</span>
                        {copiedKey === `email-${acc.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Password:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.password, `pass-${acc.id}`)}
                        className="text-amber-800 hover:text-amber-900 font-mono font-bold flex items-center gap-1 cursor-pointer"
                        title="Copy Password"
                      >
                        <span>{showPasswords ? acc.password : "••••••••••••"}</span>
                        {copiedKey === `pass-${acc.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {!isCurrent ? (
                    <button
                      type="button"
                      onClick={() => handleTestSwitch(acc.email)}
                      className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      title={`Instant Switch to ${acc.badgeLabel} Role`}
                    >
                      <span>Switch to {acc.badgeLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#CBA768]" />
                    </button>
                  ) : (
                    <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs text-center">
                      Currently Signed In
                    </div>
                  )}
                </div>
              </div>

              {/* Module Access Clearance Matrix */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-mono font-black uppercase text-slate-400 block mb-2">
                  Module Permissions:
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {[
                    { id: "dashboard", label: "Dashboard" },
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
    </div>
  );
};
