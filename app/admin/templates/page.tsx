"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoriesTable } from "./components/categories-table"
import { TemplatesTable } from "./components/templates-table"

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Template Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your document templates and categories
          </p>
        </div>
        <Tabs defaultValue="categories" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="categories" className="space-y-4">
            <CategoriesTable />
          </TabsContent>
          <TabsContent value="templates" className="space-y-4">
            <TemplatesTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 