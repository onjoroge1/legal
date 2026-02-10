"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, FileDown, Send, Sparkles, Trash2, Loader2, Pen } from "lucide-react"
import Link from "next/link"
import DocumentEditor from "@/components/dashboard/document-editor"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { convertToPDF, convertToDOCX } from "@/utils/document-converter"

interface Party {
  name: string
  type: string
  address: string
  email: string
}

export default function CreateDocumentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("details")
  const [parties, setParties] = useState<Party[]>([
    { name: "", type: "individual", address: "", email: "" },
    { name: "", type: "individual", address: "", email: "" },
  ])
  const [title, setTitle] = useState(searchParams.get("title") || "")
  const [type, setType] = useState(searchParams.get("type") || "agreement")
  const [customType, setCustomType] = useState("")
  const [category, setCategory] = useState("")
  const [jurisdiction, setJurisdiction] = useState("")
  const [description, setDescription] = useState("")
  const [state, setState] = useState("ca")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [suggestedTypes, setSuggestedTypes] = useState<string[]>([])
  const { toast } = useToast()
  const [downloadFormat, setDownloadFormat] = useState("txt")
  const [isDownloading, setIsDownloading] = useState(false)
  const [savedDocumentId, setSavedDocumentId] = useState<string | null>(null)

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

  // Function to get document type suggestions
  const getDocumentTypeSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestedTypes([])
      return
    }

    try {
      setIsSearching(true)
      const response = await fetch("/api/documents/suggest-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get suggestions")
      }

      const data = await response.json()
      setSuggestedTypes(data.suggestions)
    } catch (error) {
      console.error("Error getting suggestions:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get document type suggestions",
        variant: "destructive",
      })
      // Show some default suggestions even if the API fails
      setSuggestedTypes([
        "Non-Disclosure Agreement",
        "Service Agreement",
        "Employment Contract",
        "Lease Agreement",
        "Purchase Agreement"
      ])
    } finally {
      setIsSearching(false)
    }
  }

  // Debounce the search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      getDocumentTypeSuggestions(description)
    }, 500)

    return () => clearTimeout(timer)
  }, [description])

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
    // Validate required fields
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a document title.",
        variant: "destructive",
      })
      return
    }

    if (!category) {
      toast({
        title: "Category Required",
        description: "Please select a document category.",
        variant: "destructive",
      })
      return
    }

    if (!jurisdiction) {
      toast({
        title: "Jurisdiction Required",
        description: "Please select a jurisdiction.",
        variant: "destructive",
      })
      return
    }

    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a document description.",
        variant: "destructive",
      })
      return
    }

    if (!parties.every(party => party.name.trim())) {
      toast({
        title: "Party Information Required",
        description: "Please enter names for all parties involved.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsGenerating(true)
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          type: type === "custom" ? customType : type,
          category,
          jurisdiction,
          description,
          state,
          parties,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to generate document")
      }

      if (!data.content) {
        throw new Error("No content was generated")
      }

      setGeneratedContent(data.content)
      setActiveTab("preview")
      toast({
        title: "Document Generated",
        description: "Your document has been generated successfully.",
      })
    } catch (error) {
      console.error("Error generating document:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate document. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const saveDocument = async () => {
    console.log("[Document Save] Starting save process from:", window.location.pathname)
    
    if (!generatedContent) {
      toast({
        title: "Error",
        description: "Please generate the document content first",
        variant: "destructive",
      })
      return
    }

    // Validate required fields
    if (!title || !type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (title and type)",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSaving(true)
      const documentData = {
        title,
        type,
        category,
        jurisdiction,
        description,
        state,
        content: generatedContent,
        status: "draft",
        metadata: {},
        parties: parties.map(party => ({
          name: party.name,
          type: party.type,
          address: party.address,
          email: party.email
        }))
      }

      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Check if it's a subscription limit error
        if (response.status === 403 && responseData.redirectTo) {
          toast({
            title: "Subscription Limit Reached",
            description: responseData.error,
            variant: "destructive",
          })
          router.push(responseData.redirectTo)
          return
        }
        throw new Error(responseData.error || "Failed to save document")
      }

      setSavedDocumentId(responseData.id)

      toast({
        title: "Success",
        description: "Document saved successfully",
      })

      // Redirect to the document view page
      router.push(`/dashboard/documents/${responseData.id}`)
    } catch (error) {
      console.error("[Document Save] Error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save document",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const downloadDocument = async () => {
    if (!generatedContent) {
      toast({
        title: "No content to download",
        description: "Please generate or edit document content first",
        variant: "destructive",
      })
      return
    }

    try {
      setIsDownloading(true)
      let blob: Blob
      let filename = `${title || 'document'}`

      switch (downloadFormat) {
        case "pdf":
          blob = await convertToPDF(generatedContent, title)
          filename += ".pdf"
          break
        case "docx":
          blob = await convertToDOCX(generatedContent, title)
          filename += ".docx"
          break
        default:
          blob = new Blob([generatedContent], { type: 'text/plain' })
          filename += ".txt"
      }

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast({
        title: "Download Complete",
        description: `Document downloaded as ${filename}`,
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download Failed",
        description: "Failed to download document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
                  <Label htmlFor="document-title">
                    Document Title <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="document-title" 
                    placeholder="Enter document title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document-type">
                    Document Type <span className="text-red-500">*</span>
                  </Label>
                  <div className="space-y-4">
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger id="document-type">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agreement">Agreement</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="letter">Legal Letter</SelectItem>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="custom">Custom Document</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {type === "custom" && (
                      <div className="space-y-2">
                        <Label htmlFor="custom-type">Custom Document Type</Label>
                        <Input
                          id="custom-type"
                          placeholder="Enter your custom document type"
                          value={customType}
                          onChange={(e) => setCustomType(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Describe the type of document you want to create
                        </p>
                      </div>
                    )}

                    {/* Document Type Suggestions */}
                    {suggestedTypes.length > 0 && (
                      <div className="space-y-2">
                        <Label>Suggested Document Types</Label>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTypes.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setType("custom")
                                setCustomType(suggestion)
                              }}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on your description, these document types might be relevant
                        </p>
                      </div>
                    )}

                    {isSearching && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Finding relevant document types...</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="document-category">
                        Document Category <span className="text-red-500">*</span>
                      </Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger id="document-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document-jurisdiction">
                        Jurisdiction <span className="text-red-500">*</span>
                      </Label>
                      <Select value={jurisdiction} onValueChange={setJurisdiction} required>
                        <SelectTrigger id="document-jurisdiction">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="federal">Federal</SelectItem>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="local">Local</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document-description">
                  Document Description <span className="text-red-500">*</span>
                </Label>
                <Textarea 
                  id="document-description" 
                  placeholder="Enter a brief description of the document" 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  Governing State/Jurisdiction <span className="text-red-500">*</span>
                </Label>
                <Select value={state} onValueChange={setState} required>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {jurisdiction === "international" ? (
                      <>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="nz">New Zealand</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="it">Italy</SelectItem>
                        <SelectItem value="es">Spain</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                        <SelectItem value="cn">China</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="br">Brazil</SelectItem>
                        <SelectItem value="mx">Mexico</SelectItem>
                        <SelectItem value="za">South Africa</SelectItem>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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
                {generatedContent ? (
                  <div className="prose max-w-none">
                    <div className="text-center mb-8">
                      <h1 className="text-2xl font-bold mb-2 uppercase">{title}</h1>
                      <p className="text-sm text-gray-500 text-center">Generated on {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="whitespace-pre-wrap font-serif">
                      {generatedContent}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Generate a document to see the preview
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              {savedDocumentId && (
                <Button variant="outline" className="gap-1" asChild>
                  <Link href={`/dashboard/documents/${savedDocumentId}/sign`}>
                    <Pen className="h-4 w-4" />
                    Send for Signature
                  </Link>
                </Button>
              )}
              <div className="flex items-center gap-2">
                <Select value={downloadFormat} onValueChange={setDownloadFormat}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="txt">TXT</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="gap-1"
                  onClick={downloadDocument}
                  disabled={isDownloading}
                >
                  <FileDown className="h-4 w-4" />
                  {isDownloading ? "Downloading..." : "Download"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

