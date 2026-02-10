import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * NextAuth API Route Handler
 * Handles all authentication requests
 * 
 * Route: /api/auth/[...nextauth]
 * This catch-all route handles:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/session
 * - /api/auth/callback/...
 */
const handler = NextAuth(authOptions)

// NextAuth v4 with Next.js App Router
// Export as named exports for GET and POST
export { handler as GET, handler as POST }

