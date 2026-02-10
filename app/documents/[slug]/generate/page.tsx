"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import {
  Scale,
  Send,
  FileText,
  Shield,
  CheckCircle2,
  Bot,
  User,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getDocumentBySlug } from "@/lib/document-data"
import { useSession } from "next-auth/react"
import { PermissionGate } from "@/components/permissions/permission-gate"
import { useCanPerformAction } from "@/hooks/use-permissions"
import NDAForm, { NDAFormData } from "@/components/documents/nda-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getNDATemplate } from "@/lib/templates/nda-template"
import DocumentPreview from "@/components/documents/document-preview"
import DocumentSigning from "@/components/documents/document-signing"
import { toast } from "@/lib/safe-toast"

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

const progressSteps = [
  { label: "Jurisdiction", key: "state" },
  { label: "Document Type", key: "type" },
  { label: "Parties", key: "parties" },
  { label: "Relationship", key: "relationship" },
  { label: "Details", key: "details" },
  { label: "Terms", key: "terms" },
  { label: "Clauses", key: "clauses" },
  { label: "Review", key: "review" },
]

export default function GeneratePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const document = getDocumentBySlug(slug)
  const { data: session } = useSession()
  const [hasSubscription, setHasSubscription] = useState(false)
  const { allowed: canGenerate, isLoading: checkingPermissions } = useCanPerformAction("generate")

  const [input, setInput] = useState("")
  const [draftDocumentId, setDraftDocumentId] = useState<string | null>(null)
  const [formData, setFormData] = useState<NDAFormData>({
    state: "",
    type: "unilateral",
    disclosingParty: "",
    receivingParty: "",
    relationship: "",
    confidentialInfo: "",
    duration: "",
    nonSolicitation: "no",
    nonCompete: "no",
    additional: "",
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Create draft document when user starts generation
  useEffect(() => {
    const createDraft = async () => {
      if (!session?.user?.email || !document) return

      try {
        // Check if draft already exists for this document type
        const existingDraftResponse = await fetch(`/api/documents/draft?slug=${slug}`)
        if (existingDraftResponse.ok) {
          const existingDraft = await existingDraftResponse.json()
          setDraftDocumentId(existingDraft.id)
          return
        }

        // Create new draft
        const response = await fetch("/api/documents/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: document.title,
            type: document.type || document.title,
            slug: slug,
            category: document.category,
            status: "draft",
            metadata: {
              source: "generate",
              documentType: document.title,
            },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setDraftDocumentId(data.id)
        }
      } catch (error) {
        console.error("Error creating draft:", error)
      }
    }

    createDraft()
  }, [session, document, slug])

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!session?.user?.email) return

      try {
        const response = await fetch("/api/user/subscription")
        const data = await response.json()
        setHasSubscription(data.subscription?.isActive ?? false)
      } catch (error) {
        console.error("Error checking subscription:", error)
      }
    }

    checkSubscription()
  }, [session])

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/nda-chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Estimate progress based on message count
  const assistantMessageCount = messages.filter((m) => m.role === "assistant").length
  const estimatedStep = Math.min(assistantMessageCount, progressSteps.length)
  const progressPercent = Math.round((estimatedStep / progressSteps.length) * 100)

  // Check if document generation is complete
  const lastAssistantMessage = messages.filter((m) => m.role === "assistant").pop()
  const lastText = lastAssistantMessage ? getMessageText(lastAssistantMessage) : ""
  const isComplete = lastText.includes("---NDA_COMPLETE---") || lastText.includes("---DOCUMENT_COMPLETE---")

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status])

  // Auto-send initial greeting
  useEffect(() => {
    if (messages.length === 0 && document) {
      sendMessage({
        text: `Hi, I want to generate a ${document.title}. Let's get started!`,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const saveDocument = async (): Promise<string | null> => {
    if (!isFormValid) {
      return null
    }

    try {
      // Generate document content
      const documentContent = getNDATemplate({
        contractDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        state: formData.state,
        type: formData.type,
        disclosingParty: formData.disclosingParty,
        receivingParty: formData.receivingParty,
        relationship: formData.relationship,
        confidentialInfo: formData.confidentialInfo,
        duration: formData.duration,
        nonSolicitation: formData.nonSolicitation,
        nonCompete: formData.nonCompete,
        additional: formData.additional,
      })

      // If draft exists, update it with content
      if (draftDocumentId) {
        const response = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: draftDocumentId,
            title: document.title,
            type: document.type || "NDA",
            category: document.category || "business",
            content: documentContent,
            status: "draft",
            metadata: {
              formData,
              slug,
            },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          return data.id || draftDocumentId
        }
      } else {
        // Create new document
        const response = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: document.title,
            type: document.type || "NDA",
            category: document.category || "business",
            content: documentContent,
            status: "draft",
            metadata: {
              formData,
              slug,
            },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setDraftDocumentId(data.id)
          return data.id
        }
      }

      return draftDocumentId
    } catch (error) {
      console.error("Error saving document:", error)
      return null
    }
  }

  const handleGenerateDocument = async () => {
    if (!isFormValid) {
      return
    }

    setIsGenerating(true)
    try {
      // Convert form data to API format
      const ndaData = {
        STATE: formData.state,
        TYPE: formData.type,
        DISCLOSING_PARTY: formData.disclosingParty,
        RECEIVING_PARTY: formData.receivingParty,
        RELATIONSHIP: formData.relationship,
        CONFIDENTIAL_INFO: formData.confidentialInfo,
        DURATION: formData.duration,
        NON_SOLICITATION: formData.nonSolicitation,
        NON_COMPETE: formData.nonCompete,
        ADDITIONAL: formData.additional || "none",
      }

      // Store document data
      sessionStorage.setItem("document-data", JSON.stringify(ndaData))
      sessionStorage.setItem("document-slug", slug)
      
      // Update draft document with generation data if it exists
      if (draftDocumentId) {
        try {
          await fetch("/api/documents/draft", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentId: draftDocumentId,
              metadata: {
                generationData: ndaData,
                generationComplete: true,
                completedAt: new Date().toISOString(),
              },
            }),
          })
        } catch (error) {
          console.error("Error updating draft:", error)
        }
      }
      
      // If user has subscription, skip preview and go directly to download
      if (hasSubscription) {
        router.push(`/documents/${slug}/download`)
      } else {
        // Otherwise go to preview (watermarked)
        router.push(`/documents/${slug}/preview`)
      }
    } catch (error) {
      console.error("Error generating document:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (!document) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Document not found</h1>
          <Link href="/documents" className="mt-4 text-primary hover:underline">
            Back to Documents
          </Link>
        </div>
      </div>
    )
  }

  // Check permissions before rendering
  if (checkingPermissions) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    )
  }

  return (
    <PermissionGate action="generate">
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="shrink-0 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Legal<span className="text-primary">Law</span>Docs
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">{document.title} Generator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Form */}
        <aside className="hidden w-96 shrink-0 border-r border-border/40 bg-card/40 lg:block">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Document Information</h2>
              </div>

              <NDAForm
                formData={formData}
                onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
                onValidate={setIsFormValid}
              />

              <div className="mt-8 pt-6 border-t">
                <Button
                  onClick={handleGenerateDocument}
                  disabled={!isFormValid || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Document
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {!isFormValid && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Please fill in all required fields
                  </p>
                )}
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Preview/Info Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-border/40 bg-card/80 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Document Preview</h3>
                  </div>
                  {isFormValid && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Ready to Generate
                    </Badge>
                  )}
                </div>
                
                {isFormValid ? (
                  <div className="space-y-4">
                    <ScrollArea className="h-[calc(100vh-350px)]">
                      <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 max-w-4xl mx-auto border border-gray-200">
                        <DocumentPreview 
                          template={getNDATemplate({
                            contractDate: new Date().toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }),
                            state: formData.state,
                            type: formData.type,
                            disclosingParty: formData.disclosingParty || "[Disclosing Party]",
                            receivingParty: formData.receivingParty || "[Receiving Party]",
                            relationship: formData.relationship || "[Relationship]",
                            confidentialInfo: formData.confidentialInfo || "[Confidential Information]",
                            duration: formData.duration || "[Duration]",
                            nonSolicitation: formData.nonSolicitation,
                            nonCompete: formData.nonCompete,
                            additional: formData.additional,
                          })}
                        />
                      </div>
                    </ScrollArea>
                    
                    {/* Signing Actions */}
                    <div className="bg-card/50 rounded-lg p-4 border border-border/40">
                      <DocumentSigning
                        documentId={draftDocumentId || undefined}
                        documentTitle={document.title}
                        onSaveDocument={saveDocument}
                        onSignComplete={() => {
                          // Refresh or update UI after signing
                          toast.success("Document signed successfully!")
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Fill out all the required information in the form on the left. Once all fields are completed, 
                      you'll see a preview of your customized Non-Disclosure Agreement here.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">What you'll get:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                        <li>State-specific legal compliance</li>
                        <li>Professional formatting</li>
                        <li>All required legal sections</li>
                        <li>Customized clauses based on your needs</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat area (hidden on desktop, shown on mobile as fallback) */}
          <div className="lg:hidden mt-6">
            <div className="border-b border-border/40 bg-card/30 px-4 py-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Document Progress</span>
                <span className="font-semibold text-primary">{progressPercent}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto max-w-2xl space-y-6">
              {messages.map((message) => {
                const text = getMessageText(message)
                if (!text) return null
                const isUser = message.role === "user"

                // Don't show the initial auto-message from user visually
                if (isUser && text.includes("I want to generate")) return null

                // Don't show the raw completion data block
                const displayText = text.includes("---NDA_COMPLETE---") || text.includes("---DOCUMENT_COMPLETE---")
                  ? text.split("---")[0].trim()
                  : text

                if (!displayText) return null

                return (
                  <div key={message.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isUser
                          ? "border border-primary/20 bg-primary/10"
                          : "border border-accent/20 bg-accent/10"
                      }`}
                    >
                      {isUser ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Bot className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                        isUser
                          ? "bg-primary/10 text-foreground"
                          : "border border-border/40 bg-card/80 text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{displayText}</p>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/80 px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Completion CTA */}
              {isComplete && !isLoading && (
                <div className="animate-slide-up rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
                    <Sparkles className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                    All Information Gathered!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We have everything we need to generate your customized, legally compliant document.
                  </p>
                  <Button
                    onClick={handleGenerateDocument}
                    size="lg"
                    className="mt-5 gap-2 shadow-lg shadow-primary/20"
                  >
                    Generate My {document.title.split(" ")[0]}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            </div>
          </div>

          {/* Chat Input (Mobile only - fallback) */}
          {!isComplete && (
            <div className="lg:hidden shrink-0 border-t border-border/40 bg-card/30 px-4 py-4">
              <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-center gap-3">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={isLoading}
                    className="w-full rounded-xl border border-border/60 bg-secondary/30 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  />
                </div>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="h-11 w-11 shrink-0 rounded-xl shadow-md shadow-primary/20"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
              <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-muted-foreground/60">
                Your responses are encrypted and used solely for document generation.
              </p>
            </div>
          )}
          
          {/* Desktop: Show message when form is complete */}
          {isFormValid && (
            <div className="hidden lg:block shrink-0 border-t border-border/40 bg-card/30 px-4 py-4">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm text-muted-foreground">
                  All required information has been filled. Click "Generate Document" in the sidebar to create your NDA.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </PermissionGate>
  )
}


