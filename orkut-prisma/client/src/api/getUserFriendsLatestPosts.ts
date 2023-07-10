import { api } from "./api";
import type { Post, User } from "../../../shared/types";

type GetUserFriendsLatestPostsOutput = Post[];

export async function getUserFriendsLatestPosts(
  userId: number
): Promise<GetUserFriendsLatestPostsOutput> {
  const response = await api.get(`/posts/user/${userId}/friends-latest-posts`);
  return response.data;
}
