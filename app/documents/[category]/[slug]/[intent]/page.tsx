import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { resolveDocument } from "@/lib/document-resolver"
import { PublicationPage } from "@/components/legal/publication-page"
import { approvedPublication } from "@/lib/publication-policy"
type Props = { params: Promise<{ category: string; slug: string; intent: string }> }
export const dynamic = "force-dynamic"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { category, slug, intent } = await params, path = `/documents/${category}/${slug}/${intent}`
 const entry = approvedPublication(path)
 return { title: entry?.publication.title ?? "Document variation — Review pending", description: entry?.publication.description ?? "This document variation is awaiting review.", robots: { index: !!entry, follow: true }, alternates: { canonical: `https://www.legallawdocs.com${path}` } }
}
export default async function IntentPage({ params }: Props) {
 const { category, slug, intent } = await params
 let resolved; try { resolved = resolveDocument(category, slug, intent) } catch { notFound() }
 return <PublicationPage path={`${resolved.path}/${intent}`} title={`${resolved.doc.title}: ${intent.replaceAll("-", " ")}`} generatePath={`${resolved.path}/generate?intent=${encodeURIComponent(intent)}`} />
}
