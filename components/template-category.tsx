"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface TemplateCategoryProps {
  id: string
  name: string
  description: string
  icon: string
  onSelect: (categoryId: string) => void
  isSelected: boolean
}

export function TemplateCategory({ id, name, description, icon, onSelect, isSelected }: TemplateCategoryProps) {
  const handleClick = () => {
    console.log(`[TemplateCategory] Clicked category: ${name} (${id}), Currently selected: ${isSelected}`)
    onSelect(id)
  }

  return (
    <Card 
      className={`cursor-pointer transition-all hover:bg-muted/50 ${
        isSelected ? 'border-primary shadow-sm' : ''
      }`}
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
} 