import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { parseActiveSessions } from "@/lib/session-tracker"

const emailNotificationsSchema = z.object({
  documentUpdates: z.boolean(),
  billingNotifications: z.boolean(),
  newFeatures: z.boolean(),
  marketingEmails: z.boolean(),
})
const inAppNotificationsSchema = z.object({
  documentReminders: z.boolean(),
  teamActivity: z.boolean(),
})
const shortText = z.string().trim().max(200)
const updateSettingsSchema = z.object({
  firstName: shortText.optional(), lastName: shortText.optional(), company: shortText.optional(),
  businessName: shortText.optional(), businessType: shortText.optional(), businessId: shortText.optional(),
  businessAddress: shortText.optional(), businessCity: shortText.optional(),
  businessState: shortText.optional(), businessZip: shortText.optional(),
  defaultDocumentFormat: z.enum(["PDF", "DOCX", "Both"]).optional(),
  autoSaveEnabled: z.boolean().optional(), defaultLanguage: shortText.optional(), timezone: shortText.optional(),
  emailNotifications: emailNotificationsSchema.optional(),
  inAppNotifications: inAppNotificationsSchema.optional(),
}).strict()

const defaultEmailNotifications = {
  documentUpdates: true, billingNotifications: true, newFeatures: true, marketingEmails: false,
}
const defaultInAppNotifications = { documentReminders: true, teamActivity: true }

function parsePreference<T>(value: string | null, schema: z.ZodType<T>, fallback: T): T {
  if (!value) return fallback
  try {
    const result = schema.safeParse(JSON.parse(value))
    return result.success ? result.data : fallback
  } catch {
    return fallback
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email || !session.sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        firstName: true, lastName: true, company: true, businessName: true,
        businessType: true, businessId: true, businessAddress: true, businessCity: true,
        businessState: true, businessZip: true, defaultDocumentFormat: true,
        autoSaveEnabled: true, defaultLanguage: true, timezone: true,
        emailNotifications: true, inAppNotifications: true, activeSessions: true,
      },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    return NextResponse.json({
      ...user,
      firstName: user.firstName || "", lastName: user.lastName || "", company: user.company || "",
      businessName: user.businessName || "", businessType: user.businessType || "",
      businessId: user.businessId || "", businessAddress: user.businessAddress || "",
      businessCity: user.businessCity || "", businessState: user.businessState || "", businessZip: user.businessZip || "",
      emailNotifications: parsePreference(user.emailNotifications, emailNotificationsSchema, defaultEmailNotifications),
      inAppNotifications: parsePreference(user.inAppNotifications, inAppNotificationsSchema, defaultInAppNotifications),
      activeSessions: parseActiveSessions(user.activeSessions).map((item) => ({
        ...item, isCurrent: item.id === session.sessionId,
      })),
    })
  } catch (error) {
    console.error("Settings API error:", error)
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const input = updateSettingsSchema.parse(await request.json())
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { firstName: true, lastName: true },
    })
    if (!currentUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const firstName = input.firstName ?? currentUser.firstName ?? ""
    const lastName = input.lastName ?? currentUser.lastName ?? ""
    const { emailNotifications, inAppNotifications, ...scalarSettings } = input
    const data = {
      ...scalarSettings,
      ...(emailNotifications && { emailNotifications: JSON.stringify(emailNotifications) }),
      ...(inAppNotifications && { inAppNotifications: JSON.stringify(inAppNotifications) }),
      ...((input.firstName !== undefined || input.lastName !== undefined) && {
        name: [firstName, lastName].filter(Boolean).join(" ").trim() || session.user.name || "User",
      }),
    }

    await prisma.user.update({ where: { email: session.user.email }, data })
    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid settings", details: error.errors }, { status: 400 })
    }
    console.error("Settings API error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
