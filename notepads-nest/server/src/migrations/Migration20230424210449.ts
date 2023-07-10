import { Migration } from '@mikro-orm/migrations';

export class Migration20230424210449 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table `user` modify `email` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` modify `email` varchar(255) not null;');
  }
}
