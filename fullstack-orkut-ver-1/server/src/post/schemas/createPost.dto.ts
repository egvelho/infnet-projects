import { MinLength, MaxLength } from "class-validator";

const errors = {
  minLengthMessage(prop: string, min: number) {
    return `O ${prop} precisa ter pelo menos ${min} caracteres.`;
  },
  maxLengthMessage(prop: string, max: number) {
    return `O ${prop} precisa ter no máximo ${max} caracteres.`;
  },
};

export class CreatePostDto {
  @MinLength(16, {
    message: errors.minLengthMessage("mensagem", 16),
  })
  @MaxLength(256, {
    message: errors.maxLengthMessage("mensagem", 256),
  })
  message: string;

  user_id: number;
}
