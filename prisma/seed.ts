import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
import seedLegalDocuments from '../scripts/seed-legal-documents'
import seedBusinessFormation from '../scripts/seed-business-formation'
import seedCorporateGovernance from '../scripts/seed-corporate-governance'
import seedEmployment from '../scripts/seed-employment'
import seedEmploymentTemplates from '../scripts/seed-employment-templates'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  try {
    // Create categories
    const categories = [
      {
        id: 'cm9bh3u2e0000vbcg33mxuc64',
        name: 'Employment & HR',
        slug: 'employment',
        description: 'Employment contracts, offer letters, NDAs, and other HR documents'
      },
      {
        id: 'cm9bhpeod000xvbl04d2dxx55',
        name: 'Corporate Governance',
        slug: 'corporate',
        description: 'Board resolutions, bylaws, and corporate policies'
      },
      {
        id: 'cm9bhpf6d000yvbl0qw9aqww3',
        name: 'Real Estate',
        slug: 'real-estate',
        description: 'Lease agreements, rental contracts, and property documents'
      },
      {
        id: 'cm9bhpfkd000zvbl0qw9aqww4',
        name: 'Business Formation',
        slug: 'business-formation',
        description: 'LLC operating agreements, partnership agreements, and incorporation documents'
      }
    ]

    for (const category of categories) {
      await prisma.category.upsert({
        where: { id: category.id },
        update: category,
        create: category
      })
      console.log('Created/Updated category:', category.name)
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

    // Run the seed scripts for templates and questionnaires
    await seedCorporateGovernance()
    await seedEmploymentTemplates()
    await seedBusinessFormation()
    
    // Real Estate templates
    const realEstateScripts = [
      '../scripts/create-real-estate-templates',
      '../scripts/create-real-estate-templates-2',
      '../scripts/create-residential-lease',
      '../scripts/create-lease-application',
      '../scripts/create-eviction-notice',
      '../scripts/create-pay-or-quit-notice',
      '../scripts/create-lease-termination-notice',
      '../scripts/create-rent-increase-notice',
      '../scripts/create-roommate-and-trust-deed',
      '../scripts/create-deed-templates',
      '../scripts/create-commercial-templates'
    ]

    for (const script of realEstateScripts) {
      const module = require(script)
      const mainFunction = Object.values(module)[0]
      if (typeof mainFunction === 'function') {
        await mainFunction()
      }
    }
    
    console.log('All seed scripts executed successfully')
  } catch (error) {
    console.error('Error running seed scripts:', error)
    throw error
  }

  console.log('Database seed completed!')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  }) 