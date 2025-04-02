"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"

// Sample data - in a real app, this would come from your API
const documents = [
  {
    id: "1",
    name: "Non-Disclosure Agreement",
    type: "Legal",
    views: 12543,
    clicks: 8765,
    creations: 3254,
    conversionRate: 25.9,
  },
  {
    id: "2",
    name: "Service Agreement",
    type: "Legal",
    views: 10876,
    clicks: 7654,
    creations: 2987,
    conversionRate: 27.5,
  },
  {
    id: "3",
    name: "LLC Operating Agreement",
    type: "Business",
    views: 9876,
    clicks: 6543,
    creations: 2543,
    conversionRate: 25.8,
  },
  {
    id: "4",
    name: "Employment Contract",
    type: "Employment",
    views: 8765,
    clicks: 5432,
    creations: 1987,
    conversionRate: 22.7,
  },
  {
    id: "5",
    name: "Privacy Policy",
    type: "Website",
    views: 7654,
    clicks: 4321,
    creations: 1654,
    conversionRate: 21.6,
  },
  {
    id: "6",
    name: "Terms of Service",
    type: "Website",
    views: 6543,
    clicks: 3210,
    creations: 1432,
    conversionRate: 21.9,
  },
  {
    id: "7",
    name: "Rental Agreement",
    type: "Real Estate",
    views: 5432,
    clicks: 3210,
    creations: 1234,
    conversionRate: 22.7,
  },
]

type SortKey = "name" | "views" | "clicks" | "creations" | "conversionRate"
type SortDirection = "asc" | "desc"

export default function DocumentsTable() {
  const [sortKey, setSortKey] = useState<SortKey>("views")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  const sortedDocuments = [...documents].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
  })

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")} className="p-0 font-medium">
                Document Name
                <SortIcon column="name" />
              </Button>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("views")} className="p-0 font-medium">
                Views
                <SortIcon column="views" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("clicks")} className="p-0 font-medium">
                Clicks
                <SortIcon column="clicks" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("creations")} className="p-0 font-medium">
                Creations
                <SortIcon column="creations" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("conversionRate")} className="p-0 font-medium">
                Conversion
                <SortIcon column="conversionRate" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{doc.type}</Badge>
              </TableCell>
              <TableCell className="text-right">{doc.views.toLocaleString()}</TableCell>
              <TableCell className="text-right">{doc.clicks.toLocaleString()}</TableCell>
              <TableCell className="text-right">{doc.creations.toLocaleString()}</TableCell>
              <TableCell className="text-right">{doc.conversionRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

