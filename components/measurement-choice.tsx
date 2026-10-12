"use client"
import { useEffect, useState } from "react"
export function MeasurementChoice() {
 const [enabled, setEnabled] = useState(false), [consented, setConsented] = useState(false), [busy, setBusy] = useState(false), [status, setStatus] = useState("")
 useEffect(() => { let active = true; void fetch("/api/measurement", { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(data => { if (active && data) { setEnabled(data.enabled); setConsented(data.consented) } }).catch(() => {}); return () => { active = false } }, [])
 async function choose(consent: boolean) {
  setBusy(true); setStatus("")
  let source = "direct"
  try { if (document.referrer) { const host = new URL(document.referrer).hostname; source = host === window.location.hostname ? "direct" : /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com)$/.test(host) ? "search" : "referral" } } catch {}
  try { const response = await fetch("/api/measurement", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ consent, source }) }); if (!response.ok) throw Error(); const data = await response.json(); setConsented(data.consented); setStatus(data.consented ? "Optional measurement enabled." : "Optional measurement disabled and this browser journey removed.") } catch { setStatus("Preference could not be saved. Please try again.") } finally { setBusy(false) }
 }
 if (!enabled && !consented) return null
 return <aside className="border-t px-4 py-5 text-sm space-y-3" aria-label="Optional measurement"><p>Help us improve the drafting flow? Optional first-party measurement counts this browser journey for up to 30 days. We do not collect document text, email, full referrers or search queries. No advertising trackers. You can withdraw here.</p><div className="flex gap-5"><button className="underline" disabled={busy || consented} onClick={() => void choose(true)}>Allow optional measurement</button><button className="underline" disabled={busy} onClick={() => void choose(false)}>{consented ? "Withdraw and delete journey" : "Keep measurement off"}</button></div><p role="status">{status}</p></aside>
}
