import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.documentTemplate.updateMany({
      where: {
        categoryId: "employment"
      },
      data: {
        categoryId: "cm9bh3u2e0000vbcg33mxuc64"
      }
    })

    await prisma.documentTemplate.updateMany({
      where: {
        categoryId: "real-estate"
      },
      data: {
        categoryId: "cm9bh3u330002vbcg4nkjeixo"
      }
    })

    console.log('Successfully updated all category codes')
  } catch (error) {
    console.error('Error updating category codes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 