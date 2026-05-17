"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  FileText,
  Shield,
  CheckCircle2,
  Lock,
  Loader2,
  MapPin,
  Calendar,
  ArrowLeft,
  Eye,
  ArrowRight,
} from "lucide-react"
import { getDocumentBySlug } from "@/lib/document-catalog"
import { useSession } from "next-auth/react"

export default function PreviewPage() {
  const router = useRouter()
  const params = useParams()
  const category = params?.category as string
  const slug = params?.slug as string
  const doc = getDocumentBySlug(slug)
  const { data: session } = useSession()

  const [docData, setDocData] = useState<Record<string, string>>({})
  const [documentText, setDocumentText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [generationStep, setGenerationStep] = useState(0)
  const [hasSubscription, setHasSubscription] = useState(false)

  // Use legacy slug for generate API
  const legacySlug = doc?.legacySlug ?? slug

  useEffect(() => {
    const checkSub = async () => {
      if (!session?.user?.email) {
        setIsLoading(false)
        return
      }
      try {
        const data = await fetch("/api/user/subscription").then((r) => r.json())
        if (data.subscription?.isActive) {
          setHasSubscription(true)
          router.push(`/documents/${category}/${slug}/download`)
        } else {
          setHasSubscription(false)
        }
      } catch {
        setHasSubscription(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkSub()
  }, [session, slug, category, router])

  const generationSteps = [
    "Analyzing state requirements...",
    "Applying legal frameworks...",
    "Generating clauses...",
    "Running compliance checks...",
    "Finalizing document...",
  ]

  const generateDocument = useCallback(async (data: Record<string, string>) => {
    setIsLoading(true)
    setGenerationStep(0)
    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => (prev < 4 ? prev + 1 : prev))
    }, 1500)
    try {
      const intent = sessionStorage.getItem("document-intent") || null
      const res = await fetch(`/api/documents/${legacySlug}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data, intent }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Failed to generate document" }))
        throw new Error(err.error || "Failed to generate document")
      }
      const result = await res.json()
      if (result.document) {
        setDocumentText(result.document)
        sessionStorage.setItem("document-content", result.document)
      } else {
        throw new Error("No document content returned")
      }
    } catch (error) {
      setDocumentText(error instanceof Error ? `Error: ${error.message}` : "Error generating document. Please try again.")
    } finally {
      clearInterval(stepInterval)
      setGenerationStep(4)
      setTimeout(() => setIsLoading(false), 500)
    }
  }, [legacySlug])

  useEffect(() => {
    const load = async () => {
      const stored = sessionStorage.getItem("document-data")
      const storedSlug = sessionStorage.getItem("document-slug")
      if (stored && storedSlug === legacySlug) {
        const data = JSON.parse(stored)
        setDocData(data)
        generateDocument(data)
        return
      }
      const local = localStorage.getItem("document-data")
      const localSlug = localStorage.getItem("document-slug")
      if (local && localSlug === legacySlug) {
        try {
          const data = JSON.parse(local)
          setDocData(data)
          sessionStorage.setItem("document-data", JSON.stringify(data))
          sessionStorage.setItem("document-slug", legacySlug)
          const intent = localStorage.getItem("document-intent")
          if (intent) sessionStorage.setItem("document-intent", intent)
          generateDocument(data)
          return
        } catch {}
      }
      if (session?.user?.email) {
        try {
          const draftRes = await fetch(`/api/documents/draft?slug=${legacySlug}`)
          if (draftRes.ok) {
            const draft = await draftRes.json()
            const draftData = draft.metadata?.formData || draft.metadata?.generationData
            if (draftData) {
              setDocData(draftData)
              sessionStorage.setItem("document-data", JSON.stringify(draftData))
              sessionStorage.setItem("document-slug", legacySlug)
              generateDocument(draftData)
              return
            }
          }
        } catch {}
      }
      router.push(`/documents/${category}/${slug}/generate`)
    }
    load()
  }, [legacySlug, slug, category, router, session, generateDocument])

  if (!doc) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Document not found</h1>
          <Link href="/documents" className="mt-4 text-primary hover:underline">Back to Documents</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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
          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-600">
            <Lock className="mr-1 h-3 w-3" />
            Watermarked Preview
          </Badge>
        </div>
      </header>

      {isLoading && (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10">
              <Loader2 className="h-9 w-9 animate-spin text-primary" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-foreground">
              Generating Your {doc.title}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our AI is crafting a legally compliant document tailored to your specifications.
            </p>
            <div className="mt-8 space-y-3 text-left">
              {generationSteps.map((step, i) => (
                <div key={step} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all duration-500 ${
                  i < generationStep ? "bg-accent/10" : i === generationStep ? "bg-primary/10" : "opacity-40"
                }`}>
                  {i < generationStep ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  ) : i === generationStep ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                  ) : (
                    <div className="h-4 w-4 shrink-0 rounded-full border border-muted-foreground/30" />
                  )}
                  <span className={`text-sm ${
                    i < generationStep ? "text-accent" : i === generationStep ? "font-medium text-primary" : "text-muted-foreground"
                  }`}>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <main className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Link
              href={`/documents/${category}/${slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to {doc.title}
            </Link>

            <div className="mt-6 flex flex-col gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl shadow-primary/5">
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                    <div className="rotate-[-45deg] text-6xl font-bold text-amber-500/20 select-none">PREVIEW</div>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/40 bg-secondary/40 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-destructive/70" />
                        <div className="h-3 w-3 rounded-full bg-primary/70" />
                        <div className="h-3 w-3 rounded-full bg-accent/70" />
                      </div>
                      <div className="flex items-center gap-2 rounded-md bg-muted/60 px-3 py-1">
                        <FileText className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-medium text-foreground/80">
                          {doc.title.replace(/\s+/g, "_")}_Preview.pdf
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="border-amber-500/30 bg-amber-500/15 text-xs text-amber-600" variant="outline">
                        <Lock className="mr-1 h-3 w-3" />Watermarked
                      </Badge>
                      <div className="flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/40 px-2 py-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Preview Only</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative p-8 lg:p-12 bg-white">
                    {documentText ? (
                      <div className="prose prose-lg max-w-none">
                        <div className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-gray-900">
                          {documentText}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Generating document...</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-border/40 bg-secondary/30 px-5 py-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      Watermarked Preview — Purchase to remove
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />Preview Only
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
                  <h3 className="font-serif text-xl font-bold text-foreground">Ready to Download Your Document?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Purchase to remove the watermark and get full access to your {doc.title}
                  </p>
                  <Button
                    onClick={() => router.push(`/documents/${category}/${slug}/checkout`)}
                    size="lg"
                    className="mt-4 gap-2 shadow-lg shadow-primary/20"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="w-full shrink-0 lg:w-80">
                <div className="sticky top-24 space-y-5">
                  <div className="rounded-2xl border border-border/50 bg-card/80 p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      <FileText className="h-4 w-4 text-primary" />Document Details
                    </h3>
                    <div className="mt-5 space-y-3">
                      {[
                        { label: "Document Type", value: doc.title, icon: FileText },
                        { label: "Jurisdiction", value: docData.STATE || docData.state || "Your State", icon: MapPin },
                        { label: "Generated", value: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), icon: Calendar },
                      ].map((item) => (
                        <div key={item.label} className="rounded-lg border border-border/40 bg-secondary/30 p-3">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{item.label}</p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-600">
                      <Lock className="h-4 w-4" />Preview Mode
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-amber-600/80">
                      This is a watermarked preview. Complete your purchase to download the full document without watermarks in PDF and DOCX formats.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <h3 className="text-sm font-semibold text-foreground">Next Steps</h3>
                    <div className="mt-3 space-y-2.5">
                      {["Review your document preview", "Choose payment option", "Download full document"].map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                            {i + 1}
                          </div>
                          <span className="text-xs text-secondary-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
