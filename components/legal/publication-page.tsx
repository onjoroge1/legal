import { canonicalUrl, jsonLd } from "@/lib/site-metadata"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { approvedPublication } from "@/lib/publication-policy"

export function PublicationPage({ path, title, generatePath }: { path: string; title: string; generatePath?: string }) {
 const approval = approvedPublication(path)
 return <><Header /><main className="mx-auto max-w-3xl space-y-6 px-4 py-16">
  <Breadcrumb items={[path.startsWith("/blog/") ? { label: "Guides", href: "/blog" } : { label: "Documents", href: "/documents" }, { label: title, href: path }]} />
  <h1 className="text-3xl font-bold">{approval?.publication.title ?? title}</h1>
  {approval ? <>
   {approval.publication.kind === "article" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: approval.publication.title, description: approval.publication.description, author: { "@type": approval.publication.authorType, name: approval.publication.author }, dateModified: approval.publication.modifiedAt, mainEntityOfPage: canonicalUrl(path) }) }} />}
   <p>{approval.publication.description}</p>
   <p className="text-sm text-muted-foreground">By {approval.publication.author}. Reviewed by {approval.reviewer} ({approval.credentials}) on {approval.reviewedAt}. Scope: {approval.publication.jurisdiction}. Review expires {approval.expiresAt}.</p>
   {approval.publication.sections.map(s => <section key={s.heading} className="space-y-3"><h2 className="text-xl font-semibold">{s.heading}</h2><p className="whitespace-pre-wrap">{s.body}</p></section>)}
   <section><h2 className="text-xl font-semibold">Sources</h2><ul className="list-disc pl-5">{approval.publication.sources.map(s => <li key={s.url}><a className="underline" href={s.url}>{s.title}</a> — effective {s.effectiveAt}</li>)}</ul></section>
   {generatePath && <Link className="inline-block rounded bg-primary p-3 text-primary-foreground" href={generatePath}>Start a draft for review</Link>}
  </> : <section className="rounded-xl border p-6 space-y-3"><h2 className="text-xl font-semibold">Review pending</h2><p>This page is not part of our supported launch collection. Its legal guidance is withheld until its sources, jurisdiction and drafting journey have been reviewed.</p><p>Do not rely on older copies of this page. Consult a licensed attorney for advice about your circumstances.</p></section>}
  <p className="text-sm">A page review does not approve your individual document. Generated drafts need separate review before purchase or export.</p>
  <div className="flex gap-5"><Link className="underline" href="/review-status">Review status and corrections</Link><Link className="underline" href="/contact">Report an issue</Link></div>
 </main><Footer /></>
}
