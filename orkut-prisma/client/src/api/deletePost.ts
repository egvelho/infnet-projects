import { api } from "./api";
import { Post } from "../../../shared/types";

export type DeletePostOutput = {
  success: boolean;
  data: Post;
};

export async function deletePost(id: number): Promise<DeletePostOutput> {
  const res = await api.delete(`/posts/${id}`);
  const post = res.data;
  return post;
}
