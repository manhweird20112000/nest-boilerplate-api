import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '@/database/entities/user';

export class UserSeed implements Seeder{
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().createMany(100)
  }
}
