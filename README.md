# LegalLawDocs.com - AI-Powered Legal Document Generation Platform

A comprehensive Next.js application for generating professional, legally compliant documents using AI technology. The platform offers state-specific compliance, affordable pricing, and instant delivery of legal documents.

## 🚀 Features

### Core Functionality
- **AI-Powered Document Generation**: Interactive chat-based document creation with smart question flows
- **12+ Legal Document Types**: NDA, LLC Operating Agreement, Employment Contracts, Lease Agreements, and more
- **State-Specific Compliance**: Automatically adapts documents to all 50 US states
- **User Authentication**: Secure login/signup with NextAuth.js
- **Subscription Management**: Monthly subscription plans with free document access
- **Document Management**: Dashboard for viewing, managing, and downloading generated documents
- **Settings Management**: Comprehensive user profile and preferences management

### User Experience
- **Public Document Pages**: SEO-optimized pages for each document type
- **Dynamic Document Generation**: Step-by-step AI-guided document creation
- **Preview & Checkout**: Watermarked previews before purchase
- **Multiple Download Formats**: PDF and DOCX support
- **Responsive Design**: Mobile-first responsive UI with modern design

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.6** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** with custom design system
- **shadcn/ui** component library
- **Lucide React** icons
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching

### Backend & Database
- **NextAuth.js v4** for authentication
- **Prisma ORM** with PostgreSQL
- **bcryptjs** for password hashing
- **Zod** for schema validation

### AI & Integrations
- **Vercel AI SDK** (`@ai-sdk/react`) for AI chat functionality
- **Stripe** (optional) for payment processing

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prisma Studio** for database management

## 📋 Prerequisites

- Node.js 18+ (or 22+ recommended)
- npm, yarn, or pnpm
- PostgreSQL database (or SQLite for development)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-legal-documents
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

**Note**: If you encounter peer dependency issues, use:
```bash
npm install --legacy-peer-deps
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/legal_docs?schema=public"
# or for SQLite (development):
# DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Generate a secret:
# openssl rand -base64 32

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### 4. Database Setup

#### Initialize Prisma

```bash
npx prisma generate
npx prisma db push
# or run migrations:
npx prisma migrate dev --name init
```

#### Seed the Database (Optional)

```bash
npx prisma db seed
```

This creates an admin user:
- Email: `admin@example.com` (or from `ADMIN_EMAIL` env var)
- Password: `admin123` (or from `ADMIN_PASSWORD` env var)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-legal-documents/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── dashboard/            # Dashboard data endpoints
│   │   ├── documents/            # Document management endpoints
│   │   ├── settings/             # User settings endpoints
│   │   └── user/                 # User profile endpoints
│   ├── dashboard/                # Protected dashboard pages
│   │   ├── billing/              # Billing & subscription
│   │   ├── documents/            # User documents list
│   │   ├── settings/             # User settings
│   │   ├── templates/            # Document templates
│   │   └── page.tsx              # Dashboard home
│   ├── documents/                # Public document pages
│   │   ├── [slug]/               # Dynamic document pages
│   │   │   ├── generate/         # AI document generation
│   │   │   ├── preview/          # Document preview
│   │   │   ├── checkout/         # Payment checkout
│   │   │   └── download/         # Document download
│   │   └── page.tsx              # Documents listing
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── dashboard/                # Dashboard-specific components
│   ├── ui/                       # shadcn/ui components
│   ├── header.tsx                # Site header/navbar
│   ├── footer.tsx                # Site footer
│   └── session-provider.tsx      # NextAuth session wrapper
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── document-data.ts          # Document type definitions
│   ├── prisma.ts                 # Prisma client
│   ├── subscription.ts           # Subscription utilities
│   └── utils.ts                  # General utilities
├── prisma/                       # Database schema & migrations
│   ├── schema.prisma             # Prisma schema
│   ├── migrations/               # Database migrations
│   └── seed.ts                   # Database seed script
└── public/                       # Static assets
```

## 🔐 Authentication

The application uses **NextAuth.js v4** with credentials provider:

- **Sign Up**: `/signup` - Create new account
- **Sign In**: `/login` - Login with email/password
- **Session Management**: Automatic session refresh and JWT tokens
- **Protected Routes**: Dashboard routes require authentication

### User Flow
1. User signs up → Account created in database
2. User signs in → Session created with JWT
3. Session persists across page refreshes
4. Protected routes check authentication status

## 📄 Available Documents

The platform currently supports **12 legal document types**:

### Business Documents
- Non-Disclosure Agreement (NDA)
- LLC Operating Agreement
- Partnership Agreement
- Service Agreement
- Purchase Agreement

