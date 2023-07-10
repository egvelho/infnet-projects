import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Notepad } from './notepad.entity';
import { CreateNotepadDto } from './dto/create-notepad.dto';
import { UpdateNotepadDto } from './dto/update-notepad.dto';
import { ListNotepadsDto } from './dto/list-notepads.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class NotepadService {
  constructor(
    @InjectRepository(Notepad)
    private readonly notepadRepository: EntityRepository<Notepad>,
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
  ) {}

  async create(createNotepadDto: CreateNotepadDto) {
    const notepad = this.notepadRepository.create(createNotepadDto);
    await this.notepadRepository.flush();
    return notepad;
  }

  async findAll({
    limit = 20,
    offset = 0,
    order_by = 'created_at',
    direction = 'desc',
    search = undefined,
  }: ListNotepadsDto = {}) {
    const [notepads, count] = await this.notepadRepository.findAndCount(
      search && {
        $or: [
          {
            title: {
              $like: `%${search}%`,
            },
          },
          {
            title: {
              $like: `%${search}`,
            },
          },
          {
            title: {
              $like: `${search}%`,
            },
          },
          {
            subtitle: {
              $like: `%${search}%`,
            },
          },
          {
            subtitle: {
              $like: `%${search}`,
            },
          },
          {
            subtitle: {
              $like: `${search}%`,
            },
          },
          {
            content: {
              $like: `%${search}%`,
            },
          },
          {
            content: {
              $like: `%${search}`,
            },
          },
          {
            content: {
              $like: `${search}%`,
            },
          },
        ],
      },
      {
        populate: ['user'],
        fields: [
          '*',
          'user.id',
          'user.name',
          'user.surname',
          'user.userPicture',
        ],
        limit,
        offset,
        orderBy: {
          [order_by]: direction,
        },
      },
    );

    return {
      notepads,
      count,
    };
  }

  findOne(id: number) {
    return this.notepadRepository.findOneOrFail(id);
  }

  async findComments(id: number) {
    const notepad = await this.notepadRepository.findOneOrFail(id);
    await notepad.comments.init();
    const comments = await notepad.comments.getItems();
    return comments;
  }

  async addComment(notepadId: number, addCommentDto: AddCommentDto) {
    const notepad = await this.notepadRepository.findOneOrFail(notepadId);
    const comment = new Comment();
    comment.notepad = notepad;
    wrap(comment).assign(addCommentDto);
    await this.commentRepository.persistAndFlush(comment);
    return comment;
  }

  async update(id: number, userId: number, updateNotepadDto: UpdateNotepadDto) {
    const notepad = await this.notepadRepository.findOneOrFail(id, {
      populate: ['user'],
      fields: ['*', 'user.id', 'user.name', 'user.surname', 'user.userPicture'],
    });
    if (notepad.user.id !== userId) {
      throw new ForbiddenException();
    }
    wrap(notepad).assign(updateNotepadDto);
    this.notepadRepository.flush();
    return notepad;
  }

  async remove(id: number, userId: number) {
    const notepad = await this.notepadRepository.findOneOrFail(id, {
      populate: ['user'],
      fields: ['*', 'user.id'],
    });
    if (notepad.user.id !== userId) {
      throw new ForbiddenException();
    }
    this.notepadRepository.remove(notepad);
    await this.notepadRepository.flush();
    return notepad;
  }

  async getUserNotepads(user: number) {
    const userNotepads = await this.notepadRepository.find({
      user,
    });
    return userNotepads;
  }
}
