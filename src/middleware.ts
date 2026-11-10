import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Big-Tech Stealth Protection for /admin route:
  // If the visitor does not possess an authorized it_admin_token cookie,
  // silently rewrite the route to 404 (Not Found).
  // The visitor sees a standard 404 page, preventing any knowledge that /admin exists.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const adminToken = request.cookies.get("it_admin_token")?.value;

    if (!adminToken) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

