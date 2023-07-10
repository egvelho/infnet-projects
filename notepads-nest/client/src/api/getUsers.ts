import { api } from "./api";
import type { User } from "../types";

type GetUsersOutput = User[];

export async function getUsers(): Promise<GetUsersOutput> {
  const response = await api.get("/users");
  const users = response.data;
  return users;
}
