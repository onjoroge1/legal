import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generatePDF } from "@/lib/pdf-generator"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

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

    // Check subscription tier — paid users get a watermark-free PDF.
    // Footer disclaimer is still shown for everyone (legal protection).
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { subscriptionTier: true, subscriptionStatus: true },
    })
    const isPaidUser =
      user?.subscriptionTier === "professional" && user.subscriptionStatus === "active"

    if (format === "pdf") {
      const buffer = await generatePDF(documentText, safeTitle, { isWatermarked: !isPaidUser })
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
