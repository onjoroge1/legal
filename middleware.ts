import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname
  console.log("[Middleware] Processing path:", path)

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup' || path === '/'
  const isApiPath = path.startsWith('/api/')
  const isStaticPath = path.startsWith('/_next/') || path.includes('.')
  const isAdminPath = path.startsWith('/admin')
  
  console.log("[Middleware] Path analysis:", {
    isPublicPath,
    isApiPath,
    isStaticPath,
    isAdminPath,
    path
  })
  
  // Skip middleware for API routes and static files
  if (isApiPath || isStaticPath) {
    console.log("[Middleware] Skipping middleware for API/static path")
    return NextResponse.next()
  }

  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  console.log("[Middleware] Auth token present:", !!token)

  // If trying to access protected route without token, redirect to login
  if (!isPublicPath && !token) {
    console.log("[Middleware] No token for protected route, redirecting to login")
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  // If trying to access login/signup pages with token, redirect to dashboard
  if ((path === '/login' || path === '/signup') && token) {
    console.log("[Middleware] Token present for auth pages, redirecting to dashboard")
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // For admin routes, check if user has admin role
  if (isAdminPath) {
    if (!token) {
      console.log("[Middleware] No token for admin route, redirecting to login")
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is admin
    const isAdmin = token.isAdmin as boolean
    if (!isAdmin) {
      console.log("[Middleware] Non-admin user attempting to access admin route")
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    console.log("[Middleware] Admin route access granted")
    return NextResponse.next()
  }

  // Allow access to all other pages
  console.log("[Middleware] Proceeding with request")
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

