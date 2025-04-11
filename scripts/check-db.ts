import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        templates: true
      }
    })
    
    console.log('Categories:', JSON.stringify(categories, null, 2))
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 