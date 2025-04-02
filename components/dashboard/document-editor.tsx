"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DocumentEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function DocumentEditor({ content, onChange }: DocumentEditorProps) {
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [activeTab, setActiveTab] = useState("editor")
  const { toast } = useToast()

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description of what you need the AI to generate.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      // Simulate AI generation with a delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate content based on the prompt
      // In a real app, this would call an AI API
      const sampleGeneratedContent = generateSampleContent(aiPrompt)

      // Simulate streaming effect
      let displayedContent = ""
      const contentArray = sampleGeneratedContent.split("")

      for (let i = 0; i < contentArray.length; i++) {
        displayedContent += contentArray[i]
        setGeneratedContent(displayedContent)
        // Add a small delay between characters for a typing effect
        await new Promise((resolve) => setTimeout(resolve, 5))
      }

      toast({
        title: "Content generated",
        description: "AI has successfully generated document content based on your prompt.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const applyGeneratedContent = () => {
    onChange(generatedContent)
    setActiveTab("editor")
    toast({
      title: "Content applied",
      description: "AI-generated content has been applied to your document.",
    })
  }

  const discardGeneratedContent = () => {
    setGeneratedContent("")
    setAiPrompt("")
    toast({
      description: "AI-generated content has been discarded.",
    })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="editor">Document Editor</TabsTrigger>
        <TabsTrigger value="ai-assistant" className="gap-2">
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </TabsTrigger>
      </TabsList>

      <TabsContent value="editor" className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <Button variant="ghost" size="sm">
            <Bold className="h-4 w-4" />
            <span className="sr-only">Bold</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italic</span>
          </Button>
          <Button variant="ghost" size="sm">
            <List className="h-4 w-4" />
            <span className="sr-only">Bullet List</span>
          </Button>
          <Button variant="ghost" size="sm">
            <ListOrdered className="h-4 w-4" />
            <span className="sr-only">Numbered List</span>
          </Button>
          <Button variant="ghost" size="sm">
            <AlignLeft className="h-4 w-4" />
            <span className="sr-only">Align Left</span>
          </Button>
          <Button variant="ghost" size="sm">
            <AlignCenter className="h-4 w-4" />
            <span className="sr-only">Align Center</span>
          </Button>
          <Button variant="ghost" size="sm">
            <AlignRight className="h-4 w-4" />
            <span className="sr-only">Align Right</span>
          </Button>
        </div>
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[500px] font-mono text-sm"
        />
        <div className="flex justify-end">
          <Button variant="outline" className="gap-2" onClick={() => setActiveTab("ai-assistant")}>
            <Sparkles className="h-4 w-4" />
            Use AI to Generate
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="ai-assistant">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Document Assistant
            </CardTitle>
            <CardDescription>
              Describe what you need and our AI will generate a professional legal document for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="ai-prompt" className="text-sm font-medium">
                What kind of document do you need?
              </label>
              <Textarea
                id="ai-prompt"
                placeholder="E.g., I need a consulting agreement for a marketing consultant who will work for my company for 6 months. The consultant will be paid $5,000 per month and will provide 20 hours of service per week..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[120px]"
                disabled={isGenerating}
              />
              <p className="text-xs text-muted-foreground">
                Be specific about the parties involved, terms, conditions, payment details, and any special clauses you
                need.
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleAiGenerate} disabled={isGenerating || !aiPrompt.trim()} className="gap-2">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Document
                  </>
                )}
              </Button>
            </div>

            {(isGenerating || generatedContent) && (
              <div className="border rounded-md p-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Generated Content</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={applyGeneratedContent} className="gap-2">
                      <Check className="h-4 w-4" />
                      Apply
                    </Button>
                    <Button variant="ghost" size="sm" onClick={discardGeneratedContent} className="gap-2">
                      <X className="h-4 w-4" />
                      Discard
                    </Button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{generatedContent}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function generateSampleContent(prompt: string): string {
  // This is a placeholder function that would be replaced with actual AI generation
  return `# Generated Legal Document

Based on your prompt: "${prompt}"

This is a sample generated document. In a real implementation, this would be generated by an AI model based on your specific requirements.

## Section 1
Sample content for section 1...

## Section 2
Sample content for section 2...

## Section 3
Sample content for section 3...`
}

