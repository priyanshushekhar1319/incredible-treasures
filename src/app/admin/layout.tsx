import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Incredible Treasures | Factory Command & Owner Backoffice ERP",
  description: "Master administrative operations portal for orders pipeline, dynamic pricing, inventory control, and imposition batching.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {children}
    </div>
  );
}
