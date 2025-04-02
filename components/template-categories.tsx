"use client"

import { useState, useEffect } from "react"
import { TemplateCategory } from "./template-category"

interface TemplateCategoriesProps {
  onCategoryChange: (category: string | null) => void
}

export function TemplateCategories({ onCategoryChange }: TemplateCategoriesProps) {
  const categories = [
    {
      name: "Employment",
      description: "Employment agreements, contracts, and HR documents",
      icon: "👥"
    },
    {
      name: "Business",
      description: "Business formation, contracts, and corporate documents",
      icon: "🏢"
    },
    {
      name: "Real Estate",
      description: "Leases, property agreements, and real estate documents",
      icon: "🏠"
    },
    {
      name: "Intellectual Property",
      description: "Patents, trademarks, copyrights, and licensing agreements",
      icon: "📝"
    },
    {
      name: "Family Law",
      description: "Divorce, custody, and family-related legal documents",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      name: "Estate Planning",
      description: "Wills, trusts, and estate planning documents",
      icon: "📜"
    },
    {
      name: "Personal Injury",
      description: "Accident reports, claims, and injury-related documents",
      icon: "🏥"
    },
    {
      name: "Criminal Law",
      description: "Criminal defense and related legal documents",
      icon: "⚖️"
    },
    {
      name: "Immigration",
      description: "Visa applications, citizenship, and immigration documents",
      icon: "🌍"
    },
    {
      name: "Banking & Finance",
      description: "Loans, mortgages, and financial agreements",
      icon: "💰"
    },
    {
      name: "Healthcare",
      description: "Medical consent forms, HIPAA documents, and healthcare agreements",
      icon: "🏥"
    },
    {
      name: "Education",
      description: "Student agreements, enrollment forms, and educational contracts",
      icon: "🎓"
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    console.log("[TemplateCategories] Component mounted")
    console.log("[TemplateCategories] Initial selected category:", selectedCategory)
  }, [])

  const handleCategorySelect = (category: string) => {
    console.log(`[TemplateCategories] Category selection changed from ${selectedCategory} to ${category}`)
    const newCategory = selectedCategory === category ? null : category
    setSelectedCategory(newCategory)
    onCategoryChange(newCategory)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <TemplateCategory
          key={category.name}
          name={category.name}
          description={category.description}
          icon={category.icon}
          onSelect={handleCategorySelect}
          isSelected={selectedCategory === category.name}
        />
      ))}
    </div>
  )
} 