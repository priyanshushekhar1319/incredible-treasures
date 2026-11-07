"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { verifyAdminCredentialsAsync } from "@/lib/adminAuth";

interface Props {
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<Props> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both admin email and password.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await verifyAdminCredentialsAsync(email, password);
      if (result.success) {
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setError(result.error || "Invalid admin email or password. Access Denied.");
      }
    } catch {
      setIsLoading(false);
      setError("Authentication service temporarily unavailable. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EAD5B3] shadow-2xl max-w-md w-full overflow-hidden font-sans">
        {/* Luxury Brand Header */}
        <div className="p-8 bg-gradient-to-b from-[#FAF8F5] via-[#FAF6EE] to-white border-b border-[#EAD5B3] text-center relative">
          {/* Official Brand Logo */}
          <div className="relative h-12 w-56 mx-auto mb-3">
            <Image
              src="/images/logo-transparent.png"
              alt="Incredible Treasures"
              fill
              sizes="224px"
              priority
              className="object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#EAD5B3] text-[#734D15] text-[10px] font-mono uppercase tracking-widest font-black mb-2">
            ✦ FACTORY COMMAND BACKOFFICE ✦
          </div>

          <h2 className="font-serif font-bold text-xl text-slate-900 tracking-tight">
            Admin Authentication
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in with authorized administrator credentials
          </p>
        </div>

        {/* Form Body: Email & Password */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 bg-white">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block font-serif tracking-wide">
              Admin Email Address:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4 text-[#A9782B]" />
              </div>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@incredibletreasures.com"
                className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 transition"
                autoFocus
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block font-serif tracking-wide">
              Admin Password:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-[#A9782B]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#FAF8F5] border border-[#EAD5B3] rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 font-mono font-bold focus:outline-none focus:border-[#A9782B] focus:ring-2 focus:ring-[#A9782B]/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email.trim() || !password.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A9782B] via-[#8E621E] to-[#734D15] hover:opacity-95 text-white font-serif font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-101 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Sign In to Admin Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <div className="pt-2 text-center text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-[#A9782B]" />
            <span>256-Bit Encrypted Admin Session • Peenya Works</span>
          </div>
        </form>
      </div>
    </div>
  );
};
