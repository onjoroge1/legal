import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteTemplates() {
  try {
    console.log('Deleting specified templates...')

    const templateIds = [
      'cm9ae38v60001vb7wpyoqawb4',
      'cm9ae38vg0003vb7wr7lr6pfc',
      'cm9ae38vm0005vb7wunl79xe0',
      'cm9aef6hc0001vbrolke3tquy',
      'cm9ae38vt0007vb7w2invmg13'
    ]

    for (const id of templateIds) {
      await prisma.documentTemplate.delete({
        where: { id }
      }).catch(e => {
        console.log(`Failed to delete template ${id}:`, e.message)
      })
    }

    console.log('Template deletion completed')
  } catch (error) {
    console.error('Error during template deletion:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the deletion
deleteTemplates() 