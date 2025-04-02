import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'test@example.com'
  const password = 'password123'

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    console.log('User not found')
    return
  }

  console.log('Found user:', {
    id: user.id,
    email: user.email,
    name: user.name,
    hashedPassword: user.password
  })

  const isValid = await compare(password, user.password)
  console.log('Password valid:', isValid)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 