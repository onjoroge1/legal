import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Restoring categories...')
    
    await prisma.category.deleteMany()
    
    await prisma.category.createMany({
      data: [
        {
          id: 'cat1',
          name: 'Employment & HR',
          slug: 'employment-hr',
          description: 'Documents related to employment and human resources'
        },
        {
          id: 'cat2',
          name: 'Corporate Governance',
          slug: 'corporate-governance',
          description: 'Documents related to corporate governance'
        },
        {
          id: 'cat3',
          name: 'Real Estate',
          slug: 'real-estate',
          description: 'Documents related to real estate transactions'
        },
        {
          id: 'cat4',
          name: 'Business Formation',
          slug: 'business-formation',
          description: 'Documents related to business formation and registration'
        }
      ]
    })
    
    console.log('Categories restored successfully!')
  } catch (error) {
    console.error('Error restoring categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 