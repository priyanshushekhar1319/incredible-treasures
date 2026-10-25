import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const design = await prisma.savedDesign.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, companyName: true },
        },
      },
    });

    if (!design) {
      return NextResponse.json(
        { success: false, error: "Design not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      design: {
        ...design,
        frontElements: JSON.parse(design.frontElements),
        backElements: JSON.parse(design.backElements),
      },
    });
  } catch (error) {
    console.error("Error fetching design by ID:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch design" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.savedDesign.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting design by ID:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete design" },
      { status: 500 }
    );
  }
}
