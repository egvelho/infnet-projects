import { api } from "./api";
import { Post, User } from "../../../shared/types";

type GetPostsInput = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

type GetPostsOutput = {
  count: number;
  posts: Post[];
};

export async function getPosts(
  params: GetPostsInput = {}
): Promise<GetPostsOutput> {
  const res = await api.get("/posts", {
    params,
  });
  const posts = res.data;
  return posts;
}
