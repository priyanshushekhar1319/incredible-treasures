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
    "Bangalore's direct web-to-print store for custom visiting cards, envelopes, letterheads, stamps, apparel, and gifting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans bg-white text-[#0F172A] min-h-screen selection:bg-[#a9782b] selection:text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
