"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, Users } from "lucide-react"
import { toast } from "@/lib/safe-toast"
import { useSession } from "next-auth/react"

interface DocumentEditorWithAutosaveProps {
  documentId?: string
  initialContent?: string
  onSave?: (content: string) => Promise<void>
  placeholder?: string
}

/**
 * Document editor with auto-save functionality
 * Respects user's auto-save preference from settings
 */
export default function DocumentEditorWithAutosave({
  documentId,
  initialContent = "",
  onSave,
  placeholder = "Start editing the document...",
}: DocumentEditorWithAutosaveProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const hasUnsavedChangesRef = useRef(false)

  // Load auto-save preference
  useEffect(() => {
    const loadAutoSavePreference = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setAutoSaveEnabled(data.autoSaveEnabled ?? true)
        }
      } catch (error) {
        console.error("Failed to load auto-save preference:", error)
      }
    }

    if (session) {
      loadAutoSavePreference()
    }
  }, [session])

  // Auto-save function
  const performAutoSave = useCallback(async () => {
    if (!autoSaveEnabled || !hasUnsavedChangesRef.current || !documentId) {
      return
    }

    try {
      // Call the onSave callback if provided
      if (onSave) {
        await onSave(content)
      } else {
        // Default: save to API endpoint
        const response = await fetch(`/api/documents/${documentId}/autosave`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        })

        if (!response.ok) {
          throw new Error("Failed to auto-save")
        }
      }

      hasUnsavedChangesRef.current = false
      setLastSaved(new Date())
    } catch (error) {
      console.error("Auto-save error:", error)
      // Don't show toast for auto-save failures to avoid annoying users
    }
  }, [autoSaveEnabled, content, documentId, onSave])

  // Set up auto-save timer
  useEffect(() => {
    if (autoSaveEnabled && hasUnsavedChangesRef.current) {
      // Clear existing timer
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }

      // Set new timer (5 minutes = 300000ms)
      autoSaveTimerRef.current = setTimeout(() => {
        performAutoSave()
      }, 300000) // 5 minutes

      return () => {
        if (autoSaveTimerRef.current) {
          clearTimeout(autoSaveTimerRef.current)
        }
      }
    }
  }, [content, autoSaveEnabled, performAutoSave])

  // Manual save
  const handleManualSave = async () => {
    if (!documentId) {
      toast.error("No document ID provided")
      return
    }

    setIsSaving(true)
    try {
      if (onSave) {
        await onSave(content)
      } else {
        const response = await fetch(`/api/documents/${documentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        })

        if (!response.ok) {
          throw new Error("Failed to save document")
        }
      }

      hasUnsavedChangesRef.current = false
      setLastSaved(new Date())
      toast.success("Document saved successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save document")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    hasUnsavedChangesRef.current = true
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
      // Perform final auto-save if there are unsaved changes
      if (hasUnsavedChangesRef.current && autoSaveEnabled) {
        performAutoSave()
      }
    }
  }, [autoSaveEnabled, performAutoSave])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Collaborative editing</span>
            {autoSaveEnabled && (
              <span className="text-xs text-muted-foreground">
                {lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : "Auto-save enabled"}
              </span>
            )}
          </div>
          <Button size="sm" variant="outline" onClick={handleManualSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        <Textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[400px] font-mono text-sm"
        />
        {hasUnsavedChangesRef.current && (
          <p className="text-xs text-muted-foreground mt-2">
            {autoSaveEnabled ? "Changes will be auto-saved in 5 minutes" : "You have unsaved changes"}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

