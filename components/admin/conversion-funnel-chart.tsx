"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "Website Visitors", value: 100000, percentage: "100%" },
  { name: "Signup Page Views", value: 25000, percentage: "25%" },
  { name: "Account Creation", value: 8200, percentage: "8.2%" },
  { name: "Free Document Creation", value: 5400, percentage: "5.4%" },
  { name: "Paid Subscription", value: 3600, percentage: "3.6%" },
]

export default function ConversionFunnelChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" width={150} />
        <Tooltip
          formatter={(value) => [`${value.toLocaleString()} users`, undefined]}
          labelFormatter={(_, payload) => {
            if (payload && payload.length > 0) {
              return `${payload[0].payload.name} (${payload[0].payload.percentage})`
            }
            return ""
          }}
        />
        <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}

