import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from './auth-server'
import { compare } from "bcryptjs"

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
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
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
      }
      console.log("[Auth] Session callback - session:", session)
      return session
    },
    async jwt({ token, user }) {
      console.log("[Auth] JWT callback - token:", token)
      console.log("[Auth] JWT callback - user:", user)
      
      const email = token.email
      if (typeof email !== 'string') {
        return token;
      }

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
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        isAdmin: dbUser.isAdmin,
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