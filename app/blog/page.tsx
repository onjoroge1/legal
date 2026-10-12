import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PublishedCollection } from "@/components/published-collection"
import { pageMetadata } from "@/lib/site-metadata"
export const dynamic = "force-dynamic"
export const metadata = pageMetadata("/blog", { title: "Reviewed guides", description: "Guides with recorded sources, jurisdiction and current publication review." })
export default function Blog() { return <><Header /><main className="mx-auto max-w-5xl px-4 py-16 space-y-7"><h1 className="text-3xl font-bold">Reviewed guides</h1><p>Only guides with current review evidence are included. Older legal guidance remains withheld pending review.</p><PublishedCollection kind="article" /></main><Footer /></> }
