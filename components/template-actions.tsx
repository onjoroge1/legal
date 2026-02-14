"use client"

import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

/**
 * TemplateActions component
 * Provides action buttons for the templates page
 */
export function TemplateActions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href="/dashboard/create">
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href="/documents">
          <Search className="mr-2 h-4 w-4" />
          Browse All
        </Link>
      </Button>
    </div>
  )
}




