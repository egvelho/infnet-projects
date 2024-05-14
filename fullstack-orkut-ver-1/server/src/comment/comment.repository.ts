import { Service } from "typedi";
import { PrismaClient, comments as Comment } from "@prisma/client";
import { MaybeOutput, Repository } from "../types";
import { getPool, sql } from "../database";

@Service()
export class CommentRepository implements Repository<Comment> {
  constructor() {
    this.prisma = new PrismaClient();
  }
  prisma: PrismaClient;

  async findAll(): Promise<Comment[]> {
    const comments = await this.prisma.comments.findMany();
    return comments;
  }
  findOne(id: number): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  async create(commentData: Partial<Comment>): Promise<MaybeOutput<Comment>> {
    const createdComment = await this.prisma.comments.create({
      data: commentData,
    });
    return {
      success: true,
      data: createdComment,
    };
  }
  delete(id: number): Promise<MaybeOutput<Comment>> {
    throw new Error("Method not implemented.");
  }
  update(id: number, data: Partial<Comment>): Promise<MaybeOutput<Comment>> {
    throw new Error("Method not implemented.");
  }
}
