"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
  subscriptionTier: string
  subscriptionStatus: string
  createdAt: string
  lastLoginAt: string | null
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated") {
      checkAdminStatus()
    }
  }, [status, router])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch("/api/admin/check")
      if (!response.ok) {
        throw new Error("Failed to check admin status")
      }
      const data = await response.json()
      setIsAdmin(data.isAdmin)
      
      if (!data.isAdmin) {
        toast.error("You don't have permission to access this page")
        router.push("/dashboard")
        return
      }

      // If admin, fetch users
      fetchUsers()
    } catch (error) {
      console.error("Error checking admin status:", error)
      toast.error("Failed to verify admin status")
      router.push("/dashboard")
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const toggleAdminRole = async (userId: string, currentAdminStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !currentAdminStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update user role")
      }

      const updatedUser = await response.json()
      setUsers(users.map(user => 
        user.id === userId ? updatedUser : user
      ))
      
      toast.success(`User role updated successfully`)
    } catch (error) {
      console.error("Error updating user role:", error)
      toast.error("Failed to update user role")
    }
  }

  if (status === "loading" || isAdmin === null || loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.isAdmin}
                    onCheckedChange={() => toggleAdminRole(user.id, user.isAdmin)}
                  />
                </TableCell>
                <TableCell>{user.subscriptionTier}</TableCell>
                <TableCell>{user.subscriptionStatus}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {user.lastLoginAt 
                    ? new Date(user.lastLoginAt).toLocaleDateString()
                    : "Never"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 