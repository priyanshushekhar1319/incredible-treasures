import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "incredible_admin_master_secret_2026_xyz";

export interface DecodedAdminToken {
  role: "SUPER_ADMIN" | "PRESS_MANAGER";
  facility?: string;
  authorizedAt: string;
  exp?: number;
  iat?: number;
}

/**
 * Validates whether the incoming request contains a valid Super Admin JWT.
 * Checks both the HTTP-only cookie `it_admin_jwt` and the `Authorization: Bearer <token>` header.
 */
export function verifyAdminSessionFromRequest(request: NextRequest): {
  authorized: boolean;
  decoded?: DecodedAdminToken;
  error?: string;
} {
  try {
    // 1. Check HTTP-only cookie
    let token = request.cookies.get("it_admin_jwt")?.value;

    // 2. Fallback to Authorization Header
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7).trim();
      }
    }

    if (!token) {
      return { authorized: false, error: "Missing admin security token" };
    }

    const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as DecodedAdminToken;

    if (!decoded || (decoded.role !== "SUPER_ADMIN" && decoded.role !== "PRESS_MANAGER")) {
      return { authorized: false, error: "Insufficient operational privileges" };
    }

    return { authorized: true, decoded };
  } catch (err: any) {
    return { authorized: false, error: err?.message || "Invalid or expired admin security token" };
  }
}

