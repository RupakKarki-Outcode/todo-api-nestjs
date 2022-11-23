import { Module } from '@nestjs/common';
import { usersProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
  providers: [UserService, ...usersProvider],
  exports: [UserService],
})
export class UserModule {}
