import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpayPaymentSignature } from "@/lib/razorpayServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderReferenceId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required Razorpay payment credentials for cryptographic verification.",
        },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpayPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Cryptographic signature verification failed. Untrusted payment payload.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      orderReferenceId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error verifying Razorpay payment:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to verify Razorpay payment signature.",
      },
      { status: 500 }
    );
  }
}
