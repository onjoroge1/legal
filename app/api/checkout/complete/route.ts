import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { getDocumentByLegacySlug } from "@/lib/document-catalog"

/**
 * Complete checkout - Create account/login and save document
 * POST /api/checkout/complete
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, slug, paymentType } = body

    if (!email || !slug) {
      return NextResponse.json(
        { error: "Email and document slug are required" },
        { status: 400 }
      )
    }

    // Get document data from sessionStorage (passed from frontend)
    const formData = body.formData || {}
    const intent = body.intent || null

    // Check if user is already signed in via session
    const session = await getServerSession(authOptions)
    let user = session?.user?.email 
      ? await prisma.user.findUnique({
          where: { email: session.user.email },
        })
      : null

    // If not signed in, check if user exists by email
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email },
      })
    }

    // User should be signed in at this point (handled in frontend)
    // But if not, we'll use the email to find/create user
    if (!user) {
      return NextResponse.json(
        { error: "User must be signed in to complete checkout" },
        { status: 401 }
      )
    }

    // Get document content from request or generate it
    let documentContent = body.documentContent

    if (!documentContent) {
      // Import the generation logic directly
      try {
        const { generateText } = await import("ai")
        const { google } = await import("@ai-sdk/google")
        const { getDocumentPrompt } = await import("@/lib/document-prompts")
        
        const document = getDocumentByLegacySlug(slug)
        if (!document) {
          return NextResponse.json(
            { error: "Document not found" },
            { status: 404 }
          )
        }

        const currentDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        const documentSpecificInstructions = getDocumentPrompt(slug, intent)

        const result = await generateText({
          model: google("gemini-2.0-flash"),
          prompt: `Generate a complete, professional, legally compliant ${document.title} based on these details:

${Object.entries(formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}

REQUIREMENTS:
- Write a complete, formal legal document with proper section numbering
- Include ${formData.STATE || formData.state || "California"}-specific legal citations and statutes
- Use proper legal language and formatting
- Include all standard sections for a ${document.title}
- Reference actual ${formData.STATE || formData.state || "California"} statutes where applicable
- Make it professionally formatted and ready to sign
- Use the current date: ${currentDate}
- Follow these document-specific instructions: ${documentSpecificInstructions}

Output ONLY the document text. No commentary before or after.`,
        })

        documentContent = result.text
      } catch (error) {
        console.error("Error generating document:", error)
        return NextResponse.json(
          { error: "Failed to generate document" },
          { status: 500 }
        )
      }
    }

    // Get document info
    const document = getDocumentBySlug(slug)

    // Save document to user's account
    const savedDocument = await prisma.userDocument.create({
      data: {
        userId: user.id,
        title: document?.title || slug,
        type: document?.title || slug,
        category: document?.category || "business",
        content: documentContent || "",
        status: "completed",
        metadata: {
          formData,
          slug,
          intent,
          generatedAt: new Date().toISOString(),
          paymentType,
          purchasedAt: new Date().toISOString(),
        },
      },
    })

    // If subscription, update subscription fields on the User record
    if (paymentType === "subscription") {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionTier: "professional",
          subscriptionStatus: "active",
        },
      })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      document: {
        id: savedDocument.id,
        title: savedDocument.title,
      },
    })
  } catch (error) {
    console.error("Checkout completion error:", error)
    return NextResponse.json(
      { error: "Failed to complete checkout" },
      { status: 500 }
    )
  }
}

