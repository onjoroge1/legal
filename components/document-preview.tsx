import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Share2, ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DocumentPreviewProps {
  content?: string
  onSave: () => Promise<void>
  onBack: () => void
  documentId?: string
  isSaving?: boolean
}

export function DocumentPreview({
  content,
  onSave,
  onBack,
  documentId,
  isSaving = false
}: DocumentPreviewProps) {
  const handleDownload = () => {
    // TODO: Implement document download
    toast.info("Download functionality coming soon")
  }

  const handleShare = () => {
    // TODO: Implement document sharing
    toast.info("Share functionality coming soon")
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading document preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Generated Document</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none">
              {content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Document Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Document"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 