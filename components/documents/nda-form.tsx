"use client"

import { useState } from "react"
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

const DURATION_OPTIONS = [
  { value: "1 year", label: "1 Year" },
  { value: "2 years", label: "2 Years" },
  { value: "3 years", label: "3 Years" },
  { value: "5 years", label: "5 Years" },
  { value: "10 years", label: "10 Years" },
  { value: "indefinite", label: "Indefinite" },
]

const RELATIONSHIP_OPTIONS = [
  { value: "potential_partnership", label: "Potential Partnership" },
  { value: "employment", label: "Employment" },
  { value: "freelance", label: "Freelance Work" },
  { value: "investor", label: "Investor Discussions" },
  { value: "vendor", label: "Vendor/Supplier Relationship" },
  { value: "joint_venture", label: "Joint Venture" },
  { value: "other", label: "Other" },
]

export interface NDAFormData {
  state: string
  type: "mutual" | "unilateral"
  disclosingParty: string
  receivingParty: string
  relationship: string
  confidentialInfo: string
  duration: string
  nonSolicitation: "yes" | "no"
  nonCompete: "yes" | "no"
  additional: string
}

interface NDAFormProps {
  formData: NDAFormData
  onChange: (data: Partial<NDAFormData>) => void
  onValidate?: (isValid: boolean) => void
}

