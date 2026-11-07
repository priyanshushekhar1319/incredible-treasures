import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_MASTER_EMAIL = process.env.ADMIN_MASTER_EMAIL || "admin@incredibletreasures.com";
const ADMIN_MASTER_PASSWORD = process.env.ADMIN_MASTER_PASSWORD || "IncredibleAdmin@2026";
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "incredible_admin_master_secret_2026_xyz";

// In-Memory Rate Limiting & Brute Force Shield
interface AttemptRecord {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, AttemptRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
const WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minute sliding window

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

// GET /api/auth/admin - Verify admin session
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("it_admin_jwt")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false, error: "No active session token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as any;
    if (decoded && (decoded.role === "SUPER_ADMIN" || decoded.role === "PRESS_MANAGER")) {
      return NextResponse.json({
        authenticated: true,
        role: decoded.role,
        adminName: "Owner / Master Operator",
        facility: decoded.facility || "Bengaluru Master Press Works",
        expiresAt: decoded.exp,
      });
    }

    return NextResponse.json({ authenticated: false, error: "Unauthorized role" }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false, error: "Session expired or invalid" }, { status: 401 });
  }
}

// POST /api/auth/admin - Login with PIN or Password with Brute-Force Shield
export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  const now = Date.now();

  // 1. Check Rate Limit / Lockout
  const record = loginAttempts.get(clientIp);
  if (record && record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return NextResponse.json(
      {
        success: false,
        error: `Security Lockout: Too many failed attempts. Try again in ${remainingSeconds} seconds.`,
        locked: true,
        remainingSeconds,
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    const cleanEmail = typeof email === "string" ? email.toLowerCase().trim() : "";
    const cleanPassword = typeof password === "string" ? password.trim() : "";

    const isEmailValid = cleanEmail === ADMIN_MASTER_EMAIL.toLowerCase();
    const isPasswordValid = cleanPassword === ADMIN_MASTER_PASSWORD;

    if (!isEmailValid || !isPasswordValid) {
      // Record failed attempt
      const current = record || { count: 0, lastAttempt: now };
      if (now - current.lastAttempt > WINDOW_DURATION_MS) {
        current.count = 1;
      } else {
        current.count += 1;
      }
      current.lastAttempt = now;

      if (current.count >= MAX_FAILED_ATTEMPTS) {
        current.lockedUntil = now + LOCKOUT_DURATION_MS;
      }

      loginAttempts.set(clientIp, current);

      const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - current.count);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin email or password. Access Denied.",
          attemptsRemaining: attemptsLeft,
          locked: current.count >= MAX_FAILED_ATTEMPTS,
        },
        { status: 401 }
      );
    }

    // Success: Reset rate limit record for this IP
    loginAttempts.delete(clientIp);

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
      { success: false, error: "Server authentication error" },
      { status: 500 }
    );
  }
}

// DELETE /api/auth/admin - Secure Logout
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session destroyed",
  });

  response.cookies.delete("it_admin_jwt");
  return response;
}
