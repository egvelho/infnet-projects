import { Migration } from '@mikro-orm/migrations';

export class Migration20230417232915 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `notepad` drop `image`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `notepad` add `image` varchar(255) not null;');
  }

}
