"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, FilePlus } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TemplatePreview from "@/components/dashboard/template-preview"
import { useRouter } from "next/navigation"

interface TemplateCardProps {
  id: string
  title: string
  description: string
  popularity?: string
  usageCount: number
  category: string
}

export default function TemplateCard({ id, title, description, popularity, usageCount, category }: TemplateCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const router = useRouter()

  const getTemplateType = (title: string): string => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes("non-disclosure") || titleLower.includes("nda")) return "nda"
    if (titleLower.includes("service")) return "service"
    if (titleLower.includes("employment")) return "employment"
    if (titleLower.includes("llc") || titleLower.includes("operating")) return "llc"
    if (titleLower.includes("privacy")) return "privacy"
    if (titleLower.includes("terms")) return "terms"
    if (titleLower.includes("independent") || titleLower.includes("contractor")) return "contractor"
    if (titleLower.includes("lease")) return "lease"
    if (titleLower.includes("trademark")) return "trademark"
    return "generic"
  }

  const handleUseTemplate = () => {
    router.push(`/dashboard/create?template=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&type=${encodeURIComponent(getTemplateType(title))}`)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-primary/10 p-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {popularity && (
                <Badge variant="secondary" className="mt-1">
                  {popularity}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="text-xs text-muted-foreground">Used {usageCount.toLocaleString()} times</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-3 flex justify-between">
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => setPreviewOpen(true)}>
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button size="sm" className="gap-1" onClick={handleUseTemplate}>
          <FilePlus className="h-4 w-4" />
          Use Template
        </Button>
      </CardFooter>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{title} - Preview</DialogTitle>
            <DialogDescription>Preview this template before using it to create your document.</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto mt-4 border rounded-md p-6 bg-white">
            <TemplatePreview templateType={getTemplateType(title)} />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              className="gap-1"
              onClick={() => {
                setPreviewOpen(false)
                handleUseTemplate()
              }}
            >
              <FilePlus className="h-4 w-4" />
              Use Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

