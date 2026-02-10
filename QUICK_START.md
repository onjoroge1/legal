# Quick Start Guide - LegalLawDocs.com

## 🚀 Getting the App Running

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/legal_docs?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# OpenAI (for AI document generation)
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe (for payments - optional for now)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# OAuth (optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 3: Set Up Database (After Phase 1)
```bash
# Install Prisma (when ready)
pnpm add -D prisma
pnpm add @prisma/client

# Initialize Prisma
npx prisma init

# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### Step 4: Run Development Server
```bash
pnpm dev
```

Visit: http://localhost:3000

---

## ⚠️ Current Status

### ✅ Working
- Landing page (fully functional)
- UI components library
- Basic NDA generation API

### ❌ Not Working (Needs Implementation)
- **Authentication** - Login/Logout pages don't exist
- **Dashboard** - Missing components and API routes
- **Database** - No database connection
- **Billing** - Stripe integration incomplete
- **Team Features** - Components missing

---

## 🔧 Immediate Fixes Needed

### Critical Issues (App Won't Run Properly)

1. **Missing next-auth package**
   ```bash
   pnpm add next-auth
   ```

2. **Missing dashboard components** (referenced but don't exist):
   - `components/dashboard/dashboard-header.tsx`
   - `components/dashboard/dashboard-stats.tsx`
   - `components/dashboard/recent-documents.tsx`
   - `components/dashboard/dashboard-sidebar.tsx`
   - `components/auth-check.tsx`

3. **Missing API routes**:
   - `/app/api/auth/[...nextauth]/route.ts`
   - `/app/api/dashboard/route.ts`
   - `/app/api/settings/route.ts`
   - `/app/api/documents/route.ts`

4. **Header login buttons** - Need to link to `/login` page

---

## 📋 Development Checklist

### Phase 1: Authentication (Start Here)
- [ ] Install `next-auth`
- [ ] Create `.env.local` with required variables
- [ ] Set up database (Prisma)
- [ ] Create NextAuth API route
- [ ] Create login page (`/app/login/page.tsx`)
- [ ] Create signup page (`/app/signup/page.tsx`)
- [ ] Create `AuthCheck` component
- [ ] Create missing dashboard components
- [ ] Add `SessionProvider` to root layout
- [ ] Update header with auth links

### Phase 2: Core Features
- [ ] Create dashboard API route
- [ ] Create documents API route
- [ ] Create settings API route
- [ ] Complete dashboard pages
- [ ] Complete documents pages

### Phase 3: Billing
- [ ] Install Stripe packages
- [ ] Create billing API routes
- [ ] Create billing components
- [ ] Complete billing page

### Phase 4: Team
- [ ] Create team API routes
- [ ] Create team components
- [ ] Complete team page

---

## 🐛 Known Issues

1. **Dashboard page** - Uses `useSession` but no SessionProvider
2. **Dashboard layout** - Imports `AuthCheck` component that doesn't exist
3. **Settings page** - Calls `/api/settings` which doesn't exist
4. **Billing page** - Uses Stripe but keys not configured
5. **Team page** - Uses components that don't exist

---

## 📚 Documentation

- Full roadmap: See `ROADMAP.md`
- Component library: shadcn/ui (already installed)
- Next.js docs: https://nextjs.org/docs
- NextAuth docs: https://next-auth.js.org/
- Prisma docs: https://www.prisma.io/docs

---

## 🆘 Troubleshooting

### "Module not found: next-auth"
```bash
pnpm add next-auth
```

### "Cannot find module '@/components/auth-check'"
Create the component or comment out the import temporarily.

### "NEXTAUTH_SECRET is missing"
Add it to `.env.local` (see Step 2 above).

### Database connection errors
1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` in `.env.local`
3. Run `npx prisma migrate dev`

---

## 🎯 Next Actions

1. **Review ROADMAP.md** for full development plan
2. **Start with Phase 1** - Authentication setup
3. **Create GitHub issues** for each task
4. **Set up database** before implementing features

---

*For detailed development plan, see ROADMAP.md*


