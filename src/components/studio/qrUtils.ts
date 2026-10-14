import QRCode from "qrcode";
import { QrConfig } from "./types";

export interface ContactData {
  customerName: string;
  customerDesignation: string;
  companyName: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

/**
 * Builds the exact payload string for phone camera / UPI / vCard recognition
 */
export function buildQrPayload(config: QrConfig, contact: ContactData): string {
  switch (config.type) {
    case "upi": {
      const upi = config.upiId?.trim() || "brand@okhdfcbank";
      const name = encodeURIComponent(config.payeeName?.trim() || contact.customerName || "Incredible Treasures");
      return `upi://pay?pa=${upi}&pn=${name}&cu=INR`;
    }
    case "whatsapp": {
      const rawNum = config.whatsappNumber?.replace(/[^0-9]/g, "") || contact.phone.replace(/[^0-9]/g, "");
      const cleanPhone = rawNum.startsWith("91") ? rawNum : `91${rawNum}`;
      const msg = encodeURIComponent(
        config.whatsappMessage?.trim() || `Hello ${contact.customerName || "there"}, connecting via your visiting card!`
      );
      return `https://wa.me/${cleanPhone}?text=${msg}`;
    }
    case "vcard": {
      const name = contact.customerName || "Mahi Kapoor";
      const company = contact.companyName || "Incredible Treasures";
      const title = contact.customerDesignation || "Managing Director";
      const phone = contact.phone || "+91 99450 39266";
      const email = contact.email || "contact@incredible-treasures.com";
      const web = config.websiteUrl || contact.website || "https://www.incredible-treasures.com";
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${name}`,
        `ORG:${company}`,
        `TITLE:${title}`,
        `TEL:${phone}`,
        `EMAIL:${email}`,
        `URL:${web.startsWith("http") ? web : `https://${web}`}`,
        "END:VCARD",
      ].join("\n");
    }
    case "url": {
      const raw = config.websiteUrl?.trim() || contact.website || "www.incredible-treasures.com";
      return raw.startsWith("http") ? raw : `https://${raw}`;
    }
    case "google-review": {
      const raw = config.reviewUrl?.trim() || "https://g.page/r/incredible-treasures/review";
      return raw.startsWith("http") ? raw : `https://${raw}`;
    }
    default:
      return "https://www.incredible-treasures.com";
  }
}

/**
 * Generates razor-sharp SVG vector markup for the given QR code
 */
export async function generateQrSvg(
  payload: string,
  darkColor: string = "#000000",
  lightColor: string = "#FFFFFF"
): Promise<string> {
  try {
    const svg = await QRCode.toString(payload, {
      type: "svg",
      margin: 1,
      errorCorrectionLevel: "M",
      color: {
        dark: darkColor,
        light: lightColor === "transparent" ? "#00000000" : lightColor,
      },
    });
    return svg;
  } catch (err) {
    console.error("Failed to generate QR Code SVG:", err);
    return "";
  }
}
