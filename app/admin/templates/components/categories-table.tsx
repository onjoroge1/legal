"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { CategoryDialog } from "./category-dialog"
import { useToast } from "@/components/ui/use-toast"

interface Category {
  id: string
  name: string
  description: string | null
  createdAt: string
}

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchCategories = async () => {
    console.log("[CategoriesTable] Fetching categories")
    try {
      const response = await fetch("/api/admin/templates", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      
      console.log("[CategoriesTable] Response status:", response.status)
      
      // Handle 304 Not Modified - this means we can use cached data
      if (response.status === 304) {
        console.log("[CategoriesTable] Using cached data")
        return null // React Query will keep using the cached data
      }

      if (!response.ok && response.status !== 304) {
        console.log("[CategoriesTable] Error response status:", response.status)
        const errorText = await response.text()
        console.log("[CategoriesTable] Error response:", errorText)
        throw new Error(`Failed to fetch categories: ${errorText}`)
      }

      const data = await response.json()
      console.log("[CategoriesTable] Received data:", data)
      return data
    } catch (error) {
      console.error("[CategoriesTable] Fetch error:", error)
      throw error
    }
  }

  useEffect(() => {
    console.log("[CategoriesTable] Component mounted, fetching categories")
    fetchCategories()
  }, [])

  const handleDelete = async (id: string) => {
    console.log("[CategoriesTable] Starting to delete category:", id)
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      console.log("[CategoriesTable] Delete cancelled by user")
      return
    }

    try {
      console.log("[CategoriesTable] Making API request to delete category")
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      })

      console.log("[CategoriesTable] Delete response status:", response.status)
      
      if (!response.ok) {
        console.log("[CategoriesTable] Delete request failed with status:", response.status)
        const errorText = await response.text()
        console.log("[CategoriesTable] Delete error response:", errorText)
        throw new Error(`Failed to delete category: ${errorText}`)
      }

      console.log("[CategoriesTable] Category deleted successfully")
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      })
      fetchCategories()
    } catch (error) {
      console.error("[CategoriesTable] Error deleting category:", error)
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      })
    }
  }

  console.log("[CategoriesTable] Rendering with state:", {
    categoriesCount: categories.length,
    loading,
    error,
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-muted-foreground">
            Organize your templates into categories
          </p>
        </div>
        <CategoryDialog mode="add" onSuccess={fetchCategories} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">No categories found</p>
                    <p className="text-sm text-muted-foreground">Create your first category to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description || "No description"}</TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CategoryDialog
                        mode="edit"
                        category={{
                          id: category.id,
                          name: category.name,
                          description: category.description || "",
                        }}
                        onSuccess={() => {
                          console.log("[CategoriesTable] Category updated, refreshing list");
                          fetchCategories();
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 