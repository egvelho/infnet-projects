import { api } from "./api";
import type { Post } from "../../../shared/types";

export type CreatePostInput = {
  message: string;
};

export type CreatePostOutput = {
  success: boolean;
  data: Post;
};

export async function createPost(
  post: CreatePostInput
): Promise<CreatePostOutput> {
  const response = await api.post("/posts", post);
  return response.data;
}
