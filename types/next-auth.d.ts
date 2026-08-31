import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & { id: string }
    sessionId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    sessionId?: string
    jwtVersion?: number
    revoked?: boolean
  }
}
