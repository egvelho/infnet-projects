import { Migration } from '@mikro-orm/migrations';

export class Migration20230412224702 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `comment` add `notepad_id` int unsigned not null;');
    this.addSql('alter table `comment` add constraint `comment_notepad_id_foreign` foreign key (`notepad_id`) references `notepad` (`id`) on update cascade;');
    this.addSql('alter table `comment` add index `comment_notepad_id_index`(`notepad_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `comment` drop foreign key `comment_notepad_id_foreign`;');

    this.addSql('alter table `comment` drop index `comment_notepad_id_index`;');
    this.addSql('alter table `comment` drop `notepad_id`;');
  }

}
