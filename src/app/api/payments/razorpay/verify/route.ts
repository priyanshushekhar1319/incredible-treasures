import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpayPaymentSignature } from "@/lib/razorpayServer";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderReferenceId,
      orderData,
    } = body;

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

    // 1. If orderReferenceId exists in database, update payment details
    let dbOrder = null;
    if (orderReferenceId) {
      const match = await prisma.order.findFirst({
        where: {
          OR: [
            { orderNumber: orderReferenceId },
            { id: orderReferenceId },
          ],
        },
      });

      if (match) {
        dbOrder = await prisma.order.update({
          where: { id: match.id },
          data: {
            paymentStatus: "PAID_ADVANCE",
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            status: "ORDER_CONFIRMED",
            statusLabel: "Payment Verified via Razorpay",
          },
          include: { items: true },
        });
      }
    }

    // 2. If orderData is provided and not yet in database, create the full order record
    if (!dbOrder && orderData && orderData.customer && Array.isArray(orderData.items)) {
      try {
        const cleanEmail = orderData.customer.email.toLowerCase().trim();
        let user = await prisma.user.findUnique({ where: { email: cleanEmail } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: cleanEmail,
              name: orderData.customer.fullName?.trim() || "Customer",
              phone: orderData.customer.phone || "+91 99450 39266",
              companyName: orderData.customer.companyName || null,
              gstin: orderData.customer.gstin || null,
            },
          });
        }

        const orderNum = orderReferenceId || orderData.id || `IT-PRINT-${Date.now().toString().slice(-6)}`;

        dbOrder = await prisma.order.create({
          data: {
            orderNumber: orderNum,
            userId: user.id,
            source: orderData.source || "studio",
            customerName: orderData.customer.fullName,
            customerEmail: cleanEmail,
            customerPhone: orderData.customer.phone || "+91 99450 39266",
            shippingAddress: orderData.customer.address || "Address on File",
            city: orderData.customer.city || "Bengaluru",
            state: orderData.customer.state || "Karnataka",
            pincode: orderData.customer.pincode || "560001",
            companyName: orderData.customer.companyName || null,
            gstin: orderData.customer.gstin || null,
            subtotal: orderData.pricing?.subtotal || 0,
            taxAmount: orderData.pricing?.gstAmount || 0,
            shippingFee: orderData.pricing?.shippingFee || 0,
            discountAmount: orderData.pricing?.couponDiscount || 0,
            totalAmount: orderData.pricing?.grandTotal || 0,
            status: "ORDER_CONFIRMED",
            statusLabel: "Payment Verified via Razorpay",
            paymentStatus: "PAID_ADVANCE",
            paymentMethod: orderData.payment?.method || "upi",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            awbNumber: orderData.logistics?.awbNumber || `BD-${orderNum.replace(/\D/g, "")}`,
            courierPartner: orderData.logistics?.courierPartner || "BlueDart Apex Air",
            destinationCity: orderData.customer.city || "Bengaluru",
            items: {
              create: orderData.items.map((it: any) => ({
                productName: it.title,
                quantity: it.quantity || 100,
                unitPrice: it.unitPrice || 0,
                totalPrice: it.totalPrice || 0,
                specsJson: typeof it.specs === "string" ? it.specs : JSON.stringify(it.specs || {}),
                customDesignFront: it.image || null,
                isGstIncluded: Boolean(it.isGstIncluded),
              })),
            },
          },
          include: { items: true },
        });
      } catch (err) {
        console.warn("Could not auto-insert order on Razorpay verify (may already exist):", err);
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      orderReferenceId,
      dbOrderId: dbOrder?.id || null,
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
