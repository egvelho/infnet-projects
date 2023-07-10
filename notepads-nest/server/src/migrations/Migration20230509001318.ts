import { Migration } from '@mikro-orm/migrations';

export class Migration20230509001318 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `comment` add `user_id` int unsigned not null;');
    this.addSql('alter table `comment` add constraint `comment_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `comment` add index `comment_user_id_index`(`user_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `comment` drop foreign key `comment_user_id_foreign`;');

    this.addSql('alter table `comment` drop index `comment_user_id_index`;');
    this.addSql('alter table `comment` drop `user_id`;');
  }

}
