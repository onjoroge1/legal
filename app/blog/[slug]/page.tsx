import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-posts"
import { approvedPublication } from "@/lib/publication-policy"
import { PublicationPage } from "@/components/legal/publication-page"
type Props = { params: Promise<{ slug: string }> }
export const dynamic = "force-dynamic"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const path = `/blog/${(await params).slug}`, entry = approvedPublication(path)
 return { title: entry?.publication.title ?? "Legal guide — Review pending", description: entry?.publication.description ?? "This legal guide is awaiting source and content review.", robots: { index: !!entry, follow: true }, alternates: { canonical: `https://www.legallawdocs.com${path}` } }
}
export default async function BlogPostPage({ params }: Props) {
 const { slug } = await params, post = blogPosts.find(p => p.slug === slug)
 if (!post) notFound()
 return <PublicationPage path={`/blog/${slug}`} title={post.title} />
}
