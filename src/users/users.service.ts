import { Injectable } from '@nestjs/common';
import { Role } from '../users/enums';
import { User } from './entities';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john111',
      password: 'changeme',
      roles: [Role.Admin],
    },
    {
      userId: 2,
      username: 'maria111',
      password: 'guess',
      roles: [Role.User],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return await this.users.find((user) => user.username === username);
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
