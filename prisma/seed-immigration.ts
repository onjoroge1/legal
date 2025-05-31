import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Find or create immigration category
  let immigrationCategory = await prisma.category.findFirst({
    where: { slug: 'immigration' }
  })

  if (!immigrationCategory) {
    immigrationCategory = await prisma.category.create({
      data: {
        name: 'Immigration',
        slug: 'immigration',
        description: 'Immigration-related legal documents and forms'
      }
    })
  }

  // Create immigration templates
  const templates = [
    {
      name: 'I-9 Employment Eligibility Verification',
      code: 'I-9',
      type: 'form',
      description: 'Form I-9 is used to verify the identity and employment authorization of individuals hired for employment in the United States.',
      categoryId: immigrationCategory.id,
      content: 'Form I-9 content...'
    },
    {
      name: 'H-1B Visa Application',
      code: 'I-129',
      type: 'form',
      description: 'Form I-129 is used to petition for a nonimmigrant worker to temporarily enter the United States.',
      categoryId: immigrationCategory.id,
      content: 'H-1B application content...'
    },
    {
      name: 'Green Card Application',
      code: 'I-485',
      type: 'form',
      description: 'Form I-485 is used to apply for lawful permanent resident status while in the United States.',
      categoryId: immigrationCategory.id,
      content: 'Green card application content...'
    }
  ]

  for (const template of templates) {
    await prisma.documentTemplate.upsert({
      where: { code: template.code },
      update: template,
      create: template
    })
  }

  console.log('Immigration templates seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 