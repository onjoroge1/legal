import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib"
import {
  Document as DocxDocument,
  Packer,
  Paragraph,
  TextRun,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  PageNumber,
  NumberFormat,
  BorderStyle,
} from "docx"

// ─── Text Utilities ──────────────────────────────────────────────────────────

/**
 * Strip basic markdown/HTML formatting so we have clean plain text for PDF.
 * Handles **bold**, *italic*, # headings, HTML tags, etc.
 */
function stripFormatting(text: string): string {
  return text
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/**
 * Word-wrap a single line to fit within a given character width.
 * Returns an array of wrapped lines.
 */
function wrapLine(line: string, maxChars: number): string[] {
  if (line.length <= maxChars) return [line]
  const words = line.split(" ")
  const lines: string[] = []
  let current = ""

  for (const word of words) {
    if (current.length === 0) {
      current = word
    } else if (current.length + 1 + word.length <= maxChars) {
      current += " " + word
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

// ─── PDF Generation ──────────────────────────────────────────────────────────

async function generatePdf(
  title: string,
  content: string,
  generatedDate: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()

  // Embed standard fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic)

  // Page dimensions & margins
  const [pageWidth, pageHeight] = PageSizes.Letter // 612 x 792
  const margin = { top: 72, bottom: 72, left: 72, right: 72 }
  const usableWidth = pageWidth - margin.left - margin.right // 468

  // Font sizes
  const titleFontSize = 18
  const dateFontSize = 10
  const bodyFontSize = 11
  const headingFontSize = 14
  const footerFontSize = 9
  const lineHeight = bodyFontSize * 1.5

  // Approximate characters per line for word wrapping
  const avgCharWidth = fontRegular.widthOfTextAtSize("x", bodyFontSize)
  const maxCharsPerLine = Math.floor(usableWidth / avgCharWidth)

  // Parse lines from content
  const cleanContent = stripFormatting(content)
  const rawLines = cleanContent.split("\n")

  // Classify each line and word-wrap
  interface LineEntry {
    text: string
    type: "heading" | "body" | "blank"
  }

  const entries: LineEntry[] = []
  for (const raw of rawLines) {
    const trimmed = raw.trim()
    if (trimmed === "") {
      entries.push({ text: "", type: "blank" })
      continue
    }
    // Detect markdown headings
    const headingMatch = trimmed.match(/^#{1,3}\s+(.*)/)
    if (headingMatch) {
      entries.push({ text: headingMatch[1], type: "heading" })
      continue
    }
    // Detect lines that look like section titles (ALL CAPS, or short bold lines)
    const isAllCaps =
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 3 &&
      trimmed.length < 80 &&
      /[A-Z]/.test(trimmed)
    if (isAllCaps) {
      entries.push({ text: trimmed, type: "heading" })
      continue
    }

    // Word-wrap body text
    const wrapped = wrapLine(trimmed, maxCharsPerLine)
    for (const wl of wrapped) {
      entries.push({ text: wl, type: "body" })
    }
  }

  // Draw pages
  let pageNum = 0
  let page = pdfDoc.addPage(PageSizes.Letter)
  pageNum++
  let cursorY = pageHeight - margin.top

  // ── Draw title page header ──
  // Title
  const titleLines = wrapLine(title, Math.floor(usableWidth / (fontBold.widthOfTextAtSize("x", titleFontSize))))
  for (const tl of titleLines) {
    const titleWidth = fontBold.widthOfTextAtSize(tl, titleFontSize)
    page.drawText(tl, {
      x: margin.left + (usableWidth - titleWidth) / 2,
      y: cursorY,
      size: titleFontSize,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1),
    })
    cursorY -= titleFontSize * 1.4
  }

  // Horizontal rule under title
  cursorY -= 4
  page.drawLine({
    start: { x: margin.left, y: cursorY },
    end: { x: pageWidth - margin.right, y: cursorY },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7),
  })
  cursorY -= 12

  // Generated date
  const dateText = `Generated: ${generatedDate}`
  page.drawText(dateText, {
    x: margin.left,
    y: cursorY,
    size: dateFontSize,
    font: fontItalic,
    color: rgb(0.45, 0.45, 0.45),
  })
  cursorY -= dateFontSize * 2.5

  // Helper: add a footer to a page
  function addFooter(p: typeof page, num: number) {
    const footerText = `Page ${num}`
    const footerWidth = fontRegular.widthOfTextAtSize(footerText, footerFontSize)
    p.drawText(footerText, {
      x: margin.left + (usableWidth - footerWidth) / 2,
      y: margin.bottom - 24,
      size: footerFontSize,
      font: fontRegular,
      color: rgb(0.55, 0.55, 0.55),
    })
  }

  // Helper: start new page if needed
  function ensureSpace(needed: number) {
    if (cursorY - needed < margin.bottom) {
      addFooter(page, pageNum)
      page = pdfDoc.addPage(PageSizes.Letter)
      pageNum++
      cursorY = pageHeight - margin.top
    }
  }

  // ── Draw body content ──
  for (const entry of entries) {
    if (entry.type === "blank") {
      cursorY -= lineHeight * 0.6
      continue
    }

    if (entry.type === "heading") {
      ensureSpace(headingFontSize * 2.5)
      cursorY -= headingFontSize * 0.6 // extra space before heading
      page.drawText(entry.text, {
        x: margin.left,
        y: cursorY,
        size: headingFontSize,
        font: fontBold,
        color: rgb(0.12, 0.12, 0.12),
      })
      cursorY -= headingFontSize * 1.6
      continue
    }

    // Body text
    ensureSpace(lineHeight)
    page.drawText(entry.text, {
      x: margin.left,
      y: cursorY,
      size: bodyFontSize,
      font: fontRegular,
      color: rgb(0.15, 0.15, 0.15),
    })
    cursorY -= lineHeight
  }

  // Footer on last page
  addFooter(page, pageNum)

  // PDF metadata
  pdfDoc.setTitle(title)
  pdfDoc.setCreator("LegalLawDocs")
  pdfDoc.setProducer("LegalLawDocs Document Generator")
  pdfDoc.setCreationDate(new Date())

  return pdfDoc.save()
}

// ─── DOCX Generation ─────────────────────────────────────────────────────────

function generateDocx(
  title: string,
  content: string,
  generatedDate: string
): Promise<Buffer> {
  const cleanContent = stripFormatting(content)
  const rawLines = cleanContent.split("\n")

  // Build document paragraphs
  const bodyParagraphs: Paragraph[] = []

  // Title
  bodyParagraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 36, // 18pt in half-points
          font: "Times New Roman",
          color: "1a1a1a",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    })
  )

  // Separator line
  bodyParagraphs.push(
    new Paragraph({
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 6,
          color: "b3b3b3",
        },
      },
      spacing: { after: 120 },
    })
  )

  // Date
  bodyParagraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated: ${generatedDate}`,
          italics: true,
          size: 20, // 10pt
          font: "Times New Roman",
          color: "737373",
        }),
      ],
      spacing: { after: 240 },
    })
  )

  // Body content
  for (const raw of rawLines) {
    const trimmed = raw.trim()
    if (trimmed === "") {
      bodyParagraphs.push(
        new Paragraph({
          spacing: { after: 80 },
        })
      )
      continue
    }

    // Detect markdown headings
    const headingMatch = trimmed.match(/^#{1,3}\s+(.*)/)
    if (headingMatch) {
      bodyParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: headingMatch[1],
              bold: true,
              size: 28, // 14pt
              font: "Times New Roman",
              color: "1f1f1f",
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        })
      )
      continue
    }

    // Detect ALL CAPS section titles
    const isAllCaps =
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 3 &&
      trimmed.length < 80 &&
      /[A-Z]/.test(trimmed)
    if (isAllCaps) {
      bodyParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: 28,
              font: "Times New Roman",
              color: "1f1f1f",
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        })
      )
      continue
    }

    // Regular body text
    bodyParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: trimmed,
            size: 22, // 11pt
            font: "Times New Roman",
            color: "262626",
          }),
        ],
        spacing: { after: 80, line: 360 }, // 1.5 line spacing
      })
    )
  }

  const doc = new DocxDocument({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch in twips
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
            pageNumbers: {
              start: 1,
              formatType: NumberFormat.DECIMAL,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    size: 16, // 8pt
                    font: "Times New Roman",
                    color: "999999",
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Page ",
                    size: 18,
                    font: "Times New Roman",
                    color: "8c8c8c",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 18,
                    font: "Times New Roman",
                    color: "8c8c8c",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: bodyParagraphs,
      },
    ],
  })

  return Packer.toBuffer(doc)
}

// ─── Fetch document from database ────────────────────────────────────────────

async function fetchDocumentFromDb(
  documentId: string,
  userEmail: string
): Promise<{ title: string; content: string; createdAt: Date } | null> {
  // First try UserDocument (user-generated documents)
  const userDoc = await prisma.userDocument.findFirst({
    where: {
      id: documentId,
      user: { email: userEmail },
      deletedAt: null,
    },
    select: { title: true, content: true, createdAt: true },
  })

  if (userDoc) return userDoc

  // Then try Document table
  const doc = await prisma.document.findFirst({
    where: {
      id: documentId,
      user: { email: userEmail },
      deletedAt: null,
    },
    select: { title: true, content: true, createdAt: true },
  })

  return doc
}

// ─── Route Handler ───────────────────────────────────────────────────────────

/**
 * Download document API
 * POST /api/documents/download
 *
 * Accepts either:
 *   { documentId, format }           - fetches from DB
 *   { documentText, documentTitle, format } - uses provided content
 *
 * format: "pdf" | "docx"
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { documentId, documentText, documentTitle, format } = body

    if (!format || !["pdf", "docx"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid or missing format. Use 'pdf' or 'docx'." },
        { status: 400 }
      )
    }

    let title: string
    let content: string
    let generatedDate: string

    // ── Resolve document content ──
    if (documentId) {
      // Fetch from database
      const doc = await fetchDocumentFromDb(documentId, session.user.email)
      if (!doc) {
        return NextResponse.json(
          { error: "Document not found" },
          { status: 404 }
        )
      }
      title = doc.title
      content = doc.content
      generatedDate = doc.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } else if (documentText) {
      // Use provided text
      title = documentTitle || "Document"
      content = documentText
      generatedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } else {
      return NextResponse.json(
        { error: "Missing documentId or documentText" },
        { status: 400 }
      )
    }

    // Sanitize filename
    const safeTitle = title.replace(/[^a-zA-Z0-9_\- ]/g, "").trim() || "document"

    // ── Generate file ──
    if (format === "pdf") {
      const pdfBytes = await generatePdf(title, content, generatedDate)

      return new NextResponse(pdfBytes, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${safeTitle}.pdf"`,
          "Content-Length": String(pdfBytes.length),
        },
      })
    }

    // DOCX
    const docxBuffer = await generateDocx(title, content, generatedDate)

    return new NextResponse(docxBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${safeTitle}.docx"`,
        "Content-Length": String(docxBuffer.length),
      },
    })
  } catch (error) {
    console.error("Download API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
