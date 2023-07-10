import { Factory, Faker } from '@mikro-orm/seeder';
import { Comment } from './comment.entity';

export class CommentFactory extends Factory<Comment> {
  model = Comment;

  definition(faker: Faker): Partial<Comment> {
    return {
      message: faker.lorem.words(8),
      created_at: faker.date.recent(),
    };
  }
}
