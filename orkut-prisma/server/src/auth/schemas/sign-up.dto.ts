import { IsEmail, MinLength, MaxLength } from "class-validator";

export class SignUpDto {
  @MinLength(2, {
    message: "O nome precisa ter pelo menos 2 caracteres",
  })
  @MaxLength(16, {
    message: "O nome precisa ter no máximo 16 caracteres",
  })
  first_name: string;

  @MinLength(2, {
    message: "O sobrenome precisa ter pelo menos 2 caracteres",
  })
  @MaxLength(24, {
    message: "O sobrenome precisa ter no máximo 24 caracteres",
  })
  last_name: string;

  @IsEmail(undefined, {
    message: "O email digitado é inválido",
  })
  email: string;

  @MinLength(8, {
    message: "A senha precisa ter no mínimo 8 caracteres",
  })
  @MaxLength(48, {
    message: "A senha precisa ter no máximo 48 caracteres",
  })
  passwd: string;
}
