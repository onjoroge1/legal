import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

async function assertAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return false

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { isAdmin: true },
  })
  return user?.isAdmin ?? false
}

/**
 * GET /api/admin/lawyers
 * Returns all lawyer listings, optionally filtered by ?q=
 */
export async function GET(request: Request) {
  try {
    if (!(await assertAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q") ?? ""

    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}

    const lawyers = await prisma.lawyerListing.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(lawyers)
  } catch (error) {
    console.error("[GET /api/admin/lawyers]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/admin/lawyers
 * Creates a new lawyer listing
 */
export async function POST(request: Request) {
  try {
    if (!(await assertAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { name, slug, email, bio } = body as Record<string, unknown>

    if (!name || !slug || !email || !bio) {
      return NextResponse.json(
        { error: "name, slug, email, and bio are required" },
        { status: 400 }
      )
    }

    const lawyer = await prisma.lawyerListing.create({
      data: {
        name: body.name as string,
        slug: body.slug as string,
        email: body.email as string,
        bio: body.bio as string,
        phone: (body.phone as string | null) ?? null,
        tagline: (body.tagline as string | null) ?? null,
        firmName: (body.firmName as string | null) ?? null,
        photoUrl: (body.photoUrl as string | null) ?? null,
        websiteUrl: (body.websiteUrl as string | null) ?? null,
        city: (body.city as string | null) ?? null,
        stateAbbr: (body.stateAbbr as string | null) ?? null,
        practiceAreas: (body.practiceAreas as string[]) ?? [],
        licensedStates: (body.licensedStates as string[]) ?? [],
        yearsExperience: (body.yearsExperience as number | null) ?? null,
        featured: (body.featured as boolean) ?? false,
        verified: (body.verified as boolean) ?? false,
        active: (body.active as boolean) ?? true,
        tier: (body.tier as string) ?? "basic",
      },
    })

    return NextResponse.json(lawyer, { status: 201 })
  } catch (error: unknown) {
    console.error("[POST /api/admin/lawyers]", error)
    // Unique constraint violation
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A listing with that slug or email already exists" },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
