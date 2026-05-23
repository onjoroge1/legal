"use client"

import React from "react"

interface DocumentPreviewProps {
  template: string
  watermark?: boolean
}

/**
 * DocumentPreview component
 * Renders a legal document with professional formatting
 */
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

export default function DocumentPreview({ template, watermark = false }: DocumentPreviewProps) {
  // Split template into lines and format
  const lines = template.split('\n')
  const formattedLines: React.ReactElement[] = []
  
  let currentParagraph: string[] = []
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim()
      if (text) {
        formattedLines.push(
          <p key={`p-${formattedLines.length}`} className="mb-4 text-sm leading-relaxed text-gray-800">
            {text}
          </p>
        )
      }
      currentParagraph = []
    }
  }
  
  lines.forEach((line, index) => {
    const trimmed = line.trim()
    
    // Empty line - flush current paragraph
    if (!trimmed) {
      flushParagraph()
      return
    }
    
    // Title/Heading
    if (trimmed === 'NON-DISCLOSURE AGREEMENT') {
      flushParagraph()
      formattedLines.push(
        <h1 key={`h1-${index}`} className="text-2xl font-bold text-center mb-8 tracking-wide uppercase text-gray-900">
          {trimmed}
        </h1>
      )
      return
    }
    
    // Section headings (numbered sections)
    if (/^\d+\.\s+[A-Z]/.test(trimmed)) {
      flushParagraph()
      const match = trimmed.match(/^(\d+\.\s+[A-Z][^:]+)/)
      if (match) {
        formattedLines.push(
          <h2 key={`h2-${index}`} className="text-base font-bold mt-6 mb-3 text-gray-900 uppercase tracking-wide">
            {match[1]}
          </h2>
        )
        // Add remaining text as paragraph if there's more after the heading
        const remaining = trimmed.substring(match[1].length).trim()
        if (remaining) {
          currentParagraph.push(remaining)
        }
      } else {
        formattedLines.push(
          <h2 key={`h2-${index}`} className="text-base font-bold mt-6 mb-3 text-gray-900 uppercase tracking-wide">
            {trimmed}
          </h2>
        )
      }
      return
    }
    
    // Subsection headings (like "WHEREAS", "NOW, THEREFORE")
    if (/^(WHEREAS|NOW, THEREFORE|RECITALS|IN WITNESS WHEREOF)/i.test(trimmed)) {
      flushParagraph()
      formattedLines.push(
        <h3 key={`h3-${index}`} className="text-sm font-semibold mt-4 mb-2 text-gray-900 uppercase tracking-wide">
          {trimmed}
        </h3>
      )
      return
    }
    
    // Regular text - add to current paragraph
    currentParagraph.push(trimmed)
  })
  
  // Flush any remaining paragraph
  flushParagraph()
  
  return (
    <div className="relative">
      {/* Repeating diagonal watermark overlay — shown for non-subscribers */}
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
        className="font-serif text-sm leading-relaxed text-gray-800"
        style={{
          fontFamily: 'Georgia, "Times New Roman", "DejaVu Serif", serif',
        }}
      >
        {formattedLines}
      </div>
    </div>
  )
}




