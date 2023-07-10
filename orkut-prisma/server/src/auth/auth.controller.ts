import { JsonController, Post, Body } from "routing-controllers";
import { Service } from "typedi";
import { AuthService } from "./auth.service";
import type { SignInSchema } from "./schemas/signin.schema";
import { SignUpDto } from "./schemas/sign-up.dto";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-in")
  async signIn(@Body() signInData: SignInSchema) {
    const response = await this.authService.signIn(signInData);
    return response;
  }

  @Post("/sign-up")
  async signUp(@Body() signUpData: SignUpDto) {
    const response = await this.authService.signUp(signUpData);
    return response;
  }
}
