"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, ChevronDown, ChevronRight } from "lucide-react"
import { QuestionnaireDialog } from "./questionnaire-dialog"
import { useToast } from "@/components/ui/use-toast"
import React from "react"

interface Category {
  id: string
  name: string
  description?: string
}

interface Question {
  id: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
}

interface Template {
  id: string
  name: string
  category: Category
}

interface Questionnaire {
  id: string
  name: string
  description?: string
  templateId: string
  template?: {
    category?: Category
  }
  metadata?: {
    fields: any[]
  }
  questions?: Question[]
  createdAt: string
  updatedAt: string
}

export function QuestionnairesTable() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedQuestionnaires, setExpandedQuestionnaires] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedQuestionnaires)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedQuestionnaires(newExpanded)
  }

  const groupQuestionsBySection = (questions: Question[] = []) => {
    return questions.reduce((acc, question) => {
      const section = question.section || 'Other'
      if (!acc[section]) {
        acc[section] = []
      }
      acc[section].push(question)
      return acc
    }, {} as Record<string, Question[]>)
  }

  const fetchQuestionnaires = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/questionnaires")
      
      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: "Authentication Error",
            description: "Please sign in to access this page.",
            variant: "destructive",
          })
          return
        }
        throw new Error("Failed to fetch questionnaires")
      }

      const data = await response.json()
      setQuestionnaires(data)
    } catch (error) {
      console.error("Error fetching questionnaires:", error)
      setError("Failed to load questionnaires. Please try again.")
      toast({
        title: "Error",
        description: "Failed to load questionnaires. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestionnaires()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this questionnaire? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/questionnaires/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete questionnaire")
      }

      toast({
        title: "Success",
        description: "Questionnaire deleted successfully.",
      })
      fetchQuestionnaires()
    } catch (error) {
      console.error("Error deleting questionnaire:", error)
      toast({
        title: "Error",
        description: "Failed to delete questionnaire. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Questionnaires</h2>
        <QuestionnaireDialog mode="add" onSuccess={fetchQuestionnaires} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : questionnaires.length === 0 ? (
        <div className="text-center text-gray-500">No questionnaires found</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionnaires.map((questionnaire) => (
              <React.Fragment key={questionnaire.id}>
                <TableRow className="cursor-pointer hover:bg-muted/50">
                  <TableCell onClick={() => toggleExpand(questionnaire.id)}>
                    {expandedQuestionnaires.has(questionnaire.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{questionnaire.name}</TableCell>
                  <TableCell>{questionnaire.template?.category?.name || "Uncategorized"}</TableCell>
                  <TableCell>{questionnaire.description || "No description"}</TableCell>
                  <TableCell>
                    {new Date(questionnaire.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <QuestionnaireDialog
                        mode="edit"
                        questionnaire={questionnaire}
                        onSuccess={fetchQuestionnaires}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(questionnaire.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedQuestionnaires.has(questionnaire.id) && questionnaire.questions && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/50">
                      <div className="py-4">
                        {Object.entries(groupQuestionsBySection(questionnaire.questions)).map(([section, questions]) => (
                          <div key={section} className="mb-4 last:mb-0">
                            <h3 className="font-semibold text-sm mb-2">{section}</h3>
                            <ul className="space-y-2 pl-4">
                              {questions.map((question) => (
                                <li key={question.id} className="text-sm">
                                  <span className="text-muted-foreground">{question.label}</span>
                                  {question.required && (
                                    <span className="text-destructive ml-1">*</span>
                                  )}
                                  {question.helpText && (
                                    <span className="text-muted-foreground ml-2 text-xs">
                                      ({question.helpText})
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
} 