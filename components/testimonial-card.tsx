import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
}

export default function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="min-w-[300px] max-w-md flex-shrink-0">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <p className="italic mb-6">{quote}</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

