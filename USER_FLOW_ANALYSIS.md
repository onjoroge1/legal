# Comprehensive User Flow Analysis

## Executive Summary

This document provides a comprehensive analysis of the user flows for both **logged-in** and **non-logged-in** users, identifying gaps, inconsistencies, and recommendations for improvement.

---

## 1. NON-LOGGED-IN USER FLOW

### Current Flow

#### Entry Points:
1. **Homepage** (`/`)
   - Shows document library section
   - Links to `/documents` page
   - No pricing shown on cards
   - No authentication required

2. **Documents Page** (`/documents`)
   - Lists all 12 document types
   - Search and category filtering
   - No pricing shown on cards
   - Links to `/documents/{slug}`

3. **Document Detail Page** (`/documents/{slug}`)
   - Shows full document information
   - **Shows pricing: $19.99 per document** (line 150)
   - "Generate My [Document]" button → `/documents/{slug}/generate`
   - No subscription pricing shown here

4. **Generate Page** (`/documents/{slug}/generate`)
   - AI chat interface
   - No authentication check
   - No pricing shown
   - After completion → `/documents/{slug}/preview`

5. **Preview Page** (`/documents/{slug}/preview`)
   - Watermarked document preview
   - Shows document details
   - "Proceed to Checkout" button → `/documents/{slug}/checkout`
   - No pricing shown

6. **Checkout Page** (`/documents/{slug}/checkout`)
   - Shows two payment options:
     - Single document: **$19.99** (one-time)
     - Monthly subscription: **$9.99/month** (unlimited documents)
   - Payment form
   - After payment:
     - Subscription → `/dashboard`
     - Single purchase → `/documents/{slug}/download` (⚠️ **MISSING PAGE**)

### Gaps Identified:

1. ❌ **Missing Download Page** (`/documents/{slug}/download`)
   - Referenced in checkout but doesn't exist
   - Users who pay for single document have nowhere to go

2. ❌ **No Authentication Prompt**
   - Users can generate documents without logging in
   - No account creation prompt before checkout
   - Payment happens without account

3. ❌ **Pricing Inconsistency**
   - Document detail page shows $19.99
   - Checkout shows $19.99 single + $9.99 subscription
   - No mention of subscription pricing on detail page

4. ❌ **No Subscription Benefits Shown**
   - Non-logged-in users don't see subscription benefits
   - No comparison between single vs subscription

---

## 2. LOGGED-IN USER FLOW

### Current Flow

#### Entry Points:
1. **Login** (`/login`)
   - Email/password authentication
   - After login → `/dashboard`

2. **Signup** (`/signup`)
   - Creates account
   - Auto-signs in
   - Redirects to `/dashboard`

