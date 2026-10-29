"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, ArrowRight, Sparkles, Building2, KeyRound, AlertCircle } from "lucide-react";
import { verifyAdminCredentialsAsync } from "@/lib/adminAuth";

interface Props {
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<Props> = ({ onSuccess }) => {
  const [credentials, setCredentials] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.trim()) {
      setError("Please enter the Master PIN or Password.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const isValid = await verifyAdminCredentialsAsync(credentials);
      if (isValid) {
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setError("Invalid Master Security PIN or Password. Access Denied.");
      }
    } catch {
      setIsLoading(false);
      setError("Authentication failed. Please verify credentials.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-md w-full overflow-hidden font-sans">
        {/* Luxury Gold & Slate Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-[#A9782B]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A9782B] to-[#8E621E] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Incredible Treasures</span>
                <span className="text-[10px] bg-[#A9782B]/30 border border-[#A9782B] text-amber-200 px-2 py-0.5 rounded-full font-mono uppercase">
                  Owner Portal
                </span>
              </h2>
              <p className="text-xs text-slate-400">Master Industrial Print Operations & ERP</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Enter Master Security PIN or Password:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4 text-[#A9782B]" />
              </div>
              <input
                type="password"
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                placeholder="Enter PIN (e.g. 9945)"
                className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 transition"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Master Security PIN: <code className="font-mono font-bold text-slate-800 bg-slate-100 px-1 py-0.5 rounded">9945</code>
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !credentials.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A9782B] via-[#8E621E] to-[#734D15] hover:opacity-95 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-101 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? "Verifying Credentials..." : "Access Master Command Center"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center">
            <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>256-Bit Encrypted Session • Authorized Personnel Only</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
