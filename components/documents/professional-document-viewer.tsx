"use client"

import { useMemo } from "react"
import { format } from "date-fns"

interface ProfessionalDocumentViewerProps {
  content: string
  title?: string
  metadata?: any
}

/**
 * ProfessionalDocumentViewer component
 * Renders legal documents with professional, luxury formatting
 */
export default function ProfessionalDocumentViewer({
  content,
  title,
  metadata,
}: ProfessionalDocumentViewerProps) {
  const formattedContent = useMemo(() => {
    if (!content) return []

    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let currentParagraph: string[] = []
    let hasTitle = false

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim()
        if (text) {
          elements.push(
            <p
              key={`p-${elements.length}`}
              className="mb-4 text-[13px] leading-[1.8] text-gray-900 font-serif"
              style={{ textAlign: 'justify' }}
            >
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

      // Document title (usually all caps, centered, at the top)
      if (
        !hasTitle &&
        (trimmed.match(/^[A-Z\s&]{10,}$/) ||
          trimmed.includes('AGREEMENT') ||
          trimmed.includes('CONTRACT') ||
          trimmed.includes('TESTAMENT') ||
          trimmed.includes('NDA') ||
          trimmed.includes('NON-DISCLOSURE'))
      ) {
        flushParagraph()
        hasTitle = true
        // Skip rendering if title prop already covers this (avoid duplicate header)
        if (title) return
        elements.push(
          <div key={`title-${index}`} className="mb-8 mt-4">
            <h1 className="text-2xl font-bold text-center mb-2 tracking-wide uppercase text-gray-900 font-serif">
              {trimmed}
            </h1>
            {(metadata?.formData?.STATE || metadata?.formData?.state) && (
              <div className="text-center text-xs text-gray-600 mt-4 mb-6 font-serif">
                <p className="uppercase tracking-wide">
                  State of {metadata.formData.STATE || metadata.formData.state}
                  {metadata.formData?.state && ` | Effective Date: ${format(new Date(), "MMMM d, yyyy")}`}
                </p>
              </div>
            )}
          </div>
        )
        return
      }

      // Skip duplicate state/date line if the outer header already shows it
      if (title && /^STATE\s+OF\s+/i.test(trimmed) && /EFFECTIVE\s+DATE/i.test(trimmed)) {
        return
      }

      // Section headings (numbered sections like "1. Definition", "2. Obligations")
      if (/^\d+\.\s+[A-Z]/.test(trimmed)) {
        flushParagraph()
        const match = trimmed.match(/^(\d+\.\s+[A-Z][^:]+)/)
        if (match) {
          elements.push(
            <h2
              key={`h2-${index}`}
              className="text-base font-bold mt-8 mb-4 text-gray-900 uppercase tracking-wide font-serif"
            >
              {match[1]}
            </h2>
          )
          // Add remaining text as paragraph if there's more after the heading
          const remaining = trimmed.substring(match[1].length).trim()
          if (remaining) {
            currentParagraph.push(remaining)
          }
        } else {
          elements.push(
            <h2
              key={`h2-${index}`}
              className="text-base font-bold mt-8 mb-4 text-gray-900 uppercase tracking-wide font-serif"
            >
              {trimmed}
            </h2>
          )
        }
        return
      }

      // Subsection headings (like "WHEREAS", "NOW, THEREFORE", "RECITALS")
      if (
        /^(WHEREAS|NOW,?\s+THEREFORE|RECITALS|IN WITNESS WHEREOF|DEFINITIONS?|OBLIGATIONS?|TERM|TERMINATION|GOVERNING LAW)/i.test(
          trimmed
        )
      ) {
        flushParagraph()
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-sm font-semibold mt-6 mb-3 text-gray-900 uppercase tracking-wide font-serif"
          >
            {trimmed}
          </h3>
        )
        return
      }

      // Bold text (usually definitions or important terms) - handle markdown **bold**
      if (trimmed.includes('**')) {
        flushParagraph()
        // Process markdown bold
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g)
        const processedParts: (string | JSX.Element)[] = []
        
        parts.forEach((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.replace(/\*\*/g, '')
            processedParts.push(
              <strong key={`bold-${index}-${partIndex}`} className="font-bold">
                {boldText}
              </strong>
            )
          } else if (part.trim()) {
            processedParts.push(part)
          }
        })
        
        if (processedParts.length > 0) {
          elements.push(
            <p
              key={`p-bold-${index}`}
              className="mb-4 text-[13px] leading-[1.8] text-gray-900 font-serif"
              style={{ textAlign: 'justify' }}
            >
              {processedParts}
            </p>
          )
        }
        return
      }

      // Regular text - add to current paragraph (clean up any markdown)
      const cleanText = trimmed.replace(/\*\*/g, '').replace(/#{1,6}\s/g, '')
      if (cleanText) {
        currentParagraph.push(cleanText)
      }
    })

    // Flush any remaining paragraph
    flushParagraph()

    return elements
  }, [content, metadata])

  // Extract state and date from metadata or content
  const state = metadata?.formData?.STATE || metadata?.formData?.state
  const effectiveDate = metadata?.formData?.date || format(new Date(), "MMMM d, yyyy")

  return (
    <div className="relative">
      {/* Document Container - Luxury Legal Document Style */}
      <div className="overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-2xl shadow-primary/10">
        <div className="flex flex-col">
          {/* Document Header Section */}
          <div className="flex-1 p-6 md:p-10 bg-gradient-to-b from-white via-gray-50/30 to-white">
            {/* Title and Header Info */}
            <div className="mb-8 pb-6 border-b border-gray-200/60">
              {title && (
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 tracking-wide uppercase text-gray-900 font-serif">
                  {title.toUpperCase()}
                </h1>
              )}
              {state && (
                <div className="text-center text-xs text-gray-600 mt-4 font-serif">
                  <p className="uppercase tracking-wider font-medium">
                    State of {state}
                    {effectiveDate && ` | Effective Date: ${effectiveDate}`}
                  </p>
                </div>
              )}
            </div>

            {/* Document Content */}
            <div
              className="font-serif text-[13px] leading-[1.85] text-gray-900 max-w-4xl mx-auto"
              style={{
                fontFamily: 'Georgia, "Times New Roman", "DejaVu Serif", serif',
              }}
            >
              {formattedContent.length > 0 ? (
                formattedContent
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {content}
                </div>
              )}
            </div>

            {/* Signature Section Placeholder */}
            <div className="mt-12 pt-8 border-t border-gray-200/60">
              <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="h-16 border-b border-gray-300 mb-2"></div>
                  <p className="text-xs text-gray-600 text-center font-serif">Signature</p>
                </div>
                <div>
                  <div className="h-16 border-b border-gray-300 mb-2"></div>
                  <p className="text-xs text-gray-600 text-center font-serif">Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

