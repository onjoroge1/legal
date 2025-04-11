import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixRealEstateCategory() {
  try {
    console.log('Starting real estate category fix...')

    // First, ensure the real estate category exists with the correct ID and slug
    const realEstateCategory = await prisma.category.upsert({
      where: { id: 'cm9bhpf6d000yvbl0qw9aqww3' },
      update: {
        name: 'Real Estate',
        description: 'Legal documents for real estate transactions',
        slug: 'real-estate'
      },
      create: {
        id: 'cm9bhpf6d000yvbl0qw9aqww3',
        name: 'Real Estate',
        description: 'Legal documents for real estate transactions',
        slug: 'real-estate'
      }
    })

    console.log('Updated real estate category:', realEstateCategory)

  } catch (error) {
    console.error('Error fixing real estate category:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixRealEstateCategory() 