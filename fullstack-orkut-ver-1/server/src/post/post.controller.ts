import { Service } from "typedi";
import {
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Param,
  Body,
  QueryParams,
  Authorized,
  CurrentUser,
  UnauthorizedError,
} from "routing-controllers";
import { PostService } from "./post.service";
import { CreatePostDto } from "./schemas/createPost.dto";
import { UpdatePostDto } from "./schemas/updatePost.dto";
import type { User } from "../user/user.types";

@Service()
@JsonController("/posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(@QueryParams() query: any) {
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;
    const order_by = query.order_by as string | undefined;
    const direction = query.direction as string | undefined;
    const search =
      query.search !== undefined ? query.search.toString() : undefined;
    const posts = await this.postService.find({
      limit,
      offset,
      search,
      order_by,
      direction,
    });
    return posts;
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const post = await this.postService.findOne(Number(id));
    return post;
  }

  @Authorized()
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User
  ) {
    createPostDto.user_id = user.id;
    const response = await this.postService.create(createPostDto);
    return response;
  }

  @Authorized()
  @Put("/:id")
  async update(
    @Param("id") id: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User
  ) {
    await this.postService.checkPostPermission(id, user);
    const response = await this.postService.update(id, updatePostDto);
    return response;
  }

  @Authorized()
  @Delete("/:id")
  async delete(@Param("id") id: number, @CurrentUser() user: User) {
    await this.postService.checkPostPermission(id, user);
    const response = await this.postService.delete(id);
    return response;
  }

  @Authorized()
  @Get("/auth/myself/feed")
  async getMyselfFeed(@CurrentUser() user: User) {
    const limit = 30;
    const posts = await this.postService.getUserFriendsLatestPosts(
      user.id,
      limit
    );
    return posts;
  }

  @Authorized()
  @Get("/auth/myself/latest-posts")
  async getMyselfLatestPosts(@CurrentUser() user: User) {
    const posts = this.postService.findUserPosts(user.id);
    return posts;
  }

  @Get("/:id/comments")
  async getComments(@Param("id") id: string) {
    const response = await this.postService.findCommentsByPostId(Number(id));
    return response;
  }

  @Get("/user/:userId/friends-latest-posts")
  async getUserFriendsLatestPosts(@Param("userId") userId: number) {
    const posts = await this.postService.getUserFriendsLatestPosts(userId);
    return posts;
  }
}
