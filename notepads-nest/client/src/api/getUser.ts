import { api } from "./api";
import type { User, NotepadItem } from "../types";

export type GetUserOutput = User & {
  notepads: NotepadItem[];
};

export async function getUser(userId: number): Promise<GetUserOutput> {
  const res = await api.get(`/users/${userId}`);
  const user = res.data;
  return user;
}
