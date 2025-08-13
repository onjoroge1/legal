# Legal Law Docs – Public API and Components Documentation

## Overview

This document describes all public HTTP API routes, exported libraries/utilities, React hooks, and reusable UI components available in this repository. Each entry includes its purpose, parameters, return shape, and usage examples.

---

## HTTP API Routes (Next.js App Router)

Base URL: `/api`
Authentication: Unless otherwise noted, endpoints require an authenticated session (NextAuth) via cookie.

### Auth
- POST `/auth/signup`
  - Body: `{ name?: string, email: string, password: string, plan?: "free" | "standard" | "premium" }`
  - Returns: `{ message, user: { id, name, email, subscriptionTier, subscriptionStatus } }`
  - Notes: Sends a verification email with token; stores verificationToken and expiry.
- POST `/auth/login`
  - Body: `{ email: string, password: string }`
  - Returns: `{ success: true, redirectTo: "/dashboard" }` and sets `auth-token` cookie (JWT).
- GET `/auth/me`
  - Returns: `{ id, email, name }` for the `auth-token` cookie bearer.
- POST `/auth/logout`
  - Returns: `{ success: true }` and clears server session cookie via `logoutUser`.
- POST `/auth/forgot-password`
  - Body: `{ email: string }`
  - Returns: `{ message }` (always 200 if user may exist). Sends reset email when configured.
- POST `/auth/verify-email`
  - Body: `{ token: string }`
  - Returns: `{ message: "Email verified successfully" }` if token valid.
- GET `/auth/session`
  - Returns: `{ user: { id, name, email } }` when signed in (NextAuth session).
- GET/POST `/auth/[...nextauth]`
  - NextAuth handler using `authOptions`.

### Dashboard
- GET `/dashboard`
  - Returns: `{ totalDocuments, documentsCreated, storage, subscription, recentDocuments[] }`
- GET `/dashboard/categories`
  - Returns: `Category[]` including `templates[]` (id, name, description).
- GET `/dashboard/categories/[id]`
  - Path param: `id` (category id or slug)
  - Returns: `Category` with `templates[]` (id, code, name, description)

### Settings
- GET `/settings`
  - Returns: user settings and notification preferences with defaults.
- PATCH `/settings`
  - Body: Partial user settings. Example keys: `firstName`, `lastName`, company/business fields, `defaultDocumentFormat`, `autoSaveEnabled`, `defaultLanguage`, `timezone`, `emailNotifications`, `inAppNotifications`, `twoFactorEnabled`, `activeSessions`.
  - Returns: updated settings; complex fields parsed to objects.

### Templates
- GET `/templates?category=<id>`
  - Returns: list of templates (optionally filtered by category).
- POST `/templates`
  - Body: `{ name, type, description?, content, state?, categoryId, variables, metadata }`
  - Returns: created template.
- GET `/templates/[id]`
  - Path param: `id` (template id or code)
  - Returns: template with `category`.
- GET `/templates/[id]/fields`
  - Returns: combined array of template fields and questionnaire questions with `options` and `dependencies` expanded.
- GET `/templates/[id]/questionnaires`
  - Returns: questionnaires for template (resolved by id or code), with questions.
- POST `/templates/[id]/render`
  - Body: `{ variables: Record<string,string> }`
  - Returns: `{ content, analysis, suggestions[] }` rendered via OpenAI analysis.
- POST `/templates/sample`
  - Admin-like utility to seed several example templates.

### Documents
- POST `/documents`
  - Body: `{ title, type, description?, state?, content, parties?: {name,type,address?,email?}[], status: string, metadata?: object }`
  - Returns: created document with `parties[]`.
- GET `/documents?status=&type=&search=`
  - Returns: authenticated user’s documents (with `parties`).
- GET `/documents/[id]`
  - Returns: single document for user.
- PUT `/documents/[id]`
  - Body: `{ title?, type?, description?, state?, content? }`
  - Returns: updated document.
- DELETE `/documents/[id]`
  - Returns: `{ success: true }` on deletion.
- POST `/documents/draft`
  - Body: `{ templateId: string, formData: Record<string,string>, status: string }`
  - Returns: `{ id, message }` with a draft document persisted.
- POST `/documents/generate`
  - Body: `{ title, type, category, jurisdiction, description, state, parties: {name,type}[] }`
  - Returns: `{ content, message }` generated via OpenAI.
- PUT `/documents/[id]/parties`
  - Body: `{ parties: { name, email, role }[] }`
  - Returns: updated document with `parties` replaced.
