"use client"

import { QuestionnairesTable } from "../templates/components/questionnaires-table"

export default function QuestionnairesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Questionnaire Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage questionnaires for document templates
          </p>
        </div>
        <QuestionnairesTable />
      </div>
    </div>
  )
} 