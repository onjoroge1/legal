"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, XCircle, FileText, PenTool } from "lucide-react"
import { toast } from "@/lib/safe-toast"
import DocumentPreview from "@/components/documents/document-preview"

export default function SignDocumentPage() {
  const params = useParams()
  const router = useRouter()
  const token = params?.token as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSigning, setIsSigning] = useState(false)
  const [signature, setSignature] = useState("")
  const [document, setDocument] = useState<{
    id: string
    title: string
    content: string
    signerName: string
    signerEmail: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      fetchSigningRequest()
    }
  }, [token])

  const fetchSigningRequest = async () => {
    try {
      const response = await fetch(`/api/documents/signing-request?token=${token}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Invalid or expired signing request")
        return
      }

      setDocument(data.document)
    } catch (error) {
      setError("Failed to load signing request")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSign = async () => {
    if (!signature.trim()) {
      toast.error("Please provide your signature")
      return
    }

    if (!document) {
      toast.error("Document not found")
      return
    }

    setIsSigning(true)
    try {
      const response = await fetch("/api/documents/sign-external", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          signature,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to sign document")
      }

      toast.success("Document signed successfully!")
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign document")
    } finally {
      setIsSigning(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-center">Invalid Request</CardTitle>
            <CardDescription className="text-center">{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/">Go to Homepage</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>{document?.title}</CardTitle>
                <CardDescription>
                  Please review and sign this document
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Document Preview */}
            {document?.content && (
              <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
                <DocumentPreview template={document.content} />
              </div>
            )}

            {/* Signature Section */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Sign Document</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">
                  Your Signature <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type your full name to sign"
                  rows={3}
                  className="font-serif text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  By typing your name above and clicking "Sign Document", you acknowledge that you have read, 
                  understood, and agree to be bound by the terms of this document.
                </p>
              </div>
              <Button
                onClick={handleSign}
                disabled={isSigning || !signature.trim()}
                size="lg"
                className="w-full"
              >
                {isSigning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Sign Document
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}




