import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import DocumentSampleViewer from "@/components/document-sample-viewer"

interface DocumentCardProps {
  title: string
  description: string
  imageSrc: string
}

export default function DocumentCard({ title, description, imageSrc }: DocumentCardProps) {
  // Determine document type based on title
  const getDocumentType = () => {
    if (title.includes("Non-Disclosure")) return "nda"
    if (title.includes("Service Agreement")) return "service-agreement"
    if (title.includes("LLC Operating")) return "llc-operating"
    return "nda" // Default fallback
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <DocumentSampleViewer title={title} documentType={getDocumentType()} />
      </CardContent>
    </Card>
  )
}

