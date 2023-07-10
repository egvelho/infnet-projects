import { api } from "./api";
import type { Post } from "../../../shared/types";

type GetMyselfFeedOutput = Post[];

export async function getMyselfFeed(): Promise<GetMyselfFeedOutput> {
  const response = await api.get(`/posts/auth/myself/feed`);
  return response.data;
}
