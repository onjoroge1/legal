"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "Jan", users: 8450, newUsers: 1250 },
  { name: "Feb", users: 9200, newUsers: 750 },
  { name: "Mar", users: 9800, newUsers: 600 },
  { name: "Apr", users: 10300, newUsers: 500 },
  { name: "May", users: 10700, newUsers: 400 },
  { name: "Jun", users: 11200, newUsers: 500 },
  { name: "Jul", users: 11500, newUsers: 300 },
  { name: "Aug", users: 11700, newUsers: 200 },
  { name: "Sep", users: 12100, newUsers: 400 },
  { name: "Oct", users: 12543, newUsers: 443 },
]

export default function UserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [value.toLocaleString(), undefined]} />
        <Legend />
        <Line type="monotone" dataKey="users" name="Total Users" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="newUsers" name="New Users" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

