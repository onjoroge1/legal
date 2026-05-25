"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, ArrowLeft, Loader2, FileText, CheckCircle2, Sparkles, X } from "lucide-react"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import DocumentSigning from "@/components/documents/document-signing"
import ProfessionalDocumentViewer from "@/components/documents/professional-document-viewer"
import { toast } from "@/lib/safe-toast"
import { useSession } from "next-auth/react"

interface Document {
  id: string
  title: string
  type: string
  category?: string
  status: string
  content: string
  metadata?: any
  createdAt: string
  updatedAt: string
  parties: {
    id: string
    name: string
    type: string
    email?: string
  }[]
}

/**
 * DocumentView component
 * Displays a document for viewing with sign, send, and edit actions
 */
export default function DocumentView() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const documentId = params?.id as string

  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Payment-success banner — visible immediately after successful checkout.
  // Dismissible; persists until the user clicks X.
  const [showSuccessBanner, setShowSuccessBanner] = useState(
    searchParams?.get("payment") === "success"
  )

  // Scroll target for the signing card so /dashboard/documents/[id]#sign
  // (the link in the post-purchase email) lands the user there.
  const signingCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (documentId) {
      fetchDocument()
    }
  }, [documentId])

  // Auto-scroll to the signing card when the URL hash is #sign (from email CTA).
  // We wait for the document to finish loading so the card is in the DOM.
  useEffect(() => {
    if (!loading && typeof window !== "undefined" && window.location.hash === "#sign") {
      // Small delay lets the layout settle so scroll math is accurate
      setTimeout(() => {
        signingCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [loading])

  const fetchDocument = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/documents/by-id/${documentId}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Document not found")
        } else {
          setError("Failed to load document")
        }
        return
      }

      const data = await response.json()
      setDocument(data)
    } catch (error) {
      console.error("Error fetching document:", error)
      setError("Failed to load document")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    // Navigate to edit page or open editor
    if (document?.metadata?.slug) {
      router.push(`/documents/${document.metadata.slug}/generate`)
    } else {
      toast.info("Edit functionality coming soon")
    }
  }

  const handleDownload = async (fmt: "pdf" | "docx" = "docx") => {
    try {
      const response = await fetch(`/api/documents/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentText: document?.content,
          documentTitle: document?.title,
          format: fmt,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to download document")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = window.document.createElement("a")
      a.href = url
      a.download = `${document?.title || "document"}.${fmt}`
      window.document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      window.document.body.removeChild(a)

      toast.success(`Downloaded as ${fmt.toUpperCase()}`)
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download document")
    }
  }

  const handleSignComplete = () => {
    // Refresh document after signing
    fetchDocument()
  }

  const saveDocument = async (): Promise<string | null> => {
    // Document is already saved, return the ID
    return documentId
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || "Document not found"}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/documents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documents
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 md:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{document.title}</h1>
            <p className="text-sm text-muted-foreground">
              {document.type} • {format(new Date(document.createdAt), "MMM d, yyyy")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={document.status === "completed" ? "default" : "secondary"}>
              {document.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Document Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {/* Payment-success banner — shown immediately after Stripe redirect */}
          {showSuccessBanner && (
            <div className="mb-6 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Sparkles className="h-5 w-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-green-900">
                    Payment confirmed — your draft is ready
                  </h3>
                  <p className="mt-0.5 text-sm text-green-800/80">
                    Download the editable Word file to review with your attorney, or jump straight to
                    signing if you&apos;re ready. A copy was also emailed to you.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuccessBanner(false)}
                  className="text-green-700/60 hover:text-green-900 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Action Bar — DOCX is now primary (matches the generate-page framing) */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {document.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                Last updated {format(new Date(document.updatedAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleDownload("docx")}>
                <Download className="mr-2 h-4 w-4" />
                Download Word
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload("pdf")}>
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>

          {/* Professional Document Viewer */}
          <div className="rounded-2xl border border-border/50 bg-card/80 shadow-xl">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="p-6 md:p-10">
                {document.content ? (
                  <ProfessionalDocumentViewer
                    content={document.content}
                    title={document.title}
                    metadata={document.metadata}
                  />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No content available</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Signing Actions — anchor target for #sign deep-link from email CTA */}
          <Card className="mt-6 scroll-mt-20" id="sign" ref={signingCardRef}>
            <CardHeader>
              <CardTitle>Sign &amp; Send Your Draft</CardTitle>
              <CardDescription>
                Once you&apos;ve reviewed and (if needed) edited the draft, sign electronically or
                send to another party for signature. Included with the Professional plan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentSigning
                documentId={document.id}
                documentTitle={document.title}
                onSignComplete={handleSignComplete}
                onSaveDocument={saveDocument}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Document Info */}
        <div className="hidden lg:block w-80 border-l bg-muted/40 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Document Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium">{document.type}</p>
                </div>
                {document.category && (
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <p className="font-medium">{document.category}</p>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={document.status === "completed" ? "default" : "secondary"} className="ml-2">
                    {document.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">{format(new Date(document.createdAt), "MMM d, yyyy")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>
                  <p className="font-medium">{format(new Date(document.updatedAt), "MMM d, yyyy")}</p>
                </div>
              </div>
            </div>

            {document.parties && document.parties.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3">Parties</h3>
                <div className="space-y-2">
                  {document.parties.map((party) => (
                    <div key={party.id} className="text-sm">
                      <p className="font-medium">{party.name}</p>
                      <p className="text-muted-foreground text-xs">{party.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}




