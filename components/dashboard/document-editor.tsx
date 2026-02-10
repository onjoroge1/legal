"use client"

import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface DocumentEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
}

/**
 * DocumentEditor component
 * Rich text editor for document creation and editing
 */
export default function DocumentEditor({ 
  content = "", 
  onChange,
  placeholder = "Start typing your document content here..."
}: DocumentEditorProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <Textarea
          value={content}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="min-h-[500px] font-mono text-sm"
        />
      </CardContent>
    </Card>
  )
}

