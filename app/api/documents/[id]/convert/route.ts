import { NextRequest, NextResponse } from "next/server"
import { convertToPDF, convertToDOCX } from "@/utils/document-converter"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { format } = await request.json()
    const documentId = params.id

    // Get the document
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
        user: {
          email: session.user.email
        }
      }
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    let content: Buffer | string
    let contentType: string
    let filename: string

    switch (format) {
      case "pdf": {
        const pdfBuffer = await convertToPDF(document.content, document.title)
        content = Buffer.from(await pdfBuffer.arrayBuffer())
        contentType = "application/pdf"
        filename = `${document.title}.pdf`
        break
      }
      case "docx": {
        const docxBuffer = await convertToDOCX(document.content, document.title)
        content = Buffer.from(await docxBuffer.arrayBuffer())
        contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        filename = `${document.title}.docx`
        break
      }
      default:
        content = document.content
        contentType = "text/plain"
        filename = `${document.title}.txt`
    }

    // Create response with the file
    const response = new NextResponse(content)
    response.headers.set("Content-Type", contentType)
    response.headers.set("Content-Disposition", `attachment; filename="${filename}"`)
    
    return response
  } catch (error) {
    console.error("Conversion error:", error)
    return NextResponse.json(
      { error: "Failed to convert document" },
      { status: 500 }
    )
  }
} 