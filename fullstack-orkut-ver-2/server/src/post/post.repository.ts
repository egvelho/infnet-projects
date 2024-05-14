import { Service } from "typedi";
import { prisma } from "../prisma";
import type { CreatePostDto } from "./dtos/create-post.dto";
import type { UpdatePostDto } from "./dtos/update-post.dto";
import type { CreatePostCommentDto } from "./dtos/create-post-comment.dto";

@Service()
export class PostRepository {
  async listPosts({
    limit,
    offset,
    orderBy,
    search,
  }: {
    limit: number;
    offset: number;
    orderBy: "asc" | "desc";
    search?: string;
  }) {
    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        content: true,
        created_at: true,
        user_id: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            avatar: true,
          },
        },
      },
      where: search
        ? {
            content: {
              contains: search,
            },
          }
        : undefined,
      orderBy: {
        created_at: orderBy,
      },
      take: limit,
      skip: offset,
    });

    const count = await prisma.posts.count();

    return {
      posts,
      count,
    };
  }

  async createPost(data: CreatePostDto) {
    const nextPost = await prisma.posts.create({
      data: {
        user_id: data.user_id,
        content: data.content,
      },
    });
    return nextPost;
  }

  async readPost(postId: number) {
    const post = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
      include: {
        users: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            avatar: true,
          },
        },
      },
    });
    return post;
  }

  async updatePost(postId: number, data: UpdatePostDto) {
    const post = await prisma.posts.update({
      data: {
        content: data.content,
      },
      where: {
        id: postId,
      },
    });
    return post;
  }

  async deletePost(postId: number) {
    const post = await prisma.posts.delete({
      where: {
        id: postId,
      },
    });
    return post;
  }

  async listPostComments(postId: number) {
    const comments = await prisma.comments.findMany({
      select: {
        id: true,
        message: true,
        created_at: true,
        user_id: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            avatar: true,
          },
        },
      },
      where: {
        post_id: postId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return comments;
  }

  async createPostComment(postId: number, data: CreatePostCommentDto) {
    const comment = await prisma.comments.create({
      data: {
        message: data.message,
        user_id: data.user_id,
        post_id: postId,
      },
    });
    return comment;
  }
}
