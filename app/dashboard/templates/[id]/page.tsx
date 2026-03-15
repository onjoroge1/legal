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
import { useState, use } from "react"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Loader2, FileDown, Save, Sparkles } from "lucide-react"
import { TemplateField } from "@/types/template"
import { useQuery } from '@tanstack/react-query'
import { useToast } from "@/components/ui/use-toast"

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

interface FieldOption {
  id: string
  value: string
  label?: string
}

interface FieldDependency {
  id: string
  dependsOnQuestionId: string
  conditionType: string
  conditionValue: string
}

interface ITemplateField {
  id: string
  fieldId: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options: FieldOption[]
  dependencies: FieldDependency[]
}

interface IQuestion {
  id: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options: FieldOption[]
  dependencies: FieldDependency[]
}

interface IQuestionnaire {
  id: string
  name: string
  description?: string
  questions: IQuestion[]
}

interface Template {
  id: string
  name: string
  description: string | null
  type: string
  category: {
    id: string
    name: string
    code: string | null
  }
}

export default function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [currentSection, setCurrentSection] = useState<string>("")
  const [formProgress, setFormProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch template details
  const { data: template, isLoading: isLoadingTemplate } = useQuery<Template>({
    queryKey: ['template', id],
    queryFn: async () => {
      const response = await fetch(`/api/templates/${id}`)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to fetch template' }))
        throw new Error(errorData.error || 'Failed to fetch template')
      }
      return response.json()
    }
  })

  // Fetch template fields from the API
  const { data: templateFields = [], isLoading: isLoadingFields, error: templateError } = useQuery<ITemplateField[]>({
    queryKey: ['templateFields', id],
    queryFn: async () => {
      const response = await fetch(`/api/templates/${id}/fields`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to fetch template fields' }))
        console.error('Client - Debug - API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        throw new Error(errorData.error || 'Failed to fetch template fields')
      }

      const data = await response.json()
      if (!Array.isArray(data)) {
        console.error('Client - Debug - Invalid response format:', data)
        throw new Error('Invalid response format')
      }

      return data
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 30000,
  })

  // Fetch questionnaires for the template
  const { data: questionnaires = [], isLoading: isLoadingQuestionnaires } = useQuery<IQuestionnaire[]>({
    queryKey: ['questionnaires', id],
    queryFn: async () => {
      const response = await fetch(`/api/templates/${id}/questionnaires`, {
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
        throw new Error(errorData.error || 'Failed to fetch questionnaires')
      }

      const data = await response.json()
      return data
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 30000,
  })

  useEffect(() => {
    setMounted(true)
    // Set initial section based on available questions or template fields
    if (questionnaires.length > 0 && questionnaires[0].questions.length > 0) {
      // Get all unique sections from questions
      const sections = [...new Set(questionnaires[0].questions.map(q => q.section))]
      if (sections.length > 0) {
        setCurrentSection(sections[0])
      }
    } else if (templateFields.length > 0) {
      const firstSection = templateFields[0].section
      setCurrentSection(firstSection)
    }
  }, [questionnaires, templateFields])

  // Calculate form progress based on required fields
  useEffect(() => {
    if (!mounted) return

    const allRequiredFields = [
      ...templateFields.filter((field) => field.required),
      ...questionnaires[0]?.questions.filter((question) => question.required) || []
    ]

    const filledFields = allRequiredFields.filter((field) => {
      const value = formData[field.id]
      return value !== undefined && value !== null && value !== ""
    })

    const progress = allRequiredFields.length > 0 
      ? (filledFields.length / allRequiredFields.length) * 100 
      : 0
    setFormProgress(progress)
  }, [formData, templateFields, questionnaires, mounted])

  // Group fields by section
  const fieldsBySection = templateFields.reduce((acc: Record<string, ITemplateField[]>, field: ITemplateField) => {
    if (!acc[field.section]) {
      acc[field.section] = []
    }
    acc[field.section].push(field)
    return acc
  }, {})

  // Get sorted section names based on the order they appear in the API response
  const sortedSections = Array.from(new Set([
    ...(questionnaires.length > 0 && questionnaires[0]?.questions?.length > 0
      ? questionnaires[0].questions.map(q => q.section)
      : []),
    ...sectionOrder.filter(section => templateFields.some(field => field.section === section))
  ])).filter(Boolean)

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

  // Validate required fields are filled
  const validateForm = (): boolean => {
    const allRequired = questionnaires[0]?.questions.filter(q => q.required) || []
    const missing = allRequired.filter(q => {
      const val = formData[q.id]
      return val === undefined || val === null || val === ""
    })
    if (missing.length > 0) {
      toast({
        title: "Required Fields Missing",
        description: `Please fill in: ${missing.map(q => q.label).slice(0, 3).join(", ")}${missing.length > 3 ? ` and ${missing.length - 3} more` : ""}`,
        variant: "destructive",
      })
      // Navigate to the section of the first missing field
      const firstMissing = missing[0]
      if (firstMissing) setCurrentSection(firstMissing.section)
      return false
    }
    return true
  }

  // Generate document from the template using questionnaire answers
  const handleGenerate = async () => {
    if (!validateForm()) return

    try {
      setIsGenerating(true)
      const response = await fetch(`/api/documents/${id}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          intent: "standard",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate document")
      }

      const content = data.document || data.content
      if (!content) {
        throw new Error("No content was generated")
      }

      setGeneratedContent(content)
      toast({
        title: "Document Generated",
        description: "Your document has been generated. You can now save or download it.",
      })
    } catch (error) {
      console.error("Generation error:", error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Save the generated document as a draft
  const handleSaveDraft = async () => {
    if (!generatedContent && !validateForm()) return

    try {
      setIsSaving(true)

      // If no generated content yet, generate first
      let content = generatedContent
      if (!content) {
        const genResponse = await fetch(`/api/documents/${id}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData,
            intent: "standard",
          }),
        })
        const genData = await genResponse.json()
        if (!genResponse.ok) throw new Error(genData.error || "Failed to generate")
        content = genData.document || genData.content
        setGeneratedContent(content || null)
      }

      // Save the document
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: template?.name || "Untitled Document",
          type: template?.type || id,
          category: template?.category?.name?.toLowerCase() || "business",
          description: template?.description || "",
          content,
          status: "draft",
          metadata: { formData, templateSlug: id },
          parties: [],
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        if (response.status === 403 && data.redirectTo) {
          toast({
            title: "Subscription Limit",
            description: data.error,
            variant: "destructive",
          })
          router.push(data.redirectTo)
          return
        }
        throw new Error(data.error || "Failed to save")
      }

      toast({
        title: "Document Saved",
        description: "Your document has been saved as a draft.",
      })
      router.push(`/dashboard/documents/${data.id}`)
    } catch (error) {
      console.error("Save error:", error)
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save document.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
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
          <h1 className="text-3xl font-bold">
            {isLoadingTemplate ? (
              <span className="text-muted">Loading template...</span>
            ) : template?.name ? (
              template.name
            ) : (
              "Document Form"
            )}
          </h1>
          <p className="text-muted-foreground">
            {template?.description || "Fill out the form below to generate your document"}
          </p>
          {template?.category && (
            <p className="text-sm text-muted-foreground mt-1">
              Category: {template.category.name}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving || isGenerating}>
            {isSaving ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</>
            ) : (
              <><Save className="h-4 w-4 mr-2" />Save Draft</>
            )}
          </Button>
          <Button onClick={handleGenerate} disabled={isGenerating || isSaving}>
            {isGenerating ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</>
            ) : (
              <><Sparkles className="h-4 w-4 mr-2" />Generate Document</>
            )}
          </Button>
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
              {questionnaires.length > 0 && questionnaires[0].questions
                .filter(question => question.section === currentSection)
                .map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label htmlFor={question.id} className="font-medium">
                      {question.label}
                      {question.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {question.helpText && (
                      <p className="text-sm text-muted-foreground">
                        {question.helpText}
                      </p>
                    )}
                    {question.type === "text" && (
                      <Input
                        id={question.id}
                        placeholder={question.placeholder || ""}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                      />
                    )}
                    {question.type === "textarea" && (
                      <Textarea
                        id={question.id}
                        placeholder={question.placeholder || ""}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                      />
                    )}
                    {question.type === "select" && question.options && (
                      <Select
                        value={formData[question.id] || ""}
                        onValueChange={(value) => handleInputChange(question.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={question.placeholder || "Select an option"} />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options.map((option) => (
                            <SelectItem key={option.id} value={option.value}>
                              {option.label || option.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {question.type === "radio" && question.options && (
                      <RadioGroup
                        value={formData[question.id] || ""}
                        onValueChange={(value) => handleInputChange(question.id, value)}
                      >
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                            <Label htmlFor={`${question.id}-${option.value}`}>{option.label || option.value}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                    {question.type === "number" && (
                      <Input
                        id={question.id}
                        type="number"
                        placeholder={question.placeholder || ""}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                      />
                    )}
                    {question.type === "date" && (
                      <Input
                        id={question.id}
                        type="date"
                        placeholder={question.placeholder || ""}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                      />
                    )}
                    {question.type === "checkbox" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={question.id}
                          checked={formData[question.id] || false}
                          onCheckedChange={(checked) =>
                            handleInputChange(question.id, checked)
                          }
                        />
                        <Label htmlFor={question.id}>{question.label}</Label>
                      </div>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Generated Document Preview */}
          {generatedContent && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Generated Document</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSaveDraft}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</>
                      ) : (
                        <><Save className="h-4 w-4 mr-2" />Save to Dashboard</>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        const blob = new Blob([generatedContent], { type: "text/plain" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = `${template?.name || "document"}.txt`
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        URL.revokeObjectURL(url)
                      }}
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Review your generated document below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 bg-white min-h-[400px]">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap font-serif text-sm leading-relaxed">
                      {generatedContent}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}