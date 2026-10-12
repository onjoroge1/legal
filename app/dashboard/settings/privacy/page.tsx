"use client"
import { useState } from "react"
import Link from "next/link"
export default function PrivacySettings(){
 const[password,setPassword]=useState("");const[confirmation,setConfirmation]=useState("");const[busy,setBusy]=useState(false);const[message,setMessage]=useState("")
 async function submit(action:"export"|"delete"){
  setBusy(true);setMessage("")
  try{const r=await fetch("/api/settings/privacy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,password,...(action==="delete"?{confirmation}:{})})});if(!r.ok){const d=await r.json();throw Error(d.error??"Please try again")}
   if(action==="export"){const url=URL.createObjectURL(await r.blob());const a=document.createElement("a");a.href=url;a.download="account-export.json";a.click();URL.revokeObjectURL(url);setMessage("Export downloaded. Keep this file private.")}
   else{localStorage.clear();sessionStorage.clear();const d=await r.json();setMessage(`${d.message} Reference: ${d.id}`)}
  }catch(e){setMessage(e instanceof Error?e.message:"Please try again")}finally{setPassword("");setBusy(false)}
 }
 return <main className="max-w-2xl space-y-5 p-8"><h1 className="text-3xl font-bold">Your data</h1><p>Export your data before requesting deletion. Deletion freezes your account and signs out all sessions. Active billing, shared records and signed evidence must be resolved first.</p><p>Local erasure waits at least 24 hours and an approved retention policy. Provider records, backups and required payment evidence have separate review and retention steps. Contact support with your request reference for progress.</p><label className="block">Current password<input className="block rounded border p-2" type="password" autoComplete="current-password" maxLength={200} value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="rounded border p-2" disabled={busy||!password} onClick={()=>submit("export")}>Download my data</button><label className="block">Type DELETE MY ACCOUNT to confirm<input className="block rounded border p-2" value={confirmation} onChange={e=>setConfirmation(e.target.value)}/></label><button className="rounded border p-2" disabled={busy||!password||confirmation!=="DELETE MY ACCOUNT"} onClick={()=>submit("delete")}>Request account deletion</button>{message?<p role="status">{message}</p>:null}<p><Link href="/contact" className="underline">Contact support</Link> · <Link href="/privacy" className="underline">Privacy information</Link></p></main>
}
