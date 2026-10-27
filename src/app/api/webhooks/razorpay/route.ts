import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpayServer";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    const isValid = verifyRazorpayWebhookSignature({
      rawBody,
      signature,
    });

    if (!isValid) {
      console.warn("Unauthorized webhook attempt rejected by Razorpay signature validator.");
      return NextResponse.json(
        { error: "Invalid webhook cryptographic signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;
    const payload = event.payload;

    console.log(`[Razorpay Webhook Verified] Event: ${eventType}`, {
      paymentId: payload?.payment?.entity?.id,
      orderId: payload?.order?.entity?.id,
      amount: payload?.payment?.entity?.amount,
    });

    // Handle distinct Razorpay events
    switch (eventType) {
      case "payment.captured":
      case "order.paid":
        // Server-side order fulfillment / press dispatch trigger
        break;
      case "payment.failed":
        console.warn(`Payment failed for order: ${payload?.payment?.entity?.order_id}`);
        break;
      default:
        break;
    }

    return NextResponse.json({ status: "acknowledged", event: eventType });
  } catch (error: any) {
    console.error("Razorpay webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
