import { pageMetadata } from "@/lib/site-metadata"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SupportForm } from "@/components/support-form"
export const metadata = pageMetadata("/contact", { title: "Contact support — LegalLawDocs", description: "Open a product, billing, privacy or correction ticket and read a support response." })
export default function ContactPage() { return <><Header /><main className="mx-auto max-w-3xl px-4 py-16 space-y-6"><h1 className="text-3xl font-bold">Contact support</h1><p>Support can help with software and existing orders, but cannot provide legal advice. For urgent deadlines, contact a licensed attorney.</p><SupportForm /></main><Footer /></> }
