import type { User } from "../user/user.types";
import { Service } from "typedi";
import {
  JsonController,
  Get,
  Post,
  Delete,
  Put,
  QueryParam,
  Param,
  Body,
  HttpCode,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";

@Service()
@JsonController("/posts")
export class PostController {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postService: PostService
  ) {}

  @Get()
  async getAll(
    @QueryParam("limit") limit: number = 30,
    @QueryParam("offset") offset: number = 0,
    @QueryParam("order_by") orderBy: string = "desc",
    @QueryParam("search") search: string
  ) {
    const posts = await this.postRepository.listPosts({
      limit,
      offset,
      orderBy: orderBy as "asc" | "desc",
      search,
    });
    return posts;
  }

  @Get("/:id")
  async getById(@Param("id") postId: number) {
    const post = await this.postRepository.readPost(postId);
    return post;
  }

  @Authorized()
  @HttpCode(201)
  @Post()
  async createPost(@Body() body: CreatePostDto, @CurrentUser() user: User) {
    body.user_id = user.id;
    const post = await this.postRepository.createPost(body);
    return post;
  }

  @Authorized()
  @Delete("/:id")
  async deleteById(@Param("id") postId: number, @CurrentUser() user: User) {
    const post = await this.postService.deletePost(postId, user.id);
    return post;
  }

  @Authorized()
  @Put("/:id")
  async updateById(
    @Param("id") postId: number,
    @Body() body: UpdatePostDto,
    @CurrentUser() user: User
  ) {
    body.user_id = user.id;
    const post = await this.postService.updatePost(postId, body);
    return post;
  }

  @Get("/:id/comments")
  async listPostComments(@Param("id") postId: number) {
    const comments = await this.postRepository.listPostComments(postId);
    return comments;
  }

  @Authorized()
  @HttpCode(201)
  @Post("/:id/comments")
  async createPostComment(
    @Param("id") postId: number,
    @Body() body: CreatePostCommentDto,
    @CurrentUser() user: User
  ) {
    body.user_id = user.id;
    const comment = await this.postRepository.createPostComment(postId, body);
    return comment;
  }
}
