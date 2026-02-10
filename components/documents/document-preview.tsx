"use client"

interface DocumentPreviewProps {
  template: string
}

/**
 * DocumentPreview component
 * Renders a legal document with professional formatting
 */
export default function DocumentPreview({ template }: DocumentPreviewProps) {
  // Split template into lines and format
  const lines = template.split('\n')
  const formattedLines: JSX.Element[] = []
  
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
    <div 
      className="font-serif text-sm leading-relaxed text-gray-800"
      style={{
        fontFamily: 'Georgia, "Times New Roman", "DejaVu Serif", serif',
      }}
    >
      {formattedLines}
    </div>
  )
}

