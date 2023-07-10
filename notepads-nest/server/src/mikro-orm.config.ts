import * as dotenv from 'dotenv';
dotenv.config();
import { Notepad } from './notepad/notepad.entity';
import { Comment } from './comment/comment.entity';
import { Message } from './message/message.entity';
import { User } from './user/user.entity';
import { Email } from './email/email.entity';

export default {
  entities: [Notepad, Comment, User, Email, Message],
  port: process.env.MYSQL_PORT,
  dbName: process.env.MYSQL_DB,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  type: 'mysql',
};
