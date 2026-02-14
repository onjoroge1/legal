# Subscription Flow Analysis

## Current Flow Issues

### Problem
Free users (logged in but no subscription) are being treated differently than non-logged-in users, when they should follow the same flow: generate → preview → checkout.

## User Scenarios

### Scenario 1: Non-Logged-In User (Guest)
**Current Flow:**
1. Generate document → Preview (watermarked) → Checkout → Download

**Expected Flow:** ✅ Correct
- Generate → Preview → Checkout → Download

### Scenario 2: Free User (Logged In, No Subscription)
**Current Flow:**
1. Generate document → Saves to dashboard → Redirects to dashboard (WRONG!)

**Expected Flow:** ❌ Needs Fix
- Generate → Preview (watermarked) → Checkout → Download
- Should mirror non-logged-in flow

### Scenario 3: Premium User (Logged In, Active Subscription)
**Current Flow:**
1. Generate document → Download (skips preview/checkout)

**Expected Flow:** ✅ Correct
- Generate → Download (skip preview/checkout)

## Recommended Flow

### For Non-Logged-In Users:
1. Generate document
2. Preview (watermarked)
3. Checkout (create account + payment)
4. Download

### For Free Users (Logged In, No Subscription):
1. Generate document
2. Preview (watermarked) - same as non-logged-in
3. Checkout (upgrade subscription or single purchase)
4. Download

### For Premium Users (Logged In, Active Subscription):
1. Generate document
2. Save to dashboard automatically
3. Redirect to document view page (`/dashboard/documents/[id]`)
4. Can view, sign, send for signature, edit, or download from there

## Implementation Changes Made ✅

### 1. Generate Page (`/app/documents/[slug]/generate/page.tsx`) ✅
**Before:** Saved to dashboard for ALL logged-in users
**After:** Only saves to dashboard for premium users. Free users go to preview.

**Key Change:**
```typescript
// Only premium users save to dashboard
if (hasSubscription && session?.user?.email) {
  // Save and redirect to document view page
  const savedDoc = await saveDocument()
  router.push(`/dashboard/documents/${savedDoc.id}`)
} else {
  // Free users (logged in or not) go to preview
  router.push(`/documents/${slug}/preview`)
}
```

### 2. Preview Page (`/app/documents/[slug]/preview/page.tsx`) ✅
**Before:** Only checked subscription but didn't handle free users properly
**After:** Allows free users to see preview, only redirects premium users

**Key Change:**
```typescript
if (data.subscription?.isActive) {
  // Premium: redirect to download
  router.push(`/documents/${slug}/download`)
} else {
  // Free users stay on preview → checkout
  setHasSubscription(false)
}
```

### 3. Checkout Page (`/app/documents/[slug]/checkout/page.tsx`) ✅
**Status:** Already correct - redirects premium users, allows free users to checkout

## Key Logic

```typescript
// After generating document:
if (hasSubscription) {
  // Premium user: Save to dashboard, redirect to dashboard
  saveToDashboard()
  router.push("/dashboard/documents")
} else {
  // Free user OR non-logged-in: Go to preview → checkout
  router.push(`/documents/${slug}/preview`)
}
```

