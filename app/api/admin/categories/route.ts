import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/categories - Get all categories
export async function GET() {
  console.log("[GET /api/admin/categories] Starting request")
  const session = await getServerSession(authOptions)
  console.log("[GET /api/admin/categories] Session:", session ? "Found" : "Not found")

  if (!session?.user?.id) {
    console.log("[GET /api/admin/categories] No session found, returning 401")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("[GET /api/admin/categories] Fetching categories from database")
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    console.log("[GET /api/admin/categories] Found categories:", categories.length)
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[GET /api/admin/categories] Error fetching categories:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST /api/admin/categories - Create a new category
export async function POST(request: Request) {
  console.log("[POST /api/admin/categories] Starting request")
  const session = await getServerSession(authOptions)
  console.log("[POST /api/admin/categories] Session:", session ? "Found" : "Not found")

  if (!session?.user?.id) {
    console.log("[POST /api/admin/categories] No session found, returning 401")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    console.log("[POST /api/admin/categories] Request body:", body)
    const { name, description } = body

    console.log("[POST /api/admin/categories] Creating category in database")
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    })
    console.log("[POST /api/admin/categories] Category created:", category.id)
    return NextResponse.json(category)
  } catch (error) {
    console.error("[POST /api/admin/categories] Error creating category:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 