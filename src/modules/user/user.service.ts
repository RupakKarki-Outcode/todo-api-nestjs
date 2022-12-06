import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id: id });

    return user;
  }

  async findUserByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({
      username: username,
    });

    return user;
  }

  async createUser(user: CreateUserDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = await this.usersRepository.save(user);

      return rest;
    } catch (e: any) {
      throw new InternalServerErrorException();
    }
  }
}
