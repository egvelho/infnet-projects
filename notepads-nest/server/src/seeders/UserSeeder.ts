import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from '../user/user.factory';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await new UserFactory(em).create(10);
  }
}
