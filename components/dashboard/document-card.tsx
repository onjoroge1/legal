import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MoreHorizontal, Edit, Download, Share2, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface DocumentCardProps {
  title: string
  type: string
  date: string
  status: string
  statusIcon: React.ReactNode
  href: string
  id: string
}

export default function DocumentCard({ title, type, date, status, statusIcon, href, id }: DocumentCardProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete document")
      }

      toast({
        title: "Document Deleted",
        description: "Your document has been deleted successfully.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting document:", error)
      toast({
        title: "Error",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
      <CardContent className="p-0">
        <div className="flex items-start justify-between p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-primary/10 p-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{type}</span>
                <span>•</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={href} className="cursor-pointer">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${href}/sign`} className="cursor-pointer">
                  <Download className="h-4 w-4 mr-2" />
                  Sign
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${href}/collaborate`} className="cursor-pointer">
                  <Share2 className="h-4 w-4 mr-2" />
                  Collaborate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-3 flex justify-between">
        <div className="flex items-center gap-1 text-sm">
          {statusIcon}
          <span>{status}</span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={href}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

