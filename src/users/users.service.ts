import { Injectable } from '@nestjs/common';
import { User } from './entities';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john111',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria111',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return await this.users.find((user) => user.username === username);
  }
}
