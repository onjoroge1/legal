import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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
    "/api/payment/:path*",
  ],
}
