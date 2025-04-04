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

export default function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [currentSection, setCurrentSection] = useState<string>("")
  const [formProgress, setFormProgress] = useState(0)

  // Fetch template fields from the API
  const { data: templateFields = [], isLoading: isLoadingFields, error: templateError } = useQuery<ITemplateField[]>({
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
        fields: data.map((f: ITemplateField) => ({
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

  // Fetch questionnaires for the template
  const { data: questionnaires = [], isLoading: isLoadingQuestionnaires } = useQuery<IQuestionnaire[]>({
    queryKey: ['questionnaires', resolvedParams.id],
    queryFn: async () => {
      console.log('Client - Debug - Fetching questionnaires for template:', resolvedParams.id)
      const response = await fetch(`/api/templates/${resolvedParams.id}/questionnaires`, {
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
      console.log('Client - Debug - Received questionnaires:', {
        count: data.length
      })
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
        console.log('Client - Debug - Setting initial section:', {
          sections,
          selectedSection: sections[0],
          questionsCount: questionnaires[0].questions.length
        })
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
  const sortedSections = [
    ...(questionnaires.length > 0 && questionnaires[0]?.questions?.length > 0
      ? [...new Set(questionnaires[0].questions.map(q => q.section))]
      : []),
    ...sectionOrder.filter(section => templateFields.some(field => field.section === section))
  ].filter(Boolean)

  // Log the sections and fields
  console.log('Client - Debug - Current state:', {
    templateId: resolvedParams.id,
    sections: sortedSections,
    questionnaires: questionnaires.length,
    currentSection,
    questions: questionnaires[0]?.questions?.map(q => ({
      section: q.section,
      label: q.label
    })) || [],
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => console.log('Saving...')}>
            Save Draft
          </Button>
          <Button onClick={() => console.log('Generating...')}>
            Generate Document
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
                  {field.type === "select" && field.options && (
                    <Select
                      value={formData[field.id] || ""}
                      onValueChange={(value) => handleInputChange(field.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={`${option.id}`} value={`${option.value}`}>
                            {option.label || option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "radio" && field.options && (
                    <RadioGroup
                      value={formData[field.id] || ""}
                      onValueChange={(value) => handleInputChange(field.id, value)}
                    >
                      {field.options.map((option) => (
                        <div key={`${option.id}`} className="flex items-center space-x-2">
                          <RadioGroupItem value={`${option.value}`} id={`${field.id}-${option.value}`} />
                          <Label htmlFor={`${field.id}-${option.value}`}>{option.label || option.value}</Label>
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