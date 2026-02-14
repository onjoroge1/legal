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
 * Category by Slug API Route
 * Returns a specific category with its templates
 * 
 * GET /api/dashboard/categories/[slug]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { slug } = await params

    // If Prisma is available, fetch real category from database
    if (prisma) {
      try {
        const category = await prisma.category.findFirst({
          where: {
            slug: slug,
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
        })

        if (!category) {
          return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
          )
        }

        // Transform Prisma data to match expected format
        const formattedCategory = {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description || "",
          templates: category.templates.map((template: any) => ({
            id: template.id,
            code: template.code || template.id,
            name: template.name,
            description: template.description || "",
          })),
        }

        return NextResponse.json(formattedCategory)
      } catch (error) {
        console.error("Database error:", error)
        // Fall through to constants
      }
    }

    // Return category from constants (fallback)
    const category = TEMPLATE_CATEGORIES.find((cat) => cat.slug === slug)

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Category API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}




