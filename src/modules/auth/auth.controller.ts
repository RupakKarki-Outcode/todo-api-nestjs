import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto, required: true })
  async signUp(@Body() user: CreateUserDto) {
    console.log('SIGNUP', user);
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: UserLoginDto, required: true })
  @Post('login')
  async login(@Request() req: any) {
    return req.user;
  }
}
