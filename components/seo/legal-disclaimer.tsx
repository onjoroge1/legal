import { Scale } from "lucide-react"

interface LegalDisclaimerProps {
  className?: string
  compact?: boolean
}

export function LegalDisclaimer({ className = "", compact = false }: LegalDisclaimerProps) {
  if (compact) {
    return (
      <p className={`text-xs text-muted-foreground/70 leading-relaxed ${className}`}>
        <strong className="font-medium">Not legal advice.</strong> LegalLawDocs.com provides self-help legal documents
        and general information. This is not a substitute for advice from a licensed attorney.
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
          <strong className="font-semibold text-muted-foreground">Disclaimer:</strong> LegalLawDocs.com provides
          self-help legal documents for informational purposes only. The documents and information on this site do not
          constitute legal advice and are not a substitute for consultation with a licensed attorney. Laws vary by state
          and change frequently — review your document with a qualified professional before relying on it.
        </p>
      </div>
    </div>
  )
}
