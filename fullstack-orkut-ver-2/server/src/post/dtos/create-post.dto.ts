import { MinLength, MaxLength, IsInt, IsOptional } from "class-validator";

export class CreatePostDto {
  @MinLength(16, {
    message: "O conteúdo precisa ter pelo menos 16 caracteres",
  })
  @MaxLength(270, {
    message: "O conteúdo precisa ter no máximo 270 caracteres",
  })
  content: string;

  @IsInt()
  @IsOptional()
  user_id: number;
}
