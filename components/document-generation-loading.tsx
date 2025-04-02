import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface DocumentGenerationLoadingProps {
  onCancel: () => void
}

export function DocumentGenerationLoading({ onCancel }: DocumentGenerationLoadingProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h2 className="text-xl font-semibold">Generating Document</h2>
          <p className="text-muted-foreground text-center">
            Please wait while we generate your document. This may take a few moments.
          </p>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 