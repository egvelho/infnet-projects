import { Migration } from '@mikro-orm/migrations';

export class Migration20230517200431 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` drop `picture`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` add `picture` varchar(2000) null;');
  }

}
