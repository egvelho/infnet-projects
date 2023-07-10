import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(id: string): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(id: string): string {
    return 'Sou um post';
  }
}
