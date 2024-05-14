import { IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: "O nome precisa ser uma string",
  })
  @MinLength(2, { message: "O nome precisa ter pelo menos duas letras" })
  first_name: string;

  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: "O sobrenome precisa ter pelo menos duas letras",
  })
  last_name: string;

  @IsOptional()
  @MinLength(6, {
    message: "A senha precisa ter pelo menos seis caracteres",
  })
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail(undefined, {
    message: "O email digitado é inválido",
  })
  email: string;
}
