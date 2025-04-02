import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Share, ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"

interface DocumentPreviewProps {
  content: string
  onSave: () => Promise<void>
  onBack: () => void
  documentId: string
  isSaving: boolean
}

export function DocumentPreview({
  content,
  onSave,
  onBack,
  documentId,
  isSaving,
}: DocumentPreviewProps) {
  const handleDownload = () => {
    // TODO: Implement document download
    toast.info("Download functionality coming soon")
  }

  const handleShare = () => {
    // TODO: Implement document sharing
    toast.info("Share functionality coming soon")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                {content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Document Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={onSave}
                disabled={isSaving}
                className="w-full gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Document"}
              </Button>

              <Button
                variant="outline"
                onClick={handleDownload}
                className="w-full gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>

              <Button
                variant="outline"
                onClick={handleShare}
                className="w-full gap-2"
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 