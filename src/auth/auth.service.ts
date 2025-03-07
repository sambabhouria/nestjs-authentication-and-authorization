import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
    };

    try {
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    } catch (error) {
      throw new UnauthorizedException(`Token verification failed!!: ${error}`);
    }
  }
}
