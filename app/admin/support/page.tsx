"use client"
import { useEffect, useState } from "react"
import type { FormEvent } from "react"
type Ticket = { id: string; topic: string; message: string; createdAt: string }
export default function SupportInbox() {
 const [tickets, setTickets] = useState<Ticket[]>([]), [error, setError] = useState(""), [busy, setBusy] = useState(false)
 async function refresh() { try { const response = await fetch("/api/admin/support", { cache: "no-store" }); if (!response.ok) throw Error(); setTickets(await response.json()); setError("") } catch { setError("Support inbox unavailable. Try refreshing.") } }
 useEffect(() => { void refresh() }, [])
 async function reply(event: FormEvent<HTMLFormElement>, id: string) {
  event.preventDefault(); const form = event.currentTarget; setBusy(true)
  try { const response = await fetch("/api/admin/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, response: new FormData(form).get("response") }) }); if (!response.ok) throw Error(); await refresh() } catch { setError("Reply not saved. Refresh the inbox and try again.") } finally { setBusy(false) }
 }
 return <section className="p-8 space-y-6"><h1 className="text-2xl font-bold">Support inbox</h1><p>Oldest 50 open requests. Replies appear to the ticket holder on the Contact page. Verify ownership through approved recovery before changing accounts or payments. Do not provide legal advice.</p><button className="underline" onClick={() => void refresh()}>Refresh inbox</button><p role="status">{error}</p>{tickets.length === 0 && <p>No open requests loaded.</p>}{tickets.map(t => <form className="rounded border p-5 space-y-3" key={t.id} onSubmit={e => reply(e, t.id)}><h2>{t.topic} — {t.createdAt}</h2><p className="whitespace-pre-wrap">{t.message}</p><label className="block" htmlFor={`reply-${t.id}`}>Reply</label><textarea className="w-full rounded border bg-background p-3" id={`reply-${t.id}`} name="response" required minLength={10} maxLength={2000} /><button className="rounded bg-primary p-3 text-primary-foreground" disabled={busy}>Save reply for customer</button></form>)}</section>
}
