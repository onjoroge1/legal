"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface Field {
  id?: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
}

interface QuestionnaireDialogProps {
  mode: "add" | "edit"
  questionnaire?: {
    id: string
    name: string
    description?: string
    templateId: string
    metadata?: {
      fields: Field[]
    }
  }
  onSuccess: () => void
}

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Long Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
  { value: "multiselect", label: "Multi Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio" },
]

const DEFAULT_SECTIONS = [
  "Basic Information",
  "Property Details",
  "Lease Terms",
  "Financial Terms",
  "Utilities and Services",
  "Pet Policy",
  "Additional Terms"
]

export function QuestionnaireDialog({ mode, questionnaire, onSuccess }: QuestionnaireDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const [name, setName] = useState(questionnaire?.name || "")
  const [description, setDescription] = useState(questionnaire?.description || "")
  const [templateId, setTemplateId] = useState(questionnaire?.templateId || "")
  const [fields, setFields] = useState<Field[]>(questionnaire?.metadata?.fields || [])
  const [currentSection, setCurrentSection] = useState(DEFAULT_SECTIONS[0])
  const [customSection, setCustomSection] = useState("")
  const [sections, setSections] = useState<string[]>(DEFAULT_SECTIONS)
  const [newField, setNewField] = useState<Field>({
    label: "",
    type: "text",
    required: false,
    section: currentSection,
    helpText: "",
    placeholder: "",
  })

  useEffect(() => {
    if (open) {
      fetchTemplates()
    }
  }, [open])

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/admin/templates")
      const data = await response.json()
      setTemplates(data)
    } catch (error) {
      console.error("Error fetching templates:", error)
    }
  }

  const handleAddField = () => {
    if (!newField.label) return
    setFields([...fields, { ...newField, id: crypto.randomUUID() }])
    setNewField({
      label: "",
      type: "text",
      required: false,
      section: currentSection,
      helpText: "",
      placeholder: "",
    })
  }

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const handleAddCustomSection = () => {
    if (!customSection.trim()) return
    setSections([...sections, customSection.trim()])
    setCurrentSection(customSection.trim())
    setCustomSection("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        name,
        description,
        templateId,
        fields
      }

      const url = mode === "add" 
        ? "/api/admin/questionnaires"
        : `/api/admin/questionnaires/${questionnaire?.id}`

      const response = await fetch(url, {
        method: mode === "add" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save questionnaire")
      }

      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error("Error saving questionnaire:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save questionnaire",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === "add" ? "default" : "ghost"} size={mode === "add" ? "default" : "icon"}>
          {mode === "add" ? (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Questions
            </>
          ) : (
            <Edit className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add Questions" : "Edit Questions"}
            </DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? "Add questions to an existing document template."
                : "Update the questions for this template."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter questionnaire name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter questionnaire description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="template">Template</Label>
              <Select value={templateId} onValueChange={setTemplateId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template: any) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label>Section</Label>
                <div className="flex-1 flex gap-2">
                  <Select value={currentSection} onValueChange={setCurrentSection}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>
                          {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new section"
                      value={customSection}
                      onChange={(e) => setCustomSection(e.target.value)}
                      className="w-[200px]"
                    />
                    <Button type="button" variant="outline" onClick={handleAddCustomSection}>
                      Add Section
                    </Button>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Add Question</CardTitle>
                  <CardDescription>Add a new question to the current section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="questionLabel">Question</Label>
                    <Input
                      id="questionLabel"
                      value={newField.label}
                      onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                      placeholder="Enter question text"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="questionType">Type</Label>
                      <Select
                        value={newField.type}
                        onValueChange={(value) => setNewField({ ...newField, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FIELD_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="required">Required</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="required"
                          checked={newField.required}
                          onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                        />
                        <Label htmlFor="required">Make this field required</Label>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="helpText">Help Text</Label>
                    <Input
                      id="helpText"
                      value={newField.helpText}
                      onChange={(e) => setNewField({ ...newField, helpText: e.target.value })}
                      placeholder="Enter help text"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="placeholder">Placeholder</Label>
                    <Input
                      id="placeholder"
                      value={newField.placeholder}
                      onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                      placeholder="Enter placeholder text"
                    />
                  </div>
                  <Button type="button" onClick={handleAddField}>
                    Add Question
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {sections.map((section) => {
                  const sectionFields = fields.filter(field => field.section === section)
                  if (sectionFields.length === 0) return null

                  return (
                    <Card key={section}>
                      <CardHeader>
                        <CardTitle>{section}</CardTitle>
                        <CardDescription>{sectionFields.length} questions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {sectionFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex items-center gap-2 p-2 rounded-lg border bg-muted/40"
                            >
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                              <div className="flex-1">
                                <div className="font-medium">{field.label}</div>
                                <div className="text-sm text-muted-foreground">
                                  {FIELD_TYPES.find(t => t.value === field.type)?.label}
                                  {field.required && " • Required"}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveField(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : mode === "add" ? "Add Questions" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 