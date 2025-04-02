"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, FilePlus, FileText, Clock, CheckCircle2, AlertCircle, Users, Pen } from "lucide-react"
import Link from "next/link"
import DocumentsTable from "@/components/dashboard/documents-table"
import DocumentsGrid from "@/components/dashboard/documents-grid"
import DocumentsFilterBar from "@/components/dashboard/documents-filter-bar"
import DocumentCard from "@/components/dashboard/document-card"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Document {
  id: string
  title: string
  type: string
  description: string | null
  status: string
  content: string
  state: string | null
  createdAt: string
  updatedAt: string
  parties: Array<{
    id: string
    name: string
    type: string
    address: string | null
    email: string | null
  }>
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchDocuments()
  }, [statusFilter, typeFilter, searchQuery, router])

  const fetchDocuments = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (typeFilter !== "all") params.append("type", typeFilter)
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`/api/documents?${params.toString()}`, {
        credentials: "include",
        cache: "no-store",
      })

      if (response.status === 401) {
        // Redirect to login if unauthorized
        router.push("/login")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch documents")
      }

      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error("Error fetching documents:", error)
      toast({
        title: "Error",
        description: "Failed to fetch documents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "completed":
      case "signed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "needs_review":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Documents</h1>
          <p className="text-muted-foreground">Manage and organize all your legal documents</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button asChild>
            <Link href="/dashboard/create" className="gap-1">
              <FilePlus className="h-4 w-4" />
              Create New
            </Link>
          </Button>
        </div>
      </div>

      <DocumentsFilterBar />

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setStatusFilter}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="needs_review">Needs Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="signed">Signed</TabsTrigger>
          </TabsList>

          <Tabs defaultValue="all" onValueChange={setTypeFilter}>
            <TabsList>
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="agreement">Agreements</TabsTrigger>
              <TabsTrigger value="contract">Contracts</TabsTrigger>
              <TabsTrigger value="letter">Letters</TabsTrigger>
              <TabsTrigger value="policy">Policies</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : documents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No documents found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  id={doc.id}
                  title={doc.title}
                  type={doc.type}
                  status={doc.status}
                  date={`Modified ${formatDate(doc.updatedAt)}`}
                  statusIcon={getStatusIcon(doc.status)}
                  href={`/dashboard/documents/${doc.id}`}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Documents</CardTitle>
              <CardDescription>Documents that are still in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents
                  .filter((doc) => doc.status === "draft")
                  .map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      title={doc.title}
                      type={doc.type}
                      status={doc.status}
                      date={`Modified ${formatDate(doc.updatedAt)}`}
                      statusIcon={getStatusIcon(doc.status)}
                      href={`/dashboard/documents/${doc.id}`}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="needs_review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents Needing Review</CardTitle>
              <CardDescription>Documents that require your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents
                  .filter((doc) => doc.status === "needs_review")
                  .map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      title={doc.title}
                      type={doc.type}
                      status={doc.status}
                      date={`Modified ${formatDate(doc.updatedAt)}`}
                      statusIcon={getStatusIcon(doc.status)}
                      href={`/dashboard/documents/${doc.id}`}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Documents</CardTitle>
              <CardDescription>Documents that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents
                  .filter((doc) => doc.status === "completed")
                  .map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      title={doc.title}
                      type={doc.type}
                      status={doc.status}
                      date={`Modified ${formatDate(doc.updatedAt)}`}
                      statusIcon={getStatusIcon(doc.status)}
                      href={`/dashboard/documents/${doc.id}`}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Signed Documents</CardTitle>
              <CardDescription>Documents that have been signed by all parties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents
                  .filter((doc) => doc.status === "signed")
                  .map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      title={doc.title}
                      type={doc.type}
                      status={doc.status}
                      date={`Signed on ${formatDate(doc.updatedAt)}`}
                      statusIcon={getStatusIcon(doc.status)}
                      href={`/dashboard/documents/${doc.id}`}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

