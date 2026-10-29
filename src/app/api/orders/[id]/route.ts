import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/orders/[id] - Fetch single order
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { id },
          { orderNumber: id },
          { awbNumber: id },
        ],
      },
      include: {
        items: true,
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Update order status or logistics (AWB, courier)
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, statusLabel, awbNumber, courierPartner, courierTrackingUrl } = body;

    const existingOrder = await prisma.order.findFirst({
      where: {
        OR: [
          { id },
          { orderNumber: id },
        ],
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.order.update({
      where: { id: existingOrder.id },
      data: {
        ...(status ? { status } : {}),
        ...(statusLabel ? { statusLabel } : {}),
        ...(awbNumber ? { awbNumber: awbNumber.trim().toUpperCase() } : {}),
        ...(courierPartner ? { courierPartner } : {}),
        ...(courierTrackingUrl ? { courierTrackingUrl } : {}),
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully in database",
      order: updated,
    });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
