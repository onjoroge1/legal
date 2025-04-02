const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const password = await hash('password123', 12)

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password,
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company',
      businessName: 'Test Business',
      businessType: 'LLC',
      businessId: '123456789',
      businessAddress: '123 Test St',
      businessCity: 'Test City',
      businessState: 'CA',
      businessZip: '12345',
      defaultDocumentFormat: 'PDF',
      autoSaveEnabled: true,
      defaultLanguage: 'English (US)',
      timezone: 'UTC',
      emailNotifications: JSON.stringify({
        documentUpdates: true,
        billingNotifications: true,
        newFeatures: true,
        marketingEmails: false
      }),
      inAppNotifications: JSON.stringify({
        documentReminders: true,
        teamActivity: true
      }),
      twoFactorEnabled: false,
      activeSessions: JSON.stringify([])
    },
  })

  console.log('Created user:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 