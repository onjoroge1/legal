import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

/**
 * Middleware to protect dashboard, admin pages, and authenticated API routes.
 *
 * - Dashboard pages (/dashboard/*) redirect unauthenticated users to /login.
 * - Admin pages (/admin/*) require authentication + admin email.
 * - Protected API routes return 401 JSON responses when no session exists.
 * - Public routes (/, /login, /signup, /documents, /api/auth/*, /api/templates/*) pass through.
 */

const ADMIN_EMAIL = "kim.njo@gmail.com"

// API route prefixes that require authentication
const PROTECTED_API_PREFIXES = [
  "/api/dashboard",
  "/api/billing",
  "/api/payment",
  "/api/settings",
  "/api/team",
  "/api/documents",
  "/api/admin",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow all public routes to pass through without checking auth.
  // The matcher config below already excludes most static/public paths,
  // but we add explicit checks here for clarity and safety.

  // Public page routes
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/documents" ||
    pathname.startsWith("/documents/")
  ) {
    return NextResponse.next()
  }

  // Public API routes
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/templates") ||
    pathname.match(/^\/api\/documents\/[^/]+\/generate$/)
  ) {
    return NextResponse.next()
  }

  // For all remaining matched routes, check for a valid JWT token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // --- Admin pages (email-gated) ---
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
    if (token.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  }

  // --- Admin API routes (email-gated) ---
  if (pathname.startsWith("/api/admin")) {
    if (!token || token.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }
    return NextResponse.next()
  }

  // --- Protected dashboard pages ---
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // --- Protected API routes ---
  const isProtectedApi = PROTECTED_API_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (isProtectedApi) {
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }
    return NextResponse.next()
  }

  // Everything else: allow through
  return NextResponse.next()
}

/**
 * Matcher config limits which routes the middleware runs on.
 * This avoids running middleware on static files, images, and other assets.
 */
export const config = {
  matcher: [
    // Match all dashboard pages
    "/dashboard/:path*",
    // Match admin pages
    "/admin/:path*",
    // Match protected API routes
    "/api/admin/:path*",
    "/api/dashboard/:path*",
    "/api/billing/:path*",
    "/api/payment/:path*",
    "/api/settings/:path*",
    "/api/team/:path*",
    "/api/documents/:path*",
  ],
}
