import { Service } from "typedi";
import { BadRequestError } from "routing-controllers";
import { signInSchema, SignInSchema } from "./schemas/signin.schema";
import { UserService } from "../user/user.service";
import { JWTService } from "./jwt.service";
import { SignUpDto } from "./schemas/sign-up.dto";

@Service()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService
  ) {}

  async signUp(signUpData: SignUpDto) {
    // 1) Garantir que o email seja único
    // 2) Cadastrar o usuário no banco de dados
    // 3) Carregar as informações do usuário do banco de dados
    // 4) Criar um token de autentição para o usuário
    // 5) Retornar o token e as infos de usuário para o front-end
    const maybeUser = await this.userService.findByEmail(signUpData.email);
    if (maybeUser !== null) {
      throw new BadRequestError("Esse email já está sendo utilizado");
    }
    const user = await this.userService.create(signUpData);
    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      success: true,
      user,
      jwt,
    };
  }

  async signIn(signInData: SignInSchema) {
    const signInDataValidation = await signInSchema.safeParseAsync(signInData);
    if (signInDataValidation.success === false) {
      return {
        success: false,
        jwt: null,
      };
    }

    const { email, password } = signInDataValidation.data;
    const user = await this.userService.findByEmailPassword(email, password);
    if (user === null) {
      return {
        success: false,
        user: null,
        jwt: null,
      };
    }

    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      success: true,
      user,
      jwt,
    };
  }
}
