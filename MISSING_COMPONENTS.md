# Missing Components & Files Checklist

## 🔴 Critical Missing Files (App Won't Run)

### Authentication
- [ ] `/app/login/page.tsx` - Login page
- [ ] `/app/signup/page.tsx` - Registration page
- [ ] `/app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- [ ] `/components/auth-check.tsx` - Auth wrapper component

### Dashboard Components
- [ ] `/components/dashboard/dashboard-header.tsx`
- [ ] `/components/dashboard/dashboard-stats.tsx`
- [ ] `/components/dashboard/recent-documents.tsx`
- [ ] `/components/dashboard/dashboard-sidebar.tsx`

### Billing Components
- [ ] `/components/dashboard/billing-history.tsx`
- [ ] `/components/dashboard/payment-method-form.tsx`

### Team Components
- [ ] `/components/dashboard/team-member-card.tsx`
- [ ] `/components/dashboard/team-invite-modal.tsx`

---

## 🟡 Missing API Routes

### Authentication
- [ ] `/app/api/auth/[...nextauth]/route.ts`

### Dashboard
- [ ] `/app/api/dashboard/route.ts`

### Documents
- [ ] `/app/api/documents/route.ts`
- [ ] `/app/api/documents/[id]/route.ts`

### Settings
- [ ] `/app/api/settings/route.ts`

### Billing
- [ ] `/app/api/billing/subscription/route.ts`
- [ ] `/app/api/payment/create-checkout/route.ts`
- [ ] `/app/api/payment/set-default/route.ts`
- [ ] `/app/api/payment/remove-method/route.ts`
- [ ] `/app/api/webhooks/stripe/route.ts`

### Team
- [ ] `/app/api/team/invite/route.ts`
- [ ] `/app/api/team/members/route.ts`
- [ ] `/app/api/team/invitations/route.ts`

### Admin (Future)
- [ ] `/app/api/admin/users/route.ts`
- [ ] `/app/api/admin/documents/route.ts`
- [ ] `/app/api/admin/stats/route.ts`

---

## 🟢 Missing Pages

### Authentication
- [ ] `/app/login/page.tsx`
- [ ] `/app/signup/page.tsx`
- [ ] `/app/forgot-password/page.tsx` (optional)

### Admin
- [ ] `/app/admin/page.tsx` - Admin dashboard
- [ ] `/app/admin/users/page.tsx` - User management
- [ ] `/app/admin/documents/page.tsx` - Document management
- [ ] `/app/admin/settings/page.tsx` - System settings
- [ ] `/app/admin/layout.tsx` - Admin layout

---

## 📦 Missing Dependencies

### Required
- [ ] `next-auth` - Authentication
- [ ] `@prisma/client` - Database ORM
- [ ] `prisma` (dev) - Database migrations
- [ ] `stripe` - Payment processing
- [ ] `@stripe/stripe-js` - Stripe client
- [ ] `@stripe/react-stripe-js` - Stripe React components

### Optional
- [ ] `@sentry/nextjs` - Error tracking
- [ ] `resend` or `nodemailer` - Email sending
- [ ] `bcryptjs` - Password hashing (if not using NextAuth)

---

## 🔧 Configuration Files Needed

- [ ] `.env.local` - Environment variables (user-specific)
- [ ] `.env.example` - Environment variable template
- [ ] `prisma/schema.prisma` - Database schema
- [ ] `lib/prisma.ts` - Prisma client singleton

---

## 📝 Files That Need Updates

### Root Layout
- [ ] `/app/layout.tsx` - Add `SessionProvider` wrapper

### Header Component
- [ ] `/components/header.tsx` - Link login buttons to `/login`

### Dashboard Pages (Need API Integration)
- [ ] `/app/dashboard/page.tsx` - Connect to `/api/dashboard`
- [ ] `/app/dashboard/settings/page.tsx` - Connect to `/api/settings`
- [ ] `/app/dashboard/billing/page.tsx` - Connect to billing APIs
- [ ] `/app/dashboard/documents/page.tsx` - Connect to `/api/documents`
- [ ] `/app/dashboard/team/page.tsx` - Connect to team APIs

---

## 🗂️ Directory Structure to Create

```
app/
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts
│   ├── dashboard/
│   │   └── route.ts
│   ├── documents/
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   ├── settings/
│   │   └── route.ts
│   ├── billing/
│   │   └── subscription/
│   │       └── route.ts
│   ├── payment/
│   │   ├── create-checkout/
│   │   ├── set-default/
│   │   └── remove-method/
│   ├── team/
│   │   ├── invite/
│   │   ├── members/
│   │   └── invitations/
│   └── webhooks/
│       └── stripe/
│           └── route.ts
├── login/
│   └── page.tsx
├── signup/
│   └── page.tsx
└── admin/
    ├── layout.tsx
    ├── page.tsx
    ├── users/
    │   └── page.tsx
    ├── documents/
    │   └── page.tsx
    └── settings/
        └── page.tsx

components/
└── dashboard/
    ├── dashboard-header.tsx
    ├── dashboard-stats.tsx
    ├── dashboard-sidebar.tsx
    ├── recent-documents.tsx
    ├── billing-history.tsx
    ├── payment-method-form.tsx
    ├── team-member-card.tsx
    └── team-invite-modal.tsx

lib/
├── prisma.ts
├── auth.ts (NextAuth config)
└── stripe.ts

prisma/
└── schema.prisma
```

---

## ✅ Files That Exist (Working)

- ✅ Landing page components (all in `/components/`)
- ✅ UI component library (shadcn/ui in `/components/ui/`)
- ✅ NDA generation API (`/app/api/nda-generate/route.ts`)
- ✅ NDA chat API (`/app/api/nda-chat/route.ts`)
- ✅ Dashboard page structure (pages exist, need components)
- ✅ Settings page UI (needs API connection)
- ✅ Billing page UI (needs API connection)
- ✅ Team page UI (needs components and API)

---

## 🎯 Priority Order

1. **Authentication** (Phase 1)
   - NextAuth setup
   - Login/Signup pages
   - AuthCheck component
   - SessionProvider

2. **Dashboard Components** (Phase 1)
   - All 4 missing dashboard components
   - Dashboard API route

3. **Core APIs** (Phase 2)
   - Documents API
   - Settings API

4. **Billing** (Phase 3)
   - Stripe integration
   - Billing components
   - Payment APIs

5. **Team** (Phase 4)
   - Team components
   - Team APIs

6. **Admin** (Phase 5 - Optional)
   - Admin pages
   - Admin APIs

---

*Use this checklist to track progress. Check off items as you complete them.*


