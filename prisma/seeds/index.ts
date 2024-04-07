import { PrismaClient } from '@prisma/client';

import { seedTodos } from './todos';

const prisma = new PrismaClient();

async function main() {
  await seedTodos(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
