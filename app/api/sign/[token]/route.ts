import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: Request, props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  try {
    // Verify the token
    const decoded = verify(params.token, JWT_SECRET) as {
      documentId: string
      partyId: string
      exp: number
    }

    // Check if token is expired
    if (decoded.exp < Date.now() / 1000) {
      return NextResponse.json(
        { error: 'Signing link has expired' },
        { status: 401 }
      )
    }

    // Fetch document and party
    const document = await prisma.document.findUnique({
      where: { id: decoded.documentId },
      select: {
        id: true,
        title: true,
        content: true,
      },
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    const party = await prisma.documentParty.findUnique({
      where: {
        id: decoded.partyId,
        documentId: decoded.documentId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        email: true,
      },
    })

    if (!party) {
      return NextResponse.json(
        { error: 'Party not found' },
        { status: 404 }
      )
    }

    // Check if party has already signed
    const existingSignature = await prisma.documentSignature.findFirst({
      where: {
        documentId: decoded.documentId,
        userId: party.id, // Using party.id as userId since this is a public signing flow
      },
    })

    return NextResponse.json({
      document,
      party: {
        ...party,
        signed: !!existingSignature,
        signedAt: existingSignature?.signedAt,
      },
    })
  } catch (error) {
    console.error('[Sign API] Error:', error)
    return NextResponse.json(
      { error: 'Invalid signing link' },
      { status: 401 }
    )
  }
}

export async function POST(request: Request, props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  try {
    // Verify the token
    const decoded = verify(params.token, JWT_SECRET) as {
      documentId: string
      partyId: string
      exp: number
    }

    // Check if token is expired
    if (decoded.exp < Date.now() / 1000) {
      return NextResponse.json(
        { error: 'Signing link has expired' },
        { status: 401 }
      )
    }

    const { signature } = await request.json()

    // Check if signature already exists
    const existingSignature = await prisma.documentSignature.findFirst({
      where: {
        documentId: decoded.documentId,
        userId: decoded.partyId,
      },
    })

    let updatedSignature
    if (existingSignature) {
      // Update existing signature
      updatedSignature = await prisma.documentSignature.update({
        where: { id: existingSignature.id },
        data: {
          signature,
          signedAt: new Date(),
        },
      })
    } else {
      // Create new signature
      updatedSignature = await prisma.documentSignature.create({
        data: {
          documentId: decoded.documentId,
          userId: decoded.partyId,
          signature,
          signedAt: new Date(),
        },
      })
    }

    return NextResponse.json(updatedSignature)
  } catch (error) {
    console.error('[Sign API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to save signature' },
      { status: 500 }
    )
  }
} 