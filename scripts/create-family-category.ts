import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createFamilyCategory() {
  try {
    console.log('Creating family category...')
    
    const familyCategory = await prisma.category.upsert({
      where: { id: 'family' },
      update: {},
      create: {
        id: 'family',
        name: 'Family & Personal',
        slug: 'family',
        description: 'Legal documents related to family matters including child care, medical consent, and more'
      }
    })

    console.log('Successfully created family category:', familyCategory)
  } catch (error) {
    console.error('Failed to create family category:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createFamilyCategory() 