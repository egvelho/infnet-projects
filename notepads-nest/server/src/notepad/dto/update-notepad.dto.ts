import { MinLength, MaxLength, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateNotepadDto } from './create-notepad.dto';

export class UpdateNotepadDto extends PartialType(CreateNotepadDto) {
  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: 'O título precisa ter pelo menos 6 caracteres',
  })
  @MaxLength(36, {
    message: 'O título precisa ter no máximo 36 caracteres',
  })
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  @MaxLength(72)
  subtitle: string;

  @IsOptional()
  @IsString()
  @MinLength(24)
  @MaxLength(256)
  content: string;
}
