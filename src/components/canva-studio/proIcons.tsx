import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Crown,
  Diamond,
  Star,
  Award,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Building2,
  TrendingUp,
  Percent,
  UserCheck,
  Stethoscope,
  PlusCircle,
  HeartPulse,
  Activity,
  MessageCircle,
  CreditCard,
  CheckCircle,
} from "lucide-react";

// Robust SVG Icons for Social & Digital Networks
const InstagramIcon: React.FC<{ size?: number | string; style?: React.CSSProperties; className?: string }> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterXIcon: React.FC<{ size?: number | string; style?: React.CSSProperties; className?: string }> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={style}
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number | string; style?: React.CSSProperties; className?: string }> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export interface ProIconDefinition {
  id: string;
  name: string;
  category: "contact" | "luxury" | "business" | "medical";
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number | string }>;
}

export const PRO_ICONS: ProIconDefinition[] = [
  // Contact
  { id: "phone", name: "Phone Call", category: "contact", icon: Phone },
  { id: "whatsapp", name: "WhatsApp", category: "contact", icon: MessageCircle },
  { id: "mail", name: "Email", category: "contact", icon: Mail },
  { id: "globe", name: "Website", category: "contact", icon: Globe },
  { id: "map-pin", name: "Location Pin", category: "contact", icon: MapPin },
  { id: "linkedin", name: "LinkedIn", category: "contact", icon: LinkedinIcon },
  { id: "instagram", name: "Instagram", category: "contact", icon: InstagramIcon },
  { id: "twitter", name: "Twitter / X", category: "contact", icon: TwitterXIcon },

  // Luxury & Trust
  { id: "crown", name: "Royal Crown", category: "luxury", icon: Crown },
  { id: "diamond", name: "Luxury Diamond", category: "luxury", icon: Diamond },
  { id: "award", name: "Certified Award", category: "luxury", icon: Award },
  { id: "star", name: "5-Star Rating", category: "luxury", icon: Star },
  { id: "shield-check", name: "Verified Guarantee", category: "luxury", icon: ShieldCheck },
  { id: "sparkles", name: "Gold Hallmark", category: "luxury", icon: Sparkles },

  // Business & Corporate
  { id: "briefcase", name: "Executive Suite", category: "business", icon: Briefcase },
  { id: "building", name: "Headquarters", category: "business", icon: Building2 },
  { id: "trending-up", name: "Growth / Finance", category: "business", icon: TrendingUp },
  { id: "credit-card", name: "Payment Accepted", category: "business", icon: CreditCard },
  { id: "percent", name: "GST / Tax Registered", category: "business", icon: Percent },
  { id: "user-check", name: "Authorized Partner", category: "business", icon: UserCheck },

  // Medical & Healthcare
  { id: "stethoscope", name: "Doctor Stethoscope", category: "medical", icon: Stethoscope },
  { id: "heart-pulse", name: "Cardio Health", category: "medical", icon: HeartPulse },
  { id: "plus-circle", name: "Clinic Red Cross", category: "medical", icon: PlusCircle },
  { id: "activity", name: "Diagnostics / Lab", category: "medical", icon: Activity },
];

export const renderProIcon = (
  iconName: string,
  color: string = "#A9782B",
  size: number = 20,
  className?: string
) => {
  const item = PRO_ICONS.find((i) => i.id === iconName);
  const IconComponent = item ? item.icon : Sparkles;
  return <IconComponent size={size} style={{ color }} className={className} />;
};
