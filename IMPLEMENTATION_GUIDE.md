# Settings Features Implementation Guide

This guide documents all the new features that have been implemented for the Settings dashboard.

## 📦 Required Packages

Install the following packages:

```bash
npm install resend speakeasy qrcode @types/qrcode
```

## 🔧 Environment Variables

Add these to your `.env.local`:

```env
# Resend Email Service
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

# NextAuth (if not already set)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

## 🗄️ Database Migration

Push the Prisma schema changes to add the Notification model:

```bash
npx prisma db push
npx prisma generate
```

## ✅ Implemented Features

### 1. Avatar Upload ✅

**Files Created:**
- `app/api/settings/avatar/route.ts` - Avatar upload API endpoint
- `components/settings/avatar-upload.tsx` - Avatar upload component

**Features:**
- File upload with validation (image types only, max 5MB)
- Image preview before upload
- Automatic storage in `public/uploads/avatars/`
- Database update with image URL
- UI integration in Profile tab

**Usage:**
The avatar upload is automatically integrated into the Profile tab. Users can click "Change Avatar" to upload a new profile picture.

### 2. Two-Factor Authentication ✅

**Files Created:**
- `app/api/settings/2fa/setup/route.ts` - 2FA setup endpoint
- `app/api/settings/2fa/verify/route.ts` - 2FA verification endpoint
- `app/api/settings/2fa/disable/route.ts` - 2FA disable endpoint
- `components/settings/two-factor-setup.tsx` - 2FA setup UI component

**Features:**
- TOTP secret generation
- QR code generation for authenticator apps
- Manual entry code for devices without camera
- Verification flow before enabling
- Disable with verification code

**Usage:**
1. User clicks "Set Up Two-Factor Authentication" in Security tab
2. QR code is displayed
3. User scans with authenticator app (Google Authenticator, Authy, etc.)
4. User enters verification code to enable
5. 2FA is now required on login

**Note:** You'll need to update the login flow to check for 2FA and prompt for verification code.

### 3. Active Sessions Tracking ✅

**Files Created:**
- `lib/session-tracker.ts` - Session tracking utility
- `app/api/settings/sessions/route.ts` - Sessions API endpoint

**Features:**
- Automatic session tracking on login
- Device information (browser, OS, device name)
- Location detection (basic - can be enhanced with geolocation service)
- Last active timestamp
- Current session indicator
- Session revocation (individual and all others)

**Usage:**
Sessions are automatically tracked when users sign in. The `lib/auth.ts` file has been updated to call `trackSession` on sign-in.

**Enhancement Options:**
- Integrate with IP geolocation service (ipapi.co, MaxMind, etc.)
- Add more detailed device fingerprinting
- Track session activity on each request (update lastActive)

### 4. Session Revocation ✅

**Features:**
- Revoke individual sessions
- Revoke all other sessions (keep current)
- Real-time UI updates after revocation

**Usage:**
Users can click "Sign Out" on any session card to revoke that session, or "Sign Out All Other Sessions" to revoke all except the current one.

**Note:** Currently, this updates the database but doesn't invalidate NextAuth session tokens. For full functionality, you may want to implement session token blacklisting or use NextAuth's session management features.

### 5. Email Notification System ✅

**Files Created:**
- `lib/email-service.ts` - Email service using Resend

**Features:**
- Email templates for different notification types:
  - Document updates
  - Billing notifications
  - New features announcements
  - Marketing emails
- HTML email templates
- Error handling and logging

**Usage:**
```typescript
import { sendDocumentUpdateEmail } from "@/lib/email-service"

// Send document update notification
await sendDocumentUpdateEmail(
  userEmail,
  userName,
  documentTitle,
  documentUrl
)
```

**Integration Points:**
- Call `sendDocumentUpdateEmail` when documents are updated
- Call `sendBillingNotificationEmail` for billing events
- Call `sendNewFeaturesEmail` when new features are released
- Check user's `emailNotifications` preferences before sending

**Example Integration:**
```typescript
// In your document update handler
const user = await prisma.user.findUnique({
  where: { id: document.userId },
  select: { 
    email: true, 
    name: true, 
    emailNotifications: true 
  }
})

