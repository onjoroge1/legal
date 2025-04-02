"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, FileDown, Send, Sparkles, Trash2 } from "lucide-react"
import Link from "next/link"
import DocumentEditor from "@/components/dashboard/document-editor"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

interface Party {
  name: string
  type: string
  address: string
  email: string
}

export default function CreateDocumentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [parties, setParties] = useState<Party[]>([
    { name: "", type: "individual", address: "", email: "" },
    { name: "", type: "individual", address: "", email: "" },
  ])
  const [title, setTitle] = useState(searchParams.get("title") || "")
  const [type, setType] = useState(searchParams.get("type") || "agreement")
  const [description, setDescription] = useState("")
  const [state, setState] = useState("ca")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const templateId = searchParams.get("template")
    if (templateId) {
      // Fetch template content
      fetch(`/api/templates/${templateId}`)
        .then((res) => res.json())
        .then((data) => {
          setGeneratedContent(data.content)
        })
        .catch((error) => {
          console.error("Error fetching template:", error)
          toast({
            title: "Error",
            description: "Failed to load template content.",
            variant: "destructive",
          })
        })
    }
  }, [searchParams, toast])

  const addParty = () => {
    setParties([...parties, { name: "", type: "individual", address: "", email: "" }])
  }

  const removeParty = (index: number) => {
    if (parties.length > 2) {
      setParties(parties.filter((_, i) => i !== index))
    } else {
      toast({
        title: "Cannot remove party",
        description: "A document must have at least two parties.",
        variant: "destructive",
      })
    }
  }

  const updateParty = (index: number, field: keyof Party, value: string) => {
    const newParties = [...parties]
    newParties[index] = { ...newParties[index], [field]: value }
    setParties(newParties)
  }

  const generateDocument = async () => {
    try {
      setIsGenerating(true)
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          type,
          description,
          state,
          parties,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate document")
      }

      const data = await response.json()
      setGeneratedContent(data.content)
      toast({
        title: "Document Generated",
        description: "Your document has been generated successfully.",
      })
    } catch (error) {
      console.error("Error generating document:", error)
      toast({
        title: "Error",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const saveDocument = async () => {
    console.log("[Document Save] Save button clicked")
    console.log("[Document Save] Current state:", { 
      title, 
      type, 
      description, 
      state, 
      hasContent: !!generatedContent,
      partiesCount: parties.length 
    })

    if (!title.trim()) {
      console.log("[Document Save] Title is required")
      toast({
        title: "Title required",
        description: "Please enter a document title.",
        variant: "destructive",
      })
      return
    }

    if (!generatedContent.trim()) {
      console.log("[Document Save] Content is required")
      toast({
        title: "Content required",
        description: "Please generate or enter document content.",
        variant: "destructive",
      })
      return
    }

    try {
      console.log("[Document Save] Starting document save process")
      setIsSaving(true)
      const documentData = {
        title,
        type,
        description,
        state,
        content: generatedContent,
        parties,
      }
      console.log("[Document Save] Sending document data:", { 
        title, 
        type, 
        description, 
        state, 
        contentLength: generatedContent.length,
        partiesCount: parties.length 
      })

      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      })

      console.log("[Document Save] Save response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.error("[Document Save] Failed to save document:", errorData)
        throw new Error(errorData.error || "Failed to save document")
      }

      const document = await response.json()
      console.log("[Document Save] Document saved successfully:", document.id)
      toast({
        title: "Document Saved",
        description: "Your document has been saved successfully.",
      })
      router.push('/dashboard/documents')
    } catch (error) {
      console.error("[Document Save] Error saving document:", error)
      toast({
        title: "Error",
        description: "Failed to save document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create New Document</h1>
            <p className="text-muted-foreground">Create a new legal document from scratch or use a template</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={() => {
              console.log("[Document Save] Save button clicked from UI")
              saveDocument()
            }}
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Document"}
          </Button>
          <Button className="gap-1" onClick={generateDocument} disabled={isGenerating}>
            <FileDown className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Document"}
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
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details for your document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="document-title">Document Title</Label>
                  <Input 
                    id="document-title" 
                    placeholder="Enter document title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agreement">Agreement</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="letter">Legal Letter</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document-description">Document Description</Label>
                <Textarea 
                  id="document-description" 
                  placeholder="Enter a brief description of the document" 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Governing State/Jurisdiction</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="al">Alabama</SelectItem>
                    <SelectItem value="ak">Alaska</SelectItem>
                    <SelectItem value="az">Arizona</SelectItem>
                    <SelectItem value="ar">Arkansas</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="co">Colorado</SelectItem>
                    <SelectItem value="ct">Connecticut</SelectItem>
                    <SelectItem value="de">Delaware</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="ga">Georgia</SelectItem>
                    <SelectItem value="hi">Hawaii</SelectItem>
                    <SelectItem value="id">Idaho</SelectItem>
                    <SelectItem value="il">Illinois</SelectItem>
                    <SelectItem value="in">Indiana</SelectItem>
                    <SelectItem value="ia">Iowa</SelectItem>
                    <SelectItem value="ks">Kansas</SelectItem>
                    <SelectItem value="ky">Kentucky</SelectItem>
                    <SelectItem value="la">Louisiana</SelectItem>
                    <SelectItem value="me">Maine</SelectItem>
                    <SelectItem value="md">Maryland</SelectItem>
                    <SelectItem value="ma">Massachusetts</SelectItem>
                    <SelectItem value="mi">Michigan</SelectItem>
                    <SelectItem value="mn">Minnesota</SelectItem>
                    <SelectItem value="ms">Mississippi</SelectItem>
                    <SelectItem value="mo">Missouri</SelectItem>
                    <SelectItem value="mt">Montana</SelectItem>
                    <SelectItem value="ne">Nebraska</SelectItem>
                    <SelectItem value="nv">Nevada</SelectItem>
                    <SelectItem value="nh">New Hampshire</SelectItem>
                    <SelectItem value="nj">New Jersey</SelectItem>
                    <SelectItem value="nm">New Mexico</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="nc">North Carolina</SelectItem>
                    <SelectItem value="nd">North Dakota</SelectItem>
                    <SelectItem value="oh">Ohio</SelectItem>
                    <SelectItem value="ok">Oklahoma</SelectItem>
                    <SelectItem value="or">Oregon</SelectItem>
                    <SelectItem value="pa">Pennsylvania</SelectItem>
                    <SelectItem value="ri">Rhode Island</SelectItem>
                    <SelectItem value="sc">South Carolina</SelectItem>
                    <SelectItem value="sd">South Dakota</SelectItem>
                    <SelectItem value="tn">Tennessee</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="ut">Utah</SelectItem>
                    <SelectItem value="vt">Vermont</SelectItem>
                    <SelectItem value="va">Virginia</SelectItem>
                    <SelectItem value="wa">Washington</SelectItem>
                    <SelectItem value="wv">West Virginia</SelectItem>
                    <SelectItem value="wi">Wisconsin</SelectItem>
                    <SelectItem value="wy">Wyoming</SelectItem>
                    <SelectItem value="dc">District of Columbia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parties Involved</CardTitle>
              <CardDescription>Enter information about the parties involved in this document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {parties.map((party, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Party {index + 1}</h3>
                    {index > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeParty(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`party${index + 1}-name`}>Full Name or Business Name</Label>
                      <Input
                        id={`party${index + 1}-name`}
                        placeholder="Enter name"
                        value={party.name}
                        onChange={(e) => updateParty(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`party${index + 1}-type`}>Party Type</Label>
                      <Select
                        value={party.type}
                        onValueChange={(value) => updateParty(index, "type", value)}
                      >
                        <SelectTrigger id={`party${index + 1}-type`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`party${index + 1}-address`}>Address</Label>
                      <Input
                        id={`party${index + 1}-address`}
                        placeholder="Enter address"
                        value={party.address}
                        onChange={(e) => updateParty(index, "address", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`party${index + 1}-email`}>Email</Label>
                      <Input
                        id={`party${index + 1}-email`}
                        type="email"
                        placeholder="Enter email"
                        value={party.email}
                        onChange={(e) => updateParty(index, "email", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="mt-2" onClick={addParty}>
                Add Another Party
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Document Editor</span>
                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles className="h-4 w-4" />
                  AI Features
                </Button>
              </CardTitle>
              <CardDescription>Edit your document content or let our AI generate it for you</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentEditor content={generatedContent} onChange={setGeneratedContent} />
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline">Cancel</Button>
              <Button 
                onClick={() => {
                  console.log("[Document Save] Save button clicked from editor")
                  saveDocument()
                }}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
              <CardDescription>Preview how your document will look when generated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 min-h-[500px] bg-white">
                {generatedContent || (
                  <div className="text-center text-muted-foreground">
                    Generate a document to see the preview
                  </div>
                )}
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

