"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

/**
 * DocumentAIRecommendations component
 * Displays AI-powered recommendations for legal documents
 */
export default function DocumentAIRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Personalized suggestions to improve your document</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <p className="text-sm font-medium mb-1">Add termination clause</p>
            <p className="text-xs text-muted-foreground">Recommended for better protection</p>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Apply Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}




