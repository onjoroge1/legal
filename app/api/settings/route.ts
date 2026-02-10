import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not set up yet
  console.log("Prisma not available - settings will return mock data")
}

/**
 * Get user settings
 * GET /api/settings
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // If Prisma is available, fetch real data
    if (prisma) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: {
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
            activeSessions: true,
          },
        })

        if (!user) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          )
        }

        // Parse JSON fields if they're stored as strings
        const emailNotifications = typeof user.emailNotifications === 'string' 
          ? JSON.parse(user.emailNotifications || '{}')
          : user.emailNotifications || {
              documentUpdates: true,
              billingNotifications: true,
              newFeatures: true,
              marketingEmails: false,
            }

        const inAppNotifications = typeof user.inAppNotifications === 'string'
          ? JSON.parse(user.inAppNotifications || '{}')
          : user.inAppNotifications || {
              documentReminders: true,
              teamActivity: true,
            }

        const activeSessions = typeof user.activeSessions === 'string'
          ? JSON.parse(user.activeSessions || '[]')
          : user.activeSessions || []

        return NextResponse.json({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          company: user.company || "",
          businessName: user.businessName || "",
          businessType: user.businessType || "",
          businessId: user.businessId || "",
          businessAddress: user.businessAddress || "",
          businessCity: user.businessCity || "",
          businessState: user.businessState || "",
          businessZip: user.businessZip || "",
          defaultDocumentFormat: user.defaultDocumentFormat || "PDF",
          autoSaveEnabled: user.autoSaveEnabled ?? true,
          defaultLanguage: user.defaultLanguage || "English (US)",
          timezone: user.timezone || "UTC",
          emailNotifications,
          inAppNotifications,
          twoFactorEnabled: user.twoFactorEnabled ?? false,
          activeSessions,
        })
      } catch (error) {
        console.error("Database error:", error)
        // Fall through to mock data
      }
    }

    // Return mock/default data if Prisma is not available
    return NextResponse.json({
      firstName: "",
      lastName: "",
      company: "",
      businessName: "",
      businessType: "",
      businessId: "",
      businessAddress: "",
      businessCity: "",
      businessState: "",
      businessZip: "",
      defaultDocumentFormat: "PDF",
      autoSaveEnabled: true,
      defaultLanguage: "English (US)",
      timezone: "UTC",
      emailNotifications: {
        documentUpdates: true,
        billingNotifications: true,
        newFeatures: true,
        marketingEmails: false,
      },
      inAppNotifications: {
        documentReminders: true,
        teamActivity: true,
      },
      twoFactorEnabled: false,
      activeSessions: [],
    })
  } catch (error) {
    console.error("Settings API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Update user settings
 * PATCH /api/settings
 */
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // If Prisma is available, update real data
    if (prisma) {
      try {
        // Build update data object
        const updateData: any = {}

        // Profile fields
        if (body.firstName !== undefined) updateData.firstName = body.firstName
        if (body.lastName !== undefined) updateData.lastName = body.lastName
        if (body.company !== undefined) updateData.company = body.company

        // Update the main `name` field when firstName or lastName changes
        if (body.firstName !== undefined || body.lastName !== undefined) {
          // Get current values to combine them
          const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { firstName: true, lastName: true }
          })
          
          const firstName = body.firstName !== undefined ? body.firstName : (currentUser?.firstName || "")
          const lastName = body.lastName !== undefined ? body.lastName : (currentUser?.lastName || "")
          
          // Combine firstName and lastName into name
          const fullName = [firstName, lastName].filter(Boolean).join(" ").trim()
          if (fullName) {
            updateData.name = fullName
          }
        }

        // Business fields
        if (body.businessName !== undefined) updateData.businessName = body.businessName
        if (body.businessType !== undefined) updateData.businessType = body.businessType
        if (body.businessId !== undefined) updateData.businessId = body.businessId
        if (body.businessAddress !== undefined) updateData.businessAddress = body.businessAddress
        if (body.businessCity !== undefined) updateData.businessCity = body.businessCity
        if (body.businessState !== undefined) updateData.businessState = body.businessState
        if (body.businessZip !== undefined) updateData.businessZip = body.businessZip

        // Account preferences
        if (body.defaultDocumentFormat !== undefined) updateData.defaultDocumentFormat = body.defaultDocumentFormat
        if (body.autoSaveEnabled !== undefined) updateData.autoSaveEnabled = body.autoSaveEnabled
        if (body.defaultLanguage !== undefined) updateData.defaultLanguage = body.defaultLanguage
        if (body.timezone !== undefined) updateData.timezone = body.timezone

        // Notifications (store as JSON string)
        if (body.emailNotifications !== undefined) {
          updateData.emailNotifications = JSON.stringify(body.emailNotifications)
        }
        if (body.inAppNotifications !== undefined) {
          updateData.inAppNotifications = JSON.stringify(body.inAppNotifications)
        }

        // Security
        if (body.twoFactorEnabled !== undefined) updateData.twoFactorEnabled = body.twoFactorEnabled
        if (body.activeSessions !== undefined) {
          updateData.activeSessions = JSON.stringify(body.activeSessions)
        }

        // Update user
        await prisma.user.update({
          where: { email: session.user.email },
          data: updateData,
        })

        return NextResponse.json({
          message: "Settings updated successfully",
        })
      } catch (error) {
        console.error("Database error:", error)
        return NextResponse.json(
          { error: "Failed to update settings" },
          { status: 500 }
        )
      }
    }

    // If Prisma is not available, return success (for development)
    return NextResponse.json({
      message: "Settings updated successfully (database not configured)",
    })
  } catch (error) {
    console.error("Settings API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

