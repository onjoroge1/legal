"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Clock } from "lucide-react"

/**
 * DocumentHistory component
 * Displays document version history
 */
export default function DocumentHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Version History
        </CardTitle>
        <CardDescription>Track changes and revisions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Current Version</p>
              <p className="text-xs text-muted-foreground">Last modified: Just now</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center py-4">
            No previous versions
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

