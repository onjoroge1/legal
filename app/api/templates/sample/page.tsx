"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CreateSampleTemplates() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const createTemplates = async () => {
      try {
        const response = await fetch("/api/templates/sample", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This is important for sending cookies
        })
        const data = await response.json()
        console.log("Sample templates created:", data)
        alert("Sample templates created successfully!")
        router.push("/dashboard/templates")
      } catch (error) {
        console.error("Error creating sample templates:", error)
        alert("Failed to create sample templates. Please try again.")
      }
    }

    if (session) {
      createTemplates()
    }
  }, [router, session])

  if (!session) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">Please sign in first</h1>
        <p>You need to be signed in to create sample templates.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Creating Sample Templates...</h1>
      <p>Please wait while we create the sample templates.</p>
    </div>
  )
} 