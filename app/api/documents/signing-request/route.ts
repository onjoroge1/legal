import { NextResponse } from "next/server"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  console.log("Prisma not available")
}

/**
 * Get signing request by token
 * GET /api/documents/signing-request?token=...
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { error: "Signing token is required" },
        { status: 400 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    // Find document with this signing token
    const documents = await prisma.userDocument.findMany({
      where: {
        deletedAt: null,
      },
    })

    // Search through documents for the signing token in metadata
    let signingRequest: any = null
    let document: any = null

    for (const doc of documents) {
      const metadata = (doc.metadata as any) || {}
      const signingRequests = metadata.signingRequests || []
      const request = signingRequests.find((req: any) => req.token === token)

      if (request) {
        signingRequest = request
        document = doc
        break
      }
    }

    if (!signingRequest || !document) {
      return NextResponse.json(
        { error: "Invalid or expired signing request" },
        { status: 404 }
      )
    }

    // Check if expired
    if (new Date(signingRequest.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "This signing request has expired" },
        { status: 400 }
      )
    }

    // Check if already signed
    if (signingRequest.status === "signed") {
      return NextResponse.json(
        { error: "This document has already been signed" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      document: {
        id: document.id,
        title: document.title,
        content: document.content,
        signerName: signingRequest.signerName,
        signerEmail: signingRequest.signerEmail,
      },
    })
  } catch (error) {
    console.error("Get signing request error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

