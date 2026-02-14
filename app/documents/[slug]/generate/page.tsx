"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Scale,
  FileText,
  Shield,
  Loader2,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getDocumentBySlug } from "@/lib/document-data"
import { useSession } from "next-auth/react"
import { ScrollArea } from "@/components/ui/scroll-area"
import DocumentPreview from "@/components/documents/document-preview"
import DocumentSigning from "@/components/documents/document-signing"
import { toast } from "@/lib/safe-toast"
import DocumentForm from "@/components/documents/document-form"
import { getIntentsForDocument, Intent } from "@/lib/intent-registry"
import { getDocumentValidation } from "@/lib/document-validation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getStateWarnings } from "@/lib/state-warnings"

export default function GeneratePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const document = getDocumentBySlug(slug)
  const { data: session } = useSession()
  const [hasSubscription, setHasSubscription] = useState(false)

  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null)
  const [intents, setIntents] = useState<Intent[]>([])
  const [questions, setQuestions] = useState<any[]>([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [draftDocumentId, setDraftDocumentId] = useState<string | null>(null)
  const [documentPreview, setDocumentPreview] = useState<string>("")
  const [stateWarnings, setStateWarnings] = useState<string[]>([])

  // Load intents
  useEffect(() => {
    const loadIntents = async () => {
      if (!slug) return

      // First try from registry
      const registryIntents = getIntentsForDocument(slug)
      if (registryIntents.length > 0) {
        setIntents(registryIntents)
        return
      }

      // Then try from API
      try {
        const response = await fetch(`/api/templates/${slug}/intents`)
        if (response.ok) {
          const apiIntents = await response.json()
          setIntents(apiIntents)
        }
      } catch (error) {
        console.error("Error loading intents:", error)
      }
    }

    loadIntents()
  }, [slug])

  // Load questions when intent is selected
  useEffect(() => {
    const loadQuestions = async () => {
      if (!slug) return
      setIsLoadingQuestions(true)
      setQuestionError(null)

      if (!slug || !selectedIntent) {
        // If no intent needed, try to load default questions
        if (!selectedIntent && intents.length === 0) {
          try {
            const response = await fetch(`/api/templates/${slug}/questionnaires`)
            if (response.ok) {
              const questionnaires = await response.json()
              if (questionnaires.length > 0) {
                const questions = questionnaires[0].questions || []
                setQuestions(questions)
              } else {
                setQuestions([])
                setQuestionError("No questionnaire configured for this document type. Run the seed script to create templates and questions.")
              }
            }
          } catch (error) {
            console.error("Error loading questions:", error)
            setQuestionError("Failed to load questionnaire data.")
          }
          setIsLoadingQuestions(false)
        }
        return
      }

      try {
        const response = await fetch(`/api/templates/${slug}/questionnaires`)
        if (response.ok) {
          const questionnaires = await response.json()
          // Find questionnaire matching intent
          const matchingQuestionnaire = questionnaires.find(
            (q: any) => q.metadata?.intent === selectedIntent.id || q.name === selectedIntent.name
          ) || questionnaires[0]

          if (matchingQuestionnaire) {
            setQuestions(matchingQuestionnaire.questions || [])
          } else {
            setQuestions([])
            setQuestionError("No questionnaire configured for this intent.")
          }
        }
      } catch (error) {
        console.error("Error loading questions:", error)
        setQuestionError("Failed to load questionnaire data.")
      }
      setIsLoadingQuestions(false)
    }

    loadQuestions()
  }, [slug, selectedIntent, intents.length])

  // Custom validation by document type + intent
  useEffect(() => {
    if (!slug) return
    const errors = getDocumentValidation(slug, formData, selectedIntent?.id)
    setValidationErrors(errors)
  }, [slug, formData, selectedIntent])

  useEffect(() => {
    if (!slug) return
    const warnings = getStateWarnings(slug, formData.state, selectedIntent?.id)
    setStateWarnings(warnings)
  }, [slug, formData.state, selectedIntent])

  // Create draft document when user starts generation
  useEffect(() => {
    const createDraft = async () => {
      if (!session?.user?.email || !document) return

      try {
        const existingDraftResponse = await fetch(`/api/documents/draft?slug=${slug}`)
        if (existingDraftResponse.ok) {
          const existingDraft = await existingDraftResponse.json()
          setDraftDocumentId(existingDraft.id)
          // Load existing form data if available
          if (existingDraft.metadata?.formData) {
            setFormData(existingDraft.metadata.formData)
          }
          if (existingDraft.metadata?.intent) {
            const intent = intents.find((i) => i.id === existingDraft.metadata.intent)
            if (intent) setSelectedIntent(intent)
          }
          return
        }

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
              intent: selectedIntent?.id,
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
  }, [session, document, slug, selectedIntent, intents])

  // Load cached form data for non-authenticated users
  useEffect(() => {
    if (typeof window === "undefined" || !slug) return
    if (Object.keys(formData).length > 0) return

    const stored = localStorage.getItem("document-data")
    const storedSlug = localStorage.getItem("document-slug")
    const storedIntent = localStorage.getItem("document-intent")

    if (stored && storedSlug === slug) {
      try {
        const data = JSON.parse(stored)
        setFormData(data)
        if (storedIntent && intents.length > 0) {
          const intent = intents.find((i) => i.id === storedIntent)
          if (intent) setSelectedIntent(intent)
        }
      } catch (error) {
        console.error("Error loading cached form data:", error)
      }
    }
  }, [slug, intents, formData])

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

  // Generate preview when form is valid
  useEffect(() => {
    const generatePreview = async () => {
      if (!isFormValid || !slug) return

      try {
        const response = await fetch(`/api/documents/${slug}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData,
            intent: selectedIntent?.id,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setDocumentPreview(data.document)
        }
      } catch (error) {
        console.error("Error generating preview:", error)
      }
    }

    generatePreview()
  }, [isFormValid, formData, slug, selectedIntent])

  const handleIntentSelect = (intent: Intent) => {
    setSelectedIntent(intent)
    // Update draft with intent
    if (draftDocumentId) {
      fetch("/api/documents/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: draftDocumentId,
          metadata: {
            intent: intent.id,
          },
        }),
      }).catch(console.error)
    }
  }

  const handleFormChange = (data: Record<string, any>) => {
    const newFormData = { ...formData, ...data }
    setFormData(newFormData)

    // Save to draft
    if (draftDocumentId) {
      fetch("/api/documents/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: draftDocumentId,
          metadata: {
            formData: newFormData,
          },
        }),
      }).catch(console.error)
    }

    // Also save to sessionStorage/localStorage for non-authenticated users
    sessionStorage.setItem("document-data", JSON.stringify(newFormData))
    sessionStorage.setItem("document-slug", slug)
    if (selectedIntent) {
      sessionStorage.setItem("document-intent", selectedIntent.id)
    }
    localStorage.setItem("document-data", JSON.stringify(newFormData))
    localStorage.setItem("document-slug", slug)
    if (selectedIntent) {
      localStorage.setItem("document-intent", selectedIntent.id)
    }
  }

  const saveDocument = async (): Promise<string | null> => {
    if (!isFormValid) {
      return null
    }

    try {
      const response = await fetch(`/api/documents/${slug}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          intent: selectedIntent?.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate document")
      }

      const data = await response.json()
      const documentContent = data.document

      // Update draft with content
      if (draftDocumentId) {
        const updateResponse = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: draftDocumentId,
            title: document.title,
            type: document.type || document.title,
            category: document.category || "business",
            content: documentContent,
            status: "draft",
            metadata: {
              formData,
              slug,
              intent: selectedIntent?.id,
            },
          }),
        })

        if (updateResponse.ok) {
          const updateData = await updateResponse.json()
          return updateData.id || draftDocumentId
        }
      } else {
        // Create new document
        const createResponse = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: document.title,
            type: document.type || document.title,
            category: document.category || "business",
            content: documentContent,
            status: "draft",
            metadata: {
              formData,
              slug,
              intent: selectedIntent?.id,
            },
          }),
        })

        if (createResponse.ok) {
          const createData = await createResponse.json()
          setDraftDocumentId(createData.id)
          return createData.id
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
      // Store document data
      sessionStorage.setItem("document-data", JSON.stringify(formData))
      sessionStorage.setItem("document-slug", slug)
      if (selectedIntent) {
        sessionStorage.setItem("document-intent", selectedIntent.id)
      }
      localStorage.setItem("document-data", JSON.stringify(formData))
      localStorage.setItem("document-slug", slug)
      if (selectedIntent) {
        localStorage.setItem("document-intent", selectedIntent.id)
      }

      // Update draft document with generation data if it exists
      if (draftDocumentId) {
        try {
          await fetch("/api/documents/draft", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentId: draftDocumentId,
              metadata: {
                generationData: formData,
                generationComplete: true,
                completedAt: new Date().toISOString(),
                intent: selectedIntent?.id,
              },
            }),
          })
        } catch (error) {
          console.error("Error updating draft:", error)
        }
      }

      // If user has active subscription, save to dashboard and redirect to document view
      if (hasSubscription && session?.user?.email) {
        // Premium user: Save document and redirect to document view page
        try {
          const generateResponse = await fetch(`/api/documents/${slug}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              formData,
              intent: selectedIntent?.id,
            }),
          })

          if (generateResponse.ok) {
            const { document: documentContent } = await generateResponse.json()
            
            // Save to user's documents
            const saveResponse = await fetch("/api/documents", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: document.title,
                type: document.type || document.title,
                category: document.category || "business",
                content: documentContent,
                status: "completed",
                metadata: {
                  formData,
                  slug,
                  intent: selectedIntent?.id,
                  generatedAt: new Date().toISOString(),
                },
              }),
            })

            if (saveResponse.ok) {
              const savedDoc = await saveResponse.json()
              // Redirect to document view page for better UX
              router.push(`/dashboard/documents/${savedDoc.id}`)
              return
            }
          }
        } catch (error) {
          console.error("Error saving document:", error)
        }
      }

      // For free users (logged in or not) and non-logged-in users:
      // Go to preview (watermarked) - payment will be at checkout
      // This ensures free users follow the same flow as non-logged-in users
      router.push(`/documents/${slug}/preview`)
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


  // Auto-select first intent if available (skip intent selection UI)
  useEffect(() => {
    if (intents.length > 0 && !selectedIntent) {
      // Auto-select the first intent silently
      setSelectedIntent(intents[0])
    }
  }, [intents, selectedIntent])

  return (
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

                {selectedIntent && (
                  <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Selected Type</p>
                    <p className="text-sm font-semibold text-foreground">{selectedIntent.name}</p>
                  </div>
                )}

                {questionError && (
                  <Alert className="mb-4">
                    <AlertDescription>{questionError}</AlertDescription>
                  </Alert>
                )}

                {stateWarnings.length > 0 && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1">
                        {stateWarnings.map((warning) => (
                          <li key={warning}>{warning}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {questions.length > 0 ? (
                  <DocumentForm
                    questions={questions}
                    formData={formData}
                    onChange={handleFormChange}
                    onValidate={setIsFormValid}
                    externalErrors={validationErrors}
                  />
                ) : slug === "nda" ? (
                  // Fallback to NDA form for NDA documents if no questions in DB
                  <div className="text-sm text-muted-foreground">
                    <p>Loading form questions...</p>
                    <p className="mt-2 text-xs">If questions don't load, please refresh the page.</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {isLoadingQuestions ? "Loading form..." : "No form configured yet."}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      If this persists, the form may not be configured yet for this document type.
                    </p>
                  </div>
                )}

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

                  {isFormValid && documentPreview ? (
                    <div className="space-y-4">
                      <ScrollArea className="h-[calc(100vh-350px)]">
                        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 max-w-4xl mx-auto border border-gray-200">
                          <DocumentPreview template={documentPreview} />
                        </div>
                      </ScrollArea>

                      {/* Signing Actions */}
                      <div className="bg-card/50 rounded-lg p-4 border border-border/40">
                      <DocumentSigning
                        documentId={draftDocumentId || undefined}
                        documentTitle={document.title}
                        onSaveDocument={saveDocument}
                        onSignComplete={() => {
                          toast.success("Document signed successfully!")
                        }}
                        slug={slug}
                      />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Fill out all the required information in the form on the left. Once all fields are completed,
                        you'll see a preview of your customized {document.title} here.
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
          </div>
        </div>
      </div>
  )
}
