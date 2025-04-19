import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const updates = [
      {
        id: 'business',
        code: 'business'
      },
      {
        id: 'corporate',
        code: 'corporate'
      },
      {
        id: 'cm9bh3u2e0000vbcg33mxuc64',
        code: 'employment'
      },
      {
        id: 'cm9bh3u2s0001vbcg20r64fyg',
        code: 'family'
      },
      {
        id: 'cm9bh3u330002vbcg4nkjeixo',
        code: 'real-estate'
      }
    ]

    for (const update of updates) {
      // Using executeRaw to bypass type issues
      await prisma.$executeRaw`UPDATE Category SET code = ${update.code} WHERE id = ${update.id}`
      console.log(`Updated ${update.code} category`)
    }

    // Update any templates using the old category IDs
    await prisma.documentTemplate.updateMany({
      where: {
        categoryId: "employment"
      },
      data: {
        categoryId: "cm9bh3u2e0000vbcg33mxuc64"
      }
    })

    console.log('Successfully updated all category codes')
  } catch (error) {
    console.error('Error updating category codes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 