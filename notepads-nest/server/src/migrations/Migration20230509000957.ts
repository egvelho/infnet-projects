import { Migration } from '@mikro-orm/migrations';

export class Migration20230509000957 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `notepad` add `user_id` int unsigned not null;');
    this.addSql('alter table `notepad` add constraint `notepad_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `notepad` add index `notepad_user_id_index`(`user_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `notepad` drop foreign key `notepad_user_id_foreign`;');

    this.addSql('alter table `notepad` drop index `notepad_user_id_index`;');
    this.addSql('alter table `notepad` drop `user_id`;');
  }

}
