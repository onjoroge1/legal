import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { PublishedCollection } from "@/components/published-collection"
import { pageMetadata } from "@/lib/site-metadata"
export const dynamic = "force-dynamic"
export const metadata = pageMetadata("/documents", { title: "Reviewed document collection", description: "Browse document scopes with current source, content and drafting-flow review." })
export default async function Documents({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
 const { q } = await searchParams, query = typeof q === "string" ? q.slice(0,100) : ""
 return <><Header /><main className="mx-auto max-w-5xl px-4 py-16 space-y-7"><Breadcrumb items={[{label:"Documents",href:"/documents"}]} /><h1 className="text-3xl font-bold">Reviewed document collection</h1><p>Choose from the current reviewed launch scope. Each saved draft still needs its own review before purchase or export.</p>
 <form action="/documents" className="flex flex-wrap gap-3"><label htmlFor="document-search" className="w-full">Search reviewed documents</label><input className="rounded border bg-background p-3" id="document-search" name="q" type="search" maxLength={100} defaultValue={query} /><button className="rounded bg-primary p-3 text-primary-foreground">Search</button></form><PublishedCollection query={query} /></main><Footer /></>
}
