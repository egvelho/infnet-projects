import { faker } from "@faker-js/faker";
import { UserRepository } from "./user.repository";

const defaultLimit = 10;

async function seedUser() {
  const userRepository = new UserRepository();
  const limit = Number(process.argv[2]) || defaultLimit;
  console.log("Iniciando seeding...");
  console.log(`Vão ser criados ${limit} usuários`);
  for (let index = 0; index < limit; index++) {
    const userData = generateUser();
    const user = await userRepository.createUser(userData);
    console.log(`Criado usuário de id #${user.id}`);
  }
  console.log("Seeding realizado com sucesso!");
}

function generateUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.internet.avatar(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };
}

seedUser();
