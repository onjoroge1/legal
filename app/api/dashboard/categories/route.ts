import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Category, DocumentTemplate } from "@prisma/client"

interface CategoryWithTemplates extends Category {
  templates: DocumentTemplate[]
}

export async function GET() {
  try {
    console.log("[GET /api/dashboard/categories] Starting request")

    // Fetch categories with their templates from the database
    try {
      console.log("[GET /api/dashboard/categories] Fetching categories from database")
      const categories = await prisma.category.findMany({
        include: {
          templates: {
            select: {
              id: true,
              name: true,
              description: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      })

      // Log what we found
      console.log("[GET /api/dashboard/categories] Found categories:", 
        JSON.stringify(categories, null, 2)
      )

      // Return the categories directly
      const response = NextResponse.json(categories)
      console.log("[GET /api/dashboard/categories] Sending response")
      response.headers.set('Cache-Control', 'no-store')
      return response

    } catch (error) {
      console.error("[GET /api/dashboard/categories] Database error:", error)
      if (error instanceof Error) {
        console.error("[GET /api/dashboard/categories] Error message:", error.message)
        console.error("[GET /api/dashboard/categories] Error stack:", error.stack)
      }
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("[GET /api/dashboard/categories] Unhandled error:", error)
    if (error instanceof Error) {
      console.error("[GET /api/dashboard/categories] Error message:", error.message)
      console.error("[GET /api/dashboard/categories] Error stack:", error.stack)
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
} 