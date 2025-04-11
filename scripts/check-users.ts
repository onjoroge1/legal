import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Checking users in database...')
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true
      }
    })
    
    console.log('\nUsers found:', users.length)
    if (users.length > 0) {
      console.log('\nUser details:')
      users.forEach(user => {
        console.log('\nUser:', {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin
        })
      })
    } else {
      console.log('\nNo users found in the database')
    }
  } catch (error) {
    console.error('Error checking users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 