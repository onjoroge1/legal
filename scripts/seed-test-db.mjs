import { PrismaClient } from '@prisma/client'
const url = new URL(process.env.DATABASE_URL || '')
if (!['localhost', '127.0.0.1'].includes(url.hostname) || !url.pathname.startsWith('/legal_test')) throw new Error('Refusing fixtures outside an explicitly named local legal_test database')
const prisma = new PrismaClient({ log: [] })
try {
  await prisma.user.upsert({ where: { email: 'fixture@example.invalid' }, update: {}, create: { id: 'fixture-user', name: 'Synthetic test user', email: 'fixture@example.invalid', password: '!login-disabled-fixture' } })
  await prisma.userDocument.upsert({ where: { id: 'fixture-document' }, update: {}, create: { id: 'fixture-document', userId: 'fixture-user', title: 'Synthetic fixture', type: 'nda', content: 'Synthetic test document. No legal effect.', status: 'draft' } })
} finally { await prisma.$disconnect() }
