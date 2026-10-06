import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Incredible Treasures | Custom Visiting Cards, Envelopes & Corporate Printing",
  description:
    "Bangalore's direct web-to-print store for custom visiting cards, envelopes, letterheads, stamps, apparel, and gifting. GSTIN: 29AAKFI2392F1Z5.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans bg-[#F8FAFC] text-[#0F172A] min-h-screen selection:bg-[#16A34A] selection:text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
