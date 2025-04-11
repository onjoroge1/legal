import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // First, update any templates using the old category IDs
  await prisma.template.updateMany({
    where: {
      categoryId: "employment"
    },
    data: {
      categoryId: "cm9bh3u2e0000vbcg33mxuc64"
    }
  })

  await prisma.template.updateMany({
    where: {
      categoryId: "real-estate"
    },
    data: {
      categoryId: "cm9bh3u330002vbcg4nkjeixo"
    }
  })

  console.log('Updated template categories')

  // Now delete the old categories
  await prisma.category.deleteMany({
    where: {
      id: {
        in: ["employment", "real-estate"]
      }
    }
  })

  console.log('Cleaned up duplicate categories')

  // List remaining categories
  const categories = await prisma.category.findMany({
    include: {
      templates: true
    }
  })

  console.log('\nRemaining categories:')
  categories.forEach(category => {
    console.log(`\nID: ${category.id}`)
    console.log(`Name: ${category.name}`)
    console.log(`Description: ${category.description}`)
    console.log(`Number of templates: ${category.templates.length}`)
  })
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  }) 