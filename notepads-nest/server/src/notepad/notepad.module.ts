import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Comment } from '../comment/comment.entity';
import { Notepad } from './notepad.entity';
import { NotepadService } from './notepad.service';
import { NotepadController } from './notepad.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Notepad, Comment])],
  controllers: [NotepadController],
  providers: [NotepadService],
})
export class NotepadModule {}
