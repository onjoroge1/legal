/**
 * Shared PDF generation utility.
 * Used by both the download route and the email service (post-payment attachment).
 *
 * Parses the plain-text document format produced by the AI and renders it with
 * professional legal-document typography using pdfkit.
 */

const FIELD_LABEL_RE =
  /^(Name|Date|Title|Signature|Signed|Address|City|State(?:\s+of)?|Company|By|Phone|Email|Position|Role|Print(?:ed\s+Name)?|Witness|Notary|Tax\s*ID|EIN|Landlord|Tenant|Employer|Employee|Contractor|Client|Party|Attorney|Agent|Owner|Buyer|Seller|Licensor|Licensee)\s*:/i

/** True when every letter in the string is uppercase */
function isAllUppercase(s: string): boolean {
  const letters = s.replace(/[^a-zA-Z]/g, "")
  return letters.length >= 3 && letters === letters.toUpperCase()
}

/** Strip raw ___ blanks from a string (PDF doesn't render them as lines — we draw instead) */
function stripBlanks(s: string): string {
  return s.replace(/_{3,}/g, " ______________")
}

type LineKind =
  | "blank"
  | "doc-title"
  | "section"           // numbered main section
  | "subsection"        // 1.1 / 1.1.1
  | "all-caps"          // mid-doc ALL-CAPS heading
  | "recital"           // WHEREAS …
  | "therefore"         // NOW, THEREFORE / IN WITNESS WHEREOF
  | "signature-rule"    // _________ (draw a line)
  | "field-row"         // Name: ___, Date: ___
  | "paragraph"

interface ClassifiedLine {
  kind: LineKind
  raw: string
}

function classify(trimmed: string, seenTitle: boolean): LineKind {
  if (!trimmed) return "blank"
  if (/^[_]{8,}$/.test(trimmed) || /^[-]{8,}$/.test(trimmed)) return "signature-rule"
  if (FIELD_LABEL_RE.test(trimmed)) return "field-row"
  if (/^WHEREAS\b/i.test(trimmed)) return "recital"
  if (/^(NOW,?\s+THEREFORE|IN WITNESS WHEREOF)/i.test(trimmed)) return "therefore"
  if (/^\d+\.\d+/.test(trimmed)) return "subsection"
  if (/^\d+\.\s/.test(trimmed) || /^\d+\.$/.test(trimmed)) return "section"
  if (isAllUppercase(trimmed)) return seenTitle ? "all-caps" : "doc-title"
  return "paragraph"
}

