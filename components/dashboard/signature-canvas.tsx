"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen, Type, Upload, Trash2 } from "lucide-react"

export default function SignatureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [typedSignature, setTypedSignature] = useState("")
  const [signatureFont, setSignatureFont] = useState("Dancing Script")

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set initial canvas state
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000"
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
      e.preventDefault() // Prevent scrolling on touch devices
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const renderTypedSignature = () => {
    const canvas = canvasRef.current
    if (!canvas || !typedSignature) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw typed signature
    ctx.fillStyle = "#000"
    ctx.font = `32px ${signatureFont}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2)
  }

  useEffect(() => {
    if (typedSignature) {
      renderTypedSignature()
    }
  }, [typedSignature, signatureFont])

  return (
    <div className="space-y-4">
      <Tabs defaultValue="draw" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="draw" className="gap-1">
            <Pen className="h-4 w-4" />
            Draw
          </TabsTrigger>
          <TabsTrigger value="type" className="gap-1">
            <Type className="h-4 w-4" />
            Type
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-1">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-4">
          <div className="border rounded-md bg-white">
            <canvas
              ref={canvasRef}
              className="w-full h-40 touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={clearCanvas} className="gap-1">
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="type" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="typed-signature">Type your signature</Label>
            <Input
              id="typed-signature"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              placeholder="Type your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signature-font">Signature Style</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={signatureFont === "Dancing Script" ? "default" : "outline"}
                className="font-['Dancing_Script']"
                onClick={() => setSignatureFont("Dancing Script")}
              >
                Signature
              </Button>
              <Button
                type="button"
                variant={signatureFont === "Pacifico" ? "default" : "outline"}
                className="font-['Pacifico']"
                onClick={() => setSignatureFont("Pacifico")}
              >
                Signature
              </Button>
              <Button
                type="button"
                variant={signatureFont === "Caveat" ? "default" : "outline"}
                className="font-['Caveat']"
                onClick={() => setSignatureFont("Caveat")}
              >
                Signature
              </Button>
            </div>
          </div>

          <div className="border rounded-md bg-white">
            <canvas ref={canvasRef} className="w-full h-40" />
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed rounded-md p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Upload your signature</p>
            <p className="text-xs text-muted-foreground mb-4">
              Drag and drop your signature image here or click to browse
            </p>
            <Button size="sm">Browse Files</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Supported formats: PNG, JPG, GIF (transparent background recommended)
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

