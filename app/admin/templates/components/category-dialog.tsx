"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CategoryDialogProps {
  mode: "add" | "edit"
  category?: {
    id: string
    name: string
    description?: string
  }
  onSuccess: () => void
}

export function CategoryDialog({ mode, category, onSuccess }: CategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(category?.name || "")
  const [description, setDescription] = useState(category?.description || "")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[CategoryDialog] Starting form submission", {
      mode,
      categoryId: category?.id,
      formData: { name, description }
    })
    setLoading(true)

    try {
      const url = mode === "add" 
        ? "/api/admin/categories" 
        : `/api/admin/categories/${category?.id}`
      
      console.log("[CategoryDialog] Making request to:", url)
      console.log("[CategoryDialog] Request payload:", { name, description })
      
      const response = await fetch(url, {
        method: mode === "add" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      })

      console.log("[CategoryDialog] Response status:", response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.log("[CategoryDialog] Error response:", errorData)
        throw new Error(errorData.error || `Failed to ${mode} category`)
      }

      const data = await response.json()
      console.log("[CategoryDialog] Success response:", data)

      toast({
        title: "Success",
        description: `Category ${mode === "add" ? "created" : "updated"} successfully.`,
      })
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error(`[CategoryDialog] Error ${mode}ing category:`, error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${mode} category. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === "add" ? "default" : "ghost"} size={mode === "add" ? "default" : "icon"}>
          {mode === "add" ? (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </>
          ) : (
            <Edit className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add Category" : "Edit Category"}
            </DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? "Create a new category to organize your templates."
                : "Update the category details."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter category description"
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {mode === "add" ? "Creating..." : "Saving..."}
                </div>
              ) : mode === "add" ? (
                "Add Category"
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 