import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  Req,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { NotepadService } from './notepad.service';
import { CreateNotepadDto } from './dto/create-notepad.dto';
import { UpdateNotepadDto } from './dto/update-notepad.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { ListNotepadsDto } from './dto/list-notepads.dto';
import { Public } from '../auth/decorators/public-endpoint';

@Controller('notepads')
export class NotepadController {
  constructor(private readonly notepadService: NotepadService) {}

  @Post()
  create(@Body() createNotepadDto: CreateNotepadDto, @Req() req: Request) {
    const userId = req['user'].id;
    createNotepadDto.user = userId;
    return this.notepadService.create(createNotepadDto);
  }

  @Public()
  @Get()
  findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    listNotepadsDto: ListNotepadsDto,
  ) {
    return this.notepadService.findAll(listNotepadsDto);
  }

  @Public()
  @Get(':id')
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.notepadService.findOne(id);
  }

  @Post(':id/comments')
  addComment(
    @Param('id', ParseIntPipe) notepadId: number,
    @Body() addCommentDto: AddCommentDto,
  ) {
    return this.notepadService.addComment(notepadId, addCommentDto);
  }

  @Get('comments/:id')
  findComments(@Param('id', ParseIntPipe) id: number) {
    return this.notepadService.findComments(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotepadDto: UpdateNotepadDto,
    @Req() req: Request,
  ) {
    const userId: number = req['user'].id;
    return this.notepadService.update(id, userId, updateNotepadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userId = req['user'].id;
    return this.notepadService.remove(id, userId);
  }

  @Get('user/myself')
  userNotepads(@Req() req: Request) {
    const userId: number = req['user'].id;
    return this.notepadService.getUserNotepads(userId);
  }
}
