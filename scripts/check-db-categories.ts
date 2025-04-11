import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkCategories() {
  try {
    console.log('Checking categories in database...')

    const categories = await prisma.category.findMany({
      include: {
        templates: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    console.log('\nFound categories:', categories.length)
    categories.forEach(category => {
      console.log('\nCategory:', {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        templateCount: category.templates.length,
        templates: category.templates.map(t => ({
          id: t.id,
          name: t.name
        }))
      })
    })

  } catch (error) {
    console.error('Error checking categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCategories() 