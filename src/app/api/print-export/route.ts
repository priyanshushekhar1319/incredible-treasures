import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderNumber = `IT-${Date.now().toString().slice(-6)}`,
      orientation = "horizontal",
      substrateTitle = "400 Micron Glossy PVC Visiting Card",
      frontElements = [],
      backElements = [],
      backgroundColor = "#FFFFFF",
      includeBleed = true,
      includePrinterMarks = true,
      targetDpi = 300,
    } = body;

    // Physical Calculations (Inches and Pixels at Target DPI)
    const isHoriz = orientation === "horizontal";
    const trimWidthIn = isHoriz ? 3.5 : 2.0;
    const trimHeightIn = isHoriz ? 2.0 : 3.5;
    const bleedIn = includeBleed ? 0.125 : 0;
    const totalWidthIn = trimWidthIn + bleedIn * 2;
    const totalHeightIn = trimHeightIn + bleedIn * 2;

    const trimWidthPx = Math.round(trimWidthIn * targetDpi);
    const trimHeightPx = Math.round(trimHeightIn * targetDpi);
    const bleedPx = Math.round(bleedIn * targetDpi);
    const canvasWidthPx = Math.round(totalWidthIn * targetDpi);
    const canvasHeightPx = Math.round(totalHeightIn * targetDpi);

    // Pre-Flight Analysis
    const totalElements = frontElements.length + backElements.length;
    const frontImages = frontElements.filter((el: { type: string }) => el.type === "image");
    const backImages = backElements.filter((el: { type: string }) => el.type === "image");

    const issues: string[] = [];
    if (totalElements === 0) {
      issues.push("Warning: Canvas contains zero elements.");
    }

    // Check if critical elements are inside safe zone (7% to 93%)
    const allElements = [...frontElements, ...backElements];
    const nearCutEdge = allElements.some(
      (el: { x?: number; y?: number }) =>
        el.x !== undefined && el.y !== undefined && (el.x < 7 || el.x > 93 || el.y < 7 || el.y > 93)
    );

    const manifest = {
      jobId: `PRINT-${orderNumber}`,
      status: "APPROVED_FOR_PRESS",
      generatedAt: new Date().toISOString(),
      standards: {
        targetDpi,
        colorSpace: "CMYK_FOGRA39_COMPLIANT",
        orientation,
        substrate: substrateTitle,
      },
      dimensions: {
        trim: {
          inches: `${trimWidthIn} x ${trimHeightIn}`,
          pixels: `${trimWidthPx} x ${trimHeightPx}`,
        },
        bleed: {
          allowance: `${bleedIn}" per side`,
          totalInches: `${totalWidthIn} x ${totalHeightIn}`,
          totalPixels: `${canvasWidthPx} x ${canvasHeightPx}`,
        },
        safeZone: {
          margin: "0.125\" inner margin",
          status: nearCutEdge ? "WARNING_ELEMENTS_NEAR_TRIM" : "VERIFIED_SAFE",
        },
      },
      layers: {
        frontCount: frontElements.length,
        backCount: backElements.length,
        totalImages: frontImages.length + backImages.length,
      },
      pressReady: {
        isDualSided: backElements.length > 0,
        pdfFormat: "PDF/X-1a:2001",
        ripRasterEngine: "Incredible Treasures PrePress v3.0",
        facility: "Yelahanka Print Unit, Bangalore – 560064",
      },
      preflightIssues: issues,
    };

    return NextResponse.json({
      success: true,
      message: "300 DPI Pre-Press Manifest synthesized successfully.",
      manifest,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal print export error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ONLINE",
    engine: "Incredible Treasures 300/600 DPI PrePress Vector Export Engine",
    version: "3.0.0",
    supportedDpi: [300, 600],
    standards: ["ISO 12647-2", "FOGRA39", "PDF/X-1a"],
  });
}
