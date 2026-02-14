# Prisma Setup Guide

## ✅ What's Already Done

1. **Prisma Schema** - Located at `prisma/schema.prisma`
   - Complete schema with User, Account, Session, Document, and related models
   - Configured for PostgreSQL database
   - Includes NextAuth-compatible models (User, Account, Session, VerificationToken)

2. **Prisma Client Setup** - Located at `lib/prisma.ts`
   - Singleton pattern for Prisma Client
   - Development logging configured

3. **Migrations** - Located at `prisma/migrations/`
   - Initial migration exists: `20250419144420_init`

## 📦 Required Packages

The following packages have been added to `package.json`:

### Dependencies:
- `@prisma/client` - Prisma Client for database queries
- `@next-auth/prisma-adapter` - NextAuth adapter for Prisma
- `bcryptjs` - Password hashing

### Dev Dependencies:
- `prisma` - Prisma CLI for migrations and schema management
- `@types/bcryptjs` - TypeScript types for bcryptjs

## 🚀 Next Steps

### 1. Install Dependencies

Run in your terminal:
```bash
npm install
```

This will install:
- `@prisma/client`
- `@next-auth/prisma-adapter`
- `bcryptjs`
- `prisma` (dev dependency)
- `@types/bcryptjs` (dev dependency)

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory (if it doesn't exist):

```env
# Database - PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/legal_docs?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI (for AI document generation)
OPENAI_API_KEY="sk-your-openai-api-key"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Generate Prisma Client

After installing dependencies, generate the Prisma Client:

```bash
npx prisma generate
```

This will:
- Read your `prisma/schema.prisma` file
- Generate TypeScript types
- Create the Prisma Client in `node_modules/.prisma/client`

### 4. Run Database Migrations

If you have a fresh database, run:

```bash
npx prisma migrate dev
```

This will:
- Apply all pending migrations
- Generate the Prisma Client automatically

If you already have migrations applied, you can just generate the client:

```bash
npx prisma generate
```

### 5. Update Auth Configuration

Once Prisma is set up, update `lib/auth.ts`:

1. Uncomment the Prisma imports:
```typescript
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
```

2. Uncomment the adapter:
```typescript
adapter: PrismaAdapter(prisma),
```

3. Update the `authorize` function in CredentialsProvider:
```typescript
async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email }
  })
  
  if (!user || !user.password) {
    return null
  }
  
  const isValidPassword = await bcrypt.compare(
    credentials.password,
    user.password
  )
  
  if (!isValidPassword) {
    return null
  }
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  }
}
```

### 6. Create Signup API Route

Create `app/api/auth/signup/route.ts`:

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import * as z from "zod"

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

## ✅ Verification

After setup, verify everything works:

1. **Check Prisma Client is generated:**
   ```bash
   ls node_modules/.prisma/client
   ```

2. **Test database connection:**
   ```bash
   npx prisma db pull
   ```

3. **View database in Prisma Studio:**
   ```bash
   npx prisma studio
   ```

## 📝 Notes

- The Prisma schema is already configured for PostgreSQL
- If you're using a different database, update the `provider` in `prisma/schema.prisma`
- The schema includes all necessary models for NextAuth and document management
- Make sure your `DATABASE_URL` is correct and the database is accessible

## 🔗 Related Files

- `prisma/schema.prisma` - Database schema
- `lib/prisma.ts` - Prisma Client singleton
- `lib/auth.ts` - NextAuth configuration (needs Prisma adapter uncommented)
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API route




