"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

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
  sectionOrder?: number
  helpText?: string
  placeholder?: string
  options?: Array<{ value: string; label?: string }>
  showWhen?: { field: string; value: string | string[] }
  forIntents?: string[]
}

interface DocumentFormProps {
  questions: Question[]
  formData: Record<string, any>
  onChange: (data: Record<string, any>) => void
  onValidate?: (isValid: boolean) => void
  externalErrors?: Record<string, string>
  selectedIntent?: string | null
  /** When set, only render questions for this specific section */
  activeSection?: string
}

export interface SectionInfo {
  name: string
  order: number
  questionCount: number
  completedCount: number
}

/**
 * Compute section metadata from questions, respecting visibility/intent rules.
 */
export function getSections(
  questions: Question[],
  formData: Record<string, any>,
  selectedIntent?: string | null
): SectionInfo[] {
  // Filter by intent
  const intentFiltered = questions.filter(
    (q) => !q.forIntents || q.forIntents.length === 0 || (selectedIntent && q.forIntents.includes(selectedIntent))
  )

  // Filter by visibility
  const visible = intentFiltered.filter((q) => isVisible(q, formData, intentFiltered))

  // Group by section
  const groups: Record<string, Question[]> = {}
  for (const q of visible) {
    const section = q.section || "General"
    if (!groups[section]) groups[section] = []
    groups[section].push(q)
  }

  return Object.entries(groups)
    .map(([name, qs]) => ({
      name,
      order: Math.min(...qs.map((q) => q.sectionOrder ?? 0)),
      questionCount: qs.length,
      completedCount: qs.filter((q) => {
        const val = formData[q.id]
        return val !== undefined && val !== null && String(val).trim() !== ""
      }).length,
    }))
    .sort((a, b) => a.order - b.order)
}

/**
 * Check if a question's showWhen condition is met, recursively handling chains.
 */
function isVisible(
  question: Question,
  formData: Record<string, any>,
  allQuestions: Question[]
): boolean {
  if (!question.showWhen) return true

  const { field, value } = question.showWhen
  const currentValue = formData[field]

  // Check if the parent itself is visible
  const parent = allQuestions.find((q) => q.id === field)
  if (parent && !isVisible(parent, formData, allQuestions)) {
    return false
  }

  // Handle "alternateAgentName" style where value is empty array (show when field has any value)
  if (Array.isArray(value) && value.length === 0) {
    return !!currentValue && String(currentValue).trim() !== ""
  }

  // Check value match
  if (Array.isArray(value)) {
    return value.includes(String(currentValue ?? ""))
  }
  return String(currentValue ?? "") === value
}

/**
 * Recursively find all question IDs that depend on a given field
 * and whose showWhen condition is no longer met.
 */
function findHiddenDependents(
  changedFieldId: string,
  newFormData: Record<string, any>,
  allQuestions: Question[]
): string[] {
  const hidden: string[] = []
  for (const q of allQuestions) {
    if (q.showWhen?.field === changedFieldId) {
      if (!isVisible(q, newFormData, allQuestions)) {
        hidden.push(q.id)
        // Recursively find grandchildren
        hidden.push(...findHiddenDependents(q.id, newFormData, allQuestions))
      }
    }
  }
  return hidden
}

