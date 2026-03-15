import { NextResponse } from "next/server"

// Try to import Prisma
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

/**
 * Sign document externally (via token)
 * POST /api/documents/sign-external
 */
export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { token, signature } = body

    if (!token || !signature) {
      return NextResponse.json(
        { error: "Token and signature are required" },
        { status: 400 }
      )
    }

    // Find document with this signing token
    const documents = await prisma.userDocument.findMany({
      where: {
        deletedAt: null,
      },
    })

    // Search through documents for the signing token
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
        { error: "Invalid signing request" },
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

    // Update signing request status
    const metadata = (document.metadata as any) || {}
    const signingRequests = metadata.signingRequests || []
    const updatedRequests = signingRequests.map((req: any) =>
      req.token === token
        ? {
            ...req,
            status: "signed",
            signature,
            signedAt: new Date().toISOString(),
          }
        : req
    )

    // Add signature to signatures array
    const signatures = metadata.signatures || []
    signatures.push({
      signerEmail: signingRequest.signerEmail,
      signerName: signingRequest.signerName,
      signature,
      signedAt: new Date().toISOString(),
    })

    metadata.signingRequests = updatedRequests
    metadata.signatures = signatures

    // Update document
    await prisma.userDocument.update({
      where: { id: document.id },
      data: {
        metadata,
        status: metadata.signatures?.length > 0 ? "signed" : document.status,
      },
    })

    return NextResponse.json({
      message: "Document signed successfully",
    })
  } catch (error) {
    console.error("Sign external error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}




