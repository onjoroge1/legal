import Link from "next/link"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")
  const query = await searchParams; const page = Math.max(1, Math.min(10000, Number(query.page) || 1)); const search = (query.search ?? "").slice(0,100)
  const versions = await prisma.documentVersion.findMany({ where: { OR: [{ claimedOwnerId: session.user.id }, { claimedOwnerId: null, draft: { ownerId: session.user.id } }], title: { contains: search, mode: "insensitive" } }, include: { draft: true }, orderBy: { createdAt: "desc" }, skip: (Math.floor(page)-1)*20, take: 21 })
  const drafts = page === 1 ? await prisma.documentDraft.findMany({ where: { ownerId: session.user.id, versions: { none: {} } }, orderBy: { createdAt: "desc" }, take: 20 }) : []
  const legacy = page === 1 ? await prisma.userDocument.findMany({ where: { userId: session.user.id, deletedAt: null }, orderBy: { createdAt: "desc" }, take: 20, select: { id: true, title: true, metadata: true } }) : []
  return <main className="space-y-6 p-8"><h1 className="text-3xl font-bold">My documents</h1><Link className="underline" href="/dashboard/create">Create a document</Link>
    <form><label>Search saved versions<input name="search" defaultValue={search} maxLength={100} className="mx-2 rounded border p-2" /></label><button className="underline">Search</button></form>
    {!versions.length && !drafts.length ? <p>No saved versions yet. Start a document or save your inputs to continue later.</p> : null}
    <ul className="space-y-4">{drafts.map(d => <li key={d.id}><Link className="underline" href={`/documents/${d.category}/${d.sourceSlug}/generate?draft=${d.id}`}>Continue saved inputs: {d.canonicalSlug}</Link></li>)}
    {versions.slice(0,20).map(v => <li className="rounded border p-4" key={v.id}><h2 className="font-semibold">{v.title}</h2><p>Saved {v.createdAt.toISOString().slice(0,10)}</p><div className="flex gap-4"><Link className="underline" href={`/documents/${v.draft.category}/${v.draft.sourceSlug}/preview?version=${v.id}`}>Open</Link><Link className="underline" href={`/documents/${v.draft.category}/${v.draft.sourceSlug}/generate?version=${v.id}`}>Revise as a new version</Link><Link className="underline" href={`/documents/${v.draft.category}/${v.draft.sourceSlug}/download?version=${v.id}`}>Download</Link></div></li>)}</ul>
    <nav className="flex gap-4">{page > 1 ? <Link href={`?page=${page-1}&search=${encodeURIComponent(search)}`}>Previous</Link> : null}{versions.length > 20 ? <Link href={`?page=${page+1}&search=${encodeURIComponent(search)}`}>Next</Link> : null}</nav>
    {legacy.length ? <details><summary>Earlier documents and purchase records</summary><ul>{legacy.map(d => <li key={d.id}><Link className="underline" href={`/dashboard/documents/${d.id}`}>{d.title}</Link></li>)}</ul></details> : null}
  </main>
}
