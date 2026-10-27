import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpayServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, receipt, notes } = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order amount. Amount must be greater than 0." },
        { status: 400 }
      );
    }

    const receiptId = receipt || `rcpt_${Date.now()}`;
    const order = await createRazorpayOrder({
      amountInRupees: amount,
      receiptId,
      notes,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      keyId: order.keyId,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to initialize Razorpay checkout order.",
      },
      { status: 500 }
    );
  }
}
