import type { SignInDto } from "./dto/sign-in.dto";
import type { CreateUserDto } from "../user/dtos/create-user.dto";
import bcrypt from "bcrypt";
import { Service } from "typedi";
import { UnauthorizedError, BadRequestError } from "routing-controllers";
import { UserRepository } from "../user/user.repository";
import { JwtService } from "./jwt.service";

@Service()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signIn({ email, password }: SignInDto) {
    const maybeUser = await this.userRepository.findByEmail(email);

    if (maybeUser === null) {
      throw new UnauthorizedError("Não existe um usuário com esse email");
    }

    const passwordMatches = await bcrypt.compare(password, maybeUser.passwd);

    if (!passwordMatches) {
      throw new UnauthorizedError("Email ou senha inválidos");
    }

    const payload = {
      id: maybeUser.id,
      name: `${maybeUser.first_name} ${maybeUser.last_name}`,
      email: maybeUser.email,
    };

    const token = this.jwtService.encode(payload);

    return { user: maybeUser, token };
  }

  async signUp(createUserDto: CreateUserDto) {
    const maybeUser = await this.userRepository.findByEmail(
      createUserDto.email
    );
    if (maybeUser) {
      throw new BadRequestError("Alguém já está utilizando esse email.");
    }

    const user = await this.userRepository.createUser(createUserDto);

    const payload = {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
    };

    const token = this.jwtService.encode(payload);

    return { user, token };
  }
}
