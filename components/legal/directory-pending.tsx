import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export function DirectoryPending() { return <><Header /><main className="mx-auto max-w-3xl space-y-5 px-4 py-16"><h1 className="text-3xl font-bold">Directory review pending</h1><p>The directory is not part of the supported launch collection. Profile consent, credentials and advertising disclosures require review before publication.</p><Link className="underline" href="/contact">Contact product support</Link></main><Footer /></> }
