"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

interface TemplateVariable {
  name: string
  type: string
  label: string
  required: boolean
  options?: string[]
}

interface TemplatePreviewProps {
  template: {
    id: string
    name: string
    content: string
    variables: TemplateVariable[]
  }
}

interface AnalysisResult {
  content: string
  analysis: string
  suggestions: {
    criticalClauses: string[]
    risks: string[]
    customizations: string[]
    compliance: string[]
    improvements: string[]
  }
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const [variables, setVariables] = useState<Record<string, string>>({})
  const [preview, setPreview] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }))
  }

  const handlePreview = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/templates/${template.id}/render`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variables })
      })
      const result = await response.json()
      setPreview(result)
    } catch (error) {
      console.error('Failed to render template:', error)
    } finally {
      setLoading(false)
    }
  }

  // Function to get current content with any filled variables
  const getCurrentContent = () => {
    let content = template.content
    Object.entries(variables).forEach(([key, value]) => {
      if (value) {
        content = content.replace(new RegExp(`{{${key}}}`, 'g'), value)
      }
    })
    return content
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Template Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {template.variables.map((variable) => (
              <div key={variable.name} className="space-y-2">
                <Label htmlFor={variable.name}>
                  {variable.label}
                  {variable.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {variable.type === 'select' && variable.options ? (
                  <select
                    id={variable.name}
                    value={variables[variable.name] || ''}
                    onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select {variable.label}</option>
                    {variable.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={variable.name}
                    type={variable.type}
                    value={variables[variable.name] || ''}
                    onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    required={variable.required}
                    placeholder={`Enter ${variable.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
            <Button 
              onClick={handlePreview} 
              disabled={loading || Object.keys(variables).length === 0}
              className="w-full"
            >
              {loading ? 'Generating Analysis...' : 'Generate Analysis'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview & Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-6">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">
                  {getCurrentContent()}
                </pre>
              </div>

              {preview && (
                <div className="space-y-4 mt-8">
                  <h3 className="text-lg font-semibold">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">{preview.analysis}</p>

                  {preview.suggestions.criticalClauses.length > 0 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Critical Clauses</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-4">
                          {preview.suggestions.criticalClauses.map((clause, i) => (
                            <li key={i}>{clause}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {preview.suggestions.risks.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Potential Risks</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-4">
                          {preview.suggestions.risks.map((risk, i) => (
                            <li key={i}>{risk}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {preview.suggestions.customizations.length > 0 && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Suggested Customizations</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-4">
                          {preview.suggestions.customizations.map((custom, i) => (
                            <li key={i}>{custom}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {preview.suggestions.improvements.length > 0 && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Suggested Improvements</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-4">
                          {preview.suggestions.improvements.map((improvement, i) => (
                            <li key={i}>{improvement}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
} 