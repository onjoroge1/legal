"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, FileDown, Send, Sparkles, Trash2, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import DocumentEditor from "@/components/dashboard/document-editor"
import { useToast } from "@/components/ui/use-toast"

interface Party {
  id: string
  name: string
  type: string
  address: string | null
  email: string | null
}

interface Document {
  id: string
  title: string
  type: string
  description: string | null
  status: string
  content: string
  state: string | null
  createdAt: string
  updatedAt: string
  parties: Party[]
}

export default function DocumentView() {
  console.log("[Document View] Component rendering")
  const params = useParams()
  const router = useRouter()
  console.log("[Document View] Params:", params)
  
  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    console.log("[Document View] Component mounted with ID:", params.id)
    if (!params.id) {
      console.error("[Document View] No document ID found in params")
      setError("No document ID found")
      setIsLoading(false)
      return
    }
    fetchDocument()
  }, [params.id])

  const fetchDocument = async () => {
    try {
      console.log("[Document View] Starting document fetch for ID:", params.id)
      setIsLoading(true)
      setError(null)
      
      const url = `/api/documents/${params.id}`
      console.log("[Document View] Fetching from URL:", url)
      
      const response = await fetch(url, {
        credentials: "include",
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log("[Document View] Fetch response status:", response.status)
      console.log("[Document View] Fetch response headers:", Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error("[Document View] Failed to fetch document:", errorData)
        throw new Error(errorData.error || "Failed to fetch document")
      }

      const data = await response.json()
      console.log("[Document View] Document fetched successfully:", data.id)
      console.log("[Document View] Document data:", {
        id: data.id,
        title: data.title,
        type: data.type,
        status: data.status,
        hasContent: !!data.content,
        partiesCount: data.parties?.length
      })
      setDocument(data)
    } catch (error) {
      console.error("[Document View] Error fetching document:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch document")
      toast({
        title: "Error",
        description: "Failed to fetch document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateDocument = async () => {
    if (!document) return

    try {
      console.log("[Document View] Starting document update")
      setIsSaving(true)
      const response = await fetch(`/api/documents/${document.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: document.title,
          type: document.type,
          description: document.description,
          state: document.state,
          content: document.content,
        }),
      })

      console.log("[Document View] Update response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.error("[Document View] Failed to update document:", errorData)
        throw new Error(errorData.error || "Failed to update document")
      }

      const updatedDoc = await response.json()
      console.log("[Document View] Document updated successfully:", updatedDoc.id)
      setDocument(updatedDoc)
      toast({
        title: "Document Updated",
        description: "Your document has been updated successfully.",
      })
    } catch (error) {
      console.error("[Document View] Error updating document:", error)
      toast({
        title: "Error",
        description: "Failed to update document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "completed":
      case "signed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "needs_review":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    console.log("[Document View] Loading state")
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!document) {
    console.log("[Document View] No document found")
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Document not found</p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  console.log("[Document View] Rendering document:", document.id)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
            <p className="text-muted-foreground">View and edit your document</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={updateDocument}
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button className="gap-1">
            <FileDown className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Document Details</TabsTrigger>
          <TabsTrigger value="editor">Document Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
              <CardDescription>View and edit document information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={document.title}
                  onChange={(e) => setDocument({ ...document, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={document.type}
                  onValueChange={(value) => setDocument({ ...document, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                    <SelectItem value="service-agreement">Service Agreement</SelectItem>
                    <SelectItem value="llc-operating">LLC Operating Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={document.description || ""}
                  onChange={(e) => setDocument({ ...document, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={document.state || ""}
                  onValueChange={(value) => setDocument({ ...document, state: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Editor</CardTitle>
              <CardDescription>Edit your document content</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentEditor
                content={document.content}
                onChange={(content) => setDocument({ ...document, content })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
              <CardDescription>Preview your document as it will appear</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden bg-white dark:bg-gray-950">
                <div className="p-8 max-w-4xl mx-auto">
                  {/* Document Header */}
                  <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold uppercase tracking-wider mb-12">{document.title}</h1>
                    <p className="text-base leading-relaxed">
                      This {document.title} (the "Agreement") is entered into as of {new Date().toLocaleDateString()} by and between:
                    </p>
                  </div>

                  {/* Document Parties */}
                  <div className="mb-12">
                    {document.parties && document.parties.map((party, index) => (
                      <div key={party.id} className="mb-6">
                        <p className="leading-relaxed">
                          <span className="font-bold">{party.type === 'disclosing' ? 'Disclosing Party' : 'Receiving Party'}:</span>{' '}
                          {party.name}, with an address at {party.address} (the "{party.type === 'disclosing' ? 'Disclosing Party' : 'Receiving Party'}"){index === 0 ? '; and' : '.'}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Document Content */}
                  <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-invert">
                    {document.content.split('\n').map((paragraph, index) => {
                      // Main section header (##)
                      if (paragraph.startsWith('##')) {
                        return (
                          <h2 key={index} className="text-3xl font-extrabold uppercase tracking-wider text-center my-12">
                            {paragraph.replace('##', '').trim()}
                          </h2>
                        );
                      }
                      
                      // Party sections with bold headers
                      if (paragraph.startsWith('**Party')) {
                        return (
                          <div key={index} className="my-8">
                            <h3 className="text-xl font-bold mb-4">{paragraph.replace(/\*\*/g, '')}</h3>
                          </div>
                        );
                      }

                      // Bold sections (like RECITALS:)
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={index} className="text-xl font-bold my-8">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }

                      // Party details (Name:, Type:, etc.)
                      if (paragraph.match(/^(Name|Type|Address|Email):/)) {
                        const [label, value] = paragraph.split(':').map(part => part.trim());
                        return (
                          <p key={index} className="ml-8 mb-2">
                            <span className="font-semibold">{label}:</span> {value}
                          </p>
                        );
                      }

                      // WHEREAS statements
                      if (paragraph.startsWith('WHEREAS')) {
                        return (
                          <p key={index} className="mb-4 ml-4 leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      }

                      // Numbered sections (### 1. TERM)
                      if (paragraph.startsWith('###')) {
                        const sectionText = paragraph.replace('###', '').trim();
                        return (
                          <h3 key={index} className="text-xl font-bold mt-10 mb-6">
                            {sectionText}
                          </h3>
                        );
                      }

                      // Regular paragraphs
                      return (
                        <p key={index} className="mb-6 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Document Footer */}
                  <div className="mt-16 pt-8 border-t">
                    <div className="grid grid-cols-2 gap-8 mt-12">
                      <div className="space-y-8">
                        <p className="font-bold">Disclosing Party:</p>
                        <div className="border-b border-black w-full"></div>
                        <p className="text-sm">Name:</p>
                        <div className="border-b border-black w-full"></div>
                        <p className="text-sm">Date:</p>
                      </div>
                      <div className="space-y-8">
                        <p className="font-bold">Receiving Party:</p>
                        <div className="border-b border-black w-full"></div>
                        <p className="text-sm">Name:</p>
                        <div className="border-b border-black w-full"></div>
                        <p className="text-sm">Date:</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline" className="gap-1">
                <Send className="h-4 w-4" />
                Send for Review
              </Button>
              <Button className="gap-1">
                <FileDown className="h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 