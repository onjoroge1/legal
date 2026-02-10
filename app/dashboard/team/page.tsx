"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Mail, Shield, Users, Loader2 } from "lucide-react"
import { toast } from "@/lib/safe-toast"
import TeamMemberCard from "@/components/dashboard/team-member-card"
import TeamInviteModal from "@/components/dashboard/team-invite-modal"

interface TeamMember {
  id: string
  userId: string
  name: string
  email: string
  role: string
  avatar?: string
  initials: string
  joinedAt: string
  isOwner: boolean
}

interface TeamInvitation {
  id: string
  email: string
  role: string
  sentAt: string
  expiresAt: string
  createdAt: string
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [pendingInvitations, setPendingInvitations] = useState<TeamInvitation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchTeamData()
  }, [])

  const fetchTeamData = async () => {
    try {
      setIsLoading(true)
      const [membersResponse, invitationsResponse] = await Promise.all([
        fetch("/api/team/members"),
        fetch("/api/team/invitations"),
      ])

      if (membersResponse.ok) {
        const membersData = await membersResponse.json()
        setTeamMembers(membersData.members || [])
      }

      if (invitationsResponse.ok) {
        const invitationsData = await invitationsResponse.json()
        setPendingInvitations(invitationsData.invitations || [])
      }
    } catch (error) {
      console.error("Error fetching team data:", error)
      toast.error("Failed to load team data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await fetch(`/api/team/members?memberId=${memberId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to remove member")
      }

      toast.success("Member removed successfully")
      await fetchTeamData()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove member")
    }
  }

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    try {
      const response = await fetch("/api/team/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, role: newRole }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update role")
      }

      toast.success("Role updated successfully")
      await fetchTeamData()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update role")
    }
  }

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      const response = await fetch(`/api/team/invitations?invitationId=${invitationId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to cancel invitation")
      }

      toast.success("Invitation cancelled successfully")
      await fetchTeamData()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to cancel invitation")
    }
  }

  const handleResendInvitation = async (invitationId: string) => {
    try {
      const response = await fetch("/api/team/invitations/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to resend invitation")
      }

      toast.success("Invitation resent successfully")
      await fetchTeamData()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to resend invitation")
    }
  }

  // Filter members by search query
  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading team data...</p>
          </div>
        </div>
      </div>
    )
  }

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <TeamInviteModal onInviteSent={fetchTeamData}>
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
              {filteredMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">
                    {searchQuery ? "No team members found matching your search" : "No team members yet"}
                  </p>
                  {!searchQuery && (
                    <TeamInviteModal onInviteSent={fetchTeamData}>
                      <Button className="mt-4" variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite Your First Team Member
                      </Button>
                    </TeamInviteModal>
                  )}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMembers.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      id={member.id}
                      name={member.name}
                      email={member.email}
                      role={member.role}
                      avatar={member.avatar}
                      initials={member.initials}
                      isOwner={member.isOwner}
                      onRemove={() => handleRemoveMember(member.id)}
                      onUpdateRole={(newRole) => handleUpdateRole(member.id, newRole)}
                    />
                  ))}
                </div>
              )}
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
              <p className="text-xs text-muted-foreground">
                Role permissions are predefined. Custom role creation coming soon.
              </p>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResendInvitation(invitation.id)}
                        >
                          Resend
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelInvitation(invitation.id)}
                        >
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
                  <TeamInviteModal onInviteSent={fetchTeamData}>
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

