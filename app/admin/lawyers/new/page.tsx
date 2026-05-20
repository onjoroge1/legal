import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import LawyerForm from "../lawyer-form"

export default function NewLawyerPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/lawyers"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Lawyers
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Add Lawyer Listing</h1>
      </div>
      <LawyerForm />
    </div>
  )
}
