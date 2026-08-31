"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Shield, User, Key, Globe } from "lucide-react"
import { toast } from "@/lib/safe-toast"
import { useSession } from "next-auth/react"
import { AvatarUpload } from "@/components/settings/avatar-upload"

interface UserSettings {
  firstName: string
  lastName: string
  company: string
  businessName: string
  businessType: string
  businessId: string
  businessAddress: string
  businessCity: string
  businessState: string
  businessZip: string
  defaultDocumentFormat: "PDF" | "DOCX" | "Both"
  autoSaveEnabled: boolean
  defaultLanguage: string
  timezone: string
  emailNotifications: {
    documentUpdates: boolean
    billingNotifications: boolean
    newFeatures: boolean
    marketingEmails: boolean
  }
  inAppNotifications: {
    documentReminders: boolean
    teamActivity: boolean
  }
  activeSessions: Array<{
    id: string
    deviceName: string
    browser: string
    os: string
    location: string
    lastActive: string
    isCurrent: boolean
  }>
}

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [settings, setSettings] = useState<UserSettings>({
    firstName: "",
    lastName: "",
    company: "",
    businessName: "",
    businessType: "",
    businessId: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessZip: "",
    defaultDocumentFormat: "PDF",
    autoSaveEnabled: true,
    defaultLanguage: "English (US)",
    timezone: "(GMT-08:00) Pacific Time",
    emailNotifications: {
      documentUpdates: true,
      billingNotifications: true,
      newFeatures: true,
      marketingEmails: false
    },
    inAppNotifications: {
      documentReminders: true,
      teamActivity: true
    },
    activeSessions: []
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (!response.ok) throw new Error("Failed to load settings")
        const data = await response.json()
        
        // Parse name from session if available
        const nameParts = session?.user?.name?.split(" ") || []
        const firstName = data.firstName || nameParts[0] || ""
        const lastName = data.lastName || nameParts.slice(1).join(" ") || ""

        setSettings(prev => ({
          ...prev,
          ...data,
          firstName: data.firstName || firstName,
          lastName: data.lastName || lastName,
          // Ensure nested objects are properly set
          emailNotifications: data.emailNotifications || prev.emailNotifications,
          inAppNotifications: data.inAppNotifications || prev.inAppNotifications,
          activeSessions: data.activeSessions || prev.activeSessions,
        }))
        
        // Load avatar URL from session or fetch from user data
        if (session?.user?.image) {
          setAvatarUrl(session.user.image)
        } else {
          // Try to get image from user data if not in session
          try {
            const userResponse = await fetch("/api/user/name")
            if (userResponse.ok) {
              const userData = await userResponse.json()
              if (userData.image) {
                setAvatarUrl(userData.image)
              }
            }
          } catch (error) {
            // Silently fail - avatar is optional
          }
        }
      } catch (error) {
        toast.error("Failed to load settings")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user) {
      loadSettings()
    }
  }, [session])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const editableSettings: Partial<UserSettings> = { ...settings }
      delete editableSettings.activeSessions
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableSettings)
      })
      
      if (!response.ok) throw new Error("Failed to save settings")
      toast.success("Settings saved successfully")
      
      // Update session to reflect name changes (this triggers JWT refresh)
      await updateSession()
      
      // Dispatch custom event to refresh sidebar name
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("userNameUpdated"))
      }
    } catch (error) {
      toast.error("Failed to save settings")
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (section: keyof UserSettings, field: string, value: any) => {
    setSettings(prev => {
      if (typeof prev[section] === 'object' && field && prev[section] !== null && !Array.isArray(prev[section])) {
        return {
          ...prev,
          [section]: { ...(prev[section] as object), [field]: value }
        }
      }
      return {
        ...prev,
        [section]: value
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-1">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-1">
            <Key className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <AvatarUpload
                  currentImage={avatarUrl || undefined}
                  fallback={`${settings.firstName?.[0] || ""}${settings.lastName?.[0] || ""}`}
                  onUploadSuccess={(url) => setAvatarUrl(url)}
                />

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input 
                        id="first-name" 
                        value={settings.firstName} 
                        onChange={(e) => handleChange("firstName", "", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input 
                        id="last-name" 
                        value={settings.lastName}
                        onChange={(e) => handleChange("lastName", "", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={session?.user?.email || ""} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input 
                      id="company" 
                      value={settings.company}
                      onChange={(e) => handleChange("company", "", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details for legal documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input 
                  id="business-name" 
                  value={settings.businessName}
                  onChange={(e) => handleChange("businessName", "", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select 
                    value={settings.businessType}
                    onValueChange={(value) => handleChange("businessType", "", value)}
                  >
                    <SelectTrigger id="business-type">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LLC">LLC (Limited Liability Company)</SelectItem>
                      <SelectItem value="Corporation">Corporation</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                      <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-id">Business ID/EIN</Label>
                  <Input 
                    id="business-id" 
                    value={settings.businessId}
                    onChange={(e) => handleChange("businessId", "", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Input 
                  id="business-address" 
                  value={settings.businessAddress}
                  onChange={(e) => handleChange("businessAddress", "", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-city">City</Label>
                  <Input 
                    id="business-city" 
                    value={settings.businessCity}
                    onChange={(e) => handleChange("businessCity", "", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-state">State</Label>
                  <Input 
                    id="business-state" 
                    value={settings.businessState}
                    onChange={(e) => handleChange("businessState", "", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-zip">ZIP Code</Label>
                  <Input 
                    id="business-zip" 
                    value={settings.businessZip}
                    onChange={(e) => handleChange("businessZip", "", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Update your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Select 
                    value={settings.defaultLanguage}
                    onValueChange={(value) => handleChange("defaultLanguage", "", value)}
                  >
                    <SelectTrigger id="language" className="flex-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English (US)">English (US)</SelectItem>
                      <SelectItem value="English (UK)">English (UK)</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Portuguese">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={settings.timezone}
                  onValueChange={(value) => handleChange("timezone", "", value)}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific Time</SelectItem>
                    <SelectItem value="(GMT-07:00) Mountain Time">(GMT-07:00) Mountain Time</SelectItem>
                    <SelectItem value="(GMT-06:00) Central Time">(GMT-06:00) Central Time</SelectItem>
                    <SelectItem value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</SelectItem>
                    <SelectItem value="(GMT+00:00) London">(GMT+00:00) London</SelectItem>
                    <SelectItem value="(GMT+01:00) Paris">(GMT+01:00) Paris</SelectItem>
                    <SelectItem value="(GMT+09:00) Tokyo">(GMT+09:00) Tokyo</SelectItem>
                    <SelectItem value="(GMT+10:00) Sydney">(GMT+10:00) Sydney</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Document Preferences</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="default-format">Default Document Format</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred document format</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={settings.defaultDocumentFormat === "PDF" ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleChange("defaultDocumentFormat", "", "PDF")}
                    >
                      PDF
                    </Button>
                    <Button 
                      variant={settings.defaultDocumentFormat === "DOCX" ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleChange("defaultDocumentFormat", "", "DOCX")}
                    >
                      DOCX
                    </Button>
                    <Button 
                      variant={settings.defaultDocumentFormat === "Both" ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleChange("defaultDocumentFormat", "", "Both")}
                    >
                      Both
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-save">Auto-save Documents</Label>
                    <p className="text-sm text-muted-foreground">Automatically save document drafts every 5 minutes</p>
                  </div>
                  <Switch 
                    id="auto-save" 
                    checked={settings.autoSaveEnabled}
                    onCheckedChange={(checked) => handleChange("autoSaveEnabled", "", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Document Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when your documents are updated
                    </p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications.documentUpdates}
                    onCheckedChange={(checked) => handleChange("emailNotifications", "documentUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Billing Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your billing and subscription
                    </p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications.billingNotifications}
                    onCheckedChange={(checked) => handleChange("emailNotifications", "billingNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about new features and updates
                    </p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications.newFeatures}
                    onCheckedChange={(checked) => handleChange("emailNotifications", "newFeatures", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive promotional emails and special offers</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications.marketingEmails}
                    onCheckedChange={(checked) => handleChange("emailNotifications", "marketingEmails", checked)}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">In-App Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Document Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about documents that need attention
                    </p>
                  </div>
                  <Switch 
                    checked={settings.inAppNotifications.documentReminders}
                    onCheckedChange={(checked) => handleChange("inAppNotifications", "documentReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Team Activity</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about team member actions</p>
                  </div>
                  <Switch 
                    checked={settings.inAppNotifications.teamActivity}
                    onCheckedChange={(checked) => handleChange("inAppNotifications", "teamActivity", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password"
                  placeholder="Enter current password"
                  value={passwordFields.currentPassword}
                  onChange={(e) => setPasswordFields(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  placeholder="Enter new password (min. 8 characters)"
                  value={passwordFields.newPassword}
                  onChange={(e) => setPasswordFields(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordFields.confirmPassword}
                  onChange={(e) => setPasswordFields(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
                {passwordFields.newPassword && passwordFields.confirmPassword && passwordFields.newPassword !== passwordFields.confirmPassword && (
                  <p className="text-xs text-destructive">Passwords don't match</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline"
                onClick={() => {
                  setPasswordFields({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={async () => {
                  const { currentPassword, newPassword, confirmPassword } = passwordFields

                  if (!currentPassword || !newPassword || !confirmPassword) {
                    toast.error("Please fill in all password fields")
                    return
                  }

                  if (newPassword.length < 8) {
                    toast.error("New password must be at least 8 characters")
                    return
                  }

                  if (newPassword !== confirmPassword) {
                    toast.error("Passwords don't match")
                    return
                  }

                  setIsChangingPassword(true)
                  try {
                    const response = await fetch("/api/settings/password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
                    })

                    if (!response.ok) {
                      const data = await response.json()
                      throw new Error(data.error || "Failed to change password")
                    }

                    toast.success("Password changed successfully")
                    setPasswordFields({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    })
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Failed to change password")
                  } finally {
                    setIsChangingPassword(false)
                  }
                }}
                disabled={isChangingPassword || !passwordFields.currentPassword || !passwordFields.newPassword || !passwordFields.confirmPassword}
              >
                {isChangingPassword ? "Changing Password..." : "Change Password"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active sessions across devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.activeSessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No active sessions found</p>
                  <p className="text-xs mt-2">Active sessions will appear here when you sign in from different devices</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {settings.activeSessions.map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-medium">{session.deviceName}</h3>
                        <p className="text-xs text-muted-foreground">
                          {session.browser} on {session.os} • {session.location} • Last active {session.lastActive}
                        </p>
                      </div>
                      {session.isCurrent ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Current
                        </Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={async () => {
                            try {
                              const response = await fetch("/api/settings/sessions", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ sessionId: session.id }),
                              })

                              if (!response.ok) {
                                const data = await response.json()
                                throw new Error(data.error || "Failed to revoke session")
                              }

                              toast.success("Session revoked")
                              // Reload settings to refresh sessions list
                              const settingsResponse = await fetch("/api/settings")
                              if (settingsResponse.ok) {
                                const settingsData = await settingsResponse.json()
                                setSettings(prev => ({ ...prev, activeSessions: settingsData.activeSessions }))
                              }
                            } catch (error) {
                              toast.error(error instanceof Error ? error.message : "Failed to revoke session")
                            }
                          }}
                        >
                          Sign Out
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {settings.activeSessions.length > 1 && (
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/settings/sessions", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ revokeAll: true }),
                      })

                      if (!response.ok) {
                        const data = await response.json()
                        throw new Error(data.error || "Failed to revoke sessions")
                      }

                      toast.success("All other sessions revoked")
                      // Reload settings to refresh sessions list
                      const settingsResponse = await fetch("/api/settings")
                      if (settingsResponse.ok) {
                        const settingsData = await settingsResponse.json()
                        setSettings(prev => ({ ...prev, activeSessions: settingsData.activeSessions }))
                      }
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Failed to revoke sessions")
                    }
                  }}
                >
                  Sign Out All Other Sessions
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
