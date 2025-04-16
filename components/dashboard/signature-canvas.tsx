"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface SignatureCanvasProps {
  onSign: (signature: string) => void
}

export default function SignatureCanvas({ onSign }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const lastX = useRef(0)
  const lastY = useRef(0)
  const [activeTab, setActiveTab] = useState("draw")
  const [typedSignature, setTypedSignature] = useState("")
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up canvas
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // Set up event listeners
    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true
      const rect = canvas.getBoundingClientRect()
      const x = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - rect.left
      const y = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) - rect.top
      lastX.current = x
      lastY.current = y
    }

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return
      const rect = canvas.getBoundingClientRect()
      const x = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - rect.left
      const y = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) - rect.top

      ctx.beginPath()
      ctx.moveTo(lastX.current, lastY.current)
      ctx.lineTo(x, y)
      ctx.stroke()

      lastX.current = x
      lastY.current = y
    }

    const stopDrawing = () => {
      isDrawing.current = false
    }

    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stopDrawing)
    canvas.addEventListener("mouseout", stopDrawing)
    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw)
    canvas.addEventListener("touchend", stopDrawing)

    return () => {
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", stopDrawing)
      canvas.removeEventListener("mouseout", stopDrawing)
      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw)
      canvas.removeEventListener("touchend", stopDrawing)
    }
  }, [])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleSave = () => {
    try {
      if (activeTab === "draw") {
        const canvas = canvasRef.current
        if (!canvas) {
          toast({
            title: "Error",
            description: "Canvas not initialized",
            variant: "destructive",
          })
          return
        }
        const signature = canvas.toDataURL()
        onSign(signature)
      } else if (activeTab === "type") {
        if (!typedSignature.trim()) {
          toast({
            title: "Error",
            description: "Please enter a signature",
            variant: "destructive",
          })
          return
        }
        onSign(typedSignature)
      } else if (activeTab === "upload") {
        if (!uploadedSignature) {
          toast({
            title: "Error",
            description: "Please upload a signature image",
            variant: "destructive",
          })
          return
        }
        onSign(uploadedSignature)
      }
    } catch (error) {
      console.error("Error saving signature:", error)
      toast({
        title: "Error",
        description: "Failed to save signature",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadedSignature(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="draw">Draw</TabsTrigger>
          <TabsTrigger value="type">Type</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="border rounded-md bg-white w-full cursor-crosshair"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearCanvas}>
              Clear
            </Button>
            <Button onClick={handleSave}>Save Signature</Button>
          </div>
        </TabsContent>

        <TabsContent value="type" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signature">Type your signature</Label>
            <Input
              id="signature"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              placeholder="Type your signature here"
            />
          </div>
          <Button onClick={handleSave}>Save Signature</Button>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signature-upload">Upload signature image</Label>
            <Input
              id="signature-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
          {uploadedSignature && (
            <div className="mt-4">
              <img
                src={uploadedSignature}
                alt="Uploaded signature"
                className="max-h-32 border rounded-md"
              />
            </div>
          )}
          <Button onClick={handleSave} disabled={!uploadedSignature}>
            Save Signature
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

