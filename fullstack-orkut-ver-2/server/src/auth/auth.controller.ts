import {
  JsonController,
  Post,
  Body,
  Get,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { Service } from "typedi";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dtos/create-user.dto";
import type { User } from "../user/user.types";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-in")
  async signIn(@Body() signInDto: SignInDto) {
    const response = await this.authService.signIn(signInDto);
    return response;
  }

  @Post("/sign-up")
  async signUp(@Body() createUserDto: CreateUserDto) {
    const response = await this.authService.signUp(createUserDto);
    return response;
  }

  @Authorized()
  @Get("/session")
  async session(@CurrentUser() user: User) {
    return user;
  }
}
