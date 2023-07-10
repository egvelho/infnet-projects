import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { NotepadFactory } from '../notepad/notepad.factory';
import { CommentFactory } from '../comment/comment.factory';
import { User } from '../user/user.entity';

export class NotepadSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await em.find(User, {});
    for (const user of users) {
      const notepads = await new NotepadFactory(em)
        .each((notepad) => {
          notepad.user = user;
          const comments = new CommentFactory(em).make(30);
          comments.forEach((comment) => {
            comment.user = users[Math.floor(Math.random() * users.length)];
          });
          notepad.comments.set(comments);
        })
        .create(100);
    }
  }
}
