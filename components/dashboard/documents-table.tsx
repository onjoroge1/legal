"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Pen,
  Download,
  Share2,
  Trash2,
  Copy,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Document {
  id: string
  title: string
  type: string
  status: string
  statusIcon: React.ReactNode
  date: string
  collaborators: number
  sharedBy?: string
}

export default function DocumentsTable() {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const documents: Document[] = [
    {
      id: "1",
      title: "Service Agreement",
      type: "Agreement",
      status: "Draft",
      statusIcon: <Clock className="h-4 w-4 text-amber-500" />,
      date: "Modified 2 days ago",
      collaborators: 3,
    },
    {
      id: "2",
      title: "Non-Disclosure Agreement",
      type: "Contract",
      status: "Completed",
      statusIcon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      date: "Modified 5 days ago",
      collaborators: 0,
    },
    {
      id: "3",
      title: "Employment Contract",
      type: "Contract",
      status: "Needs Review",
      statusIcon: <AlertCircle className="h-4 w-4 text-red-500" />,
      date: "Modified 1 week ago",
      collaborators: 2,
    },
    {
      id: "4",
      title: "Partnership Agreement",
      type: "Agreement",
      status: "Needs Signature",
      statusIcon: <Pen className="h-4 w-4 text-blue-500" />,
      date: "Shared 1 week ago",
      collaborators: 4,
      sharedBy: "Sarah Johnson",
    },
    {
      id: "5",
      title: "Consulting Contract",
      type: "Contract",
      status: "Completed",
      statusIcon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      date: "Shared 2 weeks ago",
      collaborators: 2,
      sharedBy: "Michael Brown",
    },
    {
      id: "6",
      title: "LLC Operating Agreement",
      type: "Business",
      status: "Draft",
      statusIcon: <Clock className="h-4 w-4 text-amber-500" />,
      date: "Created 3 weeks ago",
      collaborators: 1,
    },
    {
      id: "7",
      title: "Privacy Policy",
      type: "Website",
      status: "Completed",
      statusIcon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      date: "Modified 1 month ago",
      collaborators: 0,
    },
  ]

  const toggleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(documents.map((doc) => doc.id))
    }
  }

  const toggleSelectDocument = (id: string) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter((docId) => docId !== id))
    } else {
      setSelectedDocuments([...selectedDocuments, id])
    }
  }

  const isSelected = (id: string) => selectedDocuments.includes(id)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "outline bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
      case "Draft":
        return "outline bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
      case "Needs Review":
        return "outline bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
      case "Needs Signature":
        return "outline bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
      default:
        return "outline"
    }
  }

  return (
    <div className="rounded-md border">
      {selectedDocuments.length > 0 && (
        <div className="bg-primary/5 px-4 py-2 border-b flex items-center justify-between">
          <span className="text-sm font-medium">
            {selectedDocuments.length} document{selectedDocuments.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-red-500 hover:text-red-500 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedDocuments.length === documents.length && documents.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all documents"
              />
            </TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Collaborators</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id} className={isSelected(document.id) ? "bg-primary/5" : ""}>
              <TableCell>
                <Checkbox
                  checked={isSelected(document.id)}
                  onCheckedChange={() => toggleSelectDocument(document.id)}
                  aria-label={`Select ${document.title}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      <Link href={`/dashboard/documents/${document.id}`} className="hover:underline">
                        {document.title}
                      </Link>
                    </div>
                    {document.sharedBy && (
                      <div className="text-xs text-muted-foreground">Shared by {document.sharedBy}</div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadgeVariant(document.status)}>
                  <span className="flex items-center gap-1">
                    {document.statusIcon}
                    {document.status}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>{document.date}</TableCell>
              <TableCell>
                {document.collaborators > 0 ? (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{document.collaborators}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/documents/${document.id}`} className="cursor-pointer">
                        View Document
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/documents/${document.id}/collaborate`} className="cursor-pointer">
                        Edit & Collaborate
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/documents/${document.id}/sign`} className="cursor-pointer">
                        Sign Document
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

