import { NextRequest, NextResponse } from "next/server";
import { INITIAL_HERO_BANNERS, HeroBannerItem } from "@/data/banners";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const BANNERS_FILE_PATH = path.join(process.cwd(), "public", "uploads", "custom_banners.json");

async function getStoredBanners(): Promise<HeroBannerItem[]> {
  try {
    const raw = await readFile(BANNERS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Return default initial banners if file doesn't exist
  }
  return INITIAL_HERO_BANNERS;
}

async function persistBanners(banners: HeroBannerItem[]): Promise<void> {
  try {
    await writeFile(BANNERS_FILE_PATH, JSON.stringify(banners, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write custom_banners.json:", err);
  }
}

// GET /api/marketing/banners
export async function GET() {
  try {
    const banners = await getStoredBanners();
    console.log("GET /api/marketing/banners loaded count:", banners?.length);
    return NextResponse.json({ success: true, count: banners.length, banners });
  } catch (error: any) {
    console.error("GET /api/marketing/banners error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/marketing/banners - Upsert banner
export async function POST(request: NextRequest) {
  try {
    const body: HeroBannerItem = await request.json();
    if (!body || !body.title) {
      return NextResponse.json({ success: false, error: "Invalid banner data" }, { status: 400 });
    }

    const current = await getStoredBanners();
    const id = body.id || `banner-${Date.now()}`;
    const bannerToSave: HeroBannerItem = {
      ...body,
      id,
      isActive: body.isActive !== false,
    };

    const idx = current.findIndex((b) => b.id === id);
    let updated: HeroBannerItem[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = bannerToSave;
    } else {
      updated = [bannerToSave, ...current];
    }

    await persistBanners(updated);
    return NextResponse.json({ success: true, banner: bannerToSave, count: updated.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/marketing/banners?id=...
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing banner ID" }, { status: 400 });
    }

    const current = await getStoredBanners();
    const updated = current.filter((b) => b.id !== id);
    await persistBanners(updated);

    return NextResponse.json({ success: true, count: updated.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

