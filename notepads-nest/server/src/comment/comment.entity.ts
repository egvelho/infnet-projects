import {
  PrimaryKey,
  Property,
  Entity,
  ManyToOne,
  DateTimeType,
} from '@mikro-orm/core';
import { Notepad } from '../notepad/notepad.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryKey()
  id: number;

  @Property()
  message: string;

  @Property({ type: DateTimeType })
  created_at = new Date();

  @ManyToOne(() => Notepad, {
    onDelete: 'cascade',
  })
  notepad: Notepad;

  @ManyToOne(() => User, {
    onDelete: 'cascade',
  })
  user: User;
}
