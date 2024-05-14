import { api } from "./api";
import type { Post } from "../../../shared/types";

export type UpdatePostInput = {
  message: string;
};

export type UpdatePostOutput = {
  success: boolean;
  data: Post;
};

export async function updatePost(
  id: number,
  post: UpdatePostInput
): Promise<UpdatePostOutput> {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
}
