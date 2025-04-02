"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, X, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export default function DocumentsFilterBar() {
  const [documentType, setDocumentType] = useState<string | null>(null)
  const [documentStatus, setDocumentStatus] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [isFiltering, setIsFiltering] = useState(false)
  const { toast } = useToast()

  const clearFilters = () => {
    setDocumentType(null)
    setDocumentStatus(null)
    setDateRange({ from: undefined, to: undefined })
  }

  const hasActiveFilters = documentType || documentStatus || dateRange.from

  // Apply filters when they change
  useEffect(() => {
    if (hasActiveFilters) {
      const applyFilters = async () => {
        setIsFiltering(true)
        try {
          // Simulate API call to filter documents
          await new Promise((resolve) => setTimeout(resolve, 800))

          toast({
            title: "Filters applied",
            description: "Document list has been filtered according to your criteria.",
          })
        } catch (error) {
          toast({
            title: "Error applying filters",
            description: "There was a problem applying your filters.",
            variant: "destructive",
          })
        } finally {
          setIsFiltering(false)
        }
      }

      applyFilters()
    }
  }, [documentType, documentStatus, dateRange, hasActiveFilters, toast])

  return (
    <div className="flex flex-wrap items-center gap-2 pb-2">
      {isFiltering && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Applying filters...</span>
        </div>
      )}

      <Select value={documentType || ""} onValueChange={(value) => setDocumentType(value || null)}>
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="Document Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="agreement">Agreement</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="website">Website</SelectItem>
        </SelectContent>
      </Select>

      <Select value={documentStatus || ""} onValueChange={(value) => setDocumentStatus(value || null)}>
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="needs-review">Needs Review</SelectItem>
          <SelectItem value="needs-signature">Needs Signature</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <CalendarIcon className="h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              "Date Range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange}
            onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 gap-1">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}

      {documentType && (
        <Badge variant="outline" className="rounded-full">
          Type: {documentType}
          <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0" onClick={() => setDocumentType(null)}>
            <X className="h-3 w-3" />
            <span className="sr-only">Remove type filter</span>
          </Button>
        </Badge>
      )}

      {documentStatus && (
        <Badge variant="outline" className="rounded-full">
          Status: {documentStatus}
          <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0" onClick={() => setDocumentStatus(null)}>
            <X className="h-3 w-3" />
            <span className="sr-only">Remove status filter</span>
          </Button>
        </Badge>
      )}

      {dateRange.from && (
        <Badge variant="outline" className="rounded-full">
          Date: {format(dateRange.from, "LLL dd, y")}
          {dateRange.to && ` - ${format(dateRange.to, "LLL dd, y")}`}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 ml-1 p-0"
            onClick={() => setDateRange({ from: undefined, to: undefined })}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove date filter</span>
          </Button>
        </Badge>
      )}
    </div>
  )
}

