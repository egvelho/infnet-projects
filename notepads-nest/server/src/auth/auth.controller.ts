import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { Public } from './decorators/public-endpoint';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.login(loginCredentialsDto);
  }

  @Public()
  @Post('/create-account')
  createAccount(@Body() createUserDto: CreateUserDto) {
    return this.authService.createAccount(createUserDto);
  }

  @Post('/request-email-verification-code')
  requestEmailVerificationCode(@Req() req: Request) {
    const userId = req['user'].id;
    return this.authService.requestEmailVerificationCode(userId);
  }

  @Post('/verify-email')
  verifyEmail(@Req() req: Request, @Body() verifyEmailDto: VerifyEmailDto) {
    const userId = req['user'].id;
    return this.authService.verifyEmail(userId, verifyEmailDto);
  }
}
