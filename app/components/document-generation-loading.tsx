import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface DocumentGenerationLoadingProps {
  onCancel: () => void
}

export function DocumentGenerationLoading({ onCancel }: DocumentGenerationLoadingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          return prevProgress
        }
        return prevProgress + 10
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-[400px]">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Generating Document</h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we generate your document...
              </p>
            </div>
            <Progress value={progress} className="w-full" />
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 