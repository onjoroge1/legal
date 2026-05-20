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
 * GET /api/admin/lawyers/[id]
 * Returns a single lawyer listing
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await assertAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const lawyer = await prisma.lawyerListing.findUnique({ where: { id } })

    if (!lawyer) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(lawyer)
  } catch (error) {
    console.error("[GET /api/admin/lawyers/[id]]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * PATCH /api/admin/lawyers/[id]
 * Updates a lawyer listing (partial update)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await assertAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json() as Record<string, unknown>

    // Build update payload — only include fields that were actually sent
    const data: Record<string, unknown> = {}

    const stringFields = [
      "name", "slug", "email", "bio", "phone", "tagline",
      "firmName", "photoUrl", "websiteUrl", "city", "stateAbbr", "tier",
    ] as const
    for (const field of stringFields) {
      if (field in body) data[field] = body[field]
    }

    const boolFields = ["featured", "verified", "active"] as const
    for (const field of boolFields) {
      if (field in body) data[field] = Boolean(body[field])
    }

    if ("yearsExperience" in body) {
      data.yearsExperience =
        body.yearsExperience === null || body.yearsExperience === undefined
          ? null
          : Number(body.yearsExperience)
    }

    if ("practiceAreas" in body) {
      data.practiceAreas = (body.practiceAreas as string[]) ?? []
    }

    if ("licensedStates" in body) {
      data.licensedStates = (body.licensedStates as string[]) ?? []
    }

    const lawyer = await prisma.lawyerListing.update({
      where: { id },
      data,
    })

    return NextResponse.json(lawyer)
  } catch (error: unknown) {
    console.error("[PATCH /api/admin/lawyers/[id]]", error)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
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

/**
 * DELETE /api/admin/lawyers/[id]
 * Deletes a lawyer listing
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await assertAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    await prisma.lawyerListing.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("[DELETE /api/admin/lawyers/[id]]", error)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
