import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 100 }, () => ({
    email: faker.internet.email(),
    username: faker.internet.userName().toLowerCase(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
  }));

  await prisma.user.createMany({
    data: users,
  });

  const posts = (await prisma.user.findMany()).flatMap((user) =>
    Array.from({ length: Math.ceil(Math.random() * 50 + 10) }, () => ({
      authorId: user.id,
      picture: faker.image.urlPicsumPhotos({
        width: 128,
        height: 128,
        format: "jpg",
      }),
    }))
  );

  await prisma.post.createMany({
    data: posts,
  });

  console.log(`Inserted ${users.length} users with success!`);
  console.log(`Inserted ${posts.length} posts with success!`);
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
