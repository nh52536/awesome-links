// prisma/seed.ts


import { PrismaClient } from '@prisma/client';




const prisma = new PrismaClient()

async function main() {
  await prisma.users.create({
    data: {
    email : 'mail@maila',
    password : 'pass',
    id_user : 21
  }
    
    },
  )


}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })