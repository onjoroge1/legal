"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { signOut } from "next-auth/react"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function LogoutButton({ variant = "ghost", size = "sm", className = "" }: LogoutButtonProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Sign out and handle redirect
    signOut({ 
      redirect: true,
      callbackUrl: "/"
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={`justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10 ${className}`}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log Out
    </Button>
  )
}

