"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia"
]

interface Question {
  id: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options?: Array<{ value: string; label?: string }>
}

interface DocumentFormProps {
  questions: Question[]
  formData: Record<string, any>
  onChange: (data: Record<string, any>) => void
  onValidate?: (isValid: boolean) => void
  externalErrors?: Record<string, string>
}

export default function DocumentForm({
  questions,
  formData,
  onChange,
  onValidate,
  externalErrors = {},
}: DocumentFormProps) {
  const [requiredErrors, setRequiredErrors] = useState<Record<string, string>>({})

  const validateRequired = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    questions.forEach((question) => {
      if (question.required) {
        const value = formData[question.id]
        if (!value || (typeof value === "string" && value.trim() === "")) {
          newErrors[question.id] = `${question.label} is required`
        }
      }
    })

    setRequiredErrors(newErrors)
    return newErrors
  }

  useEffect(() => {
    const newRequiredErrors = validateRequired()
    const hasRequiredErrors = Object.keys(newRequiredErrors).length > 0
    const hasExternalErrors = Object.keys(externalErrors || {}).length > 0
    onValidate?.(!hasRequiredErrors && !hasExternalErrors)
  }, [formData, questions, externalErrors])

  const handleChange = (fieldId: string, value: any) => {
    onChange({ [fieldId]: value })
  }

  const combinedErrors = { ...requiredErrors, ...externalErrors }

  // Group questions by section
  const questionsBySection = questions.reduce((acc, question) => {
    const section = question.section || "General"
    if (!acc[section]) {
      acc[section] = []
    }
    acc[section].push(question)
    return acc
  }, {} as Record<string, Question[]>)

  const renderField = (question: Question) => {
    const value = formData[question.id] || ""
    const hasError = !!combinedErrors[question.id]

    switch (question.type) {
      case "text":
        return (
          <Input
            id={question.id}
            value={value}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={hasError ? "border-destructive" : ""}
          />
        )

      case "textarea":
        return (
          <Textarea
            id={question.id}
            value={value}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className={hasError ? "border-destructive" : ""}
          />
        )

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleChange(question.id, val)}
          >
            <SelectTrigger id={question.id} className={hasError ? "border-destructive" : ""}>
              <SelectValue placeholder={question.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label || option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={(val) => handleChange(question.id, val)}
            className="flex gap-4"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                  {option.label || option.value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "state":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleChange(question.id, val)}
          >
            <SelectTrigger id={question.id} className={hasError ? "border-destructive" : ""}>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return (
          <Input
            id={question.id}
            value={value}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={hasError ? "border-destructive" : ""}
          />
        )
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(questionsBySection).map(([section, sectionQuestions]) => (
        <div key={section} className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-3">{section}</h3>
          </div>

          {sectionQuestions.map((question) => (
            <div key={question.id} className="space-y-2">
              <Label htmlFor={question.id}>
                {question.label} {question.required && <span className="text-destructive">*</span>}
              </Label>
              {renderField(question)}
              {combinedErrors[question.id] && (
                <p className="text-xs text-destructive">{combinedErrors[question.id]}</p>
              )}
              {question.helpText && !combinedErrors[question.id] && (
                <p className="text-xs text-muted-foreground">{question.helpText}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
