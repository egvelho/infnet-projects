import { api } from "./api";
import type { Notepad } from "../types";

export async function deleteNotepad(id: number): Promise<Notepad> {
  const res = await api.delete(`/notepads/${id}`);
  const notepad = res.data;
  return notepad;
}
