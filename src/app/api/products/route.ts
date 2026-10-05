import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        volumeTiers: {
          orderBy: {
            quantity: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: {
        displayOrder: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      meta: {
        company: "Incredible Treasures",
        gstin: "29AAKFI2392F1Z5",
        location: "Bangalore, India",
      },
      data: {
        categories,
        products: products.map((p) => ({
          ...p,
          images: JSON.parse(p.images),
        })),
      },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve product catalog" },
      { status: 500 }
    );
  }
}
