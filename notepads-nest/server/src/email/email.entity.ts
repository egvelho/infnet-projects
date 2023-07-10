import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  DateTimeType,
} from '@mikro-orm/core';
import { User } from '../user/user.entity';

@Entity()
export class Email {
  @PrimaryKey()
  id: number;

  @Property()
  code: string;

  @Property({ type: DateTimeType })
  createdAt = new Date();

  @ManyToOne(() => User, {
    onDelete: 'cascade',
  })
  user: User;
}
