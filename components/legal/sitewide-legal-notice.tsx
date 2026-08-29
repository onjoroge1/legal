import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { LEGAL_DISCLAIMER_PRIMARY_COPY } from "@/lib/legal-disclaimer"

export function SitewideLegalNotice() {
  return (
    <aside
      className="border-t border-amber-400/30 bg-amber-50/70 px-4 py-4 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100"
      role="note"
      aria-label="Required legal notice"
    >
      <div className="mx-auto flex max-w-7xl items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          <strong>Required notice:</strong> {LEGAL_DISCLAIMER_PRIMARY_COPY}{" "}
          <Link className="font-semibold underline underline-offset-2" href="/disclaimer">
            Read the full disclaimer
          </Link>
          .
        </p>
      </div>
    </aside>
  )
}
