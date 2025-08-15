# Project Overview

A Next.js + Prisma application for managing legal document templates, questionnaires, and document generation.

## Prerequisites
- Node.js 22.x
- npm 10.x
- PostgreSQL database (e.g., Neon)

## Quick Start

1. Install dependencies
```bash
npm ci
```

2. Configure environment
- Set `DATABASE_URL` (PostgreSQL):
```bash
export DATABASE_URL='postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require'
```
- Optionally create a `.env` file with the same variable for persistence.

3. Apply DB migrations
```bash
npx prisma migrate deploy
```

4. Seed templates and questionnaires (full dataset)
```bash
npx ts-node scripts/seed-all.ts
```

5. Start the app
```bash
npm run dev
```

## Scripts
- Build the app
```bash
npm run build
```

- Database reset (dev only)
```bash
npm run db:reset
```

- Default Prisma seed (categories + templates subset)
```bash
npm run db:seed
```

- Corporate + Business + Legal templates
```bash
npm run seed:corporate
npm run seed:business-formation
npm run seed:legal-docs
```

- Employment templates
```bash
npm run seed:employment
```

- Real estate templates
```bash
npm run seed:real-estate
```

- Generate per-template markdown with questionnaires
```bash
npx ts-node scripts/generate-template-docs.ts
```
Outputs to `docs/templates/*.md`.

## Useful Utilities
- Test DB connection and print a sample questionnaire
```bash
npx ts-node scripts/test-db-connection.ts
```

- Verify questionnaires and their questions
```bash
npx ts-node scripts/check-questionnaires.ts
```

## Tech Stack
- Next.js 15
- Prisma ORM
- PostgreSQL
- TypeScript

## Deployment
- Ensure `DATABASE_URL` is set at build/runtime.
- For CI, run:
```bash
npm ci
npx prisma generate
npm run build
npx prisma migrate deploy
```

## Notes
- Seeds are idempotent where possible (using upsert). Running them multiple times should be safe.
- Some scripts may create a test user (`test@example.com`) for development purposes.