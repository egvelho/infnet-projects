import { Migration } from '@mikro-orm/migrations';

export class Migration20230404003520 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `notepad` add `content` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `notepad` drop `content`;');
  }

}
