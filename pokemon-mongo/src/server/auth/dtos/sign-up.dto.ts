import { MinLength, MaxLength, Matches } from "class-validator";

export class SignUpDto {
  @MinLength(2, {
    message: "O nome precisa ter pelo menos 2 caracteres.",
  })
  @MaxLength(16, {
    message: "O nome precisa ter até 16 caracteres.",
  })
  name: string;

  @MinLength(2, {
    message: "O sobrenome precisa ter pelo menos 2 caracteres.",
  })
  @MaxLength(24, {
    message: "O sobrenome precisa ter até 24 caracteres.",
  })
  surname: string;

  @Matches(/^[a-z]+$/, {
    message:
      "O nome de usuário deve conter apenas letras minúsculas sem números ou caracteres especiais.",
  })
  @MinLength(4, {
    message: "O nome de usuário precisa ter pelo menos 4 caracteres.",
  })
  @MaxLength(12, {
    message: "O nome de usuário precisa ter até 12 caracteres.",
  })
  username: string;

  @MinLength(8, {
    message: "A senha precisa ter pelo menos 8 caracteres.",
  })
  @MaxLength(36, {
    message: "A senha precisa ter até 36 caracteres.",
  })
  password: string;

  credit: number;
}
