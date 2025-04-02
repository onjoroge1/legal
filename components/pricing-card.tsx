import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  name: string
  price: string
  period: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({ name, price, period, features, buttonText, popular = false }: PricingCardProps) {
  return (
    <Card
      className={`relative overflow-hidden transition-all ${
        popular ? "border-primary shadow-lg scale-105 md:scale-105 z-10" : "hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      {popular && <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600">Most Popular</Badge>}

      <CardHeader className={`pb-6 pt-8 text-center ${popular ? "bg-primary text-white" : "bg-slate-900 text-white"}`}>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <div className="text-3xl font-bold">{price}</div>
        <div className="text-sm opacity-80">{period}</div>
      </CardHeader>

      <CardContent className="p-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="w-full" variant={popular ? "default" : "outline"} asChild>
          <Link href={`/signup?plan=${name.toLowerCase()}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

