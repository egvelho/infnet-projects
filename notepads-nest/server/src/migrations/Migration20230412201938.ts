import { Migration } from '@mikro-orm/migrations';

export class Migration20230412201938 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `comment` drop `content`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `comment` add `content` varchar(255) not null;');
  }

}
