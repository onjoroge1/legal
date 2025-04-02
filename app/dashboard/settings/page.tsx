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
import { Bell, Shield, User, Key, Globe } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

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
  twoFactorEnabled: boolean
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
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
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
    twoFactorEnabled: false,
    activeSessions: []
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (!response.ok) throw new Error("Failed to load settings")
        const data = await response.json()
        setSettings(prev => ({
          ...prev,
          ...data
        }))
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
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      })
      
      if (!response.ok) throw new Error("Failed to save settings")
      toast.success("Settings saved successfully")
    } catch (error) {
      toast.error("Failed to save settings")
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (section: keyof UserSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && field
        ? { ...prev[section], [field]: value }
        : value
    }))
  }

  if (isLoading) {
    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">Loading...</div>
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
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={session?.user?.image || "/placeholder.svg"} alt="Profile picture" />
                    <AvatarFallback>{settings.firstName?.[0]}{settings.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

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
              <Button variant="outline" onClick={() => setSettings(prev => ({ ...prev }))}>Cancel</Button>
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
                  <Input 
                    id="business-type" 
                    value={settings.businessType}
                    onChange={(e) => handleChange("businessType", "", e.target.value)}
                  />
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
              <Button variant="outline" onClick={() => setSettings(prev => ({ ...prev }))}>Cancel</Button>
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
                  <Input 
                    id="language" 
                    value={settings.defaultLanguage}
                    onChange={(e) => handleChange("defaultLanguage", "", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input 
                  id="timezone" 
                  value={settings.timezone}
                  onChange={(e) => handleChange("timezone", "", e.target.value)}
                />
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
              <Button variant="outline" onClick={() => setSettings(prev => ({ ...prev }))}>Cancel</Button>
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
              <Button variant="outline" onClick={() => setSettings(prev => ({ ...prev }))}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require a verification code when signing in</p>
                </div>
                <Switch 
                  checked={settings.twoFactorEnabled}
                  onCheckedChange={(checked) => handleChange("twoFactorEnabled", "", checked)}
                />
              </div>

              <div className="rounded-md border p-4 bg-muted/50">
                <h3 className="text-sm font-medium mb-2">How Two-Factor Authentication Works</h3>
                <p className="text-sm text-muted-foreground">
                  When you sign in, you'll need to provide both your password and a verification code from your mobile
                  device. This adds an extra layer of security to your account.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {settings.twoFactorEnabled ? "Set Up Two-Factor Authentication" : "Enable Two-Factor Authentication"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active sessions across devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {settings.activeSessions.map((session: any) => (
                  <div key={session.id} className="flex items-center justify-between border-b pb-4">
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
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Sign Out All Other Sessions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

