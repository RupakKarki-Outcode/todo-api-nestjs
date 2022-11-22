import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  // TODO: Save password by hashing and verify
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;

      return rest;
    }

    return null;
  }
}
