import { Migration } from '@mikro-orm/migrations';

export class Migration20230412201602 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `notepad`;');

    this.addSql('alter table `comment` add `content` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('create table `notepad` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `created_at` varchar(255) not null, `subtitle` varchar(255) not null, `content` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `comment` drop `content`;');
  }

}
