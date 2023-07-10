import { api } from "./api";
import type { Friend } from "../../../shared/types";

type GetMyselfFriendsOutput = {
  count: number;
  friends: Friend[];
};

export async function getMyselfFriends(): Promise<GetMyselfFriendsOutput> {
  const response = await api.get(`/users/auth/myself/friends`);
  return response.data;
}
