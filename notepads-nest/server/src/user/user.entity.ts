import {
  Entity,
  Property,
  PrimaryKey,
  DateTimeType,
  BooleanType,
  Unique,
  OneToMany,
  Collection,
  BeforeCreate,
} from '@mikro-orm/core';
import { Notepad } from '../notepad/notepad.entity';
import { Comment } from '../comment/comment.entity';
import { Message } from '../message/message.entity';
import { Email } from '../email/email.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Unique()
  @Property()
  email: string;

  @Property({ nullable: true, columnType: 'varchar(5000)' })
  userPicture?: string;

  @Property({ type: BooleanType })
  isEmailVerified = false;

  @Property()
  name: string;

  @Property()
  surname: string;

  @Property()
  password: string;

  @Property({ type: DateTimeType })
  created_at = new Date();

  @OneToMany(() => Notepad, (notepad) => notepad.user)
  notepads = new Collection<Notepad>(this);

  @OneToMany(() => Comment, (comment) => comment.user)
  comments = new Collection<Comment>(this);

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages = new Collection<Message>(this);

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages = new Collection<Message>(this);

  @OneToMany(() => Email, (email) => email.user)
  emailVerifications = new Collection<Email>(this);

  async comparePassword(password: string) {
    const passwordEquals = await bcrypt.compare(password, this.password);
    return passwordEquals;
  }

  @BeforeCreate()
  async hashPassword() {
    const rounds = 10;
    this.password = await bcrypt.hash(this.password, rounds);
  }
}
