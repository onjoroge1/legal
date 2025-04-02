import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Mail, Shield, Users } from "lucide-react"
import type { Metadata } from "next"
import TeamMemberCard from "@/components/dashboard/team-member-card"
import TeamInviteModal from "@/components/dashboard/team-invite-modal"

export const metadata: Metadata = {
  title: "Team Collaboration | LegalLawDocs.com",
  description: "Manage your team and collaborate on legal documents",
}

export default function TeamPage() {
  // Team members data
  const teamMembers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      lastActive: "Just now",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Editor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Viewer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      lastActive: "Yesterday",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Editor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
      lastActive: "3 days ago",
    },
  ]

  // Pending invitations
  const pendingInvitations = [
    {
      id: "1",
      email: "david.wilson@example.com",
      role: "Editor",
      sentAt: "2 days ago",
    },
    {
      id: "2",
      email: "jennifer.lee@example.com",
      role: "Viewer",
      sentAt: "1 week ago",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Collaboration</h1>
          <p className="text-muted-foreground">Manage your team members and collaborate on legal documents</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search team members..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <TeamInviteModal>
            <Button className="gap-1">
              <UserPlus className="h-4 w-4" />
              Invite Team Member
            </Button>
          </TeamInviteModal>
        </div>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members" className="gap-1">
            <Users className="h-4 w-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-1">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-1">
            <Mail className="h-4 w-4" />
            Invitations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their access levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    name={member.name}
                    email={member.email}
                    role={member.role}
                    avatar={member.avatar}
                    initials={member.initials}
                    lastActive={member.lastActive}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Configure what each role can do in your workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-3 border-b">
                    <h3 className="text-sm font-medium">Admin Role</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Admins have full access to all documents and can manage team members and billing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Create and edit documents</span>
                        <Badge>Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Delete documents</span>
                        <Badge>Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Invite team members</span>
                        <Badge>Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Manage billing</span>
                        <Badge>Allowed</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-3 border-b">
                    <h3 className="text-sm font-medium">Editor Role</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Editors can create and edit documents but cannot manage team members or billing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Create and edit documents</span>
                        <Badge>Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Delete documents</span>
                        <Badge variant="outline">Limited</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Invite team members</span>
                        <Badge variant="destructive">Not Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Manage billing</span>
                        <Badge variant="destructive">Not Allowed</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-3 border-b">
                    <h3 className="text-sm font-medium">Viewer Role</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Viewers can only view documents but cannot edit or delete them.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Create and edit documents</span>
                        <Badge variant="destructive">Not Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Delete documents</span>
                        <Badge variant="destructive">Not Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Invite team members</span>
                        <Badge variant="destructive">Not Allowed</Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <span className="text-sm">Manage billing</span>
                        <Badge variant="destructive">Not Allowed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Customize Roles</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>Track and manage your sent invitations</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingInvitations.length > 0 ? (
                <div className="space-y-4">
                  {pendingInvitations.map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {invitation.email.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{invitation.email}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Role: {invitation.role}</span>
                            <span>•</span>
                            <span>Sent {invitation.sentAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No pending invitations</h3>
                  <p className="text-muted-foreground mb-4">You haven't sent any invitations yet.</p>
                  <TeamInviteModal>
                    <Button>Invite Team Member</Button>
                  </TeamInviteModal>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

