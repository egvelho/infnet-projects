import { Service } from "typedi";
import { CommentRepository } from "./comment.repository";
import type { Comment } from "../../../shared/types";

@Service()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getAll() {
    const comments = await this.commentRepository.findAll();
    return comments;
  }

  async create(data: Omit<Comment, "id" | "created_at">) {
    const response = this.commentRepository.create(data);
    return response;
  }
}
