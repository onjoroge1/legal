import type React from "react"
import type { Metadata } from "next"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import AuthCheck from "@/components/auth-check"

export const metadata: Metadata = {
  title: "Dashboard | LegalLawDocs.com",
  description: "Manage your legal documents and templates",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 bg-muted/40">{children}</main>
        </div>
      </div>
    </AuthCheck>
  )
}

