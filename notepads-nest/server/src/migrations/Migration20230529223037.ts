import { Migration } from '@mikro-orm/migrations';

export class Migration20230529223037 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `message` (`id` int unsigned not null auto_increment primary key, `content` text not null, `created_at` datetime not null, `sender_id` int unsigned not null, `receiver_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `message` add index `message_sender_id_index`(`sender_id`);');
    this.addSql('alter table `message` add index `message_receiver_id_index`(`receiver_id`);');

    this.addSql('alter table `message` add constraint `message_sender_id_foreign` foreign key (`sender_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `message` add constraint `message_receiver_id_foreign` foreign key (`receiver_id`) references `user` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `message`;');
  }

}
