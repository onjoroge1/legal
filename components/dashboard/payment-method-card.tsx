import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PaymentMethodCardProps {
  type: "visa" | "mastercard" | "amex" | "discover"
  last4: string
  expiry: string
  isDefault?: boolean
}

export default function PaymentMethodCard({ type, last4, expiry, isDefault = false }: PaymentMethodCardProps) {
  return (
    <Card className="relative">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="h-10 w-16 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xs">
              {type.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• {last4}</p>
              <p className="text-xs text-muted-foreground">Expires {expiry}</p>
            </div>
            {isDefault && (
              <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                Default
              </Badge>
            )}
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
              {!isDefault && <DropdownMenuItem>Set as default</DropdownMenuItem>}
              <DropdownMenuItem>Edit details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Trash className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

