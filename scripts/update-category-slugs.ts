import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categorySlugMap: Record<string, string> = {
  'cm9bhpeod000xvbl04d2dxx55': 'corporate',
  'cm9bh3u2e0000vbcg33mxuc64': 'employment',
  'cm9bhpf6d000yvbl0qw9aqww3': 'real-estate',
  'cm9bhpfkd000zvbl0qw9aqww4': 'business-formation'
}

async function updateCategorySlugs() {
  try {
    console.log('Starting category slug update...')

    // Get all categories
    const categories = await prisma.category.findMany()

    // Update each category with its slug
    for (const category of categories) {
      const slug = categorySlugMap[category.id] || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      await prisma.category.update({
        where: { id: category.id },
        data: { slug }
      })
      
      console.log(`Updated category "${category.name}" with slug "${slug}"`)
    }

    console.log('Category slug update completed successfully!')
  } catch (error) {
    console.error('Error updating category slugs:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the update function
updateCategorySlugs()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  }) 