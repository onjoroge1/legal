"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Copy, Link2, Mail, Globe, Lock, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DocumentSharingOptions() {
  const [shareLink, setShareLink] = useState("https://legallawdocs.com/d/abc123")
  const [accessLevel, setAccessLevel] = useState("restricted")
  const [allowComments, setAllowComments] = useState(true)
  const [allowEditing, setAllowEditing] = useState(false)

  // People with access
  const peopleWithAccess = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
      role: "Owner",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
      role: "Editor",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
      role: "Viewer",
    },
  ]

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
    // Would add toast notification in real app
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="access-level">Access Level</Label>
          <Select value={accessLevel} onValueChange={setAccessLevel}>
            <SelectTrigger id="access-level" className="w-[180px]">
              <SelectValue placeholder="Select access level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restricted">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Restricted</span>
                </div>
              </SelectItem>
              <SelectItem value="anyone-with-link">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  <span>Anyone with link</span>
                </div>
              </SelectItem>
              <SelectItem value="public">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Public</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="allow-comments" checked={allowComments} onCheckedChange={setAllowComments} />
          <Label htmlFor="allow-comments">Allow comments</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="allow-editing" checked={allowEditing} onCheckedChange={setAllowEditing} />
          <Label htmlFor="allow-editing">Allow editing</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="share-link">Share Link</Label>
        <div className="flex gap-2">
          <Input id="share-link" value={shareLink} readOnly className="flex-1" />
          <Button variant="outline" size="icon" onClick={copyShareLink}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>People with access</Label>
          <Button variant="outline" size="sm" className="gap-1">
            <UserPlus className="h-4 w-4" />
            Add People
          </Button>
        </div>

        <div className="space-y-3">
          {peopleWithAccess.map((person) => (
            <div key={person.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  {person.avatar && <AvatarImage src={person.avatar} alt={person.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{person.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {person.role === "Owner" ? (
                  <Badge>Owner</Badge>
                ) : (
                  <Select defaultValue={person.role.toLowerCase()}>
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="remove" className="text-red-500">
                        Remove
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <Button className="w-full gap-1">
          <Mail className="h-4 w-4" />
          Send Invitation Email
        </Button>
      </div>
    </div>
  )
}

