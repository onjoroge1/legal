# Permissions & Subscription Management System

This document explains how the permission system works and how to manage user subscriptions.

## Overview

The system provides:
- **Feature-based permissions** for each subscription tier
- **Plan management** (upgrade/downgrade/cancel)
- **Permission checks** before allowing actions
- **React hooks** for client-side permission checks
- **API endpoints** for server-side permission validation

## Subscription Tiers

### Free Plan
- ✅ Preview documents (watermarked)
- ✅ Access basic templates
- ❌ Generate documents
- ❌ Download documents
- ❌ AI review
- ❌ Collaboration

### Starter Plan ($9 per document)
- ✅ Generate single documents
- ✅ Access all templates
- ✅ Download PDF & DOCX
- ✅ Basic AI review
- ✅ Email support
- ✅ Basic customization
- ✅ Document history
- ❌ Unlimited generation (pay per document)
- ❌ Priority AI review
- ❌ Collaboration
- ❌ Custom branding

### Professional Plan ($49/month)
- ✅ Unlimited document generation
- ✅ Access all templates
- ✅ Download PDF & DOCX
- ✅ Priority AI review
- ✅ Priority support
- ✅ Advanced customization
- ✅ Custom branding
- ✅ Collaboration
- ✅ Electronic signatures
- ✅ Document revision history

## Usage Examples

### Server-Side Permission Checks

```typescript
import { getUserPermissions, canPerformAction } from "@/lib/permissions"

// Get all permissions
const permissions = await getUserPermissions(userEmail)

// Check specific action
const canGenerate = await canPerformAction(userEmail, "generate")

// Check template access
const canAccess = await canAccessTemplate(userEmail, "advanced")
```

### Client-Side Permission Checks

```typescript
import { usePermissions, useCanPerformAction } from "@/hooks/use-permissions"

// Get all permissions
function MyComponent() {
  const { permissions, isLoading } = usePermissions()
  
  if (permissions?.canGenerateDocuments) {
    // Show generate button
  }
}

// Check specific action
function GenerateButton() {
  const { allowed, isLoading } = useCanPerformAction("generate")
  
  if (!allowed) {
    return <UpgradePrompt />
  }
  
  return <Button>Generate Document</Button>
}
```

### Using PermissionGate Component

```tsx
import { PermissionGate } from "@/components/permissions/permission-gate"

<PermissionGate action="generate">
  <Button>Generate Document</Button>
</PermissionGate>

// With custom fallback
<PermissionGate 
  action="generate" 
  fallback={<CustomUpgradeMessage />}
>
  <Button>Generate Document</Button>
</PermissionGate>
```

### API Permission Checks

```typescript
// Check permissions via API
const response = await fetch("/api/permissions/check?action=generate")
const { allowed, permissions } = await response.json()

// Check template access
const response = await fetch("/api/permissions/check?templateType=advanced")
const { allowed } = await response.json()
```

## Plan Management

### Upgrade Plan

```typescript
import { upgradePlan } from "@/lib/subscription-management"

const result = await upgradePlan(userEmail, "professional")
if (result.success) {
  console.log(result.message) // "Successfully upgraded to professional plan"
}
```

### Downgrade Plan

```typescript
import { downgradePlan } from "@/lib/subscription-management"

const result = await downgradePlan(userEmail, "free")
if (result.success) {
  console.log(result.message)
}
```

### Change Plan (Auto-detect upgrade/downgrade)

```typescript
import { changePlan } from "@/lib/subscription-management"

const result = await changePlan(userEmail, "professional")
```

### Cancel Subscription

```typescript
import { cancelSubscription } from "@/lib/subscription-management"

const result = await cancelSubscription(userEmail)
```

### Via API

```typescript
// Change plan
const response = await fetch("/api/subscription/change", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ tier: "professional" }),
})

// Upgrade specifically
const response = await fetch("/api/subscription/change", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ tier: "professional", action: "upgrade" }),
})
```

## Document Generation Permission Check

```typescript
import { canGenerateDocument } from "@/lib/subscription-management"

// Before allowing document generation
const check = await canGenerateDocument(userEmail)
if (!check.allowed) {
  return {
    error: check.reason,
    upgradeMessage: check.upgradeMessage,
  }
}

// Proceed with generation
```

## Integration Points

### 1. Document Generation Page

```tsx
// app/documents/[slug]/generate/page.tsx
import { PermissionGate } from "@/components/permissions/permission-gate"

export default function GeneratePage() {
  return (
    <PermissionGate action="generate">
      <DocumentGenerator />
    </PermissionGate>
  )
}
```

### 2. Download Page

```tsx
// app/documents/[slug]/download/page.tsx
import { canPerformAction } from "@/lib/permissions"

export default async function DownloadPage() {
  const session = await getServerSession(authOptions)
  const canDownload = await canPerformAction(session?.user?.email, "download")
  
  if (!canDownload) {
    redirect("/dashboard/billing")
  }
  
  // Show download options
}
```

### 3. Template Access

```tsx
// app/dashboard/templates/page.tsx
import { usePermissions } from "@/hooks/use-permissions"

export default function TemplatesPage() {
  const { permissions } = usePermissions()
  
  const templates = allTemplates.filter(template => {
    if (template.type === "basic") return permissions?.canAccessBasicTemplates
    if (template.type === "advanced") return permissions?.canAccessAdvancedTemplates
    return true
  })
  
  return <TemplateGrid templates={templates} />
}
```

## API Endpoints

### Check Permissions
- `GET /api/permissions/check` - Get all permissions
- `GET /api/permissions/check?action=generate` - Check specific action
- `GET /api/permissions/check?templateType=advanced` - Check template access
- `GET /api/permissions/check?permission=canGenerateDocuments` - Check specific permission

### Manage Subscription
- `POST /api/subscription/change` - Change plan (auto-detect upgrade/downgrade)
- `POST /api/payment/create-checkout` - Create checkout (uses changePlan internally)
- `POST /api/billing/cancel` - Cancel subscription

## Permission Flow

1. **User Action** → Check permission
2. **Permission Check** → Query user's subscription tier
3. **Get Permissions** → Return tier-specific permissions
4. **Action Decision** → Allow or show upgrade prompt

## Upgrade/Downgrade Flow

### Upgrade
1. User clicks "Upgrade" button
2. API call to `/api/payment/create-checkout` or `/api/subscription/change`
3. `upgradePlan()` function updates database
4. User's permissions are immediately updated
5. User can now access new features

### Downgrade
1. User clicks "Downgrade" or "Cancel"
2. API call to `/api/billing/cancel` or `/api/subscription/change`
3. `downgradePlan()` function updates database
4. If downgrading from Professional, access continues until end of billing period
5. If downgrading to Free, access is removed immediately

## Best Practices

1. **Always check permissions** before allowing actions
2. **Show upgrade prompts** when users try to access restricted features
3. **Cache permissions** on client-side to reduce API calls
4. **Validate on server-side** even if client-side checks pass
5. **Provide clear upgrade messages** explaining what users get

## Testing Permissions

```typescript
// Test free tier
const freePerms = getPermissionsForTier("free")
console.log(freePerms.canGenerateDocuments) // false

// Test starter tier
const starterPerms = getPermissionsForTier("starter")
console.log(starterPerms.canGenerateDocuments) // true

// Test professional tier
const proPerms = getPermissionsForTier("professional")
console.log(proPerms.canCollaborate) // true
```