export async function generatePDF(content: string, title: string): Promise<Buffer> {
  const PDFDocument = (await import("pdfkit")).default

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 72, // 1-inch margins — standard legal doc
      size: "LETTER",
      info: { Title: title, Creator: "LegalLawDocs.com" },
    })

    const chunks: Buffer[] = []
    doc.on("data", (chunk: Buffer) => chunks.push(chunk))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    const pageWidth = doc.page.width - 144 // width minus both margins

    // ── Typography helpers ─────────────────────────────────────────────────

    const bodyText = (text: string, options: object = {}) =>
      doc
        .font("Times-Roman")
        .fontSize(11)
        .text(stripBlanks(text), { align: "justify", lineGap: 3, ...options })

    const boldText = (text: string, options: object = {}) =>
      doc
        .font("Times-Bold")
        .fontSize(11)
        .text(stripBlanks(text), { align: "justify", lineGap: 3, ...options })

    // ── Document header ────────────────────────────────────────────────────

    // Centred title at top (always, regardless of document content)
    doc
      .font("Times-Bold")
      .fontSize(14)
      .text(title.toUpperCase(), { align: "center", characterSpacing: 1 })
    doc.moveDown(0.3)
    // Thin decorative rule under title
    const cx = doc.page.margins.left
    const titleY = doc.y
    doc.moveTo(cx, titleY).lineTo(cx + pageWidth, titleY).strokeColor("#999").lineWidth(0.5).stroke()
    doc.strokeColor("#000").lineWidth(1)
    doc.moveDown(1.2)

    // ── Parse and render lines ─────────────────────────────────────────────

    const lines = content.split("\n")
    let seenTitle = false
    let pendingParagraph: string[] = []

    const flushParagraph = () => {
      if (pendingParagraph.length === 0) return
      const text = pendingParagraph.join(" ").trim()
      pendingParagraph = []
      if (!text) return
      bodyText(text)
      doc.moveDown(0.4)
    }

    for (const line of lines) {
      const trimmed = line.trim()
      const kind = classify(trimmed, seenTitle)

      if (kind === "blank") {
        flushParagraph()
        continue
      }

      if (kind === "doc-title") {
        seenTitle = true
        // Document already has a header; skip duplicate title in body
        // (or render it centred if it differs from the page title)
        if (trimmed.toUpperCase() !== title.toUpperCase()) {
          flushParagraph()
          doc.font("Times-Bold").fontSize(13).text(trimmed, { align: "center", characterSpacing: 0.8 })
          doc.moveDown(0.8)
        }
        continue
      }

      if (kind === "signature-rule") {
        flushParagraph()
        doc.moveDown(1.5)
        const sx = doc.page.margins.left
        const sy = doc.y
        doc.moveTo(sx, sy).lineTo(sx + 240, sy).strokeColor("#333").lineWidth(0.8).stroke()
        doc.strokeColor("#000").lineWidth(1)
        doc.moveDown(0.3)
        continue
      }

      if (kind === "field-row") {
        flushParagraph()
        const colonIdx = trimmed.indexOf(":")
        const label = trimmed.slice(0, colonIdx).trim()
        const value = trimmed.slice(colonIdx + 1).trim().replace(/_{3,}/g, "").trim()

        const startX = doc.page.margins.left
        const labelWidth = 110
        const lineStartX = startX + labelWidth + 8
        const lineEndX = startX + pageWidth
        const rowY = doc.y

        // Label
        doc.font("Times-Bold").fontSize(9).text(label.toUpperCase() + ":", startX, rowY, {
          width: labelWidth,
          lineBreak: false,
        })

        // Value or blank underline
        if (value) {
          doc.font("Times-Roman").fontSize(11).text(value, lineStartX, rowY, {
            width: lineEndX - lineStartX,
            lineBreak: false,
          })
        } else {
          // Draw a fill-in line
          const lineY = rowY + 12
          doc.moveTo(lineStartX, lineY).lineTo(lineEndX, lineY).strokeColor("#555").lineWidth(0.5).stroke()
          doc.strokeColor("#000").lineWidth(1)
        }

        doc.moveDown(0.7)
        continue
      }

      if (kind === "recital") {
        flushParagraph()
        const body = trimmed.slice(7) // strip "WHEREAS"
        doc.font("Times-Bold").fontSize(11).text("WHEREAS", {
          continued: true,
          indent: 24,
          lineGap: 3,
        })
        doc.font("Times-Italic").fontSize(11).text(stripBlanks(body), {
          align: "justify",
          indent: 0,
          lineGap: 3,
        })
        doc.moveDown(0.4)
        continue
      }

      if (kind === "therefore") {
        flushParagraph()
        doc.moveDown(0.3)
        boldText(trimmed)
        doc.moveDown(0.4)
        continue
      }

      if (kind === "all-caps") {
        flushParagraph()
        doc.moveDown(0.5)
        doc.font("Times-Bold").fontSize(11).text(trimmed, { align: "center", characterSpacing: 0.5 })
        doc.moveDown(0.5)
        continue
      }

      if (kind === "section") {
        flushParagraph()
        doc.moveDown(0.6)

        const spaceIdx = trimmed.indexOf(" ")
        if (spaceIdx === -1) {
          // Bare "1." with nothing after
          doc.font("Times-Bold").fontSize(11).text(trimmed, { characterSpacing: 0.3 })
        } else {
          const num = trimmed.slice(0, spaceIdx)
          const rest = trimmed.slice(spaceIdx + 1).trim()
          const isHeaderOnly = isAllUppercase(rest) || (rest.length < 60 && !/[.;,]/.test(rest))

          if (isHeaderOnly) {
            // Pure header — all bold, thin underline
            doc.font("Times-Bold").fontSize(11).text(`${num}  ${rest}`, { characterSpacing: 0.3 })
            const hx = doc.page.margins.left
            const hy = doc.y + 1
            doc.moveTo(hx, hy).lineTo(hx + pageWidth, hy).strokeColor("#ccc").lineWidth(0.4).stroke()
            doc.strokeColor("#000").lineWidth(1)
          } else {
            // Header that runs into body text
            doc.font("Times-Bold").fontSize(11).text(num + " ", { continued: true, lineGap: 3 })
            doc.font("Times-Roman").fontSize(11).text(stripBlanks(rest), { align: "justify", lineGap: 3 })
          }
        }
        doc.moveDown(0.5)
        continue
      }

      if (kind === "subsection") {
        flushParagraph()
        const spaceIdx = trimmed.search(/\s/)
        if (spaceIdx === -1) {
          boldText(trimmed)
        } else {
          const num = trimmed.slice(0, spaceIdx)
          const rest = trimmed.slice(spaceIdx + 1).trim()
          if (rest.length > 0 && isAllUppercase(rest) && rest.length < 50) {
            // Sub-section header
            doc.font("Times-Bold").fontSize(10).text(`${num}  ${rest}`, { lineGap: 2 })
          } else {
            doc.font("Times-Bold").fontSize(11).text(num + " ", {
              continued: true,
              lineGap: 3,
            })
            doc.font("Times-Roman").fontSize(11).text(stripBlanks(rest), {
              align: "justify",
              lineGap: 3,
            })
          }
        }
        doc.moveDown(0.3)
        continue
      }

      // Default: accumulate as paragraph
      pendingParagraph.push(trimmed)
    }

    flushParagraph()
    doc.end()
  })
}
