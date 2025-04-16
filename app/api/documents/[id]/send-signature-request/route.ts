import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sign } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Get document and its parties
    const document = await prisma.document.findUnique({
      where: { id: params.id },
      include: {
        parties: true,
      },
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Generate signing links for each party
    const signingLinks = document.parties.map(party => {
      const token = sign(
        {
          documentId: document.id,
          partyId: party.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
        },
        JWT_SECRET
      )

      return {
        partyId: party.id,
        email: party.email,
        link: `${process.env.NEXT_PUBLIC_APP_URL}/sign/${token}`,
      }
    })

    // Send emails with signing links
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signingLinks,
        documentTitle: document.title,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send signature requests')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Send Signature Request] Error:', error)
    return NextResponse.json(
      { error: 'Failed to send signature requests' },
      { status: 500 }
    )
  }
} 