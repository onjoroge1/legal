"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Edit, Share2 } from "lucide-react"

/**
 * DocumentView component
 * Displays a document for viewing
 */
export default function DocumentView() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Document View</h1>
          <p className="text-muted-foreground">View and manage your document</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Document Content</CardTitle>
          <CardDescription>Document preview will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
            <p>Document content will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

