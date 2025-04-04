import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Plus, Trash2, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

export interface Field {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "multiselect" | "date" | "currency" | "number"
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options?: string[]
  showIf?: {
    field: string
    value: string | string[] | boolean
  }
}

interface FieldEditorProps {
  fields: Field[]
  onChange: (fields: Field[]) => void
}

export function FieldEditor({ fields, onChange }: FieldEditorProps) {
  const [sections, setSections] = useState<string[]>(
    Array.from(new Set(fields.map((f) => f.section)))
  )
  const [newSection, setNewSection] = useState("")

  const addField = (section: string) => {
    const newField: Field = {
      id: `field-${Date.now()}`,
      label: "",
      type: "text",
      required: false,
      section,
    }
    onChange([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<Field>) => {
    onChange(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    )
  }

  const deleteField = (id: string) => {
    onChange(fields.filter((field) => field.id !== id))
  }

  const addSection = () => {
    if (newSection && !sections.includes(newSection)) {
      setSections([...sections, newSection])
      setNewSection("")
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(fields)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onChange(items)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
          placeholder="New section name"
        />
        <Button onClick={addSection} disabled={!newSection}>
          Add Section
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section) => (
                <div key={section} className="space-y-2">
                  <h3 className="font-medium">{section}</h3>
                  {fields
                    .filter((f) => f.section === section)
                    .map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="p-4 border rounded-lg space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="h-4 w-4" />
                              </div>
                              <Input
                                value={field.label}
                                onChange={(e) =>
                                  updateField(field.id, { label: e.target.value })
                                }
                                placeholder="Field label"
                              />
                              <Select
                                value={field.type}
                                onValueChange={(value) =>
                                  updateField(field.id, { type: value as any })
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Field type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Text</SelectItem>
                                  <SelectItem value="textarea">Text Area</SelectItem>
                                  <SelectItem value="select">Select</SelectItem>
                                  <SelectItem value="multiselect">
                                    Multi Select
                                  </SelectItem>
                                  <SelectItem value="date">Date</SelectItem>
                                  <SelectItem value="currency">Currency</SelectItem>
                                  <SelectItem value="number">Number</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteField(field.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {(field.type === "select" ||
                              field.type === "multiselect") && (
                              <div className="space-y-2">
                                <Label>Options (one per line)</Label>
                                <Textarea
                                  value={field.options?.join("\n") || ""}
                                  onChange={(e) =>
                                    updateField(field.id, {
                                      options: e.target.value
                                        .split("\n")
                                        .filter((opt) => opt.trim()),
                                    })
                                  }
                                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                                />
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <Input
                                value={field.helpText || ""}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    helpText: e.target.value,
                                  })
                                }
                                placeholder="Help text"
                              />
                              <Input
                                value={field.placeholder || ""}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    placeholder: e.target.value,
                                  })
                                }
                                placeholder="Placeholder text"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`required-${field.id}`}
                                  checked={field.required}
                                  onChange={(e) =>
                                    updateField(field.id, {
                                      required: e.target.checked,
                                    })
                                  }
                                />
                                <Label htmlFor={`required-${field.id}`}>
                                  Required
                                </Label>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addField(section)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Field
                  </Button>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
} 