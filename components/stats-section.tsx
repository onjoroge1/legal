import { publishedContent } from "@/lib/publication-policy"
export function StatsSection() { const count = publishedContent().filter(e => e.publication.kind === "document").length; return <section className="border-y p-8 text-center"><p><strong>{count}</strong> document scopes currently reviewed for publication. Individual drafts require separate review before use.</p></section> }