const emailPrefs = JSON.parse(user.emailNotifications || '{}')
if (emailPrefs.documentUpdates) {
  await sendDocumentUpdateEmail(
    user.email,
    user.name,
    document.title,
    `/dashboard/documents/${document.id}`
  )
}
```

### 6. In-App Notification System ✅

**Files Created:**
- `lib/notification-service.ts` - Notification creation service
- `app/api/notifications/route.ts` - Notifications API endpoint
- `prisma/schema.prisma` - Added Notification model

**Database Model:**
```prisma
model Notification {
  id         String    @id @default(cuid())
  userId     String
  type       String    // "document" | "billing" | "team" | "system"
  title      String
  message    String
  link       String?
  metadata   Json?
  read       Boolean   @default(false)
  readAt     DateTime?
  createdAt  DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([read])
  @@index([createdAt])
}
```

**Features:**
- Create notifications programmatically
- Mark as read/unread
- Mark all as read
- Filter by type
- Link to relevant pages

**Usage:**
```typescript
import { createDocumentReminderNotification } from "@/lib/notification-service"

// Create a notification
await createDocumentReminderNotification(
  userId,
  documentTitle,
  documentId
)
```

**Frontend Integration Needed:**
You'll need to create a notification UI component (bell icon, dropdown, etc.) that:
- Fetches notifications from `/api/notifications`
- Displays unread count
- Shows notification list
- Marks notifications as read
- Polls for new notifications or uses WebSockets for real-time updates

### 7. Auto-Save Functionality ✅

**Files Created:**
- `components/dashboard/document-editor-with-autosave.tsx` - Auto-save enabled editor

**Features:**
- Respects user's auto-save preference from settings
- Auto-saves every 5 minutes when enabled
- Manual save button
- Last saved timestamp display
- Unsaved changes indicator
- Final auto-save on component unmount

**Usage:**
Replace the existing `DocumentCollaborationEditor` component with `DocumentEditorWithAutosave`:

```tsx
import DocumentEditorWithAutosave from "@/components/dashboard/document-editor-with-autosave"

<DocumentEditorWithAutosave
  documentId={document.id}
  initialContent={document.content}
  onSave={async (content) => {
    // Custom save logic
    await saveDocument(document.id, content)
  }}
/>
```

**API Endpoint Needed:**
You may want to create an auto-save endpoint:

```typescript
// app/api/documents/[id]/autosave/route.ts
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Save document draft
  // This should be a "soft" save that doesn't trigger notifications
}
```

## 🔄 Updated Files

### `lib/auth.ts`
- Added session tracking on sign-in
- Calls `trackSession` when user signs in

### `app/dashboard/settings/page.tsx`
- Integrated avatar upload component
- Integrated 2FA setup component
- Added session revocation functionality
- Updated active sessions display

### `prisma/schema.prisma`
- Added `Notification` model
- Added `notifications` relation to `User` model

## 🚀 Next Steps

### 1. Complete Email Integration
- Add email sending calls in document update handlers
- Add email sending calls in billing handlers
- Create email templates for all notification types

### 2. Complete Notification UI
- Create notification bell component
- Add notification dropdown/modal
- Implement real-time notification updates (WebSockets or polling)
- Add notification preferences UI (already in settings, just needs UI)

### 3. Enhance Session Management
- Integrate with IP geolocation service
- Add session activity tracking on each request
- Implement NextAuth session token invalidation

### 4. Complete 2FA Login Flow
- Update login page to check for 2FA requirement
- Add 2FA verification step in login flow
- Handle 2FA verification in `lib/auth.ts`

### 5. Test All Features
- Test avatar upload with different image types
- Test 2FA setup and verification flow
- Test session tracking and revocation
- Test email notifications
- Test auto-save functionality

## 📝 Notes

- All features are designed to work gracefully if dependencies are missing (Prisma, Resend, etc.)
- Error handling is included throughout
- User preferences are respected (auto-save, email notifications, etc.)
- The code follows the existing patterns in the codebase

## 🐛 Troubleshooting

### Avatar Upload Not Working
- Check that `public/uploads/avatars/` directory exists and is writable
- Verify file size and type restrictions
- Check browser console for errors

### 2FA Not Working
- Ensure `speakeasy` and `qrcode` packages are installed
- Check that 2FA secret is being saved to database
- Verify QR code generation is working

### Sessions Not Tracking
- Check that `trackSession` is being called on login
- Verify user agent and IP are being captured
- Check database for `activeSessions` field updates

### Email Not Sending
- Verify `RESEND_API_KEY` is set in environment variables
- Check Resend dashboard for API status
- Review email service logs for errors

### Auto-Save Not Working
- Verify user's `autoSaveEnabled` preference is loaded
- Check that document ID is provided
- Verify auto-save API endpoint exists (or provide `onSave` callback)

