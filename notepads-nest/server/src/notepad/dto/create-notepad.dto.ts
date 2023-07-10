import { MinLength, MaxLength, IsString } from 'class-validator';

export class CreateNotepadDto {
  @IsString()
  @MinLength(6, {
    message: 'O título precisa ter pelo menos 6 caracteres',
  })
  @MaxLength(36, {
    message: 'O título precisa ter no máximo 36 caracteres',
  })
  title: string;

  @IsString()
  @MinLength(12)
  @MaxLength(72)
  subtitle: string;

  @IsString()
  @MinLength(24)
  @MaxLength(256)
  content: string;

  user: number;
}
