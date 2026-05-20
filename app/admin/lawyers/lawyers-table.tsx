"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, Search } from "lucide-react"

interface LawyerListing {
  id: string
  slug: string
  name: string
  email: string
  city: string | null
  stateAbbr: string | null
  tier: string
  featured: boolean
  verified: boolean
  active: boolean
  createdAt: Date
}

interface LawyersTableProps {
  lawyers: LawyerListing[]
  currentQ: string
}

export default function LawyersTable({ lawyers, currentQ }: LawyersTableProps) {
  const router = useRouter()
  const [q, setQ] = useState(currentQ)
  const [isPending, startTransition] = useTransition()
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(
    Object.fromEntries(lawyers.map((l) => [l.id, l.active]))
  )

  function handleSearch(value: string) {
    setQ(value)
    startTransition(() => {
      const params = new URLSearchParams()
      if (value) params.set("q", value)
      router.push(`/admin/lawyers${params.toString() ? `?${params}` : ""}`)
    })
  }

  async function toggleActive(id: string) {
    const newValue = !activeStates[id]
    setActiveStates((prev) => ({ ...prev, [id]: newValue }))
    try {
      const res = await fetch(`/api/admin/lawyers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: newValue }),
      })
      if (!res.ok) {
        // Revert on failure
        setActiveStates((prev) => ({ ...prev, [id]: !newValue }))
      }
    } catch {
      setActiveStates((prev) => ({ ...prev, [id]: !newValue }))
    }
  }

  async function deleteLawyer(id: string) {
    const res = await fetch(`/api/admin/lawyers/${id}`, { method: "DELETE" })
    if (res.ok) {
      router.refresh()
    }
  }

  function tierBadgeVariant(tier: string): "default" | "secondary" | "outline" {
    if (tier === "premium") return "default"
    if (tier === "featured") return "secondary"
    return "outline"
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email…"
          value={q}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-center">Verified</TableHead>
              <TableHead className="text-center">Active</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lawyers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10 text-muted-foreground text-sm">
                  No lawyer listings found.
                </TableCell>
              </TableRow>
            ) : (
              lawyers.map((lawyer) => (
                <TableRow key={lawyer.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{lawyer.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{lawyer.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {[lawyer.city, lawyer.stateAbbr].filter(Boolean).join(", ") || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tierBadgeVariant(lawyer.tier)} className="capitalize text-xs">
                      {lawyer.tier}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {lawyer.featured ? (
                      <span className="text-primary font-medium text-sm">Yes</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {lawyer.verified ? (
                      <span className="text-accent font-medium text-sm">Yes</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={activeStates[lawyer.id] ?? lawyer.active}
                      onCheckedChange={() => toggleActive(lawyer.id)}
                      aria-label={`Toggle active for ${lawyer.name}`}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(lawyer.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1.5">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/lawyers/${lawyer.id}/edit`}>
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete <strong>{lawyer.name}</strong>&apos;s listing. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => deleteLawyer(lawyer.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
