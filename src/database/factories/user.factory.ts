import { define } from 'typeorm-seeding';
import { User } from '@/database/entities/user';
import { randEmail, randPassword, randUserName } from '@ngneat/falso';

define(User, () => {
  const user = new User()
  user.name = randUserName()
  user.email = randEmail()
  user.password = randPassword()
  return user
})
