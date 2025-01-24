import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../users/roles.guard';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
