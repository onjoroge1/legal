import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const userEmail = "kim.njo@gmail.com"
  
  console.log(`Making user ${userEmail} an admin...`)
  
  const user = await prisma.user.update({
    where: { email: userEmail },
    data: { isAdmin: true }
  })
  
  console.log(`Successfully made ${user.email} an admin!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 