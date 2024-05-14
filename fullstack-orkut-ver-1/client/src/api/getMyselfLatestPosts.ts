import { api } from "./api";
import type { Post } from "../../../shared/types";

type GetMyselfLatestPostsOutput = Post[];

export async function getMyselfLatestPosts(): Promise<GetMyselfLatestPostsOutput> {
  const response = await api.get(`/posts/auth/myself/latest-posts`);
  return response.data;
}
