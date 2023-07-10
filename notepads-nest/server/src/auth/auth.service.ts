import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { User } from '../user/user.entity';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login({ email, password }: LoginCredentialsDto) {
    const maybeUser = await this.userService.findByEmail(email);
    if (maybeUser?.id === undefined) {
      throw new UnauthorizedException();
    }

    if (await maybeUser?.comparePassword(password)) {
      const { password, ...user } = maybeUser;
      const payload = { id: user.id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        accessToken,
        user,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async createAccount(createUserDto: CreateUserDto) {
    const maybeUser = await this.userService.findByEmail(createUserDto.email);
    if (maybeUser) {
      throw new BadRequestException({
        success: false,
        errors: {
          email: 'O email digitado já está cadastrado no banco de dados.',
        },
      });
    }

    const user = await this.userService.create(createUserDto);
    const { accessToken } = await this.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    await this.requestEmailVerificationCode(user.id);

    return {
      user,
      accessToken,
      success: true,
    };
  }

  async requestEmailVerificationCode(userId: number) {
    const user = await this.userService.findById(userId);
    const code = this.generateCode();
    const email = await this.emailService.create(user, code);
    const emailStatus = await this.emailService.sendEmail({
      to: user.email,
      subject: `${user.name}, vamos verificar o seu email!`,
      text: `Seu código de verificação é: ${code}`,
    });

    return {
      success: emailStatus,
    };
  }

  async verifyEmail(userId: number, verifyEmailDto: VerifyEmailDto) {
    const result = await this.emailService.findByUserIdAndCode(
      userId,
      verifyEmailDto.code,
    );
    if (result) {
      await this.userService.setEmailVerified(userId);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  private generateCode() {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
  }
}
