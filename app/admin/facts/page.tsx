"use client"

/**
 * Verified Facts review queue — admin UI for Workstream D Phase D0.
 *
 * Three tabs: Pending / Approved / Rejected. Top bar has a manual "Run
 * California Lease Ingest" button that POSTs to /api/admin/facts/ingest and
 * shows a toast with the result. Each pending row has Approve and Reject
 * actions; Reject opens a small dialog for a one-line reason.
 *
 * Mirrors the visual pattern of /app/admin/lawyers/lawyers-table.tsx.
 */

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Check, ExternalLink, Loader2, RefreshCw, RotateCcw, X } from "lucide-react"
import { toast } from "@/lib/safe-toast"

type Status = "pending" | "approved" | "rejected"

interface VerifiedFact {
  id: string
  jurisdiction: string
  jurisdictionType: string
  documentSlug: string
  factType: string
  content: string
  citation: string | null
  source: string
  sourceUrl: string
  status: Status
  rejectionReason: string | null
  reviewedAt: string | null
  createdAt: string
  reviewer?: { email: string } | null
}

interface ListResponse {
  facts: VerifiedFact[]
  counts: Record<string, number>
}

export default function FactsReviewPage() {
  const [status, setStatus] = useState<Status>("pending")
  const [data, setData] = useState<ListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isIngesting, setIsIngesting] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [actingOnId, setActingOnId] = useState<string | null>(null)
  const [rejectTarget, setRejectTarget] = useState<VerifiedFact | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const fetchFacts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/facts?status=${status}`, { cache: "no-store" })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = (await res.json()) as ListResponse
      setData(json)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load facts")
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchFacts()
  }, [fetchFacts])

  /**
   * Populate the IngestSchedule table from the static registry
   * (top 5 docs × 50 states = 250 entries). Idempotent: existing rows are
   * updated, cursors preserved. Only needed once after deploy — the cron
   * job auto-seeds on its first run anyway.
   */
  const seedSchedule = useCallback(async () => {
    setIsSeeding(true)
    try {
      const res = await fetch("/api/admin/schedule/seed", { method: "POST" })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || `HTTP ${res.status}`)
      }
      const result = await res.json()
      toast.success(
        `Schedule seeded: ${result.inserted} new entries, ${result.updated} updated`
      )
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : "Seed failed")
    } finally {
      setIsSeeding(false)
    }
  }, [])

  const runIngest = useCallback(async () => {
    setIsIngesting(true)
    try {
      const res = await fetch("/api/admin/facts/ingest", { method: "POST" })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || `HTTP ${res.status}`)
      }
      const result = await res.json()
      toast.success(
        `Fetched ${result.fetched} fact${result.fetched === 1 ? "" : "s"} from OpenStates — ${result.newlyPending} new, ${result.alreadyKnown} already known`
      )
      // Reload the pending tab to show the new rows
      setStatus("pending")
      fetchFacts()
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : "Ingest failed")
    } finally {
      setIsIngesting(false)
    }
  }, [fetchFacts])

  const approve = useCallback(
    async (id: string) => {
      setActingOnId(id)
      try {
        const res = await fetch(`/api/admin/facts/${id}/approve`, { method: "POST" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        toast.success("Approved")
        fetchFacts()
      } catch (err) {
        console.error(err)
        toast.error("Approve failed")
      } finally {
        setActingOnId(null)
      }
    },
    [fetchFacts]
  )

  /**
   * Flip a fact back to "pending" — used when an admin wants to undo their
   * own approval (or rejection) and have the fact reviewed again. Works on
   * approved + rejected rows.
   */
  const revert = useCallback(
    async (id: string) => {
      setActingOnId(id)
      try {
        const res = await fetch(`/api/admin/facts/${id}/revert`, { method: "POST" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        toast.success("Moved back to pending")
        fetchFacts()
      } catch (err) {
        console.error(err)
        toast.error("Revert failed")
      } finally {
        setActingOnId(null)
      }
    },
    [fetchFacts]
  )

  const confirmReject = useCallback(async () => {
    if (!rejectTarget) return
    setActingOnId(rejectTarget.id)
    try {
      const res = await fetch(`/api/admin/facts/${rejectTarget.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      toast.success("Rejected")
      setRejectTarget(null)
      setRejectReason("")
      fetchFacts()
    } catch (err) {
      console.error(err)
      toast.error("Reject failed")
    } finally {
      setActingOnId(null)
    }
  }, [rejectTarget, rejectReason, fetchFacts])

  const counts = data?.counts ?? {}
  const tabs: Array<{ key: Status; label: string }> = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ]

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Verified Facts Review</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            External legal facts pulled from authoritative sources (OpenStates, etc.). Approve
            each one to make it eligible for injection into the AI prompt context. The AI never
            cites a fact that hasn&apos;t been approved here.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={seedSchedule} disabled={isSeeding} variant="outline">
            {isSeeding ? (
              <>
                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                Seeding…
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1.5" />
                Seed Schedule (250 entries)
              </>
            )}
          </Button>
          <Button onClick={runIngest} disabled={isIngesting}>
            {isIngesting ? (
              <>
                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                Ingesting…
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1.5" />
                Run CA Lease Ingest
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-4">
        {tabs.map((t) => {
          const isActive = status === t.key
          const count = counts[t.key] ?? 0
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setStatus(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              <span
                className={`ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs ${
                  isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Loading…
        </div>
      ) : !data?.facts.length ? (
        <div className="text-center py-16 text-sm text-muted-foreground">
          {status === "pending"
            ? "No pending facts. Click “Run California Lease Ingest” above to pull from OpenStates."
            : `No ${status} facts.`}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Jurisdiction</TableHead>
              <TableHead className="w-[120px]">Citation</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="w-[120px]">Source</TableHead>
              <TableHead className="w-[180px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.facts.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="text-sm">
                  <div className="font-medium capitalize">{f.jurisdiction}</div>
                  <div className="text-xs text-muted-foreground">{f.documentSlug}</div>
                </TableCell>
                <TableCell>
                  {f.citation ? (
                    <Badge variant="outline" className="font-mono text-xs">
                      {f.citation}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm leading-relaxed">{f.content}</TableCell>
                <TableCell>
                  <Link
                    href={f.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    {f.source}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  {/* Each tab shows the actions appropriate to that lifecycle stage:
                      pending  → Approve  + Reject
                      approved → Reject  + Revert (to pending)
                      rejected → Revert (to pending) */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex gap-2 justify-end">
                      {status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => approve(f.id)}
                            disabled={actingOnId === f.id}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setRejectTarget(f)
                              setRejectReason("")
                            }}
                            disabled={actingOnId === f.id}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {status === "approved" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setRejectTarget(f)
                              setRejectReason("")
                            }}
                            disabled={actingOnId === f.id}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => revert(f.id)}
                            disabled={actingOnId === f.id}
                            title="Move back to pending for re-review"
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Revert
                          </Button>
                        </>
                      )}
                      {status === "rejected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => revert(f.id)}
                          disabled={actingOnId === f.id}
                          title="Move back to pending for re-review"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Revert to Pending
                        </Button>
                      )}
                    </div>
                    {/* Audit footer — who reviewed + when + (for rejects) why */}
                    {status !== "pending" && (
                      <div className="text-xs text-muted-foreground text-right max-w-[200px]">
                        {f.reviewer?.email && (
                          <div>by {f.reviewer.email.split("@")[0]}</div>
                        )}
                        {status === "rejected" && f.rejectionReason && (
                          <div className="italic truncate" title={f.rejectionReason}>
                            “{f.rejectionReason}”
                          </div>
                        )}
                        {f.reviewedAt && (
                          <div>{new Date(f.reviewedAt).toLocaleDateString()}</div>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Reject reason dialog */}
      <AlertDialog open={rejectTarget !== null} onOpenChange={(open) => !open && setRejectTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject this fact?</AlertDialogTitle>
            <AlertDialogDescription>
              The fact will never be injected into the AI prompt. Add a short reason so future
              reviewers know why.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g. Repealed by SB 567 (2024) — citation is no longer current"
            rows={3}
            maxLength={500}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReject}>Reject</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
