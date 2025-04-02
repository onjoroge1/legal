"use client"

import { Button } from "@/components/ui/button"

export function TemplateActions() {
  const createSampleTemplate = async () => {
    try {
      const response = await fetch('/api/templates/sample', {
        method: 'POST',
      })
      if (!response.ok) throw new Error('Failed to create sample template')
      window.location.reload()
    } catch (error) {
      console.error('Error creating sample template:', error)
    }
  }

  return (
    <Button onClick={createSampleTemplate}>
      Create Sample Template
    </Button>
  )
} 