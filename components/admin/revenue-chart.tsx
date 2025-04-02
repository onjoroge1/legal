"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "Jan", revenue: 18000, target: 15000 },
  { name: "Feb", revenue: 22000, target: 20000 },
  { name: "Mar", revenue: 25000, target: 22000 },
  { name: "Apr", revenue: 29000, target: 25000 },
  { name: "May", revenue: 32000, target: 30000 },
  { name: "Jun", revenue: 38000, target: 32000 },
  { name: "Jul", revenue: 42000, target: 35000 },
  { name: "Aug", revenue: 45000, target: 40000 },
  { name: "Sep", revenue: 48000, target: 42000 },
  { name: "Oct", revenue: 48294, target: 45000 },
  { name: "Nov", revenue: 0, target: 48000 },
  { name: "Dec", revenue: 0, target: 50000 },
]

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
        <Legend />
        <Bar dataKey="revenue" name="Actual Revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="target" name="Actual Revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="target" name="Target Revenue" fill="#93c5fd" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

