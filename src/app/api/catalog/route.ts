import { NextRequest, NextResponse } from "next/server";
import { ALL_PRODUCTS, CatalogProduct } from "@/data/products";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const CATALOG_FILE_PATH = path.join(process.cwd(), "public", "uploads", "custom_catalog.json");

// Helper to read server-persisted catalog or fallback to ALL_PRODUCTS
async function getStoredCatalog(): Promise<CatalogProduct[]> {
  try {
    const raw = await readFile(CATALOG_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // If file doesn't exist yet, return default ALL_PRODUCTS
  }
  return ALL_PRODUCTS;
}

// Helper to save catalog to server disk
async function persistCatalog(products: CatalogProduct[]): Promise<void> {
  try {
    await writeFile(CATALOG_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write custom_catalog.json:", err);
  }
}

// GET /api/catalog - List all products
export async function GET() {
  try {
    const catalog = await getStoredCatalog();
    return NextResponse.json({ success: true, count: catalog.length, products: catalog });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/catalog - Upsert a product
export async function POST(request: NextRequest) {
  try {
    const body: CatalogProduct = await request.json();
    if (!body || !body.title) {
      return NextResponse.json({ success: false, error: "Invalid product data" }, { status: 400 });
    }

    const current = await getStoredCatalog();
    const id = body.id || `prod-${Date.now()}`;
    const productToSave: CatalogProduct = {
      ...body,
      id,
      isActive: body.isActive !== false,
    };

    const idx = current.findIndex((p) => p.id === id);
    let updated: CatalogProduct[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = productToSave;
    } else {
      updated = [productToSave, ...current];
    }

    await persistCatalog(updated);
    return NextResponse.json({ success: true, product: productToSave, count: updated.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/catalog?id=... - Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing product ID" }, { status: 400 });
    }

    const current = await getStoredCatalog();
    const updated = current.filter((p) => p.id !== id);
    await persistCatalog(updated);

    return NextResponse.json({ success: true, count: updated.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

