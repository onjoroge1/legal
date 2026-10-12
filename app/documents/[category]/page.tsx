import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { PublishedCollection } from "@/components/published-collection"
import { categories } from "@/lib/categories"
import { publishedContent } from "@/lib/publication-policy"
import { pageMetadata } from "@/lib/site-metadata"
export const dynamic = "force-dynamic"
type Props = { params: Promise<{ category: string }> }
export async function generateMetadata({ params }: Props) { const { category } = await params; return pageMetadata(`/documents/${category}`, { title: categories.find(c => c.id === category)?.label ?? "Documents" }, publishedContent().some(e => e.publication.path.startsWith(`/documents/${category}/`))) }
export default async function Category({ params }: Props) {
 const { category } = await params, meta = categories.find(c => c.id === category); if (!meta) notFound()
 return <><Header /><main className="mx-auto max-w-5xl px-4 py-16 space-y-7"><Breadcrumb items={[{label:"Documents",href:"/documents"},{label:meta.label,href:`/documents/${category}`}]} /><h1 className="text-3xl font-bold">{meta.label}</h1><PublishedCollection category={category} /></main><Footer /></>
}
