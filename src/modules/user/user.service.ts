import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ValidationError } from 'sequelize';
import { USER_REPOSITORY } from 'src/constants/repositories';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepository: typeof User,
  ) {}

  async findUserById(id: string) {
    const user = await this.usersRepository.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    return user;
  }

  async findUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    return user;
  }

  async createUser(user: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create(user);

      return { id: newUser.dataValues.id };
    } catch (e: any) {
      if (e instanceof ValidationError) {
        throw new BadRequestException(e.errors.map((e) => e.message));
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
