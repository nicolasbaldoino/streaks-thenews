import { db } from '@/lib/db'

async function main() {
  // Seed
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await db.$disconnect()
    process.exit(1)
  })
