import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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
}
