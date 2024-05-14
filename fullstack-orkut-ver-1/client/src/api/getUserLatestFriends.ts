import { api } from "./api";
import type { Friend } from "../../../shared/types";

type UserLatestFriendsOutput = {
  count: number;
  friends: Friend[];
};

export async function getUserLatestFriends(
  userId: number
): Promise<UserLatestFriendsOutput> {
  const response = await api.get(`/users/${userId}/latest-friends`);
  return response.data;
}
