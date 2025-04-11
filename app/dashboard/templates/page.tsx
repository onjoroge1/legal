"use client"

import { useSession } from "next-auth/react"
import { TemplateActions } from "@/components/template-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FileText } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

interface Template {
  id: string
  code?: string
  name: string
  description: string
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  templates: Template[]
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link 
      href={`/dashboard/templates/category/${category.slug}`}
      className="block"
    >
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle>{category.name}</CardTitle>
          </div>
          <CardDescription>{category.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {category.templates.length} {category.templates.length === 1 ? 'template' : 'templates'} available
            </p>
            {category.templates.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                No templates in this category yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function CategoryCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  )
}

export default function TemplatesPage() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log("[TemplatesPage] Fetching categories from API")
      const response = await fetch("/api/dashboard/categories", {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      console.log("[TemplatesPage] API Response status:", response.status)
      
      if (!response.ok) {
        console.error("[TemplatesPage] API Response not OK:", response.status)
        const errorText = await response.text()
        console.error("[TemplatesPage] API Error response:", errorText)
        throw new Error("Failed to fetch categories")
      }
      
      const data = await response.json()
      console.log("[TemplatesPage] Received categories:", data)
      return data as Category[]
    },
    staleTime: 0, // Consider data stale immediately
    gcTime: 0, // Don't cache at all
  })

  useEffect(() => {
    console.log("[TemplatesPage] Component mounted")
    setMounted(true)
  }, [])

  if (!mounted) {
    console.log("[TemplatesPage] Component not mounted yet")
    return null
  }

  return (
    <div key="templates-page" className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Legal Document Templates</h1>
          <p className="text-muted-foreground">
            Browse and generate legal documents from our collection of templates
          </p>
        </div>
        <TemplateActions />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Show loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))
        ) : error ? (
          // Show error state
          <div className="col-span-full text-center text-red-500">
            <p>Failed to load categories. Please try again later.</p>
          </div>
        ) : !categories?.length ? (
          // Show empty state
          <div className="col-span-full text-center text-muted-foreground">
            <p>No categories found.</p>
          </div>
        ) : (
          // Show categories
          categories.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        )}
      </div>
    </div>
  )
}

