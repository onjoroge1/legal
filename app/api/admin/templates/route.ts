import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/templates - Get all templates
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const templates = await prisma.documentTemplate.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST /api/admin/templates - Create a new template
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, description, categoryId, content } = body

    // First, get the category to ensure it exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const template = await prisma.documentTemplate.create({
      data: {
        name,
        description,
        content: content || "",
        type: "document", // Default type
        categoryId,
        version: "1.0.0",
        state: "draft",
        metadata: {},
        variables: []
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error("Error creating template:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 