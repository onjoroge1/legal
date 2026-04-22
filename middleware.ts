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
    "/api/documents/:path*",
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
