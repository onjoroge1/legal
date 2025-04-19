import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "kim.njo@gmail.com"
  const name = "obadiah kimani"
  const password = "your-password-here" // You'll need to set this

  const hashedPassword = await hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      password: hashedPassword,
      isAdmin: false
    }
  })

  console.log("Created/Updated user:", user)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  }) 