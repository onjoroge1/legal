/**
 * Parse AI-generated legal document text into structured sections.
 * Handles markdown-formatted output from GPT-4o-mini.
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

// ─── Markdown Stripping ───────────────────────────────────────────────────────

/**
 * Strip markdown formatting artifacts from a single line.
 * GPT-4o-mini often returns legal documents wrapped in markdown.
 */
function stripMarkdownLine(line: string): string {
  let s = line

  // Remove markdown heading prefixes: ### , ## , #
  s = s.replace(/^#{1,6}\s+/, "")

  // Remove bold/italic wrappers: **text**, *text*, __text__, _text_
  s = s.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
  s = s.replace(/_{1,3}([^_]+)_{1,3}/g, "$1")

  // Remove inline code backticks
  s = s.replace(/`([^`]+)`/g, "$1")

  return s
}

/**
 * Pre-process the full document text: remove markdown code fences,
 * horizontal rules, and other structural markdown artifacts.
 */
function stripMarkdownDocument(text: string): string {
  const lines = text.split("\n")
  const cleaned: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    // Skip code fence lines (```markdown, ```, etc.)
    if (/^```/.test(trimmed)) continue

    // Skip horizontal rules (---, ***, ___)
    if (/^[-*_]{3,}\s*$/.test(trimmed)) continue

    // Strip markdown formatting from each line
    cleaned.push(stripMarkdownLine(line))
  }

  return cleaned.join("\n")
}

/**
 * Strip markdown from a block of body text.
 * Handles bullet points, bold, italic, links, etc.
 */
function stripMarkdownBody(text: string): string {
  let s = text

  // Remove bold/italic
  s = s.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
  s = s.replace(/_{1,3}([^_]+)_{1,3}/g, "$1")

  // Remove markdown links: [text](url) → text
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

  // Remove inline code
  s = s.replace(/`([^`]+)`/g, "$1")

  // Convert markdown bullet points to readable form
  s = s.replace(/^\s*[-*+]\s+/gm, "• ")

  // Remove heading markers that might be inline
  s = s.replace(/^#{1,6}\s+/gm, "")

  // Remove horizontal rules
  s = s.replace(/^[-*_]{3,}\s*$/gm, "")

  // Remove code fences
  s = s.replace(/```[a-z]*\n?/g, "")

  return s.trim()
}

// ─── Detection Helpers ────────────────────────────────────────────────────────

/**
 * Detect if a line is likely a document title.
 */
function isTitleLine(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed || trimmed.length < 5) return false

  // Common document title patterns
  if (/\b(AGREEMENT|CONTRACT|NDA|NON-DISCLOSURE|LEASE|POWER OF ATTORNEY|LAST WILL|TESTAMENT|OPERATING AGREEMENT)\b/i.test(trimmed)) {
    const uppercaseRatio = (trimmed.match(/[A-Z]/g) || []).length / trimmed.length
    return uppercaseRatio > 0.4 || trimmed.length < 80
  }

  // Short all-caps line (10+ chars)
  if (/^[A-Z\s\-–—:]{10,}$/.test(trimmed)) {
    return true
  }

  return false
}

/**
 * Detect if a line starts a numbered section.
 * Handles various formats:
 *   1. DEFINITIONS
 *   1. **Definitions**
 *   **1. Definitions**
 *   Section 1: Definitions
 *   ARTICLE 1 - DEFINITIONS
 */
function isNumberedSectionStart(line: string): { number: number; title: string } | null {
  const trimmed = line.trim()

  // Pattern: "1. Title" or "1. TITLE"
  const directMatch = trimmed.match(/^(\d+)\.\s+(.+)/)
  if (directMatch) {
    return {
      number: parseInt(directMatch[1], 10),
      title: directMatch[2].trim(),
    }
  }

  // Pattern: "Section 1: Title" or "Section 1. Title"
  const sectionMatch = trimmed.match(/^Section\s+(\d+)[.:]\s*(.+)/i)
  if (sectionMatch) {
    return {
      number: parseInt(sectionMatch[1], 10),
      title: sectionMatch[2].trim(),
    }
  }

  // Pattern: "ARTICLE 1 - Title" or "ARTICLE 1: Title"
  const articleMatch = trimmed.match(/^ARTICLE\s+(\d+)\s*[-–—:.]\s*(.+)/i)
  if (articleMatch) {
    return {
      number: parseInt(articleMatch[1], 10),
      title: articleMatch[2].trim(),
    }
  }

  return null
}

/**
 * Detect if a line is a preamble keyword (WHEREAS, RECITALS, etc.)
 */
function isPreambleLine(line: string): boolean {
  return /^(WHEREAS|NOW,?\s+THEREFORE|RECITALS|WITNESSETH|THIS\s+(AGREEMENT|CONTRACT|NON-DISCLOSURE))/i.test(line.trim())
}

/**
 * Detect if a line starts the signature block
 */
function isSignatureBlockStart(line: string): boolean {
  return /^(IN WITNESS WHEREOF|SIGNATURE|SIGNATURES|EXECUTED|BY AND BETWEEN)/i.test(line.trim())
}

// ─── Main Parser ──────────────────────────────────────────────────────────────

/**
 * Parse raw document text (potentially markdown-formatted) into a structured ParsedDocument.
 */
export function parseDocumentSections(text: string): ParsedDocument {
  // Step 1: Strip all markdown formatting
  const cleanedText = stripMarkdownDocument(text)
  const lines = cleanedText.split("\n")

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
      if (currentSection) {
        sections.push({
          number: currentSection.number,
          title: currentSection.title,
          body: stripMarkdownBody(currentSection.bodyLines.join("\n").trim()),
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
          body: stripMarkdownBody(currentSection.bodyLines.join("\n").trim()),
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
      body: stripMarkdownBody(currentSection.bodyLines.join("\n").trim()),
    })
  }

  return {
    title,
    preamble: preambleLines.length > 0 ? stripMarkdownBody(preambleLines.join("\n").trim()) : null,
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
