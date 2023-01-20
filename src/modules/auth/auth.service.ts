import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);

    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  // login user
  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  // service to signup user
  async signUp(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    return this.usersService.createUser(user);
  }
}
