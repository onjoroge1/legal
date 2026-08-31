import { randomUUID } from "crypto"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { hasActiveSession, removeTrackedSession, trackSession } from "./session-tracker"

const nextAuthSecret = process.env.NEXTAUTH_SECRET
if (process.env.NODE_ENV === "production" && !nextAuthSecret) {
  throw new Error("NEXTAUTH_SECRET must be configured in production")
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.trim().toLowerCase() },
          select: {
            id: true, email: true, password: true, name: true,
            firstName: true, lastName: true, image: true,
          },
        })
        if (!user?.password || !(await bcrypt.compare(credentials.password, user.password))) return null

        const displayName = user.name
          || [user.firstName, user.lastName].filter(Boolean).join(" ").trim()
          || user.email.split("@")[0]
          || "User"
        return { id: user.id, email: user.email, name: displayName, image: user.image }
      },
    }),
  ],
  pages: { signIn: "/login", signOut: "/", error: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { jwtVersion: true },
        })
        if (!dbUser) {
          token.revoked = true
          return token
        }

        const sessionId = randomUUID()
        await trackSession(user.id, sessionId)
        token.id = user.id
        token.sessionId = sessionId
        token.jwtVersion = dbUser.jwtVersion
        token.email = user.email
        token.name = user.name
        token.picture = user.image || token.picture
      } else if (token.id && token.sessionId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { jwtVersion: true, activeSessions: true },
        })
        if (!dbUser || dbUser.jwtVersion !== token.jwtVersion || !hasActiveSession(dbUser.activeSessions, token.sessionId)) {
          token.revoked = true
          return token
        }
      } else {
        // Tokens issued before per-session identifiers were introduced must sign in again.
        token.revoked = true
        return token
      }

      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { name: true, firstName: true, lastName: true, image: true },
        })
        if (!dbUser) {
          token.revoked = true
          return token
        }
        token.name = dbUser.name
          || [dbUser.firstName, dbUser.lastName].filter(Boolean).join(" ").trim()
          || token.name
        token.picture = dbUser.image || token.picture
      }
      return token
    },
    async session({ session, token }) {
      if (token.revoked) {
        return { ...session, user: undefined, sessionId: undefined }
      }
      if (session.user && token.id && token.sessionId) {
        session.user.id = token.id
        session.user.email = token.email || ""
        session.user.name = token.name
        session.user.image = token.picture
        session.sessionId = token.sessionId
      }
      return session
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.id && token.sessionId) {
        await removeTrackedSession(token.id, token.sessionId)
      }
    },
  },
  secret: nextAuthSecret,
  debug: process.env.NODE_ENV === "development",
}
