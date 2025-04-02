import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { ArrowLeft, MessageSquare, History, Share2, UserPlus, Eye, Edit, Save } from "lucide-react"
import Link from "next/link"
import DocumentComments from "@/components/dashboard/document-comments"
import DocumentHistory from "@/components/dashboard/document-history"
import DocumentCollaborationEditor from "@/components/dashboard/document-collaboration-editor"
import DocumentSharingOptions from "@/components/dashboard/document-sharing-options"

interface DocumentCollaboratePageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: DocumentCollaboratePageProps): Metadata {
  return {
    title: `Collaborate on Document | LegalLawDocs.com`,
    description: `Collaborate with your team on this legal document`,
  }
}

export default function DocumentCollaboratePage({ params }: DocumentCollaboratePageProps) {
  const documentId = params.id

  // Active collaborators (would come from a real-time service in production)
  const activeCollaborators = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
      status: "editing",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
      status: "viewing",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Service Agreement</h1>
            <p className="text-muted-foreground">Collaborative editing mode</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {activeCollaborators.map((user) => (
              <div key={user.id} className="relative">
                <Avatar className="h-8 w-8 border-2 border-background">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{user.initials}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                    user.status === "editing" ? "bg-green-500" : "bg-blue-500"
                  }`}
                />
              </div>
            ))}
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-dashed">
              <UserPlus className="h-3 w-3" />
              <span className="sr-only">Add collaborator</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-0">
              <DocumentCollaborationEditor />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="comments" className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="comments">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2">Comments</span>
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2">History</span>
              </TabsTrigger>
              <TabsTrigger value="sharing">
                <Share2 className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2">Sharing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Comments</CardTitle>
                  <CardDescription>Discuss this document with your team</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <DocumentComments />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Version History</CardTitle>
                  <CardDescription>Track changes to this document</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <DocumentHistory />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sharing">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Sharing Options</CardTitle>
                  <CardDescription>Manage who can access this document</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <DocumentSharingOptions />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Active Collaborators</CardTitle>
              <CardDescription>Team members currently viewing this document</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {activeCollaborators.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{user.initials}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                          user.status === "editing" ? "bg-green-500" : "bg-blue-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.status === "editing" ? "Editing" : "Viewing"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={user.status === "editing" ? "default" : "secondary"}>
                    {user.status === "editing" ? <Edit className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                    {user.status === "editing" ? "Editing" : "Viewing"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

