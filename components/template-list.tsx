"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TemplatePreview } from "./template-preview"
import { TemplateCategories } from "./template-categories"

interface TemplateVariable {
  name: string
  type: string
  label: string
  required: boolean
  options?: string[]
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  content: string
  variables: TemplateVariable[]
}

interface TemplateListProps {
  initialTemplates: Template[]
}

export function TemplateList({ initialTemplates }: TemplateListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [templates, setTemplates] = useState(initialTemplates)

  useEffect(() => {
    console.log("[TemplateList] Initial templates:", templates)
    console.log("[TemplateList] Initial templates count:", templates.length)
  }, [templates])

  const filteredTemplates = selectedCategory
    ? templates.filter(template => {
        console.log(`[TemplateList] Checking template: ${template.name}, Category: ${template.category}, Selected: ${selectedCategory}`)
        return template.category === selectedCategory
      })
    : templates

  useEffect(() => {
    console.log("[TemplateList] Category changed to:", selectedCategory)
    console.log("[TemplateList] Filtered templates:", filteredTemplates)
    console.log("[TemplateList] Filtered templates count:", filteredTemplates.length)
  }, [selectedCategory, filteredTemplates])

  const handleCategoryChange = (category: string | null) => {
    console.log("[TemplateList] Category change requested:", category)
    setSelectedCategory(category)
  }

  // Group templates by category
  const templatesByCategory = templates.reduce((acc, template) => {
    const category = template.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(template)
    return acc
  }, {} as Record<string, Template[]>)

  return (
    <div className="space-y-8">
      <TemplateCategories onCategoryChange={handleCategoryChange} />
      
      {selectedCategory ? (
        // Show filtered templates for selected category
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedCategory} Templates</h2>
          {filteredTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <TemplatePreview template={template} />
              </CardContent>
            </Card>
          ))}
          {filteredTemplates.length === 0 && (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">
                  No templates found for category: {selectedCategory}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        // Show all templates grouped by category
        <div className="space-y-8">
          {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-semibold">{category} Templates</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TemplatePreview template={template} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 