import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { User } from './entities';
import { Role } from './enums';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('allUsers')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get('/getAuthSession')
  getUserSession(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }
}
