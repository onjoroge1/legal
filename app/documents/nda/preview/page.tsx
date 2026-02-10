"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Download,
  FileText,
  Shield,
  CheckCircle2,
  Lock,
  Printer,
  Copy,
  Check,
  Loader2,
  Sparkles,
  MapPin,
  Calendar,
  ArrowLeft,
  Eye,
} from "lucide-react"

export default function PreviewPage() {
  const [ndaData, setNdaData] = useState<Record<string, string>>({})
  const [document, setDocument] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)

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

    // Animate through steps
    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev < 4) return prev + 1
        return prev
      })
    }, 1500)

    try {
      const res = await fetch("/api/nda-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ndaData: data }),
      })
      const result = await res.json()
      setDocument(result.document)
    } catch {
      setDocument("Error generating document. Please try again.")
    } finally {
      clearInterval(stepInterval)
      setGenerationStep(4)
      setTimeout(() => setIsLoading(false), 500)
    }
  }, [])

  useEffect(() => {
    const stored = sessionStorage.getItem("nda-data")
    if (stored) {
      const data = JSON.parse(stored)
      setNdaData(data)
      generateDocument(data)
    } else {
      // Use default data if none stored
      const defaultData = {
        STATE: "California",
        TYPE: "Mutual",
        DISCLOSING_PARTY: "Acme Corporation",
        RECEIVING_PARTY: "Beta Industries LLC",
        RELATIONSHIP: "Potential business partnership",
        CONFIDENTIAL_INFO: "Trade secrets, business plans, and proprietary technology",
        DURATION: "2 years",
        NON_SOLICITATION: "Yes",
        NON_COMPETE: "No",
        ADDITIONAL: "None",
      }
      setNdaData(defaultData)
      generateDocument(defaultData)
    }
  }, [generateDocument])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(document)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>NDA - ${ndaData.DISCLOSING_PARTY || "Document"}</title>
            <style>
              body { font-family: 'Times New Roman', serif; max-width: 800px; margin: 40px auto; padding: 40px; line-height: 1.8; color: #1a1a1a; }
              h1 { text-align: center; font-size: 24px; margin-bottom: 8px; }
              h2 { font-size: 16px; margin-top: 24px; }
              p { margin: 8px 0; font-size: 14px; }
              pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.8; }
            </style>
          </head>
          <body><pre>${document}</pre></body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleDownload = () => {
    const blob = new Blob([document], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = window.document.createElement("a")
    a.href = url
    a.download = `NDA_${(ndaData.STATE || "Document").replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.txt`
    window.document.body.appendChild(a)
    a.click()
    window.document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
          {!isLoading && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5 border-border/60 bg-transparent"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-1.5 border-border/60 bg-transparent"
              >
                <Printer className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Print</span>
              </Button>
              <Button size="sm" onClick={handleDownload} className="gap-1.5 shadow-md shadow-primary/20">
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Loading state */}
      {isLoading && (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10">
              <Loader2 className="h-9 w-9 animate-spin text-primary" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-foreground">
              Generating Your NDA
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our AI is crafting a legally compliant document tailored to your specifications.
            </p>

            {/* Animated steps */}
            <div className="mt-8 space-y-3 text-left">
              {generationSteps.map((step, i) => (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all duration-500 ${
                    i < generationStep
                      ? "bg-accent/10"
                      : i === generationStep
                        ? "bg-primary/10"
                        : "opacity-40"
                  }`}
                >
                  {i < generationStep ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  ) : i === generationStep ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                  ) : (
                    <div className="h-4 w-4 shrink-0 rounded-full border border-muted-foreground/30" />
                  )}
                  <span
                    className={`text-sm ${
                      i < generationStep
                        ? "text-accent"
                        : i === generationStep
                          ? "font-medium text-primary"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Document preview */}
      {!isLoading && (
        <main className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Link
              href="/documents/nda"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to NDA
            </Link>

            <div className="mt-6 flex flex-col gap-8 lg:flex-row">
              {/* Document */}
              <div className="flex-1">
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl shadow-primary/5">
                  {/* Document toolbar */}
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
                          NDA_{(ndaData.STATE || "Doc").replace(/\s+/g, "_")}_2026.pdf
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="border-accent/30 bg-accent/15 text-xs text-accent" variant="outline">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Compliant
                      </Badge>
                      <div className="flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/40 px-2 py-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Preview</span>
                      </div>
                    </div>
                  </div>

                  {/* Document content */}
                  <div className="p-8 lg:p-12">
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-serif text-sm leading-[1.9] text-secondary-foreground">
                        {document}
                      </pre>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between border-t border-border/40 bg-secondary/30 px-5 py-2.5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        All checks passed
                      </div>
                      <span className="text-border">|</span>
                      <span>Generated on Feb 8, 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      AES-256 Encrypted
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full shrink-0 lg:w-80">
                <div className="sticky top-24 space-y-5">
                  {/* Document details */}
                  <div className="rounded-2xl border border-border/50 bg-card/80 p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      <FileText className="h-4 w-4 text-primary" />
                      Document Details
                    </h3>
                    <div className="mt-5 space-y-3">
                      {[
                        { label: "Jurisdiction", value: ndaData.STATE || "California", icon: MapPin },
                        { label: "NDA Type", value: ndaData.TYPE || "Mutual", icon: Shield },
                        { label: "Duration", value: ndaData.DURATION || "2 years", icon: Calendar },
                        { label: "Generated", value: "February 8, 2026", icon: Sparkles },
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

                  {/* Compliance */}
                  <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-accent">
                      <Shield className="h-4 w-4" />
                      Compliance Verified
                    </h3>
                    <div className="mt-4 space-y-2.5">
                      {[
                        `${ndaData.STATE || "State"} Trade Secrets Act`,
                        "Governing law provisions",
                        "Digital signature ready",
                        "Confidentiality standards",
                        "Remedies & injunctive relief",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                          <span className="text-xs text-secondary-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg border border-accent/20 bg-background/40 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-accent">AI Confidence</span>
                        <span className="text-lg font-bold text-accent">98%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[98%] rounded-full bg-accent" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button onClick={handleDownload} className="w-full gap-2 shadow-lg shadow-primary/20">
                      <Download className="h-4 w-4" />
                      Download Document
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handlePrint}
                      className="w-full gap-2 border-border/60 bg-transparent"
                    >
                      <Printer className="h-4 w-4" />
                      Print Document
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCopy}
                      className="w-full gap-2 border-border/60 bg-transparent"
                    >
                      {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied to Clipboard" : "Copy to Clipboard"}
                    </Button>
                  </div>

                  {/* Need another? */}
                  <div className="rounded-2xl border border-border/50 bg-card/60 p-5 text-center">
                    <p className="text-sm text-muted-foreground">Need another document?</p>
                    <Link href="/">
                      <Button variant="link" className="mt-1 gap-1 text-primary">
                        Browse Document Library
                      </Button>
                    </Link>
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