- POST `/documents/[id]/review`
  - Body: `{ reviewers: string[] }`
  - Returns: `{ message }` and emails reviewers review links.
- GET `/documents/review/[token]`
  - Returns: the document referenced by review token.
- POST `/documents/review/[token]/approve`
  - Body: `{ comments?: string }` marks reviewer approved; auto-advances status when all approved.
- POST `/documents/review/[token]/reject`
  - Body: `{ comments?: string }` marks reviewer rejected; sets document status `needs_revision`.
- POST `/documents/[id]/convert`
  - Body: `{ format: "pdf" | "docx" | "txt" }`
  - Returns: file response with appropriate Content-Type and disposition.
- POST `/documents/[id]/send-signature-request`
  - Body: none; generates per-party signed links and emails them via `/email/send`.
- POST `/documents/[id]/sign`
  - Body: `{ partyId: string, signature: string }` upserts signature for that party.
- GET `/sign/[token]`
  - Returns: `{ document, party: { id,name,type,email, signed, signedAt } }` for public signing link.
- POST `/sign/[token]`
  - Body: `{ signature: string }` creates/updates signature for public signing link.

### Email
- POST `/email/send`
  - Body: `{ signingLinks: { partyId,email,link }[], documentTitle: string }`
  - Returns: `{ success: true, results }`

### Billing and Payments
- POST `/payment/create-checkout`
  - Body: `{ tier: "standard" | "premium" }`
  - Returns: `{ url }` Stripe Checkout URL.
- POST `/payment/add-method`
  - Body: `{ paymentMethodId: string }` attaches and sets as default.
- POST `/payment/remove-method`
  - Body: `{ paymentMethodId: string }` detaches; reassigns default if needed.
- POST `/payment/set-default`
  - Body: `{ paymentMethodId: string }` validates ownership and sets default.
- GET `/billing/subscription`
  - Returns: `{ subscription: { tier, status, startDate, endDate }, billingHistory[], paymentMethods[] }`
- GET `/billing/invoice/[id]`
  - Returns: `{ success: true, pdfUrl }` for a Stripe invoice that belongs to the user.
- POST `/webhooks/stripe`
  - Stripe webhook handler. Expects `stripe-signature` header. Updates user subscription status.

### Admin
- GET `/admin/check`
  - Returns: `{ isAdmin: boolean }` for signed-in user.
- GET `/admin/categories`
  - Returns: all categories.
- POST `/admin/categories`
  - Body: `{ name: string, description?: string }`
- PATCH `/admin/categories/[categoryId]`
  - Body: `{ name: string, description?: string }`
- DELETE `/admin/categories/[categoryId]`
  - Returns: 204 on success.
- GET `/admin/templates`
  - Returns: all templates with category.
- POST `/admin/templates`
  - Body: `{ name, description?, categoryId, content? }`
- PATCH `/admin/templates/[templateId]`
  - Body: `{ name, description?, content?, categoryId? }`
- DELETE `/admin/templates/[templateId]`
  - Returns: 204 on success.
- POST `/admin/test-data`
  - Seeds a sample questionnaire for a template (code `swot-analysis`).

---

## Libraries and Utilities

### `lib/auth.ts`
- `authOptions: NextAuthOptions`
  - NextAuth configuration with Google and Credentials providers; JWT sessions; enriched session.user `{ id, email, name, isAdmin }`.
- `logoutUser(): Promise<NextResponse>`
  - Returns JSON `{ success: true }` used by `/api/auth/logout`.

Usage:
```ts
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const session = await getServerSession(authOptions)
```

### `lib/auth-server.ts`
- `hashPassword(password: string): Promise<string>`
- `verifyPassword(password: string, hashedPassword: string): Promise<boolean>`
- `createUser({ email, password, name? }): Promise<User>`
- `getCurrentUser(): Promise<User | null>`
- `logoutUser(): Promise<void>`

### `lib/prisma.ts` and `lib/db.ts`
- `prisma: PrismaClient` singleton exports.

### `lib/constants.ts`
- `TEMPLATE_CATEGORIES: TemplateCategory[]`
- `Template`, `TemplateCategory` interfaces.

### `lib/tokens.ts`
- `generateToken(length = 32): string` hex token.

### `lib/utils.ts`
- `cn(...inputs: ClassValue[]): string` tailwind/className merge.

### `lib/template-service.ts`
- `TemplateService` class
  - `createTemplate(data)`
  - `updateTemplate(id, data)`
  - `getTemplate(id)`
  - `listTemplates(categoryId?)`
  - `deleteTemplate(id)`
  - `createSampleTemplates()`

