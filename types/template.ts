export interface TemplateField {
  id: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string | null
  placeholder?: string | null
  options?: string[]
  showIf?: {
    field: string
    value: string | string[] | boolean
  }
} 