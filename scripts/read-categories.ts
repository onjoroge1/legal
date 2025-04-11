import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function readCategories() {
  try {
    console.log('Reading categories...')

    // Get all categories
    const categories = await prisma.category.findMany()

    // Log each category
    for (const category of categories) {
      console.log({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description
      })
    }

    console.log('Categories read successfully!')
  } catch (error) {
    console.error('Error reading categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the read function
readCategories()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  }) 