3. **Dashboard** (`/dashboard`)
   - Shows user stats
   - Recent documents
   - Links to:
     - `/dashboard/templates` (templates page)
     - `/dashboard/documents` (user's documents)
     - `/dashboard/billing`
     - `/dashboard/create`

4. **Templates Page** (`/dashboard/templates`)
   - Same as `/documents` page
   - Shows all 12 documents
   - **No pricing shown** (same as public page)
   - Links to `/documents/{slug}` (public page)

5. **Document Detail Page** (`/documents/{slug}`)
   - **Same page for logged-in and non-logged-in users**
   - Shows $19.99 pricing
   - No subscription status check
   - No "You already have subscription" message

6. **Generate → Preview → Checkout Flow**
   - Same as non-logged-in flow
   - No subscription check
   - Subscription users still see checkout

### Gaps Identified:

1. ❌ **No Subscription Status Check**
   - Logged-in users with active subscription still see pricing
   - Should skip checkout if they have subscription
   - Should show "Generate Free" or "Included in Subscription"

2. ❌ **No Subscription Benefits Display**
   - Subscription users don't see they can generate unlimited
   - No indication on templates page that subscription covers it

3. ❌ **Pricing Should Be Hidden for Subscribers**
   - Document detail pages show $19.99 even for subscribers
   - Templates page should show "Free with Subscription" badge

4. ❌ **Checkout Page Should Skip for Subscribers**
   - Active subscribers shouldn't see checkout
   - Should go directly to generate → preview → download

5. ❌ **Dashboard Templates vs Public Documents**
   - `/dashboard/templates` and `/documents` are identical
   - Should show different UI for logged-in users
   - Should show subscription status

---

## 3. SUBSCRIPTION STATUS LOGIC

### Current Implementation:

**Database Schema** (Prisma):
```prisma
subscriptionTier: String @default("free")  // "free" | "premium" | "enterprise"
subscriptionStatus: String @default("inactive")  // "active" | "inactive" | "cancelled"
subscriptionStartDate: DateTime?
subscriptionEndDate: DateTime?
```

**API Endpoints:**
- `/api/dashboard` - Returns subscription info
- No subscription check in document pages
- No subscription check in checkout

### Missing Logic:

1. ❌ **No Subscription Check Middleware**
   - Document pages don't check subscription
   - Generate page doesn't check subscription
   - Checkout page doesn't check subscription

2. ❌ **No Subscription Helper Functions**
   - No `isSubscriptionActive()` utility
   - No `hasAccessToDocument()` utility
   - No `getUserSubscriptionTier()` utility

3. ❌ **No Subscription Status Display**
   - Dashboard doesn't prominently show subscription status
   - Templates page doesn't show subscription benefits

---

## 4. PRICING DISPLAY LOGIC

### Current State:

**Document Detail Page** (`/documents/{slug}/page.tsx`):
- Always shows: `$19.99 per document` (line 150)
- No conditional logic for logged-in users
- No subscription pricing shown

**Templates Page** (`/dashboard/templates/page.tsx`):
- No pricing shown at all
- Same as public `/documents` page

**Checkout Page** (`/documents/{slug}/checkout/page.tsx`):
- Shows both options:
  - Single: $19.99
  - Subscription: $9.99/month
- No check if user already has subscription

### Recommended Logic:

```typescript
// Pseudo-code for pricing display
if (!isLoggedIn) {
  // Show: "$19.99 per document" or "$9.99/month subscription"
  showPricing = true
} else if (hasActiveSubscription) {
  // Show: "Free with Subscription" or "Included in Subscription"
  showPricing = false
  showSubscriptionBadge = true
} else {
  // Show: "$19.99 per document" or "Upgrade to $9.99/month"
  showPricing = true
  showUpgradePrompt = true
}
```

---

## 5. RECOMMENDED USER FLOWS

### Non-Logged-In User (Ideal Flow):

1. **Homepage** → Browse documents
2. **Documents Page** → See all documents with pricing badges
3. **Document Detail** → See pricing + subscription option
4. **Generate** → Prompt to create account (optional but recommended)
5. **Preview** → Watermarked preview
6. **Checkout** → Choose single or subscription
   - If subscription: Create account → Dashboard
   - If single: Create account → Download
7. **Download** → Full document access

### Logged-In User WITHOUT Subscription (Ideal Flow):

1. **Dashboard** → See templates
2. **Templates Page** → See documents with pricing
3. **Document Detail** → See pricing + "Upgrade to Subscription" CTA
4. **Generate** → AI chat
5. **Preview** → Watermarked preview
6. **Checkout** → Choose single or subscription
7. **Download** → Full document access

### Logged-In User WITH Active Subscription (Ideal Flow):

1. **Dashboard** → See subscription status badge
2. **Templates Page** → See "Free with Subscription" badges
3. **Document Detail** → See "Included in Subscription" + "Generate Free" button
4. **Generate** → AI chat (no payment required)
5. **Preview** → Watermarked preview (or skip if subscription)
6. **Download** → Direct download (skip checkout)

---

## 6. CRITICAL GAPS TO FIX

### Priority 1 (Critical):

1. **Create Download Page** (`/documents/{slug}/download`)
   - Required for single purchase flow
   - Should show full document (no watermark)
   - PDF and DOCX download options

2. **Add Subscription Status Checks**
   - Check subscription in document detail pages
   - Check subscription in generate page
   - Check subscription in checkout page
   - Skip checkout for active subscribers

3. **Conditional Pricing Display**
   - Hide pricing for active subscribers
   - Show "Free with Subscription" badges
   - Show upgrade prompts for non-subscribers

### Priority 2 (Important):

4. **Subscription Status Display**
   - Show subscription badge on dashboard
   - Show subscription status on templates page
   - Show "Unlimited Documents" benefit

5. **Authentication Prompts**
   - Prompt to create account before checkout
   - Show benefits of creating account
   - Auto-create account during checkout if needed

6. **Differentiate Dashboard Templates**
   - Show different UI for logged-in users
   - Show subscription benefits
   - Show "Your Documents" section

### Priority 3 (Enhancement):

7. **Subscription Management**
   - Cancel subscription flow
   - Upgrade/downgrade options
   - Subscription history

8. **Document Access Control**
   - Track which documents user has access to
   - Show "Already Purchased" badges
   - Allow re-download of purchased documents

---

## 7. SPECIFIC RECOMMENDATIONS

### For Document Detail Page (`/documents/{slug}/page.tsx`):

```typescript
// Add subscription check
const session = await getServerSession(authOptions)
const hasActiveSubscription = session?.user && 
  await checkSubscriptionActive(session.user.email)

// Conditional pricing display
{!hasActiveSubscription && (
  <div className="flex items-center gap-2">
    <DollarSign className="h-5 w-5 text-primary" />
    <span className="text-2xl font-bold text-foreground">
      ${document.price}.99
    </span>
    <span className="text-sm text-muted-foreground">per document</span>
  </div>
)}

{hasActiveSubscription && (
  <Badge className="gap-1 border-accent/30 bg-accent/10 text-accent">
    <Crown className="h-3 w-3" />
    Free with Subscription
  </Badge>
)}
```

### For Templates Page (`/dashboard/templates/page.tsx`):

```typescript
// Add subscription status
const { data: session } = useSession()
const { data: subscription } = useQuery(['subscription'], 
  () => fetch('/api/user/subscription').then(r => r.json()))

// Show subscription badge on cards
{subscription?.status === 'active' && (
  <Badge variant="outline" className="border-accent/30 bg-accent/10">
    Free with Subscription
  </Badge>
)}
```

### For Checkout Page (`/documents/{slug}/checkout/page.tsx`):

```typescript
// Redirect if subscription active
useEffect(() => {
  if (subscription?.status === 'active') {
    router.push(`/documents/${slug}/generate`)
  }
}, [subscription])
```

### Create Download Page (`/documents/{slug}/download/page.tsx`):

```typescript
// Check if user has access
const hasAccess = await checkDocumentAccess(userId, slug)

if (!hasAccess) {
  return <AccessDenied />
}

// Show download options
return (
  <div>
    <h1>Download Your Document</h1>
    <Button onClick={downloadPDF}>Download PDF</Button>
    <Button onClick={downloadDOCX}>Download DOCX</Button>
  </div>
)
```

---

## 8. TESTING CHECKLIST

### Non-Logged-In Flow:
- [ ] Can browse documents without login
- [ ] Can see pricing on document detail pages
- [ ] Can generate document without login
- [ ] Can see preview
- [ ] Can complete checkout
- [ ] Can download after single purchase
- [ ] Can access dashboard after subscription purchase

### Logged-In Without Subscription:
- [ ] Sees pricing on all pages
- [ ] Sees upgrade prompts
- [ ] Can purchase single documents
- [ ] Can subscribe
- [ ] Can download purchased documents

### Logged-In With Subscription:
- [ ] Does NOT see pricing
- [ ] Sees "Free with Subscription" badges
- [ ] Can generate documents without checkout
- [ ] Can download directly
- [ ] Sees subscription status on dashboard
- [ ] Can manage subscription

---

## 9. SUMMARY

### Current State:
- ✅ Basic flow works for non-logged-in users
- ✅ Authentication system in place
- ✅ Subscription data structure exists
- ❌ No subscription status checks
- ❌ No conditional pricing display
- ❌ Missing download page
- ❌ No differentiation between logged-in/non-logged-in experiences

### Recommended Next Steps:

1. **Immediate (Week 1)**:
   - Create download page
   - Add subscription status checks
   - Add conditional pricing display

2. **Short-term (Week 2-3)**:
   - Implement subscription helper functions
   - Add subscription badges and status displays
   - Differentiate dashboard templates page

3. **Medium-term (Month 1)**:
   - Add subscription management UI
   - Implement document access control
   - Add purchase history

4. **Long-term (Month 2+)**:
   - Advanced subscription features
   - Team collaboration
   - Enterprise features

---

## 10. KEY QUESTIONS TO ANSWER

1. **Should non-logged-in users be able to generate documents?**
   - Current: Yes
   - Recommendation: Yes, but prompt for account creation

2. **Should subscription users skip checkout?**
   - Current: No
   - Recommendation: Yes, skip checkout entirely

3. **Should pricing be shown to subscription users?**
   - Current: Yes
   - Recommendation: No, show "Free with Subscription"

4. **Should there be a separate templates page for logged-in users?**
   - Current: Same as public
   - Recommendation: Yes, show subscription benefits

5. **What happens after single purchase?**
   - Current: Redirects to non-existent download page
   - Recommendation: Create download page with full document access

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Author:** AI Assistant  
**Status:** Draft - Pending Review




