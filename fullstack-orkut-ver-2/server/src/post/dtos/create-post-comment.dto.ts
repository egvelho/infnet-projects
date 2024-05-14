import { MinLength, MaxLength, IsInt, IsOptional } from "class-validator";

export class CreatePostCommentDto {
  @MinLength(4, {
    message: "O conteúdo precisa ter pelo menos 4 caracteres",
  })
  @MaxLength(96, {
    message: "O conteúdo precisa ter no máximo 96 caracteres",
  })
  message: string;

  @IsInt()
  @IsOptional()
  user_id: number;
}