### Employment Documents
- Employment Contract
- Independent Contractor Agreement
- Non-Compete Agreement

### Real Estate Documents
- Residential Lease Agreement
- Commercial Lease Agreement

### Personal Documents
- Power of Attorney
- Last Will & Testament

## 🎯 Key Pages & Routes

### Public Pages
- `/` - Homepage with features, pricing, FAQ
- `/documents` - Browse all available documents
- `/documents/[slug]` - Document detail page (SEO-optimized)
- `/login` - User login
- `/signup` - User registration

### Protected Dashboard Pages
- `/dashboard` - Dashboard home with stats and recent documents
- `/dashboard/documents` - List of user's generated documents
- `/dashboard/templates` - Browse document templates
- `/dashboard/settings` - User profile and preferences
- `/dashboard/billing` - Subscription and billing management
- `/dashboard/team` - Team collaboration (coming soon)

### Document Generation Flow
1. `/documents/[slug]` - View document details
2. `/documents/[slug]/generate` - AI chat-based generation
3. `/documents/[slug]/preview` - Preview watermarked document
4. `/documents/[slug]/checkout` - Purchase or subscribe
5. `/documents/[slug]/download` - Download final document

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `GET /api/auth/session` - Get current session (NextAuth)
- `POST /api/auth/[...nextauth]` - NextAuth handler

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics
- `GET /api/dashboard/categories` - Get document categories
- `GET /api/dashboard/categories/[slug]` - Get category details

### Documents
- `GET /api/documents` - Get user's documents (with filters)
- `POST /api/documents/download` - Generate/download document

### User
- `GET /api/user/name` - Get user's display name
- `GET /api/user/subscription` - Get subscription status
- `GET /api/user/document-access` - Check document access

### Settings
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update user settings
- `POST /api/settings/password` - Change password

## 💳 Subscription System

The platform supports two pricing models:

1. **Single Document Purchase**: $19.99 per document
2. **Monthly Subscription**: $9/month (unlimited documents)

### Subscription Features
- Active subscribers see "Free" badges on documents
- Subscribers skip checkout and go directly to download
- Subscription status checked on all document pages
- Subscription management in `/dashboard/billing`

## 🎨 UI Components

Built with **shadcn/ui** and custom components:

- **Cards**: Document cards, stats cards, info cards
- **Forms**: Login, signup, settings forms with validation
- **Navigation**: Sidebar, header, mobile menu
- **Modals**: Dialogs, sheets, popovers
- **Feedback**: Toasts, alerts, loading states
- **Data Display**: Tables, lists, badges

## 🔧 Development

### Database Management

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Push schema changes (dev only)
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Seed database
npx prisma db seed
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**
   - Run `npm install` again
   - Clear `.next` folder: `rm -rf .next`
   - Use `npm install --legacy-peer-deps` if peer dependency issues

2. **Database connection errors**
   - Check `DATABASE_URL` in `.env.local`
   - Ensure PostgreSQL is running
   - Run `npx prisma generate` after schema changes

3. **NextAuth session errors**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Clear browser cookies and try again

4. **Build errors**
   - Check for TypeScript errors: `npm run build`
   - Verify all environment variables are set
   - Ensure Prisma client is generated

## 📝 Recent Improvements

### Authentication & User Management
- ✅ Full authentication system with NextAuth.js
- ✅ User registration and login
- ✅ Session management with JWT
- ✅ Protected routes and middleware
- ✅ User profile management in settings

### Document System
- ✅ 12+ document types with dynamic routing
- ✅ SEO-optimized document pages
- ✅ AI-powered document generation flow
- ✅ Preview, checkout, and download pages
- ✅ Subscription-based access control

### Dashboard
- ✅ Comprehensive dashboard with stats
- ✅ Document management interface
- ✅ Template browsing with search/filter
- ✅ Settings page with full functionality
- ✅ Billing and subscription management

### UI/UX
- ✅ Responsive design across all pages
- ✅ Consistent component library
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback

## 🔮 Future Enhancements

- [ ] Stripe payment integration (fully functional)
- [ ] Document collaboration features
- [ ] Team management and sharing
- [ ] Document versioning and history
- [ ] Advanced AI document analysis
- [ ] Email notifications
- [ ] Document templates marketplace
- [ ] API for third-party integrations

## 📚 Additional Documentation

- `ROADMAP.md` - Development roadmap
- `STATUS.md` - Current project status
- `USER_FLOW_ANALYSIS.md` - User flow documentation
- `SEO_CHECKLIST.md` - SEO optimization guidelines
- `PRISMA_SETUP.md` - Database setup guide

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📄 License

Private - All rights reserved

---

**Built with ❤️ using Next.js, React, and TypeScript**

