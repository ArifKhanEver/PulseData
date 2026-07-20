import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protected routes — any path that begins with one of these prefixes
 * requires a valid Better Auth session token. Unauthenticated visitors
 * are redirected to /login with a `callbackUrl` query param so they
 * land back on their intended page after signing in.
 */
const PROTECTED_PREFIXES = ["/explore", "/items", "/manage", "/add"];

/**
 * Routes that logged-in users should NOT be able to visit
 * (redirect them away to the explore page instead).
 */
const AUTH_ONLY_ROUTES = ["/login", "/register"];

/**
 * Better Auth stores the session token in a cookie whose name is
 * `better-auth.session_token`. We treat its presence as the fast
 * "is-authenticated" signal inside the Edge runtime — no DB round-trip.
 *
 * ⚠ This is a lightweight guard, not a cryptographic verification.
 *    The full session validation (expiry, revocation) happens on the
 *    server when the request hits a protected API or Server Component.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("better-auth.session_token");
  const isAuthenticated = Boolean(sessionToken?.value);

  // ── 1. Redirect unauthenticated users away from protected pages ──
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. Redirect logged-in users away from auth pages ─────────────
  const isAuthPage = AUTH_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Run middleware on all routes EXCEPT:
   *  - Static assets (_next/static, _next/image, favicon, etc.)
   *  - The Better Auth API handler itself (/api/auth/*)
   *  - The health route
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|api/health).*)",
  ],
};
