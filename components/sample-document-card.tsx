import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SampleDocumentCardProps {
  title: string
  description: string
  imageSrc: string
  downloadCount: number
  previewUrl: string
  downloadUrl: string
}

export default function SampleDocumentCard({
  title,
  description,
  imageSrc,
  downloadCount,
  previewUrl,
  downloadUrl,
}: SampleDocumentCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-1" />
            <span>{downloadCount.toLocaleString()} downloads</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>{title} - Preview</DialogTitle>
                <DialogDescription>
                  This is a preview of the sample document. Download for the full version.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-auto mt-4 border rounded-md">
                <iframe src={previewUrl} className="w-full h-[60vh]" title={`${title} preview`} />
              </div>
              <div className="flex justify-end mt-4">
                <Button asChild>
                  <Link href={downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Sample
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button size="sm" className="flex-1 gap-1" asChild>
            <Link href={downloadUrl} download>
              <Download className="h-4 w-4" />
              Download
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

