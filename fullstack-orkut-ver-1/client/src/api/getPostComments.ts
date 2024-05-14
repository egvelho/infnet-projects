import { api } from "./api";
import { Comment } from "../../../shared/types";

type GetCommentsInput = {
  post_id: number;
};

type GetCommentsOutput = Comment[];

export async function getPostComments({
  post_id,
}: GetCommentsInput): Promise<GetCommentsOutput> {
  const res = await api.get(`/posts/${post_id}/comments`);
  const comments = res.data;
  return comments;
}
