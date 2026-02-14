"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

/**
 * DocumentAISummary component
 * Displays AI-generated summary of legal documents
 */
export default function DocumentAISummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Summary
        </CardTitle>
        <CardDescription>AI-generated overview of your document</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            This document contains standard legal clauses and terms. Key sections include payment terms, 
            liability limitations, and dispute resolution procedures.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}




