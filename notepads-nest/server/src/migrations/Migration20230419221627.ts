import { Migration } from '@mikro-orm/migrations';

export class Migration20230419221627 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `comment` drop foreign key `comment_notepad_id_foreign`;');

    this.addSql('alter table `comment` add constraint `comment_notepad_id_foreign` foreign key (`notepad_id`) references `notepad` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `comment` drop foreign key `comment_notepad_id_foreign`;');

    this.addSql('alter table `comment` add constraint `comment_notepad_id_foreign` foreign key (`notepad_id`) references `notepad` (`id`) on update cascade;');
  }

}
