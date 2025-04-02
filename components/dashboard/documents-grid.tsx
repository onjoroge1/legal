"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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

export default function DocumentsGrid() {
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
    {
      id: "8",
      title: "Terms of Service",
      type: "Website",
      status: "Completed",
      statusIcon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      date: "Modified 1 month ago",
      collaborators: 0,
    },
  ]

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
    <div>
      {selectedDocuments.length > 0 && (
        <div className="bg-primary/5 px-4 py-2 mb-4 rounded-md border flex items-center justify-between">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {documents.map((document) => (
          <Card key={document.id} className={`overflow-hidden ${isSelected(document.id) ? "ring-2 ring-primary" : ""}`}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={isSelected(document.id)}
                    onCheckedChange={() => toggleSelectDocument(document.id)}
                    aria-label={`Select ${document.title}`}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>
                <div className="flex items-start justify-between p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        <Link href={`/dashboard/documents/${document.id}`} className="hover:underline">
                          {document.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{document.type}</span>
                        <span>•</span>
                        <span>{document.date}</span>
                      </div>
                      {document.sharedBy && (
                        <div className="text-sm text-muted-foreground mt-1">Shared by {document.sharedBy}</div>
                      )}
                    </div>
                  </div>
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
                </div>
              </div>
              <div className="border-t bg-muted/50 p-3 flex justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Badge variant="outline" className={getStatusBadgeVariant(document.status)}>
                    <span className="flex items-center gap-1">
                      {document.statusIcon}
                      {document.status}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {document.collaborators > 0 && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{document.collaborators}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

