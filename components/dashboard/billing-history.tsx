"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BillingHistoryItem {
  id: string
  amount: number
  status: string
  date: string
  description: string
}

interface BillingHistoryProps {
  items?: BillingHistoryItem[]
}

/**
 * BillingHistory component
 * Displays billing history and invoices
 */
export default function BillingHistory({ items = [] }: BillingHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View your past invoices and payments</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No billing history yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${item.amount.toFixed(2)}</span>
                  <Badge variant={item.status === "paid" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}




