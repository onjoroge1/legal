import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const runtime = "nodejs"

async function generatePDF(content: string, title: string): Promise<Buffer> {
  const PDFDocument = (await import("pdfkit")).default
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 72, size: "LETTER" })
    const chunks: Buffer[] = []

    doc.on("data", (chunk: Buffer) => chunks.push(chunk))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    const lines = content.split("\n")

    // Document title
    doc.fontSize(16).font("Helvetica-Bold").text(title, { align: "center" })
    doc.moveDown(1.5)

    for (const line of lines) {
      const trimmed = line.trim()

      if (!trimmed) {
        doc.moveDown(0.5)
        continue
      }

      // Section headings: all-caps or starts with a number + period
      const isHeading = /^[A-Z\s]{5,}$/.test(trimmed) || /^\d+\.\s+[A-Z]/.test(trimmed)

      if (isHeading) {
        doc.moveDown(0.5)
        doc.fontSize(11).font("Helvetica-Bold").text(trimmed, { align: "left" })
        doc.moveDown(0.3)
      } else {
        doc.fontSize(10).font("Helvetica").text(trimmed, {
          align: "justify",
          lineGap: 2,
        })
        doc.moveDown(0.3)
      }
    }

    doc.end()
  })
}

async function generateDOCX(content: string, title: string): Promise<Buffer> {
  const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = await import("docx")

  const lines = content.split("\n")
  const children: InstanceType<typeof Paragraph>[] = []

  // Title paragraph
  children.push(
    new Paragraph({
      children: [new TextRun({ text: title, bold: true, size: 32 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  )

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      children.push(new Paragraph({ text: "" }))
      continue
    }

    const isHeading = /^[A-Z\s]{5,}$/.test(trimmed) || /^\d+\.\s+[A-Z]/.test(trimmed)

    if (isHeading) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: trimmed, bold: true, size: 24 })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 100 },
        })
      )
    } else {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: trimmed, size: 22 })],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 100 },
        })
      )
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  })

  return Packer.toBuffer(doc)
}

/**
 * POST /api/documents/download
 * Generates and streams a real PDF or DOCX file.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { documentText, documentTitle, format } = body

    if (!documentText || !format) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const safeTitle = (documentTitle || "document").replace(/[^a-zA-Z0-9\s-]/g, "").trim()

    if (format === "pdf") {
      const buffer = await generatePDF(documentText, safeTitle)
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${safeTitle}.pdf"`,
          "Content-Length": String(buffer.length),
        },
      })
    }

    if (format === "docx") {
      const buffer = await generateDOCX(documentText, safeTitle)
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${safeTitle}.docx"`,
          "Content-Length": String(buffer.length),
        },
      })
    }

    return NextResponse.json({ error: "Invalid format. Use 'pdf' or 'docx'." }, { status: 400 })
  } catch (error) {
    console.error("Download API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
