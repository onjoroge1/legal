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
import { Trash2 } from "lucide-react"
import { QuestionnaireDialog } from "./questionnaire-dialog"
import { useToast } from "@/components/ui/use-toast"

interface Questionnaire {
  id: string
  name: string
  description: string | null
  questions: any[]
  templateId: string
  template: {
    id: string
    name: string
    category: {
      id: string
      name: string
    }
  }
  createdAt: string
}

export function QuestionnairesTable() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

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
        <div>
          <h2 className="text-2xl font-bold">Questionnaires</h2>
          <p className="text-muted-foreground">
            Manage your document questionnaires
          </p>
        </div>
        <QuestionnaireDialog mode="add" onSuccess={fetchQuestionnaires} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : questionnaires.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">No questionnaires found</p>
                    <p className="text-sm text-muted-foreground">Create your first questionnaire to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              questionnaires.map((questionnaire) => (
                <TableRow key={questionnaire.id}>
                  <TableCell className="font-medium">{questionnaire.name}</TableCell>
                  <TableCell>{questionnaire.template.name}</TableCell>
                  <TableCell>{questionnaire.template.category.name}</TableCell>
                  <TableCell>{questionnaire.description || "No description"}</TableCell>
                  <TableCell>
                    {new Date(questionnaire.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <QuestionnaireDialog
                        mode="edit"
                        questionnaire={{
                          id: questionnaire.id,
                          name: questionnaire.name,
                          description: questionnaire.description || undefined,
                          templateId: questionnaire.templateId,
                          questions: questionnaire.questions,
                        }}
                        onSuccess={fetchQuestionnaires}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(questionnaire.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 