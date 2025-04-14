import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reviewers } = await req.json()
    if (!reviewers || !Array.isArray(reviewers) || reviewers.length === 0) {
      return NextResponse.json(
        { error: "At least one reviewer email is required" },
        { status: 400 }
      )
    }

    // Get the document
    const document = await prisma.document.findUnique({
      where: { id: params.id },
      include: { user: true }
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    if (document.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update document status
    await prisma.document.update({
      where: { id: params.id },
      data: { status: "needs_review" }
    })

    // Send review emails
    const reviewEmails = reviewers.map(async (reviewer) => {
      const reviewToken = crypto.randomUUID()
      
      // Create a review record
      await prisma.documentCollaborator.create({
        data: {
          documentId: document.id,
          userId: session.user.id,
          role: "reviewer",
          metadata: { reviewToken }
        }
      })

      // Send email
      await resend.emails.send({
        from: "Legal Law Docs <noreply@legallawdocs.com>",
        to: reviewer,
        subject: `Review Request: ${document.title}`,
        html: `
          <h1>Document Review Request</h1>
          <p>You have been requested to review the following document:</p>
          <p><strong>Title:</strong> ${document.title}</p>
          <p><strong>Type:</strong> ${document.type}</p>
          ${document.description ? `<p><strong>Description:</strong> ${document.description}</p>` : ""}
          <p>Please click the link below to review the document:</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/review/${reviewToken}">Review Document</a>
        `
      })
    })

    await Promise.all(reviewEmails)

    return NextResponse.json({ message: "Review requests sent successfully" })
  } catch (error) {
    console.error("[Document Review] Error:", error)
    return NextResponse.json(
      { error: "Failed to send review requests" },
      { status: 500 }
    )
  }
} 