import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixCategories() {
  try {
    console.log('Starting category fix...')

    // First, let's see what's in the database
    const categories = await prisma.category.findMany()
    console.log('Found categories:', categories)

    const templates = await prisma.documentTemplate.findMany({
      include: {
        category: true
      }
    })
    console.log('Found templates:', templates.map(t => ({
      id: t.id,
      name: t.name,
      categoryId: t.categoryId,
      categoryName: t.category?.name
    })))

    // Delete any categories that don't match our expected IDs
    await prisma.category.deleteMany({
      where: {
        id: {
          notIn: ['business', 'corporate', 'real-estate', 'employment', 'intellectual-property', 'contracts', 'partnerships', 'family', 'automotive', 'education']
        }
      }
    })

    // Create/update our core categories
    const businessCategory = await prisma.category.upsert({
      where: { id: 'business' },
      update: {
        name: 'Business Formation',
        description: 'Company formation, partnership agreements, and corporate documents'
      },
      create: {
        id: 'business',
        name: 'Business Formation',
        description: 'Company formation, partnership agreements, and corporate documents'
      }
    })

    const corporateCategory = await prisma.category.upsert({
      where: { id: 'corporate' },
      update: {
        name: 'Corporate Governance',
        description: 'Board resolutions, bylaws, and corporate policies'
      },
      create: {
        id: 'corporate',
        name: 'Corporate Governance',
        description: 'Board resolutions, bylaws, and corporate policies'
      }
    })

    console.log('Updated categories:', {
      business: businessCategory,
      corporate: corporateCategory
    })

    // Update any templates that might have wrong category IDs
    await prisma.documentTemplate.updateMany({
      where: {
        OR: [
          { id: { startsWith: 'articles-' } },
          { id: { startsWith: 'business-' } },
          { id: { startsWith: 'llc-' } },
          { id: { startsWith: 'incorporation' } }
        ]
      },
      data: {
        categoryId: businessCategory.id
      }
    })

    await prisma.documentTemplate.updateMany({
      where: {
        OR: [
          { id: { startsWith: 'board-' } },
          { id: { startsWith: 'corporate-' } },
          { id: { startsWith: 'shareholder-' } },
          { id: { startsWith: 'officer-' } }
        ]
      },
      data: {
        categoryId: corporateCategory.id
      }
    })

    // Check final state
    const finalCategories = await prisma.category.findMany()
    console.log('Final categories:', finalCategories)

    const finalTemplates = await prisma.documentTemplate.findMany({
      include: {
        category: true
      }
    })
    console.log('Final templates:', finalTemplates.map(t => ({
      id: t.id,
      name: t.name,
      categoryId: t.categoryId,
      categoryName: t.category?.name
    })))

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixCategories() 