import { Migration } from '@mikro-orm/migrations';

export class Migration20230412223413 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `comment` (`id` int unsigned not null auto_increment primary key, `message` varchar(255) not null, `created_at` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `comment`;');
  }

}
