import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Incredible Treasures | Luxury Corporate Printing & Web-to-Print Studio",
  description:
    "Bespoke corporate visiting cards, 3D raised gold foil stationery, and luxury corporate gifts. Handcrafted in Yelahanka, Bengaluru. GSTIN: 29AAKFI2392F1Z5.",
  keywords: [
    "Visiting Cards Bangalore",
    "Luxury Business Cards",
    "Corporate Gifting Bengaluru",
    "Gold Foil Business Cards",
    "Incredible Treasures",
    "Web to Print India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.variable} ${cinzel.variable} font-sans bg-[#0A0A0A] text-[#FBFBFA] min-h-screen selection:bg-[#D4AF37] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
