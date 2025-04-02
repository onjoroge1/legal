import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PATCH /api/admin/categories/[categoryId] - Update a category
export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    console.log("[PATCH /api/admin/categories] Starting request", { categoryId: params.categoryId })
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log("[PATCH /api/admin/categories] No session found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, description } = body
    console.log("[PATCH /api/admin/categories] Request body:", { name, description })

    // Validate input
    if (!name || typeof name !== 'string') {
      console.log("[PATCH /api/admin/categories] Invalid name:", name)
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.categoryId }
    })

    if (!existingCategory) {
      console.log("[PATCH /api/admin/categories] Category not found:", params.categoryId)
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    console.log("[PATCH /api/admin/categories] Updating category:", params.categoryId)
    // Update category
    const category = await prisma.category.update({
      where: { id: params.categoryId },
      data: {
        name,
        description: description || null
      }
    })

    console.log("[PATCH /api/admin/categories] Category updated successfully:", category)
    return NextResponse.json(category)
  } catch (error) {
    console.error("[PATCH /api/admin/categories] Error:", error)
    if (error instanceof Error) {
      console.error("[PATCH /api/admin/categories] Error message:", error.message)
      console.error("[PATCH /api/admin/categories] Error stack:", error.stack)
    }
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

// DELETE /api/admin/categories/[categoryId] - Delete a category
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    console.log("[DELETE /api/admin/categories] Starting request", { categoryId: params.categoryId })
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log("[DELETE /api/admin/categories] No session found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.categoryId }
    })

    if (!existingCategory) {
      console.log("[DELETE /api/admin/categories] Category not found:", params.categoryId)
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    console.log("[DELETE /api/admin/categories] Deleting category:", params.categoryId)
    // Delete category
    await prisma.category.delete({
      where: { id: params.categoryId }
    })

    console.log("[DELETE /api/admin/categories] Category deleted successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DELETE /api/admin/categories] Error:", error)
    if (error instanceof Error) {
      console.error("[DELETE /api/admin/categories] Error message:", error.message)
      console.error("[DELETE /api/admin/categories] Error stack:", error.stack)
    }
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
} 