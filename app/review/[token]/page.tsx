"use client"

import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, XCircle } from "lucide-react"

interface ReviewPageProps {
  params: Promise<{
    token: string
  }>
}

export default function ReviewPage(props: ReviewPageProps) {
  const params = use(props.params);
  const { token } = params
  const [document, setDocument] = useState<any>(null)
  const [comments, setComments] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/review/${token}`)
        if (!response.ok) {
          throw new Error("Failed to fetch document")
        }
        const data = await response.json()
        setDocument(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load document",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [token, toast])

  const handleApprove = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/documents/review/${token}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comments })
      })

      if (!response.ok) {
        throw new Error("Failed to approve document")
      }

      toast({
        title: "Success",
        description: "Document approved successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve document",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/documents/review/${token}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comments })
      })

      if (!response.ok) {
        throw new Error("Failed to reject document")
      }

      toast({
        title: "Success",
        description: "Document rejected successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject document",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
          <p className="text-muted-foreground">
            The document you're trying to review doesn't exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <CardDescription>{document.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-6">
            <pre className="whitespace-pre-wrap">{document.content}</pre>
          </div>

          <div className="space-y-4">
            <Label htmlFor="comments">Review Comments</Label>
            <Textarea
              id="comments"
              placeholder="Enter your review comments here..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleReject}
            disabled={isSubmitting}
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button
            className="gap-2"
            onClick={handleApprove}
            disabled={isSubmitting}
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 