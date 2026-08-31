import { headers } from "next/headers"
import { z } from "zod"
import { prisma } from "./prisma"

const storedSessionSchema = z.object({
  id: z.string().uuid(),
  deviceName: z.string(),
  browser: z.string(),
  os: z.string(),
  location: z.string(),
  lastActive: z.string().datetime(),
})

export type StoredSession = z.infer<typeof storedSessionSchema>
export type DisplaySession = StoredSession & { isCurrent: boolean }

export function parseActiveSessions(value: string | null | undefined): StoredSession[] {
  if (!value) return []
  try {
    const result = z.array(storedSessionSchema).safeParse(JSON.parse(value))
    return result.success ? result.data : []
  } catch {
    return []
  }
}

export function serializeActiveSessions(sessions: StoredSession[]): string {
  return JSON.stringify(sessions)
}

export function hasActiveSession(value: string | null | undefined, sessionId: string): boolean {
  return parseActiveSessions(value).some((session) => session.id === sessionId)
}

function getDeviceInfo(userAgent: string): Pick<StoredSession, "browser" | "os" | "deviceName"> {
  let browser = "Unknown"
  let os = "Unknown"
  let deviceName = "Unknown Device"

  if (userAgent.includes("Edg/")) browser = "Edge"
  else if (userAgent.includes("Chrome")) browser = "Chrome"
  else if (userAgent.includes("Firefox")) browser = "Firefox"
  else if (userAgent.includes("Safari")) browser = "Safari"

  if (userAgent.includes("Android")) {
    os = "Android"
    deviceName = "Android Device"
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    os = "iOS"
    deviceName = userAgent.includes("iPad") ? "iPad" : "iPhone"
  } else if (userAgent.includes("Windows")) {
    os = "Windows"
    deviceName = "Windows PC"
  } else if (userAgent.includes("Mac")) {
    os = "macOS"
    deviceName = "Mac"
  } else if (userAgent.includes("Linux")) {
    os = "Linux"
    deviceName = "Linux PC"
  }

  return { browser, os, deviceName }
}

export async function trackSession(userId: string, sessionId: string): Promise<void> {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const { browser, os, deviceName } = getDeviceInfo(userAgent)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { activeSessions: true },
  })

  if (!user) throw new Error("Authenticated user no longer exists")

  const sessionInfo: StoredSession = {
    id: sessionId,
    deviceName,
    browser,
    os,
    location: "Unknown Location",
    lastActive: new Date().toISOString(),
  }
  const sessions = parseActiveSessions(user.activeSessions)
    .filter((session) => session.id !== sessionId)
    .concat(sessionInfo)
    .sort((a, b) => Date.parse(b.lastActive) - Date.parse(a.lastActive))
    .slice(0, 10)

  await prisma.user.update({
    where: { id: userId },
    data: { activeSessions: serializeActiveSessions(sessions) },
  })
}

export async function removeTrackedSession(userId: string, sessionId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { activeSessions: true },
  })
  if (!user) return

  await prisma.user.update({
    where: { id: userId },
    data: {
      activeSessions: serializeActiveSessions(
        parseActiveSessions(user.activeSessions).filter((session) => session.id !== sessionId)
      ),
    },
  })
}
