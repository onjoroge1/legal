"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/lib/safe-toast"
import { Upload } from "lucide-react"
import { useSession } from "next-auth/react"

interface AvatarUploadProps {
  currentImage?: string
  fallback: string
  onUploadSuccess?: (url: string) => void
}

/**
 * Avatar upload component
 */
export function AvatarUpload({ currentImage, fallback, onUploadSuccess }: AvatarUploadProps) {
  const { update: updateSession } = useSession()
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only images are allowed.")
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB limit")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/settings/avatar", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to upload avatar")
      }

      const data = await response.json()
      toast.success("Avatar uploaded successfully")
      setPreview(null)
      onUploadSuccess?.(data.url)
      
      // Update session to reflect new avatar
      await updateSession()
      
      // Small delay before reload to ensure session is updated
      setTimeout(() => {
        window.location.reload()
      }, 300)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload avatar")
      setPreview(null)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={preview || currentImage || "/placeholder.svg"} alt="Profile picture" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        id="avatar-upload"
        disabled={isUploading}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? "Uploading..." : "Change Avatar"}
      </Button>
    </div>
  )
}

