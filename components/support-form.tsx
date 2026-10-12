"use client"
import { useState } from "react"
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
type Ticket = { id: string; status: string; message: string; response: string | null; expiresAt: string }
export function SupportForm() {
 const [topic, setTopic] = useState("account"), [message, setMessage] = useState("")
 const [id, setId] = useState(""), [code, setCode] = useState("")
 const [busy, setBusy] = useState(false), [notice, setNotice] = useState(""), [ticket, setTicket] = useState<Ticket | null>(null)
 async function send(event: FormEvent, lookup = false) {
  event.preventDefault(); setBusy(true); setNotice(""); setTicket(null)
  try {
   const response = await fetch(lookup ? "/api/support/status" : "/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lookup ? { id, code } : { topic, message }) })
   const data = await response.json()
   if (!response.ok) throw new Error(response.status === 404 ? "The ticket or access code is incorrect, or the ticket has expired." : response.status === 429 ? "Too many requests. Please try again later." : "Support is temporarily unavailable. Your request was not confirmed. Please try again.")
   if (lookup) { setTicket(data); setNotice("Ticket loaded.") }
   else { setId(data.id); setCode(data.code); setMessage(""); setNotice(`Request saved. Save the ticket ID and private access code below now. Return here to read replies before ${new Date(data.expiresAt).toLocaleDateString()}. No email notification is sent.`) }
  } catch (error) { setNotice(error instanceof Error ? error.message : "Request failed. Please try again.") } finally { setBusy(false) }
 }
 return <div className="space-y-10">
  <form onSubmit={event => send(event)} className="space-y-4">
   <h2 className="text-xl font-semibold">Open a support ticket</h2>
   <p>Describe a product issue, charge, privacy request or content correction. Do not include document text, payment card details, passwords or confidential legal facts. Requests and replies expire after 30 days and are removed by daily cleanup; backups follow the privacy retention process.</p>
   <label className="block" htmlFor="support-topic">Topic</label><select className="w-full rounded border bg-background p-3" id="support-topic" value={topic} onChange={e => setTopic(e.target.value)}>{["account", "billing", "delivery", "privacy", "correction", "other"].map(t => <option key={t}>{t}</option>)}</select>
   <label className="block" htmlFor="support-message">Message</label><textarea className="w-full rounded border bg-background p-3" id="support-message" required minLength={10} maxLength={2000} rows={5} value={message} onChange={e => setMessage(e.target.value)} />
   <Button disabled={busy || message.trim().length < 10} type="submit">{busy ? "Please wait…" : "Submit request"}</Button>
  </form>
  <p role="status" className="font-medium whitespace-pre-wrap">{notice}</p>
  <form onSubmit={event => send(event, true)} className="space-y-4">
   <h2 className="text-xl font-semibold">Read a response</h2><p>Keep the access code private. Anyone with this ID and code can read the ticket. We do not save the code in your browser.</p>
   <label className="block" htmlFor="support-id">Ticket ID</label><input className="w-full rounded border bg-background p-3" id="support-id" required value={id} onChange={e => setId(e.target.value)} autoComplete="off" />
   <label className="block" htmlFor="support-code">Private access code</label><input className="w-full rounded border bg-background p-3 font-mono" id="support-code" required value={code} onChange={e => setCode(e.target.value)} autoComplete="off" spellCheck={false} />
   <Button disabled={busy || !id || !code} type="submit">Check for a response</Button>
  </form>
  {ticket && <section className="rounded border p-5 space-y-3" aria-label="Support response"><h2 className="font-semibold">Status: {ticket.status}</h2><p className="whitespace-pre-wrap">Your request: {ticket.message}</p><p className="whitespace-pre-wrap">{ticket.response ?? "No reply yet. Please check again later. Response times vary; this service is not suitable for urgent legal deadlines."}</p></section>}
 </div>
}
