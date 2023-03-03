import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../common';
import { UserExistsException } from '../../exceptions';
import { User } from './user.entity';
import { UserService } from './user.service';

// mock a new user
const newUser = new User();
newUser.id = 'a uuid';
newUser.fullName = 'New User';
newUser.email = 'newuser@gmail.com';
newUser.username = 'newuser';
newUser.address = 'address';
newUser.updatedAt = new Date();
newUser.role = Role.ADMIN;

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  // user repo token for DI
  const USER_REPO_TOKEN = getRepositoryToken(User);

  // before running each test, mock implementations
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            // mock repo methods used by the sercive
            findOneBy: jest.fn().mockResolvedValue(newUser),
            save: jest.fn().mockResolvedValue(newUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(USER_REPO_TOKEN);
  });

  it('UserService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('User Repository should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('Find User', () => {
    it('should find a user by id', () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy');
      expect(service.findUserById('a uuid')).resolves.toEqual(newUser);
      expect(repoSpy).toBeCalledWith({ id: 'a uuid' });
      expect(repoSpy).toBeCalledTimes(1);
    });

    it('should find user by username', () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy');

      expect(service.findUserByUsername('newuser')).resolves.toEqual(newUser);
      expect(repoSpy).toBeCalledWith({ username: 'newuser' });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });

  describe('Create user', () => {
    it('should create a new user', () => {
      expect(
        service.createUser({
          address: 'address',
          email: 'newuser@gmail.com',
          fullName: 'New User',
          password: 'hashedpassword',
          username: 'newuser',
        }),
      ).resolves.toEqual(newUser);
      expect(repo.save).toBeCalledTimes(1);
    });

    it('should throw InternalServerException', () => {
      const repoSpy = jest
        .spyOn(repo, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException());

      expect(
        service.createUser({
          address: 'address',
          email: 'newuser@gmail.com',
          fullName: 'New User',
          password: 'hashedpassword',
          username: 'newuser',
        }),
      ).rejects.toThrow(InternalServerErrorException);

      expect(repoSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw UserExistsException', () => {
      const repoSpy = jest
        .spyOn(repo, 'save')
        .mockRejectedValueOnce({ code: '23505' });

      expect(
        service.createUser({
          address: 'address',
          email: 'newuser@gmail.com',
          fullName: 'New User',
          password: 'hashedpassword',
          username: 'newuser',
        }),
      ).rejects.toThrowError(UserExistsException);

      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('User Roles', () => {
    it('should find user roles', () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy');

      expect(service.findUserRoles('a uuid')).resolves.toEqual(newUser.role);
      expect(repoSpy).toBeCalledTimes(1);
      expect(repoSpy).toBeCalledWith({ id: 'a uuid' });
    });
  });
});
