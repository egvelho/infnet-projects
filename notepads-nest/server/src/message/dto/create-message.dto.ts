import { MinLength, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @MinLength(4, {
    message: 'A mensagem precisa ter pelo menos 4 caracteres.',
  })
  @MaxLength(140, {
    message: 'A mensagem precisa ter até 140 caracteres.',
  })
  content: string;

  sender: number;
  receiver: number;
}
