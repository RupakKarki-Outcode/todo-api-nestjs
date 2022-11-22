import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/repositories';
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
}
