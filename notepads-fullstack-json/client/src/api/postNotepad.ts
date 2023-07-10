import { api } from "./api";
import type { Notepad } from "../../../shared/types";

export type PostNotepadInput = {
  title: string;
  subtitle: string;
  content: string;
};

export type PostNotepadOutput = {
  success: boolean;
  notepad: Notepad;
};

export async function postNotepad(
  notepad: PostNotepadInput
): Promise<PostNotepadOutput> {
  const response = await api.post("/notepads", notepad);
  return response.data;
}
