import { api } from "./api";
import type { Notepad } from "../../../shared/types";

export type PutNotepadInput = {
  title: string;
  subtitle: string;
  content: string;
};

export type PutNotepadOutput = {
  success: boolean;
  notepad: Notepad;
};

export async function putNotepad(
  id: number,
  notepad: PutNotepadInput
): Promise<PutNotepadOutput> {
  const response = await api.put(`/notepads/${id}`, notepad);
  return response.data;
}
