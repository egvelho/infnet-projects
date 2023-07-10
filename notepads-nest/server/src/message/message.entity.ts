import {
  Entity,
  PrimaryKey,
  Property,
  TextType,
  DateTimeType,
  ManyToOne,
} from '@mikro-orm/core';
import { User } from '../user/user.entity';

@Entity()
export class Message {
  @PrimaryKey()
  id: number;

  @Property({ type: TextType })
  content: string;

  @Property({ type: DateTimeType })
  created_at = new Date();

  @ManyToOne(() => User, {
    onDelete: 'cascade',
  })
  sender: User;

  @ManyToOne(() => User, {
    onDelete: 'cascade',
  })
  receiver: User;
}
