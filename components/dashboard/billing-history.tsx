import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function BillingHistory() {
  const invoices = [
    {
      id: "INV-001",
      date: "July 1, 2023",
      amount: "$49.00",
      status: "Paid",
      description: "Standard Plan - Monthly Subscription",
    },
    {
      id: "INV-002",
      date: "June 1, 2023",
      amount: "$49.00",
      status: "Paid",
      description: "Standard Plan - Monthly Subscription",
    },
    {
      id: "INV-003",
      date: "May 1, 2023",
      amount: "$49.00",
      status: "Paid",
      description: "Standard Plan - Monthly Subscription",
    },
    {
      id: "INV-004",
      date: "April 1, 2023",
      amount: "$49.00",
      status: "Paid",
      description: "Standard Plan - Monthly Subscription",
    },
    {
      id: "INV-005",
      date: "March 1, 2023",
      amount: "$49.00",
      status: "Paid",
      description: "Standard Plan - Monthly Subscription",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

