import { CommentService } from "./comment.service";
import { JsonController, Get, Post, Body } from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll() {
    const comments = await this.commentService.getAll();
    return comments;
  }

  @Post()
  async create(@Body() body: any) {
    const response = await this.commentService.create(body);
    return response;
  }
}
