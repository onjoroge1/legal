"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import DocumentForm from "./document-form"
import { resolveDocument } from "@/lib/document-resolver"
import { getIntentsForDocument } from "@/lib/intent-registry"
import { getDocumentQuestions, type FormQuestion } from "@/lib/document-questions"
import { getDocumentValidation } from "@/lib/document-validation"
import { LEGAL_DISCLAIMER_PRIMARY_COPY } from "@/lib/legal-disclaimer"

type Fields = Record<string, string | number | boolean | null>
type Saved = { access?: { canDownloadPDF: boolean; canDownloadDOCX: boolean; source: string }; id: string; draftId: string; content: string; title: string; formData: Fields; intent: string | null; category: string; sourceSlug: string; jurisdiction: string | null; review: { issues?: string[]; readyForExport?: boolean } }
async function jsonResponse(response: Response) {
  if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Unexpected server response. Please try again.")
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "Request failed")
  return data
}

export default function DocumentWorkspace({ mode }: { mode: "generate" | "preview" | "checkout" | "download" }) {
  const params = useParams<{ category: string; slug: string }>()
  const router = useRouter(); const query = useSearchParams(); const { data: session } = useSession()
  const category = params.category; const slug = params.slug; const versionId = query.get("version"); const draftId = query.get("draft")
  const resolved = useMemo(() => { try { return resolveDocument(category, slug, query.get("intent")) } catch { return null } }, [category, slug, query])
  const [fields, setFields] = useState<Fields>({})
  const [intent, setIntent] = useState<string>(query.get("intent") ?? "")
  const [saved, setSaved] = useState<Saved | null>(null)
  const [questions, setQuestions] = useState<FormQuestion[]>([])
  const [valid, setValid] = useState(false); const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(!!versionId); const [error, setError] = useState("")
  const legacySlug = resolved?.doc.legacySlug ?? ""; const docSlug = resolved?.doc.slug ?? ""
  const intents = useMemo(() => getIntentsForDocument(legacySlug), [legacySlug])
  const errors = useMemo(() => getDocumentValidation(legacySlug, fields, intent), [legacySlug, fields, intent])
  const path = `/documents/${category}/${slug}`
  const destination = (step: string) => `${path}/${step}${saved ? `?version=${saved.id}` : ""}`

  useEffect(() => {
    const abort = new AbortController()
    setQuestions(getDocumentQuestions(docSlug))
    fetch(`/api/templates/${legacySlug}/questionnaires`, { signal: abort.signal }).then(jsonResponse).then(items => {
      if (!Array.isArray(items)) return
      const match = items.find(q => q.metadata?.intent === intent) ?? items[0]
      if (match?.questions?.length) setQuestions(match.questions)
    }).catch(() => {})
    return () => abort.abort()
  }, [legacySlug, docSlug, intent])

  useEffect(() => {
    if (!versionId && !draftId) {
      setSaved(null); setLoading(false)
      let initial: Fields = {}
      try { const r = resolveDocument(category, slug); initial = { ...(r.state ? { state: r.state.name } : {}), ...(r.city ? { city: r.city.name } : {}), ...(r.country ? { country: r.country.name } : {}) } } catch {}
      setFields(initial)
      return
    }
    const abort = new AbortController(); setLoading(true); setError("")
    fetch(versionId ? `/api/document-versions/${encodeURIComponent(versionId)}` : `/api/document-drafts/${encodeURIComponent(draftId!)}`, { cache: "no-store", signal: abort.signal }).then(jsonResponse).then((data: Saved) => {
      if (data.category !== category || data.sourceSlug !== slug) throw new Error("This saved version belongs to a different document. Open its original link.")
      setSaved(versionId ? data : null); setFields(data.formData); setIntent(data.intent ?? "")
    }).catch(e => { if (!abort.signal.aborted) { setSaved(null); setError(e.message) } }).finally(() => { if (!abort.signal.aborted) setLoading(false) })
    return () => abort.abort()
  }, [versionId, draftId, category, slug])

  const saveInputs = async () => {
    setBusy(true); setError("")
    try {
      const data = await jsonResponse(await fetch("/api/document-drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category, slug, formData: fields, intent: intent || undefined }) }))
      router.push(`${path}/generate?draft=${data.draftId}`)
    } catch (e) { setError(e instanceof Error ? e.message : "Saving failed") } finally { setBusy(false) }
  }
  const generate = async () => {
    if (!valid || busy) return
    setBusy(true); setError("")
    try {
      const data = await jsonResponse(await fetch(`/api/documents/${category}/${slug}/generate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formData: fields, intent: intent || undefined, ...(saved && saved.intent === (intent || null) && saved.jurisdiction === resolveDocument(category, slug, intent || null, fields).jurisdiction ? { draftId: saved.draftId } : {}) }) }))
      if (!data.versionId) throw new Error("The draft was not saved. Please try again.")
      router.push(`${path}/preview?version=${data.versionId}`)
    } catch (e) { setError(e instanceof Error ? e.message : "Generation failed") } finally { setBusy(false) }
  }
  const checkout = async (paymentType: "single" | "subscription") => {
    if (!saved || busy) return
    setBusy(true); setError("")
    try {
      const data = await jsonResponse(await fetch("/api/payment/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ versionId: saved.id, paymentType }) }))
      const target = new URL(data.url)
      if (target.protocol !== "https:" || target.hostname !== "checkout.stripe.com") throw new Error("Invalid checkout destination")
      window.location.assign(target.href)
    } catch (e) { setError(e instanceof Error ? e.message : "Checkout failed") } finally { setBusy(false) }
  }
  const download = async (format: "pdf" | "docx") => {
    if (!saved || busy) return
    setBusy(true); setError("")
    try {
      const response = await fetch("/api/documents/download", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ versionId: saved.id, format }) })
      const expected = format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      if (!response.ok || !response.headers.get("content-type")?.startsWith(expected)) { await jsonResponse(response); throw new Error("Invalid download response") }
      const url = URL.createObjectURL(await response.blob()); const anchor = document.createElement("a")
      anchor.href = url; anchor.download = `${saved.title.replace(/[^a-zA-Z0-9 -]/g, "")}.${format}`; anchor.click(); URL.revokeObjectURL(url)
    } catch (e) { setError(e instanceof Error ? e.message : "Download failed") } finally { setBusy(false) }
  }
  if (!resolved) return <main className="p-8"><h1>Document not found</h1><Link href="/documents">Browse documents</Link></main>
  return <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
    <Link href={path} className="text-primary">← {resolved.doc.title}</Link>
    <h1 className="text-3xl font-bold">{mode === "generate" ? "Create your draft" : mode === "checkout" ? "Purchase this saved document" : mode === "download" ? "Download your saved document" : "Review your draft"}</h1>
    <p className="text-sm text-muted-foreground">{LEGAL_DISCLAIMER_PRIMARY_COPY}</p>
    {error ? <p role="alert" className="rounded border border-destructive p-4 text-destructive">{error}</p> : null}
    {loading ? <p role="status">Loading your saved document…</p> : null}
    {!loading && mode !== "generate" && !saved ? <p>No saved version selected. <Link className="underline" href={`${path}/generate`}>Create a draft</Link>.</p> : null}
    {!loading && mode === "generate" ? <div className="max-w-3xl space-y-6">
      {intents.length ? <label className="block">Document type<select className="mt-2 block w-full rounded border bg-background p-3" value={intent} onChange={e => setIntent(e.target.value)}><option value="">Choose a type</option>{intents.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}</select></label> : null}
      <DocumentForm questions={questions} formData={fields} onChange={data => setFields(current => ({ ...current, ...data }))} onValidate={setValid} externalErrors={errors} />
      <Button variant="outline" disabled={busy} onClick={saveInputs}>Save inputs</Button>
      <Button disabled={!valid || busy || (intents.length > 0 && !intent)} onClick={generate}>{busy ? "Generating and saving…" : "Generate and save draft"}</Button>
    </div> : null}
    {!loading && saved ? <>
      {saved.review?.issues?.length ? <div role="status" className="rounded border border-amber-500 p-4">This draft needs review: {saved.review.issues.join(", ")}. Resolve these before final export.</div> : null}
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline"><Link href={destination("generate")}>Edit inputs and create a new version</Link></Button>
        {mode === "preview" ? <><Button asChild><Link href={destination("checkout")}>Continue to purchase</Link></Button><Button asChild variant="outline"><Link href={destination("download")}>Download</Link></Button></> : null}
        {mode === "checkout" ? session?.user ? <><Button disabled={busy} onClick={() => checkout("single")}>Buy document · ${resolved.doc.price}</Button><Button disabled={busy} variant="outline" onClick={() => checkout("subscription")}>Subscribe · ${resolved.doc.subscriptionPrice}/month</Button></> : <p>Purchases require a signed-in account. Guest account recovery is still being completed. Keep this page open to retain your draft.</p> : null}
        {mode === "download" ? <>{!saved.access?.canDownloadPDF ? <p>Purchase this version or activate a subscription to download. <Link className="underline" href={destination("checkout")}>Continue to purchase</Link></p> : null}<Button disabled={busy || !saved.access?.canDownloadPDF} onClick={() => download("pdf")}>Download PDF</Button><Button disabled={busy || !saved.access?.canDownloadDOCX} variant="outline" onClick={() => download("docx")}>Download Word</Button></> : null}
      </div>
      <section aria-label="Saved document" className="rounded border bg-card p-6"><pre className="whitespace-pre-wrap font-serif leading-relaxed">{saved.content}</pre></section>
      <p className="text-sm text-muted-foreground">This link opens the same saved version. Signed-in drafts are available on your other devices; guest access lasts seven days in this browser.</p>
    </> : null}
  </main>
}
