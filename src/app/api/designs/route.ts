import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/designs - Fetch saved designs for user or guest session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const sessionId = searchParams.get("sessionId");
    const email = searchParams.get("email");

    let whereClause: any = {};

    if (userId) {
      whereClause.userId = userId;
    } else if (email) {
      whereClause.user = { email };
    } else if (sessionId) {
      whereClause.sessionId = sessionId;
    }

    const designs = await prisma.savedDesign.findMany({
      where: whereClause,
      orderBy: { updatedAt: "desc" },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
      },
    });

    const parsedDesigns = designs.map((d) => {
      let parsedFront = [];
      let parsedBack = [];
      try {
        parsedFront = typeof d.frontElements === "string" ? JSON.parse(d.frontElements) : d.frontElements;
      } catch {
        parsedFront = [];
      }
      try {
        parsedBack = typeof d.backElements === "string" ? JSON.parse(d.backElements) : d.backElements;
      } catch {
        parsedBack = [];
      }

      return {
        ...d,
        frontElements: parsedFront,
        backElements: parsedBack,
      };
    });

    return NextResponse.json({
      success: true,
      count: parsedDesigns.length,
      designs: parsedDesigns,
    });
  } catch (error) {
    console.error("Error fetching saved designs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch saved designs" },
      { status: 500 }
    );
  }
}

// POST /api/designs - Create or update a saved design with full serialized canvas state
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      userId,
      email,
      sessionId,
      name,
      productSlug = "visiting-cards",
      substrateId = "pvc-regular-glossy",
      orientation = "horizontal",
      cornerStyle = "square",
      backgroundColor = "#FFFFFF",
      gildedEdge = false,
      cardTexture = "smooth",
      frontElements = [],
      backElements = [],
      frontBgImage,
      backBgImage,
      frontBgOpacity = 1.0,
      backBgOpacity = 1.0,
      frontBgFit = "cover",
      backBgFit = "cover",
      previewFront,
      previewBack,
    } = body;

    let resolvedUserId = userId;
    if (!resolvedUserId && email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (existingUser) {
        resolvedUserId = existingUser.id;
      }
    }

    const serializedFront = typeof frontElements === "string" ? frontElements : JSON.stringify(frontElements);
    const serializedBack = typeof backElements === "string" ? backElements : JSON.stringify(backElements);

    const designPayload = {
      name: name?.trim() || "Untitled Luxury Visiting Card",
      productSlug,
      substrateId,
      orientation,
      cornerStyle,
      backgroundColor,
      gildedEdge: Boolean(gildedEdge),
      cardTexture,
      frontElements: serializedFront,
      backElements: serializedBack,
      frontBgImage: frontBgImage || null,
      backBgImage: backBgImage || null,
      frontBgOpacity: Number(frontBgOpacity) || 1.0,
      backBgOpacity: Number(backBgOpacity) || 1.0,
      frontBgFit: frontBgFit || "cover",
      backBgFit: backBgFit || "cover",
      previewFront: previewFront || null,
      previewBack: previewBack || null,
      sessionId: sessionId || null,
    };

    let savedDesign;

    // If an existing ID is provided, check if it exists and update
    if (id) {
      const existing = await prisma.savedDesign.findUnique({ where: { id } });
      if (existing) {
        savedDesign = await prisma.savedDesign.update({
          where: { id },
          data: {
            ...designPayload,
            ...(resolvedUserId ? { userId: resolvedUserId } : {}),
            updatedAt: new Date(),
          },
        });
      }
    }

    if (!savedDesign) {
      savedDesign = await prisma.savedDesign.create({
        data: {
          ...designPayload,
          userId: resolvedUserId || null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Design saved successfully",
      design: {
        ...savedDesign,
        frontElements: JSON.parse(savedDesign.frontElements),
        backElements: JSON.parse(savedDesign.backElements),
      },
    });
  } catch (error) {
    console.error("Error saving design:", error);
    return NextResponse.json(
      { success: false, error: "Failed to persist design to cloud storage" },
      { status: 500 }
    );
  }
}

// DELETE /api/designs - Delete a design by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Design ID is required" },
        { status: 400 }
      );
    }

    await prisma.savedDesign.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting design:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete saved design" },
      { status: 500 }
    );
  }
}
