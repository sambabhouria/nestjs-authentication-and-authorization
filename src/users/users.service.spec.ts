import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities';
import { Role } from './enums';
import { RolesGuard } from './roles.guard';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

const mockArrayUser: User[] = [
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

const mockUser = {
  userId: 1,
  username: 'john111',
  password: 'changeme',
  roles: [Role.Admin],
};

describe('UsersService', () => {
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        JwtService,
        UsersService,
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
            getAllUsers: jest.fn().mockResolvedValue(mockArrayUser),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne()', () => {
    it('should successfully return a user', async () => {
      const newUser = {
        userId: 1,
        username: 'john111',
        password: 'changeme',
        roles: [Role.Admin],
      };

      await expect(userService.findOne(newUser.username)).resolves.toEqual(
        mockUser,
      );
    });
  });

  describe('getAllUsers()', () => {
    it('should successfully return array of user a user', () => {
      expect(userService.getAllUsers()).toEqual(mockArrayUser);
    });
  });

  describe('login', () => {
    it('should return signed jwt token', () => {
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('test');
    });
  });
});
