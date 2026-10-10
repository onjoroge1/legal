import { PrismaClient } from '@prisma/client'
const url = new URL(process.env.DATABASE_URL || '')
if (!['localhost', '127.0.0.1'].includes(url.hostname) || url.pathname !== '/legal_test_restored') throw new Error('Restore verification is fixture-only')
const db = new PrismaClient({ log: [] })
try {
  const doc = await db.userDocument.findUnique({ where: { id: 'fixture-document' } })
  if (doc?.content !== 'Synthetic test document. No legal effect.' || doc.userId !== 'fixture-user') throw new Error('Restored fixture does not match')
  console.log('Restored fixture matches.')
} finally { await db.$disconnect() }
