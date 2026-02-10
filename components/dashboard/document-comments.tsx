"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send } from "lucide-react"

/**
 * DocumentComments component
 * Displays and manages comments on documents
 */
export default function DocumentComments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments
        </CardTitle>
        <CardDescription>Collaborate with your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea placeholder="Add a comment..." />
            <Button size="sm">
              <Send className="mr-2 h-4 w-4" />
              Post Comment
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            No comments yet. Be the first to comment!
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

