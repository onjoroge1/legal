import { headers } from "next/headers"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("./prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not available
}

interface SessionInfo {
  id: string
  deviceName: string
  browser: string
  os: string
  location: string
  lastActive: string
  isCurrent: boolean
}

/**
 * Get device information from user agent
 */
function getDeviceInfo(userAgent: string): { browser: string; os: string; deviceName: string } {
  // Simple user agent parsing
  let browser = "Unknown"
  let os = "Unknown"
  let deviceName = "Unknown Device"

  if (userAgent.includes("Chrome")) browser = "Chrome"
  else if (userAgent.includes("Firefox")) browser = "Firefox"
  else if (userAgent.includes("Safari")) browser = "Safari"
  else if (userAgent.includes("Edge")) browser = "Edge"

  if (userAgent.includes("Windows")) {
    os = "Windows"
    deviceName = "Windows PC"
  } else if (userAgent.includes("Mac")) {
    os = "macOS"
    deviceName = "Mac"
  } else if (userAgent.includes("Linux")) {
    os = "Linux"
    deviceName = "Linux PC"
  } else if (userAgent.includes("Android")) {
    os = "Android"
    deviceName = "Android Device"
  } else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    os = "iOS"
    deviceName = userAgent.includes("iPad") ? "iPad" : "iPhone"
  }

  return { browser, os, deviceName }
}

/**
 * Get location from IP (simplified - in production, use a geolocation service)
 */
async function getLocation(ip: string): Promise<string> {
  // In production, use a service like ipapi.co, ip-api.com, or MaxMind
  // For now, return a placeholder
  if (ip === "::1" || ip === "127.0.0.1") {
    return "Local"
  }
  return "Unknown Location"
}

/**
 * Track or update a user session
 */
export async function trackSession(
  userId: string,
  sessionId: string,
  userAgent?: string,
  ip?: string
): Promise<void> {
  if (!prisma) return

  try {
    const headersList = await headers()
    const ua = userAgent || headersList.get("user-agent") || ""
    const clientIp = ip || headersList.get("x-forwarded-for")?.split(",")[0] || 
                     headersList.get("x-real-ip") || "unknown"

    const { browser, os, deviceName } = getDeviceInfo(ua)
    const location = await getLocation(clientIp)

    // Get current user sessions
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { activeSessions: true },
    })

    let activeSessions: SessionInfo[] = typeof user?.activeSessions === 'string'
      ? JSON.parse(user.activeSessions || '[]')
      : user?.activeSessions || []

    // Check if session already exists
    const existingSessionIndex = activeSessions.findIndex((s: SessionInfo) => s.id === sessionId)

    const sessionInfo: SessionInfo = {
      id: sessionId,
      deviceName,
      browser,
      os,
      location,
      lastActive: new Date().toISOString(),
      isCurrent: true,
    }

    if (existingSessionIndex >= 0) {
      // Update existing session
      activeSessions[existingSessionIndex] = {
        ...activeSessions[existingSessionIndex],
        ...sessionInfo,
      }
    } else {
      // Mark all other sessions as not current
      activeSessions = activeSessions.map((s: SessionInfo) => ({
        ...s,
        isCurrent: false,
      }))
      // Add new session
      activeSessions.push(sessionInfo)
    }

    // Limit to last 10 sessions
    activeSessions = activeSessions
      .sort((a: SessionInfo, b: SessionInfo) => 
        new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      )
      .slice(0, 10)

    // Update user's active sessions
    await prisma.user.update({
      where: { id: userId },
      data: { activeSessions: JSON.stringify(activeSessions) },
    })
  } catch (error) {
    console.error("Session tracking error:", error)
    // Don't throw - session tracking shouldn't break the app
  }
}




