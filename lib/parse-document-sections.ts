/**
 * Parse AI-generated legal document text into structured sections.
 * Pure function with no React dependency — can be used client-side or server-side.
 */

export interface DocumentSection {
  number: number
  title: string
  body: string
}

export interface ParsedDocument {
  /** Document title, e.g. "NON-DISCLOSURE AGREEMENT" */
  title: string | null
  /** Preamble / recital text (WHEREAS, NOW THEREFORE, etc.) */
  preamble: string | null
  /** Numbered sections with title and body */
  sections: DocumentSection[]
  /** Everything after "IN WITNESS WHEREOF" */
  signatureBlock: string | null
}

/**
 * Detect if a line is likely a document title.
 * Matches lines that are mostly uppercase and contain key legal terms,
 * or are short all-caps lines (common for AI-generated doc titles).
 */
function isTitleLine(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed || trimmed.length < 5) return false

  // Common document title patterns
  if (/\b(AGREEMENT|CONTRACT|NDA|NON-DISCLOSURE|LEASE|POWER OF ATTORNEY|LAST WILL|TESTAMENT|OPERATING AGREEMENT)\b/i.test(trimmed)) {
    // Must be mostly uppercase or a short line
    const uppercaseRatio = (trimmed.match(/[A-Z]/g) || []).length / trimmed.length
    return uppercaseRatio > 0.5 || trimmed.length < 60
  }

  // Short all-caps line (10+ chars)
  if (/^[A-Z\s\-–—:]{10,}$/.test(trimmed)) {
    return true
  }

  return false
}

/**
 * Detect if a line starts a numbered section (e.g., "1. DEFINITIONS" or "1. Definitions")
 */
function isNumberedSectionStart(line: string): { number: number; title: string } | null {
  const match = line.trim().match(/^(\d+)\.\s+(.+)/)
  if (!match) return null
  return { number: parseInt(match[1], 10), title: match[2].trim() }
}

/**
 * Detect if a line is a preamble keyword (WHEREAS, RECITALS, etc.)
 */
function isPreambleLine(line: string): boolean {
  return /^(WHEREAS|NOW,?\s+THEREFORE|RECITALS|WITNESSETH)/i.test(line.trim())
}

/**
 * Detect if a line starts the signature block
 */
function isSignatureBlockStart(line: string): boolean {
  return /^(IN WITNESS WHEREOF|SIGNATURE|SIGNATURES|EXECUTED|BY AND BETWEEN)/i.test(line.trim())
}

/**
 * Parse raw document text into a structured ParsedDocument.
 */
export function parseDocumentSections(text: string): ParsedDocument {
  const lines = text.split("\n")

  let title: string | null = null
  const preambleLines: string[] = []
  const sections: DocumentSection[] = []
  const signatureLines: string[] = []

  let currentSection: { number: number; title: string; bodyLines: string[] } | null = null
  let inSignatureBlock = false
  let inPreamble = false
  let titleFound = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip empty lines at the very start
    if (!trimmed && !titleFound && preambleLines.length === 0 && sections.length === 0) {
      continue
    }

    // Signature block — collect remaining lines
    if (inSignatureBlock) {
      signatureLines.push(line)
      continue
    }

    // Check for signature block start
    if (isSignatureBlockStart(trimmed)) {
      // Flush current section
      if (currentSection) {
        sections.push({
          number: currentSection.number,
          title: currentSection.title,
          body: currentSection.bodyLines.join("\n").trim(),
        })
        currentSection = null
      }
      inSignatureBlock = true
      signatureLines.push(line)
      continue
    }

    // Check for numbered section start
    const sectionMatch = isNumberedSectionStart(trimmed)
    if (sectionMatch) {
      // Flush current section
      if (currentSection) {
        sections.push({
          number: currentSection.number,
          title: currentSection.title,
          body: currentSection.bodyLines.join("\n").trim(),
        })
      }

      inPreamble = false
      currentSection = {
        number: sectionMatch.number,
        title: sectionMatch.title,
        bodyLines: [],
      }
      continue
    }

    // If we're inside a numbered section, collect body lines
    if (currentSection) {
      currentSection.bodyLines.push(line)
      continue
    }

    // Title detection — only detect once, before any sections
    if (!titleFound && sections.length === 0 && isTitleLine(trimmed)) {
      title = trimmed
      titleFound = true
      continue
    }

    // Preamble detection
    if (isPreambleLine(trimmed)) {
      inPreamble = true
    }

    if (inPreamble || (!titleFound && sections.length === 0)) {
      // Collect preamble or pre-section text
      if (trimmed) {
        preambleLines.push(trimmed)
      }
    }
  }

  // Flush last section
  if (currentSection) {
    sections.push({
      number: currentSection.number,
      title: currentSection.title,
      body: currentSection.bodyLines.join("\n").trim(),
    })
  }

  return {
    title,
    preamble: preambleLines.length > 0 ? preambleLines.join("\n").trim() : null,
    sections,
    signatureBlock: signatureLines.length > 0 ? signatureLines.join("\n").trim() : null,
  }
}

/**
 * Truncate a ParsedDocument to only show a limited number of sections.
 */
export function truncateDocument(doc: ParsedDocument, maxSections: number = 3): ParsedDocument {
  return {
    ...doc,
    sections: doc.sections.slice(0, maxSections),
    signatureBlock: null, // Never show signature block in truncated preview
  }
}
