import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    console.log("[Document Draft] Starting draft creation process")
    const session = await getServerSession(authOptions)
    console.log("[Document Draft] Session:", session ? "Found" : "Not found")
    
    if (!session?.user?.id) {
      console.log("[Document Draft] No session found, returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Document Draft] User ID:", session.user.id)
    const body = await req.json()
    const { 
      templateId,
      formData,
      status 
    } = body
    console.log("[Document Draft] Request body:", { templateId, status, formDataKeys: Object.keys(formData) })

    // Get template details
    console.log("[Document Draft] Fetching template:", templateId)
    const template = await prisma.documentTemplate.findUnique({
      where: { id: templateId }
    })
    console.log("[Document Draft] Template found:", template ? "Yes" : "No")

    if (!template) {
      console.log("[Document Draft] Template not found, returning 404")
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Create a draft document
    console.log("[Document Draft] Creating draft document")
    const document = await prisma.document.create({
      data: {
        title: `${template.name} - Draft`,
        type: template.type,
        description: "Draft document",
        content: JSON.stringify(formData), // Store form data as JSON
        state: status,
        status: "draft",
        userId: session.user.id,
        templateId,
      },
    })
    console.log("[Document Draft] Draft document created with ID:", document.id)

    return NextResponse.json({ 
      id: document.id,
      message: "Draft saved successfully"
    })
  } catch (error) {
    console.error("[Document Draft] Error:", error instanceof Error ? error.message : 'Unknown error')
    console.error("[Document Draft] Full error:", error)
    return NextResponse.json(
      { error: "Failed to save draft" },
      { status: 500 }
    )
  }
} 