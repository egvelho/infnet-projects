import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { SignInDto } from "./dtos/sign-in.dto";
import { SignUpDto } from "./dtos/sign-up.dto";
import { TrainerService } from "../trainer/trainer.service";
import { JWTService } from "./jwt.service";

@Service()
export class AuthService {
  constructor(
    private readonly trainerService: TrainerService,
    private readonly jwtService: JWTService
  ) {}

  async signIn({ username, password }: SignInDto) {
    const trainer = await this.trainerService.findOneWithPassword(username);
    if (trainer && trainer.password === password) {
      const payload = {
        username: trainer.username,
        name: trainer.name,
        surname: trainer.surname,
      };
      const token = this.jwtService.sign(payload);
      return {
        token,
        trainer,
      };
    }

    throw new BadRequestError("Nome de usuário ou senha inválidos.");
  }

  async signUp(signUpDto: SignUpDto) {
    const maybeTrainer = await this.trainerService.findOne(signUpDto.username);
    if (maybeTrainer !== null) {
      throw new BadRequestError(
        "Esse nome de usuário já está sendo utilizado."
      );
    }

    signUpDto.credit = 300;
    const trainer = await this.trainerService.create(signUpDto);
    const payload = {
      username: trainer.username,
      name: trainer.name,
      surname: trainer.surname,
    };
    const token = this.jwtService.sign(payload);
    return {
      token,
      trainer,
    };
  }
}
