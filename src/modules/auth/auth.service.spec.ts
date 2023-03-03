import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../../common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';

// mock a new user
const newUser = new User();
newUser.id = 'a uuid';
newUser.fullName = 'New User';
newUser.email = 'newuser@gmail.com';
newUser.username = 'newuser';
newUser.address = 'address';
newUser.updatedAt = new Date();
newUser.role = Role.ADMIN;

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  // user repo token for DI
  const USER_REPO_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByUsername: jest.fn(),
            createUser: jest.fn().mockResolvedValueOnce(newUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValueOnce('signed jwt'),
          },
        },
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            // mock repo methods used by the sercive
            findOneOrFail: jest.fn().mockRejectedValueOnce(new Error()),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('auth service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user service should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('jwt service should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  describe('Validate user', () => {
    it('should validate user on correct password', () => {
      jest
        .spyOn(userService, 'findUserByUsername')
        .mockResolvedValueOnce(newUser);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      expect(service.validateUser('newuser', 'password')).resolves.toEqual(
        newUser,
      );
    });
    it('should return null on wrong password', () => {
      jest
        .spyOn(userService, 'findUserByUsername')
        .mockImplementationOnce(() => Promise.resolve(newUser));
      const bcryptSpy = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      expect(service.validateUser('newuser', 'wrongpassword')).resolves.toEqual(
        null,
      );
      expect(bcryptSpy).toBeCalledTimes(1);
    });
  });
});
