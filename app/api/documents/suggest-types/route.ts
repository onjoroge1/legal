import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Try to import Prisma
let prisma: any
try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch {
  // Prisma not available
}

// Fallback document types when DB is not available
const FALLBACK_TYPES = [
  { value: "nda", label: "Non-Disclosure Agreement (NDA)" },
  { value: "llc-operating-agreement", label: "LLC Operating Agreement" },
  { value: "independent-contractor-agreement", label: "Independent Contractor Agreement" },
  { value: "lease-agreement", label: "Lease Agreement" },
  { value: "employment-contract", label: "Employment Contract" },
  { value: "will-and-testament", label: "Last Will and Testament" },
  { value: "power-of-attorney", label: "Power of Attorney" },
  { value: "bill-of-sale", label: "Bill of Sale" },
  { value: "promissory-note", label: "Promissory Note" },
  { value: "partnership-agreement", label: "Partnership Agreement" },
  { value: "service-agreement", label: "Service Agreement" },
  { value: "consulting-agreement", label: "Consulting Agreement" },
  { value: "non-compete-agreement", label: "Non-Compete Agreement" },
  { value: "cease-and-desist", label: "Cease and Desist Letter" },
  { value: "prenuptial-agreement", label: "Prenuptial Agreement" },
]

/**
 * Get suggested document types
 * POST /api/documents/suggest-types
 *
 * Body: { query?: string } - optional search query to filter types
 *
 * Returns document type suggestions, optionally filtered by query.
 * If DB is available, pulls from DocumentTemplate table.
 * Otherwise uses fallback hardcoded list.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    let query = ""
    try {
      const body = await request.json()
      query = body.query || ""
    } catch {
      // No body or invalid JSON - that's OK
    }

    // Try to get types from database templates
    if (prisma) {
      try {
        const templates = await prisma.documentTemplate.findMany({
          where: {
            deletedAt: null,
            ...(query
              ? {
                  OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { type: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                  ],
                }
              : {}),
          },
          select: {
            slug: true,
            name: true,
            type: true,
            description: true,
            category: {
              select: { name: true },
            },
          },
          orderBy: { name: "asc" },
          take: 20,
        })

        if (templates.length > 0) {
          return NextResponse.json({
            types: templates.map((t: any) => ({
              value: t.slug || t.type,
              label: t.name,
              description: t.description,
              category: t.category?.name,
            })),
          })
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Use fallback types
    const filteredTypes = query
      ? FALLBACK_TYPES.filter(
          (t) =>
            t.label.toLowerCase().includes(query.toLowerCase()) ||
            t.value.toLowerCase().includes(query.toLowerCase())
        )
      : FALLBACK_TYPES

    return NextResponse.json({
      types: filteredTypes,
    })
  } catch (error) {
    console.error("Suggest types error:", error)
    return NextResponse.json(
      { error: "Failed to get document types" },
      { status: 500 }
    )
  }
}
