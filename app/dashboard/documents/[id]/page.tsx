import DocumentView from "@/components/dashboard/document-view"
import { getServerSession } from "next-auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")
  const doc = await prisma.userDocument.findFirst({ where: { id: (await params).id, userId: session.user.id, deletedAt: null } })
  if (!doc) {
    const v = await prisma.documentVersion.findFirst({ where: { id: (await params).id, OR: [{ claimedOwnerId: session.user.id }, { claimedOwnerId: null, draft: { ownerId: session.user.id } }] }, include: { draft: true } })
    if (!v) notFound()
    redirect(`/documents/${v.draft.category}/${v.draft.sourceSlug}/preview?version=${v.id}`)
  }
  const meta = doc.metadata as { versionId?: string } | null
  if (meta?.versionId) {
    const version = await prisma.documentVersion.findFirst({ where: { id: meta.versionId, OR: [{ claimedOwnerId: session.user.id }, { claimedOwnerId: null, draft: { ownerId: session.user.id } }] }, include: { draft: true } })
    if (!version) notFound()
    redirect(`/documents/${version.draft.category}/${version.draft.sourceSlug}/download?version=${version.id}`)
  }
  return <DocumentView />
}
