import { api } from "./api";
import type { Comment } from "../../../shared/types";

export type CreateCommentInput = {
  message: string;
  post_id: number;
};

export type CreateCommentOutput = {
  success: boolean;
  data: Comment;
};

export async function createComment(
  comment: CreateCommentInput
): Promise<CreateCommentOutput> {
  const response = await api.post("/comments", comment);
  return response.data;
}
