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
  ShieldCheck,
  Loader2,
  ArrowRight,
  Info,
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getDocumentBySlug } from "@/lib/document-catalog"
import { parseStatePageSlug } from "@/lib/state-pages"
import { parseInternationalPageSlug } from "@/lib/international-pages"
import { parseCityPageSlug } from "@/lib/city-pages"
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
import { getDocumentQuestions } from "@/lib/document-questions"

export default function GeneratePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const category = params?.category as string
  const slug = params?.slug as string

  // Resolve the underlying catalog doc — handles both plain slugs and
  // state-page / international-page composite slugs like
  // "california-independent-contractor-agreement".
  const _catalogDoc = getDocumentBySlug(slug)
  const _parsedState = !_catalogDoc && slug ? parseStatePageSlug(slug) : null
  const _parsedIntl = !_catalogDoc && !_parsedState && slug ? parseInternationalPageSlug(slug) : null
  const _parsedCity = !_catalogDoc && !_parsedState && !_parsedIntl && slug ? parseCityPageSlug(slug) : null
  const doc = _catalogDoc ?? _parsedState?.doc ?? _parsedIntl?.doc ?? (_parsedCity ? { slug: "residential-lease-agreement", legacySlug: "residential_lease_agreement", category: "real-estate", title: "Residential Lease Agreement" } as any : null)

  // State/country/city pre-fill: seed the form so the AI knows the jurisdiction.
  const _geoPreFill: Record<string, string> = _parsedState
    ? { state: _parsedState.state.name }
    : _parsedIntl
    ? { country: _parsedIntl.country.name }
    : _parsedCity
    ? { state: _parsedCity.city.state, city: _parsedCity.city.name }
    : {}

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
  // Mobile: toggle between form and preview panes
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form")
  // Retry tracking — max 2 retries (3 total attempts)
  const MAX_RETRIES = 2
  const [generationAttempts, setGenerationAttempts] = useState(0)
  const [generationFailed, setGenerationFailed] = useState(false)

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

  // Resolved document slug — stable string used as effect dependency instead of the doc object.
  // Using the object directly causes an infinite loop because it's reconstructed on every render.
  const docSlug = doc?.slug ?? null

  useEffect(() => {
    const load = async () => {
      if (!legacySlug || !docSlug) return
      setIsLoadingQuestions(true)
      setQuestionError(null)
      try {
        const response = await fetch(`/api/templates/${legacySlug}/questionnaires`)
        if (response.ok) {
          const questionnaires = await response.json()
          const intentId = selectedIntent?.id ?? null
          const intentName = selectedIntent?.name ?? null
          const match = intentId
            ? questionnaires.find(
                (q: any) => q.metadata?.intent === intentId || q.name === intentName
              ) || questionnaires[0]
            : questionnaires[0]
          if (match && match.questions?.length > 0) {
            // DB questionnaire found — use it
            setQuestions(match.questions)
            setIsLoadingQuestions(false)
            return
          }
        }
      } catch {
        // DB unavailable — fall through to code-defined questions
      }
      // Fallback: use code-defined questions for this document type.
      // Covers all cases where the DB has no questionnaire configured.
      setQuestions(getDocumentQuestions(docSlug))
      setIsLoadingQuestions(false)
    }
    load()
    // Depend only on string/primitive values — never objects (new reference each render = infinite loop)
  }, [legacySlug, selectedIntent?.id, docSlug])

  useEffect(() => {
    if (!legacySlug) return
    setValidationErrors(getDocumentValidation(legacySlug, formData, selectedIntent?.id))
  }, [legacySlug, formData, selectedIntent?.id])

  useEffect(() => {
    if (!legacySlug) return
    setStateWarnings(getStateWarnings(legacySlug, formData.state, selectedIntent?.id))
  }, [legacySlug, formData.state, selectedIntent?.id])

  // Stable doc metadata for use in effects — avoids object-reference churn
  const docTitle = doc?.title ?? ""
  const docCategory = doc?.category ?? ""

  useEffect(() => {
    const createDraft = async () => {
      if (!session?.user?.email || !docSlug) return
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
            title: docTitle,
            type: docTitle,
            slug: legacySlug,
            category: docCategory,
            status: "draft",
            metadata: { source: "generate", documentType: docTitle, intent: selectedIntent?.id },
          }),
        })
        if (res.ok) setDraftDocumentId((await res.json()).id)
      } catch {}
    }
    createDraft()
    // String/primitive deps only — no object references that change every render
  }, [session?.user?.email, docSlug, legacySlug, selectedIntent?.id, intents.length, docTitle, docCategory])

  useEffect(() => {
    if (typeof window === "undefined" || !legacySlug) return
    if (Object.keys(formData).length > 0) return
    const stored = localStorage.getItem("document-data")
    const storedSlug = localStorage.getItem("document-slug")
    if (stored && storedSlug === legacySlug) {
      try {
        const data = JSON.parse(stored)
        // Merge geo pre-fill but don't override anything already in storage
        setFormData({ ..._geoPreFill, ...data })
        if (localStorage.getItem("document-intent") && intents.length > 0) {
          const intent = intents.find((i) => i.id === localStorage.getItem("document-intent"))
          if (intent) setSelectedIntent(intent)
        }
      } catch {}
    } else if (Object.keys(_geoPreFill).length > 0) {
      // No stored data — seed with geo context from the landing page URL
      setFormData(_geoPreFill)
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

  // Note: document preview is only generated on explicit "Generate Document" button click,
  // not automatically on form change. Auto-generation on every keystroke wastes AI tokens
  // and creates a poor UX with multiple concurrent requests.

  const saveDocument = async (): Promise<string | null> => {
    if (!isFormValid || !doc) return null
    try {
      // Use already-generated preview content if available — avoid a redundant AI call
      let content = documentPreview

      if (!content) {
        const res = await fetch(`/api/documents/${category}/${slug}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, intent: selectedIntent?.id }),
        })
        if (!res.ok) throw new Error("Failed to generate document")
        const data = await res.json()
        content = data.document
      }

      const saveRes = await fetch("/api/documents", {
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
    // Form changed — reset retry counter so updated inputs get fresh attempts
    if (generationFailed) {
      setGenerationAttempts(0)
      setGenerationFailed(false)
    }
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

      // Generate the document content
      const genRes = await fetch(`/api/documents/${category}/${slug}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, intent: selectedIntent?.id }),
      })

      if (!genRes.ok) {
        const nextAttempts = generationAttempts + 1
        setGenerationAttempts(nextAttempts)
        setGenerationFailed(true)
        if (nextAttempts >= MAX_RETRIES) {
          toast.error("Generation failed after multiple attempts. Please contact support.")
        } else {
          toast.error(`Generation failed. You have ${MAX_RETRIES - nextAttempts} ${MAX_RETRIES - nextAttempts === 1 ? "retry" : "retries"} remaining.`)
        }
        return
      }

      const { document: content } = await genRes.json()

      // Success — reset retry counter
      setGenerationAttempts(0)
      setGenerationFailed(false)

      // Show preview in the right panel immediately + switch mobile tab
      setDocumentPreview(content)
      setMobileTab("preview")

      // Persist document content so checkout page can pass it to the API
      sessionStorage.setItem("document-content", content)

      // Subscribers: auto-save and redirect to dashboard
      if (hasSubscription && session?.user?.email) {
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

      // Non-subscribers: show preview in current page (they see it, then go to checkout)
      // No redirect — the preview panel is now populated above
    } catch {
      const nextAttempts = generationAttempts + 1
      setGenerationAttempts(nextAttempts)
      setGenerationFailed(true)
      if (nextAttempts >= MAX_RETRIES) {
        toast.error("Generation failed after multiple attempts. Please contact support.")
      } else {
        toast.error(`Something went wrong. You have ${MAX_RETRIES - nextAttempts} ${MAX_RETRIES - nextAttempts === 1 ? "retry" : "retries"} remaining.`)
      }
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

      {/* Mobile tab bar — only visible below lg */}
      <div className="flex shrink-0 border-b border-border/40 lg:hidden">
        <button
          onClick={() => setMobileTab("form")}
          className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileTab === "form"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
        >
          <FileText className="h-4 w-4" />
          Fill Out Form
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileTab === "preview"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Eye className="h-4 w-4" />
          Preview
          {documentPreview && (
            <span className="ml-1 h-2 w-2 rounded-full bg-green-500" />
          )}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`w-full shrink-0 border-r border-border/40 bg-card/40 lg:block lg:w-96 ${mobileTab === "form" ? "block" : "hidden"}`}>
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

              <div className="mt-8 pt-6 border-t space-y-3">
                {generationAttempts >= MAX_RETRIES ? (
                  // Exhausted all retries
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center space-y-2">
                    <p className="text-sm font-medium text-destructive">
                      Generation failed after {MAX_RETRIES} attempts.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This may be a temporary issue.{" "}
                      <a
                        href="mailto:support@legallawdocs.com?subject=Document%20generation%20failed"
                        className="text-primary underline"
                      >
                        Contact support
                      </a>{" "}
                      or try again later.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-1"
                      onClick={() => { setGenerationAttempts(0); setGenerationFailed(false) }}
                    >
                      Reset & Try Again
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleGenerateDocument}
                    disabled={!isFormValid || isGenerating}
                    className="w-full"
                    size="lg"
                    variant={generationFailed ? "outline" : "default"}
                  >
                    {isGenerating ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</>
                    ) : generationFailed ? (
                      <><ArrowRight className="mr-2 h-4 w-4" />Try Again ({MAX_RETRIES - generationAttempts} left)</>
                    ) : (
                      <>Generate Document<ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                )}
                {!isFormValid && generationAttempts === 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    Please fill in all required fields
                  </p>
                )}
              </div>

              {/* YMYL trust signal — honest statement of compliance basis */}
              <div className="mt-6 rounded-xl border border-border/50 bg-card/60 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs font-medium text-foreground">State-Law Compliance</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Generated documents incorporate{" "}
                  {formData.state ? (
                    <span className="font-medium text-foreground">{formData.state}</span>
                  ) : (
                    "your selected state's"
                  )}{" "}
                  statutory requirements. This is not legal advice.{" "}
                  <Link href="/lawyers" className="text-primary hover:underline">
                    Consult a licensed attorney
                  </Link>{" "}
                  for your specific situation.
                </p>
                <div className="flex items-start gap-1.5 pt-0.5">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Statutes referenced vary by state and document type. Always verify current law before signing.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        <div className={`flex flex-1 flex-col ${mobileTab === "preview" ? "block" : "hidden lg:flex"}`}>
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
                        <DocumentPreview template={documentPreview} watermark={!hasSubscription} />
                      </div>
                    </ScrollArea>
                    <div className="bg-card/50 rounded-lg p-4 border border-border/40">
                      <DocumentSigning
                        documentId={draftDocumentId || undefined}
                        documentTitle={doc.title}
                        onSaveDocument={saveDocument}
                        onSignComplete={() => { toast.success("Document signed successfully!") }}
                        slug={slug}
                        category={category}
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
