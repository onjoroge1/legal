import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define our consistent CUIDs for categories
const CATEGORIES = {
  CORPORATE: 'cm9bhpeod000xvbl04d2dxx55',
  EMPLOYMENT: 'cm9bh3u2e0000vbcg33mxuc64',
  REAL_ESTATE: 'cm9bhpf6d000yvbl0qw9aqww3',
  BUSINESS_FORMATION: 'cm9bhpfkd000zvbl0qw9aqww4'
}

// Define our consistent CUIDs for templates
const TEMPLATES = {
  EMPLOYEE_HANDBOOK: 'cm9bh3u2e0001vbcg33mxuc65',
  EMPLOYEE_PRIVACY: 'cm9bh3u2e0002vbcg33mxuc66',
  EMPLOYEE_WARNING: 'cm9bh3u2e0003vbcg33mxuc67',
  EMPLOYMENT_OFFER: 'cm9bh3u2e0004vbcg33mxuc68',
  MINUTE_BOOK: 'minute-book-rights-inspection',
  BOARD_RESOLUTION: 'board-resolution',
  SHAREHOLDER_MEETING: 'shareholder-meeting-notice',
  OFFICER_APPOINTMENT: 'officer-appointment',
  CORPORATE_BYLAWS: 'corporate-bylaws',
  REGISTERED_AGENT: 'cm9bhpem2000fvbl0lbbcfjgd'
}

async function recreateData() {
  try {
    console.log('Starting data recreation...')

    // Create categories
    const categories = [
      {
        id: CATEGORIES.CORPORATE,
        name: 'Corporate Governance',
        description: 'Board resolutions, bylaws, and corporate policies'
      },
      {
        id: CATEGORIES.EMPLOYMENT,
        name: 'Employment & HR',
        description: 'Employment contracts, offer letters, NDAs, and other HR documents'
      },
      {
        id: CATEGORIES.REAL_ESTATE,
        name: 'Real Estate',
        description: 'Lease agreements, rental contracts, and property documents'
      },
      {
        id: CATEGORIES.BUSINESS_FORMATION,
        name: 'Business Formation',
        description: 'LLC operating agreements, partnership agreements, and incorporation documents'
      }
    ]

    // Create each category
    for (const category of categories) {
      await prisma.category.upsert({
        where: { id: category.id },
        update: category,
        create: category
      })
      console.log('Created/Updated category:', category.name)
    }

    // Import and run the seed scripts with our consistent IDs
    const seedScripts = [
      '../scripts/seed-corporate-governance',
      '../scripts/seed-employment-templates',
      '../scripts/seed-business-formation'
    ]

    for (const script of seedScripts) {
      const module = require(script)
      if (typeof module.default === 'function') {
        await module.default()
      }
    }

    console.log('Data recreation completed successfully!')
  } catch (error) {
    console.error('Error recreating data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the recreation function
recreateData()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  }) 