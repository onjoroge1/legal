# Permissions System - Quick Start Guide

## Overview

The permissions system controls what users can do based on their subscription tier:
- **Free**: Preview only, basic templates
- **Starter**: Generate documents ($9 per document)
- **Professional**: Unlimited generation ($49/month)

## Quick Examples

### 1. Protect a Feature with PermissionGate

```tsx
import { PermissionGate } from "@/components/permissions/permission-gate"

<PermissionGate action="generate">
  <GenerateButton />
</PermissionGate>
```

### 2. Check Permission in Component

```tsx
import { useCanPerformAction } from "@/hooks/use-permissions"

function MyComponent() {
  const { allowed, isLoading } = useCanPerformAction("generate")
  
  if (!allowed) {
    return <UpgradePrompt />
  }
  
  return <GenerateButton />
}
```

### 3. Server-Side Permission Check

```typescript
import { canGenerateDocument } from "@/lib/subscription-management"

const check = await canGenerateDocument(userEmail)
if (!check.allowed) {
  return { error: check.reason }
}
```

### 4. Change User Plan

```typescript
import { changePlan } from "@/lib/subscription-management"

// Upgrade
await changePlan(userEmail, "professional")

// Downgrade
await changePlan(userEmail, "free")
```

## Available Actions

- `generate` - Generate documents
- `download` - Download documents
- `preview` - Preview documents
- `collaborate` - Collaborate on documents
- `customize` - Customize documents
- `ai-review` - Use AI review

## API Endpoints

- `GET /api/permissions/check` - Get all permissions
- `GET /api/permissions/check?action=generate` - Check specific action
- `POST /api/subscription/change` - Change plan

See `PERMISSIONS_SYSTEM.md` for full documentation.




