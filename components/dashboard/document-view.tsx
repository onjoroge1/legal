"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, Share2, PenTool, Send, ArrowLeft, Loader2, FileText, Trash2 } from "lucide-react"
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
  const { data: session } = useSession()
  const documentId = params?.id as string
  
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (documentId) {
      fetchDocument()
    }
  }, [documentId])

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
    // Navigate to edit page - try metadata slug first, then use the create page with document ID
    if (document?.metadata?.slug) {
      router.push(`/documents/${document.metadata.slug}/generate`)
    } else if (document?.id) {
      // Open the create page in edit mode with the existing document
      router.push(`/dashboard/create?editId=${document.id}`)
    }
  }

  const handleDelete = async () => {
    if (!document?.id) return

    const confirmed = window.confirm(
      "Are you sure you want to delete this document? This action cannot be undone."
    )
    if (!confirmed) return

    try {
      const response = await fetch(`/api/documents/by-id/${document.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete document")
      }

      toast.success("Document deleted successfully")
      router.push("/dashboard/documents")
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete document")
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/documents/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: documentId,
          format: "pdf",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to download document")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = window.document.createElement("a")
      a.href = url
      a.download = `${document?.title || "document"}.pdf`
      window.document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      window.document.body.removeChild(a)
      
      toast.success("Document downloaded successfully")
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
          {/* Action Bar */}
          <div className="mb-4 flex items-center justify-between">
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
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
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

          {/* Signing Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Document Actions</CardTitle>
              <CardDescription>
                Sign this document or send it to someone else for signature
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




