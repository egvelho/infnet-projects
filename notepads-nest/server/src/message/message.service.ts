import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: EntityRepository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create(createMessageDto);
    await this.messageRepository.flush();
    return message;
  }

  async findAll(senderId: number, receiverId: number) {
    const messages = await this.messageRepository.find(
      {
        $or: [
          {
            receiver: receiverId,
            sender: senderId,
          },
          {
            receiver: senderId,
            sender: receiverId,
          },
        ],
      },
      {
        orderBy: {
          created_at: 'ASC',
        },
      },
    );
    return messages;
  }
}
