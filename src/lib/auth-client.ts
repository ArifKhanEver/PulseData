import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client — used in Client Components and the Navbar.
 *
 * `baseURL` must point to the Next.js origin that hosts /api/auth/*.
 * We prefer the public env var; fall back to the same origin ("")
 * so it works in both local dev (localhost:3000) and production without
 * any additional configuration.
 *
 * NOTE: NEXT_PUBLIC_APP_URL is the correct variable name (not
 * NEXT_PUBLIC_BETTER_AUTH_URL) because this is the URL of *this* app,
 * not the external auth service.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "",
});
