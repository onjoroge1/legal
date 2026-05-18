"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Scale,
  FileText,
  Shield,
  Loader2,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getDocumentBySlug } from "@/lib/document-catalog"
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
  const searchParams = useSearchParams()
  const category = params?.category as string
  const slug = params?.slug as string
  const doc = getDocumentBySlug(slug)
  const { data: session } = useSession()
  const [hasSubscription, setHasSubscription] = useState(false)

  // ?intent=<id> pre-selects a specific intent variant (from intent landing pages)
  const preselectedIntentId = searchParams?.get("intent") ?? null

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

  // legacySlug: used for template/draft/document-access DB lookups (keyed by old underscore slug)
  // category/slug: used for canonical generate + chat API calls
  const legacySlug = doc?.legacySlug ?? slug

  useEffect(() => {
    if (intents.length > 0 && !selectedIntent) {
      // Pre-select via ?intent= query param (e.g. from intent landing pages)
      if (preselectedIntentId) {
        const match = intents.find(
          (i) => i.id === preselectedIntentId || i.slug === preselectedIntentId
        )
        setSelectedIntent(match ?? intents[0])
      } else {
        setSelectedIntent(intents[0])
      }
    }
  }, [intents, selectedIntent, preselectedIntentId])

  useEffect(() => {
    const loadIntents = async () => {
      if (!legacySlug) return
      const registryIntents = getIntentsForDocument(legacySlug)
      if (registryIntents.length > 0) {
        setIntents(registryIntents)
        return
      }
      try {
        const response = await fetch(`/api/templates/${legacySlug}/intents`)
        if (response.ok) setIntents(await response.json())
      } catch {}
    }
    loadIntents()
  }, [legacySlug])

  useEffect(() => {
    const load = async () => {
      if (!legacySlug) return
      setIsLoadingQuestions(true)
      setQuestionError(null)
      try {
        const response = await fetch(`/api/templates/${legacySlug}/questionnaires`)
        if (response.ok) {
          const questionnaires = await response.json()
          const match = selectedIntent
            ? questionnaires.find(
                (q: any) => q.metadata?.intent === selectedIntent.id || q.name === selectedIntent.name
              ) || questionnaires[0]
            : questionnaires[0]
          if (match) {
            setQuestions(match.questions || [])
          } else {
            setQuestions([])
            setQuestionError("No questionnaire configured for this document type.")
          }
        }
      } catch {
        setQuestionError("Failed to load questionnaire data.")
      }
      setIsLoadingQuestions(false)
    }
    load()
  }, [legacySlug, selectedIntent])

  useEffect(() => {
    if (!legacySlug) return
    setValidationErrors(getDocumentValidation(legacySlug, formData, selectedIntent?.id))
  }, [legacySlug, formData, selectedIntent])

  useEffect(() => {
    if (!legacySlug) return
    setStateWarnings(getStateWarnings(legacySlug, formData.state, selectedIntent?.id))
  }, [legacySlug, formData.state, selectedIntent])

  useEffect(() => {
    const createDraft = async () => {
      if (!session?.user?.email || !doc) return
      try {
        const existingRes = await fetch(`/api/documents/draft?slug=${legacySlug}`)
        if (existingRes.ok) {
          const existing = await existingRes.json()
          setDraftDocumentId(existing.id)
          if (existing.metadata?.formData) setFormData(existing.metadata.formData)
          if (existing.metadata?.intent) {
            const intent = intents.find((i) => i.id === existing.metadata.intent)
            if (intent) setSelectedIntent(intent)
          }
          return
        }
        const res = await fetch("/api/documents/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: doc.title,
            type: doc.title,
            slug: legacySlug,
            category: doc.category,
            status: "draft",
            metadata: { source: "generate", documentType: doc.title, intent: selectedIntent?.id },
          }),
        })
        if (res.ok) setDraftDocumentId((await res.json()).id)
      } catch {}
    }
    createDraft()
  }, [session, doc, legacySlug, selectedIntent, intents])

  useEffect(() => {
    if (typeof window === "undefined" || !legacySlug) return
    if (Object.keys(formData).length > 0) return
    const stored = localStorage.getItem("document-data")
    const storedSlug = localStorage.getItem("document-slug")
    if (stored && storedSlug === legacySlug) {
      try {
        const data = JSON.parse(stored)
        setFormData(data)
        if (localStorage.getItem("document-intent") && intents.length > 0) {
          const intent = intents.find((i) => i.id === localStorage.getItem("document-intent"))
          if (intent) setSelectedIntent(intent)
        }
      } catch {}
    }
  }, [legacySlug, intents, formData])

  useEffect(() => {
    const check = async () => {
      if (!session?.user?.email) return
      try {
        const data = await fetch("/api/user/subscription").then((r) => r.json())
        setHasSubscription(data.subscription?.isActive ?? false)
      } catch {}
    }
    check()
  }, [session])

  useEffect(() => {
    const genPreview = async () => {
      if (!isFormValid || !legacySlug) return
      try {
        const res = await fetch(`/api/documents/${category}/${slug}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, intent: selectedIntent?.id }),
        })
        if (res.ok) setDocumentPreview((await res.json()).document)
      } catch {}
    }
    genPreview()
  }, [isFormValid, formData, legacySlug, selectedIntent])

  const saveDocument = async (): Promise<string | null> => {
    if (!isFormValid || !doc) return null
    try {
      const res = await fetch(`/api/documents/${category}/${slug}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, intent: selectedIntent?.id }),
      })
      if (!res.ok) throw new Error("Failed to generate document")
      const { document: content } = await res.json()
      const endpoint = draftDocumentId ? "/api/documents" : "/api/documents"
      const saveRes = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(draftDocumentId ? { id: draftDocumentId } : {}),
          title: doc.title,
          type: doc.title,
          category: doc.category,
          content,
          status: "draft",
          metadata: { formData, slug: legacySlug, intent: selectedIntent?.id },
        }),
      })
      if (saveRes.ok) {
        const saved = await saveRes.json()
        if (!draftDocumentId) setDraftDocumentId(saved.id)
        return saved.id || draftDocumentId
      }
    } catch {}
    return draftDocumentId
  }

  const handleFormChange = (data: Record<string, any>) => {
    const newData = { ...formData, ...data }
    setFormData(newData)
    if (draftDocumentId) {
      fetch("/api/documents/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: draftDocumentId, metadata: { formData: newData } }),
      }).catch(() => {})
    }
    sessionStorage.setItem("document-data", JSON.stringify(newData))
    sessionStorage.setItem("document-slug", legacySlug)
    localStorage.setItem("document-data", JSON.stringify(newData))
    localStorage.setItem("document-slug", legacySlug)
    if (selectedIntent) {
      sessionStorage.setItem("document-intent", selectedIntent.id)
      localStorage.setItem("document-intent", selectedIntent.id)
    }
  }

  const handleGenerateDocument = async () => {
    if (!isFormValid || !doc) return
    setIsGenerating(true)
    try {
      sessionStorage.setItem("document-data", JSON.stringify(formData))
      sessionStorage.setItem("document-slug", legacySlug)
      localStorage.setItem("document-data", JSON.stringify(formData))
      localStorage.setItem("document-slug", legacySlug)
      if (selectedIntent) {
        sessionStorage.setItem("document-intent", selectedIntent.id)
        localStorage.setItem("document-intent", selectedIntent.id)
      }

      if (hasSubscription && session?.user?.email) {
        const genRes = await fetch(`/api/documents/${category}/${slug}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, intent: selectedIntent?.id }),
        })
        if (genRes.ok) {
          const { document: content } = await genRes.json()
          const saveRes = await fetch("/api/documents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: doc.title,
              type: doc.title,
              category: doc.category,
              content,
              status: "completed",
              metadata: { formData, slug: legacySlug, intent: selectedIntent?.id, generatedAt: new Date().toISOString() },
            }),
          })
          if (saveRes.ok) {
            const saved = await saveRes.json()
            router.push(`/dashboard/documents/${saved.id}`)
            return
          }
        }
      }

      router.push(`/documents/${category}/${slug}/preview`)
    } catch {
    } finally {
      setIsGenerating(false)
    }
  }

  if (!doc) {
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

  return (
    <div className="flex h-screen flex-col">
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
              <span className="text-sm text-muted-foreground">{doc.title} Generator</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
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
                      {stateWarnings.map((w) => <li key={w}>{w}</li>)}
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
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {isLoadingQuestions ? "Loading form..." : "No form configured yet."}
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
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</>
                  ) : (
                    <>Generate Document<ArrowRight className="ml-2 h-4 w-4" /></>
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

        <div className="flex flex-1 flex-col">
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
                    <div className="bg-card/50 rounded-lg p-4 border border-border/40">
                      <DocumentSigning
                        documentId={draftDocumentId || undefined}
                        documentTitle={doc.title}
                        onSaveDocument={saveDocument}
                        onSignComplete={() => { toast.success("Document signed successfully!") }}
                        slug={legacySlug}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Fill out all the required information in the form on the left. Once all fields are completed,
                      you'll see a preview of your customized {doc.title} here.
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
