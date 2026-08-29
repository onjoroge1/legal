import { Scale } from "lucide-react"
import { LEGAL_DISCLAIMER_PRIMARY_COPY } from "@/lib/legal-disclaimer"

interface LegalDisclaimerProps {
  className?: string
  compact?: boolean
}

export function LegalDisclaimer({ className = "", compact = false }: LegalDisclaimerProps) {
  if (compact) {
    return (
      <p className={`text-xs text-muted-foreground/70 leading-relaxed ${className}`}>
        <strong className="font-medium">Required notice.</strong>{" "}
        {LEGAL_DISCLAIMER_PRIMARY_COPY}
      </p>
    )
  }

  return (
    <div
      className={`rounded-xl border border-border/40 bg-muted/30 px-5 py-4 ${className}`}
      role="note"
      aria-label="Legal disclaimer"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" />
        <p className="text-xs leading-relaxed text-muted-foreground/80">
          <strong className="font-semibold text-muted-foreground">Disclaimer:</strong>{" "}
          {LEGAL_DISCLAIMER_PRIMARY_COPY}
        </p>
      </div>
    </div>
  )
}
