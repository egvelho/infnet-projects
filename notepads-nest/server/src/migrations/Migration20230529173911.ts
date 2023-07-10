import { Migration } from '@mikro-orm/migrations';

export class Migration20230529173911 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `messenger` add `message` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `messenger` drop `message`;');
  }

}
