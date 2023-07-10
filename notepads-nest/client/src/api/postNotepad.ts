import { api } from "./api";
import type { Notepad } from "../types";

export type PostNotepadInput = {
  title: string;
  subtitle: string;
  content: string;
};

export async function postNotepad(notepad: PostNotepadInput): Promise<Notepad> {
  const response = await api.post("/notepads", notepad);
  return response.data;
}
