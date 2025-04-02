import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
import { TEMPLATE_CATEGORIES } from './constants'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Clear existing data
  await prisma.fieldOption.deleteMany()
  await prisma.fieldDependency.deleteMany()
  await prisma.templateField.deleteMany()
  await prisma.documentTemplate.deleteMany()
  await prisma.category.deleteMany()

  // Seed categories and templates
  for (const categoryData of TEMPLATE_CATEGORIES) {
    console.log(`Creating category: ${categoryData.name}`)
    
    const category = await prisma.category.create({
      data: {
        id: categoryData.id,
        name: categoryData.name,
        description: categoryData.description,
        templates: {
          create: categoryData.templates.map(template => ({
            id: template.id,
            name: template.name,
            description: template.description,
            type: template.type || 'document',
            version: '1.0.0',
            content: '',
            state: 'draft'
          }))
        }
      }
    })

    console.log(`Created category: ${category.name}`)
  }

  // Create an admin user if it doesn't exist
  const adminEmail = "admin@example.com"
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    const hashedPassword = await hash("admin123", 12)
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      }
    })
    console.log("Created admin user")
  }

  console.log('Database seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 