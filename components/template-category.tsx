"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface TemplateCategoryProps {
  name: string
  description: string
  icon: string
  onSelect: (category: string) => void
  isSelected: boolean
}

export function TemplateCategory({ name, description, icon, onSelect, isSelected }: TemplateCategoryProps) {
  const handleClick = () => {
    console.log(`[TemplateCategory] Clicked category: ${name}, Currently selected: ${isSelected}`)
    onSelect(name)
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