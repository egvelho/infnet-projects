import { api } from "./api";
import type { Notepad } from "../types";

export type PutNotepadInput = {
  title: string;
  subtitle: string;
  content: string;
};

export async function putNotepad(
  id: number,
  notepad: PutNotepadInput
): Promise<Notepad> {
  const response = await api.put(`/notepads/${id}`, notepad);
  return response.data;
}
