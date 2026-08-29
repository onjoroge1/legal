"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { AlertTriangle, Loader2, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  LEGAL_DISCLAIMER_PRIMARY_COPY,
  LEGAL_DISCLAIMER_VERSION,
  type LegalDisclaimerAcceptanceStatus,
} from "@/lib/legal-disclaimer"

interface LegalDisclaimerAcceptanceGateProps {
  children: ReactNode
}

export function LegalDisclaimerAcceptanceGate({
  children,
}: LegalDisclaimerAcceptanceGateProps) {
  const [status, setStatus] = useState<"loading" | "required" | "accepted">(
    "loading"
  )
  const [checked, setChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    fetch("/api/legal/disclaimer/accept", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to verify acceptance")
        return (await response.json()) as LegalDisclaimerAcceptanceStatus
      })
      .then((result) => {
        if (active) setStatus(result.accepted ? "accepted" : "required")
      })
      .catch(() => {
        if (active) {
          setError("We could not verify your acceptance. Please try again.")
          setStatus("required")
        }
      })

    return () => {
      active = false
    }
  }, [])

  const accept = async () => {
    if (!checked) return
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/legal/disclaimer/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accepted: true,
          version: LEGAL_DISCLAIMER_VERSION,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.accepted) {
        throw new Error(result.error || "Unable to record acceptance")
      }
      setStatus("accepted")
    } catch (acceptanceError) {
      setError(
        acceptanceError instanceof Error
          ? acceptanceError.message
          : "Unable to record acceptance"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "accepted") return children

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">
            Checking required disclosures…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
        <div className="border-b border-border/50 bg-secondary/30 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">
                Required legal disclosure
              </h1>
              <p className="text-sm text-muted-foreground">
                Please review and accept before continuing.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6 sm:px-8">
          <div className="flex gap-3 rounded-xl border border-amber-400/40 bg-amber-50/60 p-5 dark:bg-amber-950/20">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm font-medium leading-relaxed text-foreground">
              {LEGAL_DISCLAIMER_PRIMARY_COPY}
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/60 p-4">
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => setChecked(value === true)}
              aria-label="Accept the legal disclaimer"
              className="mt-0.5"
            />
            <span className="text-sm leading-relaxed text-muted-foreground">
              I have read and accept this disclosure. I understand that I am
              using a drafting tool and should consult a licensed attorney
              before relying on the output.
            </span>
          </label>

          <p className="text-xs leading-relaxed text-muted-foreground">
            By continuing, you also agree to the{" "}
            <Link className="text-primary underline" href="/terms" target="_blank">
              Terms of Service
            </Link>{" "}
            and acknowledge the{" "}
            <Link
              className="text-primary underline"
              href="/disclaimer"
              target="_blank"
            >
              Legal Disclaimer
            </Link>
            . Disclosure version {LEGAL_DISCLAIMER_VERSION}.
          </p>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            className="w-full"
            size="lg"
            disabled={!checked || isSubmitting}
            onClick={accept}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recording acceptance…
              </>
            ) : (
              "I understand and accept — continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
