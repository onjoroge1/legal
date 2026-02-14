"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Share2, Copy, Mail } from "lucide-react"

/**
 * DocumentSharingOptions component
 * Manages document sharing and permissions
 */
export default function DocumentSharingOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Sharing Options
        </CardTitle>
        <CardDescription>Control who can access this document</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="public-link">Public Link</Label>
            <Switch id="public-link" />
          </div>
          <div className="flex gap-2">
            <Input placeholder="Share link..." readOnly />
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Invite by Email</Label>
            <div className="flex gap-2">
              <Input type="email" placeholder="email@example.com" />
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Invite
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}




