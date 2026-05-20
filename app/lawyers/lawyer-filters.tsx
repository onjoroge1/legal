"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PRACTICE_AREA_LABELS, US_STATE_OPTIONS } from "@/lib/lawyer-utils"

interface LawyerFiltersProps {
  currentQ: string
  currentPracticeArea: string
  currentState: string
}

export function LawyerFilters({
  currentQ,
  currentPracticeArea,
  currentState,
}: LawyerFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams],
  )

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or firm…"
          defaultValue={currentQ}
          className="pl-9"
          onChange={(e) => {
            const val = e.target.value
            // Debounce: only update after user stops typing
            updateParams({ q: val })
          }}
        />
      </div>

      {/* Practice area */}
      <Select
        defaultValue={currentPracticeArea || "_all"}
        onValueChange={(val) =>
          updateParams({ practiceArea: val === "_all" ? "" : val })
        }
      >
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="Practice Area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">All Practice Areas</SelectItem>
          {Object.entries(PRACTICE_AREA_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* State */}
      <Select
        defaultValue={currentState || "_all"}
        onValueChange={(val) =>
          updateParams({ state: val === "_all" ? "" : val })
        }
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">All States</SelectItem>
          {US_STATE_OPTIONS.map(({ abbr, name }) => (
            <SelectItem key={abbr} value={abbr}>
              {abbr} — {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear filters */}
      {(currentQ || currentPracticeArea || currentState) && (
        <Button
          variant="outline"
          size="sm"
          className="shrink-0"
          onClick={() => router.push(pathname)}
          disabled={isPending}
        >
          Clear
        </Button>
      )}
    </div>
  )
}
