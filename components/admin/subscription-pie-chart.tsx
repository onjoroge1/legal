"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "Free", value: 5432, color: "#64748b" },
  { name: "Standard", value: 7654, color: "#2563eb" },
  { name: "Premium", value: 2346, color: "#f59e0b" },
]

export default function SubscriptionPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value.toLocaleString()} users`, undefined]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

