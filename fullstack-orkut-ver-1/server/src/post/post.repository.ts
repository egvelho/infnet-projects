import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { FindPostsParams, Post } from "./post.types";
import { getPool, sql, sqlObj } from "../database";
import { MaybeOutput, Repository } from "../types";
import { CreatePostDto } from "./schemas/createPost.dto";
import { UpdatePostDto } from "./schemas/updatePost.dto";

@Service()
export class PostRepository implements Repository<Post> {
  constructor() {
    this.prisma = new PrismaClient();
  }
  private prisma: PrismaClient;

  findAll(): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: number): Promise<Post> {
    const pool = await getPool();
    const post: Post = await pool.one(sql`
      select * from posts
      where id = ${id}
    `);
    return post;
  }

  async create(postData: CreatePostDto): Promise<MaybeOutput<Post>> {
    const post = await this.prisma.posts.create({
      data: postData,
    });

    return {
      success: true,
      data: post,
    };
  }

  async delete(id: number): Promise<MaybeOutput<Post>> {
    const pool = await getPool();
    const post = await this.findOne(id);
    const results = await pool.query(sql`
      delete from posts where id = ${id}
    `);

    const success = results.rowCount === 1;

    if (success) {
      return {
        success: true,
        data: post,
      };
    } else {
      return {
        success: false,
        data: null,
        errors: [],
      };
    }
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto
  ): Promise<MaybeOutput<Post>> {
    const post = await this.prisma.posts.update({
      data: {
        ...updatePostDto,
        created_at: new Date(),
      },
      where: {
        id,
      },
    });
    return {
      success: true,
      data: post,
    };
  }

  async findCommentsByPostId(postId: number): Promise<Comment[]> {
    const pool = await getPool();
    const comments = (await pool.any(sql`
      select
        comments.id,
        comments.created_at,
        comments.message,
        comments.user_id,
        users.first_name as user_first_name,
        users.last_name as user_last_name
      from comments
      join users on comments.user_id = users.id
      where post_id=${postId}
      order by created_at desc
    `)) as any;
    return comments;
  }

  async find({
    limit = 10,
    offset = 0,
    search = "",
    order_by = "created_at",
    direction = "desc",
  }: FindPostsParams = {}) {
    const pool = await getPool();
    const partialSearch = `%${search}%`;
    const whereClause = sqlObj.fragment`
      where message ilike ${partialSearch}
    `;
    const orderByClause = sqlObj.fragment([
      `order by ${"posts.".concat(order_by)} ${direction}`,
    ]);
    const posts = await pool.many(sql`
      select
        posts.id,
        posts.created_at,
        posts.message,
        posts.user_id,
        users.first_name as user_first_name,
        users.last_name as user_last_name
      from posts
      join users on posts.user_id = users.id
      ${whereClause}
      ${orderByClause}
      limit ${limit} offset ${offset}
    `);
    const count = await pool.oneFirst(sql`
      select count(*) from posts ${whereClause}
    `);

    return {
      count,
      posts,
    };
  }

  async findUserFriendsLatestPosts(userId: number, limit: number = 6) {
    const pool = await getPool();
    const posts = await pool.many(sql`
      select
        posts.id,
        posts.created_at,
        posts.message,
        posts.user_id,
        users.first_name as user_first_name,
        users.last_name as user_last_name
      from posts
      join users on posts.user_id = users.id
      WHERE user_id IN (
        SELECT user_add FROM friends WHERE user_req=${userId}
      ) OR user_id IN (
        SELECT user_req FROM friends WHERE user_add=${userId}
      )
      ORDER BY created_at DESC
      LIMIT ${limit};
    `);
    return posts;
  }

  async findUserPosts(userId: number, limit: number = 3) {
    const posts = await this.prisma.posts.findMany({
      where: {
        user_id: userId,
      },
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    return posts;
  }
}
