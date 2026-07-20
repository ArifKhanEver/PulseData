import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PulseData — Next.js Edge Middleware (Route Protection)
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ARCHITECTURE NOTE
 * -----------------
 * Better Auth stores session state in a signed, HttpOnly cookie called
 * `better-auth.session_token`.  The middleware runs on the Edge runtime
 * where we cannot import Node.js modules (no DB, no crypto), so we use
 * cookie presence as a fast, lightweight first-pass guard.
 *
 * The full cryptographic session verification happens:
 *  • On the server — when a protected Server Component calls
 *    `auth.api.getSession({ headers: headers() })` (see layout guards).
 *  • On the API — when the Express backend calls the Better Auth
 *    /api/auth/get-session endpoint (see auth.middleware.ts).
 *
 * This two-layer model (Edge cookie-check + server-side verify) is the
 * pattern recommended by the Better Auth documentation for Next.js
 * App Router.
 *
 * PROTECTED ROUTE MATRIX
 * ─────────────────────────────────────────────────────────────────────────
 *  Prefix        | Auth required | Notes
 * ─────────────────────────────────────────────────────────────────────────
 *  /explore      | ✅            | Data browsing
 *  /items        | ✅            | Covers /items/add, /items/manage, etc.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * AUTH-ONLY ROUTES (redirect authenticated users away)
 * ─────────────────────────────────────────────────────────────────────────
 *  /login        | –             | Redirect → /explore when logged in
 *  /register     | –             | Redirect → /explore when logged in
 * ─────────────────────────────────────────────────────────────────────────
 */

// ── Route tables ─────────────────────────────────────────────────────────

/** Paths that require a session token. Prefix-matched. */
const PROTECTED_PREFIXES = ["/explore", "/items"] as const;

/** Paths that authenticated users should never visit. Exact or prefix. */
const AUTH_ONLY_ROUTES = ["/login", "/register"] as const;

/** Cookie name Better Auth uses for the session token */
const SESSION_COOKIE = "better-auth.session_token";

// ── Helpers ───────────────────────────────────────────────────────────────

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

// ── Middleware ────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read the session cookie — presence is the Edge-safe auth signal
  const sessionCookie = request.cookies.get(SESSION_COOKIE);
  const isAuthenticated = Boolean(sessionCookie?.value);

  // 1. Guard protected routes ────────────────────────────────────────────
  if (isProtected(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Preserve the intended destination so the login page can redirect back
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Bounce authenticated users away from login / register ────────────
  if (isAuthRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }

  return NextResponse.next();
}

// ── Matcher ──────────────────────────────────────────────────────────────

export const config = {
  /**
   * Run this middleware on every request EXCEPT:
   *  • Next.js internals (_next/static, _next/image)
   *  • The Better Auth API routes (/api/auth/**) — must be excluded to
   *    prevent an infinite redirect loop when the cookie is absent during
   *    the sign-in flow itself.
   *  • Static files (favicon, icons, images, etc.)
   *
   * The negative lookahead regex is the standard Next.js App Router
   * pattern from the official docs.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth).*)",
  ],
};
