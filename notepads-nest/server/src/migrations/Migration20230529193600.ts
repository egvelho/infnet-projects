import { Migration } from '@mikro-orm/migrations';

export class Migration20230529193600 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `messenger`;');
  }

  async down(): Promise<void> {
    this.addSql('create table `messenger` (`id` int unsigned not null auto_increment primary key, `message` text not null, `created_at` datetime not null, `sender_id` int unsigned not null, `receiver_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `messenger` add index `messenger_sender_id_index`(`sender_id`);');
    this.addSql('alter table `messenger` add index `messenger_receiver_id_index`(`receiver_id`);');

    this.addSql('alter table `messenger` add constraint `messenger_sender_id_foreign` foreign key (`sender_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `messenger` add constraint `messenger_receiver_id_foreign` foreign key (`receiver_id`) references `user` (`id`) on update cascade on delete cascade;');
  }

}
