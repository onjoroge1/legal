import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { requireEmergencyFeature } from "@/lib/feature-flags"
import { requireLegalDisclaimerAcceptance } from "@/lib/legal-disclaimer-server"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  console.log("Prisma not available")
}

/**
 * Sign a document
 * POST /api/documents/sign
 */
export async function POST(request: Request) {
  try {
    const acceptanceError = requireLegalDisclaimerAcceptance(request)
    if (acceptanceError) return acceptanceError
    const featureError = requireEmergencyFeature(
      "ENABLE_ELECTRONIC_SIGNING",
      "Electronic signing"
    )
    if (featureError) return featureError

    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { documentId, signature } = body

    if (!documentId || !signature) {
      return NextResponse.json(
        { error: "Document ID and signature are required" },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get document
    const document = await prisma.userDocument.findFirst({
      where: {
        id: documentId,
        userId: user.id,
      },
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Get or initialize metadata
    const documentMetadata = (document.metadata as any) || {}
    const existingSignatures = documentMetadata.signatures || []
    
    // Check if already signed
    const existingSignature = existingSignatures.find((sig: any) => sig.userId === user.id)

    if (existingSignature) {
      return NextResponse.json(
        { error: "Document already signed by this user" },
        { status: 400 }
      )
    }

    // Add new signature
    const updatedSignatures = [
      ...existingSignatures,
      {
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        signature,
        signedAt: new Date().toISOString(),
      },
    ]

    // Update document metadata with signing info
    const updatedMetadata = {
      ...documentMetadata,
      signatures: updatedSignatures,
      signedAt: new Date().toISOString(),
      signedBy: user.email,
    }

    await prisma.userDocument.update({
      where: { id: documentId },
      data: { 
        metadata: updatedMetadata,
        status: "signed",
      },
    })

    return NextResponse.json({
      message: "Document signed successfully",
    })
  } catch (error) {
    console.error("Sign document error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
