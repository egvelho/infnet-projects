import { api } from "./api";
import type { User } from "../../../shared/types";

export async function getMyself(): Promise<User> {
  const user = await api.get("/users/auth/myself");
  return user.data;
}
