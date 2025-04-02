import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = 'kim.njo@gmail.com'

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    console.log('User not found')
    return
  }

  // Update user to be admin
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { isAdmin: true }
  })

  console.log('User updated with admin rights:', updatedUser.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 