import { api } from "./api";
import type { User } from "../../../shared/types";

export async function getUser(userId: number): Promise<User> {
  const user = await api.get(`/users/${userId}`);
  return user.data;
}
