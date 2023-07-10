import { Migration } from '@mikro-orm/migrations';

export class Migration20230412214339 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `comment`;');
  }

  async down(): Promise<void> {
    this.addSql('create table `comment` (`id` int unsigned not null auto_increment primary key, `message` varchar(255) not null, `created_at` varchar(255) not null, `notepad_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `comment` add index `comment_notepad_id_index`(`notepad_id`);');

    this.addSql('alter table `comment` add constraint `comment_notepad_id_foreign` foreign key (`notepad_id`) references `notepad` (`id`) on update cascade;');
  }

}
