"use client"

import React from "react"

interface DocumentPreviewProps {
  template: string
  watermark?: boolean
}

/* ─── Watermark ──────────────────────────────────────────────────────────── */

const WATERMARK_SVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="340" height="200">
    <text
      x="50%" y="50%"
      transform="rotate(-40, 170, 100)"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="rgba(0,0,0,0.07)"
      font-size="18"
      font-family="Arial, sans-serif"
      font-weight="700"
      letter-spacing="2"
    >DRAFT · LegalLawDocs.com</text>
  </svg>
`)

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** True when every letter in the string is uppercase (ignores numbers / punctuation) */
function isAllUppercase(s: string): boolean {
  const letters = s.replace(/[^a-zA-Z]/g, "")
  return letters.length >= 3 && letters === letters.toUpperCase()
}

/**
 * Replace raw ___+ sequences with styled underline spans, AND highlight
 * [BRACKETED_PLACEHOLDER] tokens in amber so users actively notice variables
 * the AI left for them to fill. Drives the "AI assembles a draft, you finish it"
 * positioning.
 */
function renderWithBlanks(text: string): React.ReactNode {
  // Split on either a run of underscores OR a bracketed placeholder like
  // [PARTY_A_ADDRESS], [Date of Execution], etc. (1-60 chars inside, no nesting)
  const parts = text.split(/(_{3,}|\[[A-Za-z0-9 _\-/]{1,60}\])/g)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    if (/^_{3,}$/.test(part)) {
      return (
        <span
          key={i}
          className="inline-block border-b border-gray-500 min-w-[100px] mx-0.5 align-bottom"
          style={{ marginBottom: "-1px" }}
        >
          {" "}
        </span>
      )
    }
    if (/^\[[A-Za-z0-9 _\-/]{1,60}\]$/.test(part)) {
      return (
        <span
          key={i}
          className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-amber-900 font-medium text-[12px] mx-0.5"
          title="Fill this in before signing"
        >
          {part}
        </span>
      )
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

/** Field-label prefixes that appear before a colon at the start of a line */
const FIELD_LABEL_RE =
  /^(Name|Date|Title|Signature|Signed|Address|City|State(?:\s+of)?|Company|By|Phone|Email|Position|Role|Print(?:ed\s+Name)?|Witness|Notary|Tax\s*ID|EIN|Landlord|Tenant|Employer|Employee|Contractor|Client|Party|Attorney|Agent|Owner|Buyer|Seller|Licensor|Licensee)\s*:/i

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function DocumentPreview({ template, watermark = false }: DocumentPreviewProps) {
  const elements: React.ReactElement[] = []
  const lines = template.split("\n")
  let seenTitle = false
  let currentParagraph: string[] = []

  /* Flush accumulated paragraph lines into a <p> element */
  const flushParagraph = () => {
    if (currentParagraph.length === 0) return
    const text = currentParagraph.join(" ").trim()
    currentParagraph = []
    if (!text) return
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="mb-3 text-[13px] leading-[1.9] text-gray-800"
        style={{ textAlign: "justify" }}
      >
        {renderWithBlanks(text)}
      </p>
    )
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()

    /* ── Blank line ── flush paragraph, add a little breathing room ──────── */
    if (!trimmed) {
      flushParagraph()
      return
    }

    /* ── Signature underline rule  ────────────────────────────────────────── */
    if (/^[_]{8,}$/.test(trimmed) || /^[-]{8,}$/.test(trimmed)) {
      flushParagraph()
      elements.push(
        <div key={`rule-${idx}`} className="mt-6 mb-1 pt-0.5">
          <div className="border-b-2 border-gray-500 w-72" />
        </div>
      )
      return
    }

    /* ── Field row  e.g.  "Name: ___________"  ───────────────────────────── */
    const fieldMatch = trimmed.match(FIELD_LABEL_RE)
    if (fieldMatch) {
      flushParagraph()
      const colonIdx = trimmed.indexOf(":")
      const label = trimmed.slice(0, colonIdx).trim()
      const value = trimmed
        .slice(colonIdx + 1)
        .trim()
        .replace(/_{3,}/g, "")
        .trim()
      elements.push(
        <div key={`field-${idx}`} className="flex items-end gap-3 mb-2 mt-1">
          <span
            className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-gray-600"
            style={{ minWidth: "90px" }}
          >
            {label}:
          </span>
          <div className="flex-1 border-b border-gray-400" style={{ minWidth: "140px" }}>
            {value && (
              <span className="text-[12px] text-gray-800 px-1">{renderWithBlanks(value)}</span>
            )}
          </div>
        </div>
      )
      return
    }

    /* ── WHEREAS recital ─────────────────────────────────────────────────── */
    if (/^WHEREAS\b/i.test(trimmed)) {
      flushParagraph()
      const body = trimmed.slice(7) // everything after "WHEREAS"
      elements.push(
        <p
          key={`whereas-${idx}`}
          className="mb-3 pl-6 text-[13px] leading-[1.9] text-gray-800 italic"
          style={{ textAlign: "justify" }}
        >
          <strong className="not-italic font-bold">WHEREAS</strong>
          {renderWithBlanks(body)}
        </p>
      )
      return
    }

    /* ── NOW, THEREFORE / IN WITNESS WHEREOF ─────────────────────────────── */
    if (/^(NOW,?\s+THEREFORE|IN WITNESS WHEREOF)/i.test(trimmed)) {
      flushParagraph()
      elements.push(
        <p
          key={`transition-${idx}`}
          className="mt-5 mb-3 text-[13px] leading-[1.9] text-gray-900 font-semibold"
        >
          {renderWithBlanks(trimmed)}
        </p>
      )
      return
    }

    /* ── Numbered subsection  1.1 / 1.1.1 ───────────────────────────────── */
    const subsecMatch = trimmed.match(/^(\d+\.\d+(?:\.\d+)*\.?)\s*(.*)/)
    if (subsecMatch) {
      flushParagraph()
      const num = subsecMatch[1]
      const rest = subsecMatch[2].trim()

      // If the rest is short + all-caps → render as a mini sub-header
      const isSubHeader = rest.length > 0 && isAllUppercase(rest) && rest.length < 50
      elements.push(
        <p
          key={`subsec-${idx}`}
          className={`mb-2 mt-3 text-[13px] leading-[1.9] text-gray-800 ${isSubHeader ? "font-bold uppercase tracking-wide" : ""}`}
          style={isSubHeader ? undefined : { textAlign: "justify" }}
        >
          <span className="font-bold">{num}</span>
          {rest && (
            <>
              {" "}
              {isSubHeader ? rest : renderWithBlanks(rest)}
            </>
          )}
        </p>
      )
      return
    }

    /* ── Numbered main section  1. / 2. RENT ────────────────────────────── */
    const secMatch = trimmed.match(/^(\d+\.)\s+(.+)/)
    if (secMatch || /^\d+\.$/.test(trimmed)) {
      flushParagraph()
      if (secMatch) {
        const num = secMatch[1]
        const rest = secMatch[2].trim()
        // Pure header: rest is all-caps OR short (< 60 chars with no sentence chars)
        const isHeaderOnly =
          isAllUppercase(rest) || (rest.length < 60 && !/[.;,]/.test(rest))
        if (isHeaderOnly) {
          elements.push(
            <h2
              key={`sec-${idx}`}
              className="mt-8 mb-3 text-[13px] font-bold uppercase tracking-wide text-gray-900 border-b border-gray-200 pb-1"
            >
              {num} {rest}
            </h2>
          )
        } else {
          // Header bleeds directly into paragraph text
          elements.push(
            <p
              key={`sec-${idx}`}
              className="mt-8 mb-3 text-[13px] leading-[1.9] text-gray-800"
              style={{ textAlign: "justify" }}
            >
              <strong>{num}</strong> {renderWithBlanks(rest)}
            </p>
          )
        }
      } else {
        // Bare "1." with nothing after
        elements.push(
          <h2
            key={`sec-${idx}`}
            className="mt-8 mb-2 text-[13px] font-bold uppercase tracking-wide text-gray-900"
          >
            {trimmed}
          </h2>
        )
      }
      return
    }

    /* ── ALL-CAPS line ───────────────────────────────────────────────────── */
    if (isAllUppercase(trimmed)) {
      flushParagraph()
      if (!seenTitle) {
        /* Document title — first all-caps block */
        seenTitle = true
        elements.push(
          <div key={`title-${idx}`} className="mb-8 mt-1 text-center">
            <h1
              className="text-[18px] font-bold uppercase tracking-widest text-gray-900 leading-tight"
            >
              {trimmed}
            </h1>
            <div className="mt-4 border-b-2 border-gray-300 w-24 mx-auto" />
          </div>
        )
      } else {
        /* Mid-document all-caps heading (RECITALS, DEFINITIONS, EXHIBIT A, …) */
        elements.push(
          <h2
            key={`caps-${idx}`}
            className="mt-8 mb-3 text-[13px] font-bold uppercase tracking-widest text-gray-900 text-center"
          >
            {trimmed}
          </h2>
        )
      }
      return
    }

    /* ── Regular paragraph text ──────────────────────────────────────────── */
    currentParagraph.push(trimmed)
  })

  /* Flush any trailing paragraph */
  flushParagraph()

  return (
    <div className="relative">
      {/* Repeating diagonal watermark — shown for non-subscribers */}
      {watermark && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,${WATERMARK_SVG}")`,
            backgroundRepeat: "repeat",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
      <div
        style={{
          fontFamily: 'Georgia, "Times New Roman", "DejaVu Serif", serif',
        }}
      >
        {elements}
      </div>
    </div>
  )
}
