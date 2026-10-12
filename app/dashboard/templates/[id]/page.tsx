import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { resolveDocument } from "@/lib/document-resolver"
export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let slug = id
  try { resolveDocument(undefined, slug) } catch {
    const template = await prisma.documentTemplate.findFirst({ where: { deletedAt: null, OR: [{ id }, { code: id }, { slug: id }] }, select: { slug: true, code: true } })
    if (!template) notFound()
    slug = template.slug ?? template.code ?? ""
  }
  let path: string
  try { path = resolveDocument(undefined, slug).path } catch { notFound() }
  redirect(`${path}/generate`)
}
