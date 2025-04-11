import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function analyzeTemplates() {
  try {
    console.log('Starting template analysis...')

    // Get all categories
    const categories = await prisma.category.findMany()
    console.log('\n=== Categories ===')
    console.log(`Total categories: ${categories.length}`)
    categories.forEach(cat => console.log(`- ${cat.name} (${cat.id})`))

    // Get all templates with their categories
    const templates = await prisma.documentTemplate.findMany({
      include: {
        category: true
      }
    })

    // Count templates per category
    const categoryCounts = new Map<string, number>()
    categories.forEach(cat => categoryCounts.set(cat.id, 0))
    
    // Templates without valid categories
    const invalidTemplates: any[] = []

    templates.forEach(template => {
      if (template.category) {
        const currentCount = categoryCounts.get(template.categoryId) || 0
        categoryCounts.set(template.categoryId, currentCount + 1)
      } else {
        invalidTemplates.push({
          id: template.id,
          name: template.name,
          categoryId: template.categoryId
        })
      }
    })

    // Print category counts
    console.log('\n=== Templates per Category ===')
    categories.forEach(cat => {
      const count = categoryCounts.get(cat.id) || 0
      console.log(`- ${cat.name}: ${count} templates`)
    })

    // Print invalid templates
    if (invalidTemplates.length > 0) {
      console.log('\n=== Templates with Invalid Categories ===')
      invalidTemplates.forEach(template => {
        console.log(`- ${template.name} (ID: ${template.id})`)
        console.log(`  Invalid category ID: ${template.categoryId}`)
      })
    } else {
      console.log('\nNo templates found with invalid categories')
    }

    console.log(`\nTotal templates analyzed: ${templates.length}`)

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

analyzeTemplates() 