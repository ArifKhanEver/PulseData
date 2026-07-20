/**
 * ─────────────────────────────────────────────────────────────────────────
 *  Server-Side Auth Guard — Protected Pages Layout
 * ─────────────────────────────────────────────────────────────────────────
 *
 * This is a Next.js App Router Server Component layout that wraps the
 * /explore and /items/* pages.
 *
 * WHY THIS FILE EXISTS
 * ────────────────────
 * The Edge middleware (middleware.ts) provides a fast, cookie-based first-
 * pass guard. However, cookies can theoretically be tampered with by the
 * client, and the Edge runtime cannot perform DB queries. This layout adds
 * a SECOND, cryptographically verified layer of protection using Better
 * Auth's server-side `auth.api.getSession()` method, which:
 *
 *  1. Validates the session token signature.
 *  2. Checks the session's expiry date against the database.
 *  3. Returns the real, trusted user object (or null).
 *
 * If the session is invalid, this layout calls Next.js `redirect('/login')`
 * — a hard server-side 307 redirect that the browser cannot bypass.
 *
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────
 *  src/app/
 *    (protected)/
 *      layout.tsx          ← THIS FILE (server-side auth guard)
 *      explore/
 *        page.tsx          ← moved here (still works, same URL /explore)
 *      items/
 *        ...               ← moved here (still works, same URL /items/*)
 *
 * NOTE: Route groups (parentheses in folder names) do NOT affect the URL.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session verification — this is the cryptographic check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // No valid session → hard server redirect (cannot be bypassed by the client)
  if (!session) {
    redirect("/login");
  }

  // Session is valid — render the protected page
  return <>{children}</>;
}
