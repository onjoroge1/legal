import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
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

    const { partyId, signature } = await request.json()

    if (!partyId || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create or update the signature
    const updatedSignature = await prisma.documentSignature.upsert({
      where: {
        documentId_userId: {
          documentId: params.id,
          userId: partyId,
        },
      },
      create: {
        documentId: params.id,
        userId: partyId,
        signature,
        signedAt: new Date(),
      },
      update: {
        signature,
        signedAt: new Date(),
      },
    })

    return NextResponse.json(updatedSignature)
  } catch (error) {
    console.error('[Document Sign] Error:', error)
    return NextResponse.json(
      { error: 'Failed to save signature' },
      { status: 500 }
    )
  }
} 