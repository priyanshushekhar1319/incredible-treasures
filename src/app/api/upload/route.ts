import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // 1. Multipart Form Data (Native File Upload)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || ".jpg";
      const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const safeName = `${baseName}-${Date.now()}${ext}`;
      const uploadPath = path.join(process.cwd(), "public", "uploads", safeName);

      await writeFile(uploadPath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${safeName}`,
        name: safeName,
        size: buffer.length,
      });
    }

    // 2. JSON Base64 Upload Fallback
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { data, name = "upload.jpg" } = body;

      if (!data) {
        return NextResponse.json({ success: false, error: "Missing image data" }, { status: 400 });
      }

      const match = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ success: false, error: "Invalid data URL format" }, { status: 400 });
      }

      const buffer = Buffer.from(match[2], "base64");
      const ext = path.extname(name) || ".jpg";
      const baseName = path.basename(name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const safeName = `${baseName}-${Date.now()}${ext}`;
      const uploadPath = path.join(process.cwd(), "public", "uploads", safeName);

      await writeFile(uploadPath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${safeName}`,
        name: safeName,
        size: buffer.length,
      });
    }

    return NextResponse.json({ success: false, error: "Unsupported Content-Type" }, { status: 400 });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to upload file" }, { status: 500 });
  }
}

