import { Migration } from '@mikro-orm/migrations';

export class Migration20230419223017 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `notepad` modify `created_at` datetime not null;');

    this.addSql('alter table `comment` modify `created_at` datetime not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `notepad` modify `created_at` varchar(255) not null;');

    this.addSql('alter table `comment` modify `created_at` varchar(255) not null;');
  }

}
