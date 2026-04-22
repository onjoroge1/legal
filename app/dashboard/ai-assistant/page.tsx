import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import AIAssistantClient from "./client"

export const metadata: Metadata = {
  title: "AI Document Assistant | LegalLawDocs.com",
  description: "AI-powered analysis and recommendations for your legal documents",
}

export default async function AIAssistantPage() {
  const session = await getServerSession(authOptions)

  const documents = session?.user?.email
    ? await prisma.userDocument.findMany({
        where: {
          user: { email: session.user.email },
          deletedAt: null,
          status: { not: "pending_payment" },
        },
        orderBy: { updatedAt: "desc" },
        take: 20,
        select: { id: true, title: true, type: true, updatedAt: true },
      })
    : []

  const serialized = documents.map((d) => ({
    id: d.id,
    title: d.title,
    type: d.type,
    updatedAt: d.updatedAt.toISOString(),
  }))

  return <AIAssistantClient documents={serialized} />
}
