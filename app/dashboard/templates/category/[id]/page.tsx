"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  description: string
}

interface Category {
  id: string
  name: string
  description: string
  templates: Template[]
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href={`/dashboard/templates/${template.id}`}>
            Generate Document
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string

  const { data: category, isLoading, error } = useQuery<Category>({
    queryKey: ['categories', categoryId],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/categories/${categoryId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch category')
      }
      return response.json()
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-destructive">Failed to load category. Please try again later.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/templates">Back to Templates</Link>
        </Button>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p>Category not found</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/templates">Back to Templates</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground mt-2">{category.description}</p>
      </div>

      {category.templates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No templates available in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  )
} 