import { api } from "./api";
import type { User, NotepadItem } from "../types";

export type GetMyselfOutput = User & {
  notepads: NotepadItem[];
};

export async function getMyself(): Promise<GetMyselfOutput> {
  const response = await api.get("/users/myself");
  return response.data;
}
