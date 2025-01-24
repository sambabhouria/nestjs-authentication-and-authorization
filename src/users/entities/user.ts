import { Exclude } from 'class-transformer';
import { Role } from 'src/users/enums';

export class User {
  userId: number;
  username: string;

  @Exclude()
  password: string;

  roles: Role[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
