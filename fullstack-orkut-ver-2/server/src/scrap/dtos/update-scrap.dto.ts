import { IsInt, MinLength, MaxLength, IsOptional } from "class-validator";

export class UpdateScrapDto {
  @IsOptional()
  @IsInt()
  creatorId: number;

  @MinLength(4, {
    message: "A mensagem precisa ter pelo menos 4 caracteres.",
  })
  @MaxLength(256, {
    message: "A mensagem precisa ter até 256 caracteres.",
  })
  message: string;
}
