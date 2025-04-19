import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const updates = [
      {
        id: 'business',
        name: 'Business Formation',
        slug: 'business-formation',
        description: 'Company formation, partnership agreements, and corporate documents'
      },
      {
        id: 'corporate',
        name: 'Corporate Governance',
        slug: 'corporate-governance',
        description: 'Corporate governance documents and policies'
      },
      {
        id: 'cm9bh3u2e0000vbcg33mxuc64',
        name: 'Employment',
        slug: 'employment',
        description: 'Employment contracts and HR documents'
      },
      {
        id: 'cm9bh3u2s0001vbcg20r64fyg',
        name: 'Family Law',
        slug: 'family-law',
        description: 'Family law documents and agreements'
      },
      {
        id: 'cm9bh3u330002vbcg4nkjeixo',
        name: 'Real Estate',
        slug: 'real-estate',
        description: 'Real estate contracts and agreements'
      }
    ]

    for (const update of updates) {
      await prisma.category.upsert({
        where: { id: update.id },
        update: {
          name: update.name,
          slug: update.slug,
          description: update.description
        },
        create: {
          id: update.id,
          name: update.name,
          slug: update.slug,
          description: update.description
        }
      })
      console.log(`Updated ${update.name} category`)
    }

    console.log('Successfully updated all category codes')
  } catch (error) {
    console.error('Error updating category codes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 