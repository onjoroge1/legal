import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/dashboard/categories/[id] - Get a single category with templates
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("[GET /api/dashboard/categories/[id]] Starting request", { id: params.id })
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log("[GET /api/dashboard/categories/[id]] No session found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get category with templates
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        templates: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    if (!category) {
      console.log("[GET /api/dashboard/categories/[id]] Category not found:", params.id)
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    console.log("[GET /api/dashboard/categories/[id]] Found category:", {
      id: category.id,
      name: category.name,
      templatesCount: category.templates.length
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("[GET /api/dashboard/categories/[id]] Error:", error)
    if (error instanceof Error) {
      console.error("[GET /api/dashboard/categories/[id]] Error message:", error.message)
      console.error("[GET /api/dashboard/categories/[id]] Error stack:", error.stack)
    }
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
} 