import { Migration } from '@mikro-orm/migrations';

export class Migration20230424212210 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `user`;');
  }

  async down(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `email` varchar(255) not null, `name` varchar(255) not null, `surname` varchar(255) not null, `password` varchar(255) not null, `created_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }

}
