"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Download,
  FileText,
  CheckCircle2,
  ArrowLeft,
  FileDown,
  FileCode,
  Loader2,
} from "lucide-react"
import { getDocumentBySlug } from "@/lib/document-catalog"
import { useSession } from "next-auth/react"
import { LegalDisclaimerAcceptanceGate } from "@/components/legal/legal-disclaimer-acceptance-gate"

function DownloadPageContent() {
  const router = useRouter()
  const params = useParams()
  const category = params?.category as string
  const slug = params?.slug as string
  const doc = getDocumentBySlug(slug)
  const { data: session } = useSession()

  const [documentText, setDocumentText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  const legacySlug = doc?.legacySlug ?? slug

  useEffect(() => {
    const checkAccess = async () => {
      if (!session?.user?.email) {
        router.push(`/documents/${category}/${slug}`)
        return
      }
      try {
        const res = await fetch(`/api/user/document-access?slug=${legacySlug}`)
        const data = await res.json()
        if (data.hasAccess) {
          setHasAccess(true)
          const stored = sessionStorage.getItem("document-data")
          if (stored) {
            await generateDocument(JSON.parse(stored))
            return
          }
          const local = localStorage.getItem("document-data")
          const localSlug = localStorage.getItem("document-slug")
          if (local && localSlug === legacySlug) {
            try {
              const data = JSON.parse(local)
              sessionStorage.setItem("document-data", JSON.stringify(data))
              sessionStorage.setItem("document-slug", legacySlug)
              const intent = localStorage.getItem("document-intent")
              if (intent) sessionStorage.setItem("document-intent", intent)
              await generateDocument(data)
              return
            } catch {}
          }
          try {
            const draftRes = await fetch(`/api/documents/draft?slug=${legacySlug}`)
            if (draftRes.ok) {
              const draft = await draftRes.json()
              const draftData = draft.metadata?.formData || draft.metadata?.generationData
              if (draftData) {
                sessionStorage.setItem("document-data", JSON.stringify(draftData))
                sessionStorage.setItem("document-slug", legacySlug)
                await generateDocument(draftData)
                return
              }
            }
          } catch {}
          setIsLoading(false)
        } else {
          router.push(`/documents/${category}/${slug}/checkout`)
        }
      } catch {
        router.push(`/documents/${category}/${slug}`)
      }
    }
    checkAccess()
  }, [session, slug, category, legacySlug, router])

  const generateDocument = async (data: Record<string, string>) => {
    setIsLoading(true)
    try {
      const intent = sessionStorage.getItem("document-intent") || null
      const res = await fetch(`/api/documents/${category}/${slug}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data, intent }),
      })
      const result = await res.json()
      setDocumentText(result.document)
    } catch {
      setDocumentText("Error generating document. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (format: "pdf" | "docx") => {
    if (!documentText || !doc) return
    try {
      const res = await fetch("/api/documents/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText, documentTitle: doc.title, format }),
      })
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = window.document.createElement("a")
      a.href = url
      a.download = `${doc.title.replace(/\s+/g, "_")}.${format}`
      window.document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      window.document.body.removeChild(a)
    } catch {
      alert("Failed to download document. Please try again.")
    }
  }

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

  if (!hasAccess) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Checking access...</p>
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
          <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-600">
            <CheckCircle2 className="mr-1 h-3 w-3" />Full Access
          </Badge>
        </div>
      </header>

      <main className="py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link
            href={`/documents/${category}/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {doc.title}
          </Link>

          <div className="mt-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/10">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Your Document is Ready!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Download your {doc.title} in your preferred format
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-card/80 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <FileDown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">PDF Format</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Professional PDF document ready for printing and signing
              </p>
              <Button onClick={() => handleDownload("pdf")} size="lg" className="mt-6 w-full gap-2" disabled={isLoading || !documentText}>
                <Download className="h-4 w-4" />Download PDF
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
              <Button onClick={() => handleDownload("docx")} size="lg" variant="outline" className="mt-6 w-full gap-2" disabled={isLoading || !documentText}>
                <Download className="h-4 w-4" />Download DOCX
              </Button>
            </div>
          </div>

          {documentText && (
            <div className="mt-12 rounded-2xl border border-border/50 bg-card/80 shadow-xl">
              <div className="border-b border-border/40 bg-secondary/40 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Document Preview</h3>
                </div>
              </div>
              <div className="p-8">
                <pre className="whitespace-pre-wrap font-serif text-sm leading-[1.9] text-secondary-foreground">
                  {documentText}
                </pre>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="font-semibold text-foreground">What&apos;s Next?</h3>
            <div className="mt-4 space-y-3">
              {["Review your document carefully", "Download in your preferred format", "Share with parties for review", "Sign digitally or print for physical signatures"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</div>
                  <span className="text-sm text-secondary-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {session && (
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <LegalDisclaimerAcceptanceGate>
      <DownloadPageContent />
    </LegalDisclaimerAcceptanceGate>
  )
}
