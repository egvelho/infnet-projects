import { api } from "./api";
import type { Comment } from "../../../shared/types";

export type PostCommentInput = {
  message: string;
  notepad_id: number;
};

export type PostCommentOutput = {
  success: boolean;
  comment: Comment;
};

export async function postComment(
  comment: PostCommentInput
): Promise<PostCommentOutput> {
  const response = await api.post("/comments", comment);
  return response.data;
}
