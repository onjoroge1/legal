import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log("[SETTINGS_GET] No session or user ID")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get user settings
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        firstName: true,
        lastName: true,
        company: true,
        businessName: true,
        businessType: true,
        businessId: true,
        businessAddress: true,
        businessCity: true,
        businessState: true,
        businessZip: true,
        defaultDocumentFormat: true,
        autoSaveEnabled: true,
        defaultLanguage: true,
        timezone: true,
        emailNotifications: true,
        inAppNotifications: true,
        twoFactorEnabled: true,
        activeSessions: true
      }
    })

    if (!user) {
      console.log("[SETTINGS_GET] User not found")
      return new NextResponse("User not found", { status: 404 })
    }

    // Transform JSON fields and ensure defaults
    const settings = {
      ...user,
      firstName: user.firstName || user.name?.split(' ')[0] || '',
      lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
      emailNotifications: user.emailNotifications ? JSON.parse(user.emailNotifications as string) : {
        documentUpdates: true,
        billingNotifications: true,
        newFeatures: true,
        marketingEmails: false
      },
      inAppNotifications: user.inAppNotifications ? JSON.parse(user.inAppNotifications as string) : {
        documentReminders: true,
        teamActivity: true
      },
      activeSessions: user.activeSessions ? JSON.parse(user.activeSessions as string) : []
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("[SETTINGS_GET] Error:", error instanceof Error ? error.message : 'Unknown error')
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log("[SETTINGS_PATCH] No session or user ID")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    
    // Transform the data to match the database schema
    const userData = {
      ...(body.firstName && { firstName: body.firstName }),
      ...(body.lastName && { lastName: body.lastName }),
      ...(body.company && { company: body.company }),
      ...(body.businessName && { businessName: body.businessName }),
      ...(body.businessType && { businessType: body.businessType }),
      ...(body.businessId && { businessId: body.businessId }),
      ...(body.businessAddress && { businessAddress: body.businessAddress }),
      ...(body.businessCity && { businessCity: body.businessCity }),
      ...(body.businessState && { businessState: body.businessState }),
      ...(body.businessZip && { businessZip: body.businessZip }),
      ...(body.defaultDocumentFormat && { defaultDocumentFormat: body.defaultDocumentFormat }),
      ...(typeof body.autoSaveEnabled === 'boolean' && { autoSaveEnabled: body.autoSaveEnabled }),
      ...(body.defaultLanguage && { defaultLanguage: body.defaultLanguage }),
      ...(body.timezone && { timezone: body.timezone }),
      ...(body.emailNotifications && { emailNotifications: JSON.stringify(body.emailNotifications) }),
      ...(body.inAppNotifications && { inAppNotifications: JSON.stringify(body.inAppNotifications) }),
      ...(typeof body.twoFactorEnabled === 'boolean' && { twoFactorEnabled: body.twoFactorEnabled }),
      ...(body.activeSessions && { activeSessions: JSON.stringify(body.activeSessions) })
    }

    // Update name if both firstName and lastName are provided
    if (body.firstName && body.lastName) {
      userData.name = `${body.firstName} ${body.lastName}`
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: userData
    })

    if (!user) {
      console.log("[SETTINGS_PATCH] User not found")
      return new NextResponse("User not found", { status: 404 })
    }

    // Transform JSON fields back to objects for the response
    const settings = {
      ...user,
      emailNotifications: user.emailNotifications ? JSON.parse(user.emailNotifications as string) : null,
      inAppNotifications: user.inAppNotifications ? JSON.parse(user.inAppNotifications as string) : null,
      activeSessions: user.activeSessions ? JSON.parse(user.activeSessions as string) : null
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("[SETTINGS_PATCH] Error:", error instanceof Error ? error.message : 'Unknown error')
    return new NextResponse("Internal Error", { status: 500 })
  }
} 