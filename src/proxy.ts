import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Better Auth uses these cookie names for the session token.
  // We check both local (HTTP) and production (HTTPS) variants.
  const hasSessionCookie = 
    request.cookies.has("better-auth.session_token") || 
    request.cookies.has("__Secure-better-auth.session_token");

  if (!hasSessionCookie) {
    // No session token -> push them to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Session token exists -> let them through!
  return NextResponse.next();
}

// NOTE: We removed "/explore" from the matcher so it is a public route!
export const config = {
  matcher: ["/items/manage", "/items/add"],
};
