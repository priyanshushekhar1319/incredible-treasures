import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_MASTER_PIN = process.env.ADMIN_MASTER_PIN || "9945";
const ADMIN_MASTER_PASSWORD = process.env.ADMIN_MASTER_PASSWORD || "IncredibleAdmin@2026";
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "incredible_admin_master_secret_2026_xyz";

// GET /api/auth/admin - Verify admin session
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("it_admin_jwt")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as any;
    if (decoded && decoded.role === "SUPER_ADMIN") {
      return NextResponse.json({
        authenticated: true,
        role: "SUPER_ADMIN",
        adminName: "Owner / Master Operator",
        expiresAt: decoded.exp,
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

// POST /api/auth/admin - Login with PIN or Password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin, password } = body;

    const isPinValid = pin && pin.trim() === ADMIN_MASTER_PIN;
    const isPasswordValid = password && password.trim() === ADMIN_MASTER_PASSWORD;

    if (!isPinValid && !isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Security PIN or Master Password. Access Denied.",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        role: "SUPER_ADMIN",
        facility: "Bengaluru Master Press Works",
        authorizedAt: new Date().toISOString(),
      },
      ADMIN_JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Owner Backoffice Terminal Unlocked",
      role: "SUPER_ADMIN",
      token,
    });

    response.cookies.set("it_admin_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin authentication error:", error);
    return NextResponse.json(
      { success: false, error: "Server authentication failed" },
      { status: 500 }
    );
  }
}

// DELETE /api/auth/admin - Logout
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session cleared",
  });

  response.cookies.delete("it_admin_jwt");
  return response;
}
