"use client"

import React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Scale,
  FileText,
  Shield,
  Loader2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Pencil,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDocumentBySlug } from "@/lib/document-data"
import { useSession } from "next-auth/react"
import { ScrollArea } from "@/components/ui/scroll-area"
import DocumentPreview from "@/components/documents/document-preview"
import DocumentSigning from "@/components/documents/document-signing"
import { toast } from "@/lib/safe-toast"
import DocumentForm, { getSections } from "@/components/documents/document-form"
import { getIntentsForDocument, Intent } from "@/lib/intent-registry"
import { getDocumentValidation } from "@/lib/document-validation"
import { getRegistryQuestions, getVisibleQuestions } from "@/lib/questionnaire-registry"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getStateWarnings } from "@/lib/state-warnings"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const GENERATION_STEPS = [
  "Analyzing your requirements...",
  "Applying state-specific provisions...",
  "Generating legal clauses...",
  "Formatting document...",
  "Finalizing...",
]

export default function GeneratePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const document = getDocumentBySlug(slug)
  const { data: session } = useSession()
  const [hasSubscription, setHasSubscription] = useState(false)

  // Wizard state
  const [currentStep, setCurrentStep] = useState(0)
  const [highestVisitedStep, setHighestVisitedStep] = useState(0)

  // Data state
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null)
  const [intents, setIntents] = useState<Intent[]>([])
  const [questions, setQuestions] = useState<any[]>([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [sectionValidity, setSectionValidity] = useState<Record<string, boolean>>({})
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [stateWarnings, setStateWarnings] = useState<string[]>([])

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [draftDocumentId, setDraftDocumentId] = useState<string | null>(null)
  const [documentPreview, setDocumentPreview] = useState<string>("")
  const [hasGenerated, setHasGenerated] = useState(false)

  // Computed sections from questions
  const sections = useMemo(
    () => getSections(questions, formData, selectedIntent?.id),
    [questions, formData, selectedIntent]
  )

  // Step computation
  const hasIntentStep = intents.length > 1
  const totalSteps = (hasIntentStep ? 1 : 0) + sections.length + 1 // +1 for review
  const intentStepOffset = hasIntentStep ? 1 : 0

  // Current step info
  const isIntentStep = hasIntentStep && currentStep === 0
  const isReviewStep = currentStep === totalSteps - 1
  const currentSectionIndex = isIntentStep || isReviewStep ? -1 : currentStep - intentStepOffset
  const currentSection = currentSectionIndex >= 0 && currentSectionIndex < sections.length
    ? sections[currentSectionIndex]
    : null

  const currentStepLabel = isIntentStep
    ? "Choose Type"
    : isReviewStep
      ? "Review & Generate"
      : currentSection?.name || ""

  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0

  // Step labels for navigation pills
  const allStepLabels = useMemo(() => {
    const labels: string[] = []
    if (hasIntentStep) labels.push("Type")
    for (const s of sections) labels.push(s.name)
    labels.push("Review")
    return labels
  }, [hasIntentStep, sections])

  // Load intents
  useEffect(() => {
    const loadIntents = async () => {
      if (!slug) return

      const registryIntents = getIntentsForDocument(slug)
      if (registryIntents.length > 0) {
        setIntents(registryIntents)
        return
      }

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

  // Auto-select first intent if only one
  useEffect(() => {
    if (intents.length === 1 && !selectedIntent) {
      setSelectedIntent(intents[0])
    }
  }, [intents, selectedIntent])

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      if (!slug) return
      setIsLoadingQuestions(true)
      setQuestionError(null)

      const registryQuestions = getRegistryQuestions(slug, selectedIntent?.id)
      if (registryQuestions.length > 0) {
        setQuestions(registryQuestions)
        setIsLoadingQuestions(false)
        return
      }

      try {
        const response = await fetch(`/api/templates/${slug}/questionnaires`)
        if (response.ok) {
          const questionnaires = await response.json()
          const matchingQuestionnaire = questionnaires.find(
            (q: any) => q.metadata?.intent === selectedIntent?.id || q.name === selectedIntent?.name
          ) || questionnaires[0]

          if (matchingQuestionnaire) {
            const dbQuestions = (matchingQuestionnaire.questions || []).map((q: any) => ({
              ...q,
              sectionOrder: q.sectionOrder ?? 0,
            }))
            setQuestions(dbQuestions)
          } else {
            setQuestions([])
            setQuestionError("No questionnaire configured for this document type.")
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

  // Validation
  useEffect(() => {
    if (!slug) return
    const visible = getVisibleQuestions(slug, formData, selectedIntent?.id)
    const visibleIds = visible.map((q) => q.id)
    const errors = getDocumentValidation(slug, formData, selectedIntent?.id, visibleIds)
    setValidationErrors(errors)
  }, [slug, formData, selectedIntent])

  useEffect(() => {
    if (!slug) return
    const warnings = getStateWarnings(slug, formData.state, selectedIntent?.id)
    setStateWarnings(warnings)
  }, [slug, formData.state, selectedIntent])

  // Draft management (authenticated users)
  useEffect(() => {
    const createDraft = async () => {
      if (!session?.user?.email || !document) return

      try {
        const existingDraftResponse = await fetch(`/api/documents/draft?slug=${slug}`)
        if (existingDraftResponse.ok) {
          const existingDraft = await existingDraftResponse.json()
          setDraftDocumentId(existingDraft.id)
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

  // Check subscription
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

  // Track highest visited step
  useEffect(() => {
    if (currentStep > highestVisitedStep) {
      setHighestVisitedStep(currentStep)
    }
  }, [currentStep, highestVisitedStep])

  // Check if current section is valid
  const isCurrentStepValid = useMemo(() => {
    if (isIntentStep) return !!selectedIntent
    if (isReviewStep) return isFormValid
    if (!currentSection) return false
    return sectionValidity[currentSection.name] !== false
  }, [isIntentStep, isReviewStep, selectedIntent, currentSection, sectionValidity, isFormValid])

  const handleIntentSelect = (intent: Intent) => {
    setSelectedIntent(intent)
    setCurrentStep(intentStepOffset)

    if (draftDocumentId) {
      fetch("/api/documents/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: draftDocumentId,
          metadata: { intent: intent.id },
        }),
      }).catch(console.error)
    }
  }

  const handleFormChange = useCallback((data: Record<string, any>) => {
    setFormData((prev) => {
      const newFormData = { ...prev, ...data }

      // Save to draft (fire-and-forget)
      if (draftDocumentId) {
        fetch("/api/documents/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentId: draftDocumentId,
            metadata: { formData: newFormData },
          }),
        }).catch(console.error)
      }

      // Cache locally
      sessionStorage.setItem("document-data", JSON.stringify(newFormData))
      sessionStorage.setItem("document-slug", slug)
      localStorage.setItem("document-data", JSON.stringify(newFormData))
      localStorage.setItem("document-slug", slug)
      if (selectedIntent) {
        sessionStorage.setItem("document-intent", selectedIntent.id)
        localStorage.setItem("document-intent", selectedIntent.id)
      }

      return newFormData
    })
  }, [draftDocumentId, slug, selectedIntent])

  const handleSectionValidate = useCallback((isValid: boolean) => {
    if (!currentSection) return
    setSectionValidity((prev) => ({ ...prev, [currentSection.name]: isValid }))
  }, [currentSection])

  // Check overall form validity (all sections)
  useEffect(() => {
    if (sections.length === 0) {
      setIsFormValid(false)
      return
    }

    // Check required fields across all visible questions
    const visible = getVisibleQuestions(slug, formData, selectedIntent?.id)
    const allRequiredFilled = visible
      .filter((q) => q.required)
      .every((q) => {
        const val = formData[q.id]
        return val !== undefined && val !== null && String(val).trim() !== ""
      })

    const hasNoExternalErrors = Object.keys(validationErrors).length === 0
    setIsFormValid(allRequiredFilled && hasNoExternalErrors)
  }, [slug, formData, selectedIntent, sections, validationErrors])

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToStep = (step: number) => {
    if (step <= highestVisitedStep || step <= currentStep) {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const saveDocument = async (): Promise<string | null> => {
    if (!isFormValid) return null

    try {
      const response = await fetch(`/api/documents/${slug}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          intent: selectedIntent?.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate document")

      const data = await response.json()
      const documentContent = data.document

      if (draftDocumentId) {
        const updateResponse = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: draftDocumentId,
            title: document!.title,
            type: document!.type || document!.title,
            category: document!.category || "business",
            content: documentContent,
            status: "draft",
            metadata: { formData, slug, intent: selectedIntent?.id },
          }),
        })

        if (updateResponse.ok) {
          const updateData = await updateResponse.json()
          return updateData.id || draftDocumentId
        }
      } else {
        const createResponse = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: document!.title,
            type: document!.type || document!.title,
            category: document!.category || "business",
            content: documentContent,
            status: "draft",
            metadata: { formData, slug, intent: selectedIntent?.id },
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
    if (!isFormValid) return

    setIsGenerating(true)
    setGenerationStep(0)

    // Animate through generation steps
    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev < GENERATION_STEPS.length - 1) return prev + 1
        return prev
      })
    }, 1500)

    try {
      // Store data
      sessionStorage.setItem("document-data", JSON.stringify(formData))
      sessionStorage.setItem("document-slug", slug)
      localStorage.setItem("document-data", JSON.stringify(formData))
      localStorage.setItem("document-slug", slug)
      if (selectedIntent) {
        sessionStorage.setItem("document-intent", selectedIntent.id)
        localStorage.setItem("document-intent", selectedIntent.id)
      }

      // Update draft
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

      // Premium users: save and redirect
      if (hasSubscription && session?.user?.email) {
        try {
          const generateResponse = await fetch(`/api/documents/${slug}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ formData, intent: selectedIntent?.id }),
          })

          if (generateResponse.ok) {
            const { document: documentContent } = await generateResponse.json()

            const saveResponse = await fetch("/api/documents", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: document!.title,
                type: document!.type || document!.title,
                category: document!.category || "business",
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
              clearInterval(stepInterval)
              router.push(`/dashboard/documents/${savedDoc.id}`)
              return
            }
          }
        } catch (error) {
          console.error("Error saving document:", error)
        }
      }

      // Free/non-authenticated: go to preview
      clearInterval(stepInterval)
      router.push(`/documents/${slug}/preview`)
    } catch (error) {
      console.error("Error generating document:", error)
      clearInterval(stepInterval)
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

  // Get review data for the final step
  const getReviewData = () => {
    return sections.map((section) => {
      const visible = getVisibleQuestions(slug, formData, selectedIntent?.id)
      const sectionQuestions = visible.filter((q) => (q.section || "General") === section.name)
      const filledFields = sectionQuestions
        .filter((q) => {
          const val = formData[q.id]
          return val !== undefined && val !== null && String(val).trim() !== ""
        })
        .map((q) => {
          let displayValue = String(formData[q.id])
          // For selects/radios, show the label instead of value
          if (q.options && q.options.length > 0) {
            const option = q.options.find((o) => o.value === formData[q.id])
            if (option) displayValue = option.label || option.value
          }
          return { label: q.label, value: displayValue }
        })
      return { name: section.name, fields: filledFields, order: section.order }
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Link
            href={`/documents/${slug}`}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{document.title}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
        </div>
      </header>

      {/* Progress + Section Info */}
      {!isGenerating && !hasGenerated && (
        <div className="mx-auto w-full max-w-2xl px-4 pt-4">
          <Progress value={progressPercent} className="h-1.5" />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">{currentStepLabel}</p>
            {currentSection && (
              <p className="text-xs text-muted-foreground">
                {currentSection.completedCount}/{currentSection.questionCount} fields
              </p>
            )}
          </div>

          {/* Section Navigation Pills (desktop) */}
          {sections.length > 1 && (
            <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
              {allStepLabels.map((label, i) => {
                const canNavigate = i <= highestVisitedStep
                const isCurrent = i === currentStep
                const isCompleted = i < currentStep
                return (
                  <button
                    key={i}
                    onClick={() => canNavigate && goToStep(i)}
                    disabled={!canNavigate}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                          : canNavigate
                            ? "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                            : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* State Warnings */}
      {stateWarnings.length > 0 && !isReviewStep && !isIntentStep && (
        <div className="mx-auto w-full max-w-2xl px-4 pt-3">
          <Alert>
            <AlertDescription>
              <ul className="list-inside list-disc space-y-1">
                {stateWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-6">

          {/* ── Generating Animation ── */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-8">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                <Scale className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
              </div>
              <div className="space-y-3 text-center">
                {GENERATION_STEPS.map((step, i) => (
                  <div
                    key={step}
                    className={cn(
                      "flex items-center gap-2 text-sm transition-all duration-500",
                      i < generationStep
                        ? "text-primary"
                        : i === generationStep
                          ? "text-foreground font-medium"
                          : "text-muted-foreground/40"
                    )}
                  >
                    {i < generationStep ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : i === generationStep ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Intent Selection Step ── */}
          {isIntentStep && !isGenerating && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  What type of {document.title} do you need?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select the option that best fits your situation.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {intents.map((intent) => (
                  <Card
                    key={intent.id}
                    onClick={() => handleIntentSelect(intent)}
                    className={cn(
                      "cursor-pointer p-4 transition-all hover:border-primary/50 hover:shadow-md",
                      selectedIntent?.id === intent.id &&
                        "border-primary bg-primary/5 ring-1 ring-primary/20"
                    )}
                  >
                    <h3 className="font-medium text-foreground">{intent.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{intent.description}</p>
                    {selectedIntent?.id === intent.id && (
                      <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                        Selected
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── Form Section Steps ── */}
          {!isIntentStep && !isReviewStep && !isGenerating && currentSection && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{currentSection.name}</h2>
                {questionError && (
                  <Alert className="mt-3">
                    <AlertDescription>{questionError}</AlertDescription>
                  </Alert>
                )}
              </div>

              {questions.length > 0 ? (
                <DocumentForm
                  questions={questions}
                  formData={formData}
                  onChange={handleFormChange}
                  onValidate={handleSectionValidate}
                  externalErrors={validationErrors}
                  selectedIntent={selectedIntent?.id}
                  activeSection={currentSection.name}
                />
              ) : (
                <div className="flex flex-col items-center py-12">
                  <Loader2 className="mb-3 h-6 w-6 animate-spin text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {isLoadingQuestions ? "Loading form..." : "No form configured."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Review Step ── */}
          {isReviewStep && !isGenerating && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Review Your Information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check your answers below, then generate your document.
                </p>
              </div>

              {selectedIntent && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Document Type</p>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {selectedIntent.name}
                      </p>
                    </div>
                    {hasIntentStep && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => goToStep(0)}
                        className="text-xs"
                      >
                        <Pencil className="mr-1 h-3 w-3" />
                        Change
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {getReviewData().map((section, sectionIdx) => {
                const stepIndex = intentStepOffset + sectionIdx
                return (
                  <Card key={section.name}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-semibold">{section.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => goToStep(stepIndex)}
                        className="text-xs"
                      >
                        <Pencil className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {section.fields.length > 0 ? (
                        <dl className="space-y-2">
                          {section.fields.map((field) => (
                            <div key={field.label} className="flex flex-col sm:flex-row sm:gap-4">
                              <dt className="text-xs font-medium text-muted-foreground sm:w-1/3">
                                {field.label}
                              </dt>
                              <dd className="text-sm text-foreground sm:w-2/3">{field.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">No fields filled</p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}

              {stateWarnings.length > 0 && (
                <Alert>
                  <AlertDescription>
                    <ul className="list-inside list-disc space-y-1">
                      {stateWarnings.map((warning) => (
                        <li key={warning}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* What you'll get */}
              <div className="rounded-lg border border-border/40 bg-card/50 p-4">
                <p className="text-sm font-medium text-foreground">What you&apos;ll get:</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>State-specific legal compliance</li>
                  <li>Professional formatting</li>
                  <li>All required legal sections</li>
                  <li>Customized clauses based on your selections</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Footer Navigation */}
      {!isGenerating && (
        <footer className="sticky bottom-0 border-t border-border/40 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {isReviewStep ? (
              <Button
                onClick={handleGenerateDocument}
                disabled={!isFormValid || isGenerating}
                className="gap-2"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Document
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            ) : isIntentStep ? (
              <Button
                onClick={goNext}
                disabled={!selectedIntent}
                className="gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={goNext}
                className="gap-2"
              >
                {currentStep === totalSteps - 2 ? "Review Answers" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </footer>
      )}
    </div>
  )
}
