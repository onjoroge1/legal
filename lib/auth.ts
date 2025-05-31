import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from './auth-server'
import { compare } from "bcryptjs"
import { NextResponse } from "next/server"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      isAdmin: boolean
    }
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 15 * 60, // 15 minutes - session will be updated if it's older than this
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[Auth] Attempting to authorize with credentials:", { email: credentials?.email })
        
        if (!credentials?.email || !credentials?.password) {
          console.log("[Auth] Missing credentials")
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            isAdmin: true,
          },
        })

        if (!user) {
          console.log("[Auth] User not found:", credentials.email)
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        console.log("[Auth] Password validation result:", isPasswordValid)

        if (!isPasswordValid) {
          console.log("[Auth] Invalid password for user:", credentials.email)
          return null
        }

        console.log("[Auth] Successfully authorized user:", user.email)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      console.log("[Auth] Session callback - token:", token)
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          isAdmin: token.isAdmin as boolean,
        }
        // Add expiration time to session
        session.expires = new Date((token.exp as number) * 1000).toISOString()
      }
      console.log("[Auth] Session callback - session:", session)
      return session
    },
    async jwt({ token, user, account, trigger }) {
      console.log("[Auth] JWT callback - token:", token)
      console.log("[Auth] JWT callback - user:", user)
      console.log("[Auth] JWT callback - account:", account)
      
      // If this is an initial sign in
      if (account && user) {
        const typedUser = user as { id: string; email: string; name: string; isAdmin: boolean }
        return {
          ...token,
          id: typedUser.id,
          email: typedUser.email,
          name: typedUser.name,
          isAdmin: typedUser.isAdmin,
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour from now
        }
      }

      // If the token is about to expire, refresh it
      if (token.exp && typeof token.exp === 'number' && Date.now() / 1000 > token.exp - 300) { // 5 minutes before expiration
        return {
          ...token,
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // Extend by 1 hour
        }
      }

      const email = token.email
      if (typeof email !== 'string') {
        return token;
      }

      // Always fetch the latest user data from the database
      const dbUser = await prisma.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          isAdmin: true,
        },
      })

      if (!dbUser) {
        return token
      }

      // Always use the database user ID and data
      return {
        ...token,
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        isAdmin: dbUser.isAdmin,
        exp: (token.exp as number) || Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour from now
      }
    },
    async redirect({ url, baseUrl }) {
      console.log("[Auth] Redirect callback - url:", url)
      console.log("[Auth] Redirect callback - baseUrl:", baseUrl)
      
      // Allow redirects to the same origin
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      // Default to dashboard for external URLs
      return `${baseUrl}/dashboard`
    },
  },
  events: {
    async signIn(message) {
      console.log("[Auth] Sign in event:", message)
    },
    async signOut(message) {
      console.log("[Auth] Sign out event:", message)
    },
    async session(message) {
      console.log("[Auth] Session event:", message)
    },
  },
}

export async function logoutUser() {
  return NextResponse.json({ success: true })
} 