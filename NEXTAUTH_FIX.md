# NextAuth v5 Fix

## Issue
Error: `TypeError: Function.prototype.apply was called on #<Object>, which is an object and not a function`

This error occurs at `/api/auth/session` endpoint.

## Solution Applied

Updated the route handler export pattern for NextAuth v5 compatibility.

### File: `app/api/auth/[...nextauth]/route.ts`

**Before:**
```typescript
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

**After:**
```typescript
const handler = NextAuth(authOptions)
export const { GET, POST } = handler
```

## Additional Fixes

1. **Added fallback secret** in `lib/auth.ts`:
   - Prevents errors if `NEXTAUTH_SECRET` is not set
   - **Important**: Change this in production!

## Environment Variables Required

Make sure you have `.env.local` with:
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

Generate secret:
```bash
openssl rand -base64 32
```

## Testing

After the fix, restart your dev server:
```bash
npm run dev
```

The `/api/auth/session` endpoint should now work correctly.

## If Error Persists

If you still see the error, try:

1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Check NextAuth version:**
   ```bash
   npm list next-auth
   ```
   Should show: `next-auth@5.0.0-beta.25`

3. **Verify environment variables:**
   Make sure `.env.local` exists and has `NEXTAUTH_SECRET` set

---

*Last Updated: After fixing NextAuth v5 route handler*


