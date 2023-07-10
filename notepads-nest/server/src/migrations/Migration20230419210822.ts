import { Migration } from '@mikro-orm/migrations';

export class Migration20230419210822 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `comment` drop foreign key `comment_notepad_id_foreign`;');

    this.addSql('alter table `notepad` modify `created_at` varchar(255) not null;');

    this.addSql('alter table `comment` modify `created_at` varchar(255) not null;');
    this.addSql('alter table `comment` add constraint `comment_notepad_id_foreign` foreign key (`notepad_id`) references `notepad` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `comment` drop foreign key `comment_notepad_id_foreign`;');

    this.addSql('alter table `notepad` modify `created_at` datetime not null;');

    this.addSql('alter table `comment` modify `created_at` datetime not null;');
    this.addSql('alter table `comment` add constraint `comment_notepad_id_foreign` foreign key (`notepad_id`) references `notepad` (`id`) on update cascade on delete cascade;');
  }

}
