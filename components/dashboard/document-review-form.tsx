"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface DocumentReviewFormProps {
  documentId: string
  onSuccess?: () => void
}

export default function DocumentReviewForm({ documentId, onSuccess }: DocumentReviewFormProps) {
  const [reviewers, setReviewers] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleAddReviewer = () => {
    if (email && !reviewers.includes(email)) {
      setReviewers([...reviewers, email])
      setEmail("")
    }
  }

  const handleRemoveReviewer = (emailToRemove: string) => {
    setReviewers(reviewers.filter(email => email !== emailToRemove))
  }

  const handleSubmit = async () => {
    if (reviewers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one reviewer",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/documents/${documentId}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ reviewers })
      })

      if (!response.ok) {
        throw new Error("Failed to send review requests")
      }

      toast({
        title: "Success",
        description: "Review requests sent successfully"
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send review requests",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send for Review</CardTitle>
        <CardDescription>
          Add reviewers who will review this document
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Reviewer Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="reviewer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddReviewer()
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddReviewer}
              disabled={!email}
            >
              Add
            </Button>
          </div>
        </div>

        {reviewers.length > 0 && (
          <div className="space-y-2">
            <Label>Reviewers</Label>
            <div className="space-y-2">
              {reviewers.map((reviewer) => (
                <div
                  key={reviewer}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <span className="text-sm">{reviewer}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveReviewer(reviewer)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full gap-2"
          onClick={handleSubmit}
          disabled={isSubmitting || reviewers.length === 0}
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Review Requests"}
        </Button>
      </CardFooter>
    </Card>
  )
} 