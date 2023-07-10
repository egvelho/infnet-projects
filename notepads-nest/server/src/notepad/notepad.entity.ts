import {
  PrimaryKey,
  Property,
  Entity,
  OneToMany,
  Collection,
  DateTimeType,
  ManyToOne,
} from '@mikro-orm/core';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@Entity()
export class Notepad {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property({ type: DateTimeType })
  created_at = new Date();

  @Property()
  subtitle: string;

  @Property()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.notepad)
  comments = new Collection<Comment>(this);

  @ManyToOne(() => User, {
    onDelete: 'cascade',
  })
  user: User;
}
