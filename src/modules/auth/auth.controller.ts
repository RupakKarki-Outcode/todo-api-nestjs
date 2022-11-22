import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('signup')
  signUp() {
    return 'signup';
  }

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: UserLoginDto, required: true })
  @Post('login')
  async login(@Request() req: any) {
    return req.user;
  }
}
