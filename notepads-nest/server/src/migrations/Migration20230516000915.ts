import { Migration } from '@mikro-orm/migrations';

export class Migration20230516000915 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `email` (`id` int unsigned not null auto_increment primary key, `code` varchar(255) not null, `created_at` datetime not null, `user_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `email` add index `email_user_id_index`(`user_id`);');

    this.addSql('alter table `email` add constraint `email_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `user` add `is_email_verified` tinyint(1) not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `email`;');

    this.addSql('alter table `user` drop `is_email_verified`;');
  }

}
