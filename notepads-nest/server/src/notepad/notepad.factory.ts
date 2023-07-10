import { Factory, Faker } from '@mikro-orm/seeder';
import { Notepad } from './notepad.entity';

export class NotepadFactory extends Factory<Notepad> {
  model = Notepad;

  definition(faker: Faker): Partial<Notepad> {
    return {
      title: faker.lorem.words(4),
      subtitle: faker.lorem.words(8),
      content: faker.lorem.words(12),
      created_at: faker.date.recent(),
    };
  }
}
