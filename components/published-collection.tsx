import Link from "next/link"
import { publishedContent } from "@/lib/publication-policy"
export function PublishedCollection({ kind = "document", category, query = "" }: { kind?: "document" | "article"; category?: string; query?: string }) {
 const entries = publishedContent().filter(e => e.publication.kind === kind && (!category || e.publication.path.startsWith(`/documents/${category}/`)) && `${e.publication.title} ${e.publication.description} ${e.publication.jurisdiction}`.toLowerCase().includes(query.toLowerCase()))
 return <section className="space-y-5" aria-label="Reviewed collection">
  {entries.length === 0 ? <div className="rounded-xl border p-6 space-y-3"><h2 className="text-xl font-semibold">{query ? "No matching reviewed pages" : "This collection is awaiting review"}</h2><p>Only currently reviewed scopes appear here. Archived templates and guides are not advertised as launch-ready.</p><Link className="underline" href="/review-status">View review status and corrections</Link></div> : <ul className="grid gap-5 sm:grid-cols-2">{entries.map(({ publication: p, reviewer, reviewedAt }) => <li className="rounded-xl border p-5 space-y-3" key={p.path}><h2 className="text-xl font-semibold"><Link className="underline" href={p.path}>{p.title}</Link></h2><p>{p.description}</p><p className="text-sm text-muted-foreground">Scope: {p.jurisdiction}. Reviewed {reviewedAt} by {reviewer}.</p></li>)}</ul>}
 </section>
}
