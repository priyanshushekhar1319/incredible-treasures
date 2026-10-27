import Razorpay from "razorpay";
import crypto from "crypto";

// Fallback or environment keys
const KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TsylG3b5RRkcg8";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "c7mDOxxwn5V0Y1811AY82a1C";
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "whsec_incredibletreasures_live_2026";

/**
 * Singleton server-side Razorpay instance
 */
let razorpayInstance: Razorpay | null = null;

export function getRazorpayServer(): Razorpay {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: KEY_ID,
      key_secret: KEY_SECRET,
    });
  }
  return razorpayInstance;
}

export interface CreateOrderParams {
  amountInRupees: number;
  receiptId: string;
  notes?: Record<string, string | number | undefined>;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  keyId: string;
}

/**
 * Creates an official Razorpay order registered on Razorpay's servers.
 * Converts amount from Rupees to Paise (e.g. ₹12,235 -> 1223500 paise).
 */
export async function createRazorpayOrder({
  amountInRupees,
  receiptId,
  notes = {},
}: CreateOrderParams): Promise<RazorpayOrderResponse> {
  const rzp = getRazorpayServer();

  // Razorpay requires amount in smallest currency sub-unit (paise for INR)
  const amountInPaise = Math.round(amountInRupees * 100);

  // Filter out undefined note values
  const cleanNotes: Record<string, string> = {};
  for (const [k, v] of Object.entries(notes)) {
    if (v !== undefined && v !== null) {
      cleanNotes[k] = String(v).slice(0, 100); // Razorpay notes limit 100 chars
    }
  }

  const order = await rzp.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: receiptId.slice(0, 40),
    notes: cleanNotes,
  });

  return {
    id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    receipt: order.receipt || receiptId,
    status: order.status,
    keyId: KEY_ID,
  };
}

/**
 * Cryptographically verifies that the payment signature matches the Razorpay order and payment IDs.
 * Uses SHA-256 HMAC as mandated by the Indian Banking & Payment Regulations.
 */
export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!orderId || !paymentId || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expectedSignature, "utf8");
  const actualBuf = Buffer.from(signature, "utf8");

  if (expectedBuf.length !== actualBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

/**
 * Verifies the authenticity of Razorpay webhooks
 */
export function verifyRazorpayWebhookSignature({
  rawBody,
  signature,
}: {
  rawBody: string;
  signature: string;
}): boolean {
  if (!rawBody || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf8"),
      Buffer.from(signature, "utf8")
    );
  } catch {
    return false;
  }
}
