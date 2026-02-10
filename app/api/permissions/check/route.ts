import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getUserPermissions, canPerformAction, canAccessTemplate } from "@/lib/permissions"

/**
 * Check user permissions
 * GET /api/permissions/check?action=generate&templateType=advanced
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

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")
    const templateType = searchParams.get("templateType") as "basic" | "advanced" | "all" | null
    const permission = searchParams.get("permission")

    // Get all permissions
    const permissions = await getUserPermissions(session.user.email)

    // If checking a specific action
    if (action) {
      const allowed = await canPerformAction(
        session.user.email,
        action as "generate" | "download" | "preview" | "collaborate" | "customize" | "ai-review"
      )
      return NextResponse.json({
        allowed,
        permissions,
      })
    }

    // If checking template access
    if (templateType) {
      const allowed = await canAccessTemplate(session.user.email, templateType)
      return NextResponse.json({
        allowed,
        permissions,
      })
    }

    // If checking a specific permission
    if (permission) {
      const allowed = permissions[permission as keyof typeof permissions] === true
      return NextResponse.json({
        allowed,
        permissions,
      })
    }

    // Return all permissions
    return NextResponse.json({
      permissions,
    })
  } catch (error) {
    console.error("Permissions check error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

