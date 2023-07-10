import {
  Controller,
  Get,
  Post,
  Sse,
  Body,
  Param,
  ParseIntPipe,
  Req,
  Request,
} from '@nestjs/common';
import { map, Subject } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post(':receiverId')
  async create(
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: Request,
  ) {
    const senderId = request['user'].id;
    createMessageDto.receiver = receiverId;
    createMessageDto.sender = senderId;
    const message = await this.messageService.create(createMessageDto);
    const receiverMessagesListenerId = `messages.${receiverId}`;
    this.eventEmitter.emit(receiverMessagesListenerId, message);
    return message;
  }

  @Get(':receiverId')
  findAll(
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @Req() request: Request,
  ) {
    const senderId = request['user'].id;
    return this.messageService.findAll(senderId, receiverId);
  }

  @Sse('sse/notifications')
  notifications(@Req() request: Request) {
    const subject = new Subject();
    const userId = request['user'].id;
    const userMessagesListenerId = `messages.${userId}`;
    this.eventEmitter.on(userMessagesListenerId, (message: Message) => {
      subject.next(message);
    });
    return subject.pipe(map((message: Message) => ({ data: message })));
  }
}
