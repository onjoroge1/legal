"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/lib/safe-toast"
// Using regular img tag for data URLs

interface TwoFactorSetupProps {
  isEnabled: boolean
  onSetupComplete: () => void
  onDisable: () => void
}

/**
 * Two-factor authentication setup component
 */
export function TwoFactorSetup({ isEnabled, onSetupComplete, onDisable }: TwoFactorSetupProps) {
  const [isSetupOpen, setIsSetupOpen] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isDisabling, setIsDisabling] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [disableCode, setDisableCode] = useState("")

  const handleSetup = async () => {
    try {
      const response = await fetch("/api/settings/2fa/setup", {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to setup 2FA")
      }

      const data = await response.json()
      setQrCode(data.qrCode)
      setSecret(data.secret)
      setIsSetupOpen(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to setup 2FA")
    }
  }

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit verification code")
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch("/api/settings/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verificationCode }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to verify 2FA")
      }

      toast.success("2FA enabled successfully")
      setIsSetupOpen(false)
      setVerificationCode("")
      setQrCode(null)
      setSecret(null)
      onSetupComplete()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to verify 2FA")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleDisable = async () => {
    if (!disableCode || disableCode.length !== 6) {
      toast.error("Please enter a 6-digit verification code")
      return
    }

    setIsDisabling(true)
    try {
      const response = await fetch("/api/settings/2fa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: disableCode }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to disable 2FA")
      }

      toast.success("2FA disabled successfully")
      setDisableCode("")
      onDisable()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to disable 2FA")
    } finally {
      setIsDisabling(false)
    }
  }

  if (isEnabled) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border p-4 bg-green-50 border-green-200">
          <p className="text-sm font-medium text-green-800 mb-2">Two-Factor Authentication is enabled</p>
          <p className="text-sm text-green-700">
            Your account is protected with two-factor authentication. You'll need to provide a verification code when signing in.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="disable-code">Enter verification code to disable 2FA</Label>
          <Input
            id="disable-code"
            type="text"
            placeholder="000000"
            maxLength={6}
            value={disableCode}
            onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <Button variant="destructive" onClick={handleDisable} disabled={isDisabling || !disableCode}>
          {isDisabling ? "Disabling..." : "Disable 2FA"}
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button onClick={handleSetup}>Set Up Two-Factor Authentication</Button>
      
      <Dialog open={isSetupOpen} onOpenChange={setIsSetupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {qrCode && (
              <div className="flex justify-center">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>
            )}
            
            {secret && (
              <div className="rounded-md border p-3 bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Manual entry code:</p>
                <code className="text-sm font-mono">{secret}</code>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="verification-code">Enter verification code</Label>
              <Input
                id="verification-code"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSetupOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerify} disabled={isVerifying || !verificationCode}>
              {isVerifying ? "Verifying..." : "Verify & Enable"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

