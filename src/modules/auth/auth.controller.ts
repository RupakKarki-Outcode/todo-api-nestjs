import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto, required: true })
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto, required: true })
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('/protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProtected() {
    return 'hello';
  }
}
