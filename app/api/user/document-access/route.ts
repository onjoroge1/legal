import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { hasAccessToDocument, isSubscriptionActive } from "@/lib/subscription"

/**
 * Check if user has access to a document
 * GET /api/user/document-access?slug=document_slug
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { hasAccess: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json(
        { hasAccess: false, error: "Document slug required" },
        { status: 400 }
      )
    }

    const access = await hasAccessToDocument(session.user.email, slug)
    const hasSubscription = await isSubscriptionActive(session.user.email)

    return NextResponse.json({
      hasAccess: access,
      hasSubscription,
    })
  } catch (error) {
    console.error("Document access API error:", error)
    return NextResponse.json(
      { hasAccess: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

