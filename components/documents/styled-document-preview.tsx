"use client"

import { useEffect } from "react"
import {
  Scale,
  MapPin,
  Calendar,
  Lock,
  Shield,
} from "lucide-react"
import type { ParsedDocument } from "@/lib/parse-document-sections"

interface StyledDocumentPreviewProps {
  parsedDocument: ParsedDocument
  documentTitle: string
  state: string
  effectiveDate: string
  maxSections?: number
}

// SVG watermark tiled via CSS background — harder to remove than DOM elements
const WATERMARK_SVG = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="140" viewBox="0 0 220 140">
    <text transform="rotate(-35 110 70)" x="110" y="70"
      font-family="Arial, sans-serif" font-size="18" font-weight="bold"
      fill="rgb(245,158,11)" fill-opacity="0.10" text-anchor="middle"
      dominant-baseline="middle">PREVIEW</text>
  </svg>`
)}`

export default function StyledDocumentPreview({
  parsedDocument,
  documentTitle,
  state,
  effectiveDate,
  maxSections = 3,
}: StyledDocumentPreviewProps) {
  const visibleSections = parsedDocument.sections.slice(0, maxSections)
  const hasMoreContent = parsedDocument.sections.length > maxSections || !!parsedDocument.signatureBlock

  // Block Ctrl/Cmd+A and Ctrl/Cmd+C keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "c" || e.key === "A" || e.key === "C")) {
        e.preventDefault()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <div
      className="relative select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      {/* Tiled watermark overlay via CSS background */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `url("${WATERMARK_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 140px",
        }}
        aria-hidden="true"
      />

      {/* Document content */}
      <div className="relative p-6 md:p-10">
        {/* Document header */}
        <div className="mb-8 border-b border-border/40 pb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Confidential
                </span>
              </div>
              <h3 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-3xl">
                {parsedDocument.title || documentTitle}
              </h3>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {state ? `State of ${state}` : "United States"}
                <span className="text-border">|</span>
                <Calendar className="h-3.5 w-3.5 text-accent" />
                Effective Date: {effectiveDate}
              </p>
            </div>
            <div className="hidden shrink-0 rounded-lg border border-primary/20 bg-primary/5 p-3 md:block">
              <Shield className="h-7 w-7 text-primary" />
            </div>
          </div>
        </div>

        {/* Preamble */}
        {parsedDocument.preamble && (
          <div className="mb-6">
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              {parsedDocument.preamble.length > 300
                ? parsedDocument.preamble.slice(0, 300) + "..."
                : parsedDocument.preamble}
            </p>
          </div>
        )}

        {/* Clause sections */}
        <div className="space-y-6">
          {visibleSections.map((section, i) => {
            const colorScheme = i % 2 === 0 ? "primary" : "accent"
            const badgeClass =
              colorScheme === "primary"
                ? "bg-primary/15 text-primary"
                : "bg-accent/15 text-accent"

            // Truncate body text for preview
            const bodyText = section.body.length > 500
              ? section.body.slice(0, 500) + "..."
              : section.body

            return (
              <div key={section.number}>
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${badgeClass}`}
                  >
                    {section.number}
                  </span>
                  <h4 className="text-sm font-semibold text-foreground">
                    {section.title}
                  </h4>
                </div>
                <p className="mt-2.5 pl-8 text-sm leading-relaxed text-muted-foreground">
                  {bodyText}
                </p>
              </div>
            )
          })}

          {/* Signature block hint (always shown as a teaser) */}
          <div className="mt-8 rounded-lg border border-dashed border-primary/25 bg-primary/5 px-5 py-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Digital Signature Block
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-8">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Party One</p>
                <div className="mt-1.5 border-b border-primary/30 pb-1">
                  <span className="font-serif text-sm italic text-foreground/50">
                    Signature...
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Party Two</p>
                <div className="mt-1.5 border-b border-primary/30 pb-1">
                  <span className="font-serif text-sm italic text-foreground/50">
                    Signature...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade-out when content is truncated */}
      {hasMoreContent && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-56"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, white 85%)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
