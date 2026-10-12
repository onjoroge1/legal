import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { resolveDocument } from "@/lib/document-resolver"
import { PublicationPage } from "@/components/legal/publication-page"
import { approvedPublication } from "@/lib/publication-policy"
type Props = { params: Promise<{ category: string; slug: string }> }
export const dynamic = "force-dynamic"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { category, slug } = await params, path = `/documents/${category}/${slug}`
 let doc; try { doc = resolveDocument(category, slug).doc } catch { return { robots: { index: false, follow: false } } }
 const entry = approvedPublication(path)
 return { title: entry?.publication.title ?? `${doc.title} — Review pending`, description: entry?.publication.description ?? "This document scope is awaiting review and is not available in the supported launch collection.", robots: { index: !!entry, follow: true }, alternates: { canonical: `https://www.legallawdocs.com${path}` } }
}
export default async function DocumentDetailPage({ params }: Props) {
 const { category, slug } = await params
 let resolved; try { resolved = resolveDocument(category, slug) } catch { notFound() }
 return <PublicationPage path={resolved.path} title={resolved.doc.title} generatePath={`${resolved.path}/generate`} />
}
