import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function proxy(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token && token.revoked !== true,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    // Document generate and chat are intentionally PUBLIC — users must be able to
    // see the generated document before being asked to sign up / pay (value-first flow).
    // Only protect save, download, signing, and AI-analyze (which accesses user data).
    "/api/documents/draft/:path*",
    "/api/documents/download/:path*",
    "/api/documents/sign/:path*",
    "/api/documents/sign-external/:path*",
    "/api/documents/send-for-signature/:path*",
    "/api/documents/signing-request/:path*",
    "/api/documents/ai-analyze/:path*",
    "/api/documents/by-id/:path*",
    "/api/billing/:path*",
    "/api/subscription/:path*",
    "/api/team/:path*",
    "/api/settings/:path*",
    "/api/notifications/:path*",
    "/api/permissions/:path*",
    "/api/user/:path*",
    // NOTE: /api/payment/create-checkout is intentionally PUBLIC — it supports
    // guest checkout (P4). Only the webhook is public by necessity (Stripe signs it).
    // No other payment sub-routes exist that need user-only protection,
    // so the entire /api/payment/* wildcard is removed.
    // If you add authenticated-only payment endpoints in the future, list them explicitly here.
  ],
}
