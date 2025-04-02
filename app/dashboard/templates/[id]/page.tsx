"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TEMPLATE_CATEGORIES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useState, useCallback, use } from "react"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Loader2 } from "lucide-react"
import { TemplateField } from "@/types/template"
import { useQuery } from '@tanstack/react-query'

// Section order to ensure consistent sidebar ordering
const sectionOrder = [
  'Basic Information',
  'Property Details',
  'Lease Terms',
  'Financial Terms',
  'Utilities and Services',
  'Parking',
  'Pet Policy',
  'Maintenance',
  'Rules and Regulations',
  'Additional Terms',
  'Personal Information',
  'Current Residence',
  'Employment & Income',
  'Occupancy Details',
  'Authorization',
  'Original Lease Information',
  'Lease Information',
  'Termination Details',
  'Move-Out Details',
  'Subtenant Information',
  'Sublease Terms',
  'Utilities',
  'Approvals'
]

export default function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [currentSection, setCurrentSection] = useState<string>(sectionOrder[0])
  const [formProgress, setFormProgress] = useState(0)

  // Fetch template fields from the API
  const { data: templateFields = [], isLoading: isLoadingFields, error: templateError } = useQuery({
    queryKey: ['templateFields', resolvedParams.id],
    queryFn: async () => {
      console.log('Client - Debug - Fetching fields for template:', resolvedParams.id)
      const response = await fetch(`/api/templates/${resolvedParams.id}/fields`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Client - Debug - API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        throw new Error(errorData.error || 'Failed to fetch template fields')
      }

      const data = await response.json()
      console.log('Client - Debug - Received template fields:', {
        count: data.length,
        fields: data.map(f => ({
          id: f.id,
          section: f.section,
          type: f.type
        }))
      })
      return data
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 30000,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate form progress based on required fields
  useEffect(() => {
    if (!mounted) return

    const requiredFields = templateFields.filter((field) => field.required)
    const filledFields = requiredFields.filter((field) => {
      const value = formData[field.id]
      return value !== undefined && value !== null && value !== ""
    })
    const progress = (filledFields.length / requiredFields.length) * 100
    setFormProgress(progress)
  }, [formData, templateFields, mounted])

  // Group fields by section
  const fieldsBySection = templateFields.reduce((acc, field) => {
    if (!acc[field.section]) {
      acc[field.section] = []
    }
    acc[field.section].push(field)
    return acc
  }, {} as Record<string, TemplateField[]>)

  // Get sorted section names based on the order they appear in the API response
  const sortedSections = Array.from(new Set(templateFields.map(field => field.section)))

  // Log the sections and fields
  console.log('Client - Debug - Current state:', {
    templateId: resolvedParams.id,
    sections: sortedSections,
    fieldsBySection: Object.entries(fieldsBySection).map(([section, fields]) => ({
      section,
      fieldCount: fields.length,
      fields: fields.map(f => f.id)
    }))
  })

  // Handle input changes
  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  // Get the template name from the ID
  const getTemplateName = (id: string) => {
    const template = TEMPLATE_CATEGORIES.flatMap(category => category.templates)
      .find(template => template.id === id)
    return template?.name || "Document Form"
  }

  if (!mounted || isLoadingFields) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (templateError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-destructive mb-4">
          {templateError instanceof Error ? templateError.message : 'Failed to load template'}
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{getTemplateName(resolvedParams.id)}</h1>
          <p className="text-muted-foreground">
            Fill out the form below to generate your document
          </p>
        </div>
      </div>

      {/* Form Progress Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Form Progress</CardTitle>
          <CardDescription>
            Complete all required fields to generate your document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={formProgress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(formProgress)}% complete
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        {/* Left sidebar with section navigation */}
        <div className="w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle>Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sortedSections.map((section) => (
                  <button
                    key={section}
                    onClick={() => setCurrentSection(section)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      currentSection === section
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{currentSection}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fieldsBySection[currentSection]?.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {field.helpText && (
                    <p className="text-sm text-muted-foreground">
                      {field.helpText}
                    </p>
                  )}
                  {field.type === "text" && (
                    <Input
                      id={field.id}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.id}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                  {field.type === "select" && (
                    <Select
                      value={formData[field.id] || ""}
                      onValueChange={(value) => handleInputChange(field.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "radio" && (
                    <RadioGroup
                      value={formData[field.id] || ""}
                      onValueChange={(value) => handleInputChange(field.id, value)}
                    >
                      {field.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                          <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.id}
                        checked={formData[field.id] || false}
                        onCheckedChange={(checked) =>
                          handleInputChange(field.id, checked)
                        }
                      />
                      <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                  )}
                  {field.type === "date" && (
                    <Input
                      id={field.id}
                      type="date"
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                  {field.type === "number" && (
                    <Input
                      id={field.id}
                      type="number"
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      min={field.validation?.min}
                      max={field.validation?.max}
                    />
                  )}
                  {field.type === "currency" && (
                    <Input
                      id={field.id}
                      type="number"
                      step="0.01"
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}