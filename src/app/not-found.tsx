import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAD5B3] p-8 sm:p-10 shadow-sm space-y-4">
        <span className="text-6xl sm:text-7xl font-serif font-black text-[#A9782B] tracking-tight">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The requested page could not be located. It may have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold tracking-wide transition shadow-sm"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