export default function DocumentForm({
  questions,
  formData,
  onChange,
  onValidate,
  externalErrors = {},
  selectedIntent,
  activeSection,
}: DocumentFormProps) {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  // Filter questions by intent, visibility, and optionally activeSection
  const visibleQuestions = useMemo(() => {
    // Step 1: Filter by intent
    const intentFiltered = questions.filter(
      (q) => !q.forIntents || q.forIntents.length === 0 || (selectedIntent && q.forIntents.includes(selectedIntent))
    )

    // Step 2: Filter by showWhen conditions
    let visible = intentFiltered.filter((q) => isVisible(q, formData, intentFiltered))

    // Step 3: Filter by active section if specified
    if (activeSection) {
      visible = visible.filter((q) => (q.section || "General") === activeSection)
    }

    return visible
  }, [questions, formData, selectedIntent, activeSection])

  // Validate only visible required questions
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {}
    for (const question of visibleQuestions) {
      if (question.required) {
        const value = formData[question.id]
        if (!value || (typeof value === "string" && value.trim() === "")) {
          errors[question.id] = `${question.label} is required`
        }
      }
    }
    return errors
  }, [visibleQuestions, formData])

  // Report validation state
  useEffect(() => {
    const hasRequiredErrors = Object.keys(validationErrors).length > 0
    const hasExternalErrors = Object.keys(externalErrors || {}).length > 0
    onValidate?.(!hasRequiredErrors && !hasExternalErrors)
  }, [validationErrors, externalErrors, onValidate])

  const handleChange = useCallback((fieldId: string, value: any) => {
    const updated: Record<string, any> = { [fieldId]: value }

    // Find and clear hidden dependent fields
    const tempFormData = { ...formData, [fieldId]: value }
    const hiddenIds = findHiddenDependents(fieldId, tempFormData, questions)
    for (const id of hiddenIds) {
      updated[id] = undefined
    }

    setTouchedFields((prev) => new Set([...prev, fieldId]))
    onChange(updated)
  }, [formData, questions, onChange])

  // Combine errors (only show for touched fields)
  const displayErrors = useMemo(() => {
    const combined: Record<string, string> = {}
    for (const [key, msg] of Object.entries({ ...validationErrors, ...externalErrors })) {
      if (touchedFields.has(key)) {
        combined[key] = msg
      }
    }
    return combined
  }, [validationErrors, externalErrors, touchedFields])

  // Group visible questions by section, sorted by sectionOrder
  const sortedSections = useMemo(() => {
    const groups: Record<string, Question[]> = {}
    for (const q of visibleQuestions) {
      const section = q.section || "General"
      if (!groups[section]) groups[section] = []
      groups[section].push(q)
    }

    return Object.entries(groups).sort(([, a], [, b]) => {
      const orderA = Math.min(...a.map((q) => q.sectionOrder ?? 0))
      const orderB = Math.min(...b.map((q) => q.sectionOrder ?? 0))
      return orderA - orderB
    })
  }, [visibleQuestions])

  const renderField = (question: Question) => {
    const value = formData[question.id] ?? ""
    const hasError = !!displayErrors[question.id]

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
            className="flex gap-4 flex-wrap"
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

      case "number":
        return (
          <Input
            id={question.id}
            type="number"
            value={value}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={hasError ? "border-destructive" : ""}
          />
        )

      case "date":
        return (
          <Input
            id={question.id}
            type="date"
            value={value}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={hasError ? "border-destructive" : ""}
          />
        )

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={question.id}
              checked={!!formData[question.id]}
              onCheckedChange={(checked) => handleChange(question.id, checked)}
            />
            <Label htmlFor={question.id} className="font-normal cursor-pointer">
              {question.helpText || question.label}
            </Label>
          </div>
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
      {sortedSections.map(([section, sectionQuestions]) => (
        <div key={section} className="space-y-4">
          {/* Hide section header when wizard shows a single section */}
          {!activeSection && (
            <div>
              <h3 className="text-sm font-semibold mb-3">{section}</h3>
            </div>
          )}

          {sectionQuestions.map((question) => (
            <div key={question.id} className="space-y-2">
              {question.type !== "checkbox" && (
                <Label htmlFor={question.id}>
                  {question.label} {question.required && <span className="text-destructive">*</span>}
                </Label>
              )}
              {renderField(question)}
              {displayErrors[question.id] && (
                <p className="text-xs text-destructive">{displayErrors[question.id]}</p>
              )}
              {question.helpText && !displayErrors[question.id] && question.type !== "checkbox" && (
                <p className="text-xs text-muted-foreground">{question.helpText}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
