import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthSecret = process.env.NEXTAUTH_SECRET
if (process.env.NODE_ENV === "production" && !nextAuthSecret) {
  throw new Error("NEXTAUTH_SECRET must be configured in production")
}

// Try to import Prisma and bcrypt - will be undefined if not set up yet
let prisma: any
let bcrypt: any
let PrismaAdapter: any

try {
  const prismaModule = require("./prisma")
  prisma = prismaModule.prisma
  const adapterModule = require("@next-auth/prisma-adapter")
  PrismaAdapter = adapterModule.PrismaAdapter
} catch (error) {
  // Prisma not set up yet - will work once database is configured
  console.log("Prisma adapter not available - auth will work once database is configured")
}

try {
  bcrypt = require("bcryptjs")
} catch (error) {
  // bcryptjs not installed yet
  console.log("bcryptjs not available - install with: npm install bcryptjs")
}

/**
 * NextAuth configuration
 * This file exports the auth options for NextAuth.js
 * 
 * Works with or without Prisma - automatically uses Prisma when available
 */
export const authOptions: NextAuthOptions = {
  // Use Prisma adapter if available
  ...(prisma && PrismaAdapter ? { adapter: PrismaAdapter(prisma) } : {}),
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if Prisma and bcrypt are available
        if (!prisma || !bcrypt) {
          console.error("Database not configured. Please set up Prisma and bcryptjs.")
          return null
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              firstName: true,
              lastName: true,
              image: true,
            }
          })
          
          if (!user || !user.password) {
            return null
          }
          
          // Verify password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )
          
          if (!isValidPassword) {
            return null
          }
          
          // Use name if available, otherwise combine firstName and lastName
          const displayName = user.name || 
            [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || 
            user.email?.split("@")[0] || 
            "User"
          
          // Return user object for session
          return {
            id: user.id,
            email: user.email,
            name: displayName,
            image: user.image || undefined,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    }),
    // Add OAuth providers here when ready:
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
  ],
  
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = (user as any).image || token.picture
        // Embed current jwt version so we can invalidate tokens on session revoke
        if (prisma) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { id: user.id },
              select: { jwtVersion: true },
            })
            token.jwtVersion = dbUser?.jwtVersion ?? 0
          } catch {}
        }
      }

      // On every request, verify the token version hasn't been revoked
      if (!user && prisma && token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { jwtVersion: true },
          })
          if (dbUser && dbUser.jwtVersion !== token.jwtVersion) {
            // Version mismatch — session was revoked; return null to force sign-out
            return null as any
          }
        } catch {}
      }

      // Refresh user data from database on session update (e.g., after profile update)
      if (trigger === "update" && prisma && token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
            select: { name: true, firstName: true, lastName: true, image: true }
          })

          if (dbUser) {
            token.name = dbUser.name || [dbUser.firstName, dbUser.lastName].filter(Boolean).join(" ").trim() || token.name
            token.picture = dbUser.image || token.picture
          }
        } catch (error) {
          console.error("Error refreshing user data in JWT:", error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as typeof session.user & { id: string }
        sessionUser.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string | undefined
      }
      return session
    },
  },
  
  secret: nextAuthSecret,
  
  // Add error handling
  debug: process.env.NODE_ENV === "development",
  
  // Ensure callbacks handle errors gracefully
  events: {
    async signIn({ user }) {
      // Track session on sign in
      if (prisma && user?.id) {
        try {
          const { trackSession } = require("./session-tracker")
          await trackSession(user.id, user.id) // Use user ID as session ID
        } catch (error) {
          console.error("Session tracking error:", error)
        }
      }
    },
    async signOut() {
      // Optional: log sign out events
    },
  },
}
