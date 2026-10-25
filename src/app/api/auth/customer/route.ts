import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/auth/customer - Fetch customer profile and stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email && !id) {
      return NextResponse.json(
        { success: false, error: "Email or User ID required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: email ? { email } : { id: id! },
      include: {
        _count: {
          select: {
            savedDesigns: true,
            orders: true,
          },
        },
        savedDesigns: {
          orderBy: { updatedAt: "desc" },
          take: 10,
        },
        orders: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/auth/customer - Sign in or update customer profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, phone, companyName, gstin } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await prisma.user.upsert({
      where: { email: cleanEmail },
      update: {
        ...(name ? { name: name.trim() } : {}),
        ...(phone ? { phone: phone.trim() } : {}),
        ...(companyName ? { companyName: companyName.trim() } : {}),
        ...(gstin ? { gstin: gstin.trim().toUpperCase() } : {}),
      },
      create: {
        email: cleanEmail,
        name: name?.trim() || "Mahi Kapoor",
        phone: phone?.trim() || "+91 99450 39266",
        companyName: companyName?.trim() || "Incredible Treasures Luxury Studio",
        gstin: gstin?.trim().toUpperCase() || "29AAKFI2392F1Z5",
      },
      include: {
        _count: {
          select: {
            savedDesigns: true,
            orders: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Customer authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Error authenticating customer:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
