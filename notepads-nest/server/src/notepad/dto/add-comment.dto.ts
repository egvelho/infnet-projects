import { MinLength, MaxLength, IsString } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @MinLength(16, {
    message: 'O comentário precisa ter pelo menos 16 caracteres',
  })
  @MaxLength(144, {
    message: 'O comentário precisa ter no máximo 144 caracteres',
  })
  message: string;
}