Example:
```ts
const t = await TemplateService.createTemplate({ name, type, categoryId, content, variables: [], metadata: {} })
```

### `lib/template-renderer.ts`
- `TemplateRenderer.render(template: DocumentTemplate, variables: any)` → `{ content, analysis, suggestions }`
- Variable replacement plus OpenAI analysis; suggestions parsed from analysis text.

### `lib/api/templates.ts`
- `templateApi`
  - `getAllTemplates(): Promise<Template[]>`
  - `getTemplateByCode(code: string): Promise<Template | null>`
  - `createTemplate(template: Omit<Template,'id'>): Promise<Template>`
  - `updateTemplate(code: string, template: Partial<Template>): Promise<Template>`
  - `deleteTemplate(code: string): Promise<void>`

---

## React Hooks

### `hooks/use-dashboard-data`
- Returns: `{ data, loading, error }`
- Fetches `/api/dashboard` once session exists.

Example:
```tsx
const { data, loading, error } = useDashboardData()
```

### `hooks/use-mobile`
- `useIsMobile(): boolean` responsive helper based on window width.

### `hooks/use-toast`
- `useToast()` returns `{ toasts, toast(props), dismiss(toastId?) }`
- `toast({ title, description, action, variant })` programmatically show toasts.

Example:
```tsx
const { toast } = useToast()
toast({ title: "Saved", description: "Your changes were saved." })
```

---

## UI Components (Selected)
All components live under `components/ui` and export named primitives. They follow Radix UI patterns and accept className overrides.

- `Button`: props extend `button` plus `variant` and `size`.
```tsx
import { Button } from "@/components/ui/button"
<Button variant="secondary" size="sm">Click</Button>
```
- `Input`: standard input props.
- `Card`: `{ Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }`
- `Tabs`: `{ Tabs, TabsList, TabsTrigger, TabsContent }`
- `Toast` system: see `Toaster` and `useToast`.
- Many more: `Accordion`, `Alert`, `Avatar`, `Badge`, `Calendar`, `Checkbox`, `Dialog`, `DropdownMenu`, `Form`, `Popover`, `Select`, `Table`, `Textarea`, `Tooltip`, etc. Review each file for full prop types.

### App Components (Selected)
- `components/template-list`: `TemplateList({ initialTemplates })` – lists templates by category and shows `TemplatePreview`.
- `components/template-preview`: `TemplatePreview({ template })` – collects variables and calls `/api/templates/[id]/render`.
- `components/document-preview`: `DocumentPreview({ content, onSave, onBack, documentId?, isSaving? })` – shows generated content and actions.
- `components/providers`: `Providers({ children })` – wraps app with Session, React Query, Theme, and Toaster.

Examples:
```tsx
<Providers>
  <TemplateList initialTemplates={templates} />
</Providers>
```

---

## Email Utilities
- `sendVerificationEmail({ to, name, verificationToken })`
- `sendPasswordResetEmail({ to, name, resetToken })`

Requires `RESEND_API_KEY` and `NEXT_PUBLIC_APP_URL` env vars.

---

## Document Conversion Utilities
- `convertToPDF(content: string, title: string): Promise<Blob>`
- `convertToDOCX(content: string, title: string): Promise<Blob>`

Used by POST `/documents/[id]/convert`.

---

## Environment Variables
- Authentication: `NEXTAUTH_SECRET`, Google OAuth ids
- Database: Prisma defaults
- OpenAI: `OPENAI_API_KEY`
- Resend: `RESEND_API_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, price ids `STRIPE_STANDARD_PRICE_ID`, `STRIPE_PREMIUM_PRICE_ID`
- App: `NEXT_PUBLIC_APP_URL`, `JWT_SECRET`

---

## Common Usage Patterns

- Fetch with credentials (App Router automatically includes cookies):
```ts
const res = await fetch("/api/documents", { method: "GET" })
```

- Server handlers require session:
```ts
import { getServerSession } from "next-auth"
const session = await getServerSession(authOptions)
if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
```

- Rendering a template on the client:
```tsx
await fetch(`/api/templates/${templateId}/render`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ variables })
})
```

---

## Middleware Helpers

### `middleware/subscription-guard.ts`
- `checkSubscriptionAccess(userId: string)` → `{ allowed: boolean, message?: string, redirectTo?: string }`
  - Admins always allowed.
  - Free tier: limited to 1 document; returns redirect suggestion to `/dashboard/billing` when over limit.