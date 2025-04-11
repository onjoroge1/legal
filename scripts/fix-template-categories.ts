import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Category mapping based on template name patterns
const categoryPatterns: { [key: string]: string[] } = {
  'employment': ['employment', 'employee', 'contractor', 'nda', 'hr', 'offer', 'termination'],
  'business': ['business', 'llc', 'incorporation', 'formation', 'partnership'],
  'corporate': ['corporate', 'board', 'shareholder', 'officer', 'resolution', 'bylaws'],
  'real-estate': ['lease', 'rental', 'property', 'real estate', 'landlord', 'tenant'],
  'family': ['will', 'trust', 'power of attorney', 'family', 'personal']
}

async function fixTemplateCategories() {
  try {
    console.log('Starting template category fix...')

    // Get all templates with their current categories
    const templates = await prisma.documentTemplate.findMany({
      include: {
        category: true
      }
    })

    // Get all valid categories
    const categories = await prisma.category.findMany()
    const validCategoryIds = new Set(categories.map(cat => cat.id))

    // Track changes
    const changes: { templateId: string; oldCategory: string | null; newCategory: string }[] = []

    for (const template of templates) {
      // Skip if template already has a valid category
      if (template.category && validCategoryIds.has(template.categoryId)) {
        continue
      }

      // Find matching category based on template name/description
      const templateText = `${template.name} ${template.description || ''}`.toLowerCase()
      let matchedCategoryId: string | null = null

      for (const [categoryId, patterns] of Object.entries(categoryPatterns)) {
        if (patterns.some(pattern => templateText.includes(pattern))) {
          matchedCategoryId = categoryId
          break
        }
      }

      if (matchedCategoryId && validCategoryIds.has(matchedCategoryId)) {
        // Update template category
        await prisma.documentTemplate.update({
          where: { id: template.id },
          data: { categoryId: matchedCategoryId }
        })

        changes.push({
          templateId: template.id,
          oldCategory: template.category?.name || null,
          newCategory: categories.find(c => c.id === matchedCategoryId)?.name || 'Unknown'
        })
      }
    }

    // Print report
    console.log('\n=== Category Fix Report ===')
    if (changes.length === 0) {
      console.log('No changes needed - all templates have valid categories')
    } else {
      console.log(`Fixed ${changes.length} templates:`)
      changes.forEach(change => {
        console.log(`- ${change.templateId}`)
        console.log(`  From: ${change.oldCategory || 'No category'}`)
        console.log(`  To: ${change.newCategory}`)
      })
    }

    // Print final counts
    const finalCounts = await prisma.documentTemplate.groupBy({
      by: ['categoryId'],
      _count: true
    })

    console.log('\n=== Final Template Counts ===')
    finalCounts.forEach(count => {
      const category = categories.find(c => c.id === count.categoryId)
      console.log(`- ${category?.name || 'Unknown'}: ${count._count} templates`)
    })

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixTemplateCategories() 