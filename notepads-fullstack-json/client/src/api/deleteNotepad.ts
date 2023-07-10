import { api } from "./api";
import { Notepad } from "../../../shared/types";

export type DeleteNotepadOutput = {
  success: boolean;
  notepad: Notepad;
};

export async function deleteNotepad(id: number): Promise<DeleteNotepadOutput> {
  const res = await api.delete(`/notepads/${id}`);
  const notepad = res.data;
  return notepad;
}
