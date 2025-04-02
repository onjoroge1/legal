import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'kim.njo@gmail.com'
  const password = process.env.ADMIN_PASSWORD || 'Kimani741963'

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  })

  if (existingAdmin) {
    console.log('Admin user already exists')
    return
  }

  // Create admin user
  const hashedPassword = await hash(password, 12)
  
  const admin = await prisma.user.create({
    data: {
      email,
      name: 'Admin User',
      password: hashedPassword,
      isAdmin: true,
      emailVerified: new Date(),
    }
  })

  console.log('Admin user created:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 