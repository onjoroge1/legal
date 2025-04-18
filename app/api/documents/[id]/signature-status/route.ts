import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get document with its parties and signatures
    const document = await prisma.document.findUnique({
      where: { id: params.id },
      include: {
        parties: true,
        signatures: {
          select: {
            id: true,
            signedAt: true,
            userId: true,
          },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Transform the data to include signature status
    const signatureStatus = document.parties.map(party => {
      const partySignature = document.signatures.find(sig => sig.userId === party.id)
      return {
        id: party.id,
        name: party.name,
        email: party.email,
        type: party.type,
        signed: !!partySignature,
        signedAt: partySignature?.signedAt || null,
      }
    })

    return NextResponse.json({
      documentId: document.id,
      documentTitle: document.title,
      status: signatureStatus,
      allSigned: signatureStatus.every(party => party.signed),
    })
  } catch (error) {
    console.error('[Signature Status] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch signature status' },
      { status: 500 }
    )
  }
} 