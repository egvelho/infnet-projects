import {
  Controller,
  Get,
  Req,
  Request,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  users() {
    return this.userService.findAll();
  }

  @Get('myself')
  async user(@Req() request: Request) {
    const payload = request['user'];
    const { password, ...user } = await this.userService.getMyself(payload.id);
    return user;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const { password, ...user } = await this.userService.findById(id);
    return user;
  }

  @Post('upload-picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() picture: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req['user'].id;
    return this.userService.uploadPicture(userId, picture.buffer);
  }
}
