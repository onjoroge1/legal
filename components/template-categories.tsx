"use client"

import { useState, useEffect } from "react"
import { TemplateCategory } from "./template-category"
import { TEMPLATE_CATEGORIES } from "@/lib/constants"

interface TemplateCategoriesProps {
  onCategoryChange: (category: string | null) => void
}

export function TemplateCategories({ onCategoryChange }: TemplateCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    console.log("[TemplateCategories] Component mounted")
    console.log("[TemplateCategories] Initial selected category:", selectedCategory)
  }, [])

  const handleCategorySelect = (categoryId: string) => {
    console.log(`[TemplateCategories] Category selection changed from ${selectedCategory} to ${categoryId}`)
    const newCategory = selectedCategory === categoryId ? null : categoryId
    setSelectedCategory(newCategory)
    onCategoryChange(newCategory)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {TEMPLATE_CATEGORIES.map((category) => (
        <TemplateCategory
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description}
          icon={category.icon ? category.icon.toString() : "📄"}
          onSelect={handleCategorySelect}
          isSelected={selectedCategory === category.id}
        />
      ))}
    </div>
  )
} 