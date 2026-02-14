# Setup Instructions - LegalLawDocs.com

## ✅ What's Been Completed

1. **Fixed dependency conflict** - Updated `date-fns` to version 3.6.0
2. **Created authentication system**:
   - NextAuth configuration (`lib/auth.ts`)
   - NextAuth API route (`app/api/auth/[...nextauth]/route.ts`)
   - Login page (`app/login/page.tsx`)
   - Signup page (`app/signup/page.tsx`)
   - AuthCheck component (`components/auth-check.tsx`)
   - SessionProvider wrapper (`components/session-provider.tsx`)
3. **Created dashboard components**:
   - Dashboard sidebar (`components/dashboard/dashboard-sidebar.tsx`)
   - Dashboard header (`components/dashboard/dashboard-header.tsx`)
   - Dashboard stats (`components/dashboard/dashboard-stats.tsx`)
   - Recent documents (`components/dashboard/recent-documents.tsx`)
4. **Updated root layout** - Added SessionProvider and Toaster
5. **Updated header** - Added links to login/signup pages
6. **Created utility files**:
   - Safe toast utility (`lib/safe-toast.ts`)
   - Prisma client setup (`lib/prisma.ts`)

## 📋 Next Steps (In Order)

### Step 1: Install Dependencies

Run in your terminal:
```bash
cd /Users/obadiah/Documents/ai-legal-documents
npm install
```

This will install:
- All existing dependencies (with fixed date-fns version)
- next-auth (added to package.json)

**Note**: If you get dependency conflicts, try:
```bash
npm install --legacy-peer-deps
```

### Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (you'll set this up in Step 3)
DATABASE_URL="postgresql://user:password@localhost:5432/legal_docs?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI (for AI document generation)
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe (optional for now)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 3: Set Up Database with Prisma

1. **Install Prisma:**
   ```bash
   npm install -D prisma
   npm install @prisma/client
   npm install @next-auth/prisma-adapter
   npm install bcryptjs
   npm install -D @types/bcryptjs
   ```

2. **Initialize Prisma:**
   ```bash
   npx prisma init
   ```

3. **Update `prisma/schema.prisma`** with this schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // For credentials provider
  role          String    @default("user") // user, admin
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts Account[]
  sessions Session[]
  documents Document[]
  settings  UserSettings?
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Document {
  id          String   @id @default(cuid())
  title       String
  type        String
  content     String?  @db.Text
  status      String   @default("draft") // draft, completed, archived
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model UserSettings {
  id        String   @id @default(cuid())
  userId    String   @unique
  settings  Json     @default("{}")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

4. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

6. **Update `lib/auth.ts`** - Uncomment the Prisma imports and adapter code

### Step 4: Create Signup API Route

Create `/app/api/auth/signup/route.ts`:

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
```

### Step 5: Update Auth Configuration

In `lib/auth.ts`, uncomment the Prisma-related code and update the authorize function to use the database.

### Step 6: Test the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit:**
   - Landing page: http://localhost:3000
   - Login: http://localhost:3000/login
   - Signup: http://localhost:3000/signup
   - Dashboard: http://localhost:3000/dashboard (requires login)

### Step 7: Create Dashboard API Route

Create `/app/api/dashboard/route.ts` to provide data for the dashboard page.

---

## 🐛 Troubleshooting

### "Module not found: next-auth"
Run: `npm install next-auth`

### "Cannot find module '@/lib/prisma'"
Make sure you've:
1. Installed Prisma
2. Run `npx prisma generate`
3. Created the database schema

### "NEXTAUTH_SECRET is missing"
Add it to `.env.local` (see Step 2)

### Database connection errors
1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` in `.env.local`
3. Run `npx prisma migrate dev`

---

## 📚 Additional Resources

- NextAuth.js Docs: https://next-auth.js.org/
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs

---

*Last Updated: After initial setup completion*





