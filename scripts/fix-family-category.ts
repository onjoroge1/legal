import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixFamilyCategory() {
  try {
    console.log('Starting family category consolidation...')

    // First, ensure the main Family Law category exists
    const familyLawCategory = await prisma.category.upsert({
      where: { id: 'cm9bh3u2s0001vbcg20r64fyg' },
      update: {
        name: 'Family Law',
        slug: 'family-law',
        description: 'Family law documents and agreements including child care, medical consent, and more'
      },
      create: {
        id: 'cm9bh3u2s0001vbcg20r64fyg',
        name: 'Family Law',
        slug: 'family-law',
        description: 'Family law documents and agreements including child care, medical consent, and more'
      }
    })
    console.log('Updated main Family Law category:', familyLawCategory)

    // Update all templates that were using the old 'family' category
    const updatedTemplates = await prisma.documentTemplate.updateMany({
      where: {
        categoryId: 'family'
      },
      data: {
        categoryId: 'cm9bh3u2s0001vbcg20r64fyg'
      }
    })
    console.log('Updated templates:', updatedTemplates)

    // Delete the old 'family' category
    const deletedCategory = await prisma.category.delete({
      where: { id: 'family' }
    })
    console.log('Deleted old family category:', deletedCategory)

    console.log('Family category consolidation completed successfully!')
  } catch (error) {
    console.error('Error consolidating family categories:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the fix function
if (require.main === module) {
  fixFamilyCategory()
    .catch((error) => {
      console.error('Error running fix:', error)
      process.exit(1)
    })
} 