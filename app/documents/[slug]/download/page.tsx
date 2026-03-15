"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Scale,
  Download,
  FileText,
  CheckCircle2,
  ArrowLeft,
  FileDown,
  FileCode,
  Loader2,
  PartyPopper,
} from "lucide-react"
import { getDocumentBySlug } from "@/lib/document-data"
import { useSession } from "next-auth/react"
import { toast } from "@/lib/safe-toast"

export default function DownloadPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params?.slug as string
  const document = getDocumentBySlug(slug)
  const { data: session, status: sessionStatus } = useSession()

  const [documentText, setDocumentText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [isSavingDocument, setIsSavingDocument] = useState(false)
  const accessCheckDone = useRef(false)

  const isPaymentReturn = searchParams?.get("payment") === "success"

  useEffect(() => {
    if (accessCheckDone.current) return
    if (sessionStatus === "loading") return

    const checkAccessAndLoad = async () => {
      accessCheckDone.current = true

      if (!session?.user?.email) {
        router.push(`/documents/${slug}`)
        return
      }

      try {
        // If returning from Stripe payment, the webhook may not have fired yet.
        // Give it a moment, then check access.
        if (isPaymentReturn) {
          // Brief delay to allow webhook processing
          await new Promise(resolve => setTimeout(resolve, 2000))
        }

        // Check subscription or purchase status
        const response = await fetch(`/api/user/document-access?slug=${slug}`)
        const data = await response.json()

        if (data.hasAccess || data.hasSubscription) {
          setHasAccess(true)

          if (isPaymentReturn) {
            setPaymentSuccess(true)
            // Save the document to user's account after successful payment
            await saveDocumentToAccount()
          }

          // Load document content from storage or generate it
          await loadDocumentContent()
        } else if (isPaymentReturn) {
          // Payment just completed but webhook hasn't fired yet —
          // trust the Stripe redirect and grant temporary access
          setHasAccess(true)
          setPaymentSuccess(true)
          await saveDocumentToAccount()
          await loadDocumentContent()
        } else {
          // No access and not a payment return — redirect to checkout
          router.push(`/documents/${slug}/checkout`)
        }
      } catch (error) {
        console.error("Error checking access:", error)
        router.push(`/documents/${slug}`)
      }
    }

    checkAccessAndLoad()
  }, [session, sessionStatus, slug, router, isPaymentReturn])

  const loadDocumentContent = async () => {
    setIsLoading(true)

    // Try sessionStorage first
    const storedContent = sessionStorage.getItem("document-content")
    if (storedContent) {
      setDocumentText(storedContent)
      setIsLoading(false)
      return
    }

    // Try localStorage (persists across Stripe redirect)
    const localContent = localStorage.getItem("document-content")
    if (localContent) {
      setDocumentText(localContent)
      sessionStorage.setItem("document-content", localContent)
      setIsLoading(false)
      return
    }

    // Try to load form data and regenerate
    const stored = sessionStorage.getItem("document-data")
    if (stored) {
      const docData = JSON.parse(stored)
      await generateDocument(docData)
      return
    }

    const localStored = localStorage.getItem("document-data")
    const localStoredSlug = localStorage.getItem("document-slug")
    if (localStored && localStoredSlug === slug) {
      try {
        const docData = JSON.parse(localStored)
        sessionStorage.setItem("document-data", JSON.stringify(docData))
        sessionStorage.setItem("document-slug", slug)
        const localIntent = localStorage.getItem("document-intent")
        if (localIntent) {
          sessionStorage.setItem("document-intent", localIntent)
        }
        await generateDocument(docData)
        return
      } catch (error) {
        console.error("Error loading cached data:", error)
      }
    }

    // Try to fetch from server (draft metadata)
    try {
      const draftResponse = await fetch(`/api/documents/draft?slug=${slug}`)
      if (draftResponse.ok) {
        const draft = await draftResponse.json()
        const metadata = draft.metadata || {}
        const draftData = metadata.formData || metadata.generationData
        if (draftData) {
          sessionStorage.setItem("document-data", JSON.stringify(draftData))
          sessionStorage.setItem("document-slug", slug)
          if (metadata.intent) {
            sessionStorage.setItem("document-intent", metadata.intent)
          }
          localStorage.setItem("document-data", JSON.stringify(draftData))
          localStorage.setItem("document-slug", slug)
          if (metadata.intent) {
            localStorage.setItem("document-intent", metadata.intent)
          }
          await generateDocument(draftData)
          return
        }
      }
    } catch (error) {
      console.error("Error loading draft data:", error)
    }

    setIsLoading(false)
  }

  const generateDocument = async (data: Record<string, string>) => {
    setIsLoading(true)
    try {
      const intent = sessionStorage.getItem("document-intent") || null
      const res = await fetch(`/api/documents/${slug}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data, intent }),
      })
      const result = await res.json()
      setDocumentText(result.document)
      // Cache the generated content
      sessionStorage.setItem("document-content", result.document)
      localStorage.setItem("document-content", result.document)
    } catch {
      setDocumentText("Error generating document. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const saveDocumentToAccount = async () => {
    if (isSavingDocument) return
    setIsSavingDocument(true)

    try {
      const documentData = localStorage.getItem("document-data") || sessionStorage.getItem("document-data")
      const documentIntent = localStorage.getItem("document-intent") || sessionStorage.getItem("document-intent")
      const documentContent = localStorage.getItem("document-content") || sessionStorage.getItem("document-content")
      const formData = documentData ? JSON.parse(documentData) : {}

      const response = await fetch("/api/checkout/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          name: session?.user?.name,
          slug,
          paymentType: searchParams?.get("tier") === "professional" ? "subscription" : "single",
          formData,
          intent: documentIntent || null,
          documentContent: documentContent || null,
        }),
      })

      if (response.ok) {
        // Clean up Stripe-related URL params
        const url = new URL(window.location.href)
        url.searchParams.delete("payment")
        url.searchParams.delete("session_id")
        url.searchParams.delete("tier")
        window.history.replaceState({}, "", url.toString())
      }
    } catch (error) {
      console.error("Error saving document:", error)
    } finally {
      setIsSavingDocument(false)
    }
  }

  const handleDownload = async (format: "pdf" | "docx") => {
    if (!documentText) return

    try {
      const response = await fetch("/api/documents/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentText,
          documentTitle: document?.title || "Document",
          format,
        }),
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = window.document.createElement("a")
      a.href = url
      a.download = `${document?.title.replace(/\s+/g, "_")}.${format}`
      window.document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      window.document.body.removeChild(a)
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download document. Please try again.")
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

  if (!hasAccess) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">
            {isPaymentReturn ? "Confirming your payment..." : "Checking access..."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Legal<span className="text-primary">Law</span>Docs
            </span>
          </Link>
          <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-600">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Full Access
          </Badge>
        </div>
      </header>

      <main className="py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link
            href={`/documents/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {document.title}
          </Link>

          {/* Payment success banner */}
          {paymentSuccess && (
            <Alert className="mt-6 border-green-500/30 bg-green-500/10">
              <PartyPopper className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Payment successful! Your document has been saved to your account.
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/10">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Your Document is Ready!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Download your {document.title} in your preferred format
            </p>
          </div>

          {/* Download Options */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-card/80 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <FileDown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">PDF Format</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Professional PDF document ready for printing and signing
              </p>
              <Button
                onClick={() => handleDownload("pdf")}
                size="lg"
                className="mt-6 w-full gap-2"
                disabled={isLoading || !documentText}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/80 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
                <FileCode className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">DOCX Format</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Editable Word document for further customization
              </p>
              <Button
                onClick={() => handleDownload("docx")}
                size="lg"
                variant="outline"
                className="mt-6 w-full gap-2"
                disabled={isLoading || !documentText}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download DOCX
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Document Preview */}
          {documentText && (
            <div className="mt-12 rounded-2xl border border-border/50 bg-card/80 shadow-xl">
              <div className="border-b border-border/40 bg-secondary/40 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Document Preview</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-serif text-sm leading-[1.9] text-secondary-foreground">
                    {documentText}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="font-semibold text-foreground">What&apos;s Next?</h3>
            <div className="mt-4 space-y-3">
              {[
                "Review your document carefully",
                "Download in your preferred format",
                "Share with parties for review",
                "Sign digitally or print for physical signatures",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <span className="text-sm text-secondary-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back to Dashboard */}
          {session && (
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/dashboard/documents">
                  Go to My Documents
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
