"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
const messages: Record<string, string> = {
  RECOVERY_LINK_EXPIRED_OR_USED: "This link has expired or was already used. Request another below.",
  PURCHASE_NOT_RECOVERABLE: "This purchase cannot be recovered with this link. Sign in if you already attached it to your account, or contact support.",
  SIGN_IN_WITH_RECEIPT_EMAIL: "Sign in with the same email address used for this purchase.",
  REQUEST_LIMIT_REACHED: "Too many attempts. Please try again later.",
}
async function post(path: string, body: unknown) {
  const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
  const data = await response.json()
  if (!response.ok) throw new Error(messages[data.error] ?? data.error ?? "Please try again later.")
  return data
}
export default function RecoverPurchase() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [orderId, setOrderId] = useState(""); const [email, setEmail] = useState("")
  const [name, setName] = useState(""); const [password, setPassword] = useState("")
  const [createAccount, setCreateAccount] = useState(false)
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState("")
  useEffect(() => {
    const value = new URLSearchParams(window.location.hash.slice(1)).get("token") ?? ""
    if (/^[a-f0-9]{64}$/.test(value)) setToken(value)
    // No token in browser storage, query strings, analytics URLs or subsequent history entries.
    window.history.replaceState(null, "", window.location.pathname)
  }, [])
  async function act(run: () => Promise<void>) { setBusy(true); setError(""); setMessage(""); try { await run() } catch (e) { setError(e instanceof Error ? e.message : "Please try again later.") } finally { setBusy(false); setPassword("") } }
  async function redeem(mode: "guest" | "account") { const data = await post("/api/purchases/claim", { token, mode }); router.push(data.path) }
  return <main className="mx-auto max-w-xl space-y-6 px-4 py-12">
    <h1 className="text-3xl font-bold">Recover your purchase</h1>
    <p>Open the exact document you purchased, or add it to your account. No account was created automatically when you checked out as a guest.</p>
    {error ? <p role="alert" className="rounded border border-destructive p-3">{error}</p> : null}
    {message ? <p role="status" className="rounded border p-3">{message}</p> : null}
    {token ? <section className="space-y-4 rounded border p-5">
      <h2 className="text-xl font-semibold">Your recovery link is ready</h2>
      <Button disabled={busy} onClick={() => act(() => redeem("guest"))}>Open document in this browser</Button>
      <p className="text-sm">Browser access lasts seven days. This consumes the link. To add the document to an account later, request another link.</p>
      <h2 className="text-xl font-semibold">Or keep it in your account</h2>
      <form className="space-y-3" onSubmit={e => { e.preventDefault(); void act(async () => {
        if (createAccount) await post("/api/auth/signup", { name, email, password })
        const result = await signIn("credentials", { email, password, redirect: false })
        if (result?.error || !result?.ok) throw new Error("Sign-in failed. Check your email and password.")
        await redeem("account")
      }) }}>
        <label className="block"><input type="checkbox" checked={createAccount} onChange={e => setCreateAccount(e.target.checked)} /> Create a new account</label>
        {createAccount ? <label className="block">Name<input className="block w-full rounded border p-2" autoComplete="name" required maxLength={200} value={name} onChange={e => setName(e.target.value)} /></label> : null}
        <label className="block">Receipt email<input className="block w-full rounded border p-2" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="block">Password<input className="block w-full rounded border p-2" type="password" autoComplete={createAccount ? "new-password" : "current-password"} required minLength={8} maxLength={200} value={password} onChange={e => setPassword(e.target.value)} /></label>
        <Button disabled={busy} type="submit">{createAccount ? "Create account and add document" : "Sign in and add document"}</Button>
      </form>
      <p className="text-sm">Already signed in with your receipt email? <button className="underline" disabled={busy} onClick={() => act(() => redeem("account"))}>Add to my current account</button></p>
    </section> : null}
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Request a new link</h2>
      <p>Use the order ID on your receipt or purchase page and the email entered at checkout.</p>
      <form className="space-y-3" onSubmit={e => { e.preventDefault(); void act(async () => { const data = await post("/api/purchases/recover", { orderId, email }); setMessage(data.message) }) }}>
        <label className="block">Order ID<input className="block w-full rounded border p-2" required maxLength={36} value={orderId} onChange={e => setOrderId(e.target.value.trim())} /></label>
        <label className="block">Purchase email<input className="block w-full rounded border p-2" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
        <Button disabled={busy} type="submit">Email a recovery link</Button>
      </form>
    </section>
    <p className="text-sm">After an account claim, sign in to access your document. Refunded or disputed purchases may not be eligible. <Link href="/contact" className="underline">Contact support</Link>.</p>
  </main>
}
