import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const rounds = 10;

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      password: bcrypt.hashSync('batata', rounds),
      created_at: faker.date.recent(),
    };
  }
}
