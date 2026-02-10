import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * Download document API
 * POST /api/documents/download
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { documentText, documentTitle, format } = body

    if (!documentText || !format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // For now, return the text content
    // In production, you would use a library like pdfkit or docx to generate actual files
    if (format === "pdf") {
      // Return as text/plain for now - in production, generate actual PDF
      return new NextResponse(documentText, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${documentTitle || "document"}.pdf"`,
        },
      })
    } else if (format === "docx") {
      // Return as text/plain for now - in production, generate actual DOCX
      return new NextResponse(documentText, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${documentTitle || "document"}.docx"`,
        },
      })
    }

    return NextResponse.json(
      { error: "Invalid format" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Download API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

