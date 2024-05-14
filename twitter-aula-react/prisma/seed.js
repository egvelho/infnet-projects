import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 100 }, () => ({
    email: faker.internet.email(),
    username: faker.internet.userName().toLowerCase(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    avatar: faker.image.avatar(),
    gender: faker.person.gender(),
    pronouns: faker.person.gender(),
    cpf: faker.string.uuid(),
    password: faker.internet.password(),
    acceptTerms: true,
  }));

  await prisma.user.createMany({
    data: users,
  });

  console.log(`Inserted ${users.length} users with success!`);
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
