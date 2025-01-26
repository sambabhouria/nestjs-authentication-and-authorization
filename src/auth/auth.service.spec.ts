import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities';
import { Role } from '../users/enums';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

const mockUser = {
  userId: 1,
  username: 'john111',
  password: 'changeme',
  roles: [Role.Admin],
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService, // dont foget to do this {in cas you do test will fail}
          useValue: {
            constructor: jest.fn(),
            // findOne: jest.fn(), // ici la valeur    Received has value: undefined
            findOne: jest.fn().mockResolvedValue(mockUser),
            getAllUsers: jest.fn(), // this is not need here beacouse auth dont implement this fn
          },
        },
        {
          provide: JwtService,
          useValue: {
            constructor: jest.fn(),
            // signAsync: jest.fn(), // undefined
            signAsync: jest.fn().mockResolvedValue('test'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('if user is found', async () => {
      const newUser = {
        userId: 1,
        username: 'john111',
        password: 'changeme',
        roles: [Role.Admin],
      };

      await expect(userService.findOne(newUser.username)).resolves.toEqual(
        mockUser,
      );

      const mockPayload = {
        username: newUser.username,
        sub: newUser.userId,
        roles: newUser.roles,
      };

      await authService.signIn('john111', 'changeme').then((data) => {
        expect(data.access_token).toBe('test');
        expect(jwtService.signAsync).toBeCalledTimes(1);
        expect(jwtService.signAsync).toBeCalledWith(mockPayload);
      });
    });

    it('if user is found but password is mismatched', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation((username: string) => {
          return Promise.resolve({
            username,
            userId: 1,
            password: 'password',
            roles: [Role.User],
          } as User);
        });

      await authService
        .signIn('test', 'password001')
        .then((data) => {
          expect(data.access_token).toBe('test');
        })
        .catch((error) => {
          const t = () => {
            throw new UnauthorizedException();
          };
          expect(t).toThrow(error);
        });
    });

    test('Test description throw  tyype error', () => {
      const t = () => {
        throw new TypeError();
      };
      expect(t).toThrow(TypeError);
    });

    it('find one user', () => {
      // jest.spyOn(userService, 'findAll').mockImplementation(() => result);
      // const consoleLog = jest.spyOn(console, 'log').mockImplementationOnce(() => {});
      // const processExit = jest .spyOn(process, 'exit').mockImplementation(() => {});
      // const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('test');
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation((username: string) => {
          return Promise.resolve({
            username,
            userId: 1,
            password: 'password',
            roles: [Role.User],
          } as User);
        });
    });
  });
});
