import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
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

    const { parties } = await request.json()

    // Update document parties
    const document = await prisma.document.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: {
        parties: {
          deleteMany: {},  // Delete all existing parties
          createMany: {    // Create new parties
            data: parties.map((party: any) => ({
              name: party.name,
              email: party.email,
              type: party.role,
            }))
          }
        }
      },
      include: {
        parties: true,
      },
    })

    return NextResponse.json(document)
  } catch (error) {
    console.error('[Document Parties] Error:', error)
    return NextResponse.json(
      { error: 'Failed to update document parties' },
      { status: 500 }
    )
  }
} 