export default function NDAForm({ formData, onChange, onValidate }: NDAFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.state) newErrors.state = "State is required"
    if (!formData.type) newErrors.type = "NDA type is required"
    if (!formData.disclosingParty?.trim()) newErrors.disclosingParty = "Disclosing party name is required"
    if (!formData.receivingParty?.trim()) newErrors.receivingParty = "Receiving party name is required"
    if (!formData.relationship) newErrors.relationship = "Business relationship is required"
    if (!formData.confidentialInfo?.trim() || formData.confidentialInfo.length < 10) {
      newErrors.confidentialInfo = "Please provide a detailed description (at least 10 characters)"
    }
    if (!formData.duration) newErrors.duration = "Duration is required"

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0
    onValidate?.(isValid)
    return isValid
  }

  const handleChange = (field: keyof NDAFormData, value: any) => {
    onChange({ [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    // Re-validate
    setTimeout(() => {
      const newData = { ...formData, [field]: value }
      const newErrors: Record<string, string> = {}
      if (!newData.state) newErrors.state = "State is required"
      if (!newData.type) newErrors.type = "NDA type is required"
      if (!newData.disclosingParty?.trim()) newErrors.disclosingParty = "Disclosing party name is required"
      if (!newData.receivingParty?.trim()) newErrors.receivingParty = "Receiving party name is required"
      if (!newData.relationship) newErrors.relationship = "Business relationship is required"
      if (!newData.confidentialInfo?.trim() || newData.confidentialInfo.length < 10) {
        newErrors.confidentialInfo = "Please provide a detailed description (at least 10 characters)"
      }
      if (!newData.duration) newErrors.duration = "Duration is required"
      setErrors(newErrors)
      onValidate?.(Object.keys(newErrors).length === 0)
    }, 100)
  }

  const showCaliforniaWarning = formData.state === "California" && formData.nonCompete === "yes"

  return (
    <div className="space-y-6">
      {/* Section 1: Basic Information */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-3">Basic Information</h3>
        </div>

        {/* State/Jurisdiction */}
        <div className="space-y-2">
          <Label htmlFor="state">
            State/Jurisdiction <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.state}
            onValueChange={(value) => handleChange("state", value)}
          >
            <SelectTrigger id="state" className={errors.state ? "border-destructive" : ""}>
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
          {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
          <p className="text-xs text-muted-foreground">
            This determines state-specific legal provisions
          </p>
        </div>

        {/* NDA Type */}
        <div className="space-y-2">
          <Label>
            NDA Type <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value) => handleChange("type", value as "mutual" | "unilateral")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mutual" id="mutual" />
              <Label htmlFor="mutual" className="font-normal cursor-pointer">
                Mutual (both parties share confidential info)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unilateral" id="unilateral" />
              <Label htmlFor="unilateral" className="font-normal cursor-pointer">
                Unilateral (one party shares)
              </Label>
            </div>
          </RadioGroup>
          {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
        </div>
      </div>

      {/* Section 2: Parties */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-3">Parties</h3>
        </div>

        {/* Disclosing Party */}
        <div className="space-y-2">
          <Label htmlFor="disclosingParty">
            {formData.type === "mutual" ? "Party A Name" : "Disclosing Party Name"}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="disclosingParty"
            value={formData.disclosingParty}
            onChange={(e) => handleChange("disclosingParty", e.target.value)}
            placeholder="Enter full legal name"
            className={errors.disclosingParty ? "border-destructive" : ""}
          />
          {errors.disclosingParty && (
            <p className="text-xs text-destructive">{errors.disclosingParty}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Enter the full legal name of the company or individual
          </p>
        </div>

        {/* Receiving Party */}
        <div className="space-y-2">
          <Label htmlFor="receivingParty">
            {formData.type === "mutual" ? "Party B Name" : "Receiving Party Name"}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="receivingParty"
            value={formData.receivingParty}
            onChange={(e) => handleChange("receivingParty", e.target.value)}
            placeholder="Enter full legal name"
            className={errors.receivingParty ? "border-destructive" : ""}
          />
          {errors.receivingParty && (
            <p className="text-xs text-destructive">{errors.receivingParty}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Enter the full legal name of the company or individual
          </p>
        </div>
      </div>

      {/* Section 3: Agreement Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-3">Agreement Details</h3>
        </div>

        {/* Business Relationship */}
        <div className="space-y-2">
          <Label htmlFor="relationship">
            Business Relationship <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.relationship}
            onValueChange={(value) => handleChange("relationship", value)}
          >
            <SelectTrigger id="relationship" className={errors.relationship ? "border-destructive" : ""}>
              <SelectValue placeholder="Select relationship type" />
            </SelectTrigger>
            <SelectContent>
              {RELATIONSHIP_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.relationship && (
            <p className="text-xs text-destructive">{errors.relationship}</p>
          )}
          <p className="text-xs text-muted-foreground">
            This helps us customize the agreement for your specific situation
          </p>
        </div>

        {/* Confidential Information */}
        <div className="space-y-2">
          <Label htmlFor="confidentialInfo">
            Confidential Information <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="confidentialInfo"
            value={formData.confidentialInfo}
            onChange={(e) => handleChange("confidentialInfo", e.target.value)}
            placeholder="e.g., trade secrets, business plans, customer data, proprietary technology"
            rows={4}
            className={errors.confidentialInfo ? "border-destructive" : ""}
          />
          {errors.confidentialInfo && (
            <p className="text-xs text-destructive">{errors.confidentialInfo}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Be specific about what information will be considered confidential
          </p>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label htmlFor="duration">
            Duration <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => handleChange("duration", value)}
          >
            <SelectTrigger id="duration" className={errors.duration ? "border-destructive" : ""}>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.duration && <p className="text-xs text-destructive">{errors.duration}</p>}
          <p className="text-xs text-muted-foreground">
            Consider your state's laws - some states limit NDA duration
          </p>
        </div>
      </div>

      {/* Section 4: Additional Clauses */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-3">Additional Clauses (Optional)</h3>
        </div>

        {/* Non-Solicitation */}
        <div className="space-y-2">
          <Label>Non-Solicitation Clause</Label>
          <RadioGroup
            value={formData.nonSolicitation}
            onValueChange={(value) => handleChange("nonSolicitation", value as "yes" | "no")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="nonSolicitation-yes" />
              <Label htmlFor="nonSolicitation-yes" className="font-normal cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="nonSolicitation-no" />
              <Label htmlFor="nonSolicitation-no" className="font-normal cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            Prevents parties from hiring each other's employees or contractors
          </p>
        </div>

        {/* Non-Compete */}
        <div className="space-y-2">
          <Label>Non-Compete Clause</Label>
          <RadioGroup
            value={formData.nonCompete}
            onValueChange={(value) => handleChange("nonCompete", value as "yes" | "no")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="nonCompete-yes" />
              <Label htmlFor="nonCompete-yes" className="font-normal cursor-pointer">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="nonCompete-no" />
              <Label htmlFor="nonCompete-no" className="font-normal cursor-pointer">
                No
              </Label>
            </div>
          </RadioGroup>
          {showCaliforniaWarning && (
            <Alert className="mt-2">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Non-compete clauses are generally not enforceable in California. We'll include
                state-specific enforceability notes in the document.
              </AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-muted-foreground">
            Note: Not enforceable in all states (e.g., California)
          </p>
        </div>

        {/* Additional Provisions */}
        <div className="space-y-2">
          <Label htmlFor="additional">Additional Provisions</Label>
          <Textarea
            id="additional"
            value={formData.additional}
            onChange={(e) => handleChange("additional", e.target.value)}
            placeholder="e.g., specific industry requirements, special circumstances, etc."
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Optional: Add any specific requirements or concerns
          </p>
        </div>
      </div>
    </div>
  )
}




