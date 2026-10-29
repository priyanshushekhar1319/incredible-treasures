import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/orders - Fetch orders from the central database
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");
    const status = searchParams.get("status");
    const query = searchParams.get("q")?.trim().toUpperCase();
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const where: any = {};

    if (userId) {
      where.userId = userId;
    } else if (email) {
      where.customerEmail = email.toLowerCase().trim();
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (query) {
      where.OR = [
        { orderNumber: { contains: query } },
        { customerName: { contains: query } },
        { customerPhone: { contains: query } },
        { companyName: { contains: query } },
        { awbNumber: { contains: query } },
      ];
    }

    const ordersFromDb = await prisma.order.findMany({
      where,
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
            gstin: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    // Format into standard PlacedOrder interface for UI consumption
    const formattedOrders = ordersFromDb.map((o) => ({
      id: o.orderNumber,
      dbId: o.id,
      createdAt: o.createdAt.toISOString(),
      source: (o.source as "studio" | "ready_made_storefront") || "studio",
      status: o.status,
      statusLabel: o.statusLabel || `Status: ${o.status.replace(/_/g, " ")}`,
      items: o.items.map((it) => {
        let parsedSpecs = "";
        try {
          if (it.specsJson) {
            const parsed = JSON.parse(it.specsJson);
            parsedSpecs = typeof parsed === "string" ? parsed : JSON.stringify(parsed);
          }
        } catch {
          parsedSpecs = it.specsJson || "";
        }

        return {
          id: it.id,
          productId: it.productId || "custom-product",
          title: it.productName,
          categoryName: it.categoryName || "Visiting Cards",
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          totalPrice: it.totalPrice,
          image: it.customDesignFront || "/images/hero-banner-1.png",
          branding: it.variantName || "Precision Laser Offset",
          specs: parsedSpecs || "Standard Print Specifications",
          isGstIncluded: it.isGstIncluded,
        };
      }),
      customer: {
        fullName: o.customerName,
        companyName: o.companyName || o.customerName || "Incredible Treasures Client",
        phone: o.customerPhone,
        email: o.customerEmail,
        address: o.shippingAddress,
        city: o.city,
        state: o.state,
        pincode: o.pincode,
        gstin: o.gstin || undefined,
      },
      pricing: {
        subtotal: o.subtotal,
        gstAmount: o.taxAmount,
        shippingFee: o.shippingFee,
        shippingTier: (o.shippingTier as "standard" | "priority_vip") || "standard",
        couponCode: o.couponCode || undefined,
        couponDiscount: o.discountAmount,
        grandTotal: o.totalAmount,
      },
      payment: {
        method: (o.paymentMethod as "upi" | "card" | "po") || "card",
        status: (o.paymentStatus as "PAID_ADVANCE" | "AWAITING_PAYMENT" | "PO_NET30") || "PAID_ADVANCE",
        referenceId: o.razorpayPaymentId || o.razorpayOrderId || "PAY-REF-INTERNAL",
        razorpayReady: Boolean(o.razorpayPaymentId || o.razorpayOrderId),
      },
      logistics: {
        courierPartner: o.courierPartner || "BlueDart Apex Air",
        awbNumber: o.awbNumber || `BD-${o.orderNumber.replace(/\D/g, "") || "017378"}`,
        courierTrackingUrl: o.courierTrackingUrl || `https://www.bluedart.com/tracking?handler=trak&numbers=${o.awbNumber || "017378"}`,
        courierHelpline: "1860 233 1234 (BlueDart Priority)",
        guaranteedDeliveryFormatted: o.guaranteedDeliveryFormatted || "2-3 Business Days",
        originFacility: "Incredible Treasures Offset Press Works • Bengaluru",
        destinationCity: o.destinationCity || o.city,
        cutoffCountdownText: "Airport Cargo Cutoff Active",
      },
    }));

    return NextResponse.json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error: any) {
    console.error("Error fetching database orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders from database" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Persist a new order directly into the database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id: requestedOrderNumber,
      source = "studio",
      customer,
      items,
      pricing,
      payment,
      logistics,
    } = body;

    if (!customer?.fullName || !customer?.email || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required order or customer details" },
        { status: 400 }
      );
    }

    const cleanEmail = customer.email.toLowerCase().trim();
    const orderNumber = requestedOrderNumber || `IT-PRINT-${Date.now().toString().slice(-6)}`;

    // 1. Upsert or find user in Database
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: customer.fullName.trim(),
          phone: customer.phone?.trim() || "+91 99450 39266",
          companyName: customer.companyName?.trim() || customer.fullName.trim(),
          gstin: customer.gstin?.trim().toUpperCase() || null,
          role: "CUSTOMER",
        },
      });
    }

    // 2. Insert Order and OrderItems in a transaction
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        source: source || "studio",
        customerName: customer.fullName.trim(),
        customerEmail: cleanEmail,
        customerPhone: customer.phone?.trim() || "+91 99450 39266",
        shippingAddress: customer.address?.trim() || "Address on File",
        city: customer.city?.trim() || "Bengaluru",
        state: customer.state?.trim() || "Karnataka",
        pincode: customer.pincode?.trim() || "560001",
        isB2B: Boolean(customer.gstin),
        companyName: customer.companyName?.trim() || null,
        gstin: customer.gstin?.trim().toUpperCase() || null,
        subtotal: pricing?.subtotal || items.reduce((sum: number, i: any) => sum + (i.totalPrice || 0), 0),
        taxAmount: pricing?.gstAmount || 0,
        cgstAmount: pricing?.cgstAmount || 0,
        sgstAmount: pricing?.sgstAmount || 0,
        igstAmount: pricing?.igstAmount || 0,
        shippingFee: pricing?.shippingFee || 0,
        shippingTier: pricing?.shippingTier || "standard",
        couponCode: pricing?.couponCode || null,
        discountAmount: pricing?.couponDiscount || 0,
        totalAmount: pricing?.grandTotal || items.reduce((sum: number, i: any) => sum + (i.totalPrice || 0), 0),
        status: "ORDER_CONFIRMED",
        statusLabel: "Order Confirmed & Pre-Flight Queued",
        paymentStatus: payment?.status || "PAID_ADVANCE",
        paymentMethod: payment?.method || "card",
        razorpayPaymentId: payment?.referenceId || null,
        razorpayOrderId: payment?.orderId || null,
        awbNumber: logistics?.awbNumber || `BD-${orderNumber.replace(/\D/g, "")}`,
        courierPartner: logistics?.courierPartner || "BlueDart Apex Air",
        courierTrackingUrl: logistics?.courierTrackingUrl || `https://www.bluedart.com/tracking?handler=trak&numbers=${logistics?.awbNumber || "017378"}`,
        destinationCity: customer.city || "Mumbai",
        guaranteedDeliveryFormatted: logistics?.guaranteedDeliveryFormatted || "2-3 Business Days",
        items: {
          create: items.map((it: any) => ({
            productId: it.productId || null,
            productName: it.title || "Custom Luxury Print Item",
            categoryName: it.categoryName || "Visiting Cards",
            variantName: it.branding || it.variantName || null,
            quantity: parseInt(it.quantity, 10) || 100,
            unitPrice: parseFloat(it.unitPrice) || 0,
            totalPrice: parseFloat(it.totalPrice) || 0,
            specsJson: typeof it.specs === "string" ? it.specs : JSON.stringify(it.specs || {}),
            customDesignFront: it.image || null,
            customDesignBack: it.imageBack || null,
            isGstIncluded: Boolean(it.isGstIncluded),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order successfully persisted to database",
      orderId: newOrder.orderNumber,
      dbId: newOrder.id,
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Error creating database order:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create order in database" },
      { status: 500 }
    );
  }
}
