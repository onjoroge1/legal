import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { TEMPLATE_CATEGORIES } from "@/lib/constants"

// Try to import Prisma - will be undefined if not set up yet
let prisma: any

try {
  const prismaModule = require("@/lib/prisma")
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma not set up yet
  console.log("Prisma not available - categories will use constants")
}

/**
 * Categories API Route
 * Returns document template categories
 * 
 * GET /api/dashboard/categories
 */
export async function GET(request: Request) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // If Prisma is available, fetch real categories from database
    if (prisma) {
      try {
        const categories = await prisma.category.findMany({
          where: {
            deletedAt: null,
          },
          include: {
            templates: {
              where: {
                deletedAt: null,
              },
              select: {
                id: true,
                code: true,
                name: true,
                description: true,
              },
            },
          },
          orderBy: {
            name: "asc",
          },
        })

        // Transform Prisma data to match expected format
        const formattedCategories = categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description || "",
          templates: cat.templates.map((template: any) => ({
            id: template.id,
            code: template.code || template.id,
            name: template.name,
            description: template.description || "",
          })),
        }))

        return NextResponse.json(formattedCategories)
      } catch (error) {
        console.error("Database error:", error)
        // Fall through to constants
      }
    }

    // Return categories from constants (fallback)
    return NextResponse.json(TEMPLATE_CATEGORIES)
  } catch (error) {
    console.error("Categories API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}




