import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../users/enums';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            constructor: jest.fn(),
            signIn: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            constructor: jest.fn(),
            signAsync: jest.fn(),
            // signAsync: jest.fn().mockResolvedValue('test'),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return access_token', async () => {
      jest
        .spyOn(authService, 'signIn')
        .mockImplementation((username: string, password: string) => {
          console.info(username, password);
          return Promise.resolve({ access_token: 'jwttoken' });
        });
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('jwttoken');
      const token = await authController
        .signIn({ username: 'samba', password: 'test' })
        .then((data) => {
          expect(data.access_token).toBe('jwttoken');
          return Promise.resolve({ access_token: 'jwttoken' });
        })
        .catch((data) => {
          const t = () => {
            throw new UnauthorizedException();
          };
          expect(t).toThrow(data);
        })
        .finally(() => {
          console.log('completed ok !');
        });
      // expect(token).toBeFalsy(); => if not return in the then, catch or finaly
      expect(token).toBeTruthy();
      expect(authService.signIn).toBeCalled();
    });

    it('should return a user profile', async () => {
      const mockPayload = {
        user: {
          username: 'john111',
          sub: 1,
          roles: [Role.Admin],
          iat: 1737907802,
          exp: 1737911402,
        },
      };
      const expected = {
        exp: 1737911402,
        iat: 1737907802,
        roles: ['admin'],
        sub: 1,
        username: 'john111',
      };
      const userProfile = await authController.getProfile(mockPayload);
      expect(userProfile).toStrictEqual(expected);
    });
  });
});
