import { Service } from "typedi";
import { UnauthorizedError } from "routing-controllers";
import { CreatePostDto } from "./schemas/createPost.dto";
import { UpdatePostDto } from "./schemas/updatePost.dto";
import { PostRepository } from "./post.repository";
import { FindPostsParams, Post } from "./post.types";
import { User } from "../user/user.types";

@Service()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id);
    return post;
  }

  async find(params: FindPostsParams) {
    const response = await this.postRepository.find(params);
    return response;
  }

  async create(postData: CreatePostDto) {
    const response = await this.postRepository.create(postData);
    return response;
  }

  async update(id: number, postData: UpdatePostDto) {
    const response = await this.postRepository.update(id, postData);
    return response;
  }

  async delete(id: number) {
    const response = await this.postRepository.delete(id);
    return response;
  }

  async findCommentsByPostId(postId: number) {
    const comments = await this.postRepository.findCommentsByPostId(postId);
    return comments;
  }

  async getUserFriendsLatestPosts(userId: number, limit: number = 6) {
    const posts = await this.postRepository.findUserFriendsLatestPosts(
      userId,
      limit
    );
    return posts;
  }

  async checkPostPermission(postId: number, user: User) {
    const post = await this.findOne(postId);
    if (post.user_id !== user.id) {
      throw new UnauthorizedError();
    }
  }

  async findUserPosts(userId: number, limit: number = 3) {
    const posts = await this.postRepository.findUserPosts(userId, limit);
    return posts;
  }
}
